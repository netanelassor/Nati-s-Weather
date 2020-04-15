import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocationModel } from '../../providers/models/locations.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private favoriteListSubject = new BehaviorSubject<LocationModel[]>([]);
  storedFavoriteList: LocationModel[] = [];
  private favoriteLocalStorageName: 'weather-app.favorites';
  constructor() { }

  addToFavorites(location: LocationModel): boolean {

    const isNotExist = !this.checkIfExist(location.Key);

    if (isNotExist) {
      this.storedFavoriteList.push(location);
      this.favoriteListSubject.next([...this.storedFavoriteList]);
      localStorage.setItem(this.favoriteLocalStorageName, JSON.stringify(this.storedFavoriteList));
    }

    return isNotExist;
  }

  getFavoriteList(): Observable<LocationModel[]> {
    const localStorageData = localStorage.getItem(this.favoriteLocalStorageName);
    this.storedFavoriteList = JSON.parse(localStorageData);

    if (this.storedFavoriteList) {
      this.favoriteListSubject.next([...this.storedFavoriteList]);
    } else {
      this.storedFavoriteList = [];
      this.favoriteListSubject.next([...this.storedFavoriteList]);
    }
    return this.favoriteListSubject.asObservable();
  }


  removeFromFavorite(locationKey: number) {
    this.storedFavoriteList = this.storedFavoriteList.filter(f => f.Key !== locationKey);
    this.favoriteListSubject.next([...this.storedFavoriteList]);
    localStorage.setItem(this.favoriteLocalStorageName, JSON.stringify(this.storedFavoriteList));
  }

  checkIfExist(locationKey: number): boolean {
    return this.storedFavoriteList.find(f => f.Key === locationKey) != null;
  }
}
