import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bus, Seat } from '../service/bus';
import { BusService } from '../service/bus-service.service';
@Component({
  selector: 'app-passenger-information',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './passenger-information.component.html',
  styleUrl: './passenger-information.component.css'
})
export class PassengerInformationComponent implements OnInit {
  passengerForm!: FormGroup;
  selectedSeats: Seat[] = [];
  isfetchResponseCame: boolean=false;
  bus: any;
  passengerInfo:any;
  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private busService:BusService,private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['seats']) {
        this.selectedSeats = JSON.parse(params['seats']);
      }
    });
    this.busService.getBusById(this.selectedSeats[0].busId).subscribe((bus: any) => {
      this.isfetchResponseCame=true;
      this.bus = bus;
      console.log(this.bus);
    });
    console.log(JSON.stringify(this.selectedSeats)); // Do
    this.passengerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      userMobile: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]]
    });
  }
  generateTicketId(): string {
    // Generate a timestamp (current time in milliseconds)
    const timestamp = new Date().getTime();
  
    // Generate a random number between 0 and 9999
    const randomNum = Math.floor(Math.random() * 10000);
  
    // Combine timestamp and random number to create a unique ID
    const ticketId = `${timestamp}${randomNum}`;
  
    return ticketId;
  }
  
  submitPassengerInfo(): void {
    if (this.passengerForm.valid) {
       this.passengerInfo = {
        id:this.generateTicketId(),
        passenger: {
          name: this.passengerForm.controls['userName'].value,
          mobile: this.passengerForm.controls['userMobile'].value,
          email: this.passengerForm.controls['userEmail'].value
        },
        bus: {
          id: this.bus[0].id,
          departureDate: this.bus[0].departureDate,
          departureTime:  this.bus[0].departureTime,
          coachType: this.bus[0].coachType,
          destination:this.bus[0].destination,
          fare:this.bus[0].fare,
          name:this.bus[0].name,
          source:this.bus[0].source,
          seats: this.selectedSeats.map(seat => seat.seatNumber).join(',')

             },
          }
          console.log(this.passengerInfo);
      // Call the savePassengerInfo method of ReservationService to send the data to JSON Server
      this.busService.savePassengerInfo(this.passengerInfo).subscribe(() => {
        console.log('Passenger information saved successfully.');
        // Reset the form after successful submission
        this.passengerForm.reset();
        this.router.navigate(['/review-ticket'], { queryParams: { reserv: JSON.stringify(this.passengerInfo) } });
      }, error => {
        console.error('Error saving passenger information:', error);
      });
    } else {
      console.error('Form is invalid. Please fill in all required fields.');
    }
  }

}
