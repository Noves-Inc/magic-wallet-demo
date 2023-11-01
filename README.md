This scaffold is meant to help you bootstrap your own projects with Magic's [Dedicated Wallet](https://magic.link/docs/auth/overview) and [Noves data](https://docs.noves.fi). Magic is a developer SDK that integrates with your application to enable passwordless Web3 onboarding. Noves is a data provider specialized in translating smart contract complexity into human-readable form.

The folder structure of this scaffold is designed to encapsulate all things Magic into one place so you can easily add or remove components and functionality. For example, all Magic-specific components are in the `src/components/magic` directory while generic UI components are in the `src/components/ui` directory.

For Noves-enriched data samples, check out the Transaction History and Transaction Preview components.

## Next.js

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Getting Started

First, make sure you set the environment variables in .env file.

```bash
# Publishable API Key found in the Magic Dashboard
NEXT_PUBLIC_MAGIC_API_KEY=pk_live_********

# The name of the chain
NEXT_PUBLIC_BLOCKCHAIN_NETWORK=polygon | ethereum

# API Key found in Noves Dashboard
NEXT_PUBLIC_TRANSLATE_API_KEY=********
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### Docker deployment

If you want to run this inside a Docker container, we've included a Dockerfile and a helper Python script (`replaceValues.py`), which will write to a local
.env file in the container any needed environment variables.

This is helpful when deploying the container using a CI/CD pipeline and wanting to inject sensible values from a secrets manager / key vault into the pipeline.
