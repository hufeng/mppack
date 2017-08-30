"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gulp = require("gulp");
const ts = require("gulp-typescript");
const plugin_1 = require("../plugin");
const resolver_1 = require("./resolver");
const tsProject = ts.createProject('tsconfig.json');
/**
 * typescript
 */
class TypeScriptResolver extends resolver_1.default {
    pattern() {
        return [
            //扫描所有的typescript文件
            '**/*.ts',
            '!vendor/**',
            //排除dest目录下的文件
            `!${this.output}/**`,
            //排除node_modules下面的文件
            '!node_modules/**'
        ];
    }
    transform(pattern) {
        gulp
            .src(pattern)
            .pipe(plugin_1.log())
            .pipe(tsProject())
            .js.pipe(plugin_1.babelTransform('module'))
            .pipe(gulp.dest(this.output));
    }
}
exports.default = TypeScriptResolver;
