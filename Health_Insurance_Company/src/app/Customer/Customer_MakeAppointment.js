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
        //booke : string[] = ['25 11 2017' , '02 12 2017'];
        this.booke = [];
        this.blocks = [];
        this.datepickerOpts = {
            autoclose: true, todayBtn: 'linked',
            todayHighlight: true, assumeNearbyYear: true,
            format: 'd MM yyyy', icon: 'fa fa-calendar',
            datesDisabled: this.booke, clearBtn: false,
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
        this.valuesEntered = false;
        this.map = {};
        this.availableTimes = [];
        this.errorMessage = '';
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
        this.getDoctorDates();
    }
    /* ngAfterContentInit(){
  
     this.map = new Map();
     this.myDate= new Date(2018,1,7);
     
     this.map.set(this.myDate,[new Date(2018,1,7,9,0).getTime() , new Date(2018,1,7,12,0).getTime() , new Date(2018,1,7,15,0).getTime()]);
     this.map.set(new Date(2018,1,8),[new Date(2018,1,7,8,0).getTime() , new Date(2018,1,8,12,0).getTime() , new Date(2018,1,8,15,0).getTime()]);
     this.map.set(new Date(2018,1,9),[new Date(2018,1,9,9,0).getTime() , new Date(2018,1,9,12,0).getTime() , new Date(2018,1,9,15,0).getTime()]);
     console.log(this.map.get(this.myDate));
    } */
    AppointmentModal.prototype.getAvailableDates = function (dates) {
        var _this = this;
        this.availableTimes = [];
        this.errorMessage = '';
        /* console.log("date entered is ", dates);
           console.log("my date", this.myDate);*/
        if (!dates) {
            this.errorMessage = "Please enter the date and then check Doctor's availability";
            return this.availableTimes;
        }
        this.map = new Map();
        this.myDate = new Date(2018, 0, 3);
        this.map.set(this.myDate, [new Date(2018, 0, 3, 9, 0), new Date(2018, 0, 3, 12, 0), new Date(2018, 0, 3, 15, 0)]);
        this.map.set(new Date(2018, 1, 8), [new Date(2018, 1, 8, 8, 0), new Date(2018, 1, 8, 12, 0), new Date(2018, 1, 8, 15, 0)]);
        this.map.set(new Date(2018, 1, 9), [new Date(2018, 1, 9, 10, 0), new Date(2018, 1, 9, 12, 0), new Date(2018, 1, 9, 13, 0)]);
        // console.log("my date", this.myDate);
        // console.log("check in the map", this.map.get(this.myDate));
        // console.log("check in the map", this.map.get(this.myDate));
        // console.log("keys length", this.map.keys());
        this.map.forEach(function (value, key) {
            /* console.log("date entered is ", dates.getDate() , "Month entered is ", dates.getMonth() );
               console.log("date from databse is ", key.getDate() , "Month from databse is ", key.getMonth() ); */
            _this.errorMessage = '';
            if (key.getDate() == dates.getDate() && key.getMonth() == dates.getMonth()) {
                _this.availableTimes = value;
                console.log(_this.availableTimes);
                return _this.availableTimes;
            }
        });
        if (!(this.availableTimes && this.availableTimes.length)) {
            this.errorMessage = "Doctor not available on this date , please select other date";
        }
        return this.availableTimes;
    };
    AppointmentModal.prototype.getDoctorDates = function () {
        var _this = this;
        var entries = {
            doctorMemberId: this.doctorMemberId
        };
        this.appoint.blockedDates(entries)
            .subscribe(function (result) {
            console.log(result.listOfBlockedDates);
            for (var _i = 0, _a = result.listOfBlockedDates; _i < _a.length; _i++) {
                var data = _a[_i];
                //booke.push(new Date(data).toLocaleDateString());
                _this.blocks.push(new Date(data));
            }
            console.log(_this.blocks);
        });
    };
    AppointmentModal.prototype.bookAppoint = function () {
        var _this = this;
        if (this.bookedDate && this.consultingReason) {
            var entries = {};
            entries = {
                memberId: this.patientData.memberId,
                patientFirstName: this.patientData.firstName,
                patientLastName: this.patientData.lastName,
                contactNum: this.patientData.phone,
                carrierName: this.patientCarrier,
                appointDate: this.bookedDate.toISOString(),
                reason: this.consultingReason,
                doctorMemberId: this.doctorMemberId
            };
            if (this.bookedDate.getTime() >= (Date.now() + 8.64e+7)) {
                console.log(entries);
                var temp;
                for (var _i = 0, _a = this.blocks; _i < _a.length; _i++) {
                    var data = _a[_i];
                    var selectedDate = this.bookedDate.setHours(0, 0, 0, 0);
                    //var bookedDate = data.setHours(0, 0, 0, 0);
                    if (selectedDate.valueOf() === data.setHours(0, 0, 0, 0).valueOf()) {
                        temp = true;
                        break;
                    }
                    else {
                        temp = false;
                    }
                }
                if (!temp) {
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
                    window.alert("We are sorry appointment has already booked!!" +
                        "Please try again for another date and time! Thank you for your patience!");
                }
            }
            else {
                window.alert("Appointment Not booked!! For Booking an apppintment you need to have atleast 24 " +
                    "hours of time ,inconvenience regarded!! ");
            }
        }
        else {
            window.alert("You have missed some fields please check and enter properly");
        }
    };
    AppointmentModal.prototype.getDate = function (dt) {
        this.bookedDate = dt;
        console.log(dt && dt.getTime());
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