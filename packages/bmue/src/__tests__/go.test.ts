import go from '../go';

it('test go success', async () => {
  const mockFetchSuccess = (): Promise<{ id: number; name: string }> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ id: 1, name: 'bmue' });
      }, 200);
    });
  };

  const { res, err } = await go(mockFetchSuccess());
  expect(err).toEqual(null);
  expect(res).toEqual({
    id: 1,
    name: 'bmue'
  });
});

it('test go fail', async () => {
  const mockFetchFail = () => {
    return new Promise((_, reject) => {
      reject(new Error('mock Fetch Fail'));
    });
  };

  const { err, res } = await go(mockFetchFail());
  expect(err).toEqual(new Error('mock Fetch Fail'));
  expect(res).toEqual(undefined);
});

it('test multiple result test', async () => {
  const mockFetchSuccess = (): Promise<{ id: number; name: string }> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ id: 1, name: 'bmue' });
      }, 200);
    });
  };

  const mockFetchFail = (): Promise<null> => {
    return new Promise((_, reject) => {
      reject(new Error('mock Fetch Fail'));
    });
  };

  let { res, err } = await go(mockFetchSuccess());
  expect(res).toEqual({
    id: 1,
    name: 'bmue'
  });
  expect(err).toEqual(null);

  ({ res, err } = await go<null>(mockFetchFail()));
  expect(res).toEqual(undefined);
  expect(err).toEqual(new Error('mock Fetch Fail'));
});
