import { observable, decorate } from "mobx"

class SsdsStore {

  constructor(ssdsModel, gasFileIO) {
    this.gasFileIO = gasFileIO;
    this.ssdsModel = ssdsModel;
    this.updateSsds = this.updateSsds.bind(this);
  }

  getModel() {
    return this.ssdsModel;
  }

  update() {
    return this.gasFileIO.loadSsds().then(this.updateSsds);
  }

  updateSsds(ssds) {
    this.ssdsModel = this.ssdsModel.createModel(ssds);
  }
}

export default decorate(SsdsStore, {
  ssdsModel: observable,
})
