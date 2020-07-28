(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./src/app/shared/services/seller.service.ts":
/*!***************************************************!*\
  !*** ./src/app/shared/services/seller.service.ts ***!
  \***************************************************/
/*! exports provided: SellerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SellerService", function() { return SellerService; });
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.service */ "./src/app/shared/services/base.service.ts");
/* harmony import */ var _error_handler_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./error-handler.service */ "./src/app/shared/services/error-handler.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");








var SellerService = /** @class */ /*@__PURE__*/ (function () {
    function SellerService(baseService, errorHandler, http) {
        this.baseService = baseService;
        this.errorHandler = errorHandler;
        this.http = http;
        this.baseUrl = this.baseService.baseUrl;
    }
    SellerService.prototype.addSeller = function (data) {
        var dataForm = new FormData();
        if (data.id != null) {
            dataForm.append('id', data['id']);
        }
        if (data.file != "") {
            dataForm.append('file', data['file']);
        }
        dataForm.append('IFSCCode', data['IFSCCode']);
        dataForm.append('accHolderName', data['accHolderName']);
        dataForm.append('accountNumber', data['accountNumber']);
        dataForm.append('bankName', data['bankName']);
        dataForm.append('buildingName', data['buildingName']);
        dataForm.append('ccEmail', data['ccEmail']);
        dataForm.append('commission', data['commission']);
        dataForm.append('countryId', data['countryId']);
        dataForm.append('floorNo', data['floorNo']);
        dataForm.append('houseNo', data['houseNo']);
        dataForm.append('mobileNo', data['mobileNo']);
        dataForm.append('password', data['password']);
        dataForm.append('pickupAddress', data['pickupAddress']);
        dataForm.append('pincode', data['pincode']);
        dataForm.append('sellerEmail', data['sellerEmail']);
        dataForm.append('sellerName', data['sellerName']);
        dataForm.append('streetName', data['streetName']);
        dataForm.append('supplyTypeId', data['supplyTypeId']);
        dataForm.append('unitNo', data['unitNo']);
        dataForm.append('userName', data['userName']);
        return this.http.post(this.baseUrl + 'admin/seller', dataForm).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["retry"])(3), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(this.errorHandler.handleError));
    };
    SellerService.prototype.getAllSellers = function (page) {
        var params = { page: page };
        return this.http.get(this.baseUrl + 'admin/seller', { params: params }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["retry"])(3), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(this.errorHandler.handleError));
    };
    SellerService.prototype.getAllSellersSearch = function (page, searchKey, exportAll, countryId) {
        (countryId == "null") ? '' : page = 0;
        var params = { page: page, searchKey: searchKey, exportAll: exportAll, countryId: countryId };
        return this.http.get(this.baseUrl + 'admin/seller', { params: params }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["retry"])(3), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(this.errorHandler.handleError));
    };
    SellerService.prototype.getSellerdetails = function (id) {
        return this.http.get(this.baseUrl + 'admin/seller/detail/' + id)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["retry"])(3), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(this.errorHandler.handleError));
    };
    SellerService.prototype.deleteSeller = function (id) {
        return this.http.delete(this.baseUrl + 'admin/seller/' + id)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["retry"])(3), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(this.errorHandler.handleError));
    };
    SellerService.prototype.updateSellerStatus = function (statusData) {
        return this.http.put(this.baseUrl + 'admin/seller', statusData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["retry"])(3), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(this.errorHandler.handleError));
    };
    SellerService.ngInjectableDef = _angular_core__WEBPACK_IMPORTED_MODULE_4__["defineInjectable"]({ factory: function SellerService_Factory() { return new SellerService(_angular_core__WEBPACK_IMPORTED_MODULE_4__["inject"](_base_service__WEBPACK_IMPORTED_MODULE_0__["BaseService"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["inject"](_error_handler_service__WEBPACK_IMPORTED_MODULE_1__["ErrorHandlerService"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["inject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"])); }, token: SellerService, providedIn: "root" });
    return SellerService;
}());



/***/ }),

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