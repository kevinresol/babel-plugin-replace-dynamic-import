# Replace dynamic `import()` with a custom function call.

`babel-plugin-replace-dynamic-import`

Babel plugin to replace `import(...)` with a custom function call. By default it is `__import__()`.

## Use case

This has a very narrow use case: when you want to parse the same file for both `browser` and `node` _(using `babel`/`webpack`)_ and still be able to use `webpack`'s code splitting ability.

This is basically a utility to help reduce code duplication.

So statements like:
```javascript
...
const someDynamicImport = import('../path/to/your/module');
...
```
into a function call
```javascript
const someDynamicImport = __import__('../path/to/your/module');
```


_**NOTE:** Babylon >= v6.12.0 is required to correct parse dynamic imports._

## Installation

```sh
yarn add babel-plugin-replace-dynamic-import --dev
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["replace-dynamic-import"]
}
```

### Via CLI

```sh
$ babel --plugins replace-dynamic-import script.js
```

### Via Node API

```javascript
require('babel-core').transform('code', {
  plugins: ['replace-dynamic-import']
});
```

## Options

- `by`: the identifier to replace `import` with. Defaults to `__import__`
