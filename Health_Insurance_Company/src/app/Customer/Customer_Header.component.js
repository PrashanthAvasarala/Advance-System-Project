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
var router_1 = require("@angular/router");
var Customer_AuthGuard_1 = require("./Customer_AuthGuard");
"use strict";
var CustomerHeader = (function (_super) {
    __extends(CustomerHeader, _super);
    /* Taking the sessionstorage into Customer values from Customer_AuthGuard_ts rather declaring another variable */
    function CustomerHeader(rout) {
        var _this = _super.call(this, rout) || this;
        _this.rout = rout;
        /* console.log(this.customerData.memberId); */
        _this.id = _this.customerData.memberId;
        return _this;
    }
    /* To make Log Out tab have a pointer cursor */
    CustomerHeader.prototype.pointer = function () {
        var myStyles = {
            'cursor': 'pointer',
        };
        return myStyles;
    };
    /* Log out from the session and clearing the storage */
    CustomerHeader.prototype.logOut = function () {
        sessionStorage.removeItem("customerData");
        window.sessionStorage.clear();
        location.reload(true);
        this.rout.navigate(['/login']);
    };
    return CustomerHeader;
}(Customer_AuthGuard_1.CustomerAuthGuard));
CustomerHeader = __decorate([
    core_1.Component({
        selector: 'Customer-Header',
        templateUrl: './Customer_Header.html',
        styleUrls: ['./Customer_Header.css'],
    }),
    __metadata("design:paramtypes", [router_1.Router])
], CustomerHeader);
exports.CustomerHeader = CustomerHeader;
//# sourceMappingURL=Customer_Header.component.js.map