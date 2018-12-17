import { mpapp } from './types';

/**
 * 为了更好的重用小程序的公共的逻辑，设计一个简单的mixin机制
 * 其实一个mixin就是一个简单的javascript object,
 * 为什么还需要Mixin函数来创建因为这样我们可以更简单写typescript的类型
 * setState, spliceState是为了完善reactive data的设计
 *
 * 在Mue函数中，会自动的对mixin中data和声明周期方法做自动的合并
 */
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
