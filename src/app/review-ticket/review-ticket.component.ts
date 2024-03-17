import { Component } from '@angular/core';
import { ActivatedRoute, Route ,Router} from '@angular/router';
import { BusService } from '../service/bus-service.service';

@Component({
  selector: 'app-review-ticket',
  standalone: true,
  imports: [],
  templateUrl: './review-ticket.component.html',
  styleUrl: './review-ticket.component.css'
})
export class ReviewTicketComponent {
  selectedSeats: any;
  
  constructor(private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['reserv']) {
        this.selectedSeats = JSON.parse(params['reserv']);
        console.log(this.selectedSeats);
      }
    });
  }
}
