"use strict";

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 |----------------------------------------------------------------
 | Module Compilation Task
 |----------------------------------------------------------------
 |
 | This task will run a gulpfile in the specified module
 | allowing you to keep your application and its
 | assets clean and modular.
 |
 */

Elixir.extend("module", function (modules, baseDir, fileName) {
    baseDir = baseDir || Elixir.config.appPaths["modules_app"];
    fileName = fileName || "elixir-module.js";

    if (!Array.isArray(modules)) {
        modules = [modules];
    }

    modules.forEach(function (module) {
        discoverModule(module, baseDir, fileName);
    });
});

Elixir.extend("modules", function (includes, excludes, fileName) {
    includes = includes || [Elixir.config.appPaths["modules_app"]];
    excludes = excludes || [];
    fileName = fileName || "elixir-module.js";

    if (!Array.isArray(includes)) {
        includes = [includes];
    }

    includes.forEach(function (baseDir) {
        var modules = _fs2.default.readdirSync(_path2.default.resolve(baseDir)).filter(function (file) {
            return _fs2.default.statSync(_path2.default.resolve(baseDir, file)).isDirectory();
        }).filter(function (dir) {
            return excludes.indexOf(dir) < 0;
        }).filter(function (dir) {
            return _fs2.default.existsSync(_path2.default.join(baseDir, dir, fileName));
        });

        modules.forEach(function (module) {
            return discoverModule(module, baseDir, fileName);
        });
    });
});

function discoverModule(moduleName, baseDir, fileName) {
    var modulePath = _path2.default.join(baseDir, moduleName);
    var moduleGulpfilePath = _path2.default.resolve(_path2.default.join(modulePath, fileName));
    try {
        var moduleGulpfile = require(moduleGulpfilePath);
    } catch (err) {
        Elixir.log.error("No " + fileName + " found in " + modulePath);
        return;
    }
    var originalBasePath = Elixir.config.basePath;
    Elixir.config.basePath = modulePath;
    try {
        moduleGulpfile(Elixir.mixins);
    } catch (err) {
        Elixir.log.error(fileName + " in " + modulePath + " does not expose a mix function.\n\nSomething like:\n\nmodule.exports = function( mix ) {\n    mix.sass( \"app.scss\" );\n};");
        return;
    } finally {
        Elixir.config.basePath = originalBasePath;
    }
}