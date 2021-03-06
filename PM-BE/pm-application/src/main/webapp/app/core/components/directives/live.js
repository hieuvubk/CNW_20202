import { AttributePart, BooleanAttributePart, directive, EventPart, NodePart, PropertyPart } from '../malefic-html';

/**
 * Checks binding values against live DOM values, instead of previously bound
 * values, when determining whether to update the value.
 *
 * This is useful for cases where the DOM value may change from outside of
 * malefic-html, such as with a binding to an `<input>` element's `value` property,
 * a content editable elements text, or to a custom element that changes it's
 * own properties or attributes.
 *
 * In these cases if the DOM value changes, but the value set through malefic-html
 * bindings hasn't, malefic-html won't know to update the DOM value and will leave
 * it alone. If this is not what you want—if you want to overwrite the DOM
 * value with the bound value no matter what—use the `live()` directive:
 *
 *     html`<input .value=${live(x)}>`
 *
 * `live()` performs a strict equality check against the live DOM value, and if
 * the new value is equal to the live value, does nothing. This means that
 * `live()` should not be used when the binding will cause a type conversion. If
 * you use `live()` with an attribute binding, make sure that only strings are
 * passed in, or the binding will update every render.
 */
export const live = directive(
    (value) => (part) => {
        let previousValue;
        if (part instanceof EventPart || part instanceof NodePart) {
            throw new Error(
                'The `live` directive is not allowed on text or event bindings');
        }
        if (part instanceof BooleanAttributePart) {
            checkStrings(part.strings);
            previousValue = part.element.hasAttribute(part.name);
            // This is a hack needed because BooleanAttributePart doesn't have a
            // committer and does its own dirty checking after directives
            part.value = previousValue;
        } else {
            const {element, name, strings} = part.committer;
            checkStrings(strings);
            if (part instanceof PropertyPart) {
                previousValue = element[name];
                if (previousValue === value) {
                    return;
                }
            } else if (part instanceof AttributePart) {
                previousValue = element.getAttribute(name);
            }
            if (previousValue === String(value)) {
                return;
            }
        }
        part.setValue(value);
    });

const checkStrings = (strings) => {
    if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
        throw new Error('`live` bindings can only contain a single expression');
    }
};
