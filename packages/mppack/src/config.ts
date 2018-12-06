export class Configuration {
  output = 'build';
  watch = false;
  verbose = false;
  target: 'eapp' | 'wxapp' = 'eapp';

  get excludes() {
    return [`!${this.output}/**`, '!node_modules/**'];
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
    return ['**/*.json', '!tsconfig.json', ...this.excludes];
  }

  get image() {
    return ['**/*.png', '**/*.jpg', '**/*.gif', ...this.excludes];
  }
}

export default new Configuration();
