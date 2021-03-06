import { directive, isPrimitive, NodePart } from '../malefic-html';

// For each part, remember the value that was last rendered to the part by the
// unsafeHTML directive, and the DocumentFragment that was last set as a value.
// The DocumentFragment is used as a unique key to check if the last value
// rendered to the part was with unsafeHTML. If not, we'll always re-render the
// value passed to unsafeHTML.
const previousValues = new WeakMap();

/**
 * Renders the result as HTML, rather than text.
 *
 * Note, this is unsafe to use with any user-provided input that hasn't been
 * sanitized or escaped, as it may lead to cross-site-scripting
 * vulnerabilities.
 */
export const unsafeHTML = directive((value) => (part) => {
    if (!(part instanceof NodePart)) {
        throw new Error('unsafeHTML can only be used in text bindings');
    }
    
    const previousValue = previousValues.get(part);
    
    if (previousValue !== undefined && isPrimitive(value) &&
        value === previousValue.value && part.value === previousValue.fragment) {
        return;
    }
    
    const template = document.createElement('template');
    template.innerHTML = value;  // innerHTML casts to string internally
    const fragment = document.importNode(template.content, true);
    part.setValue(fragment);
    previousValues.set(part, {value, fragment});
});
