# @thisismissem/adonisjs-atproto-tap

## 2.0.0

### Major Changes

- [#7](https://github.com/ThisIsMissEm/adonisjs-atproto-tap/pull/7) [`3559ed1`](https://github.com/ThisIsMissEm/adonisjs-atproto-tap/commit/3559ed10a0cbff5519462d24502740a429e5fc23) Thanks [@ThisIsMissEm](https://github.com/ThisIsMissEm)! - Support LexIndexer for lexicon aware indexing

  When this package was first released, `@atproto/tap` only had support for a single indexer, known as `SimpleIndexer`. Since then, another indexer which is lexicon aware has been added called `LexIndexer`.

  In order to support both, we had to make a breaking change how this package works. There is no longer an "indexer" service. To upgrade, you need to modify `start/indexer.ts` and replace `import indexer from '@thisismissem/adonisjs-atproto-tap/services/indexer'` with:

  ```ts
  import tap from '@thisismissem/adonisjs-atproto-tap/services/tap'
  import { SimpleIndexer } from '@atproto/tap'

  const indexer = new SimpleIndexer()
  ```

  Then at the end of the file, you need to add:

  ```ts
  // Set the indexer to use with Tap:
  tap.setIndexer(indexer)

  // In production, you'll probably want to use a separate process to run the
  // indexer. e.g., have a node ace command that starts the app, and then calls
  // tap.startIndexer() one the app has started.
  if (app.getEnvironment() === 'web' && app.inDev) {
    tap.startIndexer()
  }
  ```

## 1.0.2

### Patch Changes

- [#4](https://github.com/ThisIsMissEm/adonisjs-atproto-tap/pull/4) [`faae76d`](https://github.com/ThisIsMissEm/adonisjs-atproto-tap/commit/faae76def2e57c02cd8f6c6bef386ef160daa2b8) Thanks [@ThisIsMissEm](https://github.com/ThisIsMissEm)! - Fix adminPassword not being set correctly

## 1.0.1

### Patch Changes

- [#2](https://github.com/ThisIsMissEm/adonisjs-atproto-tap/pull/2) [`860f24c`](https://github.com/ThisIsMissEm/adonisjs-atproto-tap/commit/860f24c75e57f60fdb1417e4bc4ebf6947e50bad) Thanks [@ThisIsMissEm](https://github.com/ThisIsMissEm)! - Remove unnecessary console.log

## 1.0.0

### Major Changes

- [`4fb5fc0`](https://github.com/ThisIsMissEm/adonisjs-atproto-tap/commit/4fb5fc03abd1d0b27992cc7005f357b120f3af62) Thanks [@ThisIsMissEm](https://github.com/ThisIsMissEm)! - First release of @thisismissem/adonisjs-atproto-tap
