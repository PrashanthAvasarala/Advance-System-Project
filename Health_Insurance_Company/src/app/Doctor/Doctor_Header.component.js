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
var Customer_AuthGuard_1 = require("../Customer/Customer_AuthGuard");
var router_1 = require("@angular/router");
var Doctor_Home_service_1 = require("../RESTFul_API_Service/Doctor.Home.service");
var forms_1 = require("@angular/forms");
var Appointment_service_1 = require("../RESTFul_API_Service/Appointment.service");
var DoctorHeader = (function (_super) {
    __extends(DoctorHeader, _super);
    /* Taking the sessionstorage into Customer values from Customer_AuthGuard_ts rather declaring another variable */
    function DoctorHeader(doctorHomeService, rout, fb, appoint) {
        var _this = _super.call(this, rout) || this;
        _this.doctorHomeService = doctorHomeService;
        _this.rout = rout;
        _this.fb = fb;
        _this.appoint = appoint;
        _this.patientAppointments = [];
        _this.patientReviews = [];
        _this.patientLabReports = [];
        _this.doctorProfile = [];
        _this.updateResponse = [];
        _this.doctor = [];
        _this.hasMessage = false;
        _this.datepickerOpt = {
            autoclose: true, todayBtn: 'linked',
            todayHighlight: true, assumeNearbyYear: true,
            format: 'd MM yyyy', icon: 'fa fa-calendar',
            datesDisabled: _this.booke, clearBtn: false,
            startDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2), showOnFocus: true,
            endDate: new Date(2018, 2)
        };
        _this.id = _this.customerData.memberId;
        _this.temp = false;
        return _this;
    }
    DoctorHeader.prototype.showPastAppointmentsClicked = function (event) {
        var _this = this;
        var entries = {
            doctorMemberId: this.customerData.memberId
        };
        this.modalTitle = "Past Appointments";
        this.doctorHomeService.getPastAppointments(entries)
            .subscribe(function (appointments) {
            _this.patientAppointments = appointments;
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    ;
    DoctorHeader.prototype.ShowReviewsClicked = function (event) {
        var _this = this;
        var entries = {
            doctorMemberId: this.customerData.memberId
        };
        this.modalTitle = "Patient Reviews";
        this.doctorHomeService.getPatientReviews(entries)
            .subscribe(function (reviews) {
            _this.patientReviews = reviews;
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    ;
    DoctorHeader.prototype.ShowLabReportsClicked = function (event) {
        var _this = this;
        var entries = {
            doctorMemberId: this.customerData.memberId
        };
        this.modalTitle = "Lab Reports For PickUp";
        this.doctorHomeService.getPatientLabReports(entries)
            .subscribe(function (labReports) {
            _this.patientLabReports = labReports;
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    DoctorHeader.prototype.ShowAppointmentsForTodayClicked = function (event) {
        var _this = this;
        var entries = {
            doctorMemberId: this.customerData.memberId
        };
        this.modalTitle = "More Appointments";
        this.doctorHomeService.getAppointmentsForToday(entries)
            .subscribe(function (appointments) {
            _this.patientAppointments = appointments;
            console.log(_this.patientAppointments);
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    DoctorHeader.prototype.DoctorProfileClicked = function (event) {
        var _this = this;
        var entries = {
            doctorMemberId: this.customerData.memberId
        };
        this.profileModalTitle = "Edit Profile";
        this.doctorHomeService.getDoctorProfile(entries)
            .subscribe(function (doctorProfile) {
            _this.doctorProfile = doctorProfile;
        }, function (error) {
            console.log("Get Doc Profile", _this.doctorProfile);
            _this.editDocProfileMessage = error;
            _this.hasMessage = true;
        });
        console.log("Im from DB date", this.doctorProfile.availableDate);
        /* this.availableDate = new Date(this.doctorProfile.availableDate); */
        console.log("Im assigned to available  date", this.availableDate);
        console.log("Im from DB date", new Date(this.doctorProfile.availableDate));
        /* this.date = new Date(new Date(this.doctorProfile.availableDate) && new Date(this.doctorProfile.availableDate).getTime());
        var userTimezoneOffset = new Date(this.doctorProfile.availableDate).getTimezoneOffset() * 60000;
        console.log(this.date);
        if(this.doctorProfile.availableDate){
                  window.alert("Last Available date you have updated is: "+new Date(this.doctorProfile.availableDate));
        } */
    };
    DoctorHeader.prototype.updatePasswordClicked = function () {
        this.doctor = {
            password: '',
            confirmPassword: ''
        };
        this.passwordMatch = true;
    };
    DoctorHeader.prototype.passwordCheck = function (doctor) {
        if (doctor.password === doctor.confirmPassword) {
            return true;
        }
        return false;
    };
    DoctorHeader.prototype.updatePassword = function (event) {
        var _this = this;
        this.passwordMatch = this.passwordCheck(this.doctor);
        if (this.passwordMatch) {
            console.log("Password is ", this.doctor.password);
            console.log("Password is ", this.doctor.confirmPassword);
            var entries = {
                doctorMemberId: this.customerData.memberId,
                password: this.doctor.password
            };
            this.doctorHomeService.updatePassword(entries)
                .subscribe(function (result) {
                console.log(result);
                _this.updatedPasswordResp = result;
                _this.hasMessage = true;
                result.password = "";
                _this.doctor.password = "";
                _this.doctor.confirmPassword = "";
                _this.passwordSuccessMsg = result.successMessage;
                window.alert(_this.passwordSuccessMsg);
            }, function (error) {
                _this.passwordErrorMsg = error;
                _this.hasMessage = true;
            });
        }
    };
    DoctorHeader.prototype.editDoctorProfile = function (event) {
        var _this = this;
        console.log("hello I'm selected date ", this.availableDate);
        this.doctorProfile.availableDate = this.availableDate;
        if (!this.doctorProfile.doctorMemberId) {
            this.doctorProfile.doctorMemberId = this.id;
            this.doctorProfile.profileExists = false;
        }
        else {
            this.doctorProfile.profileExists = true;
        }
        var entries = {
            affiliatedInsurance: this.doctorProfile.affiliatedInsurance,
            boardCertification: this.doctorProfile.boardCertification,
            doctorFirstName: this.doctorProfile.doctorFirstName,
            doctorLastName: this.doctorProfile.doctorLastName,
            doctorMemberId: this.doctorProfile.doctorMemberId,
            education: this.doctorProfile.education,
            hospitalAffliation: this.doctorProfile.hospitalAffliation,
            languagesSpoken: this.doctorProfile.languagesSpoken,
            professionalMemberships: this.doctorProfile.professionalMemberships,
            profileExists: this.doctorProfile.profileExists,
            specialities: this.doctorProfile.specialities,
            availableDate: this.availableDate,
            address: this.doctorProfile.address,
        };
        this.doctorHomeService.updateDoctorProfile(entries)
            .subscribe(function (doctorQualifications) {
            _this.updateResponse = doctorQualifications;
            _this.hasMessage = true;
            _this.editDocProfileMessage = _this.updateResponse.successMessage;
        }, function (error) {
            _this.editDocProfileMessage = error;
            _this.hasMessage = true;
        });
    };
    DoctorHeader.prototype.clearError = function () {
        this.editDocProfileMessage = "";
        this.hasMessage = false;
    };
    /* To make Log Out tab have a pointer cursor */
    DoctorHeader.prototype.pointer = function () {
        var myStyles = {
            'cursor': 'pointer',
        };
        return myStyles;
    };
    DoctorHeader.prototype.differAppointment = function (id, dt) {
        console.log(new Date(dt).getTime());
        var entries = {
            doctorMemberId: this.customerData.memberId,
            memberId: id
        };
        if (new Date(dt).getDate() != new Date().getDate()) {
            this.appoint.deleteAppointment(entries)
                .subscribe(function (result) {
                console.log(result);
                window.alert(result.errMessage);
                location.reload(true);
                /* this.rout.navigate(['doctorHome/'+this.customerData.memberId]); */
            });
        }
        else {
            var hours = Math.floor((new Date(dt).getTime() - Date.now()) / (1000 * 60 * 60));
            window.alert("You cannot cancel your appointment within 24 hours of appointment time," +
                "right now your have only " + hours +
                "  hours,Your Appointment cannot be cancelled");
        }
    };
    DoctorHeader.prototype.logOut = function () {
        sessionStorage.removeItem("customerData");
        //sessionStorage.removeItem("userData");
        window.sessionStorage.clear();
        location.reload(true);
        this.rout.navigate(['/login']);
    };
    return DoctorHeader;
}(Customer_AuthGuard_1.CustomerAuthGuard));
__decorate([
    core_1.Input('temp'),
    __metadata("design:type", Boolean)
], DoctorHeader.prototype, "temp", void 0);
DoctorHeader = __decorate([
    core_1.Component({
        selector: 'Doctor-Header',
        templateUrl: './Doctor_Header.html',
        styleUrls: ['./Doctor_Header.css']
    }),
    __metadata("design:paramtypes", [Doctor_Home_service_1.DoctorHomeService, router_1.Router, forms_1.FormBuilder, Appointment_service_1.AppointmentService])
], DoctorHeader);
exports.DoctorHeader = DoctorHeader;
//# sourceMappingURL=Doctor_Header.component.js.map