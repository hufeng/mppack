import equal from 'deep-equal';
import { IReactive, TRxLangHandler } from '../types';
import { getPathVal } from '../util';
import { QueryLang } from './ql';
import { RxLang } from './rl';

/**
 * Reactive
 */
export default class Reactive {
  constructor(params: IReactive) {
    const { dev = false, data = {}, getter = {}, effect = [] } = params;

    this.dev = dev;
    //merge rxdata to data
    this.data = data;
    this.initRxData();

    this.getter = getter;
    this.effect = this.bindRL(effect);
  }

  //merge all data
  data = {};
  //current status, dev can give more log
  dev = false;
  //record all side effect
  effect: Array<TRxLangHandler> = [];
  //record all ql
  getter: { [key: string]: QueryLang } = {};
  //cache ql result
  _cacheQL = {} as { [key: number]: Array<any> };

  /**
   * init rx data
   */
  initRxData = () => {
    const rxData = this.computeQL();
    //merge data and rxQL
    this.data = {
      ...this.data,
      rx: {
        ...rxData
      }
    };
  };

  /**
   * wrapper setData, more reactive ability
   */
  setState = arg => {
    //@ts-ignore
    this.setData(arg);
    //computed ql
    const rx = this.computeQL();
    if (rx) {
      //@ts-ignore
      this.setData({ rx });
    }
    //compute effect
    this.effect.forEach(effect => effect());
  };

  computeQL = () => {
    let rx = null;
    //compute each ql
    for (let qlName in this.getter) {
      if (this.getter.hasOwnProperty(qlName)) {
        const ql = this.getter[qlName];
        const result = this.bigQuery(ql);
        if (!equal(result, (this.data as any).rx[qlName])) {
          rx[qlName] = result;
        }
      }
    }
    return rx;
  };

  bindRL(effect = []) {
    return effect.map(e => e());
  }

  bigQuery(ql: QueryLang) {
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
        val = this.bigQuery(dep);
      } else {
        val = getPathVal(this.data, dep);
      }
      if (!equal(val, this._cacheQL[id][i])) {
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

  parseRL(rl: RxLang) {
    const cache = [];
    const { name, deps, handler } = rl.parse();
    if (this.dev) {
      console.groupCollapsed(
        `=================rl#${name}=====================`
      );
    }
    for (let dep of deps) {
      cache.push(
        dep instanceof QueryLang
          ? this.bigQuery(dep)
          : getPathVal(this.data, dep)
      );
    }

    return () => {
      let isChanged = false;
      deps.forEach((dep, i) => {
        let pathVal =
          dep instanceof QueryLang
            ? this.bigQuery(dep)
            : getPathVal(this.data, dep);
        if (!equal(pathVal, cache[i])) {
          cache[i] = pathVal;
          isChanged = true;
        }
      });

      if (isChanged) {
        if (this.dev) {
          console.log('changed:🔥');
          console.groupEnd();
        }
        handler(...cache);
      } else {
        if (this.dev) {
          console.log('cache:😆');
          console.groupEnd();
        }
      }
    };
  }
}
