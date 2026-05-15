# Polyfill for getElementsByStyle()

## Problem Statement

There is no native DOM method to find elements by their CSS style values. Implement `getElementsByStyle(rootElement, property, value)` that returns all elements under `rootElement` whose **computed** value for the given CSS `property` matches `value`.

Also implement a helper `getPropertyComputedValue(property, value)` that converts a raw CSS value (e.g. `"red"`, `"#ff0000"`) into the browser's computed form (e.g. `"rgb(255, 0, 0)"`).

---

## Examples

```html
<div id="root">
  <div class="alpha"></div>  <!-- padding: 10px 10px -->
  <div class="beta"></div>   <!-- padding-top: 10px -->
  <div class="gamma"></div>  <!-- padding: 10px 0 0 -->
</div>
```

```js
getElementsByStyle(document.getElementById("root"), "paddingTop", "10px");
// returns [.alpha, .beta, .gamma] — all three have computed paddingTop of "10px"

getElementsByStyle(document.getElementById("root"), "backgroundColor", "red");
// returns [.alpha, .gamma] — both compute to rgb(255, 0, 0); .beta is black
```

> Browsers normalise all colour/padding values to their computed form, so `"red"` and `"#ff0000"` and `"rgb(255,0,0)"` all resolve to `"rgb(255, 0, 0)"`. Always compare computed values, never raw strings.

---

## Constraints

- Use `window.getComputedStyle(element)` to read styles — never `element.style`.
- `getPropertyComputedValue` must append a temporary element to `document.body`, read its computed style, then **remove** the element before returning.
- Search must be **depth-first** and include the root element itself.
- Do not use `querySelectorAll("*")` — implement the DFS traversal manually.

---

## Approach

### `getPropertyComputedValue(property, value)`

1. Create a `<div>`, set `div.style[property] = value`.
2. Append it to `document.body` (required so the browser computes styles).
3. Read `window.getComputedStyle(div)[property]`.
4. Remove the element and return the computed value.

### `getElementsByStyle(rootElement, property, value)`

1. Call `getPropertyComputedValue` once to get the normalised target value.
2. Initialise an empty `result` array.
3. Define a recursive `search(element)` helper:
   - Get `window.getComputedStyle(element)[property]`.
   - If it matches the target computed value, push the element.
   - Recurse over `element.children`.
4. Call `search(rootElement)` and return `result`.

---

## Time & Space Complexity

| Operation                  | Complexity |
|----------------------------|------------|
| `getPropertyComputedValue` | O(1)       |
| `getElementsByStyle`       | O(n)       |
| Space (result array)       | O(k)       |

> n = total DOM nodes visited, k = number of matching elements.
