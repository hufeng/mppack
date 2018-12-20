export const fetchData = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('hello mppack next...');
    }, 200);
  });
};
