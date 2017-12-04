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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var Appointment_service_1 = require("../RESTFul_API_Service/Appointment.service");
"use strict";
var AppointmentModal = (function () {
    function AppointmentModal(route, appoint) {
        var _this = this;
        this.route = route;
        this.appoint = appoint;
        this.booke = ['25 11 2017', '02 12 2017'];
        this.datepickerOpts = {
            autoclose: true, todayBtn: 'linked',
            todayHighlight: true, assumeNearbyYear: true,
            format: 'd MM yyyy', icon: 'fa fa-calendar',
            datesDisabled: this.booke, clearBtn: true,
            startDate: new Date(), showOnFocus: true,
            endDate: new Date(2018, 2)
        };
        //If we remove type casting <any> it will throw error
        this.timepickerOpts = {
            icon: 'fa fa-clock-o',
            showMeridian: false,
            minuteStep: 1,
            defaultTime: 'current'
        };
        this.patientData = {};
        this.consultingReason = '';
        this.appoint.getDoctorAndPaitentMemberId()
            .subscribe(function (result) {
            /* console.log(result);
            console.log(result[0]);
            console.log(result[1]);
            console.log(result[2]);
            console.log(result[3]); */
            _this.doctorMemberId = result[0];
            _this.doctorName = result[1];
            _this.patientCarrier = result[2];
            _this.patientData = result[3];
        });
    }
    AppointmentModal.prototype.bookAppoint = function () {
        var _this = this;
        if (this.date && this.consultingReason) {
            var entries = {};
            entries = {
                memberId: this.patientData.memberId,
                patientFirstName: this.patientData.firstName,
                patientLastName: this.patientData.lastName,
                contactNum: this.patientData.phone,
                carrierName: this.patientCarrier,
                appointDate: this.date.toISOString(),
                reason: this.consultingReason,
                doctorMemberId: this.doctorMemberId
            };
            if (this.date.getTime() >= Date.now()) {
                console.log(entries);
                this.appoint.bookAppointmentForDoctor(entries)
                    .subscribe(function (result) {
                    window.alert(result);
                    (result) ? _this.route.navigate(['home/' + _this.patientData.memberId]) : null;
                }, function (err) {
                    window.alert(err);
                    if (err) {
                        _this.consultingReason.clear();
                        _this.route.navigate(['home/' + _this.patientData.memberId]);
                    }
                });
            }
            else {
                window.alert("You cannot book the Appointment for the past day");
            }
        }
        else {
            window.alert("You have missed some fields please check and enter properly");
        }
    };
    AppointmentModal.prototype.getDate = function (dt) {
        return dt && dt.getTime();
    };
    return AppointmentModal;
}());
AppointmentModal = __decorate([
    core_1.Component({
        selector: 'Appointment-Modal',
        templateUrl: './Customer_MakeAppointment_Modal.html',
        styleUrls: ['./Customer_MakeAppointment_Modal.css'],
    }),
    __metadata("design:paramtypes", [router_1.Router, Appointment_service_1.AppointmentService])
], AppointmentModal);
exports.AppointmentModal = AppointmentModal;
//# sourceMappingURL=Customer_MakeAppointment.js.map