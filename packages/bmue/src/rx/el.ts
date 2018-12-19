import { TPath, TRxLang, TRxLangHandler } from '../types';

export class ELang {
  constructor(name: string, lang: TRxLang) {
    this.name = name;
    this.lang = lang;
  }

  name: string;
  lang: TRxLang;

  parse() {
    const lang = this.lang.slice();
    const handler = lang.pop() as TRxLangHandler;
    const deps = lang as Array<TPath>;
    return {
      name: this.name,
      deps,
      handler
    };
  }
}

//Factory method
export const EL = (name: string, lang: TRxLang) => new ELang(name, lang);
