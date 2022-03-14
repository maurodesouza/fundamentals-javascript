'use-strict'

import Event from 'events'
const event = new Event()

const eventName = 'counter'
event.on(eventName, msg => console.log('msg', msg))

const myCounter = {
  counter: 0
}

const proxy = new Proxy(myCounter, {
  set: (target, key, value) => {
    event.emit(eventName, { value, key: key })
    target[key] = value

    return true
  },

  get: (obj, prop) => obj[prop]
})

setInterval(function() {
  proxy.counter += 1
  console.log('[3] - setInterval')

  if (proxy.counter === 10) clearInterval(this)
}, 200)

setTimeout(() => {
  console.log('[2] - setTimeout')
}, 0)

setImmediate(() => {
  console.log('[1] - setImmediate')
})

process.nextTick(() => {
  console.log('[0] - next tick')
})
