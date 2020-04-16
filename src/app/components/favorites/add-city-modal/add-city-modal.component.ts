import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LocationModel } from '../../../providers/models/locations.model';

@Component({
  selector: 'app-add-city-modal',
  templateUrl: './add-city-modal.component.html',
  styleUrls: ['./add-city-modal.component.scss']
})
export class AddCityModalComponent implements OnInit {

  selectedLocation: LocationModel = null;

  constructor(
    public dialogRef: MatDialogRef<AddCityModalComponent>,
  ) { }

  ngOnInit(): void {
  }

  getSelectedLocation(location: LocationModel): void {
    this.selectedLocation = location;
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
