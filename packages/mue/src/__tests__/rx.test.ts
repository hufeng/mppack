import { MockConsole } from 'mock-jest-console';
import RxFactory from '../rx';
import { QL } from '../rx/ql';
import { RL } from '../rx/rl';

test('test bigQuery', () => {
  const mockLog = new MockConsole();
  const mue = new RxFactory();
  mue.dev = true;
  mue.data = {
    list: [{ id: 1, user: { id: 1, name: 'mue', mott: 'easy miniapp' } }],
    tabIndex: 0
  };

  //============================================================
  const tabQL = QL('tabQL', ['tabIndex', index => index]);
  const tabResult = mue.bigQuery(tabQL);
  expect(tabResult).toEqual(0);

  const helloQL = QL('helloQL', [
    ['list', 0, 'user'],
    'tabIndex',
    (user, tabIndex) => ({
      ...user,
      tabIndex
    })
  ]);

  //============================================================
  const result = mue.bigQuery(helloQL);
  expect(result).toEqual({
    id: 1,
    name: 'mue',
    mott: 'easy miniapp',
    tabIndex: 0
  });

  //===========================================================
  const nestQL = QL('nestQL', [
    ['list', 0, 'user'],
    tabQL,
    (user, tabIndex) => ({
      ...user,
      tabIndex
    })
  ]);
  const nestResult = mue.bigQuery(nestQL);
  expect(nestResult).toEqual({
    id: 1,
    name: 'mue',
    mott: 'easy miniapp',
    tabIndex: 0
  });
  expect(mockLog.logs).toMatchSnapshot();
});

it('test parseRL', () => {
  const mockLog = new MockConsole();
  const mue = new RxFactory();
  mue.dev = true;
  mue.data = {
    list: [{ id: 1, user: { id: 1, name: 'mue', mott: 'easy miniapp' } }],
    tabIndex: 0
  };

  const helloRL = RL('helloRL', [
    ['list', 0, 'user'],
    'tabIndex',
    (user, index) => {
      expect(index).toEqual(1);
      expect(user).toEqual({
        id: 1,
        name: 'mue',
        mott: 'easy miniapp rl'
      });
    }
  ]);

  const helloRLHandle = mue._parseRL(helloRL);
  mue.data = {
    list: [{ id: 1, user: { id: 1, name: 'mue', mott: 'easy miniapp rl' } }],
    tabIndex: 1
  };
  helloRLHandle();
  expect(mockLog.logs).toMatchSnapshot();
});
