import { doGet, getOAuthToken } from './gas';
import { loadFileList } from './GasFileIO';
import { deleteFiles } from './GasFileIO';
import { loadSsds } from './GasFileIO';
import { importXls } from './GasFileIO';

global.doGet = doGet;
global.getOAuthToken = getOAuthToken;

global.loadFileList = loadFileList;
global.deleteFiles = deleteFiles;
global.loadSsds = loadSsds;
global.importXls = importXls;
