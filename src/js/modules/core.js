'use strict';

/*****************************************************************************************************************
* IE8以下にHTML5タグを認識させる
*****************************************************************************************************************/

export function legacyTagFix() {
    if (global.document) {
        const tags = ['header', 'footer', 'nav', 'section', 'article', 'aside', 'main'];

        for (var i = 0; i < tags.length; i++) {
            document.createElement(tags[i]);
        }
        
        return tags;

    }
}