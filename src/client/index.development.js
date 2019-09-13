import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "mobx-react";

import App from './App';

import { GasFileIOMock } from './controller/GasFileIO';
import SsdsStore from './controller/SsdsStore';
import ssdsModelFactory from './model/SsdsModel';
import ssds from './sample/ssds.json';
import FileListStore from './controller/FileListStore';
import FileListModelFactory from './model/FileListModel';
import fileList from './sample/fileList.json';

const gasFileIO = new GasFileIOMock(ssds, fileList);

const stores = {
  ssdsStore: new SsdsStore(ssdsModelFactory, gasFileIO),
  fileListStore: new FileListStore(FileListModelFactory, gasFileIO),
}

ReactDOM.render(
  <Provider { ...stores }>
    <App />
  </Provider>,
  document.getElementById('app')
)
