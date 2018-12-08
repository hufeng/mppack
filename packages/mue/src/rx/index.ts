import { getPathVal } from '../util';
import { QueryLang } from './ql';
import { RxLang } from './rl';

export default class RxFactroy {
  dev = false;
  data = {};
  _cacheQL = {} as { [key: number]: Array<any> };

  bigQuery(ql: QueryLang) {
    const { id, name, handler, deps } = ql.parse();

    if (this.dev) {
      console.groupCollapsed(
        `=================ql#${name}=====================`
      );
    }

    //initialize querylang cache
    !this._cacheQL[id] && (this._cacheQL[id] = []);

    let isChanged = false;
    deps.forEach((dep, i) => {
      //suport ql nested ql
      let val = null;
      if (dep instanceof QueryLang) {
        val = this.bigQuery(dep);
      } else {
        val = getPathVal(this.data, dep);
      }
      if (val != this._cacheQL[id][i]) {
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

  _parseRL(rl: RxLang) {
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
        if (pathVal != cache[i]) {
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
