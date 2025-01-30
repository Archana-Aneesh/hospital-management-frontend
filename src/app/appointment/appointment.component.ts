import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HospitalService } from '../hospital.service';

@Component({
  selector: 'app-appointment',
  imports: [CommonModule, FormsModule],
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  appointments: any[] = []; // Array to store appointment data
  patient: string = '';
  doctor: string = '';
  time: string = '';
  date: string = '';
  isEditMode: boolean = false;
  appointmentToEdit: any = null;
  appointmentsCount: number = 0;
  patients: any[] = [];
  doctors: any[] = [];


  constructor(private hospitalService: HospitalService) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  createAppointment() {
    const appointmentData = {
      patient: this.patient,
      doctor: this.doctor,
      date: this.date
    };

    if (this.isEditMode && this.appointmentToEdit) {
      // Call the updateAppointment method
      this.hospitalService.updateAppointment(this.appointmentToEdit._id, appointmentData)
      .subscribe({
        next: (updatedPatient) => {
          const index = this.patients.findIndex(d => d._id === this.appointmentToEdit._id);
          if (index !== -1) {
            this.patients[index] = updatedPatient; // Replace the old patient with the updated one
          }
  
          this.loadAppointments();
          this.resetForm();
          
        },
        error: (err) => {
          console.error('Error updating patient:', err); // Handle any errors
        }
      });
    } else {
        this.hospitalService.createAppointment(appointmentData).subscribe(response => {
          console.log('Appointment created:', response);
          this.appointments.push(response); // Add the newly created appointment to the list

          this.loadAppointments();
          this.resetForm();

        }, error => {
          console.error('Error creating appointment:', error);
        });
    }
  }

  resetForm() {
    this.patient = '';
    this.date = '';
    this.doctor = '';
    this.isEditMode = false;
    this.appointmentToEdit = null;
  }

  // Method to load appointments from the backend
  loadAppointments() {
    this.hospitalService.getAppointments().subscribe(
      (response) => {
        this.appointments = response; // Assign the response to the appointments array
        this.appointmentsCount = this.appointments.length;
        console.log('Appointments:', this.appointments);
        this.loadPatients();
        this.loadDoctors();
      },
      (error) => {
        console.error('Error fetching appointments:', error);
      }
    );
  }
  editAppointment(appointment: any) {
    this.isEditMode = true;
    this.appointmentToEdit = appointment;
    this.patient = appointment.patient;
    this.date = new Date(appointment.date).toISOString().split('T')[0];
    this.doctor = appointment.doctor;
  }

  
  loadPatients() {
    this.hospitalService.getPatients().subscribe(
      (response) => {
        this.patients = response; // Assign the response to the patients array
        console.log('patients:', this.patients);
      },
      (error) => {
        console.error('Error fetching patients:', error);
      }
    );
  }

  loadDoctors() {
    this.hospitalService.getDoctors().subscribe(
      (response) => {
        this.doctors = response; // Assign the response to the doctors array
        console.log('doctors:', this.doctors);
      },
      (error) => {
        console.error('Error fetching doctors:', error);
      }
    );
  }
  deleteAppointment(appointment: any): void {
    if (confirm(`Are you sure you want to delete ${appointment.patient}?`)) {
      this.hospitalService.deleteAppointment(appointment._id).subscribe(() => {
        this.appointments = this.appointments.filter(d => d._id !== appointment._id); // Remove from the UI after successful delete
        this.loadAppointments();

      });
    }
  }
  
}
