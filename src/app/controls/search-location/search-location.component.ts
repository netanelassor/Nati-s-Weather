import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { WeatherService } from 'src/app/components/weather/weather.service';
import { LocationModel } from 'src/app/providers/models/locations.model';

@Component({
  selector: 'app-search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.scss']
})
export class SearchLocationComponent implements OnInit {
  @Output() setSelectedLocation: EventEmitter<LocationModel> = new EventEmitter<LocationModel>();

  searchControl = new FormControl();
  suggestedLocationList$: Observable<LocationModel[]>;
  selectedLocation: LocationModel;

  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(400),
      )
      .subscribe((input) => {
        if (this.searchControl.valid && input.length >= 2) {
          this.suggestedLocationList$ = this.weatherService.getLocationSuggestion(input);
        }
      });
  }

  displayFn(location: LocationModel) {
    if (location) { return location.LocalizedName; }
  }

  selectLocation(location: LocationModel) {
    this.selectedLocation = location;
    this.weatherService.setSelectedLocation(location);
    this.setSelectedLocation.emit(location);
  }

}
