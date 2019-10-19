import moment from 'moment';

/**
 * Returns the current date as a String
 *
 * @return {String}
 */
export function dateString() {
  return moment().format('YYYY-MM-DD');
}
