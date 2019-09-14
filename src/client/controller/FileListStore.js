import { observable, decorate } from "mobx"

class FileListStore {

  constructor(fileListModel, gasFileIO) {
    this.gasFileIO = gasFileIO;
    this.fileListModel = fileListModel;
    this.updateFileList = this.updateFileList.bind(this);
  }

  getModel() {
    return this.fileListModel;
  }

  update() {
    return this.gasFileIO.loadFileList().then(this.updateFileList);
  }

  deleteFiles(ids) {
    return this.gasFileIO.deleteFiles(ids).then(this.updateFileList);
  }

  importXls() {
    return this.gasFileIO.importXls().then(this.updateFileList);
  }

  updateFileList(fileList) {
    this.fileListModel = this.fileListModel.createModel(fileList);
  }
}

export default decorate(FileListStore, {
  fileListModel: observable,
})
