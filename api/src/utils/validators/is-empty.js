/**
 * Check if a variable of any type is empty.
 * 
 * @param {*} value object to validate. 
 * @return true if element is valid.
 */
const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0)

module.exports = isEmpty