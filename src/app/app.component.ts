import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'expense-manager-frontend';
  selectedMenu: string = 'dashboard'; // Default selected menu

  selectMenu(menu: string): void {
    this.selectedMenu = menu;
  }

  isActive(menu: string): boolean {
    return this.selectedMenu === menu;
  }
}
