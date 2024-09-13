# Green Cap

![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/Yu-hc/form_filler/total)
![GitHub Release](https://img.shields.io/github/v/release/Yu-hc/form_filler)

一款可以填寫臺大醫學系每週redcap問卷的程式

相信大部分的人都跟我一樣，認為台大醫學系的教授不管是在教案內容以及事前準備上都無可挑剃，而身為台灣最高學府的學生，上課時的自我評估也基本上沒有太大的問題，每週發的課程教學效果調查表似乎都只是為了0.5分在做形式上的填寫。因此，此程式可以幫助你自動填寫課程教學效果調查表，為每個禮拜省下五分鐘（一學期就省下80分鐘了）。（如果有對於教學內容有特殊評價，建議自己手動填寫）
.

## 使用步驟

1. 前往 [releases](https://github.com/Yu-hc/form_filler/releases) 頁面下載符合電腦作業系統的最新版本（mac: darwin, win: win32 x64）
2. 解壓縮並開啟程式權限，可參考[使用照片](#使用照片)
    - mac 打開終端機輸入以下指令，並將 greencap 程式檔案拉到終端機中，開啟權限

          xattr -cr "path/to/app"

    - windows 右鍵點擊 greencap 程式，選擇「內容」->「安全性」-> 勾選「解鎖」  
3. 開啟 greencap 程式
4. 輸入 ntu webmail 的帳號密碼或者手動貼上表單連結
5. 輸入小組討論組別
6. 按下 launch 並等待程式執行完畢

> 如果選擇輸入ntu webmail的帳號密碼，程式會從信箱爬取最新的表單連結

## 設定

- 開啟 random suggestion ，會在問卷的評論中填入隨機的[評語](https://github.com/Yu-hc/green-cap/blob/main/randomSuggestion.txt)（評語由chatGPT預先生成，共100則）
- 開啟 random check ，會將原本全部勾選非常滿意改為隨機勾選非常滿意至普通
- 開啟 show crawler ，在程式運行時會開啟爬蟲視窗，然而如果在運行過程中關閉爬蟲視窗，程式運行會發生錯誤，不建議開啟
- 按下 reset default 所有設定回復至剛下載程式時的預設值

## 使用照片

- mac 權限開啟
![alt text](<Screenshot 2024-09-13 at 3.58.14 PM.png>)
- windows 權限開啟
![alt text](<Screenshot 2024-09-13 at 2.28.01 PM.png>)
![alt text](<Screenshot 2024-09-13 at 2.28.12 PM.png>)
![alt text](<Screenshot 2024-09-13 at 2.28.22 PM.png>)
some youtube url

## 注意事項

- 此程式輸入的 ntu webmail 帳號密碼僅會用於登入學校信箱爬取表單連結
- 由於我並未申請 apple developer account ， 因此程式需要移除 com.apple.quarantine 才能正常在 macOS 上運行
- 此程式目前只適用於醫學院每週的醫學系教學效果調查表，有額外的 redcap 問卷此程式無法填寫
- 小組討論主題目前填寫為空
- 因為我之前沒有寫過類似 project，且目前尚處於非常早期的版本，如果有發現程式運行時的錯誤或著有改善程式的建議，都可以聯絡我\

## Contact and Support

Email: [damingwang0007@gmail.com](mailto:damingwang0007@gmail.com)

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://buymeacoffee.com/yu.hc)

## Attribution

[Hat icons created by Smashicons - Flaticon](https://www.flaticon.com/free-icons/hat)

[Planets icons created by Freepik - Flaticon](https://www.flaticon.com/free-icons/planets)

[Spaceship icons created by Freepik - Flaticon](https://www.flaticon.com/free-icons/spaceship)
