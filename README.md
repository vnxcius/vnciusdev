# vncius.dev

My portfolio, built with [TanStack Start](https://tanstack.com/start), React, Tailwind CSS and [Nitro](https://nitro.build).

## Development

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script                     | What it does                                |
| -------------------------- | ------------------------------------------- |
| `bun run build`            | Production build into `.output`             |
| `bun run start`            | Serves the production build with Node       |
| `bun run build:cloudflare` | Production build for Cloudflare Workers     |
| `bun run typecheck`        | Type checks with `tsc`                      |
| `bun run check`            | Lints with oxlint, checks format with oxfmt |

## Deploying

Nitro picks the target from the environment, so `bun run build` is the build command on both Vercel and Cloudflare Workers Builds.

To deploy to Cloudflare Workers from your machine:

```bash
bun run build:cloudflare
bunx wrangler deploy
```
