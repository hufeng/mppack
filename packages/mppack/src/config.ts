export default {
  output: 'build',
  javascript: [
    '**/*.js',
    '!*.config.js',
    `!${this.output}/**`,
    '!node_modules/**'
  ],
  typescript: [
    '**/*.ts',
    '!vendor/**',
    `!${this.output}/**`,
    '!node_modules/**'
  ],
  css: [],
  image: [
    '**/*.png',
    '**/*.jpg',
    '**/*.gif',
    `!${this.output}/**`,
    '!node_modules/**'
  ],
  json: ['**/*.json', '!node_modules/**'],
  less: []
};
