import { QL } from 'bmue';

export const hello = QL('helloQL', [
  //deps path
  'hello',
  hello => hello + '!!'
]);

export const id = QL('idQL', [
  //deps path
  ['list', 0, 'id'],
  id => id + '!'
]);
