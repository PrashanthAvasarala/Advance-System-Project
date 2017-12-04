import { Component } from "@angular/core";
import { CustomerAuthGuard } from "../Customer/Customer_AuthGuard";
import { Router } from "@angular/router";
import { DoctorHomeService } from "../RESTFul_API_Service/Doctor.Home.service";

@Component({
  selector: 'Doctor-Header',
  templateUrl: './Doctor_Header.html',
  styleUrls: ['./Doctor_Header.css']
})

export class DoctorHeader extends CustomerAuthGuard {

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
  editDocProfileMessage: string;
  hasMessage: boolean = false;

  /* Taking the sessionstorage into Customer values from Customer_AuthGuard_ts rather declaring another variable */
  constructor(private doctorHomeService: DoctorHomeService, private rout: Router) {
    super(rout);
    this.id = this.customerData.memberId;
  }

  showPastAppointmentsClicked(event: any) {
    var entries: any = {
      doctorMemberId: this.customerData.memberId
    };

    this.doctorHomeService.getPastAppointments(entries)
      .subscribe(appointments => {
        this.patientAppointments = appointments;
      },
      error => {
        this.errorMessage = <any>error;
      },
      () => {
        this.modalTitle = "Past Appointments";
      });
  };

  ShowReviewsClicked(event: any) {
    var entries: any = {
      doctorMemberId: this.customerData.memberId
    };

    this.doctorHomeService.getPatientReviews(entries)
      .subscribe(reviews => {
        this.patientReviews = reviews;
      },
      error => {
        this.errorMessage = <any>error;
      },
      () => {
        this.modalTitle = "Past Appointments";
      });
  };

  ShowLabReportsClicked(event: any) {
    var entries: any = {
      doctorMemberId: this.customerData.memberId
    };

    this.doctorHomeService.getPatientLabReports(entries)
      .subscribe(labReports => {
        this.patientLabReports = labReports;
      },
      error => {
        this.errorMessage = <any>error;
      },
      () => {
        this.modalTitle = "Past Appointments";
      });
  }

  ShowAppointmentsForTodayClicked(event: any) {
    var entries: any = {
      doctorMemberId: this.customerData.memberId
    };

    this.doctorHomeService.getAppointmentsForToday(entries)
      .subscribe(appointments => {
        this.patientAppointments = appointments;
      },
      error => {
        this.errorMessage = <any>error;
      },
      () => {
        this.modalTitle = "All Appointments For Today";
      });
  }

  DoctorProfileClicked(event: any) {
    var entries: any = {
      doctorMemberId: this.customerData.memberId
    };

    this.doctorHomeService.getDoctorProfile(entries)
      .subscribe(doctorProfile => {
        console.log("Profile clicked" , doctorProfile)
        this.doctorProfile = doctorProfile;
      },
      error => {
        this.errorMessage = <any>error;
      },
      () => this.profileModalTitle = "Edit Profile");
  }

  editDoctorProfile(event: any) {
    console.log("Its here", this.doctorProfile)
    

    this.doctorHomeService.updateDoctorProfile(this.doctorProfile)
      .subscribe(response => {
        this.updateResponse = response;
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

  logOut() {
    sessionStorage.removeItem("customerData");
    window.sessionStorage.clear();
    location.reload(true);
    this.rout.navigate(['/login']);
  }

}
