import moment from 'moment';
import { camelCase, isArray, isPlainObject, snakeCase } from 'lodash/fp';

/**
 * Returns the current date as a String
 *
 * @return {String}
 */
export function dateString() {
  return moment().format('YYYY-MM-DD');
}

/**
 * Recursively maps an object, returning a new object where the keys have been
 * modified by the iterator.
 *
 * @param {Object} input
 * @param {Function} iteratee
 * @return {Object}
 */
export const deepMapKeys = (input, iteratee) => {
  if (!isPlainObject(input)) return input;
  const result = {};

  Object.keys(input).forEach(key => {
    let value = input[key];
    if (isPlainObject(value)) {
      value = deepMapKeys(value, iteratee);
    }
    if (isArray(value)) {
      value = value.map(v => deepMapKeys(v, iteratee));
    }
    result[iteratee(key, value)] = value;
  });

  return result;
};

/**
 * Returns a new object with all keys in camel case. Also converts deeply nested keys.
 *
 * @param {Object} input
 * @return {Object}
 */
export const camelCaseObject = input => deepMapKeys(input, key => camelCase(key));

/**
 * Returns a new object with all keys in snake case. Also converts deeply nested keys.
 *
 * @param {Object} input
 * @return {Object}
 */
export const snakeCaseObject = input => deepMapKeys(input, key => snakeCase(key));
