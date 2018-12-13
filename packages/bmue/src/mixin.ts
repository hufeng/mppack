import { mpapp } from './types';

export default function Mixin(obj: mpapp.IPageProps) {
  return {
    ...obj,
    setState(data: any) {
      //@ts-ignore
      this.setData(data);
    },
    spliceState(data: any) {
      //@ts-ignore
      this.setData({ data });
    }
  };
}
