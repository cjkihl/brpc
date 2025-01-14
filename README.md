# BRPC 🚀

A lightweight, type-safe RPC framework using tRPC running on Bun's native server.

[![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white)](https://bun.sh)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![tRPC](https://img.shields.io/badge/tRPC-%232596BE.svg?style=for-the-badge&logo=trpc&logoColor=white)](https://trpc.io)
[![Biome](https://img.shields.io/badge/Biome-%2360A5FA.svg?style=for-the-badge&logo=biome&logoColor=white)](https://biomejs.dev)

## Features ✨

- **Type-safe API**: End-to-end type safety with tRPC
- **High Performance**: Just `Bun.Serve`. No overhead
- **Minimal Setup**: No additional web framework needed
- **Stack**: TypeScript, Bun, tRPC, Biome and Vite
- **Monorepo Structure**: With Turborepo

## Prerequisites 📋

- Install [Bun](https://bun.sh)

## Project Structure 🏗️

📁 **Root**

- 📄 `package.json` - Workspace configuration
- 📄 `turbo.json` - Turborepo settings
- 📄 `biome.json` - Biome settings

🌐 **Web Application**

- `/web` - Frontend Vite + React application
  - 🎯 Vanilla tRPC client
  - 🔒 Importing types from server

🔧 **Server**

- `/server` - Bun tRPC backend
  - 🚀 Bun Http server
  - 🔒 Example TRPC routers
  - 🛠️ Cors middleware

## Quick Start 🚀

```bash
# Clone the repository
git clone https://github.com/cjkihl/brpc.git

# Install dependencies
bun install

# Start development servers
bun dev
```
