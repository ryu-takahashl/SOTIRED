# SOTIRED

-   [アプリ説明](#explanation)
-   [環境（言語、フレームワーク、サーバー要件 etc）](#dependency)
-   [機能一覧](#functions)

## <a id="explanation"> アプリ説明 </a>

SOTIREDは、画像解析とテキスト翻訳を組み合わせた翻訳アプリです。

会員登録不要で、写真を撮るかアルバムから選択すると

その写真の中のテキストを検知して日本語に翻訳してくれます:)

翻訳したテキストとアップロードした写真は保存可能なので後から見返すこともできます。

[App Store](https://apps.apple.com/jp/app/sotired/id1538548990)

現在はiOSのみ対応していますが、今後Androidでもリリースする予定です。

## <a id="dependency"> 環境（言語、フレームワーク、API etc） </a>

| Title      | Description |
| :--------- | :---------- |
| データベース     | Cloud Firestore |
| アプリケーション言語 | TypeScript, JavaScript |
| 開発フレームワーク  | React Native |
| 開発ツール  | Expo |
| API | Cloud Vision API & Cloud Translation API |

## <a id="functions"> 機能一覧 </a>

1.  [匿名ログイン機能](https://github.com/RyuAndShit/SOTIRED/blob/master/App.tsx)

    -   Firebase の Authentication の匿名ログインを使用して、会員登録させずにユーザーのuidを取得しています。

2.  写真アップロード機能（[カメラ](https://github.com/RyuAndShit/SOTIRED/blob/master/functions/Camera.js) & [アルバム](https://github.com/RyuAndShit/SOTIRED/blob/master/functions/Library.js)）

    -   'expo-permissions' と 'expo-image-picker' を使用して、カメラとアルバムにアクセスできるようにしています。

3.  [写真の画像解析機能](https://github.com/RyuAndShit/SOTIRED/blob/master/functions/CloudVision.js)

    -   Cloud Vision API を使用して、画像内のテキストを検知できるようにしています。

4.  [テキスト翻訳機能](https://github.com/RyuAndShit/SOTIRED/blob/master/functions/CloudTranslation.js)

    -   Cloud Translation API を使用して、対象のテキストを日本語に保存できるようにしています。

5.  [保存機能](https://github.com/RyuAndShit/SOTIRED/blob/master/functions/Firebase.js)

    -   翻訳したテキストやアップロードした画像のパスなどを Cloud Firestore に保存しています。
    -   画像の保存先は、Cloud Storage です。
    
6.  [保存済みの画像・テキストの表示機能](https://github.com/RyuAndShit/SOTIRED/blob/master/functions/Firebase.js)

    -   自分が保存したアイテムのみ, Cloud Firestore から取得し表示しています。
    
7. [保存済みアイテムの削除機能](https://github.com/RyuAndShit/SOTIRED/blob/master/components/TabTwo.js)

    -   'react-native-swipe-list-view' を使用して、左スワイプで削除ボタンを表示できるようにしました。
