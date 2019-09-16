
export default class HistoryModel {

  setHistory(history) {
    this.history = history;
  }

  get(paramName, defaultValue) {
    const params = new URLSearchParams(this.history.location.search);
    return params.get(paramName) || defaultValue;
  }

  getAll(paramName) {
    const params = new URLSearchParams(this.history.location.search);
    return params.getAll(paramName);
  }

  set(paramName, value) {
    const params = new URLSearchParams(this.history.location.search);
    params.set(paramName, value);
    this.history.push({
      search: params.toString(),
    })
  }

  setAll(paramName, values) {
    const params = new URLSearchParams(this.history.location.search);
    params.delete(paramName);
    values.forEach(v => params.append(paramName, v));
    this.history.push({
      search: params.toString(),
    })
  }

  delete(paramName) {
    const params = new URLSearchParams(this.history.location.search);
    params.delete(paramName);
    this.history.push({
      search: params.toString(),
    })
  }
}
