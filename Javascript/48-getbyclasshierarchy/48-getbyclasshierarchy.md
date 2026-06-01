# Implement getByClassNameHierarchy() function

## Problem Statement

Write `getByClassNameHierarchy(element, classPath)` that takes a root element and a `">"` separated class path, then returns all elements that satisfy the **full hierarchy** from root to the last class in the path.

```js
// <div class="a" id="root">
//   <div class="b" id="b-1">
//     <div class="c" id="c-1"></div>
//     <div class="c" id="c-2"></div>
//   </div>
//   <div class="c" id="c-3"/>   ← skipped: no 'b' ancestor in path
// </div>

getByClassNameHierarchy(root, 'a>b>c');
// [div#c-1, div#c-2]
```

---

## Key Design Points

| Concept | Detail |
|---|---|
| Split path | `classPath.split('>')` gives the ordered list of classes to match |
| Index tracker | Passed down recursion — increments only when the current node matches the current class |
| Terminal condition | When `index === classList.length - 1` and the node has the class, push to result and stop |
| Reset on mismatch | If a child doesn't match the current class, restart from index `0` (search from root of path) |
| DFS traversal | Recurse into every child to find all valid paths |

---

## Time & Space Complexity

| | Complexity |
|---|---|
| Time | O(n) — each node visited once |
| Space | O(d) call stack depth + O(k) result size |
