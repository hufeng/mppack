import isEqual from 'lodash.isequal';
import { IRxParams, TRxLangHandler } from '../types';
import { getPathVal } from '../util';
import { QueryLang } from './ql';
import { RxLang } from './rl';

/**
 * design a simple reactive class
 * from bigQuery, we can computed QL
 * from computeRL, we can effect our side-effect
 */
export default class Rx {
  constructor(params: IRxParams) {
    const { dev = false, data = {}, getter = {}, effect = {} } = params;
    this.dev = dev;
    this.getter = getter;
    this.initData(data);
    this.effect = this.bindRL(effect);
  }

  //merge all data
  data = {};
  //current status, dev can give more log
  dev = false;
  //record all side effect
  effect: Array<TRxLangHandler> = [];
  //record all ql
  getter: { [key: string]: QueryLang } = Object.create({});
  //cache ql result
  _cacheQL = {} as { [key: number]: Array<any> };

  /**
   * compute ql's value and merge to this.data
   */
  initData = (data: Object) => {
    const rxData = this.computeQL(data);
    this.data = {
      ...data,
      rx: {
        ...rxData
      }
    };
    if (this.dev) {
      console.log('初始化data:', this.data);
    }
  };

  computeQL = (data: Object) => {
    let rx = {};
    //compute each ql
    for (let qlName in this.getter) {
      if (this.getter.hasOwnProperty(qlName)) {
        const ql = this.getter[qlName];
        const value = this.bigQuery(data, ql);
        if (!isEqual(value, (data as any).rx[qlName])) {
          rx[qlName] = value;
        }
      }
    }
    return rx;
  };

  bindRL = (effect = {}) => {
    const effects = [];
    Object.keys(effect).forEach(key => {
      effects.push(this.parseRL(this.data, effect[key]));
    });
    return effects;
  };

  bigQuery(data, ql: QueryLang) {
    const { id, name, handler, deps } = ql.parse();

    if (this.dev) {
      console.groupCollapsed(
        `=================ql#${name}=====================`
      );
    }

    //initialize querylang cache
    !this._cacheQL[id] && (this._cacheQL[id] = []);

    //get path value
    let isChanged = false;
    deps.forEach((dep, i) => {
      //suport ql nested ql
      let val = null;
      if (dep instanceof QueryLang) {
        val = this.bigQuery(data, dep);
      } else {
        val = getPathVal(data, dep);
      }
      if (!isEqual(val, this._cacheQL[id][i])) {
        isChanged = true;
        this._cacheQL[id][i] = val;
      }
    });

    if (isChanged) {
      const len = deps.length;
      const pathVals = this._cacheQL[id].slice(0, len);
      const result = handler(...pathVals);
      this._cacheQL[id][len + 1] = result;

      if (this.dev) {
        console.log('update:🔥', result);
        console.groupEnd();
      }
      return result;
    } else {
      const len = deps.length;
      const result = this._cacheQL[id][len + 1];

      if (this.dev) {
        console.log('cache:😆', result);
        console.groupEnd();
      }
      return result;
    }
  }

  parseRL = (data: Object, rl: RxLang) => {
    const cache = [];
    const { name, deps, handler } = rl.parse();

    for (let dep of deps) {
      cache.push(
        dep instanceof QueryLang
          ? this.bigQuery(data, dep)
          : getPathVal(data, dep)
      );
    }

    return newData => {
      if (this.dev) {
        console.groupCollapsed(
          `=================rl#${name}=====================`
        );
      }
      let isChanged = false;
      deps.forEach((dep, i) => {
        let pathVal =
          dep instanceof QueryLang
            ? this.bigQuery(newData, dep)
            : getPathVal(newData, dep);
        if (!isEqual(pathVal, cache[i])) {
          cache[i] = pathVal;
          isChanged = true;
        }
      });

      if (isChanged) {
        if (this.dev) {
          console.log(`${name}#changed:🔥`);
          console.groupEnd();
        }
        handler(...cache);
      } else {
        if (this.dev) {
          console.groupEnd();
        }
      }
    };
  };
}
