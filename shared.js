import { readdirSync, statSync } from 'fs'
import { join } from 'path'
let files = []

const getFilesRecursively = (directory) => {
  const filesInDirectory = readdirSync(directory)
  for (const file of filesInDirectory) {
    const absolute = join(directory, file)
    if (statSync(absolute).isDirectory()) {
      getFilesRecursively(absolute)
    } else {
      files.push(absolute)
    }
  }
  return files
}

export { getFilesRecursively }