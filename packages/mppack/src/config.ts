export class Configuration {
  output = 'build';
  watch = false;
  verbose = false;
  target: 'eapp' | 'wxapp' = 'eapp';

  get excludes() {
    return [`!${this.output}/**`];
  }

  get javascript() {
    return ['**/*.js', '!*.config.js', ...this.excludes];
  }

  get typescript() {
    return ['**/*.ts', '!vendor/**', ...this.excludes];
  }

  get css() {
    return ['**/*.css', ...this.excludes];
  }

  get less() {
    return ['**/*.less', ...this.excludes];
  }

  get json() {
    return ['**/*.json', '!tsconfig.json', '!package.json', ...this.excludes];
  }

  get image() {
    return ['**/*.png', '**/*.jpg', '**/*.gif', ...this.excludes];
  }

  get wxss() {
    return ['**/*.wxss', ...this.excludes];
  }

  get acss() {
    return ['**/*.acss', ...this.excludes];
  }

  get axml() {
    return ['**/*.axml', ...this.excludes];
  }

  get wxml() {
    return ['**/*.wxml', ...this.excludes];
  }
}

export default new Configuration();
