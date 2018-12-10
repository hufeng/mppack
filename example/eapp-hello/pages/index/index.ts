import { Mue } from 'bmue';
import * as ql from './ql';
import * as rl from './rl';

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
  onLoad() {
    this.setState({
      hello: 'hello mppack next',
      'list.0.id': 1
    });
  }
});
