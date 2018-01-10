import { Component, Input } from "@angular/core";
import { CustomerAuthGuard } from "../Customer/Customer_AuthGuard";
import { Router } from "@angular/router";
import { DoctorHomeService } from "../RESTFul_API_Service/Doctor.Home.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IDoctorCredentials } from "./Doctor_Credentials";
import { AppointmentService } from "../RESTFul_API_Service/Appointment.service";

@Component({
  selector: 'Doctor-Header',
  templateUrl: './Doctor_Header.html',
  styleUrls: ['./Doctor_Header.css']
})

export class DoctorHeader extends CustomerAuthGuard {
  updatedPasswordResp: IDoctorCredentials;

  /* Either Local storage or session storage application is throughing error while
     restarting the app --> "User Data doesn't exist on storage" */
  /* id:number = JSON.parse(sessionStorage.userData).memberId ; */ // Fetching the memberId for URL
  /* id:number = JSON.parse(localStorage.userData).memberId ; */

  id: number;
  modalTitle: string;
  profileModalTitle: string;
  patientAppointments = <any>[];
  patientReviews = <any>[];
  patientLabReports = <any>[];
  errorMessage: string;
  doctorProfile = <any>[];
  updateResponse = <any>[];
  passwordMatch: boolean;
  editDocProfileMessage: string;
  doctor = <any>[];
  hasMessage: boolean = false;
  passwordSuccessMsg: string;
  passwordErrorMsg: string;
  availableDate:Date;
  address : string;
  booke : any[];
  datepickerOpt = {     /* startDate: new Date(2016, 5, 10), */
    autoclose: true, todayBtn: 'linked',
    todayHighlight: true, assumeNearbyYear: true,
    format: 'd MM yyyy', icon: 'fa fa-calendar',
    datesDisabled: this.booke, clearBtn: false,
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2), showOnFocus: true,
    endDate: new Date(2018,2)    
  };
  rating :any;
  date : Date;
  @Input('temp') temp: boolean;
  /* Taking the sessionstorage into Customer values from Customer_AuthGuard_ts rather declaring another variable */
  constructor(private doctorHomeService: DoctorHomeService, private rout: Router, private fb: FormBuilder ,private appoint : AppointmentService ) {
    super(rout);
    this.id = this.customerData.memberId;
    this.temp = false;
  }

  
  showPastAppointmentsClicked(event: any) {
    var entries: any = {
      doctorMemberId: this.customerData.memberId
    };

    this.modalTitle = "Past Appointments";

    this.doctorHomeService.getPastAppointments(entries)
      .subscribe(appointments => {
        this.patientAppointments = appointments;
      },
      error => {
        this.errorMessage = <any>error;
      });
  };

  ShowReviewsClicked(event: any) {
    var entries: any = {
      doctorMemberId: this.customerData.memberId
    };
    this.modalTitle = "Patient Reviews";
    this.doctorHomeService.getPatientReviews(entries)
      .subscribe(reviews => {
        this.patientReviews = reviews;
      },
      error => {
        this.errorMessage = <any>error;
      });
  };

  ShowLabReportsClicked(event: any) {
    var entries: any = {
      doctorMemberId: this.customerData.memberId
    };
    this.modalTitle = "Lab Reports For PickUp";
    this.doctorHomeService.getPatientLabReports(entries)
      .subscribe(labReports => {
        this.patientLabReports = labReports;
      },
      error => {

        this.errorMessage = <any>error;
      });
  }

  ShowAppointmentsForTodayClicked(event: any) {
    var entries: any = {
      doctorMemberId: this.customerData.memberId
    };
    this.modalTitle = "More Appointments"
    
    this.doctorHomeService.getAppointmentsForToday(entries)
      .subscribe(appointments => {
        this.patientAppointments = appointments;
        console.log(this.patientAppointments);
      },
      error => {
        this.errorMessage = <any>error;
      });
  }

  DoctorProfileClicked(event: any) {
    var entries: any = {
      doctorMemberId: this.customerData.memberId
    };
    this.profileModalTitle = "Edit Profile"
    this.doctorHomeService.getDoctorProfile(entries)
      .subscribe(doctorProfile => {
        this.doctorProfile = doctorProfile;
      },
      error => {
        console.log("Get Doc Profile", this.doctorProfile);
        this.editDocProfileMessage = <any>error;
        this.hasMessage = true;
      });
      console.log("Im from DB date" , this.doctorProfile.availableDate)
      /* this.availableDate = new Date(this.doctorProfile.availableDate); */
      console.log("Im assigned to available  date" , this.availableDate)
      console.log("Im from DB date",new Date(this.doctorProfile.availableDate));
       
      /* this.date = new Date(new Date(this.doctorProfile.availableDate) && new Date(this.doctorProfile.availableDate).getTime());
      var userTimezoneOffset = new Date(this.doctorProfile.availableDate).getTimezoneOffset() * 60000;
      console.log(this.date);
      if(this.doctorProfile.availableDate){
                window.alert("Last Available date you have updated is: "+new Date(this.doctorProfile.availableDate));
      } */
  }

  updatePasswordClicked() {
    this.doctor = {
      password: '',
      confirmPassword: ''
    };
    this.passwordMatch = true;
  }

  passwordCheck(doctor: any): boolean {
    if (doctor.password === doctor.confirmPassword) {
      return true;
    }
    return false;
  }

  updatePassword(event: any) {
    this.passwordMatch = this.passwordCheck(this.doctor);

    if (this.passwordMatch) {
      console.log("Password is ", this.doctor.password);
      console.log("Password is ", this.doctor.confirmPassword);
      var entries = {
        doctorMemberId: this.customerData.memberId,
        password: this.doctor.password
      }
      this.doctorHomeService.updatePassword(entries)
        .subscribe(result => {
          console.log(result);
          this.updatedPasswordResp = result;
          this.hasMessage = true;
          result.password = "";
          this.passwordSuccessMsg = result.successMessage;
        },
        error => {
          this.passwordErrorMsg = <any>error;
          this.hasMessage = true;
        });
    }
  }

  editDoctorProfile(event: any) {
      console.log("hello I'm selected date ",this.availableDate);
   this.doctorProfile.availableDate = this.availableDate;
    if (!this.doctorProfile.doctorMemberId) {
      this.doctorProfile.doctorMemberId = this.id;
      this.doctorProfile.profileExists = false;
    } else {
      this.doctorProfile.profileExists = true;
    }
    var entries = {
      affiliatedInsurance: this.doctorProfile.affiliatedInsurance,
      boardCertification: this.doctorProfile.boardCertification,
      doctorFirstName: this.doctorProfile.doctorFirstName,
      doctorLastName: this.doctorProfile.doctorLastName,
      doctorMemberId: this.doctorProfile.doctorMemberId,
      education: this.doctorProfile.education,
      hospitalAffliation: this.doctorProfile.hospitalAffliation,
      languagesSpoken: this.doctorProfile.languagesSpoken,
      professionalMemberships: this.doctorProfile.professionalMemberships,
      profileExists: this.doctorProfile.profileExists,
      specialities: this.doctorProfile.specialities,
      availableDate :  this.availableDate,
      address : this.doctorProfile.address,
      
    };


    this.doctorHomeService.updateDoctorProfile(entries)
      .subscribe(doctorQualifications => {
        this.updateResponse = doctorQualifications;
        this.hasMessage = true;
        this.editDocProfileMessage = this.updateResponse.successMessage;
      },
      error => {
        this.editDocProfileMessage = <any>error;
        this.hasMessage = true;
      });
  }

  clearError() {
    this.editDocProfileMessage = "";
    this.hasMessage = false;
  }


  /* To make Log Out tab have a pointer cursor */
  pointer(): any {
    let myStyles = {

      'cursor': 'pointer',
    }
    return myStyles;
  }

  differAppointment(id : any ,dt : Date):any{
    console.log(new Date(dt).getTime());
    var entries = {
      doctorMemberId : this.customerData.memberId,
      memberId : id
       }
    
    if(new Date(dt).getDate() != new Date().getDate()){                
      
                this.appoint.deleteAppointment(entries)
                     .subscribe(
                         (result : any) => {
                             console.log(result);
                             window.alert(result.errMessage);
                             this.rout.navigate(['doctorHome/'+this.customerData.memberId]);
                             }
                     );
                
      }else{
          var hours =  Math.floor((new Date(dt).getTime() - Date.now())/(1000*60*60));
        window.alert("You cannot cancel your appointment within 24 hours of appointment time,"+
                      "right now your have only "+ hours +
                      "  hours,Your Appointment cannot be cancelled");                
      }


  }

  logOut() {
    sessionStorage.removeItem("customerData");
    //sessionStorage.removeItem("userData");
    window.sessionStorage.clear();
    location.reload(true);
    this.rout.navigate(['/login']);
  }

  

}
