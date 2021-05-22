/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
export function htmlToElement(html: string) {
  var template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

/**
 * @param {String} HTML representing any number of sibling elements
 * @return {NodeList}
 */
export function htmlToElements(html: string) {
  var template = document.createElement("template");
  template.innerHTML = html;
  return template.content.childNodes;
}

export const pinIconHMTL = `<svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 24 24"
stroke="currentColor"
>
    <path
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="1"
    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
    />
</svg>`;
