import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppointmentComponent } from './appointment/appointment.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoctorsComponent } from './doctors/doctors.component';
import { PatientComponent } from './patient/patient.component';

@Component({
  selector: 'app-root',
  imports: [WelcomeComponent, AppointmentComponent, CommonModule, FormsModule, DoctorsComponent, PatientComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hospital-management-frontend';

  currentView: string = 'welcome'; // Default view is 'welcome'

  showWelcome() {
    this.currentView = 'welcome';
  }

  showAppointments() {
    this.currentView = 'appointments';
  }

  showDoctors(){
    this.currentView = 'doctors';
  }

  showPatients(){
    this.currentView = 'patients';
  }
}
