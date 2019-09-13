import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "mobx-react";

import App from './App';

import GasFileIO from './controller/GasFileIO';
import SsdsStore from './controller/SsdsStore';
import ssdsModelFactory from './model/SsdsModel';
import FileListStore from './controller/FileListStore';
import FileListModelFactory from './model/FileListModel';

const gasFileIO = new GasFileIO();

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

window.loadPicker = () => {
  gapi.load('picker')
}

const loadPickerElement = document.createElement('script');
loadPickerElement.src = 'https://apis.google.com/js/api.js?onload=loadPicker';
document.body.appendChild(loadPickerElement);
