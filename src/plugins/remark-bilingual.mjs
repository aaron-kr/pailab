// src/plugins/remark-bilingual.mjs
// Remark plugin: splits a markdown file into EN and KO language blocks.
//
// Usage in your .md files:
//   [English content here]
//
//   <!-- ko -->
//
//   [Korean content here]
//
// The plugin wraps the content before <!-- ko --> in <div class="lang-block lang-block-en">
// and the content after in <div class="lang-block lang-block-ko">.
//
// CSS in global.css then shows/hides the appropriate block based on html[lang].
// Files without <!-- ko --> are left untouched (all content remains visible).

/** @returns {import('unified').Plugin} */
export default function remarkBilingual() {
  return (tree) => {
    const children = tree.children;

    const splitIdx = children.findIndex(
      (node) => node.type === "html" && node.value.trim() === "<!-- ko -->"
    );

    if (splitIdx === -1) return; // no bilingual marker — leave file untouched

    const enNodes = children.slice(0, splitIdx);
    const koNodes = children.slice(splitIdx + 1);

    tree.children = [
      { type: "html", value: '<div class="lang-block lang-block-en">' },
      ...enNodes,
      { type: "html", value: "</div>" },
      { type: "html", value: '<div class="lang-block lang-block-ko">' },
      ...koNodes,
      { type: "html", value: "</div>" },
    ];
  };
}
