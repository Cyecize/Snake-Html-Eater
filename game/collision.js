class CollisionUtils {
    static getCollidingDOMObjects(domObjectArray, point) {
        let collidedObjects = [];

        for (let domObject of domObjectArray) {
            if (!domObject.isHidden && domObject.collides(point)) {
                collidedObjects.push({
                    tag: domObject.DOMReference.tagName,
                    DOMObject: domObject,
                });
            }
        }

        return collidedObjects;
    }

    static findClickedWord(parentElt, snakeDOMElement) {
        let domRect = snakeDOMElement.getBoundingClientRect();

        let x = domRect.x;
        let y = domRect.y;

        if (parentElt.nodeName !== '#text') {
            console.log('didn\'t click on text node');
            return null;
        }

        let range = document.createRange();
        let words = parentElt.textContent.split(' ');
        let start = 0;
        let end = 0;

        for (let i = 0; i < words.length; i++) {
            let word = words[i];
            end = start + word.length;
            range.setStart(parentElt, start);
            range.setEnd(parentElt, end);

            // not getBoundingClientRect as word could wrap
            let rects = range.getClientRects();
            let clickedRect = isClickInRects(rects);
            if (clickedRect) {
                return [word, start, clickedRect];
            }
            start = end + 1;
        }

        function isClickInRects(rects) {
            for (let i = 0; i < rects.length; ++i) {
                let r = rects[i];
                if (r.left < x && r.right > x && r.top < y && r.bottom > y) {
                    return r;
                }
            }
            return false;
        }

        return null;
    }
}