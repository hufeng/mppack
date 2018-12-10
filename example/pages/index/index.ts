import mue from 'bmue/lib/mue';
import { QL } from 'bmue/lib/rx/ql';
import { RL } from 'bmue/lib/rx/rl';

mue({
  dev: true,
  data: {
    hello: 'hello mppack',
    list: [
      {
        id: 1
      }
    ]
  },

  onLoad() {
    this.setState({
      hello: 'hello mppack next',
      'list.0.id': 1
    });
  },

  getter: {
    tip: QL('tipQL', ['hello', hello => hello + '!!']),
    id: QL('idQL', [['list', 0, 'id'], id => id + '!'])
  },

  effect: [RL('helloRL', ['hello', hello => console.log('--->', hello)])]
});
