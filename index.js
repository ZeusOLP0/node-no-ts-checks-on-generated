import { readFile, writeFile } from 'fs'
import { getFilesRecursively } from './shared.js'

export const removeChecks = (fileDirectory) => {
    const files = getFilesRecursively(fileDirectory)

    files.forEach((file) => {
        if (file.endsWith('.ts')) {
            readFile(file, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading file:', err)
                    process.exit(1)
                }

                let lines = data.split('\n')
                lines.splice(0, 0, '// @ts-nocheck\n')

                const updatedContent = lines.join('\n')

                writeFile(file, updatedContent, 'utf8', (err) => {
                    if (err) {
                        console.error('Error writing to file:', err)
                        process.exit(1)
                    }
                })
            })
        }
    })
}
