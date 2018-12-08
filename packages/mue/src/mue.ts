import RxFactroy from './rx';

declare function Page(obj: Object): Object;

/**
 * page
 * data
 * mixins: {data, method, lifycycle, ...other}
 * lifycycle mehtod
 * method
 * action
 * getter
 * effect
 */

export default function Mue(page) {
  const {
    data = {},
    mixins = [],
    action = {},
    getter = {},
    effect = [],
    ...others
  } = page;

  const rxFactory = new RxFactroy();

  const pageObj = {
    data,
    ...action,
    getter,
    effect,
    ...rxFactory
  };

  return Page(pageObj);
}
