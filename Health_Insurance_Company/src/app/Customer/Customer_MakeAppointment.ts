
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerAuthGuard } from './Customer_AuthGuard';
import { AppointmentService } from '../RESTFul_API_Service/Appointment.service';
import { DoctorHomeService } from '../RESTFul_API_Service/Doctor.Home.service';





"use strict";

@Component({
  selector: 'Appointment-Modal',
  templateUrl: './Customer_MakeAppointment_Modal.html',
  styleUrls: ['./Customer_MakeAppointment_Modal.css'],

})


export class AppointmentModal {
  docSlot: any;

  date: Date;
  //booke : string[] = ['25 11 2017' , '02 12 2017'];
  booke: string[] = [];
  blocks: Date[] = [];
  datepickerOpts = {     /* startDate: new Date(2016, 5, 10), */
    autoclose: true, todayBtn: 'linked',
    todayHighlight: true, assumeNearbyYear: true,
    format: 'd MM yyyy', icon: 'fa fa-calendar',
    datesDisabled: this.booke, clearBtn: false,
    startDate: new Date(), showOnFocus: true,
    endDate: new Date(2018, 2)
  };

  //If we remove type casting <any> it will throw error
  timepickerOpts: any[] = <any>{
    icon: 'fa fa-clock-o',
    showMeridian: false,
    minuteStep: 1,
    defaultTime: 'current'
  };
  /* @Input('docProfileEvent') profileList = <any>[] ; */
  /* @Output() docProfileEvent = <any>[];
  name:any; */

  doctorMemberId: any;
  doctorName: any;
  patientCarrier: any;
  patientData = <any>{};
  consultingReason: any = '';
  valuesEntered: boolean = false;
  map = <any>{};
  myDate: Date;
  availableTimes: any[] = [];
  bookedDate: Date;
  errorMessage: any = '';
  allDocSlots: any[];
  todayAvailableTimeSlots : any[]= [];


  constructor(private route: Router, private appoint: AppointmentService, private doctorHomeService: DoctorHomeService) {

    this.appoint.getDoctorAndPaitentMemberId()
      .subscribe(
      (result: any) => {
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


    this.getDoctorBlockedDates();
    this.getDocTimeSlots();
  }

  getDocTimeSlots(): any {
    var docInfo: any = {
      doctorMemberId: this.doctorMemberId,
      doctorSchedule: []
    }

    this.doctorHomeService.getDocTimeSlots(docInfo)
      .subscribe(response => {
        this.allDocSlots = response.doctorSchedule;
        console.log(this.allDocSlots);
      },
      error => {
        this.allDocSlots = [];
        this.errorMessage = <any>error;

      });
  }

  checkDuplicate(currentElement: Date): boolean {

    if (currentElement.valueOf() !== this.docSlot.valueOf()) {
      return true;
    } else {
      return false;
    } 
  }

    getAvailableDates(dates: Date): any {
      
      this.availableTimes = [];
      this.todayAvailableTimeSlots =[];
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

        this.availableTimes = this.allDocSlots.filter(arrElement =>
          (new Date(arrElement).getDate() == dates.getDate() && new Date(arrElement).getMonth() == dates.getMonth()))
        ;

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
          let obj = {docSlot: new Date(element)};
          let duplicate = that.getDoctorBlockedDates().every(that.checkDuplicate, obj);
          if(duplicate) {
            that.todayAvailableTimeSlots.push(element);
          }
        });
        
        this.todayAvailableTimeSlots = that.todayAvailableTimeSlots;
        console.log("today available is ", this.todayAvailableTimeSlots.length);

        if(this.todayAvailableTimeSlots.length == 0) {
          this.errorMessage = "All slots of this date are booked, please select other date";
        }
     //   this.todayAvailableTimeSlots = todayAvailableTimeSlots;
        /*  console.log("Date from db",new Date(arrElement).setSeconds(0).valueOf());
         console.log("Selected date from calendar",dates.setSeconds(0).valueOf()); */

      }
      //console.log("length of timimgd in day",this.availableTimes);

      if (!(this.availableTimes && this.availableTimes.length)) {
        this.errorMessage = "Doctor not available on this date , please select other date";
      }
      return this.availableTimes;
    }




    getDoctorBlockedDates(): any {
      var entries = {
        doctorMemberId: this.doctorMemberId
      }

      this.appoint.blockedDates(entries)
        .subscribe(

        (result: any) => {
          console.log("Blocked dates for this doctor", result.listOfBlockedDates);
          for (let data of result.listOfBlockedDates) {

            //booke.push(new Date(data).toLocaleDateString());
            this.blocks.push(new Date(data));
          }

          console.log("Blocked dates added in array", this.blocks);

        });

      return this.blocks;
    }




    bookAppoint() {
      console.log("selected date", this.bookedDate);
      if (this.bookedDate && this.consultingReason) {
        var entries = <any>{}
        entries = {
          memberId: this.patientData.memberId,
          patientFirstName: this.patientData.firstName,
          patientLastName: this.patientData.lastName,
          contactNum: this.patientData.phone,
          carrierName: this.patientCarrier,
          appointDate: this.bookedDate.toISOString(), // Converting date to java script string noatation and result will be  "2017-11-27T11:30:18.992Z"
          reason: this.consultingReason,
          doctorMemberId: this.doctorMemberId
        }

        if (this.bookedDate.getTime() >= (Date.now() + 8.64e+7)) {
          //console.log(entries);
          //console.log("selected date and hours - I" , this.bookedDate.getHours());
          var temp;
          for (let data of this.blocks) {

            console.log("Blocked date in the loop", data);
            var selectedDate = this.bookedDate;
            //var bookedDate = data.setHours(0, 0, 0, 0);

            if (selectedDate.valueOf() === data.valueOf()) {
              temp = true;
              break;
            } else { temp = false; }


          }

          if (!temp) {
            //console.log("selected date and hours - II" , this.bookedDate.getHours());
            if (this.bookedDate.getHours() > 7 && this.bookedDate.getHours() < 20) {
              console.log("I'm booking the date ", entries.appointDate);
              this.appoint.bookAppointmentForDoctor(entries)
                .subscribe(
                (result: any) => {
                  this.blocks = null;
                  window.alert(result);
                  (result) ? this.route.navigate(['home/' + this.patientData.memberId]) : null;
                },
                (err: any) => {
                  window.alert(err);
                  if (err) {
                    this.consultingReason.clear();
                    this.route.navigate(['home/' + this.patientData.memberId]);
                  }
                });
            } else {
              window.alert(" Appointment not booked , You need to check doctors availability timings " +
                "Then select the timing for the day");
            }
          } else {

            window.alert("We are sorry appointment has already booked!!" +
              "Please try again for another date and time! Thank you for your patience!");
          }
        } else {
          window.alert("Appointment Not booked!! For Booking an apppintment you need to have atleast 24 " +
            "hours of time ,inconvenience regarded!! ");
        }
      } else {
        window.alert("You have missed some fields please check and enter properly")
      }

    }






    getDate(dt: Date): number {
      this.bookedDate = new Date(dt);
      console.log(dt);
      console.log(this.bookedDate);
      /* console.log(dt && dt.getTime()); */
      return this.bookedDate && this.bookedDate.getTime();
    }




  }



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