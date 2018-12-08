import { QueryLang } from './rx/ql';

export type TQueryLangHandler = (...arg: Array<any>) => any;
export type TQueryLang = Array<TPath | TQueryLangHandler | QueryLang>;
export type TRxLangHandler = (...args: Array<any>) => void;
export type TRxLang = Array<TPath | TRxLangHandler>;
export type TPath = Array<string | number> | string;
