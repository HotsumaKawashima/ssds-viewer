
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

  append(paramName, value) {
    const params = new URLSearchParams(this.history.location.search);
    params.append(paramName, value);
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
