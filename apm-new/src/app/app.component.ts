import { Component } from "@angular/core";

@Component({
  selector: 'pm-root',
  template: 
 
  `
  <nav class='navbar navbar-expand navbar-light bg-light d-flex justify-content-center'>
   
    <ul class='nav nav-pills'>
      <li><a class='nav-link lead' routerLink='/welcome'>Inicio</a></li>
      <li><a class='nav-link lead' routerLink='/products'>Lista de Produtos</a></li>
    </ul>
  </nav>
  <div class='container'>
    <router-outlet></router-outlet>
  </div>
  `

})
export class AppComponent {
  // pageTitle: string = 'Produtos';
}


