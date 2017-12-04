"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
/* External Libraries */
var ng2_rating_1 = require("ng2-rating");
var ng2_datetime_1 = require("ng2-datetime/ng2-datetime");
/* Compenents declaration */
var app_component_1 = require("./app.component");
var PageNotFound_component_1 = require("./PageNotFound/PageNotFound.component");
var Header_component_1 = require("./DefaultHome/Header.component");
var Footer_component_1 = require("./DefaultHome/Footer.component");
var Home_component_1 = require("./Home/Home.component");
var Login_component_1 = require("./Login/Login.component");
var PopUp_component_1 = require("./Login/PopUp.component");
var Customer_SignUp_component_1 = require("./Login/Customer.SignUp.component");
var Doctor_SignUp_component_1 = require("./Login/Doctor.SignUp.component");
var contactus_component_1 = require("./Home/ContactUs/contactus.component");
/* Customer-View*/
var Customer_Header_component_1 = require("./Customer/Customer_Header.component");
var Customer_Footer_1 = require("./Customer/Customer_Footer");
var Customer_Default_View_1 = require("./Customer/Customer_Default_View");
var Customer_Home_View_1 = require("./Customer/Customer_Home_View");
var Customer_appointment_1 = require("./Customer/Customer_appointment");
var Doctor_NearBy_1 = require("./Customer/Doctor_NearBy");
var Customer_MakeAppointment_1 = require("./Customer/Customer_MakeAppointment");
var Add_Review_1 = require("./Customer/Add_Review");
var Delete_Appointment_1 = require("./Customer/Delete_Appointment");
/* Doctor-View*/
var Doctor_Header_component_1 = require("./Doctor/Doctor_Header.component");
var Doctor_Footer_component_1 = require("./Doctor/Doctor_Footer.component");
var Doctor_Defualt_View_1 = require("./Doctor/Doctor_Defualt_View");
var Doctor_Home_View_component_1 = require("./Doctor/Doctor_Home_View.component");
/* Dependency Injection : Providers */
var Authentication_Service_1 = require("./RESTFul_API_Service/Authentication.Service");
var Customer_AuthGuard_1 = require("./Customer/Customer_AuthGuard");
var Customer_Home_service_1 = require("./RESTFul_API_Service/Customer.Home.service");
var Email_Notifications_Service_1 = require("./RESTFul_API_Service/Email.Notifications.Service");
var Appointment_service_1 = require("./RESTFul_API_Service/Appointment.service");
var Doctor_Home_service_1 = require("./RESTFul_API_Service/Doctor.Home.service");
"Use strict";
var appRoutes = [
    {
        path: '', component: app_component_1.AppComponent,
        children: [
            { path: '', component: Home_component_1.HomePageComponent },
            { path: 'login', component: Login_component_1.LoginComponent },
            { path: 'contactUs', component: contactus_component_1.ContactusComponent },
        ]
    },
    /* Customer-View*/
    {
        path: '', canActivate: [Customer_AuthGuard_1.CustomerAuthGuard], component: Customer_Default_View_1.CustomerDefaultView,
        children: [
            // From Login.component.ts it will come to  router.navigate(['home'])--> CustomerHomeView --> CustomerAuthGuard = true
            { path: 'home/:', component: Customer_Home_View_1.CustomerHomeView },
            { path: 'home/:id/appointment', component: Customer_appointment_1.Appointment },
            { path: 'home/:id/delete-appointment', component: Delete_Appointment_1.DeleteAppoint },
            { path: 'home/:id/appointment/docAppoint', component: Customer_MakeAppointment_1.AppointmentModal },
            { path: 'home/:id/appointment/docAppoint/:docId/addReview', component: Add_Review_1.ReviewModal },
        ]
    },
    /* Doctor-View*/
    {
        path: '', canActivate: [Customer_AuthGuard_1.CustomerAuthGuard], component: Doctor_Defualt_View_1.DoctorDefaultView,
        children: [
            // From Login.component.ts it will come to  router.navigate(['home'])--> CustomerHomeView --> CustomerAuthGuard = true
            { path: 'doctorHome/:', component: Doctor_Home_View_component_1.DoctorHomeView }
        ]
    },
    { path: '**', component: PageNotFound_component_1.PageNotFoundComponent },
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule,
            router_1.RouterModule.forRoot(appRoutes),
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            http_1.HttpModule,
            /* External Libraries */
            ng2_rating_1.RatingModule,
            ng2_datetime_1.NKDatetimeModule,],
        declarations: [app_component_1.AppComponent,
            PageNotFound_component_1.PageNotFoundComponent,
            Header_component_1.HeaderComponent,
            Footer_component_1.FooterComponent,
            Home_component_1.HomePageComponent,
            Login_component_1.LoginComponent,
            PopUp_component_1.PopUpBoxComponent,
            Customer_SignUp_component_1.CustomerSignUpComponent,
            Doctor_SignUp_component_1.DoctorSignUpComponent,
            contactus_component_1.ContactusComponent,
            /*Customer-View*/
            Customer_Header_component_1.CustomerHeader,
            Customer_Footer_1.CustomerFooter,
            Customer_Default_View_1.CustomerDefaultView,
            Customer_Home_View_1.CustomerHomeView,
            Customer_appointment_1.Appointment,
            Doctor_NearBy_1.DoctorNearBy,
            Customer_MakeAppointment_1.AppointmentModal,
            Add_Review_1.ReviewModal,
            Delete_Appointment_1.DeleteAppoint,
            /*Doctor-View*/
            Doctor_Header_component_1.DoctorHeader,
            Doctor_Footer_component_1.DoctorFooter,
            Doctor_Defualt_View_1.DoctorDefaultView,
            Doctor_Home_View_component_1.DoctorHomeView],
        providers: [Customer_AuthGuard_1.CustomerAuthGuard,
            Authentication_Service_1.AuthenticationService,
            Customer_Home_service_1.CustomerService,
            Email_Notifications_Service_1.EmailNotification,
            Appointment_service_1.AppointmentService,
            Doctor_Home_service_1.DoctorHomeService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map