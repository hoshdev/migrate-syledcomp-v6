# Styled Components v6 Migration

## Problem Statement

Styled Components v6 passes all props to the DOM, which can generate warnings in the console when invalid props are passed to HTML elements. You can observe these warnings by running the project as it is:

```sh
npm install
npm start
```

## Solution

To resolve these warnings, run the following transformation script:

```sh
jscodeshift -t ./transformStyleCompV6.js ./src
```

After running the transformation, the warnings should disappear.

## Progressive Migration

If you prefer to migrate files progressively instead of processing the entire `./src` directory at once, replace `./src` with the specific file paths you want to process. For example:

```sh
jscodeshift -t ./transformStyleCompV6.js ./src/components/Button.js
```

This allows you to migrate your codebase step by step.

---

### Notes

- Ensure `jscodeshift` is installed globally or use `npx`:
  ```sh
  npx jscodeshift -t ./transformStyleCompV6.js ./src
  ```
- Review the changes before committing them to your repository.

Happy coding! 🚀
