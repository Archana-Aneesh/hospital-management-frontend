import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  private baseUrl = 'https://hospital-management-system-zj7l.onrender.com';

  constructor(private http: HttpClient) {}

  
  createAppointment(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/appointments`, data);
  }

  addDoctors(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/doctors`, data);
  }

  getAppointments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/appointments`);
  }

  getDoctors(): Observable<any> {
    return this.http.get(`${this.baseUrl}/doctors`);
  }

  addPatients(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/patients`, data);
  }

  getPatients(): Observable<any> {
    return this.http.get(`${this.baseUrl}/patients`);
  }

  updateAppointment(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/appointments/${id}`, data);
  }

  updateDoctor(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/doctors/${id}`, data);
  }

  deleteDoctor(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/doctors/${id}`);
  }

  updatePatient(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/patients/${id}`, data);
  }

  deletePatient(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/patients/${id}`);
  }

  deleteAppointment(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/appointments/${id}`);
  }
  
}
