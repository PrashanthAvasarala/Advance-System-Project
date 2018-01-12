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
var AppointmentModal = (function () {
    function AppointmentModal(route, appoint, doctorHomeService) {
        var _this = this;
        this.route = route;
        this.appoint = appoint;
        this.doctorHomeService = doctorHomeService;
        //booke : string[] = ['25 11 2017' , '02 12 2017'];
        this.booke = [];
        this.blocks = [];
        this.datepickerOpts = {
            autoclose: true, todayBtn: 'linked',
            todayHighlight: true, assumeNearbyYear: true,
            format: 'd MM yyyy', icon: 'fa fa-calendar',
            datesDisabled: this.booke, clearBtn: false,
            startDate: new Date(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2)), showOnFocus: true,
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
        this.todayAvailableTimeSlots = [];
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
        this.getDoctorBlockedDates();
        this.getDocTimeSlots();
    }
    AppointmentModal.prototype.getDocTimeSlots = function () {
        var _this = this;
        var docInfo = {
            doctorMemberId: this.doctorMemberId,
            doctorSchedule: []
        };
        this.doctorHomeService.getDocTimeSlots(docInfo)
            .subscribe(function (response) {
            _this.allDocSlots = response.doctorSchedule;
            console.log(_this.allDocSlots);
        }, function (error) {
            _this.allDocSlots = [];
            _this.errorMessage = error;
        });
    };
    AppointmentModal.prototype.checkDuplicate = function (currentElement) {
        if (currentElement.valueOf() !== this.docSlot.valueOf()) {
            return true;
        }
        else {
            return false;
        }
    };
    AppointmentModal.prototype.getAvailableDates = function (dates) {
        this.availableTimes = [];
        this.todayAvailableTimeSlots = [];
        this.errorMessage = '';
        /* console.log("date entered is ", dates);
        console.log("my date", this.myDate);
        console.log(dates.getMonth() + "   day " + dates.getDate()); */
        if (!dates) {
            this.errorMessage = "Please enter the date and then check Doctor's availability";
            return this.availableTimes;
        }
        if (this.allDocSlots && this.allDocSlots.length) {
            /* var obj = { currentDate: new Date(this.selectedDate.setSeconds(0)).toISOString() };
            let isExist = (this.docTimeSlots.length < 1) ? true : this.docTimeSlots.every(this.checkDuplicate, obj); */
            this.availableTimes = this.allDocSlots.filter(function (arrElement) {
                return (new Date(arrElement).getDate() == dates.getDate() && new Date(arrElement).getMonth() == dates.getMonth());
            });
            /*  let blocking = this.getDoctorBlockedDates();
             let callbackDuplicate = this.checkDuplicate;
             var todayAvailableTimeSlots = this.todayAvailableTimeSlots;
             this.availableTimes.filter(function (element) {
               let obj = {docSlot: new Date(element)};
               let duplicate = blocking.every(callbackDuplicate, obj);
               if(duplicate) {
                 todayAvailableTimeSlots.push(element);
               }
             }); */
            var that = this;
            this.availableTimes.filter(function (element) {
                var obj = { docSlot: new Date(element) };
                var duplicate = that.getDoctorBlockedDates().every(that.checkDuplicate, obj);
                if (duplicate) {
                    that.todayAvailableTimeSlots.push(element);
                }
            });
            this.todayAvailableTimeSlots = that.todayAvailableTimeSlots;
            console.log("today available is ", this.todayAvailableTimeSlots.length);
            if (this.todayAvailableTimeSlots.length == 0) {
                this.errorMessage = "All slots of this date are booked, please select other date";
            }
        }
        //console.log("length of timimgd in day",this.availableTimes);
        if (!(this.availableTimes && this.availableTimes.length)) {
            this.errorMessage = "Doctor not available on this date , please select other date";
        }
        return this.availableTimes;
    };
    AppointmentModal.prototype.getDoctorBlockedDates = function () {
        var _this = this;
        var entries = {
            doctorMemberId: this.doctorMemberId
        };
        this.appoint.blockedDates(entries)
            .subscribe(function (result) {
            console.log("Blocked dates for this doctor", result.listOfBlockedDates);
            for (var _i = 0, _a = result.listOfBlockedDates; _i < _a.length; _i++) {
                var data = _a[_i];
                //booke.push(new Date(data).toLocaleDateString());
                _this.blocks.push(new Date(data));
            }
            console.log("Blocked dates added in array", _this.blocks);
        });
        return this.blocks;
    };
    AppointmentModal.prototype.bookAppoint = function () {
        var _this = this;
        console.log("selected date", this.bookedDate);
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
                //console.log(entries);
                //console.log("selected date and hours - I" , this.bookedDate.getHours());
                var temp;
                for (var _i = 0, _a = this.blocks; _i < _a.length; _i++) {
                    var data = _a[_i];
                    console.log("Blocked date in the loop", data);
                    var selectedDate = this.bookedDate;
                    //var bookedDate = data.setHours(0, 0, 0, 0);
                    if (selectedDate.valueOf() === data.valueOf()) {
                        temp = true;
                        break;
                    }
                    else {
                        temp = false;
                    }
                }
                if (!temp) {
                    //console.log("selected date and hours - II" , this.bookedDate.getHours());
                    if (this.bookedDate.getHours() > 7 && this.bookedDate.getHours() < 20) {
                        console.log("I'm booking the date ", entries.appointDate);
                        this.appoint.bookAppointmentForDoctor(entries)
                            .subscribe(function (result) {
                            _this.blocks = null;
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
                        window.alert(" Appointment not booked , You need to check doctors availability timings " +
                            "Then select the timing for the day");
                    }
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
        this.bookedDate = new Date(dt);
        console.log(dt);
        console.log(this.bookedDate);
        /* console.log(dt && dt.getTime()); */
        return this.bookedDate && this.bookedDate.getTime();
    };
    return AppointmentModal;
}());
AppointmentModal = __decorate([
    core_1.Component({
        selector: 'Appointment-Modal',
        templateUrl: './Customer_MakeAppointment_Modal.html',
        styleUrls: ['./Customer_MakeAppointment_Modal.css'],
    }),
    __metadata("design:paramtypes", [router_1.Router, Appointment_service_1.AppointmentService, Doctor_Home_service_1.DoctorHomeService])
], AppointmentModal);
exports.AppointmentModal = AppointmentModal;
/* this.map = new Map();
   this.myDate = new Date(2018, 0, 10);
   this.map.set(this.myDate, [new Date(2018, 0, 10, 9, 0), new Date(2018, 0, 10, 12, 0), new Date(2018, 0, 10, 15, 0)]);
   this.map.set(new Date(2018, 1, 8), [new Date(2018, 1, 8, 8, 0), new Date(2018, 1, 8, 12, 0), new Date(2018, 1, 8, 15, 0)]);
   this.map.set(new Date(2018, 1, 9), [new Date(2018, 1, 9, 10, 0), new Date(2018, 1, 9, 12, 0), new Date(2018, 1, 9, 13, 0)]);

   console.log("my date", this.myDate);
   console.log("check in the map", this.map.get(this.myDate));
   console.log("check in the map", this.map.get(this.myDate));
   console.log("keys length", this.map.keys());

   

   this.map.forEach((value: any, key: Date) => {
     console.log("date entered is ", dates.getDate() , "Month entered is ", dates.getMonth() , "Hour of the day" , dates.getHours());
        console.log("date from databse is ", key.getDate() , "Month from databse is ", key.getMonth() );
       this.errorMessage = '';
     if (key.getDate() == dates.getDate() && key.getMonth() == dates.getMonth()) {
       this.availableTimes = value;
       console.log(this.availableTimes);
       return this.availableTimes;
     }
     
   }); */ 
//# sourceMappingURL=Customer_MakeAppointment.js.map