# 📝 Notes App — Angular Client

A modern, signal-driven note-taking application built with **Angular 21**. Designed for speed and simplicity, with JWT-based authentication and a clean modular architecture. This project was built to explore signals and as a foundation for AI integration and collaboration (Web sockets etc).

## Tech Stack

- **Angular 21** with standalone components
- **Signals** for reactive state management
- **JWT** authentication with refresh token rotation
- **.NET Minimal API** backend (separate repo)
- **SQL Server** data store

## Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── interceptors/
│   │   │   ├── auth.interceptor.ts
│   │   │   ├── token-refresh.interceptor.ts
│   │   │   
│   │   ├── services/
│   │        ├── auth.service.ts
│   │   └── ui-state/
│   │        ├── modal-state.ts
│   │        ├── user-inteface.service.ts
│   │
│   ├── features/ 
|   |   ├── auth/
|   |       ├── login/
|   |       ├── register/
|   |
│   │   ├── categories/
│   │       ├── components/
│   │       ├── models/
│   │       └── services/    
│   │   
│   │   ├── notes/
│   │       ├── components/
│   │       ├── models/
│   │       ├── pages
│   │       └── services/ 
│   │
│   │   └── shared/
│   │       ├── components/
│   │       ├── models/
│   │       └── services/
```

## Getting Started

### Prerequisites

- Node.js 20+
- Angular CLI 21

### Install & Run

```bash
# Install dependencies
npm install

# Start the dev server
ng serve
```

The app runs at `http://localhost:4200` by default.

### Environment Config

Set your API base URL in `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7013/api/'
};
```

## Authentication Flow

The app uses JWT access tokens paired with refresh tokens for seamless session management.

1. User logs in → receives an access token and a refresh token.
2. The auth interceptor attaches the access token to every outgoing API request.
3. On 401 response, the interceptor silently refreshes the token using the stored refresh token.
4. If the refresh fails, the user is redirected to login.

## Key Patterns

**Signals over RxJS for component state** — Signals drive the reactive layer wherever possible, keeping templates simple and change detection efficient.

**Core / Features / Shared architecture** — `core` holds app-wide singletons (services, guards, interceptors), `features` contains lazy-loaded routes, and `shared` houses reusable UI building blocks.

**Standalone components** — No NgModules. Every component, directive, and pipe is standalone with explicit imports.

## AI Features

- **Semantic search** — AI-powered note retrieval via RAG pipeline (Voyage AI embeddings)
- **Note summarisation** — Automatic summaries with AI-generated tags for quick browsing

## Roadmap

- [ ] Rich-text editor with Markdown support
- [ ] Folder organisation
- [ ] Offline support with service workers

## Related

- **Backend** — .NET Minimal API with SQL Server ([backend repo](https://github.com/khetz/notes-api))

## License

MIT