const express = require('express'),
    router = express.Router(),
    modules = require(path.join(__basedir, "modules"));

console.log(modules);

router.get('/', function(req, res, next) {
  res.send("<pre>" + JSON.stringify(modules, function(entry, val) {
    if(typeof val === "function") {
        return "function[" + val.length + "]";
    }
    return val;
  }, 2) + "</pre>");
});

router.get('/:module', async function(req, res, next) {
    const mod = modules[req.params.module];
    if(!mod || !mod.get) {
        next();
    }
    res.send(mod.get());
});

router.post('/:module', async function(req, res, next) {
    const mod = modules[req.params.module];
    if(!mod || !mod.post) {
        next();
    }
    res.send(mod.post(req.body));
});

module.exports = router;
