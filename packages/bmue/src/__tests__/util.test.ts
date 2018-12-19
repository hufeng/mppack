import { getPathVal } from '../util';

it('test getPathVal', () => {
  const data = {
    list: [{ id: 1, user: { id: 1, name: 'mue', mott: 'easy miniapp' } }],
    tabIndex: 0
  };
  const name = getPathVal(data, ['list', 0, 'user', 'name']);
  expect(name).toEqual('mue');

  const mott = getPathVal(data, ['list', 0, 'user', 'mott']);
  expect(mott).toEqual('easy miniapp');

  const tabIndex = getPathVal(data, 'tabIndex');
  expect(tabIndex).toEqual(0);

  const nullVal = getPathVal(data, 'tabIndex1');
  expect(nullVal).toEqual(undefined);

  const nullValArr = getPathVal(data, ['list', 0, 'user1', 'email']);
  expect(nullValArr).toEqual(undefined);
});
