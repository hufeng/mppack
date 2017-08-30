"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gulp = require("gulp");
const plugin_1 = require("../plugin");
const resolver_1 = require("./resolver");
/**
 * sync json, wxml, wcss
 * 默认对小程序的资源文件不做处理，直接同步
 * 后期会支持一些模板的自定义功能👍
 */
class ResourceResovler extends resolver_1.default {
    pattern() {
        return [
            //扫描小程序的资源文件wxml, wcss, json
            `**/*.*(json|wxml|wxss)`,
            //排除
            '!package.json',
            '!package-lock.json',
            //排除
            '!tsconfig.json',
            //排除目标目录
            `!${this.output}/**`,
            //排除node_modules
            '!node_modules/**'
        ];
    }
    transform(pattern) {
        gulp
            .src(pattern)
            .pipe(plugin_1.log())
            .pipe(gulp.dest(this.output));
    }
}
exports.default = ResourceResovler;
