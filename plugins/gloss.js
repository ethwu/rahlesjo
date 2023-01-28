;(function(global) {
    'use strict';

    /**
     * The language code to convert.
     * @constant @type {string} @default
     */
    const GLOSS_LANG_CODE = 'gloss';
    /**
     * The sigil marking new lines.
     * @constant @type {string} @default
     */
    const GLOSS_SIGIL = '->';

    /**
     * Render code blocks with the `gloss` language as a Leipzig.js-compatible
     * block. Each line of the gloss should be prefixed by the sigil `->`.
     * @param {string} code - The text of the code block.
     * @param {string} lang - The language of the code block.
     * @returns {string} - The rendered HTML.
     */
    function gloss(code, lang) {
        if (lang?.toLowerCase() === GLOSS_LANG_CODE) {
            // Split text on the sigil and wrap non-empty sections with <p> tags.
            const sections = code
                .split(GLOSS_SIGIL)
                .filter(s => s.length > 0)
                .map(s => `<p>${s.trim()}</p>`);
            return `<div data-gloss>${sections.join('')}</div>`;
        } else {
            // Pass through to default handling.
            return this.origin.code.apply(this, arguments);
        }
    }

    global.$docsify ??= {markdown: {renderer: {}}};
    global.$docsify.markdown ??= {renderer: {}};
    global.$docsify.markdown.renderer ??= {};

    global.$docsify.markdown.renderer.code = gloss;
})(globalThis);

