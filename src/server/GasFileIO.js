import _ from 'underscore';
import moment from 'moment';

const SSDS_FOLDER_ID = '10tBjctMuB50AoLwCdbC4hmJ1oXrg4mt1';

export const loadFileList = () => {
  const files = getFiles(SSDS_FOLDER_ID);
  const fileList = files.map(formatFileList);
  return fileList;
}

export const deleteFiles = fileIds => {
  const ssdsFolder = DriveApp.getFolderById(SSDS_FOLDER_ID);
  fileIds.forEach(fileId => {
    const file = DriveApp.getFileById(fileId);
    ssdsFolder.removeFile(file);
  })
  return loadFileList();
}

export const loadSsds = () => {
  const files = getFiles(SSDS_FOLDER_ID);
  const spreadsheets = files.map(file => SpreadsheetApp.openById(file.getId()))
  const sheets = spreadsheets.map(spreadsheet => spreadsheet.getSheets()[0]);
  const sheetDatas = sheets.map(sheet => sheet.getDataRange().getDisplayValues());
  const objects = sheetDatas.map(array2objects).reduce((a, b) => a.concat(b), []);
  return objects;
}

export const importXls = xlsId => {
  let xls = null;
  let spreadSheetFile = null;
  let newSpreadSheetFile = null;

  try{
    xls = DriveApp.getFileById(xlsId);
    const fileName = xls.getName();
    const year = getYear(fileName);
    const month = getMonth(fileName);
    const dataType = getDataType(fileName);

    const spreadSheetId = xls2spreadSheet(xls);
    const spreadSheet = SpreadsheetApp.openById(spreadSheetId);
    const sheet = spreadSheet.getSheets()[0];
    const sheetData = sheet.getRange(6, 1, sheet.getLastRow() - 5, sheet.getLastColumn()).getDisplayValues();
    const sheetObjects = array2objects(sheetData);
    const objects = sheetObjects.map(object => formatSheetObject(object, year, month, dataType));
    const newSheetData = objects2array(objects);

    const newSpreadSheetName = [year, Utilities.formatString('%02u', month), dataType].join('_');
    const newSpreadSheet = SpreadsheetApp.create(newSpreadSheetName);
    const newSheet = newSpreadSheet.getSheets()[0];
    newSheet.getRange(1, 1, newSheetData.length, newSheetData[0].length).setValues(newSheetData);

    spreadSheetFile = DriveApp.getFileById(spreadSheetId)
    newSpreadSheetFile = DriveApp.getFileById(newSpreadSheet.getId());
    const ssdsFolder = DriveApp.getFolderById(SSDS_FOLDER_ID);
    ssdsFolder.addFile(newSpreadSheetFile);
    return loadFileList();
  } finally {
    if(xls) {
      DriveApp.getRootFolder().removeFile(xls);
    }

    if(spreadSheetFile) {
      DriveApp.getRootFolder().removeFile(spreadSheetFile);
    }

    if(newSpreadSheetFile) {
      DriveApp.getRootFolder().removeFile(newSpreadSheetFile);
    }
  }
}

const formatFileList = file => {
  const lastUpdated = file.getLastUpdated();
  lastUpdated.setHours(lastUpdated.getHours() - 8);

  const [ year, month, dataType ] = file.getName().split('_');

  return {
    id: file.getId(),
    name: file.getName(),
    dataType,
    date: moment([year, month - 1]).format('YYYY-MM'),
    lastUpdated: moment(lastUpdated).format('YYYY-MM-DD hh:mm:ss')
  };
}

const formatSheetObject = (object, year, month, dataType) => {

  object['DATE'] = moment([year, month - 1]).format('YYYY-MM');
  object['DATA TYPE'] = dataType;

  if(dataType === 'CustomerSales') {
    object['STORE NAME'] = object['CUSTOMER NAME'];
    object['STORE NUMBER'] = object['CUST #'];
  } else if(dataType === 'BCLS') {
    object['STORE NAME'] = object['BCLS NAME'];
    object['STORE NUMBER'] = object['BCLS #'];
  }

  const header = [
    'DATE',
    'DATA TYPE',
    'STORE NUMBER',
    'STORE NAME',
    'CITY',
    'POSTAL CODE',
    'UNIT SALES',
    'SKU',
    'BRAND NAME',
    'LTR/BTL',
  ]

  object = _.pick(object, header);

  if(!_.isEqual(_.keys(object), header)) {
    throw 'インポートされたエクセルファイルにキーが存在しません';
  } else if(!_.every(object, value => value)) {
    throw 'インポートされたエクセルファイルに値が存在しません';
  };

  return object;
}

const getYear = fileName => {
  return fileName.substr(fileName.length - 9, 4);
}

const getMonth = fileName => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const index = _.findIndex(months, month => fileName.indexOf(month) > -1);
  return index + 1;
}

const getDataType = fileName => {
  const dataTypes = ['CustomerSales', 'BCLS'];
  return _.find(dataTypes, dataType => fileName.indexOf(dataType) > -1);
}

const array2objects = array => {
  const keys = array.shift();
  const values = array;
  return values.map(value => _.object(keys, value));
}

const objects2array = objects => {
  const keys = _.keys(objects[0]);
  const values = _.map(objects, value => _.values(value));
  values.unshift(keys);
  return values;
}

const xls2spreadSheet = xls => {
  const xlsBlob = xls.getBlob();
  const info = { mimeType: MimeType.GOOGLE_SHEETS }
  return Drive.Files.insert(info, xlsBlob).id;
}

const getFiles = () => {
  const iterator = DriveApp.getFolderById(SSDS_FOLDER_ID).getFiles();

  const array = [];
  while(iterator.hasNext()) {
    array.push(iterator.next());
  }
  return array;
}
