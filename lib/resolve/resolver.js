"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const gulp = require("gulp");
const option_1 = require("../option");
const rootDir = process.cwd();
class Resolver {
    constructor() {
        const { output, watchMode } = option_1.default;
        this._output = output;
        this._watchMode = watchMode;
        this.watch();
        this.transform(this.pattern());
    }
    /**
     * transform
     * @param pattern
     */
    transform(pattern) {
        console.log(pattern);
        throw new Error('not implemention');
    }
    /**
     * watchMode
     */
    watch() {
        //如果不是watchMode直接返回
        if (!this.watchMode) {
            return;
        }
        gulp.watch(this.pattern()).on('change', (event) => {
            const { path, type } = event;
            /**
             * 如果是输出的目录发生变化，直接跳过
             */
            if (path.includes(`${rootDir}/${this.output}`)) {
                return;
            }
            console.log(`file changed: ${path}, type: ${type}`);
            if (type == 'deleted') {
                let dest = path.replace(rootDir, `${rootDir}/build`);
                if (dest.endsWith('.ts')) {
                    dest = dest.replace('.ts', '.js');
                }
                fs.unlink(dest, err => {
                    if (err) {
                        console.warn(err);
                    }
                });
                return;
            }
            this.transform([path.replace(rootDir, '**'), `!${this.output}/**`]);
        });
    }
    /**
     * 获得文件的pattern
     */
    pattern() {
        return [];
    }
    get output() {
        return this._output;
    }
    get watchMode() {
        return this._watchMode;
    }
}
exports.default = Resolver;
