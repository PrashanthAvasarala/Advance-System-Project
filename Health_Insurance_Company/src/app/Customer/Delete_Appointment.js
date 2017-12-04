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
var DeleteAppoint = (function (_super) {
    __extends(DeleteAppoint, _super);
    function DeleteAppoint(rout, appoint) {
        var _this = _super.call(this, rout) || this;
        _this.rout = rout;
        _this.appoint = appoint;
        _this.patientAppointList = {};
        _this.memberId = _this.customerData.memberId;
        _this.getPatientListOfAppointments();
        return _this;
    }
    DeleteAppoint.prototype.getPatientListOfAppointments = function () {
        var _this = this;
        var entries = {
            memberId: this.memberId
        };
        this.appoint.listOfAppointments(entries)
            .subscribe(function (result) {
            //console.log("I'm in DeleteAppoint class",result.appointmentsList);
            _this.patientAppointList = result.appointmentsList;
        });
    };
    DeleteAppoint.prototype.cancelAppoint = function (data) {
        var _this = this;
        /* console.log(data.dateFromDb);
        console.log(new Date(data.dateFromDb));
        console.log(new Date(data.dateFromDb).getTime()); */
        this.appDate = new Date(data.dateFromDb).getTime();
        if (this.appDate > Date.now()) {
            if ((this.appDate - Date.now()) > 8.64e+7) {
                //console.log("Hello I'm in sending class")
                var entries = {
                    memberId: this.memberId,
                    doctorMemberId: data.doctorMemberId
                };
                //console.log("Hello I'm in sending class",entries);
                this.appoint.deleteAppointment(entries)
                    .subscribe(function (result) {
                    console.log(result);
                    window.alert(result.errMessage);
                    _this.rout.navigate(['home/' + _this.memberId]);
                });
            }
            else {
                var hours = Math.floor((this.appDate - Date.now()) / (1000 * 60 * 60));
                window.alert("You cannot cancel your appointment within 24 hours of appointment time," +
                    "right now your have only " + hours +
                    "  hours,Your Appointment cannot be cancelled");
            }
        }
        else {
            window.alert("You had already consulted the doctor," +
                "Your appointment history will be cancelled within 6 months");
        }
    };
    return DeleteAppoint;
}(Customer_AuthGuard_1.CustomerAuthGuard));
DeleteAppoint = __decorate([
    core_1.Component({
        selector: 'delete-appoint',
        templateUrl: './Delete_Appointment.html',
        styleUrls: ['./Delete_Appointment.css'],
    }),
    __metadata("design:paramtypes", [router_1.Router, Appointment_service_1.AppointmentService])
], DeleteAppoint);
exports.DeleteAppoint = DeleteAppoint;
//# sourceMappingURL=Delete_Appointment.js.map