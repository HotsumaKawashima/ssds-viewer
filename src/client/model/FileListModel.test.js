import FileListModel from './FileListModel';

describe('パブリック関数', () => {

  test('ファイル一覧を取得する', () => {

    const data = [
      { id: 'id01' },
      { id: 'id02' },
    ];

    const result = [
      { id: 'id01' },
      { id: 'id02' },
    ];

    const fileListModel = new FileListModel(data);
    expect(fileListModel.getValue()).toEqual(result);
  });

  test('ファイルidの一覧を取得する', () => {
    const data = [
      { id: 'id01' },
      { id: 'id02' },
    ];

    const result = [
      'id01',
      'id02',
    ];

    const fileListModel = new FileListModel(data);
    expect(fileListModel.getIds()).toEqual(result);
  });

  test('ソートをかけたモデルを取得する', () => {

    const data = [
      { id: 123 },
      { id: 123 },
      { id: 124 },
      { id: 125 },
      { id: 124 },
      { id: 123 },
      { id: 125 },
    ];

    const result = [
      { id: 125 },
      { id: 125 },
      { id: 124 },
      { id: 124 },
      { id: 123 },
      { id: 123 },
      { id: 123 },
    ];

    const fileListModel = new FileListModel(data)
      .sort('id', 'asc');

    expect(fileListModel.getValue()).toEqual(result);

  });

});
