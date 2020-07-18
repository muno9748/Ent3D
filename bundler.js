const time = Date.now();
const { readFileSync, writeFileSync } = require('fs');
const babel = require('@babel/core');
const config = JSON.parse(readFileSync(`${__dirname}/bundler.config.json`).toString())
const outPath = config.out.replace(/\{\{\s*version\s*\}\}/gi, process.argv[2] || 'latest');
const order = config.order.map(l => l.replace(/\{\{\s*version\s*\}\}/gi, process.argv[2] || 'latest'));
let raw = ";";

order.forEach(l => {
    const regExp = /^(import\s+\{\s*[a-zA-Z0-9\.\/'"\, ]+\s*\}\s+from\s+([a-zA-Z0-9\.\/'"])*;{0,1})/;
    let v = readFileSync(`${__dirname}${l.startsWith('/') ? l : `/${l}`}`).toString().trim();
    while(regExp.test(v)) {
        v = v.replace(regExp, '').trim()
    }
    raw += v;
    raw += "\n\n;";
})

raw = raw.trim();
raw = `;(async () => {\n${raw}\n;})();`;

writeFileSync(outPath, babel.transformSync(raw, {
    presets: ["minify"]
}).code);

console.log(`Bundled ${order.length} files in ${Date.now() - time}ms!`)