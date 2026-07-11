const pendingRequests = new Map();

export function getPendingRequest(cacheKey) {
  return pendingRequests.get(cacheKey) ?? null;
}

export function setPendingRequest(cacheKey, promise) {
  pendingRequests.set(cacheKey, promise);
}

export function deletePendingRequest(cacheKey) {
  pendingRequests.delete(cacheKey);
}

/**
 * Atomically registers the first request for a cache key.
 *
 * This prevents multiple concurrent requests from observing
 * an empty pending state and starting duplicate AI generations.
 *
 * Subsequent requests reuse the same pending Promise until
 * generation completes.
 *
 * @param {string} cacheKey - The cache key for deduplication
 * @returns {{promise: Promise, isCreator: boolean, resolve: Function, reject: Function}} 
 *          The pending promise, whether this call created it, and resolve/reject functions
 */
export function getOrCreatePendingRequest(cacheKey) {
  // Check if a pending request already exists
  const existing = getPendingRequest(cacheKey);
  if (existing) {
    return { promise: existing, isCreator: false };
  }

  // Create a deferred promise that will be resolved with the actual generation result
  let resolvePromise, rejectPromise;
  const deferredPromise = new Promise((resolve, reject) => {
    resolvePromise = resolve;
    rejectPromise = reject;
  });

  // Immediately register the deferred promise BEFORE any async work
  // This is the critical atomic operation that prevents the race
  setPendingRequest(cacheKey, deferredPromise);

  // Double-check: another request may have registered while we were setting up
  // If so, delete our registration and return the existing one
  const doubleCheck = getPendingRequest(cacheKey);
  if (doubleCheck !== deferredPromise) {
    deletePendingRequest(cacheKey);
    return { promise: doubleCheck, isCreator: false };
  }

  // Return the deferred promise along with resolve/reject functions
  return { 
    promise: deferredPromise, 
    isCreator: true,
    resolve: resolvePromise,
    reject: rejectPromise
  };
}
