import { decorate, observable } from "mobx";

class Store {
  id = Math.random();
  title = "";
  finished = false;
}
decorate(Store, {
  title: observable,
  finished: observable
});


export default new Store();