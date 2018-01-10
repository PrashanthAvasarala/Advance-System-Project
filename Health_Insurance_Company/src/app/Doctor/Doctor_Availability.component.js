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
var Doctor_Home_service_1 = require("../RESTFul_API_Service/Doctor.Home.service");
var router_1 = require("@angular/router");
var DoctorAvailability = (function (_super) {
    __extends(DoctorAvailability, _super);
    function DoctorAvailability(doctorHomeService, rout) {
        var _this = _super.call(this, rout) || this;
        _this.doctorHomeService = doctorHomeService;
        _this.rout = rout;
        _this.allDocSlots = [];
        _this.docTimeSlots = [];
        _this.start = new Date();
        _this.datepickerOpts = {
            autoclose: true, todayBtn: 'linked',
            todayHighlight: true, assumeNearbyYear: true,
            enableOnReadonly: false,
            format: 'd MM yyyy', icon: 'fa fa-calendar', clearBtn: false,
            startDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2), showOnFocus: true,
            endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 3)
        };
        //If we remove type casting <any> it will throw error
        _this.timepickerOpts = {
            icon: 'fa fa-clock-o',
            showMeridian: false,
            minuteStep: 15,
            showSeconds: false,
            defaultTime: '08:00 AM'
        };
        _this.getDocTimeSlots();
        _this.temp = true;
        return _this;
    }
    DoctorAvailability.prototype.getDate = function (dt) {
        this.date = dt;
        return dt && dt.getTime();
    };
    DoctorAvailability.prototype.checkDuplicate = function (currentElement) {
        if (new Date(currentElement).valueOf() !== new Date(this.currentDate).valueOf()) {
            return true;
        }
        else {
            return false;
        }
    };
    DoctorAvailability.prototype.addTimeSlot = function (date) {
        this.selectedDate = new Date(date);
        console.log("this is after all get docl slots", this.allDocSlots);
        if (this.selectedDate.getHours() >= 8 && this.selectedDate.getHours() < 19) {
            var obj = { currentDate: new Date(this.selectedDate.setSeconds(0)).toISOString() };
            var isExist = (this.docTimeSlots.length < 1) ? true : this.docTimeSlots.every(this.checkDuplicate, obj);
            var isExistInDb = (this.allDocSlots.length < 1) ? isExist : this.allDocSlots.every(this.checkDuplicate, obj);
            if (isExist && isExistInDb) {
                this.docTimeSlots.push(this.selectedDate);
            }
            else if (!isExistInDb) {
                window.alert("Looks like You have already added this time slot in the past, please add different time slot");
            }
            else if (!isExist) {
                window.alert("You have already added this time slot, please add different time slot");
            }
        }
        else {
            window.alert("Please select the time slot between 8:00 am and 7:00 pm");
        }
    };
    DoctorAvailability.prototype.delete = function (slot) {
        this.docTimeSlots = this.docTimeSlots.filter(function (arrElement) { return arrElement.valueOf() != slot.valueOf(); });
    };
    DoctorAvailability.prototype.getDocTimeSlots = function () {
        var _this = this;
        var docInfo = {
            doctorMemberId: this.customerData.memberId,
            doctorSchedule: []
        };
        this.doctorHomeService.getDocTimeSlots(docInfo)
            .subscribe(function (response) {
            _this.allDocSlots = response.doctorSchedule;
            console.log("all doc slots length", _this.allDocSlots);
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    DoctorAvailability.prototype.submitTimeSlots = function () {
        var _this = this;
        if (this.docTimeSlots && this.docTimeSlots.length) {
            console.log(this.docTimeSlots);
            var entries = {
                doctorMemberId: this.customerData.memberId,
                doctorSchedule: this.docTimeSlots
            };
            this.doctorHomeService.addDocTimeSlots(entries)
                .subscribe(function (response) {
                console.log(response);
                window.alert(response.successMessage);
                _this.rout.navigate(['/doctorHome/' + _this.customerData.memberId + '/showAvailability']);
            }, function (error) {
                _this.errorMessage = error;
            });
        }
        else {
            window.alert("Please add atleast one time slot");
        }
    };
    return DoctorAvailability;
}(Customer_AuthGuard_1.CustomerAuthGuard));
DoctorAvailability = __decorate([
    core_1.Component({
        selector: 'Doctor-Availability',
        templateUrl: './Doctor_Availability.html',
        styleUrls: ['./Doctor_Availability.css']
    }),
    __metadata("design:paramtypes", [Doctor_Home_service_1.DoctorHomeService, router_1.Router])
], DoctorAvailability);
exports.DoctorAvailability = DoctorAvailability;
//# sourceMappingURL=Doctor_Availability.component.js.map