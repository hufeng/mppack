import { Mue } from 'bmue';
import action from './component/action';
import * as getter from './component/getter';

Mue({
  dev: true,
  getter,
  action,
  data: {
    text: '',
    todos: [],
    filter: 'all',
    userInfo: {}
  }
});
