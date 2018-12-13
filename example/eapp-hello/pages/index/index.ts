import { Mue } from 'bmue';
import * as el from './el';
import * as ql from './ql';
import { fetchData } from './webapi';

Mue({
  dev: true,
  getter: ql,
  effect: el,
  data: {
    hello: 'hello mppack',
    list: [
      {
        id: 1
      }
    ]
  },
  async onLoad() {
    const data = await fetchData();
    //@ts-ignore
    this.setData({
      hello: data,
      'list.0.id': 1
    });
  }
});
