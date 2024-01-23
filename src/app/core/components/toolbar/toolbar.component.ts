import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [NgClass, NgIf, RouterLink],
  templateUrl: './toolbar.component.html',
  styleUrls: [
    './assets/menu-icon.component.sass',
    './assets/toolbar.component.sass',
  ],
})
export class ToolbarComponent {
  public showHamburgerMenu: boolean = false;

  public showMenu: boolean = false;

  constructor(private router: Router) {}

  menuHandle = (): void => {
    this.showMenu = !this.showMenu;
  };

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const lastRoute = event.url;
        // Verifica si la última ruta es igual a "/inicio-sesion"
        if (lastRoute === '/inicio-sesion' || lastRoute === '/') {
          this.showHamburgerMenu = false;
        } else {
          this.showHamburgerMenu = true;
        }
      }
    });
  }
}
