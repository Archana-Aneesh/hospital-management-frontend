import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../hospital.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient',
  imports: [CommonModule, FormsModule],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent implements OnInit {
patients: any[] = [];
  name: string = '';
  age: number = 1;
  gender: string = '';
  patientsCount: number = 0;
  isEditMode: boolean = false;
  patientToEdit: any = null;

  constructor(private hospitalService: HospitalService) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  addPatients() {
    const patientsData = {
      name: this.name,
      age: this.age,
      gender: this.gender
    };
    if (this.isEditMode && this.patientToEdit) {
      // Call the updatepatient method
      this.hospitalService.updatePatient(this.patientToEdit._id, patientsData)
    .subscribe({
      next: (updatedPatient) => {
        const index = this.patients.findIndex(d => d._id === this.patientToEdit._id);
        if (index !== -1) {
          this.patients[index] = updatedPatient; // Replace the old patient with the updated one
        }

        this.loadPatients();
        this.resetForm();
        
      },
      error: (err) => {
        console.error('Error updating patient:', err); // Handle any errors
      }
    });
    } else{
      this.hospitalService.addPatients(patientsData).subscribe(response => {
        console.log('patient created:', response);
        this.patients.push(response); // Add the newly created patient to the list

        this.loadPatients();
        this.resetForm();
        
      }, error => {
        console.error('Error creating patient:', error);
      });
    }

  }

  
  resetForm() {
    this.name = '';
    this.age = 1;
    this.gender = '';
    this.isEditMode = false;
    this.patientToEdit = null;
  }


  loadPatients() {
    this.hospitalService.getPatients().subscribe(
      (response) => {
        this.patients = response; // Assign the response to the patients array
        this.patientsCount = this.patients.length;
        console.log('patients:', this.patients);
      },
      (error) => {
        console.error('Error fetching patients:', error);
      }
    );
  }

  editPatient(patients: any) {
    this.isEditMode = true;
    this.patientToEdit = patients;  // Ensure doctor object has the correct id
    console.log('Editing patients:', this.patientToEdit); // Debug the data
    this.name = patients.name;
    this.age = patients.age;
    this.gender = patients.gender;
  }

  deletePatient(patient: any): void {
    if (confirm(`Are you sure you want to delete ${patient.name}?`)) {
      this.hospitalService.deletePatient(patient._id).subscribe(() => {
        this.patients = this.patients.filter(d => d._id !== patient._id); // Remove from the UI after successful delete
        this.loadPatients();
      });
    }
  }
}
