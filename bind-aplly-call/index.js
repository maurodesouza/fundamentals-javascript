'use strict'

import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

import { watch } from 'fs'
import { readFile } from 'fs/promises'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

class File {
  watch(_, filename) {
    this.showContent(filename)
  }

  async showContent(filename) {
    const path = resolve(__dirname, filename)

    console.log((await readFile(path)).toString())
  }
}

const file = new File()

watch(__filename, file.watch.bind(file))

file.watch.call({ showContent: filename => console.log(filename) }, null, 'Ahhh... Hello??')
file.watch.apply({ showContent: filename => console.log(filename) }, [null, 'Ahhh... Hello??'])
