# BS-AutoSceneChanger
BeatSaberでXSplit Broadcasterのシーン自動切り替えをする拡張プラグインです。

[サンプル動画](https://twitter.com/rynan4818/status/1384522716795994131)

※[OBS Studio用の同様ツールはこちら](https://github.com/rynan4818/obs-control)

※[Streamlabs OBS用の同様ツールはこちら](https://github.com/rynan4818/Streamlabs-obs-control)

## インストール方法

 1. HTTP Statusのインストール (インストール済みの人は2.へ)

    Beat Saberから本ツールにデータを送信するためにHTTP Statusをインストールしてください。

    デンパ時計さんの[HttpSiraStatus](https://github.com/denpadokei/beatsaber-http-status) 及び、[HttpStatusExtention](https://github.com/denpadokei/HttpStatusExtention)にも対応してます。

    ModAssistantを使用する場合は依存modが自動的にインストールされるため簡単です。

    [Beat Saber HTTP Status](https://github.com/opl-/beatsaber-http-status)

    ![image](https://rynan4818.github.io/beatsaber-overlay-httpstatus.png)
	
    もし、BeatSaberのバージョンアップ直後などでModAssistantに登録が無い時は、手動でインストールが必要です。

    その場合は、ModAssistantにある**websocket-sharpのインストールが必須**です。入れ忘れトラブルが多いので注意して下さい。

    ![image](https://rynan4818.github.io/beatsaber-overlay-websocket-sharp.png)

 2. 本ツールの[リリースページ](https://github.com/rynan4818/BS-AutoSceneChanger/releases)から最新リリースをダウンロードします。

 3. BS-AutoSceneChanger*.zipを適当なフォルダに解凍します。例：C:\TOOL\BS-AutoSceneChanger

 4. XSplit Broadcasterを起動してメニューの`拡張`の`拡張の追加`から`拡張ファイルを追加`を選択します。

    ![preview](https://rynan4818.github.io/bs_auto_scene_changer1.png)

 5. 警告画面が出ますので、内容をよく読んで問題なければＯＫを押して下さい。

    ![preview](https://rynan4818.github.io/bs_auto_scene_changer2.png)

 6. `参照`ボタンを押して、ファイル選択画面を開きます。

    ![preview](https://rynan4818.github.io/bs_auto_scene_changer3.png)

 7. 2.で解凍したフォルダの`BS-AutoSceneChanger.html`を選択して開きます。

    ![preview](https://rynan4818.github.io/bs_auto_scene_changer4.png)

 8. URLに選択したファイルが入力されたら、ＯＫを押して追加します。

    ![preview](https://rynan4818.github.io/bs_auto_scene_changer5.png)

## 使用方法

 1. メニューの`拡張`に`BS-AutoSceneChanger`が追加されていますので選択します。

    ![preview](https://rynan4818.github.io/bs_auto_scene_changer6.png)

 2. 設定ダイアログが表示されますので、必要な設定をして下さい。
 
     **シーン切り替えを使用する場合は、設定ダイアログは表示したままにして下さい。閉じるとプラグインの機能も停止します。**

    ![preview](https://rynan4818.github.io/bs_auto_scene_changer7.png)

    - Menu scene

        BeatSaberのメニュー画面で選択するシーンを選びます。
    - Game scene

        BeatSaberのゲームプレイ画面で選択するシーンを選びます。

    - Start scene

        Game scene開始時に表示するシーンを選びます。機能使用時はチェックして、表示する時間の秒数を入れて下さい。

    - Finish end scene

        Game scene終了時にFinish(クリア)した場合に表示するシーンを選びます。機能使用時はチェックして、表示する時間の秒数を入れて下さい。

    - Fail end scene

        Game scene終了時にfail(フェイル)した場合に表示するシーンを選びます。機能使用時はチェックして、表示する時間の秒数を入れて下さい。

    - Pause end scene

        ポーズしてメニューに戻る場合に表示するシーンを選びます。機能使用時はチェックして、表示する時間の秒数を入れて下さい。

    - Game event delay

        Game scene開始のタイミングを遅らせる場合にチェックして、遅らせるミリ秒を設定して下さい。タイミングを早めること（マイナス値）はできません。
    - Menu event delay

        Game scene終了(メニューに戻る)のタイミングを遅らせる場合にチェックして、遅らせるミリ秒を設定して下さい。タイミングを早めること（マイナス値）はできません。

    - Menu scene switching at finish/fail timing

        Game scene終了(メニューに戻る)タイミングを、finish/failした瞬間に変更します。約1秒程度早まりますので。Menu event delayと合わせて終了タイミングの微調整に使えます。

    - HTTP Status host address

        BeatSaberを実行しているPCが異なる場合にチェックして、実行しているPCのIPアドレスを設定して下さい。

    - HTTP Status port address

        HTTP Statusのポート番号が異なる場合にチェックして使用します。通常は使用しません。

## ライセンス

本ツールのライセンスは[MITライセンス](https://github.com/rynan4818/BS-AutoSceneChanger/blob/main/LICENSE)を適用します

本ツールに添付している xjs.js は以下の物を使用しています。

[XSplit JS Framework](https://xjsframework.github.io/)

XSplit JS Frameworkのライセンスは以下になります。

[XSplit Extensibility Framework and Plugin License](https://github.com/SplitmediaLabsLimited/xjs/blob/master/LICENSE)