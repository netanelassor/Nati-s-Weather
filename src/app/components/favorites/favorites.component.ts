import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, forkJoin } from 'rxjs';
import { LocationModel } from '../../providers/models/locations.model';
import { WeatherService } from '../weather/weather.service';
import { AddCityModalComponent } from './add-city-modal/add-city-modal.component';
import { FavoritesService } from './favorites.service';
import { Router } from '@angular/router';

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
    private toastService: MatSnackBar,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.getFavorites();

  }

  getFavorites(): void {
    this.favoriteList$ = this.favoriteService.getFavoriteList();
  }


  addFavorites(): void {
    const dialogRef = this.dialog.open(AddCityModalComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result: LocationModel) => {
      if (result) {
        const success: boolean = this.favoriteService.addToFavorites(result);
        const message =
          success ? result.LocalizedName + ' added to favorites successfully' : 'Sorry, something went wrong, please try again';

        this.showToast(message, success);
      }
    });
  }

  removeFromFavorite(location: LocationModel) {
    this.favoriteService.removeFromFavorite(location.Key);
    const message = location.LocalizedName + ' has been removed';
    this.showToast(message, true);
  }

  showToast(message: string, success: boolean): void {
    this.toastService.open(message, '', {
      duration: 3000,
      panelClass: success ? ['notif-success'] : ['notif-error']
    });
  }

}

