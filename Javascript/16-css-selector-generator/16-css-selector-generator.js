// CSS Selector Generator
// Given a root node and target node, generate a CSS selector path from root to target

const generateSelector = (root, target) => {
  // TODO
  let selectors = [];
  while (target != root) {
    const nthChild = Array.from(target.parentNode.children).indexof(target) + 1;
    const selector = `${target.tagName.toLowerCase()}:nth-child(${nthChild})`;
    selectors.unshift(selector);
    target = target.parentNode;
  }
  selectors.unshift(`${target.tagName.toLowerCase()}[id="${target.id}"]`);
  return selectors.join(" > ");
};

// --- Tests ---
// Run in browser console or paste HTML + script together

/*
HTML:
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
*/

const root = document.getElementById("root");
const target = document.getElementById("target");
console.log(generateSelector(root, target));
// "div[id='root'] > section:nth-child(2) > p:nth-child(1) > span:nth-child(1) > button:nth-child(2)"
