import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cognitivo',
  templateUrl: './cognitivo.component.html',
  styleUrl: './cognitivo.component.css'
})
export class CognitivoComponent {
  loading: boolean = false;
  constructor(private router: Router) { }

  reenviar() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['/form-cognitivo']);
      this.loading = false;
    }, 2500);
  }
}
