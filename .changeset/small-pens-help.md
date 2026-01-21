---
'@thisismissem/adonisjs-atproto-tap': major
---

Support LexIndexer for lexicon aware indexing

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