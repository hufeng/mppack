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
    const len = this.lang.length;
    const handler = this.lang[len - 1] as TQueryLangHandler;
    const deps = this.lang.slice(0, len - 1) as Array<TPath>;
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
