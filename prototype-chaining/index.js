import { deepStrictEqual } from 'assert'

// internally, object literals turn into explicit functions

const obj = {} // new Object
const arr = [] // new Array
const fn = () => {} // new Function

// __proto__ is the reference of the object that has the properties on it

deepStrictEqual(new Object().__proto__, {}.__proto__)
deepStrictEqual(Object.prototype, {}.__proto__)

deepStrictEqual(new Array().__proto__, [].__proto__)
deepStrictEqual(Array.prototype, [].__proto__)

deepStrictEqual(new Function().__proto__, fn.__proto__)
deepStrictEqual(Function.prototype, fn.__proto__)

// ------------------

function Employee() {}
Employee.prototype.salary = () => 'salary**'

function Supervisor() {}

Supervisor.prototype = Object.create(Employee.prototype)
Supervisor.prototype.profitShare = () => 'profit share**'

function Manager() {}

Manager.prototype = Object.create(Supervisor.prototype)
Manager.prototype.monthlyBunuses = () => 'monthly bonuses**'

// If you don't call the constructor with new, the first __proto__ will always be the initial contructor instance
// without inheriting from other classes

deepStrictEqual(Manager.__proto__, Function.__proto__)
deepStrictEqual(new Manager().__proto__, Manager.prototype)

const manager = new Manager()

deepStrictEqual(manager.salary(), Employee.prototype.salary())
deepStrictEqual(manager.profitShare(), Supervisor.prototype.profitShare())
deepStrictEqual(manager.monthlyBunuses(), Manager.prototype.monthlyBunuses())

deepStrictEqual(manager.__proto__, Manager.prototype)
deepStrictEqual(manager.__proto__.__proto__, Supervisor.prototype)
deepStrictEqual(manager.__proto__.__proto__.__proto__, Employee.prototype)
deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__, Object.prototype)
deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__.__proto__, null)

// ------------------

class T1 {
  ping() { return 'ping' }
}

class T2 extends T1 {
  pong() { return 'pong' }
}

class T3 extends T2 {
  shoot() { return 'shoot' }
}

const t3 = new T3()

deepStrictEqual(t3.ping(), T1.prototype.ping())
deepStrictEqual(t3.pong(), T2.prototype.pong())
deepStrictEqual(t3.shoot(), T3.prototype.shoot())

deepStrictEqual(t3.__proto__, T3.prototype)
deepStrictEqual(t3.__proto__.__proto__, T2.prototype)
deepStrictEqual(t3.__proto__.__proto__.__proto__, T1.prototype)
deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__, Object.prototype)
deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__.__proto__, null)
