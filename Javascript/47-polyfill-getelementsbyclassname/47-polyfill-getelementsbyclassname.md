# Polyfill for getElementsByClassName()

## Problem Statement

Write a custom `findByClass(className)` function that searches the DOM (starting from `document.body`) and returns **all elements** whose `classList` contains the given class name — in **DFS (depth-first) order**.

```js
// Given DOM:
// <div class="a" id="root">
//   <div class="b" id="b-1">
//     <div class="a" id="a-2">...</div>
//     <div class="c" id="c-1">
//       <div class="a" id="a-3">...</div>
//     </div>
//   </div>
// </div>

findByClass('a');
// [div#root, div#a-2, div#a-3]
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| DFS traversal | Process current node first, then recurse into `children` — matches browser's document order |
| `classList.contains` | Use this instead of string matching on `className` to handle multi-class elements correctly |
| Start from `document.body` | Mirrors native `getElementsByClassName` which searches the entire document subtree |
| Result order | Pre-order DFS — parent before its children, siblings in DOM order |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Time | O(n) — visits every node exactly once |
| Space | O(d) call stack depth where d = DOM depth; O(n) for the result array |
