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
var ReviewModal = (function () {
    function ReviewModal(route, appoint) {
        var _this = this;
        this.route = route;
        this.appoint = appoint;
        this.starsCount = [1, 1, 1];
        this.patientData = [];
        this.overAllRating = 0;
        /* datepickerOpts: any = {
            autoclose: true, todayBtn: 'linked',
            todayHighlight: true, assumeNearbyYear: true,
            format: 'd MM yyyy', icon: 'fa fa-calendar',
            clearBtn : true, startDate : new Date(2017,1) ,
            showOnFocus: true, endDate : new Date()
          };
    
        timepickerOpts: any = {
           icon: 'fa fa-clock-o',
           showMeridian: false,
           minuteStep: 1,
           defaultTime : 'current'
           } */
        this.patientAppointList = {};
        this.appoint.getDoctorAndPaitentMemberId()
            .subscribe(function (result) {
            _this.doctorMemberId = result[0];
            _this.doctorName = result[1];
            _this.patientData = result[3];
        });
    }
    ReviewModal.prototype.getDate = function (dt) {
        return dt && dt.getTime();
    };
    ReviewModal.prototype.addReview = function () {
        var _this = this;
        for (var count in this.starsCount) {
            this.overAllRating += this.starsCount[count];
        }
        //console.log("I'm result",this.overAllRating/=3)
        this.overAllRating /= 3;
        var data = { memberId: this.patientData.memberId, };
        var temp;
        this.appoint.listOfAppointments(data)
            .subscribe(function (gotBackResult) {
            console.log(gotBackResult);
            _this.patientAppointList = gotBackResult.appointmentsList;
            for (var _i = 0, _a = _this.patientAppointList; _i < _a.length; _i++) {
                var singleAppointment = _a[_i];
                var appointmentAttendedDate = new Date(singleAppointment.dateFromDb);
                console.log("appointmentAttendedDate from database", appointmentAttendedDate);
                console.log("Member Id from database", singleAppointment.doctorMemberId);
                console.log("Local Member Id", _this.doctorMemberId);
                console.log("ppointmentAttendedDate from database in milli seconds", appointmentAttendedDate.valueOf());
                console.log("new date in milli seconds", new Date().valueOf());
                if ((singleAppointment.doctorMemberId === _this.doctorMemberId) && (appointmentAttendedDate.valueOf() < new Date().valueOf())) {
                    temp = true;
                    _this.access = temp;
                    break;
                }
                else {
                    temp = false;
                    _this.access = temp;
                }
            }
        });
        if (this.reviewText) {
            console.log("I can give review", temp);
            console.log("I can give review", this.access);
            if (this.access) {
                var entries = {
                    memberId: this.patientData.memberId,
                    doctorMemberId: this.doctorMemberId,
                    review: this.reviewText,
                    //date : this.date.toISOString(),
                    date: new Date(),
                    rating: this.overAllRating
                };
                //console.log(entries)
                this.appoint.writeReviewForDoctor(entries)
                    .subscribe(function (result) {
                    //console.log("I'm in Add_review class ",result);
                    window.alert(result.errMessage);
                    _this.date = null;
                    _this.reviewText = null;
                    _this.route.navigate(['home/' + _this.patientData.memberId]);
                });
            }
            else {
                window.alert("You cannot give review before itself without consulting doctor");
                this.date = null;
                this.reviewText = null;
                this.route.navigate(['home/' + this.patientData.memberId]);
            }
        }
        else {
            window.alert("You have missed some fields please check and enter properly");
        }
    };
    return ReviewModal;
}());
ReviewModal = __decorate([
    core_1.Component({
        selector: 'add-review',
        templateUrl: './Add_Review.html',
        styleUrls: ['./Add_Review.css'],
    }),
    __metadata("design:paramtypes", [router_1.Router, Appointment_service_1.AppointmentService])
], ReviewModal);
exports.ReviewModal = ReviewModal;
//# sourceMappingURL=Add_Review.js.map