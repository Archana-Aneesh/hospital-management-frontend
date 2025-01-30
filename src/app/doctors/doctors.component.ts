import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HospitalService } from '../hospital.service';

@Component({
  selector: 'app-doctors',
  imports: [CommonModule, FormsModule],
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
  doctors: any[] = [];
  name: string = '';
  speciality: string = '';
  isEditMode: boolean = false;
  doctorToEdit: any = null;
  doctorCount: number = 0;


  constructor(private hospitalService: HospitalService) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  addDoctors() {
    const doctorsData = {
      name: this.name,
      speciality: this.speciality,
    };
    if (this.isEditMode && this.doctorToEdit) {
      // Call the updatedoctor method
      this.hospitalService.updateDoctor(this.doctorToEdit._id, doctorsData)
    .subscribe({
      next: (updatedDoctor) => {
        const index = this.doctors.findIndex(d => d._id === this.doctorToEdit._id);
        if (index !== -1) {
          this.doctors[index] = updatedDoctor; // Replace the old doctor with the updated one
        }
        this.loadDoctors();
        this.resetForm();
      },
      error: (err) => {
        console.error('Error updating doctor:', err); // Handle any errors
      }
    });
    } else {
      this.hospitalService.addDoctors(doctorsData).subscribe(response => {
        console.log('doctor created:', response);
        this.doctors.push(response); // Add the newly created doctor to the list
      
        this.loadDoctors();
        this.resetForm();

      }, error => {
        console.error('Error creating doctor:', error);
      });
  }

  }

  resetForm() {
    this.name = '';
    this.speciality = '';
    this.isEditMode = false;
    this.doctorToEdit = null;
  }


  loadDoctors() {
    this.hospitalService.getDoctors().subscribe(
      (response) => {
        this.doctors = response; // Assign the response to the doctors array
        this.doctorCount = this.doctors.length;
        console.log('doctors:', this.doctors);
      },
      (error) => {
        console.error('Error fetching doctors:', error);
      }
    );
  }

  editDoctor(doctor: any) {
    this.isEditMode = true;
    this.doctorToEdit = doctor;  // Ensure doctor object has the correct id
    console.log('Editing doctor:', this.doctorToEdit); // Debug the data
    this.name = doctor.name;
    this.speciality = doctor.speciality;
  }
  
// Delete a doctor by calling the service's delete method
deleteDoctor(doctor: any): void {
  if (confirm(`Are you sure you want to delete Dr. ${doctor.name}?`)) {
    this.hospitalService.deleteDoctor(doctor._id).subscribe(() => {
      this.doctors = this.doctors.filter(d => d._id !== doctor._id); // Remove from the UI after successful delete
      this.loadDoctors();

    });
  }
}
}
