import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusService } from '../service/bus-service.service';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-seat-selection',
  standalone: true,
  imports: [SlicePipe],
  templateUrl: './seat-selection.component.html',
  styleUrl: './seat-selection.component.css'
})
export class SeatSelectionComponent  implements OnInit {
  busId!: number;
  seats:any[]=[];
  selectedSeats: any[] = [];
  seatsPerRow:number = 4;
  uniqueArray:any[] =[];

  constructor(private route: ActivatedRoute,private busService: BusService, private router:Router) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.busId = +params['busId'];
      this.fetchSeatDetails(this.busId); // Call method to fetch seat details
    });
    
  }
  fetchSeatDetails(busId: number): void {
    // Call SeatService to fetch seat details based on bus ID
    this.busService.getSeatsByBusId(busId).subscribe(seats => {
      this.seats = seats;
    });
  }
  selectSeat(seat: any) {
   
    this.selectedSeats.push(seat);
    this.uniqueArray = this.selectedSeats.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
   
  }
  chunkArray(array: any[], chunkSize: number): any[][] {
    const chunks:any = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }
  calculateTotalPrice(): number {
    // Calculate total price based on selected seats
    return this.uniqueArray.reduce((total, seat) => total + seat.fare, 0);
  }
  continueToPassengerInfo(): void {
    // Navigate to Passenger Information component and pass selectedSeats as route parameter
    //this.router.navigate(['/passenger-info'], { state: { seats: this.uniqueArray } });
    this.router.navigate(['/passenger-info'], { queryParams: { seats: JSON.stringify(this.selectedSeats) } });
  }
}
