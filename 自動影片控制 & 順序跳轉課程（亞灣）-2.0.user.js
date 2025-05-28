// ==UserScript==
// @name         自動影片控制 & 順序跳轉課程（亞灣）
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  影片拉到底後播放並暫停，最多執行 2 次，並依序跳轉課程
// @match        https://www.asiabaykh.com/study/*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let playPauseCount = 0; // 記錄 playAndPauseVideos 執行次數
    const maxPlayPauseExecutions = 2; // 最多執行 2 次

    // 讓影片拉到底的函式
    function skipToEnd() {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            if (!isNaN(video.duration) && video.duration > 0) {
                video.currentTime = video.duration;
            }
        });
    }

    // 讓影片自動播放並暫停的函式
    function playAndPauseVideos() {
        if (playPauseCount >= maxPlayPauseExecutions) {
            clearInterval(playPauseInterval);
            console.log("已達最大執行次數，停止 playAndPauseVideos");
            goToNextStudyPage(); // 執行頁面跳轉
            return;
        }

        playPauseCount++; // 增加執行次數
        console.log(`執行 playAndPauseVideos 第 ${playPauseCount} 次`);

        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            video.play();
            const pauseButton = document.querySelector('[title="Pause"]');
            if (pauseButton) {
                pauseButton.click();
                console.log("已點擊暫停按鈕");
            }
        });
    }

    // 獨立函式：判斷下一個課程網址，並自動跳轉
    function goToNextStudyPage() {
        const currentPath = window.location.pathname;
        const match = currentPath.match(/\/study\/(\d+)\/(\d+)/);

        if (!match) {
            console.log("無法解析當前網址，停止跳轉");
            return;
        }

        let course = parseInt(match[1]); // 目前的 `study/X`
        let lesson = parseInt(match[2]); // 目前的 `study/X/Y`

        // 課程結構
        const studyStructure = {
            1: 6,
            2: 4,
            3: 5,
            4: 14
        };

        if (lesson < studyStructure[course]) {
            // 還有下一個課程影片
            window.location.href = `/study/${course}/${lesson + 1}`;
            console.log(`跳轉至 /study/${course}/${lesson + 1}`);
        } else if (course < 4) {
            // 換到下一個 study/X
            window.location.href = `/study/${course + 1}/1`;
            console.log(`跳轉至 /study/${course + 1}/1`);
        } else {
            // 已經到 /study/4/14，結束腳本
            console.log("所有課程已完成，不再跳轉");
        }
    }

    // 讓兩個功能 **同時運行**
    setInterval(skipToEnd, 100);  // 每 0.1 秒讓影片拉到底
    const playPauseInterval = setInterval(playAndPauseVideos, 500);  // 每 0.5 秒讓影片自動播放 + 暫停（最多執行 2 次）

})();
