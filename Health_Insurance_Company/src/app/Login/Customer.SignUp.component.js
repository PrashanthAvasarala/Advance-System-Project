"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/* Angular Reactive forms api
"https://angular.io/guide/reactive-forms"

Form Group : FormGroup tracks the value and validity state of a group of AbstractControl instances.
The group's properties include its child controls. The top-level form in your component is a FormGroup.

The FormBuilder class helps reduce repetition and clutter by handling details of control creation for you.

*/
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var DBConn_service_1 = require("./../RESTFul_API_Service/DBConn.service");
var router_1 = require("@angular/router");
"use strict";
var CustomerSignUpComponent = (function () {
    function CustomerSignUpComponent(fb, dbConn, router) {
        this.fb = fb;
        this.dbConn = dbConn;
        this.router = router;
        this.createForm();
        this.value = Math.floor(60000 + Math.random() * 10000); // to generate five digit member id greater than 60000
    }
    /* Validation for each and every form field */
    /*Test RegExp here - 'https://www.regexpal.com/' or https://regex101.com/r/iA5bT1/1 */
    CustomerSignUpComponent.prototype.createForm = function () {
        this.entryForm = this.fb.group({
            firstname: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern('[A-Za-z\\s]+')])],
            lastname: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern('[A-Za-z\\s]+')])],
            age: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern('(\\d?[1-9]|[1-9]0)+')])],
            phone: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern('\\s*\\d{10}\\s*')])],
            address: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern('[\\w\\s]+')])],
            city: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern('[A-Za-z\\s]+')])],
            zipcode: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern('([1-9]{1}?\\d{4})+')])],
            state: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern('([A-Za-z]{2})+')])],
            email: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern('([\\w-\.]+@([\\w-]+\.)+[\\w-])+')])],
            password: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern("((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%])(?!.*\\s).{6,16})+")])],
            ConfirmPassword: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern("((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%])(?!.*\\s).{6,16})+")])],
        });
    };
    CustomerSignUpComponent.prototype.register = function () {
        var _this = this;
        var entries = {
            /* Identifiers should match with the java model class Identifiers names */
            user: "customer",
            memberId: this.value,
            firstName: this.entryForm.get('firstname').value,
            lastName: this.entryForm.get('lastname').value,
            age: this.entryForm.get('age').value,
            phone: this.entryForm.get('phone').value,
            houseNumber: this.entryForm.get('address').value,
            city: this.entryForm.get('city').value,
            zipCode: this.entryForm.get('zipcode').value,
            state: this.entryForm.get('state').value,
            email: this.entryForm.get('email').value,
            password: this.entryForm.get('password').value,
        };
        this.dbConn.insertRegistartionValues(entries)
            .subscribe(function (result) {
            window.alert(result);
            _this.entryForm.reset();
        }, 
        /* Error Handling from DBConn.service.ts */
        function (err) {
            window.alert(err);
            _this.entryForm.get("phone").reset(); // Error rises for Phone entry only beacuse Phone is Unique Key
        });
    };
    return CustomerSignUpComponent;
}());
CustomerSignUpComponent = __decorate([
    core_1.Component({
        selector: 'Cust-signUp-page',
        templateUrl: './Customer.SignUp.html',
        providers: [DBConn_service_1.DBConnection],
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, DBConn_service_1.DBConnection, router_1.Router])
], CustomerSignUpComponent);
exports.CustomerSignUpComponent = CustomerSignUpComponent;
//# sourceMappingURL=Customer.SignUp.component.js.map