"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gulp = require("gulp");
const plugin_1 = require("../plugin");
const resolver_1 = require("./resolver");
/**
 * 图片resolver
 */
class ImageResolver extends resolver_1.default {
    /**
     * 当前过滤的pattern
     */
    pattern() {
        return [
            //扫描所有的js
            '**/*.png',
            '**/*.jpg',
            '**/*.gif',
            //排除ouput目录下面的js
            `!${this.output}/**`,
            //排除node_modules下面的js
            '!node_modules/**'
        ];
    }
    /**
     * 转换函数
     * @param pattern
     */
    transform(pattern) {
        gulp
            .src(pattern)
            .pipe(plugin_1.log())
            .pipe(gulp.dest(this.output));
    }
}
exports.default = ImageResolver;
