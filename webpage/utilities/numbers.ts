/**
 * Parses string into an int, incase of the value is undefined, returns 0.
*/
export const parseInt = (value: string | undefined) => Number.parseInt(value || '0');

// type ParseIntWithArray = FnWithArray | FnWithoutArray;
// type FnWithArray = (value: string | string[] | undefined, ignoreArray?: false) => number | number[];
// type FnWithoutArray = (value: string | string[] | undefined, ignoreArray?: true) => number;

export function parseIntQueryParams(value: string | string[] | undefined, ignoreArray: false): number | number[];
export function parseIntQueryParams(value: string | string[] | undefined, ignoreArray?: true): number;
export function parseIntQueryParams(value: string | string[] | undefined, ignoreArray = true) {
  if (typeof value === 'string') return parseInt(value);

  if (ignoreArray) return 0;

  if (typeof value === 'object') return value.map((v) => parseInt(v));

  return 0;
}
