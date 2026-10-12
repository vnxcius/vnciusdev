const TTL = 60 * 60;

const memory = new Map<string, { body: string; expires: number }>();

// Upstream responses are kept for an hour: in memory while the server instance
// stays warm, and in the Workers cache when running on Cloudflare.
export async function cachedFetch(url: string) {
  const hit = memory.get(url);
  if (hit && hit.expires > Date.now()) return hit.body;

  const edge = (globalThis.caches as { default?: Cache } | undefined)?.default;
  let response = await edge?.match(url);
  if (!response) {
    // GitHub's API rejects requests without a user agent.
    response = await fetch(url, { headers: { "User-Agent": "vncius.dev" } });
    if (!response.ok) throw new Error(`${url}: ${response.status}`);
    await edge?.put(
      url,
      new Response(response.clone().body, {
        headers: { "Cache-Control": `max-age=${TTL}` },
      }),
    );
  }

  const body = await response.text();
  memory.set(url, { body, expires: Date.now() + TTL * 1000 });
  return body;
}
