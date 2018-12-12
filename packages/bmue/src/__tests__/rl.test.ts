import { EL } from '../rx/el';

it('test default init rxlang', () => {
  function handler(name: string, tabIndex: number) {}
  const ql = EL('helloRL', [['pageList', 0, 'name'], 'tabIndex', handler]);

  expect(ql.name).toEqual('helloRL');
  expect(ql.parse()).toEqual({
    name: 'helloRL',
    deps: [['pageList', 0, 'name'], 'tabIndex'],
    handler
  });
});
