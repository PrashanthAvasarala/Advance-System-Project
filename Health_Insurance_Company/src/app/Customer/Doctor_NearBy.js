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
var Appointment_service_1 = require("../RESTFul_API_Service/Appointment.service");
"use strict";
var DoctorNearBy = (function (_super) {
    __extends(DoctorNearBy, _super);
    function DoctorNearBy(rout, apponit) {
        var _this = _super.call(this, rout) || this;
        _this.rout = rout;
        _this.apponit = apponit;
        _this.message = null;
        _this.docList = [];
        return _this;
    }
    DoctorNearBy.prototype.setSelectedDoctorMemberId = function (id, name, option) {
        /* console.log("Doctor Id" ,id)
        console.log("I'm in DoctorNearBy " ,this.customerData); */
        console.log(this.carrier);
        this.apponit.setDoctorAndPaitentDetails(id, name, this.carrier, this.customerData);
        if (option === 'Appointment')
            this.rout.navigate(['home/' + this.customerData.memberId + '/appointment/docAppoint'], { queryParams: { doc_id: id } });
        else
            this.rout.navigate(['home/' + this.customerData.memberId + '/appointment/docAppoint/' + id + '/addReview']);
    };
    return DoctorNearBy;
}(Customer_AuthGuard_1.CustomerAuthGuard));
__decorate([
    core_1.Input('errMsg'),
    __metadata("design:type", String)
], DoctorNearBy.prototype, "message", void 0);
__decorate([
    core_1.Input('elementList'),
    __metadata("design:type", Object)
], DoctorNearBy.prototype, "docList", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DoctorNearBy.prototype, "carrier", void 0);
DoctorNearBy = __decorate([
    core_1.Component({
        selector: 'doctor-nearBy',
        templateUrl: './doctor_nearBy.html',
        styleUrls: ['./doctor_nearBy.css'],
    }),
    __metadata("design:paramtypes", [router_1.Router, Appointment_service_1.AppointmentService])
], DoctorNearBy);
exports.DoctorNearBy = DoctorNearBy;
//# sourceMappingURL=Doctor_NearBy.js.map