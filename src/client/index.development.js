import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "mobx-react";

import App from './view/App';

import { GasFileIOMock } from './controller/GasFileIO';
import SsdsStore from './controller/SsdsStore';
import SsdsModel from './model/SsdsModel';
import ssds from './sample/ssds.json';
import FileListStore from './controller/FileListStore';
import FileListModel from './model/FileListModel';
import fileList from './sample/fileList.json';

const gasFileIO = new GasFileIOMock(ssds, fileList);

const stores = {
  ssdsStore: new SsdsStore(new SsdsModel, gasFileIO),
  fileListStore: new FileListStore(new FileListModel, gasFileIO),
}

ReactDOM.render(
  <Provider { ...stores }>
    <App />
  </Provider>,
  document.getElementById('app')
)
