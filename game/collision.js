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
}