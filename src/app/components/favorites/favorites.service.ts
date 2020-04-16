import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocationModel } from '../../providers/models/locations.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private favoriteListSubject = new BehaviorSubject<LocationModel[]>([]);
  private favoriteLocalStorageName: 'weather-app.favorites';

  constructor() { }

  addToFavorites(location: LocationModel): boolean {

    const isNotExist = !this.checkIfExist(location.Key);
    if (isNotExist) {
      let newList = this.getFavoritesSync();
      newList.push(location);
      this.favoriteListSubject.next(newList);
      localStorage.setItem(this.favoriteLocalStorageName, JSON.stringify(newList));
    }

    return isNotExist;
  }

  removeFromFavorite(locationKey: number): void {
    const filteredList = this.getFavoritesSync().filter(f => f.Key !== locationKey);
    localStorage.setItem(this.favoriteLocalStorageName, JSON.stringify(filteredList));
    this.favoriteListSubject.next(filteredList);
  }

  public getFavoritesSync(): LocationModel[] {
    const localStorageData = localStorage.getItem(this.favoriteLocalStorageName);
    if(localStorageData){
      return JSON.parse(localStorageData);
    }
    return [];
  }

  getFavoriteList(): Observable<LocationModel[]> {
    this.favoriteListSubject.next(this.getFavoritesSync());
    return this.favoriteListSubject.asObservable();
  }

  checkIfExist(locationKey: number): boolean {
    return this.getFavoritesSync().find(f => f.Key === locationKey) != null;
  }

}
