import { directive } from '../malefic-html';

const previousValues = new WeakMap();

/**
 * Prevents re-render of a template function until a single value or an array of
 * values changes.
 *
 * Example:
 *
 * ```js
 * html`
 *   <div>
 *     ${guard([user.id, company.id], () => html`...`)}
 *   </div>
 * ```
 *
 * In this case, the template only renders if either `user.id` or `company.id`
 * changes.
 *
 * guard() is useful with immutable data patterns, by preventing expensive work
 * until data updates.
 *
 * Example:
 *
 * ```js
 * html`
 *   <div>
 *     ${guard([immutableItems], () => immutableItems.map(i => html`${i}`))}
 *   </div>
 * ```
 *
 * In this case, items are mapped over only when the array reference changes.
 *
 * @param value the value to check before re-rendering
 * @param f the template function
 */
export const guard = directive((value, f) => (part) => {
    const previousValue = previousValues.get(part);
    if (Array.isArray(value)) {
        // Dirty-check arrays by item
        if (Array.isArray(previousValue) &&
            previousValue.length === value.length &&
            value.every((v, i) => v === previousValue[i])) {
            return;
        }
    } else if (
        previousValue === value &&
        (value !== undefined || previousValues.has(part))) {
        // Dirty-check non-arrays by identity
        return;
    }
    
    part.setValue(f());
    // Copy the value if it's an array so that if it's mutated we don't forget
    // what the previous values were.
    previousValues.set(
        part, Array.isArray(value) ? Array.from(value) : value);
});
