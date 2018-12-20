import { Mue } from 'bmue';
import action from './domain/action';
import * as getter from './domain/getter';

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
