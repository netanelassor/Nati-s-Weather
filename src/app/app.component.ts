import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'herolo-test';

  // constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
  //   iconRegistry.addSvgIcon(
  //     "nati",
  //     sanitizer.bypassSecurityTrustResourceUrl('assets/icons/cloudy.svg'));
  //   iconRegistry.addSvgIcon(
  //     '2',
  //     sanitizer.bypassSecurityTrustResourceUrl('assets/icons/night.svg'));
  // }

}
