export function getElement(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        throw new Error(`Element ${selector} not found!`);
    }
    return element;
}
