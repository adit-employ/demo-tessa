const isFunction = data => typeof data === 'function'
const isEmpty = data => [Object, Array].includes((data || {}).constructor) && !Object.entries((data || {})).length;
const isObject = data => typeof data === 'object' && !Array.isArray(data) && data !== null
const isObjectEmpty = data => data && Object.keys(data).length == 0 && Object.getPrototypeOf(data) === Object.prototype
const isDecimal = num => num % 1 != 0

export {
  isFunction,
  isEmpty,
  isObject,
  isObjectEmpty,
  isDecimal,
}
