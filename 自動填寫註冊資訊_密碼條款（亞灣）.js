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
        const departments = ['電子工程系', '資訊管理系', '資訊工程系', '機械工程系', '電機工程系', '智慧機器人工程系'];
        const randomDepartment = departments[Math.floor(Math.random() * departments.length)];
        // 填入密碼
        document.getElementById('password').value = 'a38708242';
        document.getElementById('password_confirmation').value = 'a38708242';
        // 學生類型
        SelectBoxChange('student_type',3);//非屬前述類別有意至高雄工作者
        // 學生資訊
        SelectBoxChange('student_education_level',2);//大專院校
            //學校
            SelectBoxChange('student_school_area',2);//非高雄地區學校
            //系/所 *隨機
            document.getElementById('student_academic_department').value = randomDepartment;
            //應屆畢業生
            const pickGraduate = Math.random() < 0.3 ? '1' : '0';//30%為"是"
            SelectBoxChange('student_is_graduate',pickGraduate);

        // 如何得知亞灣人才培訓計畫
        SelectBoxChange('referral_source_id',3);//高雄大專院校
            //學校名稱
            document.getElementById('school_name').value = '崑山科技大學';
            // 系所名稱 *隨機
            document.getElementById('school_department').value = randomDepartment;
            // 老師姓名
            document.getElementById('teacher').value = '熊效儀';

        // 勾選同意條款
        const agreeCheckbox = document.getElementById('agree');
        if (agreeCheckbox) agreeCheckbox.checked = true;
    }

    function SelectBoxChange(selectId, value) {
        const selectEl = document.getElementById(selectId);
            if (selectEl) {
                selectEl.value = value;
                selectEl.dispatchEvent(new Event('change'));
            } else {
        console.warn(`找不到 ID 為 '${selectId}' 的選擇元件`);
            }
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
