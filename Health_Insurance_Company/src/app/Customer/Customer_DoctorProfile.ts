import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RatingModule } from 'ng2-rating';
import { CustomerAuthGuard } from './Customer_AuthGuard';
import { AppointmentService } from '../RESTFul_API_Service/Appointment.service';
import { DoctorHomeService } from '../RESTFul_API_Service/Doctor.Home.service';




"use strict";

@Component({
    selector: 'doctor-profile',
    templateUrl: './Customer_DoctorProfile.html',
    styleUrls : ['./Customer_DoctorProfile.css'],
    
})

export class  DoctorProfileView extends CustomerAuthGuard{

    doctorName : any;
    doctorMemberId : any;
    profileModalTitle : string[] = <any>[];
    doctorProfile = <any>[];
    patientReviews = <any>[];
    editDocProfileMessage: string;
    hasMessage: boolean = false;
    patientCarrier : any;
    

    constructor(private route: Router, private appoint: AppointmentService , private doctorHomeService: DoctorHomeService ) {
          super(route)
          
            this.appoint.getDoctorAndPaitentMemberId()
              .subscribe(
              (result: any) => {
                
                this.patientCarrier = result[2];
                /* this.patientData = result[3]; */
                this.doctorMemberId = result[0];
                this.doctorName = result[1];
               
              })
            console.log(this.doctorName);
              window.scrollTo(0,50);
              this.DoctorProfileClicked();
              this.ShowReviewsClicked();
            }

            

            DoctorProfileClicked() {
                var entries: any = {
                  doctorMemberId: this.doctorMemberId,
                };
                this.profileModalTitle[0] = "Qualifications and Experience";
                
                this.doctorHomeService.getDoctorProfile(entries)
                  .subscribe(doctorProfile => {
                    this.doctorProfile = doctorProfile;
                    /* console.log(this.doctorProfile.length) */
                  },
                  error => {
                    /* console.log("Get Doc Profile", this.doctorProfile); 
                    console.log(this.doctorProfile.length) */       
                    this.editDocProfileMessage = <any>error;
                    this.hasMessage = true;
                  });
              }

              ShowReviewsClicked() {
                var entries: any = {
                  doctorMemberId: this.doctorMemberId,
                };
                this.profileModalTitle[1] = "Past Patient Reviews";
                this.doctorHomeService.getPatientReviews(entries)
                  .subscribe(reviews => {
                    this.patientReviews = reviews;
                  },
                  error => {        
                    this.editDocProfileMessage = <any>error;
                    this.hasMessage = true;
                  });
                  console.log(this.patientReviews);
              };

              bookAppointmentPage() : any{
                this.appoint.setDoctorAndPaitentDetails(this.doctorMemberId,this.doctorName,this.patientCarrier,this.customerData);
                this.route.navigate(['home/'+this.customerData.memberId+'/appointment/docAppoint'],{ queryParams: { doc_id: this.doctorMemberId} } );
              }

              backToAppointments(){
                this.route.navigate(['home/'+this.customerData.memberId+'/appointment']);
              }
}