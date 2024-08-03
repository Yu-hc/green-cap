# Form filler

一款可以填寫臺大醫學系redcap問卷的程式

相信大部分的人都跟我一樣，認為台大醫學系的教授不管是在教案內容以及事前準備上都無可挑剃，而身為台灣最高學府的學生，上課時的自我評估也
基本上沒有太大的問題，每週發的課程教學效果調查表似乎都只是為了0.5分在做形式上的填寫。因此，此程式可以幫助你自動填寫課程教學效果調查
表，為每個禮拜省下五分鐘（一學期就省下80分鐘了）。（如果有對於教學內容有特殊評價，建議自己手動填寫）

## 下載

前往[releases](https://github.com/Yu-hc/form_filler/releases)頁面下載最新版本

## 使用步驟

1. 下載並且開啟redcap程式
2. 輸入ntu webmail的帳號密碼或者手動貼上表單連結
3. 按下 launch 並等待程式執行完畢

> 如果選擇輸入ntu webmail的帳號密碼，程式會從信箱爬取最新的表單連結
---
## Prerequisite

- any code editor
- [node.js](https://nodejs.org/en)

## Install

``` shell script
npm install
```

this command will install all the dependencies in `package.json`

## Execute

``` shell script
npm start
```

should open a window that can function normally

## Build

``` shell script
npm run make
```

should create a `out` folder with bundled app inside

# Form Filler

A program designed to fill out NTU Medical School Redcap questionnaires.

Most people, like myself, believe that the professors at NTU Medical School are impeccable in terms of their course content and preparation. As students of Taiwan's premier university, our self-assessments during classes are generally problem-free. The weekly course teaching effectiveness surveys seem to be a formality just for the sake of 0.5 points. Therefore, this program can help you automatically fill out the course teaching effectiveness surveys, saving you five minutes each week (80 minutes in a semester). If you have specific feedback on the teaching content, it's recommended to fill it out manually.

## Download

Go to the [releases](https://github.com/Yu-hc/form_filler/releases) page to download the latest version.

## Instructions

1. Download and open the Redcap program.
2. Enter your NTU Webmail account and password or manually paste the form link.
3. Click launch and wait for the program to complete.

> If you choose to enter your NTU Webmail account and password, the program will scrape the latest form link from your email.

## Prerequisites

- Any code editor
- [Node.js](https://nodejs.org/en)

## Install

```shell
npm install
```

This command will install all the dependencies listed in package.json.

## Execute

```shell
npm start
```
This command will build and launch the app.

## Pack

```shell
npm run make
```

This command will create an executable app depending on your OS.
