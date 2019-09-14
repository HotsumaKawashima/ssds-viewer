import moment from 'moment';
import _ from 'underscore';

export default class FileListModel {

  constructor(fileList=[]) {
    this.fileList = fileList;
  }

  createModel(fileList) {
    return new FileListModel(fileList);
  }

  getValue() {
    return this.fileList;
  }

  getIds() {
    return _.chain(this.fileList)
      .indexBy('id')
      .sortBy('id')
      .pluck('id')
      .value();
  }

  sort(key, order) {
    let sorted = _.sortBy(this.fileList, key);

    if(order === 'asc') {
      sorted = sorted.reverse();
    }

    return new FileListModel(sorted);
  }

}
