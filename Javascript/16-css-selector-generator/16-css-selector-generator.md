# CSS Selector Generator

## Problem Statement

Given a `root` DOM node and a `target` DOM node, generate an exact CSS selector string that uniquely identifies the path from `root` to `target`.

---

## Examples

```html
<div id="root">
  <article>Prepare for interview</article>
  <section>
    on
    <p>
      <span>
        Learnersbucket
        <button>click me!</button>
        <button id="target">click me!</button>
      </span>
    </p>
  </section>
</div>
```

```js
const root   = document.getElementById("root");
const target = document.getElementById("target");
console.log(generateSelector(root, target));
// "div[id='root'] > section:nth-child(2) > p:nth-child(1) > span:nth-child(1) > button:nth-child(2)"
```

---

## Constraints

- `target` is always a descendant of `root`.
- Use `nth-child` for all intermediate nodes to ensure uniqueness.
- The root node is identified by its `id` attribute.
- CSS `nth-child` is 1-indexed (not 0-indexed like arrays).

---

## Approach

Trace from `target` back up to `root` (reverse DFS):

1. Start a `while` loop running until `target === root`.
2. In each iteration:
   - Find the 1-based index of `target` among its parent's children: `Array.from(target.parentNode.children).indexOf(target) + 1`.
   - Build the selector segment: `` `${tagName}:nth-child(${n})` ``.
   - `unshift` it into a `selectors` array (building front-to-back).
   - Move `target = target.parentNode`.
3. After the loop, `unshift` the root's segment: `` `${tagName}[id="${root.id}"]` ``.
4. `join(' > ')` and return.

---

## Time & Space Complexity

| Operation | Complexity |
|---|---|
| Time | O(d × w) — d = depth from root to target, w = max children per node (for indexOf) |
| Space | O(d) — selectors array grows with depth |
