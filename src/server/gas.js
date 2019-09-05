export const doGet = () => {
  return HtmlService.createHtmlOutputFromFile("index");
}

export const getOAuthToken = () => {
  // 一度はdriveにアクセスしないとトークンが取得できない
  DriveApp.getRootFolder().getId();
  const token = ScriptApp.getOAuthToken();
  return token;
}
