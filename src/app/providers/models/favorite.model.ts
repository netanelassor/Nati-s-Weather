import { LocationModel } from './locations.model';
import { WeatherItemModel } from './weather-item.model';

export interface Favorite {
    location: LocationModel;
    currentWeather: WeatherItemModel;
}
