import { camelCase, isArray, isPlainObject, map, range, snakeCase } from 'lodash/fp';
import moment from 'moment';
import { Platform } from 'react-native';

/**
 * Returns the current date as a String
 *
 * @return {String}
 */
export function dateString(date) {
  const parsedDate = date ? date : new Date();
  return moment(parsedDate).format('YYYY-MM-DD');
}

/**
 * Returns an array representing a range of days between startDate and today
 *
 * @return {Array<Date>}
 */
export function dateRangeUntilToday(startDate) {
  const currentDate = moment(new Date()).startOf('day');
  const firstEventDate = moment(startDate).startOf('day');
  const days = currentDate.diff(firstEventDate, 'days') + 1;
  return map(day => {
    return moment(startDate)
      .add(day, 'days')
      .toDate();
  })(range(1)(days));
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

/**
 * Returns the platform prefix for an Ionicon icon
 */
export const iconPrefix = Platform.OS === 'ios' ? 'ios' : 'md';
