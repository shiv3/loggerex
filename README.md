##LoggerEX

google extensionのloggerです。

**中のsrcをフォルダごとchrome://extensionにポイしてね**

- 閲覧したサイトと送信したフォームデータを保存。
- 悪用しないでね。（
- chrome storageを使ってます。
- キーロガーはあえて実装していません。（重い
- [ここ](https://github.com/shiv3/loggerex)でJSONが出力されます。
- ちゃんとしたやつは[こっち](https://github.com/Xeroday/ChromeLogger)で

*データを消す時は*
script.jsの２行目

```
// chrome.storage.local.clear();
```
をコメントアウトして再読み込みしてください。（適当