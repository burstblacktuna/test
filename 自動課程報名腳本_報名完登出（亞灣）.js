// ==UserScript==
// @name         自動課程報名腳本（按順序報名後登出）
// @match        https://www.asiabaykh.com/course/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 定義課程順序
    const courseSequence = ["/course/1", "/course/2", "/course/3", "/course/4"];
    const currentPath = window.location.pathname;

    async function registerCourse() {
        console.log(`偵測到 ${currentPath} 頁面，開始報名流程`);

        // 立即關閉可能出現的彈窗
        document.querySelectorAll('.swal2-confirm.swal2-styled').forEach(btn => btn.click());

        // 找到報名按鈕並點擊
        const applyButton = document.querySelector('[onclick="courseApply()"]');
        if (applyButton) {
            applyButton.click();
            console.log("點擊報名按鈕");
        } else {
            console.log("未找到報名按鈕，可能該課程無法報名");
            return; // 退出流程
        }

        await new Promise(resolve => setTimeout(resolve, 600)); // 等待彈窗出現

        // 點擊確認按鈕
        /*const confirmButton = document.querySelector('.swal2-confirm.swal2-styled.swal2-default-outline');
        if (confirmButton) {
            confirmButton.click();
            console.log("點擊確認按鈕");
        } else {
            console.log("未找到確認按鈕，可能報名流程不同");
            return; // 退出流程
        }

        await new Promise(resolve => setTimeout(resolve, 500)); // 等待操作完成
        */
        // 計算下一個課程
        const currentIndex = courseSequence.indexOf(currentPath);
        if (currentIndex >= 0 && currentIndex < courseSequence.length - 1) {
            const nextCourse = courseSequence[currentIndex + 1];
            window.location.href = nextCourse;
            console.log(`報名完畢，跳轉至 ${nextCourse}`);
        } else {
            window.location.href = "/logout";
            console.log("報名完畢，跳轉至登出頁面");
        }
    }

    // 每秒檢查是否有彈窗，並立即關閉
    setInterval(() => {
        document.querySelectorAll('.swal2-confirm.swal2-styled').forEach(btn => btn.click());
    }, 300);

    // 直接執行報名流程
    registerCourse();
})();
