import { when } from "mobx"

import FileListStore from './FileListStore';

describe('パブリック関数', () => {

  test('FileListが更新される', done => {
    const mock = {};
    const update = new Promise((resolve, reject) => resolve('fileList'));
    mock.loadFileList = jest.fn().mockReturnValueOnce(update);

    const model = { createModel: fileList => fileList }
    const store = new FileListStore(model, mock);

    store.update().then(() => {
      const fileList = store.getModel();
      expect(fileList).toBe('fileList');
      done();
    });
  });

  test('Fileを削除後にFileListが更新される', done => {
    const mock = {};
    const update = new Promise((resolve, reject) => resolve('fileList'));
    mock.deleteFiles = jest.fn().mockReturnValueOnce(update);

    const model = { createModel: fileList => fileList }
    const store = new FileListStore(model, mock);

    store.deleteFiles('ID01').then(() => {
        const fileList = store.getModel();
        expect(fileList).toBe('fileList');
        done();
    });
  });

  test('xlsファイルをロード後にFileListが更新される', done => {
    const mock = {};
    const update = new Promise((resolve, reject) => resolve('fileList'));
    mock.importXls = jest.fn().mockReturnValueOnce(update);

    const model = { createModel: fileList => fileList }
    const store = new FileListStore(model, mock);

    store.importXls().then(() => {
        const fileList = store.getModel();
        expect(fileList).toBe('fileList');
        done();
    });
  });

});

describe('プライベート関数', () => {

  test('FileListが更新される', done => {
    const model = { createModel: fileList => fileList }
    const store = new FileListStore(model);

    when(
      () => typeof(store.getModel()) === 'string',
      () => {
        const fileList = store.getModel();
        expect(fileList).toBe('fileList');
        done();
      }
    );

    store.updateFileList('fileList');
  })

});
