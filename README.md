# Form filler

一款可以填寫臺大醫學系redcap問卷的程式

相信大部分的人都跟我一樣，認為台大醫學系的教授不管是在教案內容以及事前準備上都無可挑剃，而身為台灣最高學府的學生，上課時的自我評估也
基本上沒有太大的問題，每週發的課程教學效果調查表似乎都只是為了0.5分在做形式上的填寫。因此，此程式可以幫助你自動填寫課程教學效果調查
表，為每個禮拜省下五分鐘（一學期就省下80分鐘了）。（如果有對於教學內容有特殊評價，建議自己手動填寫）

A program designed to fill out NTU Medical School Redcap questionnaires.

Most people, like myself, believe that the professors at NTU Medical School are impeccable in terms of their course content and preparation. As students of Taiwan's premier university, our self-assessments during classes are generally problem-free. The weekly course teaching effectiveness surveys seem to be a formality just for the sake of 0.5 points. Therefore, this program can help you automatically fill out the course teaching effectiveness surveys, saving you five minutes each week (80 minutes in a semester). If you have specific feedback on the teaching content, it's recommended to fill it out manually.

## 下載 Download

前往 [releases](https://github.com/Yu-hc/form_filler/releases) 頁面下載最新版本\
Go to [releases](https://github.com/Yu-hc/form_filler/releases) page for latest release

## 使用步驟 Instructions

1. 下載並且開啟redcap程式
2. 輸入ntu webmail的帳號密碼或者手動貼上表單連結
3. 按下 launch 並等待程式執行完畢

> 如果選擇輸入ntu webmail的帳號密碼，程式會從信箱爬取最新的表單連結

1. Download and open the Redcap program.
2. Enter your NTU Webmail account and password or manually paste the form link.
3. Click launch and wait for the program to complete.

> If you choose to enter your NTU Webmail account and password, the program will scrape the latest form link from your email.

## 設定 Settings

- 若開啟 random suggestion ，會在問卷的評論中填入隨機的評語（評語由chatGPT預先生成，共100則）
- 若開啟 random check ，會將原本全部勾選非常滿意改為隨機勾選非常滿意至普通
- 若開啟 show crawler ，在程式運行時會開啟爬蟲視窗，然而如果在運行過程中關閉爬蟲視窗，程式運行會發生錯誤，不建議開啟
- 按下 reset default 所有設定回復至剛下載程式時的情框
- If random suggestion is enabled, random neutral suggestions(generated via chatGPT) will be filled in the questionnaire
- If random check is enabled, all responses originally marked as "very satisfied" will be randomly changed to "very satisfied" to "neutral."
- If show crawler is enabled, a crawler window will open while the program is running. However, if the crawler window is closed during operation, an error will occur. It is not recommended to enable this option.


## 需求 Prerequisites

- 任何程式編輯器
- [node.js](https://nodejs.org/en)
- 程式碼
- any code editor
- [node.js](https://nodejs.org/en)
- source code

## 下載套件 Download dependencies

``` shell script
npm install
```

在終端機中打入次指令，會在載於`package.json`的所有套件

This command will install all the dependencies listed in package.json.


## 執行 Execute

``` shell script
npm start
```

會編譯並開起程式
This command will execute and launch the app.

## 打包 Build

``` shell script
npm run make
```

於當前目錄中，新建 `out` 檔案夾， 內涵符合電腦作業系統的程式

This command will create an executable app depending on your OS.
