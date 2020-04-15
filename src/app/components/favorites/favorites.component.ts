import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { LocationModel } from '../weather/models/locations.model';
import { WeatherService } from '../weather/weather.service';
import { AddCityModalComponent } from './add-city-modal/add-city-modal.component';
import { FavoritesService } from './favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  favoriteList$: Observable<LocationModel[]>;

  constructor(
    private favoriteService: FavoritesService,
    private weatherService: WeatherService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {
    this.getFavorites();
  }

  getFavorites() {
    this.favoriteList$ = this.favoriteService.getFavoriteList();
  }

  getCurrentWeather(location: LocationModel) {
    return this.weatherService.getCurrentWeatherByLocation(location.Key);
  }

  addFavorites() {
    const dialogRef = this.dialog.open(AddCityModalComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result: LocationModel) => {
      if (result) {
        const success: boolean = this.favoriteService.addToFavorites(result);
        const message =
          success ? result.LocalizedName + ' added to favorites successfully' : 'Sorry, something went wrong, please try again';

        this.showToast(message);
      }
    });
  }

  showToast(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }


}

