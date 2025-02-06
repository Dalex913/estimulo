import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sensoriales',
  templateUrl: './sensoriales.component.html',
  styleUrl: './sensoriales.component.css'
})
export class SensorialesComponent {
  loading: boolean = false;
  constructor(private router: Router) { }

  reenviar() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['/form-sensorial']);
      this.loading = false;
    }, 2500);
  }
}
