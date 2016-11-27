const jsonfile = require('jsonfile')

const packagejson = jsonfile.readFileSync('./package.json')

delete packagejson.devDependencies
delete packagejson.dependencies

jsonfile.writeFileSync('./dist/package.json', packagejson, { spaces: 2 })
