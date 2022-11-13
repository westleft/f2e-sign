<div align="center">
<samp>

![](https://i.imgur.com/b465Rdx.png)

# 2022 F2E Week 1 | 活動網站設計

<img src="https://img.shields.io/badge/-Vite-646CFF?logo=Vite&logoColor=white&logoWidth=24" alt="vite勳章"/> <img src="https://img.shields.io/badge/-Vue.js-4FC08D?logo=Vue.js&logoColor=white&logoWidth=24" alt="vue.js勳章"/> <img src="https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white&logoWidth=24">

</samp>
</div>

▎DEMO  連結：[點我（請以桌機瀏覽）](https://westleft.github.io/f2e-web-design/) <br>
▎設計稿連結：[點我](https://www.figma.com/file/M2aMcZsEIKBbRdLkj7fCAd/F2E-%2F-W1%3A-%E6%B4%BB%E5%8B%95%E7%B6%B2%E7%AB%99%E8%A8%AD%E8%A8%88?node-id=90%3A702)

此為 [2022 The F2E 前端& UI 修煉精神時光屋](https://2022.thef2e.com/) 內的第一周，關於設計師(稿)的詳細資料可參考 [此連結](https://2022.thef2e.com/users/12061549261447630282)。

## 程式架構

將每個區塊拆成不同的 view，並使用 [Swiper 輪播套件](https://swiperjs.com/) 來達到滾動時向上或向下滾動 `100vh`。

動畫以 `IntersctionObserver` 這個 Web API 來判斷是否觸發動畫，並配合 `Vue Transition` 來實現。

![](https://i.imgur.com/I5IqbIu.gif)

不過動畫、字型、圖片位置等並沒有 100% 還原設計稿上的樣貌，網頁上的內容幾乎都以 %、vw、vh 來呈現，因此在某些地方會有落差，完美呈現這件事就交給其他大神吧。

## 開發後記

本來想用輪播套件上下滑動 `100vh`，爽爽解決滾動的效果，沒想到做到最後一張時發現：~~TMD，最後一張不是 100vh 的畫面啊！~~，後來又自己加了判斷，最後一張畫面時，把這個輪播畫面甩出去螢幕外面（translateY）。

這個判斷使用 `mousewheel` 事件而不是 `scroll`，原因是在最後一張畫面時，若 `window.scroollY` 為 0，要向上滾動會觸發不到事件，因此使用 `mousewheel`，所以在手機上會有 BUG，之後要做手機板再回頭解決。

![](https://i.imgur.com/Xum5t84.gif)

平常很少會接觸到類似的滾動及動畫效果，之後應該還會嘗試玩玩看其他的設計稿，不過手機版就先略過吧，一個裝置就快忙翻了。