// Polyfill for getElementsByStyle()
// Find all DOM elements under a root whose computed CSS property matches a value

const getPropertyComputedValue = (property, value) => {
  // TODO — create a temp element, get its computed style, remove it, return the value
  const div = document.createElement("div");
  div.style[property] = value;
  const styles = window.getComputedStyle(document.body.appendChild(div));
  const result = styles[property];
  document.body.removeChild(div);
  return result;
};

function getElementsByStyle(rootElement, property, value) {
  const computedValue = getPropertyComputedValue(property, value);
  let result = [];
  const search = (element, property, value) => {
    const getStyle = window.getComputedStyle(element);
    const valueCal = getStyle[property];
    if (computedValue == valueCal) {
      result.push(element);
    }
  };
  for (const child of rootElement.children) {
    search(child, property, value);
  }
  search(rootElement, property, value);
  return result;
}

// --- Tests ---
// This file is meant to run in a browser environment (open in an HTML page).
// Paste the script into the browser console or link it from an HTML file.

/*
Expected setup:

<div id="root">
  <div class="alpha" style="padding: 10px; background-color: red;"></div>
  <div class="beta"  style="padding-top: 10px; background-color: #000;"></div>
  <div class="gamma" style="padding: 10px 0 0; background-color: rgb(255,0,0);"></div>
</div>

Test 1 — paddingTop: "10px" should match all three children
const root = document.getElementById("root");
const byPadding = getElementsByStyle(root, "paddingTop", "10px");
console.log("[getElementsByStyle] paddingTop matches:", byPadding.length === 3 ? "Success" : "Fail");

Test 2 — backgroundColor: "red" should match alpha and gamma (both are rgb(255,0,0))
const byColor = getElementsByStyle(root, "backgroundColor", "red");
console.log("[getElementsByStyle] backgroundColor matches:", byColor.length === 2 ? "Success" : "Fail");

Test 3 — a property with no matches should return an empty array
const byNone = getElementsByStyle(root, "borderRadius", "50%");
console.log("[getElementsByStyle] no match returns []:", byNone.length === 0 ? "Success" : "Fail");

Test 4 — getPropertyComputedValue normalises "red" to its rgb form
const computed = getPropertyComputedValue("backgroundColor", "red");
console.log("[getPropertyComputedValue] red → rgb:", computed === "rgb(255, 0, 0)" ? "Success" : "Fail");
*/
