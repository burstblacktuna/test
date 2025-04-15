// ==UserScript==
// @name         自動影片腳本(亞灣)
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  自動將影片進度條拉到最後，不需等待加載完畢
// @match        https://www.asiabaykh.com/study/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function skipToEnd() {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            // 確保影片物件存在，並嘗試拉到底
            if (!isNaN(video.duration) && video.duration > 0) {
                video.currentTime = video.duration;
            }
        });
    }

    // 每0.1秒執行一次，讓影片即使未加載完成也會嘗試跳到最後
    setInterval(skipToEnd, 100);
})();
