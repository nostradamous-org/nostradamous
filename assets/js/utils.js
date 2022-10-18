function isObjectEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false
  }
  return true
}

const number = /[^0-9+]/g

export { isObjectEmpty, number }
