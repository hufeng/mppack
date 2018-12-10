import { Mue } from 'bmue';
import * as ql from './ql';
import * as rl from './rl';
import { fetchData } from './webapi';

Mue({
  dev: true,
  getter: ql,
  effect: rl,
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
    this.setState({
      hello: data,
      'list.0.id': 1
    });
  }
});
