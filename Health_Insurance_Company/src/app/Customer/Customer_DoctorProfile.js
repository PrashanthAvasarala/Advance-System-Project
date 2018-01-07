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
var Doctor_Home_service_1 = require("../RESTFul_API_Service/Doctor.Home.service");
"use strict";
var DoctorProfileView = (function () {
    function DoctorProfileView(route, appoint, doctorHomeService) {
        var _this = this;
        this.route = route;
        this.appoint = appoint;
        this.doctorHomeService = doctorHomeService;
        this.profileModalTitle = [];
        this.doctorProfile = [];
        this.patientReviews = [];
        this.hasMessage = false;
        this.appoint.getDoctorAndPaitentMemberId()
            .subscribe(function (result) {
            /* this.patientCarrier = result[2];
               this.patientData = result[3]; */
            _this.doctorMemberId = result[0];
            _this.doctorName = result[1];
        });
        console.log(this.doctorName);
        this.DoctorProfileClicked();
        this.ShowReviewsClicked();
    }
    DoctorProfileView.prototype.DoctorProfileClicked = function () {
        var _this = this;
        var entries = {
            doctorMemberId: this.doctorMemberId,
        };
        this.profileModalTitle[0] = "Qualifications and Experience";
        this.doctorHomeService.getDoctorProfile(entries)
            .subscribe(function (doctorProfile) {
            _this.doctorProfile = doctorProfile;
            /* console.log(this.doctorProfile.length) */
        }, function (error) {
            /* console.log("Get Doc Profile", this.doctorProfile);
            console.log(this.doctorProfile.length) */
            _this.editDocProfileMessage = error;
            _this.hasMessage = true;
        });
    };
    DoctorProfileView.prototype.ShowReviewsClicked = function () {
        var _this = this;
        var entries = {
            doctorMemberId: this.doctorMemberId,
        };
        this.profileModalTitle[1] = "Past Patient Reviews";
        this.doctorHomeService.getPatientReviews(entries)
            .subscribe(function (reviews) {
            _this.patientReviews = reviews;
        }, function (error) {
            _this.editDocProfileMessage = error;
            _this.hasMessage = true;
        });
        console.log(this.patientReviews);
    };
    ;
    return DoctorProfileView;
}());
DoctorProfileView = __decorate([
    core_1.Component({
        selector: 'doctor-profile',
        templateUrl: './Customer_DoctorProfile.html',
        styleUrls: ['./Customer_DoctorProfile.css'],
    }),
    __metadata("design:paramtypes", [router_1.Router, Appointment_service_1.AppointmentService, Doctor_Home_service_1.DoctorHomeService])
], DoctorProfileView);
exports.DoctorProfileView = DoctorProfileView;
//# sourceMappingURL=Customer_DoctorProfile.js.map