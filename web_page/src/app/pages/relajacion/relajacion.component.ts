import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-relajacion',
  templateUrl: './relajacion.component.html',
  styleUrl: './relajacion.component.css'
})
export class RelajacionComponent {
  loading: boolean = false;
  constructor(private router: Router) { }

  reenviar() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['/formulario']);
      this.loading = false;
    }, 2500);
  }
}
