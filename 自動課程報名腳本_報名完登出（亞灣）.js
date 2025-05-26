// ==UserScript==
// @name         自動課程報名腳本_報名完登出（亞灣）
// @match        https://www.asiabaykh.com/course/*
// @match        https://www.asiabaykh.com/course
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    async function registerCourse() {
        console.log("偵測到課程頁面，開始報名流程");

        // 立即關閉可能出現的彈窗
        document.querySelectorAll('.swal2-confirm.swal2-styled').forEach(btn => btn.click());

        const applyButton = document.querySelector('[onclick="courseApply()"]');
        if (applyButton) {
            applyButton.click();
            console.log("點擊報名按鈕");
        } else {
            console.log("未找到報名按鈕，可能該課程無法報名");
            return; // 退出流程
        }

        await new Promise(resolve => setTimeout(resolve, 1000)); // 等待彈窗出現

        /*const confirmButton = document.querySelector('.swal2-confirm.swal2-styled.swal2-default-outline');
        if (confirmButton) {
            confirmButton.click();
            console.log("點擊確認按鈕");
        } else {
            console.log("未找到確認按鈕，可能報名流程不同");
            return; // 退出流程
        }

        await new Promise(resolve => setTimeout(resolve, 100)); // 等待操作完成
*/
        // 檢查是否在 /course/4 頁面，若是則跳轉至登出
        if (window.location.pathname === "/course/4") {
            window.location.href = "/logout";
            console.log("報名完畢，跳轉至登出頁面");
        } else {
            window.location.href = "/course"; // 回到課程總覽
            console.log("報名完畢，返回課程總覽");
        }
    }

    // 每秒檢查是否有彈窗，並立即關閉
    setInterval(() => {
        document.querySelectorAll('.swal2-confirm.swal2-styled').forEach(btn => btn.click());
    }, 300);

    // 直接執行報名流程
    registerCourse();
})();
