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
var Observable_1 = require("rxjs/Observable");
"use strict";
var DoctorHomeService = (function () {
    function DoctorHomeService(http) {
        this.http = http;
        this._pastAppointmentsUrl = 'http://localhost:8080/ASP/HealthDB/doctor/pastAppointments';
        this._todayAppointmentsUrl = 'http://localhost:8080/ASP/HealthDB/doctor/todayAppointments';
        this._patientReviewsUrl = 'http://localhost:8080/ASP/HealthDB/doctor/reviews';
        this._patientLabReportsUrl = 'http://localhost:8080/ASP/HealthDB/doctor/labReports';
        this._getDoctorProfileUrl = 'http://localhost:8080/ASP/HealthDB/doctor/doctorProfile';
        this._updateDocProfileUrl = 'http://localhost:8080/ASP/HealthDB/doctor/updateProfile';
        this._addDocTimeSlots = 'http://localhost:8080/ASP/HealthDB/doctor/addTimeSlots';
        this._getDocTimeSlots = 'http://localhost:8080/ASP/HealthDB/doctor/getTimeSlots';
        this._deleteDocTimeSlot = 'http://localhost:8080/ASP/HealthDB/doctor/deleteTimeSlot';
        this._updatePassword = 'http://localhost:8080/ASP/HealthDB/doctor/updatePassword';
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
    }
    /* All Https in Angular 2 protocols are asynchronous operations, Requesting server and
   * getting thne response from server and handling the response
    /* to get the reason/speacilty/doctor_name */
    DoctorHomeService.prototype.getAppointmentsForToday = function (entries) {
        return this.http.post(this._todayAppointmentsUrl, entries) /* Specifying Headers is optional */
            .map(function (response) {
            return response.json().appointmentsList;
        })
            .catch(this.handleError);
    };
    DoctorHomeService.prototype.getPastAppointments = function (entries) {
        return this.http.post(this._pastAppointmentsUrl, entries) /* Specifying Headers is optional */
            .map(function (response) {
            return response.json().appointmentsList;
        })
            .catch(this.handleError);
    };
    DoctorHomeService.prototype.getPatientReviews = function (entries) {
        return this.http.post(this._patientReviewsUrl, entries) /* Specifying Headers is optional */
            .map(function (response) {
            console.log("response is ", response.json());
            return response.json().patientReviewsList;
        })
            .catch(this.handleError);
    };
    DoctorHomeService.prototype.getPatientLabReports = function (entries) {
        return this.http.post(this._patientLabReportsUrl, entries) /* Specifying Headers is optional */
            .map(function (response) {
            console.log("patientlab reports", response.json());
            return response.json().patientLabReports;
        })
            .catch(this.labReportsError);
    };
    DoctorHomeService.prototype.getDoctorProfile = function (entries) {
        return this.http.post(this._getDoctorProfileUrl, entries)
            .map(function (response) {
            console.log("response is ", response.json());
            return response.json();
        })
            .catch(this.doctorProfileError);
    };
    DoctorHomeService.prototype.updateDoctorProfile = function (data) {
        return this.http.put(this._updateDocProfileUrl, data)
            .map(function (response) {
            console.log("updated response is ", response.json());
            return response.json();
        })
            .catch(this.updateDoctorProfileError);
    };
    DoctorHomeService.prototype.addDocTimeSlots = function (entries) {
        console.log("Total schedule before post call", entries.doctorSchedule.length);
        return this.http.post(this._addDocTimeSlots, entries)
            .map(function (response) {
            return response.json();
        })
            .catch(this.addDocTimeSlotsError);
    };
    DoctorHomeService.prototype.getDocTimeSlots = function (entries) {
        return this.http.post(this._getDocTimeSlots, entries)
            .map(function (response) {
            return response.json();
        })
            .catch(this.addDocTimeSlotsError);
    };
    DoctorHomeService.prototype.deleteDocTimeSlot = function (entries) {
        console.log("Slot", entries.doctorSchedule);
        this.options = new http_1.RequestOptions({
            body: entries,
            method: http_1.RequestMethod.Delete
        });
        return this.http.request(this._deleteDocTimeSlot, this.options)
            .map(function (response) {
            return response.json();
        })
            .catch(this.deleteDocTimeSlotsError);
    };
    DoctorHomeService.prototype.updatePassword = function (entries) {
        return this.http.put(this._updatePassword, entries)
            .map(function (response) {
            return response.json();
        })
            .catch(this.credentialsUpdateError);
    };
    DoctorHomeService.prototype.handleError = function (err) {
        console.log('this is error', err);
        return Observable_1.Observable.throw(JSON.parse(err._body).appointmentsList[0].errMessage);
    };
    DoctorHomeService.prototype.addDocTimeSlotsError = function (err) {
        console.log('this is error', err);
        return Observable_1.Observable.throw(JSON.parse(err._body).errMessage);
    };
    DoctorHomeService.prototype.getDocTimeSlotsError = function (err) {
        console.log('this is error', err);
        return Observable_1.Observable.throw(JSON.parse(err._body).errMessage);
    };
    DoctorHomeService.prototype.deleteDocTimeSlotsError = function (err) {
        console.log('this is error', err);
        return Observable_1.Observable.throw(JSON.parse(err._body).errMessage);
    };
    DoctorHomeService.prototype.doctorProfileError = function (err) {
        console.log('this is error', err);
        return Observable_1.Observable.throw(JSON.parse(err._body).errMessage);
    };
    DoctorHomeService.prototype.labReportsError = function (err) {
        console.log('this is labreports error', JSON.parse(err._body).patientLabReports[0].errMessage);
        return Observable_1.Observable.throw(JSON.parse(err._body).patientLabReports[0].errMessage);
    };
    DoctorHomeService.prototype.updateDoctorProfileError = function (err) {
        console.log('this is update error', JSON.parse(err._body).errMessage);
        return Observable_1.Observable.throw(JSON.parse(err._body).errMessage);
    };
    DoctorHomeService.prototype.credentialsUpdateError = function (err) {
        console.log('this is update error', JSON.parse(err._body).errMessage);
        return Observable_1.Observable.throw(JSON.parse(err._body).errMessage);
    };
    return DoctorHomeService;
}());
DoctorHomeService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], DoctorHomeService);
exports.DoctorHomeService = DoctorHomeService;
//# sourceMappingURL=Doctor.Home.service.js.map