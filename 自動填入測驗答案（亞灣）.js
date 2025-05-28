// ==UserScript==
// @name         自動填入測驗答案（亞灣）
// @match        https://www.asiabaykh.com/exam/*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const answers = {
    //物聯網與數位轉型簡介
        /*1*/ 17: [3], /*2*/ 18: [3], /*3*/ 19: [1], /*4*/ 20: [2], /*5*/ 21: [3],/*6*/ 22: [2], /*7*/ 23: [2, 3], /*8*/ 24: [1, 5], /*9*/ 25: [2], /*10*/ 26: [2],
        /*11*/ 27: [2], /*12*/ 28: [3], /*13*/ 29: [3, 5], /*14*/ 30: [1], /*15*/ 31: [2],/*16*/ 32: [3], /*17*/ 33: [4], /*18*/ 34: [3, 4, 5], /*19*/ 35: [1, 2, 3], /*20*/ 36: [1],
        /*21*/ 37: [1, 3], /*22*/ 38: [3], /*23*/ 39: [2], /*24*/ 40: [1], /*25*/ 41: [4, 5],/*26*/ 42: [2], /*27*/ 43: [4], /*28*/ 44: [3, 4], /*29*/ 45: [4], /*30*/ 46: [3, 4],
        /*31*/ 47: [4], /*32*/ 48: [3], /*33*/ 49: [3], /*34*/ 50: [2], /*35*/ 51: [3],/*36*/ 52: [1], /*37*/ 53: [2, 4],

    //資料科學簡介
        /*1*/54: [1],/*2*/55: [2],/*3*/56: [3],/*4*/57: [3],/*5*/58: [4],/*6*/59: [3, 5],/*7*/60: [3],/*8*/61: [3, 4, 5],/*9*/62: [1],/*10*/63: [2],
        /*11*/64: [2],/*12*/65: [4],/*13*/66: [3],/*14*/67: [2],/*15*/68: [1],/*16*/69: [1],/*17*/70: [4],/*18*/71: [1],/*19*/72: [3, 5],/*20*/73: [4],
        /*21*/74: [4],/*22*/75: [3, 5],/*23*/76: [1],/*24*/77: [1],/*25*/78: [3],/*26*/79: [2],/*27*/80: [1],/*28*/81: [2],/*29*/82: [3],/*30*/83: [1, 2],
        /*31*/84: [1, 2, 5],
    //網路安全簡介
        /*1*/ 1: [1, 3, 4],/*2*/ 2: [4, 5],/*3*/ 3: [1],/*4*/ 4: [2],/*5*/ 5: [1, 2, 3, 6],/*6*/ 6: [4],/*7*/ 7: [3],/*8*/ 8: [4],/*9*/ 9: [1, 3],/*10*/ 10: [2],
        /*11*/ 11: [1],/*12*/ 12: [4],/*13*/ 13: [2],/*14*/ 14: [5],/*15*/ 15: [1]
    };

    function fillAnswers() {
        Object.entries(answers).forEach(([qId, choices]) => {
            choices.forEach(val => {
                const selector = `input[name="answer[${qId}][]"][value="${val}"]`;
                const checkbox = document.querySelector(selector);
                if (checkbox) checkbox.checked = true;
            });
        });
    }

    function autoSubmit() {
        // 滾動到底
        window.scrollTo(0, document.body.scrollHeight);

        // 精準選擇「送出」按鈕
        const submitBtn = document.querySelector('button.next-button');
        if (submitBtn) {
            setTimeout(() => {
                submitBtn.click();
            }, 500);
        }
    }
    function checkExamRedirect() {
        const currentPath = window.location.pathname;
        if (currentPath.includes("/exam/2576/score") || currentPath.includes("/exam/2577/score") || currentPath.includes("/exam/2578/score")) {
            console.log("偵測到特殊測驗頁面，將在 1 秒後跳回 /account/my-course");
            setTimeout(() => {
            window.location.href = "/account/my-course";
            }, 1000);
        }
    }
    window.addEventListener('load', () => {
        fillAnswers();
        setTimeout(autoSubmit, 500); // 填好再送出
        checkExamRedirect();
    });
})();
