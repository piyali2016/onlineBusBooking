import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, forkJoin, map, of, switchMap } from 'rxjs';
import { Bus, Seat } from './bus'; // Assuming you have a Bus interface

@Injectable({
  providedIn: 'root'
})
export class BusService {
 //private apiUrl ='http://localhost:3000';// 'https://my-json-server.typicode.com/piyali2016/onlineBusBooking';
  private apiUrl = 'https://my-json-server.typicode.com/piyali2016/onlineBusBooking';


  constructor(private http: HttpClient) { }
   // Enhanced method to get buses with their available seat count
   getBusesWithSeatCounts(source: string, destination: string, departureDate: string): Observable<Bus[]> {
    const url = `${this.apiUrl}/buses?source=${source}&destination=${destination}&departureDate=${departureDate}`;
    return this.http.get<Bus[]>(url).pipe(
      switchMap((buses) => {
        if (buses.length > 0) {
          // For each bus, fetch the seat count
          return forkJoin(
            buses.map((bus) =>
              this.getAvailableSeatCountForBusId(bus.id, 'true').pipe(
                map((seatCount) => ({
                  ...bus,
                  seatCount, // Add seatCount property to each bus
                })),
                catchError(() => of({ ...bus, seatCount: 0 })) // In case of an error, return 0 as the seat count
              )
            )
          );
        } else {
          return of([]); // No buses found
        }
      })
    );
  }


  getBuses(source: string, destination: string, departureDate: string): Observable<Bus[]> {
    const url = `${this.apiUrl}?source=${source}&destination=${destination}&departureDate=${departureDate}`;
    return this.http.get<Bus[]>(url);
  }
  getAvailableSeatCountForBusId(busid:any,available:string): Observable<number> {
    return this.http.get<any[]>(`${this.apiUrl}/seats?busId=${busid}&available=${available}`).pipe(map((seats) => seats.length));
  }
  getSeatsByBusId(busId: number): Observable<Seat[]> {
    const url = `${this.apiUrl}/seats?busId=${busId}`;
    return this.http.get<Seat[]>(url);
  }
  getBusById(busId:any):Observable<Bus[]>{
    const url = `${this.apiUrl}/buses?id=${busId}`;
    return this.http.get<Bus[]>(url);
  }
  savePassengerInfo(passengerInfo: any): Observable<any> {
    const url = `${this.apiUrl}/reservations`;
    return this.http.post<any>(url, passengerInfo);
  }
}
