import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchBusesComponent } from './search-buses/search-buses.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SearchBusesComponent,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-bus-ticket-app';
}
