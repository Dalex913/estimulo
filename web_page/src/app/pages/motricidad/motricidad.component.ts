import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-motricidad',
  templateUrl: './motricidad.component.html',
  styleUrl: './motricidad.component.css'
})
export class MotricidadComponent {
  loading: boolean = false;
    constructor(private router: Router) { }

    reenviar() {
      this.loading = true;
      setTimeout(() => {
        this.router.navigate(['/form-motricidad']);
        this.loading = false;
      }, 2500);
    }
}
