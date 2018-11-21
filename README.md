# ts-webext-skeleton

Modern template for building webextensions with TypeScript and SCSS utilizing WebPack4.

## Overview

This is a very simple architecture template. All `.ts` and `.scss` files are compiled to their respective output 
names in `dist/compiled`, with the static assets one level above. The extension build is just a zip of the `dist` folder and
is put in `web-ext-artifacts` directory, this is what you use for further submission/signing.

For an example build see: [TabSwitcher](https://github.com/DannyHinshaw/tab-switcher-ext)

## Develop

Install dependencies:
```bash
yarn
```

To run locally with Firefox:

```bash
yarn start
```

In Firefox:
* Go to `about:debugging`
* Make sure "Enable add-on debugging" is checked
* Reload plugin after code changes (webpack rebuilds the zip on watch)
* Check both web and extension debuggers to see data changes and messages.

## Distribute

Build for production with:

```bash
yarn build
```

Afterwards you will need to do your own signing for distribution depending on type of distribution you choose.
