import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import {
  getPendingRequest,
  setPendingRequest,
  deletePendingRequest,
  getOrCreatePendingRequest,
} from "../lib/cache/pending-requests.js";

describe("Pending Requests Concurrency Tests", () => {
  beforeEach(() => {
    // Clear vi mocks
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Clean up any pending requests by deleting known keys
    // Since pendingRequests is internal, we can't clear it directly
    // Tests should clean up their own keys
  });

  describe("getOrCreatePendingRequest - Race Condition Prevention", () => {
    it("should only allow one creator for concurrent requests", async () => {
      const cacheKey = `test-key-${Date.now()}-1`;
      const results = [];

      // Simulate 10 concurrent requests
      const promises = Array.from({ length: 10 }, (_, i) => {
        const { promise, isCreator } = getOrCreatePendingRequest(cacheKey);
        results.push({ index: i, isCreator });
        return { promise, isCreator };
      });

      await Promise.all(promises);

      // Only one request should be the creator
      const creators = results.filter(r => r.isCreator);
      expect(creators.length).toBe(1);

      // Cleanup
      deletePendingRequest(cacheKey);
    });

    it("should return the same promise to all concurrent requests", async () => {
      const cacheKey = `test-key-${Date.now()}-2`;
      const promises = [];

      // Create 5 concurrent requests
      for (let i = 0; i < 5; i++) {
        const { promise } = getOrCreatePendingRequest(cacheKey);
        promises.push(promise);
      }

      // All promises should be the same reference
      const firstPromise = promises[0];
      for (const promise of promises) {
        expect(promise).toBe(firstPromise);
      }

      // Cleanup
      deletePendingRequest(cacheKey);
    });

    it("should handle sequential requests correctly", async () => {
      const cacheKey = `test-key-${Date.now()}-3`;

      // First request - should be creator
      const { promise: promise1, isCreator: isCreator1 } = getOrCreatePendingRequest(cacheKey);
      expect(isCreator1).toBe(true);

      // Delete to simulate completion
      deletePendingRequest(cacheKey);

      // Second request - should also be creator after cleanup
      const { promise: promise2, isCreator: isCreator2 } = getOrCreatePendingRequest(cacheKey);
      expect(isCreator2).toBe(true);
      expect(promise2).not.toBe(promise1);

      // Cleanup
      deletePendingRequest(cacheKey);
    });

    it("should handle rapid-fire requests without race conditions", async () => {
      const cacheKey = `test-key-${Date.now()}-4`;
      const creatorCount = { value: 0 };
      const nonCreatorCount = { value: 0 };

      // Launch 100 rapid requests
      const promises = Array.from({ length: 100 }, () => {
        return new Promise((resolve) => {
          const { isCreator } = getOrCreatePendingRequest(cacheKey);
          if (isCreator) {
            creatorCount.value++;
          } else {
            nonCreatorCount.value++;
          }
          resolve();
        });
      });

      await Promise.all(promises);

      // Exactly one creator
      expect(creatorCount.value).toBe(1);
      // All others should be non-creators
      expect(nonCreatorCount.value).toBe(99);

      // Cleanup
      deletePendingRequest(cacheKey);
    });
  });

  describe("Promise Resolution and Cleanup", () => {
    it("should resolve all waiting promises when creator resolves", async () => {
      const cacheKey = `test-key-${Date.now()}-5`;
      const results = [];

      // Get the pending request (creator)
      const { promise, isCreator, resolve } = getOrCreatePendingRequest(cacheKey);
      expect(isCreator).toBe(true);

      // Create multiple waiters
      const waiters = Array.from({ length: 5 }, (_, i) => {
        return promise.then(result => {
          results.push({ index: i, result });
          return result;
        });
      });

      // Resolve the promise
      resolve("test-result");

      // Wait for all to resolve
      await Promise.all(waiters);

      // All should have received the same result
      expect(results).toHaveLength(5);
      results.forEach(r => {
        expect(r.result).toBe("test-result");
      });

      // Cleanup
      deletePendingRequest(cacheKey);
    });

    it("should reject all waiting promises when creator rejects", async () => {
      const cacheKey = `test-key-${Date.now()}-6`;
      const errors = [];

      // Get the pending request (creator)
      const { promise, isCreator, reject } = getOrCreatePendingRequest(cacheKey);
      expect(isCreator).toBe(true);

      // Create multiple waiters
      const waiters = Array.from({ length: 5 }, (_, i) => {
        return promise.catch(error => {
          errors.push({ index: i, error });
          throw error;
        });
      });

      // Reject the promise
      reject(new Error("test-error"));

      // Wait for all to reject
      await Promise.allSettled(waiters);

      // All should have received the same error
      expect(errors).toHaveLength(5);
      errors.forEach(e => {
        expect(e.error.message).toBe("test-error");
      });

      // Cleanup
      deletePendingRequest(cacheKey);
    });

    it("should cleanup pending request after completion", async () => {
      const cacheKey = `test-key-${Date.now()}-7`;

      // Get the pending request (creator)
      const { promise, isCreator, resolve } = getOrCreatePendingRequest(cacheKey);
      expect(isCreator).toBe(true);

      // Verify it's registered
      expect(getPendingRequest(cacheKey)).toBe(promise);

      // Resolve the promise
      resolve("test-result");
      await promise;

      // Cleanup (in real implementation, this happens in finally)
      deletePendingRequest(cacheKey);

      // Verify it's cleaned up
      expect(getPendingRequest(cacheKey)).toBeNull();
    });
  });

  describe("Different Cache Keys", () => {
    it("should allow concurrent requests for different keys", async () => {
      const timestamp = Date.now();
      const keys = [`key-${timestamp}-1`, `key-${timestamp}-2`, `key-${timestamp}-3`];
      const results = {};

      // Create concurrent requests for different keys
      const promises = keys.map(key => {
        return new Promise(resolve => {
          const { isCreator } = getOrCreatePendingRequest(key);
          results[key] = isCreator;
          resolve();
        });
      });

      await Promise.all(promises);

      // Each key should have its own creator
      expect(results[keys[0]]).toBe(true);
      expect(results[keys[1]]).toBe(true);
      expect(results[keys[2]]).toBe(true);

      // Cleanup
      keys.forEach(key => deletePendingRequest(key));
    });

    it("should not interfere between different keys", async () => {
      const timestamp = Date.now();
      const key1 = `key-${timestamp}-a`;
      const key2 = `key-${timestamp}-b`;

      // Get pending for key1
      const { promise: promise1, isCreator: isCreator1 } = getOrCreatePendingRequest(key1);
      expect(isCreator1).toBe(true);

      // Get pending for key2 - should be independent
      const { promise: promise2, isCreator: isCreator2 } = getOrCreatePendingRequest(key2);
      expect(isCreator2).toBe(true);
      expect(promise2).not.toBe(promise1);

      // Cleanup
      deletePendingRequest(key1);
      deletePendingRequest(key2);
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty cache key", () => {
      const { promise, isCreator } = getOrCreatePendingRequest("");
      expect(isCreator).toBe(true);
      expect(promise).toBeInstanceOf(Promise);

      // Cleanup
      deletePendingRequest("");
    });

    it("should handle special characters in cache key", () => {
      const specialKey = `key-${Date.now()}:with:special/chars?and#symbols`;
      const { promise, isCreator } = getOrCreatePendingRequest(specialKey);
      expect(isCreator).toBe(true);
      expect(promise).toBeInstanceOf(Promise);

      // Cleanup
      deletePendingRequest(specialKey);
    });

    it("should handle very long cache key", () => {
      const longKey = `key-${Date.now()}-${"a".repeat(10000)}`;
      const { promise, isCreator } = getOrCreatePendingRequest(longKey);
      expect(isCreator).toBe(true);
      expect(promise).toBeInstanceOf(Promise);

      // Cleanup
      deletePendingRequest(longKey);
    });
  });
});
