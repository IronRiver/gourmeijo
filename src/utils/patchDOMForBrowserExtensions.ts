export default function patchDOMForBrowserExtensions() {
  if (typeof Node === "function" && Node.prototype != null) {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const originalRemoveChild = Node.prototype.removeChild;
    Node.prototype.removeChild = function (...args) {
      const [child] = args;
      try {
        return originalRemoveChild.apply<Node, typeof args, typeof child>(
          this,
          args
        );
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "NotFoundError" &&
          child.parentNode !== this
        ) {
          console?.warn(
            "Cannot remove a child from a different parent",
            child,
            this,
            error
          );
          return child;
        }

        throw error;
      }
    };

    // eslint-disable-next-line @typescript-eslint/unbound-method
    const originalInsertBefore = Node.prototype.insertBefore;
    Node.prototype.insertBefore = function (...args) {
      const [node, child] = args;
      try {
        return originalInsertBefore.apply<Node, typeof args, typeof node>(
          this,
          args
        );
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "NotFoundError" &&
          child != null &&
          child.parentNode !== this
        ) {
          console.warn(
            "Cannot insert before a reference node from a different parent",
            child,
            this,
            error
          );
          return node;
        }

        throw error;
      }
    };
  }
}
