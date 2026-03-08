---
'@thisismissem/adonisjs-atproto-tap': patch
---

Use a Secret value for the adminPassword

This prevents the `adminPassword` for Tap from accidentally being logged, as the value is secret and redacted automatically in logs if someone does `console.log(env)` or similar where `env` is `import "#start/env"`.
