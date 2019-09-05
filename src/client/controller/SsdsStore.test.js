import { when } from "mobx"

import SsdsStore from './SsdsStore';

describe('パブリック関数', () => {

  test('Ssdsが更新される', done => {
    const mock = {};
    const update = new Promise((resolve, reject) => resolve('ssds'));
    mock.loadSsds = jest.fn().mockReturnValueOnce(update);

    const factory = ssds => ssds;
    const store = new SsdsStore(factory, mock);

    store.update().then(() => {
      const ssds = store.getModel();
      expect(ssds).toBe('ssds');
      done();
    });
  });

});

describe('プライベート関数', () => {

  test('Ssdsが更新される', done => {
    const factory = ssds => ssds;
    const store = new SsdsStore(factory);

    when(
      () => store.getModel() !== undefined,
      () => {
        const ssds = store.getModel();
        expect(ssds).toBe('ssds');
        done();
      }
    );

    store.updateSsds('ssds');
  });

});
