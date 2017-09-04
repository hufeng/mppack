import { QueryLang, QL } from './ql';

class RxSource {
  constructor(props) {
    const { data = {}, mixins = [], ql = [], ...rest } = props;
    this.rest = rest;
    this._state = {};
    this.ql = ql;
    this.merge(data, mixins, ql);
  }

  merge(data, mixins, ql) {
    //mixins
    mixins.forEach(page => {
      const { data = {} } = page;
      this._state = { ...this._state, ...data };
    });

    this._state = { ...this._state, ...data };

    this.ql.forEach(qlang => {
      this._state[qlang.name] = this.bigQuery(qlang);
    });
  }

  updateQL(state, setData, ctx) {
    this._state = state;
    this.ql.forEach(qlang => {
      this._state[qlang.name] = this.bigQuery(qlang);
      console.log({
        [qlang.name]: this.bigQuery(qlang)
      });
      setData.call(ctx, {
        [qlang.name]: this.bigQuery(qlang)
      });
    });
  }

  bigQuery(ql) {
    console.log(this._state);
    return ql.lang(this._state);
  }

  getState() {
    return this._state;
  }

  getRest() {
    return this.rest;
  }
}

export default function RxPage(opts) {
  const source = new RxSource(opts);
  const { onLoad, ...rest } = source.getRest();

  Page({
    data: source.getState(),
    onLoad() {
      //mock
      const setData = this.setData;
      this.setData = function(data, callback) {
        setData.call(this, data, () => {
          callback && callback();
          console.log('finish....');
          source.updateQL(this.data, setData, this);
        });
      };

      onLoad.call(this);
    },
    ...rest
  });
}
