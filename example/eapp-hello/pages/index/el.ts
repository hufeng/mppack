import { EL } from 'bmue';

export const hello = EL('helloRL', [
  'hello',
  hello => console.log('--->', hello)
]);
