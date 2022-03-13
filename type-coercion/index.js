import { deepStrictEqual, throws } from 'assert'

// explicit convertion to string
deepStrictEqual(String(123), '123')

// implicit convertion to string
deepStrictEqual(123 + '', '123')

// || returns the first true element or last false
deepStrictEqual(('hello' || 123), 'hello')
deepStrictEqual((false || 123 || 'hello'), 123)

deepStrictEqual((null || undefined || false), false)
deepStrictEqual((false || null), null)

// && returns the first false element or last true
deepStrictEqual(('hello' && 123), 123)
deepStrictEqual(({} && 123 && 'hello'), 'hello')

deepStrictEqual((null && undefined && false), null)
deepStrictEqual((false && null), false)

// -------------------------------------

// toString is called when try to convert to string, if return not primitive value, call valueOf
// valueOf is called when try to convert to number, if return not primitive value, call toString

const item = {
  name: 'Mauro de Souza',
  age: 21,

  toString() {
    return 'test'
  },

  valueOf() {
    return 1
  },
}

deepStrictEqual(String(item), 'test')
deepStrictEqual(Number(item), 1)

const item2 = {
  name: 'Mauro de Souza',
  age: 21,

  toString() {
    return 'test'
  },

  valueOf() {
    return {}
  },
}

deepStrictEqual(String(item2), 'test')
deepStrictEqual(Number(item2), NaN)

const item3 = {
  name: 'Mauro de Souza',
  age: 21,

  toString() {
    return {}
  },

  valueOf() {
    return 1
  },
}

deepStrictEqual(String(item3), '1')
deepStrictEqual(Number(item3), 1)

const item4 = {
  name: 'Mauro de Souza',
  age: 21,

  toString() {
    return {}
  },

  valueOf() {
    return {}
  },
}

const error = new TypeError('Cannot convert object to primitive value')

throws(() => String(item4), error)
throws(() => Number(item4), error)

// toPrimitive takes priority, so valueOf and toString will be ignored

const item5 = {
  name: 'Mauro de Souza',
  age: 21,

  toString() {
    return 'test'
  },

  valueOf() {
    return 100
  },

  // coercionType can be string | number | default
  [Symbol.toPrimitive](coercionType) {
    console.info('trying to covert to', coercionType)

    const types = {
      string: 'hey',
      number: 1,
    }

    return types[coercionType] || types.string
  }
}

deepStrictEqual(String(item5), 'hey') // coercionType = string
deepStrictEqual(Number(item5), 1) // coercionType = number
deepStrictEqual(item5 + 0, 'hey0') // coercionType = default
