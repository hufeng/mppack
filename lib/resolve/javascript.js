"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gulp = require("gulp");
const plugin_1 = require("../plugin");
const resolver_1 = require("./resolver");
/**
 * 解析js文件，进行babel-transform
 */
class JSResolver extends resolver_1.default {
    pattern() {
        return [
            //扫描所有的js
            '**/*.js',
            //排除ouput目录下面的js
            `!${this.output}/**`,
            //排除node_modules下面的js
            '!node_modules/**'
        ];
    }
    /**
     * 转换
     * @param pattern
     */
    transform(pattern) {
        gulp
            .src(pattern)
            .pipe(plugin_1.log())
            .pipe(plugin_1.babelTransform())
            .pipe(gulp.dest(this.output));
    }
}
exports.default = JSResolver;
