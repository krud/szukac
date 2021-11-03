const fs = require('fs');
const { component, test, barrel } = require('./component_template');

const [name] = process.argv.slice(2);
if(!name) throw new Error('Please include a component name.');

const dir = `./src/pages/${name}`;

if (fs.existsSync(dir)) throw new Error('A component with that name already exists.');
fs.mkdirSync(dir);

function writeFileErrorHandler(err){
    if (err) throw err;
}

fs.writeFile(`${dir}/${name}.tsx`, component(name), writeFileErrorHandler);
fs.writeFile(`${dir}/${name}.css`, '', writeFileErrorHandler);
fs.writeFile(`${dir}/${name}.test.tsx`, test(name), writeFileErrorHandler);
fs.writeFile(`${dir}/${name}.index. tsx`, barrel(name), writeFileErrorHandler);