"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var Authentication_Service_1 = require("./../RESTFul_API_Service/Authentication.Service");
var Customer_AuthGuard_1 = require("../Customer/Customer_AuthGuard");
"use strict";
var LoginComponent = (function (_super) {
    __extends(LoginComponent, _super);
    function LoginComponent(fb, AuthService, rout) {
        var _this = _super.call(this, rout) || this;
        _this.fb = fb;
        _this.AuthService = AuthService;
        _this.rout = rout;
        if (_this.customerData) {
            sessionStorage.removeItem("customerData");
            window.sessionStorage.clear();
            location.reload(true);
            _this.rout.navigate(['/']);
        }
        _this.loginFormValidation();
        return _this;
    }
    /* Login Form validation */
    LoginComponent.prototype.loginFormValidation = function () {
        this.loginForm = this.fb.group({
            memberId: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required],
        });
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        var loginData = {
            /* Identifiers should match with the java model class Identifiers names */
            memberId: this.loginForm.get("memberId").value,
            password: this.loginForm.get("password").value,
        };
        this.AuthService.loginAuthentication(loginData)
            .subscribe(function (result) {
            /* console.log(result); */
            (result.user === "doctor") ? _this.rout.navigate(['doctorHome', result.memberId]) : _this.rout.navigate(['home', result.memberId]);
            /* this.router.navigate(['home', result.memberId])      -->    It will look like this -->  http://localhost:3004/home/63236
            this.router.navigate(['home'],{ queryParams: { id: result.memberId } } ); -->   It will look like this -->  http://localhost:3004/home/?id=63236   */
            /* var obj = JSON.parse(sessionStorage.userData);
            console.log(obj); */
        }, function (err) {
            window.alert(err);
            _this.loginForm.reset(); // Error rises for member Id and password because they doesn't exist in database or while subscribing from Authentication service
        });
    };
    return LoginComponent;
}(Customer_AuthGuard_1.CustomerAuthGuard));
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login-page',
        templateUrl: './Login.html',
        styleUrls: ['./Login.css'],
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, Authentication_Service_1.AuthenticationService, router_1.Router])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=Login.component.js.map