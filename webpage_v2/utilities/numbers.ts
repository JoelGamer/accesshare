/**
 * Parses string into an int, incase of the value is undefined, returns 0.
*/
export const parseInt = (value: string | undefined) => Number.parseInt(value || '0');