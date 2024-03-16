import { Component, Input, SimpleChanges } from '@angular/core'; 
import { Bus } from '../service/bus';
import { BusService } from '../service/bus-service.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Route, Router, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-bus-list',
  standalone: true,
  imports: [AsyncPipe,RouterLinkActive],
  templateUrl: './bus-list.component.html',
  styleUrl: './bus-list.component.css'
})
export class BusListComponent {
  @Input() source: string = '';
  @Input() destination: string = '';
  @Input() departureTime: string = ''; 
  buses: Bus[] = [];
  constructor(private busService: BusService, private router:Router) { }
  ngOnInit(): void {
    this.fetchBuses();
  }
  ngOnChanges(changes: SimpleChanges): void {
    // This method is triggered when any input properties change.
    // You can fetch the updated bus list here based on the new inputs.
    if (changes['source'] || changes['destination'] || changes['departureDate']) {
      this.fetchBuses();
    }
  }
  fetchBuses(): void {
    // Fetch buses based on source, destination, and departure time
    this.busService.getBusesWithSeatCounts(this.source, this.destination, this.departureTime).subscribe(buses => {
      this.buses = buses;
      console.log(this.buses);
    });
    
  }
 
  viewSeats(busId: number): void {
    this.router.navigate(['/seat-selection', busId]);
  }
}
