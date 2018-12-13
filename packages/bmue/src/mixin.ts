import { mpapp } from './types';

export default function Mixin(obj: mpapp.IPageProps) {
  return {
    ...obj,
    setState(data) {
      //@ts-ignore
      this.setData(data);
    },
    spliceState(data) {
      //@ts-ignore
      this.setData({ data });
    }
  };
}
