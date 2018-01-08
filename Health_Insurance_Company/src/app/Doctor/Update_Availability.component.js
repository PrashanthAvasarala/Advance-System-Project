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
var UpdateDocAvailability = (function (_super) {
    __extends(UpdateDocAvailability, _super);
    function UpdateDocAvailability(doctorHomeService, rout) {
        var _this = _super.call(this, rout) || this;
        _this.doctorHomeService = doctorHomeService;
        _this.rout = rout;
        _this.getDocTimeSlots();
        return _this;
    }
    UpdateDocAvailability.prototype.delete = function (slot) {
        var _this = this;
        if (confirm("Are you sure you want to delete the selected availability ?")) {
            var entries = {
                doctorMemberId: this.customerData.memberId,
                doctorSchedule: []
            };
            entries.doctorSchedule.push(slot);
            this.doctorHomeService.deleteDocTimeSlot(entries)
                .subscribe(function (response) {
                _this.allDocSlots = _this.getDocTimeSlots();
                window.alert("selected availability has been deleted, patients scheduled for this appointment have been notified by email");
            }, function (error) {
                _this.errorMessage = error;
            });
        }
    };
    UpdateDocAvailability.prototype.getDocTimeSlots = function () {
        var _this = this;
        var docInfo = {
            doctorMemberId: this.customerData.memberId,
            doctorSchedule: []
        };
        this.doctorHomeService.getDocTimeSlots(docInfo)
            .subscribe(function (response) {
            _this.allDocSlots = response.doctorSchedule;
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    return UpdateDocAvailability;
}(Customer_AuthGuard_1.CustomerAuthGuard));
UpdateDocAvailability = __decorate([
    core_1.Component({
        selector: 'Update-Availability',
        templateUrl: './Update_Availability.html',
        styleUrls: ['./Update_Availability.css']
    }),
    __metadata("design:paramtypes", [Doctor_Home_service_1.DoctorHomeService, router_1.Router])
], UpdateDocAvailability);
exports.UpdateDocAvailability = UpdateDocAvailability;
//# sourceMappingURL=Update_Availability.component.js.map