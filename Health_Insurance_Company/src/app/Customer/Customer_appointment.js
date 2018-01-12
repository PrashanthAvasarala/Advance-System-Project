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
var forms_1 = require("@angular/forms");
var Customer_Home_service_1 = require("./../RESTFul_API_Service/Customer.Home.service");
var Appointment_service_1 = require("../RESTFul_API_Service/Appointment.service");
"use strict";
var Appointment = (function () {
    function Appointment(fb, CustmService, appointservice) {
        this.fb = fb;
        this.CustmService = CustmService;
        this.appointservice = appointservice;
        this.doctorsList = [];
        /* Reason to hard code the values but not fetching from database is Career names will be know to everyone */
        this.listOfcarriers = ["First Health Insurance",
            "First Choice Health - PPO",
            "Cigna - HMO",
            "UnitedHealthcare - UnitedHealthcare Compass Plus",
            "Independence Blue Cross - National BlueCard PPO",
            "EmblemHealth - 9/11 Program",
            "Clover Health - Prestige",
            "Companion Life - Worker's Comp",
            "WEA Trust - Fox River Network: Tier 1 Providers",
            "Caterpillar - Caterpillar Network Plan",
            "Corvel - Group Health",
            "irst Health Insurance"];
        this.zip = [];
        this.showForm();
        this.getListOfReasonsAndDoctors();
        this.allZipCodes();
    }
    Appointment.prototype.showForm = function () {
        this.searchForm = this.fb.group({
            reason: ['', forms_1.Validators.required],
            zipcode: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern('([1-9]{1}?\\d{4})+')])],
            carrier: ['', forms_1.Validators.required],
        });
    };
    Appointment.prototype.getListOfReasonsAndDoctors = function () {
        var _this = this;
        this.CustmService.getReasonList()
            .subscribe(function (result) {
            /* console.log(result.reasonSet); */
            _this.reasonList = result.reasonSet;
            /* console.log(this.reasonList); */
        });
    };
    Appointment.prototype.nearByDoctors = function () {
        var _this = this;
        var entries = {
            /* Same value but assigned to three difference keys is because we are searching database with either of
            disease,specialty,doctorName and zipcode to get member_Id from appointment_doctors_list table
            and then with  that member_Id we are seraching for data in doctor_availability_list */
            disease: this.searchForm.get('reason').value,
            specialty: this.searchForm.get('reason').value,
            doctorName: this.searchForm.get('reason').value,
            zipcode: this.searchForm.get('zipcode').value,
            patientCarrier: this.searchForm.get('carrier').value,
        };
        this.appointservice.getDoctorsList(entries)
            .subscribe(function (result) {
            console.log("I'm in Appointment class ", result);
            _this.doctorsList = [];
            _this.doctorsList = result;
            _this.errorMessage = null;
            window.scrollTo(0, 800);
        }, function (err) {
            _this.errorMessage = err;
            _this.doctorsList = null;
            _this.searchForm.reset(); // Error rises for member Id and password because they doesn't exist in database or while subscribing from Authentication service
            window.scrollTo(0, 500);
        });
    };
    Appointment.prototype.allZipCodes = function () {
        var _this = this;
        this.appointservice.getZipCodes()
            .subscribe(function (result) {
            console.log("I'm getting all zipcodes ", result);
            _this.zip = result.zipcodes;
        });
    };
    return Appointment;
}());
Appointment = __decorate([
    core_1.Component({
        selector: 'Customer-Appointment',
        templateUrl: './Customer_appointment.html',
        styleUrls: ['./Customer_appointment.css'],
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, Customer_Home_service_1.CustomerService, Appointment_service_1.AppointmentService])
], Appointment);
exports.Appointment = Appointment;
//# sourceMappingURL=Customer_appointment.js.map