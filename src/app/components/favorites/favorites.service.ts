import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocationModel } from '../weather/models/locations.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  favoriteList$ = new BehaviorSubject<LocationModel[]>([]);
  storedFavoriteList: LocationModel[] = [];

  constructor() { }

  addToFavorites(location: LocationModel): boolean {

    const isNotExist = !this.checkIfExist(location.Key);

    if (isNotExist) {
      this.storedFavoriteList.push(location);
      this.favoriteList$.next([...this.storedFavoriteList]);
      localStorage.setItem('favorites', JSON.stringify(this.storedFavoriteList));
    }

    return isNotExist;
  }

  getFavoriteList(): Observable<LocationModel[]> {
    const localStorageData = localStorage.getItem("favorites");
    this.storedFavoriteList = JSON.parse(localStorageData);

    if (this.storedFavoriteList) {
      this.favoriteList$.next([...this.storedFavoriteList]);
    } else {
      this.storedFavoriteList = [];
      this.favoriteList$.next([...this.storedFavoriteList]);
    }
    return this.favoriteList$.asObservable();
  }


  removeFromFavorite(locationKey: number) {
    this.storedFavoriteList = this.storedFavoriteList.filter(f => f.Key !== locationKey);
    this.favoriteList$.next([...this.storedFavoriteList]);
    localStorage.setItem('favorites', JSON.stringify(this.storedFavoriteList));
  }

  checkIfExist(locationKey: number): boolean {
    return this.storedFavoriteList.find(f => f.Key === locationKey) != null;
  }
}
