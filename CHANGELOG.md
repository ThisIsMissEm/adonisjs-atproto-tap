# @thisismissem/adonisjs-atproto-tap

## 3.1.0

### Minor Changes

- [#22](https://github.com/ThisIsMissEm/adonisjs-atproto-tap/pull/22) [`9fc4f44`](https://github.com/ThisIsMissEm/adonisjs-atproto-tap/commit/9fc4f44e01d906bfe2a95afc3354e2d866e5e734) Thanks [@ThisIsMissEm](https://github.com/ThisIsMissEm)! - Enforce usage of adminPassword for Tap in production

  The adminPassword must be configured in production. The adminPassword must be at least 16 characters.

### Patch Changes

- [#20](https://github.com/ThisIsMissEm/adonisjs-atproto-tap/pull/20) [`189d4bd`](https://github.com/ThisIsMissEm/adonisjs-atproto-tap/commit/189d4bd3ce25cac394f9e833817bb8ccb6b8d48d) Thanks [@ThisIsMissEm](https://github.com/ThisIsMissEm)! - More changes for Adonis.js v7

- [#22](https://github.com/ThisIsMissEm/adonisjs-atproto-tap/pull/22) [`2b41777`](https://github.com/ThisIsMissEm/adonisjs-atproto-tap/commit/2b4177706053a32d940030cbaa3ae4956760f352) Thanks [@ThisIsMissEm](https://github.com/ThisIsMissEm)! - Use a Secret value for the adminPassword

  This prevents the `adminPassword` for Tap from accidentally being logged, as the value is secret and redacted automatically in logs if someone does `console.log(env)` or similar where `env` is `import "#start/env"`.

## 3.0.0

### Major Changes

- [#17](https://github.com/ThisIsMissEm/adonisjs-atproto-tap/pull/17) [`938cebf`](https://github.com/ThisIsMissEm/adonisjs-atproto-tap/commit/938cebf82a6d446e62e46ad0fcef922e8c49f76a) Thanks [@ThisIsMissEm](https://github.com/ThisIsMissEm)! - Upgrade to Adonis.js v7

### Patch Changes

- [#17](https://github.com/ThisIsMissEm/adonisjs-atproto-tap/pull/17) [`12f4872`](https://github.com/ThisIsMissEm/adonisjs-atproto-tap/commit/12f487295636e3d8d6e92eb0d8a861a7c352dac8) Thanks [@ThisIsMissEm](https://github.com/ThisIsMissEm)! - Update @atproto/tap to latest version

## 2.0.1

### Patch Changes

- [#9](https://github.com/ThisIsMissEm/adonisjs-atproto-tap/pull/9) [`b6bc725`](https://github.com/ThisIsMissEm/adonisjs-atproto-tap/commit/b6bc7253170ea12a270edec86d4006f3f0a639a5) Thanks [@ThisIsMissEm](https://github.com/ThisIsMissEm)! - Update `@atproto/tap` to v0.2.0

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
