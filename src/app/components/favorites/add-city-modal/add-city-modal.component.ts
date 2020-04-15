import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LocationModel } from '../../weather/models/locations.model';
import { WeatherService } from '../../weather/weather.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-city-modal',
  templateUrl: './add-city-modal.component.html',
  styleUrls: ['./add-city-modal.component.scss']
})
export class AddCityModalComponent implements OnInit {

  selectedLocation: LocationModel;

  constructor(
    private weatherService: WeatherService,
    public dialogRef: MatDialogRef<AddCityModalComponent>,
  ) { }

  ngOnInit(): void {
    this.getSelectedLocation();
  }

  getSelectedLocation(): void {
    this.weatherService.getSelectedLocation().subscribe(locations => {
      this.selectedLocation = locations;
    });
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
