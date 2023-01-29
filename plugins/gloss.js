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
            return `<pre data-gloss class="ipa">${sections.join('')}</pre>`;
        } else {
            // Pass through to default handling.
            return this.origin.code.apply(this, arguments);
        }
    }

    /**
     * The sigil marking inline IPA.
     * @constant @type {string} @default
     */
    const IPA_SIGIL = 'ipa';

    /**
     * Wrap inline code starting with `ipa` in spans.
     * @param {string} code - The text of the inline code.
     * @returns {string} The rendered text.
     */
    function ipa(code) {
        if (code.startsWith(IPA_SIGIL)) {
            return `<span class="ipa">${code.slice(IPA_SIGIL.length)}</span>`;
        } else {
          return this.origin.code.apply(this, arguments);
        }
    }

    const newRenderer = {
        code: gloss,
        codespan: ipa,
    };

    global.$docsify ??= {markdown: {renderer: {}}};
    global.$docsify.markdown ??= {renderer: {}};

    if (typeof global.$docsify.markdown == 'function') {
        const OLD_MARKED_INIT = global.$docsify.markdown;
        global.$docsify.markdown = function(marked, renderer) {
            Object.assign(renderer, newRenderer);
            return OLD_MARKED_INIT(marked, Object.assign(renderer, newRenderer));
        };
    } else {
        global.$docsify.markdown.renderer ??= {};
        Object.assign(global.$docsify.markdown.renderer, newRenderer);
    }

})(globalThis);

