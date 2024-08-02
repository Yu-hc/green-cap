# Form filler

## an app to fill the teaching evaluation form from NTUCM

We all agree that the professors from National Taiwan University College of Medicine are extraordinary; therefore, it doesn't seem  necessary to spend a lot of time filling the teaching evaluation form weekly. Yet by filling the form can give you a  


## Download

Check the [releases](https://github.com/Yu-hc/form_filler/releases) page for latest release

## How to use

1. download and launch the appilcation
2. enter the username and password for ntu webmail or enter the form url manually
3. press launch button and wait until the app to finish filling

> if you choose to enter username and password, the app will automatically scrape the form url in your mail account



## prerequisite

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
