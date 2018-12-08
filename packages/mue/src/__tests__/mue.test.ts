import Mue from '../mue';
import { QL } from '../rx/ql';
import { RL } from '../rx/rl';

//mock miniapp Page object
window['Page'] = jest.fn(obj => obj);

it('test mue', () => {
  const mue = Mue({
    data: {
      list: [{ id: 1, name: 'mue', mott: 'easy miniapp' }]
    },
    action: {
      sayHello() {}
    },
    getter: {
      hello: QL('helloQL', [
        // data path
        ['list', 0],
        ({ name, mott }) => `${name}-${mott}`
      ])
    },
    effect: [
      RL('helloRL', [
        //data path
        ['list', 0, 'name'],
        name => console.log(name)
      ])
    ]
  });
  expect(mue).toMatchSnapshot();
});
