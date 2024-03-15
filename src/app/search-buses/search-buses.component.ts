import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-buses',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-buses.component.html',
  styleUrl: './search-buses.component.css'
})
export class SearchBusesComponent implements OnInit {
  searchForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) { }
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
  
    // Process form submission here
    console.log('Form submitted!', this.searchForm.value);
  }
  
}
