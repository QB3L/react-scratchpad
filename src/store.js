import { decorate, observable, computed } from "mobx";

class Store {    
  id = Math.random();
  title = "";
  finished = false;
  totals = 10;

  get getTotals() {
      return this.totals;
  }
}
decorate(Store, {
  title: observable,
  finished: observable,
  getTotals:computed
});


export default new Store();