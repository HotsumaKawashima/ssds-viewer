import { when } from "mobx"

import SsdsStore from './SsdsStore';

describe('パブリック関数', () => {

  test('Ssdsが更新される', done => {
    const mock = {};
    const update = new Promise((resolve, reject) => resolve('ssds'));
    mock.loadSsds = jest.fn().mockReturnValueOnce(update);

    const model = { createModel: ssds => ssds }
    const store = new SsdsStore(model, mock);

    store.update().then(() => {
      const ssds = store.getModel();
      expect(ssds).toBe('ssds');
      done();
    });
  });

});

describe('プライベート関数', () => {

  test('Ssdsが更新される', done => {
    const model = { createModel: ssds => ssds }
    const store = new SsdsStore(model);

    when(
      () => typeof(store.getModel()) === 'string',
      () => {
        const ssds = store.getModel();
        expect(ssds).toBe('ssds');
        done();
      }
    );

    store.updateSsds('ssds');
  });

});
