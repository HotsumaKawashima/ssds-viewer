import { observable, decorate } from "mobx"

class FileListStore {

  constructor(fileListModelFactory, gasFileIO) {
    this.fileListModelFactory = fileListModelFactory;
    this.gasFileIO = gasFileIO;
    this.fileListModel = this.fileListModelFactory();
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
    this.fileListModel = this.fileListModelFactory(fileList);
  }
}

export default decorate(FileListStore, {
  fileListModel: observable,
})
