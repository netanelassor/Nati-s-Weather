import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-weather-icon',
  templateUrl: './weather-icon.component.html',
  styleUrls: ['./weather-icon.component.scss']
})
export class WeatherIconComponent implements OnInit {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      "1",
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/day.svg'));
    iconRegistry.addSvgIcon(
      '2',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/day.svg'));
    iconRegistry.addSvgIcon(
      '3',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/cloudy-day-2.svg'));
    iconRegistry.addSvgIcon(
      '4',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/cloudy-day-3.svg'));
    iconRegistry.addSvgIcon(
      '5',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/cloudy-day-3.svg'));
    iconRegistry.addSvgIcon(
      '6',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/cloudy.svg'));
    iconRegistry.addSvgIcon(
      '7',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/cloudy.svg'));
    iconRegistry.addSvgIcon(
      '8',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/cloudy.svg'));
    iconRegistry.addSvgIcon(
      '9',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/cloudy.svg'));
    iconRegistry.addSvgIcon(
      '11',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/cloudy.svg'));
    iconRegistry.addSvgIcon(
      '12',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/rainy-7.svg'));
    iconRegistry.addSvgIcon(
      '13',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/rainy-1.svg'));
    iconRegistry.addSvgIcon(
      '14',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/rainy-1.svg'));
    iconRegistry.addSvgIcon(
      '15',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/thunder.svg'));
    iconRegistry.addSvgIcon(
      '16',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/rainy-1.svg'));
    iconRegistry.addSvgIcon(
      '17',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/rainy-1.svg'));
    iconRegistry.addSvgIcon(
      '18',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/rainy-7.svg'));
    iconRegistry.addSvgIcon(
      '19',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/cloudy.svg'));
    iconRegistry.addSvgIcon(
      '20',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/cloudy-day-1.svg'));
    iconRegistry.addSvgIcon(
      '22',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/snowy-6.svg'));
    iconRegistry.addSvgIcon(
      '25',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/snowy-4.svg'));
    iconRegistry.addSvgIcon(
      '26',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/snowy-4.svg'));
    iconRegistry.addSvgIcon(
      '30',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/night.svg'));
    iconRegistry.addSvgIcon(
      '31',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/night.svg'));
    iconRegistry.addSvgIcon(
      '32',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/night.svg'));
    iconRegistry.addSvgIcon(
      '33',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/night.svg'));
    iconRegistry.addSvgIcon(
      '34',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/night.svg'));
    iconRegistry.addSvgIcon(
      '35',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/cloudy.svg'));
    iconRegistry.addSvgIcon(
      '36',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/cloudy.svg'));
    iconRegistry.addSvgIcon(
      '37',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/cloudy.svg'));

    iconRegistry.addSvgIcon(
      'weather',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/weather.svg'));
  }

  ngOnInit(): void {
  }

}
