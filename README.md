# Texas Platform Blueprint

Platform Architecture Decision

TexasDefined will eventually share a common platform with KeepTXRed.com.

Analyze the best architecture for:

One shared Supabase project versus separate Supabase projects

Shared authentication

Shared datasets

Shared calculators and business logic

Shared admin

Shared media storage

Shared search

Recommend the architecture that provides the best long-term scalability, security, maintainability, and lowest operational cost. Design the project around that architecture, but do not migrate or connect to the existing KeepTXRed Supabase project yet. Leave the final connection until after the architecture has been reviewed and approved.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://texas-common-core.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f7b35bd7-2860-4e61-8740-4bbbdbe4c9af).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
