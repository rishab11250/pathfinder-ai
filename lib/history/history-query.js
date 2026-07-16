export async function getHistoryRecords(model, userId) {
  if (!model) return [];
  return model.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}
export async function getUserHistory(model, userId, orderBy) {
  if (!model) return [];
  return model.findMany({
    where: { userId },
    orderBy,
  });
}