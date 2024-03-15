import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Bus } from '../service/bus';
import { BusService } from '../service/bus-service.service';
import { DatePipe } from '@angular/common';
import { HttpClientJsonpModule } from '@angular/common/http';

@Component({
  selector: 'app-search-buses',
  standalone: true,
  imports: [ReactiveFormsModule,DatePipe,HttpClientJsonpModule],
  templateUrl: './search-buses.component.html',
  styleUrl: './search-buses.component.css'
})
export class SearchBusesComponent implements OnInit {
  buses: Bus[] = [];
  source: string = '';
  destination: string = '';
  departureDate:string='';
  searchForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,private busService: BusService) { }
  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      leavingFrom: ['', Validators.required],
      goingTo: ['', Validators.required],
      departingOn: ['', Validators.required]
    });
  }
  // Convenience getter for easy access to form fields
  get f() { return this.searchForm.controls; }
  onSubmit() {
    // Mark all fields as touched to trigger validation messages
    Object.values(this.searchForm.controls).forEach(control => {
      control.markAsTouched();
    });
  
    // Stop here if form is invalid
    if (this.searchForm.invalid) {
      return;
    }
    this.source=this.searchForm.controls['leavingFrom'].value;
    this.destination=this.searchForm.controls['goingTo'].value;
    this.departureDate=this.searchForm.controls['departingOn'].value;
    this.busService.getBuses(this.source, this.destination,this.departureDate)
    .subscribe(buses => {
      this.buses = buses;
      console.log('Buses:', this.buses);
    });
    // Process form submission here
    console.log('Form submitted!', this.searchForm.value);
  }
  
}
