import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'it255-ispit',
  templateUrl: './router.html',
})
export class AppComponent  {

  router: Router;
  isAuth: Boolean;

  constructor(router: Router) {
    this.router = router;
    this.router.events.subscribe(() => {
      this.isAuth = localStorage.getItem('token') !== null;
    });
  }

  onLogout(): void {
    localStorage.removeItem("token");
    this.router.navigate(['./']);
    this.isAuth = localStorage.getItem('token') !== null;
  }
}
