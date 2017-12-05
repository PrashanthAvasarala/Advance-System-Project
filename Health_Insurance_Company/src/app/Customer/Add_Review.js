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
        this.datepickerOpts = {
            autoclose: true, todayBtn: 'linked',
            todayHighlight: true, assumeNearbyYear: true,
            format: 'd MM yyyy', icon: 'fa fa-calendar',
            clearBtn: true, startDate: new Date(2017, 1),
            showOnFocus: true, endDate: new Date()
        };
        this.timepickerOpts = {
            icon: 'fa fa-clock-o',
            showMeridian: false,
            minuteStep: 1,
            defaultTime: 'current'
        };
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
        if (this.date && this.reviewText) {
            if (this.date.getTime() <= Date.now()) {
                var temp = null;
                var data = {
                    memberId: this.patientData.memberId,
                };
                this.appoint.listOfAppointments(data)
                    .subscribe(function (gotBackResult) {
                    _this.patientAppointList = gotBackResult.appointmentsList;
                    for (var _i = 0, _a = _this.patientAppointList; _i < _a.length; _i++) {
                        var singleAppointment = _a[_i];
                        var selectedDate = _this.date.setHours(0, 0, 0, 0);
                        var appointmentAttendedDate = new Date(singleAppointment.dateFromDb).setHours(0, 0, 0, 0);
                        if ((singleAppointment.doctorMemberId === _this.doctorMemberId) && (appointmentAttendedDate.valueOf() === selectedDate.valueOf())) {
                            temp = true;
                            break;
                        }
                        else {
                            temp = false;
                        }
                    }
                });
                if (temp) {
                    var entries = {
                        memberId: this.patientData.memberId,
                        doctorMemberId: this.doctorMemberId,
                        review: this.reviewText,
                        date: this.date.toISOString(),
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
                    window.alert("The Appointment date you have entered doesn't match with our database" +
                        " Or you did not consult this doctor , With out consulting the doctor," +
                        "you cannot give the review ");
                    this.date = null;
                    this.reviewText = null;
                    this.route.navigate(['home/' + this.patientData.memberId]);
                }
            }
            else {
                window.alert("You cannot give review before itself without consulting doctor");
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