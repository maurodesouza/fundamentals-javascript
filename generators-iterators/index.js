import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { deepStrictEqual } from 'assert'
import { readFile, stat, readdir } from 'fs/promises'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function* calculation(arg1, arg2) {
  yield arg1 * arg2
}

function* main() {
  yield 'Ahhh'
  yield '...'
  yield 'Hello?'
  yield* calculation(10, 20)
  yield 9
}

const generator = main()

deepStrictEqual(generator.next(), { value: 'Ahhh', done: false })
deepStrictEqual(generator.next(), { value: '...', done: false })
deepStrictEqual(generator.next(), { value: 'Hello?', done: false })
deepStrictEqual(generator.next(), { value: 200, done: false })
deepStrictEqual(generator.next(), { value: 9, done: false })
deepStrictEqual(generator.next(), { value: undefined, done: true })

deepStrictEqual(Array.from(main()), ['Ahhh', '...', 'Hello?', 200, 9])
deepStrictEqual([...main()], ['Ahhh', '...', 'Hello?', 200, 9])

// ---- async iterators

async function* systemInfo() {
  const file = await readFile(__filename)
  yield { file: file.toString().split('\n')[0] }

  const { size } = await stat(__filename)
  yield { size }

  const dir = await readdir(__dirname)
  yield { dir }
}

for await (const item of systemInfo()) {
  console.info(item)
}

