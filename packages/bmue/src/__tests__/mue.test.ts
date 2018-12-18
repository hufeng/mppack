import Action from '../action';
import Mue from '../mue';
import { EL } from '../rx/el';
import { QL } from '../rx/ql';

const helloRL = EL('helloRL', [
  //data path
  ['list', 0, 'name'],
  name => console.log(name)
]);

const hello = QL('helloQL', [
  // data path
  ['list', 0],
  ({ name, mott }) => `${name}-${mott}`
]);

//mock miniapp Page object
window['Page'] = jest.fn(obj => obj);

it('test mue', () => {
  const PaginationMixin = {
    data: {
      pageList: []
    },
    pageNum: 0,
    pageSize: 20,
    onPullDownRefresh() {
      // this.fetchData()
    },
    onReachBottom() {
      // this.fetchData()
    },
    fetchData(url, params) {},
    refreshFetchData(url, paramm) {}
  };

  const action = Action({
    sayWorld() {}
  });

  const mue = Mue({
    getter: {
      hello
    },
    effect: { helloRL },
    mixins: [PaginationMixin],
    data: {
      list: [{ id: 1, name: 'mue', mott: 'easy miniapp' }]
    },
    action,
    sayHello() {}
  });

  expect(mue).toMatchSnapshot();
});
