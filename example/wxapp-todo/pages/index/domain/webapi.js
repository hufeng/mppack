import { getId } from './id';

export const fetchData = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: getId(), todo: 'learn typescript', completed: false },
        { id: getId(), todo: 'learn Rust', completed: false }
      ]);
    }, 200);
  });
};
