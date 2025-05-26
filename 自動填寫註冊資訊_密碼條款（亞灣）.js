// ==UserScript==
// @name         自動填寫註冊資訊_密碼條款（亞灣）
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  自動填寫密碼、勾選同意條款
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

        console.log("註冊表單已填寫！");
    }

    // 延遲執行，確保頁面載入完成
    setTimeout(fillForm, 2000);
})();
