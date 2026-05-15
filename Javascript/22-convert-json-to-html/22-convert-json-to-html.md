# Convert JSON to HTML

## Problem Statement

Given a JSON object (or array of objects) describing a DOM tree — with `type`, `props`, and `children` — write `JSONtoHTML(json)` that returns the actual DOM fragment.

---

## Examples

```js
const json = {
  type: 'div',
  props: { id: 'hello', class: 'foo' },
  children: [
    { type: 'h1', children: 'HELLO' },
    { type: 'p', children: [{ type: 'span', props: { class: 'bar' }, children: 'World' }] }
  ]
};

JSONtoHTML(json);
// <div id="hello" class="foo">
//   <h1>HELLO</h1>
//   <p><span class="bar">World</span></p>
// </div>
```

---

## Constraints

| Field | Type | Description |
|---|---|---|
| `type` | string | HTML tag name (e.g. `'div'`, `'span'`) |
| `props` | object? | Key-value pairs set as element attributes |
| `children` | string \| object[] | Either a text string or an array of child JSON nodes |

- Input can be a **single object** or an **array of objects**.
- Returns a `DocumentFragment` in both cases.

---

## Approach

1. Create a `DocumentFragment`.
2. Normalise input: if not an array, wrap in `[json]`.
3. For each entry in the array:
   - `document.createElement(entry.type)`.
   - If `entry.props` exists, iterate keys and call `element.setAttribute(key, value)`.
   - If `entry.children` is an array → recursively call `JSONtoHTML(child)` for each child and `appendChild` the result.
   - If `entry.children` is a string → `element.innerText = entry.children`.
   - `fragment.appendChild(element)`.
4. Return the fragment.

---

## Time & Space Complexity

| Operation | Complexity |
|---|---|
| Time | O(n) — n = total nodes across the entire JSON tree |
| Space | O(d) — call stack depth = nesting depth of JSON |
