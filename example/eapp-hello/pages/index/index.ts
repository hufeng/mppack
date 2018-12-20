import { Mue } from 'bmue';
import action from './domain/action';
import * as el from './domain/el';
import * as ql from './domain/ql';

Mue({
  dev: true,
  getter: ql,
  effect: el,
  action,
  data: {
    hello: 'hello mppack',
    list: [
      {
        id: 1
      }
    ]
  }
});
