export const wait = (ms: number) => new Promise<void>((done) => setTimeout(done, ms));

export async function until(condition: () => unknown, what: string, ms = 20000) {
  const end = performance.now() + ms;
  while (performance.now() < end) {
    if (await condition()) return;
    await wait(40);
  }
  throw new Error("timed out waiting for " + what);
}
