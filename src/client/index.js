import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "mobx-react";

import App from './view/App';

import GasFileIO from './controller/GasFileIO';
import SsdsStore from './controller/SsdsStore';
import SsdsModel from './model/SsdsModel';
import FileListStore from './controller/FileListStore';
import FileListModel from './model/FileListModel';

const gasFileIO = new GasFileIO();

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

window.loadPicker = () => {
  gapi.load('picker')
}

const loadPickerElement = document.createElement('script');
loadPickerElement.src = 'https://apis.google.com/js/api.js?onload=loadPicker';
document.body.appendChild(loadPickerElement);
