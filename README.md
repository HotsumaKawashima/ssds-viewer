ssds-viewer
====

アルコールの売上情報を可視化するツール

## Requirement

  * Node.js
  * npm
  * clasp

## Upload

以下、プロジェクトルートフォルダーで全てのコマンドを実行する。

npm を使うことで、必要なモジュールをインストールします。

```
npm install
```

バンドルを作成する。

```
npm run build
```

claspを使うことで、google driveにファイルをアップロードします。
claspのドキュメントを参照し、必要であれば、ログインを行う。

```
clasp upload
```

google scriptにアクセスする。

[google scriptファイル](https://script.google.com/a/axisplan.com/d/131cL_NO4fdX67J1fib4mGSOqwhZaavsPq2c113wZ0PD9dBLP0Esyy8qE/edit?usp=drive_web)

公開 -> ウェブアプリケーションとして導入 とたどり、プロジェクトバージョンのプルダウンメニューをnewに設定し、更新ボタンをクリックする。

以下のURLでアプリケーションを確認することができる。

[google script実行URL](https://script.google.com/macros/s/AKfycbznVmC_VGiqK5yWjPdFNEvJV-9OlushBijGtHXHoI-061Mk_bsj/exec)

## Usage

テストを実行できる。

```
npm run test
```

テストのウェブサーバーで表示を確認できる。

```
npm run start
```

バンドルする。

```
npm run build
```
