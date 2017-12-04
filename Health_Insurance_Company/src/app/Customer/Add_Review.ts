import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RatingModule } from 'ng2-rating';
import { CustomerAuthGuard } from './Customer_AuthGuard';
import { AppointmentService } from '../RESTFul_API_Service/Appointment.service';




"use strict";

@Component({
    selector: 'add-review',
    templateUrl: './Add_Review.html',
    styleUrls: ['./Add_Review.css'],    
})

export class ReviewModal{

    starsCount:any[] = [1,1,1];
    doctorMemberId:any;
    doctorName:any;
    patientData = <any>[];
    date :Date;
    reviewText:any;
    overAllRating : any = 0;
    datepickerOpts: any = {    
        autoclose: true, todayBtn: 'linked',
        todayHighlight: true, assumeNearbyYear: true,
        format: 'd MM yyyy', icon: 'fa fa-calendar',
        clearBtn : true, startDate : new Date(2017,1) , 
        showOnFocus: true, endDate : new Date()
      };

    timepickerOpts: any = {
       icon: 'fa fa-clock-o',
       showMeridian: false,
       minuteStep: 1,
       defaultTime : 'current'
       }     
    


    
    constructor(private route : Router ,private appoint : AppointmentService) { 
        
              this.appoint.getDoctorAndPaitentMemberId()
                  .subscribe(
                      (result : any) =>{
                      this.doctorMemberId = result[0];
                      this.doctorName = result[1];
                      this.patientData = result[3];
                    })
                   
                  
             }    

             getDate(dt: Date): number {
                return dt && dt.getTime();      
               }
       
               addReview(){

                for(let count in this.starsCount )
                {
                     this.overAllRating += this.starsCount[count];
                     //console.log("I'm adding",this.overAllRating);
                }
                //console.log("I'm result",this.overAllRating/=3)
                this.overAllRating/=3;

                   if(this.date && this.reviewText){
                         if(this.date.getTime() <= Date.now()){

                                var entries : any = {
                                    memberId : this.patientData.memberId,
                                    doctorMemberId : this.doctorMemberId,
                                    review : this.reviewText,
                                    date : this.date.toISOString(),
                                    rating : this.overAllRating
                                }
                      
                                 //console.log(entries)
                                this.appoint.writeReviewForDoctor(entries)
                                .subscribe(
                                    (result:any)=>{
                                        //console.log("I'm in Add_review class ",result);
                                        window.alert(result.errMessage);
                                        this.date = null;
                                        this.reviewText = null;                                                                   
                                    });


                              }else{
                              window.alert("You cannot give review before itself without consulting doctor");
                              }
                     }else{
                         window.alert("You have missed some fields please check and enter properly")
                     }
        }

}