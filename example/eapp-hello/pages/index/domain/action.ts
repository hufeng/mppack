import { Action } from 'bmue';
import { fetchData } from './webapi';

export default Action({
  async onLoad() {
    const data = await fetchData();
    //@ts-ignore
    this.setData({
      hello: data,
      'list.0.id': 1
    });
  }
});
