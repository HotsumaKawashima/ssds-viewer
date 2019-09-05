import _ from 'underscore';

export default class GasFileIO {

  loadFileList() {
    return new Promise((resolve, reject) => {
      google.script.run
        .withFailureHandler(reject)
        .withSuccessHandler(resolve)
        .loadFileList();
    });
  }

  loadSsds() {
    return new Promise((resolve, reject) => {
      google.script.run
        .withFailureHandler(reject)
        .withSuccessHandler(resolve)
        .loadSsds();
    })
  }

  deleteFiles(fileIds) {
    return new Promise((resolve, reject) => {
      google.script.run
        .withFailureHandler(reject)
        .withSuccessHandler(resolve)
        .deleteFiles(fileIds);
    });
  }

  importXls() {
    return getOAuthToken()
      .then(createPicker)
      .then(_importXls);
  }
}

const _importXls = (xlsId) => {
  return new Promise((resolve, reject) => {
    google.script.run
      .withFailureHandler(reject)
      .withSuccessHandler(resolve)
      .importXls(xlsId);
  });
}

const getOAuthToken = () => {
  return new Promise((resolve, reject) => {
    google.script.run
      .withFailureHandler(e => reject(e))
      .withSuccessHandler(resolve)
      .getOAuthToken();
  });
}

const createPicker = (token) => {
  return new Promise((resolve, reject) => {

    const picker = new google.picker.PickerBuilder()
      .addView(new google.picker.DocsUploadView())
      .setOAuthToken(token)
      .setCallback(pickerCallBack(resolve, reject))
      .setOrigin(google.script.host.origin)
      .build();

    picker.setVisible(true);
  });
}

const pickerCallBack = (resolve, reject) => (data) => {
  const action = google.picker.Action;
  const response = data[google.picker.Response.ACTION];

  if(response == action.CANCEL) {
    reject('キャンセルされました');
    return;
  } else if(response == action.PICKED) {
    const doc = data[google.picker.Response.DOCUMENTS][0];
    const id = doc[google.picker.Document.ID];
    resolve(id);
  }
}

export class GasFileIOMock {

  constructor(ssds, fileList) {
    this.ssds = ssds;
    this.fileList = fileList;
  }

  loadFileList() {
    return new Promise((resolve, reject) => {
      resolve(this.fileList);
    });
  }

  loadSsds() {
    return new Promise((resolve, reject) => {
      resolve(this.ssds);
    })
  }

  deleteFiles(ids) {
    return new Promise((resolve, reject) => {
      resolve(this.fileList);
    });
  }

  importXls() {
    return new Promise((resolve, reject) => resolve())
  }

}
