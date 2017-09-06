import ResourceResolver from './resolve/resource';
import JavascriptResolver from './resolve/javascript';
import TypescriptResolver from './resolve/typescript';
import ImageResolver from './resolve/image';
import opt from './option';
const version = require('../package.json').version;

export {
  opt,
  version,
  ResourceResolver,
  JavascriptResolver,
  TypescriptResolver,
  ImageResolver
};
