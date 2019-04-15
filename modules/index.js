const fs = require("fs");

module.exports = fs.readdirSync(__dirname)
    .reduce((acc, cur) => {
        let modDir = path.join(__dirname, cur);
        if(fs.lstatSync(modDir).isDirectory()) {
            let mod = require(modDir);
            acc[mod.name] = mod;
        }
        return acc;
    }, {});