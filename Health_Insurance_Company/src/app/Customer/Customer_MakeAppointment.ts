
import { Component, Input, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerAuthGuard } from './Customer_AuthGuard';
import { AppointmentService } from '../RESTFul_API_Service/Appointment.service';





"use strict";

@Component({
  selector: 'Appointment-Modal',
  templateUrl: './Customer_MakeAppointment_Modal.html',
  styleUrls : ['./Customer_MakeAppointment_Modal.css'],

})


export class AppointmentModal  {

  date: Date;  
  booke : string[] = ['25 11 2017' , '02 12 2017'];
  datepickerOpts: any = {     /* startDate: new Date(2016, 5, 10), */
                              autoclose: true, todayBtn: 'linked',
                              todayHighlight: true, assumeNearbyYear: true,
                              format: 'd MM yyyy', icon: 'fa fa-calendar',
                              datesDisabled : this.booke, clearBtn : true,
                              startDate : new Date() , showOnFocus: true,
                              endDate : new Date(2018,2)
                        };

  //If we remove type casting <any> it will throw error
  timepickerOpts: any[] = <any>{
    icon: 'fa fa-clock-o',
    showMeridian: false,
    minuteStep: 1,
    defaultTime : 'current'
  }
  /* @Input('docProfileEvent') profileList = <any>[] ; */
  /* @Output() docProfileEvent = <any>[];
  name:any; */
  
  doctorMemberId: any;
  doctorName:any;
  patientCarrier:any;
  patientData = <any>{};
  consultingReason :any = '';
  valuesEntered:boolean;
  


    constructor(private route : Router ,private appoint : AppointmentService) { 

      this.appoint.getDoctorAndPaitentMemberId()
          .subscribe(
              (result : any) =>{
              /* console.log(result);  
              console.log(result[0]);             
              console.log(result[1]);  
              console.log(result[2]); 
              console.log(result[3]); */
              this.doctorMemberId = result[0];
              this.doctorName = result[1];
              this.patientCarrier = result[2];
              this.patientData = result[3];
            })
           
          

     }
        
     
     
     bookAppoint(){
      
      if(this.date && this.consultingReason){
        var entries = <any> {}
            entries = {
            memberId : this.patientData.memberId,
            patientFirstName : this.patientData.firstName,
            patientLastName :  this.patientData.lastName,
            contactNum : this.patientData.phone,
            carrierName : this.patientCarrier,
            appointDate : this.date.toISOString(), // Converting date to java script string noatation and result will be  "2017-11-27T11:30:18.992Z"
            reason : this.consultingReason,
            doctorMemberId: this.doctorMemberId
          }

          if(this.date.getTime() >= Date.now()){
          console.log(entries);
          this.appoint.bookAppointmentForDoctor(entries)
          .subscribe(
            (result: any) => {
              window.alert(result);
               (result)? this.route.navigate(['home/'+this.patientData.memberId]) : null;
                         
            },
            (err: any) => {
              window.alert(err);
              if(err){
                this.consultingReason.clear();
                this.route.navigate(['home/'+this.patientData.memberId]);
              }
              
            }
          );
        }
        else{
          window.alert ("You cannot book the Appointment for the past day");
        }
      }

      else{
        window.alert("You have missed some fields please check and enter properly")
      }
     
    }
     
    


    

    getDate(dt: Date): number {
      return dt && dt.getTime();      
     }




}



