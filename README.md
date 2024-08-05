# Form filler

一款可以填寫臺大醫學系redcap問卷的程式

相信大部分的人都跟我一樣，認為台大醫學系的教授不管是在教案內容以及事前準備上都無可挑剃，而身為台灣最高學府的學生，上課時的自我評估也
基本上沒有太大的問題，每週發的課程教學效果調查表似乎都只是為了0.5分在做形式上的填寫。因此，此程式可以幫助你自動填寫課程教學效果調查
表，為每個禮拜省下五分鐘（一學期就省下80分鐘了）。（如果有對於教學內容有特殊評價，建議自己手動填寫）
.

## 下載

前往 [releases](https://github.com/Yu-hc/form_filler/releases) 頁面下載最新版本\

## 使用步驟

1. 下載並且開啟redcap程式
2. 輸入ntu webmail的帳號密碼或者手動貼上表單連結
3. 按下 launch 並等待程式執行完畢

> 如果選擇輸入ntu webmail的帳號密碼，程式會從信箱爬取最新的表單連結

## 設定

- 若開啟 random suggestion ，會在問卷的評論中填入隨機的評語（評語由chatGPT預先生成，共100則）
- 若開啟 random check ，會將原本全部勾選非常滿意改為隨機勾選非常滿意至普通
- 若開啟 show crawler ，在程式運行時會開啟爬蟲視窗，然而如果在運行過程中關閉爬蟲視窗，程式運行會發生錯誤，不建議開啟
- 按下 reset default 所有設定回復至剛下載程式時的情框

## 需求

- 任何程式編輯器
- [node.js](https://nodejs.org/en)
- 程式碼

## 下載套件

``` shell script
npm install
```

在終端機中打入次指令，會在載於`package.json`的所有套件

## 執行

``` shell script
npm start
```

會編譯並開起程式

## 打包

``` shell script
npm run make
```

於當前目錄中，新建 `out` 檔案夾， 內涵符合電腦作業系統的程式
