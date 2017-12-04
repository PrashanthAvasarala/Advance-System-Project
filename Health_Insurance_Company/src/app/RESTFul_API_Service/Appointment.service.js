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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var Rx_1 = require("rxjs/Rx");
"use strict";
var AppointmentService = (function () {
    function AppointmentService(http) {
        this.http = http;
        /* Intializing these values with type casting as we don't know the types in first shot  */
        this.doctorId = null;
        this.doctorName = null;
        this.carrier = null;
        this.patientData = {};
        this.appointTable = []; // [doctorId , patientData]
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
    }
    /* All Https in Angular 2 protocols are asynchronous operations, Requesting server and
   * getting thne response from server and handling the response
    /* to get the reason/speacilty/doctor_name */
    AppointmentService.prototype.getDoctorsList = function (userData) {
        return this.http.post("http://localhost:8080/ASP/HealthDB/customer/doctorsList", userData) /* Specifying Headers is optional */
            .map(function (response) {
            return response.json().doctorsAvailablityList;
        })
            .catch(function (error) {
            if (error.status > 400) {
                /*   return Observable.throw(new Error(error._body));   either of the ways works */
                /* console.log(JSON.parse(error._body).DoctorsAvailablityList);
                _body.doctorsAvailablityList :  Array(1)  errMsg  : "Sorry No matches found for your selection! First Health Insurance regrets for not having doctors in your locations" */
                var obj = JSON.parse(error._body);
                /* console.log(Object.keys(obj));
                console.log(JSON.parse(error._body));
                console.log(obj);
                console.log(obj.doctorsAvailablityList);
                Object.keys(obj).forEach((key) => {console.log(key)}); */
                return (error.status === 404) ? Rx_1.Observable.throw(obj.doctorsAvailablityList["0"].errMsg) : null;
            }
        });
    };
    AppointmentService.prototype.setDoctorAndPaitentDetails = function (docId, docName, patientCarrier, data1) {
        this.doctorId = docId;
        this.appointTable.push(this.doctorId);
        this.doctorName = docName;
        this.appointTable.push(this.doctorName);
        this.carrier = patientCarrier;
        this.appointTable.push(this.carrier);
        this.patientData = data1;
        this.appointTable.push(this.patientData);
    };
    /* We should return as an "observable" rather "any[]"
       If we are not emptying the this.appointTable = []; in the method
       Array size gets increases and every time we get the first two values only.
       reference "https://stackoverflow.com/questions/45698036/angular-4-subscribe-is-not-a-function-error"
       for using observable
    */
    AppointmentService.prototype.getDoctorAndPaitentMemberId = function () {
        var data = this.appointTable;
        this.appointTable = [];
        return Rx_1.Observable.of(data);
    };
    AppointmentService.prototype.bookAppointmentForDoctor = function (userData2) {
        //console.log("hi" + userData2 )
        return this.http.post("http://localhost:8080/ASP/HealthDB/customer/bookAppoint", userData2)
            .map(function (response) {
            //console.log("Inserted Successfully" ,response )
            return response._body;
        })
            .catch(function (error) {
            //console.log(error);
            //console.log(error._body)            
            return (error.status === 404) ? Rx_1.Observable.throw(error._body) : null;
        });
    };
    AppointmentService.prototype.writeReviewForDoctor = function (userData) {
        return this.http.put("http://localhost:8080/ASP/HealthDB/customer/addReview", userData)
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) {
            //console.log(error);
            //console.log(error._body)            
            return (error.status === 404) ? Rx_1.Observable.throw(error._body) : null;
        });
    };
    AppointmentService.prototype.listOfAppointments = function (data) {
        return this.http.post("http://localhost:8080/ASP/HealthDB/customer/patientAppointmentList", data)
            .map(function (response) {
            return response.json();
        });
    };
    /* Delete Method doesn't work in Angular we need to fool around it with request method
     "https://stackoverflow.com/a/40929709/8228918"
      "https://hassantariqblog.wordpress.com/2016/12/03/angular2-http-delete-using-observable-in-angular-2-application/"*/
    AppointmentService.prototype.deleteAppointment = function (data) {
        //console.log("Hello I'm in receving  class",data);
        this.options = new http_1.RequestOptions({
            body: data,
            method: http_1.RequestMethod.Delete
        });
        return this.http.request("http://localhost:8080/ASP/HealthDB/customer/delete-appointment", this.options)
            .map(function (response) {
            return response.json();
        });
    };
    return AppointmentService;
}());
AppointmentService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AppointmentService);
exports.AppointmentService = AppointmentService;
//# sourceMappingURL=Appointment.service.js.map