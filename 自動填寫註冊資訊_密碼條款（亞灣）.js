// ==UserScript==
// @name         自動填寫註冊資訊_密碼條款（亞灣）
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  自動填寫密碼、勾選同意條款、選擇推薦來源，點擊輸入框自動貼上剪貼簿內容
// @match        https://www.asiabaykh.com/register
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function fillForm() {
        // 填入密碼
        document.getElementById('password').value = 'a38708242';
        document.getElementById('password_confirmation').value = 'a38708242';

        // 勾選同意條款
        const agreeCheckbox = document.getElementById('agree');
        if (agreeCheckbox) agreeCheckbox.checked = true;

        // 設定下拉選單推薦來源
        const referralSelect = document.getElementById('referral_source_id');
        if (referralSelect) referralSelect.value = '3';
        document.getElementById('school_name').value = '崑山科技大學';
        if (referralSelect) referralSelect.value = '3';
        document.getElementById('school_department').value = '電子工程系';
        if (referralSelect) referralSelect.value = '3';
        // 隨機選擇老師
        const teachers = ['熊效儀', '張世熙'];
        const randomTeacher = teachers[Math.floor(Math.random() * teachers.length)];
        // 填入老師欄位
        document.getElementById('teacher').value = randomTeacher;


        console.log("註冊表單已填寫！");
    }
    function pasteClipboardContent(event) {
        navigator.clipboard.readText().then(clipboardText => {
            if (clipboardText) {
                event.target.value = clipboardText; // 貼上剪貼簿內容
                console.log(`已貼上: ${clipboardText}`);
            }
        }).catch(error => console.error("無法讀取剪貼簿內容", error));
    }

    // 監聽點擊輸入框，貼上剪貼簿內容
    document.addEventListener('click', (event) => {
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            pasteClipboardContent(event);
        }
    });
    // 延遲執行，確保頁面載入完成
    setTimeout(fillForm, 1500);
})();
