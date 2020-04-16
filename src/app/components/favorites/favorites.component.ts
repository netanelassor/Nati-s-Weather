import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { LocationModel } from '../../providers/models/locations.model';
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
    public dialog: MatDialog,
    private toastService: MatSnackBar,
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
        console.log(result);
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

