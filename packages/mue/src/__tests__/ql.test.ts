import { QL } from '../rx/ql';

it('test default init queryLang', () => {
  function handler(name: string, tabIndex: number) {
    return { name, tabIndex };
  }
  const ql = QL('helloQL', [['pageList', 0, 'name'], 'tabIndex', handler]);

  expect(ql.id).toEqual(1);
  expect(ql.name).toEqual('helloQL');
  expect(ql.parse()).toEqual({
    id: 1,
    name: 'helloQL',
    deps: [['pageList', 0, 'name'], 'tabIndex'],
    handler
  });
});
