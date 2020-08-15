(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./src/app/shared/utility/custom-validators.ts":
/*!*****************************************************!*\
  !*** ./src/app/shared/utility/custom-validators.ts ***!
  \*****************************************************/
/*! exports provided: noWhitespaceValidator, passwordMatchValidator, openLinkInNewTab, validateAllFormFields, blankSpaceInputNotValid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noWhitespaceValidator", function() { return noWhitespaceValidator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "passwordMatchValidator", function() { return passwordMatchValidator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openLinkInNewTab", function() { return openLinkInNewTab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateAllFormFields", function() { return validateAllFormFields; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "blankSpaceInputNotValid", function() { return blankSpaceInputNotValid; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");

// email pattern - /(^[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+$)/
// phone pattern - /[+]?[0-9]{0,13}$/
function noWhitespaceValidator(control) {
    var isWhitespace = (control.value || '').trim().length === 0;
    var isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
}
function passwordMatchValidator(control) {
    var password = control.get('password');
    var confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value ? { 'passwordmatchfailed': true } : null;
}
function openLinkInNewTab(link) {
    var url = '';
    if (!/^http[s]?:\/\//.test(link)) {
        url += 'http://';
    }
    url += link;
    window.open(url, '_blank');
}
function validateAllFormFields(formGroup) {
    Object.keys(formGroup.controls).forEach(function (field) {
        var control = formGroup.get(field);
        if (control instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]) {
            control.markAsTouched({ onlySelf: true });
        }
        else if (control instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormGroup"] || control instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormArray"]) {
            validateAllFormFields(control);
        }
    });
}
function blankSpaceInputNotValid(control) {
    if (control && control.value && !control.value.replace(/\s/g, '').length) {
        control.setValue('');
    }
    return null;
}


/***/ })

}]);