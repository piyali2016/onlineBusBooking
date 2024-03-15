import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bus } from './bus'; // Assuming you have a Bus interface

@Injectable({
  providedIn: 'root'
})
export class BusService {
  private apiUrl = 'http://localhost:3000/buses';

  constructor(private http: HttpClient) { }

  getBuses(source: string, destination: string, departureDate: string): Observable<Bus[]> {
    const url = `${this.apiUrl}?source=${source}&destination=${destination}&departureDate=${departureDate}`;
    return this.http.get<Bus[]>(url);
  }
}
