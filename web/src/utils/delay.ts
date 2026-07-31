export async function delay(ms: number) {
  if (!ms) return;

  await new Promise((resolve) => setTimeout(resolve, ms));
}
