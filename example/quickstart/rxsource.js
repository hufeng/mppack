export default class RxSource {
  constructor() {
    this.state = {
      id: 1,
      name: 'test'
    };
  }

  getState() {
    return this.state;
  }
}
