export class QueryLang {
  constructor(name, lang) {
    this.name = name;
    this.lang = lang;
  }
}

export function QL(name, lang) {
  return new QueryLang(name, lang);
}
