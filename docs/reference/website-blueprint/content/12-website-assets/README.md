# Website Assets

`web_export.json` is the current canonical structured source for the static showcase site.

Workflow:

```bash
cd site
npm run build:data
npm run check:data
npm test
```

When editing content, update `web_export.json` or a future upstream Markdown/YAML asset, then regenerate `site/data.js`.

Do not hand-edit `site/data.js`; it is generated.
