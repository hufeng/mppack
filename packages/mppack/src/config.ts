const excludes = [`!${this.output}/**`, '!node_modules/**'];

export default {
  output: 'build',
  javascript: ['**/*.js', '!*.config.js', ...excludes],
  typescript: ['**/*.ts', '!vendor/**', ...excludes],
  css: ['**/*.css', ...excludes],
  image: ['**/*.png', '**/*.jpg', '**/*.gif', ...excludes],
  json: ['**/*.json', ...excludes],
  less: ['**/*.less', ...excludes],
  //eapp, wxapp
  type: 'eapp'
};
