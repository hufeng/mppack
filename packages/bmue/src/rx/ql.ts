import { TPath, TQueryLang, TQueryLangHandler } from '../types';

let uuid = 0;

export class QueryLang {
  constructor(name: string, lang: TQueryLang) {
    this.id = ++uuid;
    this.name = name;
    this.lang = lang;
  }

  id: number;
  name: string;
  lang: TQueryLang;

  parse() {
    const lang = this.lang.slice();
    const handler = lang.pop() as TQueryLangHandler;
    const deps = lang as Array<TPath>;
    return {
      id: this.id,
      name: this.name,
      deps,
      handler
    };
  }
}

//Factory method
export const QL = (name: string, lang: TQueryLang) => new QueryLang(name, lang);
