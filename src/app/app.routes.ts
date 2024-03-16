import { Routes } from '@angular/router';
import { SearchBusesComponent } from './search-buses/search-buses.component';
import { SeatSelectionComponent } from './seat-selection/seat-selection.component';

export const routes: Routes = [
    { path: '', redirectTo: 'search-buses', pathMatch: 'full' },
    { path: 'search-buses', component: SearchBusesComponent },
    { path: 'seat-selection/:busId', component: SeatSelectionComponent }
];
