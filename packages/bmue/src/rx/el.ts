import { TPath, TRxLang, TRxLangHandler } from '../types';

export class ELang {
  constructor(name: string, lang: TRxLang) {
    this.name = name;
    this.lang = lang;
  }

  name: string;
  lang: TRxLang;

  parse() {
    const len = this.lang.length;
    const handler = this.lang[len - 1] as TRxLangHandler;
    const deps = this.lang.slice(0, len - 1) as Array<TPath>;
    return {
      name: this.name,
      deps,
      handler
    };
  }
}

//Factory method
export const EL = (name: string, lang: TRxLang) => new ELang(name, lang);
