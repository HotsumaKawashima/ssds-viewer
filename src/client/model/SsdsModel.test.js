import SsdsModel, { _calc } from './SsdsModel';

describe('パブリック関数', () => {

  test('型変換をする', () => {
    const data = [
      {
        'STORE NUMBER': '123',
        'UNIT SALES': '10',
        SKU: '456',
        'LTR/BTL': '0.75'
        }
    ];

    const result = [
      {
        'STORE NUMBER': 123,
        'UNIT SALES': 10,
        SKU: 456,
        'LTR/BTL': 0.75
        }
    ];

    const ssdsModel = new SsdsModel().createModel(data);
    expect(ssdsModel.getValue()).toEqual(result);
  });

  test('ssdsを取得する', () => {
    const data = [
      { DATE: '2017-03' },
      { DATE: '2017-02' },
    ];

    const result = [
      { DATE: '2017-03' },
      { DATE: '2017-02' },
    ];

    const ssdsModel = new SsdsModel(data);
    expect(ssdsModel.getValue()).toEqual(result);
  });

  test('表示用酒名のssdsを取得する', () => {
    const data = [
      { 'BRAND NAME': 'sake01', 'LTR/BTL': 0.75 },
      { 'BRAND NAME': 'sake02', 'LTR/BTL': 0.2  },
    ];

    const result = [
      { 'BRAND NAME': 'sake01', 'LTR/BTL': 0.75, 'SAKE DISPLAY NAME': 'sake01 0.75 LTR/BTL' },
      { 'BRAND NAME': 'sake02', 'LTR/BTL': 0.2,  'SAKE DISPLAY NAME': 'sake02 0.2 LTR/BTL' },
    ];

    const ssdsModel = new SsdsModel(data);
    expect(ssdsModel.getValueWithSakeDisplayName()).toEqual(result);
  });

  test('dateOptionsを取得する', () => {
    const data = [
      { DATE: '2017-03' },
      { DATE: '2017-02' },
      { DATE: '2017-02' },
      { DATE: '2018-10' },
    ];

    const result = [
      { label: 'none',    value: '' },
      { label: '2018-10', value: '2018-10' },
      { label: '2017-03', value: '2017-03' },
      { label: '2017-02', value: '2017-02' },
    ];

    const ssdsModel = new SsdsModel(data);
    expect(ssdsModel.getDateOptions()).toEqual(result);
  });

  test('cityOptionsを取得する', () => {
    const data = [
      { CITY: 'a' },
      { CITY: 'c' },
      { CITY: 'b' },
      { CITY: 'c' },
    ];

    const result = [
      { label: 'a', value: 'a' },
      { label: 'b', value: 'b' },
      { label: 'c', value: 'c' },
    ];

    const ssdsModel = new SsdsModel(data);
    expect(ssdsModel.getCityOptions()).toEqual(result);
  });

  test('storeOptionsを取得する', () => {
    const data = [
      { 'STORE NAME': 'a', 'STORE NUMBER': 1 },
      { 'STORE NAME': 'c', 'STORE NUMBER': 2 },
      { 'STORE NAME': 'b', 'STORE NUMBER': 3 },
      { 'STORE NAME': 'c', 'STORE NUMBER': 2 },
    ];

    const result = [
      { label: 'a', value: 1 },
      { label: 'b', value: 3 },
      { label: 'c', value: 2 },
    ];

    const ssdsModel = new SsdsModel(data);
    expect(ssdsModel.getStoreOptions()).toEqual(result);
  });

  test('sakeOptionsを取得する', () => {
    const data = [
      { SKU: 123 , 'BRAND NAME': 'sake01', 'LTR/BTL': 0.75 },
      { SKU: 124 , 'BRAND NAME': 'sake02', 'LTR/BTL': 0.5  },
      { SKU: 123 , 'BRAND NAME': 'sake01', 'LTR/BTL': 0.75 },
    ];

    const result = [
      { label: 'sake01 0.75 LTR/BTL' , value: 123 },
      { label: 'sake02 0.5 LTR/BTL'  , value: 124 },
    ];

    const ssdsModel = new SsdsModel(data);
    expect(ssdsModel.getSakeOptions()).toEqual(result);
  });

  test('CityLinesを取得する', () => {
    const data = [
      { CITY: 'a' },
      { CITY: 'c' },
      { CITY: 'b' },
      { CITY: 'c' },
    ];

    const result = [
      { CITY: 'a' },
      { CITY: 'b' },
      { CITY: 'c' },
    ];

    const ssdsModel = new SsdsModel(data);
    expect(ssdsModel.getCityLines()).toEqual(result);
  });

  test('SKULinesを取得する', () => {
    const data = [
      { SKU: 123 },
      { SKU: 124 },
      { SKU: 125 },
      { SKU: 126 },
      { SKU: 125 },
    ];

    const result = [
      { SKU: 123 },
      { SKU: 124 },
      { SKU: 125 },
      { SKU: 126 },
    ];

    const ssdsModel = new SsdsModel(data);
    expect(ssdsModel.getSKULines()).toEqual(result);
  });

  test('sakeLinesを取得する', () => {
    const data = [
      { SKU: 123 , 'BRAND NAME': 'sake01', 'LTR/BTL': 0.75 },
      { SKU: 124 , 'BRAND NAME': 'sake02', 'LTR/BTL': 0.5  },
      { SKU: 123 , 'BRAND NAME': 'sake01', 'LTR/BTL': 0.75 },
    ];

    const result = [
      { 'SAKE DISPLAY NAME': 'sake01 0.75 LTR/BTL' , SKU: 123 , 'BRAND NAME': 'sake01', 'LTR/BTL': 0.75 },
      { 'SAKE DISPLAY NAME': 'sake02 0.5 LTR/BTL'  , SKU: 124 , 'BRAND NAME': 'sake02', 'LTR/BTL': 0.5  },
    ];

    const ssdsModel = new SsdsModel(data);
    expect(ssdsModel.getSakeLines()).toEqual(result);
  });

  test('StoreLinesを取得する', () => {
    const data = [
      { 'STORE NUMBER': 123 },
      { 'STORE NUMBER': 124 },
      { 'STORE NUMBER': 125 },
      { 'STORE NUMBER': 126 },
      { 'STORE NUMBER': 125 },
    ];

    const result = [
      { 'STORE NUMBER': 123 },
      { 'STORE NUMBER': 124 },
      { 'STORE NUMBER': 125 },
      { 'STORE NUMBER': 126 },
    ];

    const ssdsModel = new SsdsModel(data);
    expect(ssdsModel.getStoreLines()).toEqual(result);
  });

  test('日付でフィルターをかけたモデルを取得する', () => {
    const data = [
      { DATE: '2017-10' },
      { DATE: '2017-11' },
      { DATE: '2017-12' },
      { DATE: '2018-01' },
      { DATE: '2018-02' },
      { DATE: '2018-03' },
      { DATE: '2018-04' },
      { DATE: '2019-05' },
      { DATE: '2019-06' },
    ];

    const result = [
      { DATE: '2017-12' },
      { DATE: '2018-01' },
      { DATE: '2018-02' },
      { DATE: '2018-03' },
      { DATE: '2018-04' },
      { DATE: '2019-05' },
    ];

    const ssdsModel = new SsdsModel(data);
    expect(ssdsModel.filterWithDates('2019-05', '2017-12').getValue()).toEqual(result);
  });

  test('新規顧客でフィルターをかけたモデルを取得する', () => {
    const data = [
      { DATE: '2017-10', 'STORE NUMBER': 101 },
      { DATE: '2017-11', 'STORE NUMBER': 102 },
      { DATE: '2017-12', 'STORE NUMBER': 103 },
      { DATE: '2018-01', 'STORE NUMBER': 107 },
      { DATE: '2018-02', 'STORE NUMBER': 105 },
      { DATE: '2018-03', 'STORE NUMBER': 106 },
      { DATE: '2019-05', 'STORE NUMBER': 107 },
      { DATE: '2019-05', 'STORE NUMBER': 108 },
      { DATE: '2019-06', 'STORE NUMBER': 108 },
      { DATE: '2019-06', 'STORE NUMBER': 107 },
    ];

    const result = [
      { DATE: '2019-05', 'STORE NUMBER': 108 },
      { DATE: '2019-06', 'STORE NUMBER': 108 },
    ];

    const ssdsModel = new SsdsModel(data);
    expect(ssdsModel.filterWithNewStores('2019-05').getValue()).toEqual(result);
  });

  test('Orでフィルターをかけたモデルを取得する', () => {
    const data = [
      { GROUP1: 123 },
      { GROUP1: 123 },
      { GROUP1: 123 },
      { GROUP1: 124 },
      { GROUP1: 124 },
      { GROUP1: 125 },
      { GROUP1: 125 },
    ];

    const result = [
      { GROUP1: 123 },
      { GROUP1: 123 },
      { GROUP1: 123 },
      { GROUP1: 125 },
      { GROUP1: 125 },
    ];

    const ssdsModel = new SsdsModel(data);
    expect(ssdsModel.filterOr('GROUP1', ['123', 125]).getValue()).toEqual(result);
  });

  test('ソートをかけたモデルを取得する', () => {
    const data = [
      { GROUP1: 123 },
      { GROUP1: 123 },
      { GROUP1: 124 },
      { GROUP1: 125 },
      { GROUP1: 124 },
      { GROUP1: 123 },
      { GROUP1: 125 },
    ];

    const result = [
      { GROUP1: 125 },
      { GROUP1: 125 },
      { GROUP1: 124 },
      { GROUP1: 124 },
      { GROUP1: 123 },
      { GROUP1: 123 },
      { GROUP1: 123 },
    ];

    const ssdsModel = new SsdsModel(data);
    expect(ssdsModel.sort('GROUP1', 'asc').getValue()).toEqual(result);
  });

  test('売上数の合計を計算する', () => {
    const data = [
      { GROUP1: 123, 'UNIT SALES': 1  },
      { GROUP1: 123, 'UNIT SALES': 2  },
      { GROUP1: 123, 'UNIT SALES': 3  },
      { GROUP1: 124, 'UNIT SALES': 4  },
      { GROUP1: 124, 'UNIT SALES': 5  },
      { GROUP1: 124, 'UNIT SALES': 6  },
      { GROUP1: 124, 'UNIT SALES': 7  },
    ];

    const result = [
      { GROUP1: 123, SUM: 6 },
      { GROUP1: 124, SUM: 22 },
    ];

    const ssdsModel = new SsdsModel(data)
      .sumSales(['GROUP1'])
      .sort('GROUP1');

    expect(ssdsModel.getValue()).toEqual(result);
  });

  test('グループごとの売上数の合計を計算する', () => {

    const data = [
      { GROUP1: 123, GROUP2: 'a', GROUP3: 'c', 'UNIT SALES': 1  },
      { GROUP1: 123, GROUP2: 'b', GROUP3: 'c', 'UNIT SALES': 2  },
      { GROUP1: 123, GROUP2: 'a', GROUP3: 'd', 'UNIT SALES': 3  },
      { GROUP1: 123, GROUP2: 'b', GROUP3: 'd', 'UNIT SALES': 4  },
      { GROUP1: 123, GROUP2: 'a', GROUP3: 'd', 'UNIT SALES': 5  },
      { GROUP1: 123, GROUP2: 'b', GROUP3: 'c', 'UNIT SALES': 6  },
    ];

    const result = [
      { GROUP1: 123, GROUP2: 'a', GROUP3: 'c', SUM: 1  },
      { GROUP1: 123, GROUP2: 'a', GROUP3: 'd', SUM: 8  },
      { GROUP1: 123, GROUP2: 'b', GROUP3: 'c', SUM: 8  },
      { GROUP1: 123, GROUP2: 'b', GROUP3: 'd', SUM: 4  },
    ];

    const ssdsModel = new SsdsModel(data)
      .sumSales(['GROUP2', 'GROUP3'])
      .sort('GROUP2');

    expect(ssdsModel.getValue()).toEqual(result);
  });

  test('横持ちデータを取得する', () => {

    const data = [
      { DATE: '1', NAME: 'a' , VALUE: '1'},
      { DATE: '2', NAME: 'a' , VALUE: '1'},
      { DATE: '2', NAME: 'b' , VALUE: '1'},
      { DATE: '3', NAME: 'b' , VALUE: '1'},
      { DATE: '4', NAME: 'b' , VALUE: '1'},
      { DATE: '1', NAME: 'c' , VALUE: '1'},
      { DATE: '3', NAME: 'c' , VALUE: '1'},
    ];

    const result = [
      { DATE: '1', a: '1', b: '0', c: '1'},
      { DATE: '2', a: '1', b: '1', c: '0'},
      { DATE: '3', a: '0', b: '1', c: '1'},
      { DATE: '4', a: '0', b: '1', c: '0'},
    ];

    const ssdsModel = new SsdsModel(data)
      .spread('DATE', 'NAME', 'VALUE', '0')
      .sort('DATE');

    expect(ssdsModel.getValue()).toEqual(result);
  });

});

describe('プライベート関数', () => {

  test('売上数の合計を計算する', () => {
    const data = [
      { GROUP1: 123, 'UNIT SALES': 1  },
      { GROUP1: 123, 'UNIT SALES': 2  },
      { GROUP1: 123, 'UNIT SALES': 3  },
    ];

    const result = [
      { GROUP1: 123, SUM: 6 },
    ];

    expect(_calc(data, ['GROUP1'])).toEqual(result);
  });

});
