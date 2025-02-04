import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ForoService } from '../../services/foro.service';
import { FormularioDataService } from '../../services/formulario-data.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

  recomendaciones: any;

  constructor(
    private recomendacionesService: FormularioDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.recomendacionesService.recomendaciones$.subscribe(data => {
      this.recomendaciones = data;
      if (!this.recomendaciones || this.recomendaciones === null) {
        this.router.navigate(['/formulario']);
      }
    });
  }
  irAlJuego(juego: string): void {
    window.open(juego, '_blank');
  }
}