# web0

Launch Solana tokens whose creator fees become a transparent time-weighted buy program for the same token.

[![Open in Bolt](https://bolt.new/static/open-in-bolt.svg)](https://bolt.new/github/stakc0/web0)

## Local app

```bash
npm install
npm run dev
```

`npm run dev` starts the web0 API/indexer on port 3000 and Vite on port 5173.

## Production

```bash
npm run build
npm start
```

The production server serves the built app, launch APIs, a local SQLite read model, optional Supabase persistence, Yellowstone gRPC stream, and web0 launch executor.

## Required service configuration

The server reads the shared OpenClaw Solana service files when present. Production requires:

- `SVS_RPC_URL` or `SVS_LITE_RPC_URL`
- `SVS_GRPC_ENDPOINT`
- `SVS_GRPC_X_TOKEN` or `SVS_GRPC_TOKEN`
- Optional `WEB0_WALLET_MASTER_KEY` for vault encryption. If omitted, a mode-0600 local key is created beside the SQLite database.

Each launch creates an isolated encrypted fee vault. Creator fees route into that vault, and the executor buys only the vault's corresponding mint on its configured cadence.

## Current limits

- The browser flow is wired for image upload, metadata upload, wallet signing, Solana submission, local indexing, and optional Supabase mirroring.
- The migration in `supabase/migrations/20261007_web0.sql` must be applied to the configured Supabase project before relying on remote persistence; this checkout could not prove remote migration application with the available management token.
- A funded Phantom-compatible wallet, valid Solana RPC, Pump metadata/transaction services, and the Yellowstone credentials are required for a real launch. Local browser QA verifies the form and API shell, not a live wallet signature or on-chain mint.
- The local SQLite read model remains the immediate read source; Supabase is written server-side when configured. Production should add a read-through/reconciliation job if the local disk is not persistent.
