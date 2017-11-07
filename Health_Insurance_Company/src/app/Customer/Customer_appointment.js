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
var Customer_Home_View_1 = require("./Customer_Home_View");
"use strict";
var CustomerAppointment = (function (_super) {
    __extends(CustomerAppointment, _super);
    function CustomerAppointment() {
        return _super.call(this) || this;
    }
    return CustomerAppointment;
}(Customer_Home_View_1.CustomerHomeView));
CustomerAppointment = __decorate([
    core_1.Component({
        selector: 'Customer-Appointment',
        templateUrl: './Customer_appointment.html',
        styleUrls: ['./Customer_appointment.css'],
    }),
    __metadata("design:paramtypes", [])
], CustomerAppointment);
exports.CustomerAppointment = CustomerAppointment;
//# sourceMappingURL=Customer_appointment.js.map