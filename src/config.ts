class Configuration {
  private _dest: string;

  setDest(dest: string) {
    this._dest = dest;
  }

  get dest() {
    return this._dest;
  }
}

export default new Configuration();
