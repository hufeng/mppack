import { RL } from 'bmue';

export const hello = RL('helloRL', [
  'hello',
  hello => console.log('--->', hello)
]);
