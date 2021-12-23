# Introduction

[jscodeshift] Codemods for best effort upgrade of code using `dc`.
Usually [jscodeshift] only supports javascript or typescript files,
these scripts work with javascript embedded in HTML files.

Currently supported versions:

- `v4` -> `v5`

## Usage

Clone this repository and install dependencies.

```bash
$ npm i
```

To upgrade code

```bash
$ npx jscodeshift -t src/v4-v5/transform.mjs my_dashboard.html ...
```

You can pass multiple HTML and js files in one go, or use wildcards.

Refer to [jscodeshift] for supported options.

[jscodeshift]: (https://github.com/facebook/jscodeshift)

## General advice

- Ensure your code is `eslint` clean.
- Not necessary, but ensure your code is properly indented.
  This will make it easy to compare the changes later.
- Ensure your code is committed in `git` (or your source code control).
- After the automated conversion, please reformat the code.
- If you are not using any automated code formatter, you may
  consider [prettier], the `dc` project itself uses it.

## v4-v5

Please read the [Migration Guide].
It covers the changes in the library and instructions for the upgrade.

### What it will convert

- It will convert all function call names.
- It will add `chartGroup` declaration and update the chart creation calls.
- It will convert accessors that are now part of the configuration system.
- It will create the appropriate type of DataAdapter for the chart.

### What you would need to do

Please refer to [Migration Guide] to understand the
changes to be carried out manually.

- The codemods rely quite a lot on code conventions.
  So, it may not pick up all the necessary changes.
  It will work best in code that follows the convention
  in examples in the dc.js website.
- It will not try to convert any feature which has no
  direct equivalent in the new version (for example filter handlers).

Even in the best case of conversion,
you will have to do the following manually:

- `.colors`
- `dc.pluck`
- `.rangechart` [TODO ref to examples]
- Any accessor that has now moved to the config system
- If you were using `.stack`, `.point` you might have to convert
  it manually. [TODO ref to examples]
- Any code fragment embedded in HTML (for example as
  event handler).
- If you are re-assigning `.group`, `.valueaccessor`, or, `.dimension`,
  the automatically converted code is likely to be incorrect. [TODO ref to examples]
- If you were using explicit chartGroup, you would
  need to manually make changes.

[jscodeshift]: https://github.com/facebook/jscodeshift
[prettier]: https://prettier.io/
[Migration Guide]: https://github.com/dc-js/dc.js/blob/dc-v5/docs/dc-v5-upgrade-guide.md
