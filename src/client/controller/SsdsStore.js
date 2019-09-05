import { observable, decorate } from "mobx"

class SsdsStore {

  constructor(ssdsModelFactory, gasFileIO) {
    this.ssdsModelFactory = ssdsModelFactory;
    this.gasFileIO = gasFileIO;
    this.ssdsModel = this.ssdsModelFactory();
    this.updateSsds = this.updateSsds.bind(this);
  }

  getModel() {
    return this.ssdsModel;
  }

  update() {
    return this.gasFileIO.loadSsds().then(this.updateSsds);
  }

  updateSsds(ssds) {
    this.ssdsModel = this.ssdsModelFactory(ssds);
  }
}

export default decorate(SsdsStore, {
  ssdsModel: observable,
})
