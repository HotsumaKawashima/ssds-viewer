import _ from 'underscore';
import moment from 'moment';

export default class SsdsModel {

  constructor(ssds=[]) {
    this.ssds = ssds;
  }

  createModel(ssds) {
    return new SsdsModel(ssds.map(value => {
      value['STORE NUMBER'] = Number(value['STORE NUMBER']);
      value['UNIT SALES'] = Number(value['UNIT SALES']);
      value['SKU'] = Number(value['SKU']);
      value['LTR/BTL'] = Number(value['LTR/BTL']);
      return value;
    }));
  }

  getValue() {
    return this.ssds;
  }

  getValueWithSakeDisplayName() {
    return this.ssds.map(value => {
      value['SAKE DISPLAY NAME'] = `${value['BRAND NAME']} ${value['LTR/BTL']} LTR/BTL`;
      return value;
    });
  }

  getDateOptions() {
    return _.chain(this.ssds)
      .indexBy('DATE')
      .sortBy('DATE')
      .reverse()
      .pluck('DATE')
      .map(v => ({ label: v, value: v }))
      .reduce((a,b) => a.concat(b), [{ label: 'none', value: '' }])
      .value();
  }

  getCityOptions() {
    return _.chain(this.ssds)
      .indexBy('CITY')
      .map(value => ({ label: value['CITY'], value: value['CITY'] }))
      .sortBy('label')
      .value();
  }

  getSakeOptions() {
    return _.chain(this.ssds)
      .indexBy('SKU')
      .map(value => ({ label: `${value['BRAND NAME']} ${value['LTR/BTL']} LTR/BTL`, value: value['SKU'] }))
      .sortBy('label')
      .value();
  }

  getStoreOptions() {
    return _.chain(this.ssds)
      .indexBy('STORE NAME')
      .map(value => ({ label: value['STORE NAME'], value: value['STORE NAME'] }))
      .sortBy('label')
      .value();
  }

  getCityLines() {
    return _.chain(this.ssds)
      .indexBy('CITY')
      .sortBy('CITY')
      .value();
  }

  getSKULines() {
    return _.chain(this.ssds)
      .indexBy('SKU')
      .sortBy('SKU')
      .value();
  }

  getSakeLines() {
    return _.chain(this.ssds)
      .indexBy('SKU')
      .sortBy('SKU')
      .map(value => {
        value['SAKE DISPLAY NAME'] = `${value['BRAND NAME']} ${value['LTR/BTL']} LTR/BTL`;
        return value;
      })
      .value();
  }

  getStoreLines() {
    return _.chain(this.ssds)
      .indexBy('STORE NUMBER')
      .sortBy('STORE NUMBER')
      .value();
  }

  filterWithDates(topDate, bottomDate) {
    const filtered = this.ssds
      .filter(value => !topDate || topDate >= value['DATE'] )
      .filter(value => !bottomDate || value['DATE'] >= bottomDate);
    return new SsdsModel(filtered);
  }

  filterWithNewStores(date) {
    if(!date) return this;
    const filtered = this.ssds.filter(value => value['DATE'] < date);
    const stores = this.ssds
      .filter(value => value['DATE'] === date)
      .filter(value => !filtered.find(test => test['STORE NUMBER'] === value['STORE NUMBER']))
      .map(value => value['STORE NUMBER']);
    return this.filterOr('STORE NUMBER', stores);
  }

  filter(filter) {
    filter = _.pick(filter, value => !!value);
    const filtered = _.filter(this.ssds, _.matcher(filter));
    return new SsdsModel(filtered);
  }

  filterOr(key, values) {
    if(values.length === 0) return this;
    const filtered = _.map(values, value => _.filter(this.ssds, data => data[key] === value));
    const union = _.union(...filtered);
    return new SsdsModel(union);
  }

  sort(key, order) {
    let sorted = _.sortBy(this.ssds, key);

    if(order === 'asc') {
      sorted = sorted.reverse();
    }

    return new SsdsModel(sorted);
  }

  sumSales(keys, filter) {
    keys = _.filter(keys, value => !!value);

    const calced = _calc(this.ssds, keys);

    return new SsdsModel(calced);
  }

  spread(primaryKey, key, value, fill) {
    const keys = _.uniq(_.pluck(this.ssds, key));
    const base = fill === undefined ? {} : _.object(keys, _.map(keys, k => fill));
    const result = _.chain(this.ssds)
      .groupBy(primaryKey)
      .map((v, k) => _.extend({}, base, _.object([primaryKey], [k]), _.object(_.pluck(v, key), _.pluck(v, value))))
      .value();
    return new SsdsModel(result);
  }

}

export function _calc(data, keys) {
  if(keys.length == 0) {
    const sum = _.reduce(_.pluck(data, 'UNIT SALES'), (a,b) => a + b);
    return Object.assign({}, _.omit(data[0], 'UNIT SALES'), { SUM: sum });
  } else {
    return _.chain(data)
      .groupBy(keys.shift())
      .map(value => _calc(value, keys.concat()))
      .reduce((a,b) => a.concat(b), [])
      .value();
  }
}
