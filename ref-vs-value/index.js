import { deepStrictEqual } from 'assert'

// Primitive types generate an in-memory copy

let counter = 0
let counter2 = counter

counter2++

deepStrictEqual(counter, 0)
deepStrictEqual(counter2, 1)

// Reference types generate a copy of the memory address,
// that is, item and item2 are the same variable

const item = { counter: 0 }
const item2 = item

item2.counter++

deepStrictEqual(item.counter, 1)
deepStrictEqual(item2.counter, 1)

item.counter++

deepStrictEqual(item.counter, 2)
deepStrictEqual(item2.counter, 2)

item.test = 3

deepStrictEqual(item.test, 3)
deepStrictEqual(item2.test, 3)


