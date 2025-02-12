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

  imagenesDecorativas: string[] = [
    'https://aulavirtualmoodle.uleam.edu.ec/pluginfile.php/371186/course/overviewfiles/payana.gif',
    'https://i.pinimg.com/originals/a5/98/d4/a598d4fc4118f5ea0cb49e2c9a34524d.gif',
    'https://img.freepik.com/vector-premium/ninos-felices-dibujos-animados-jugando-pelota_24911-13693.jpg',
    'https://img.freepik.com/vector-premium/ninos-amigos-jugando-sonriendo-caricaturas_18591-53438.jpg',
  ];

  constructor(
    private recomendacionesService: FormularioDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.recomendacionesService.recomendaciones$.subscribe(data => {
      this.recomendaciones = data;
      console.log('Datos de recomendaciones:', this.recomendaciones);
      if (!this.recomendaciones || this.recomendaciones === null) {
        this.router.navigate(['/formulario']);
      }
    });
  }

  irAlJuego(juego: string): void {
    window.open(juego, '_blank');
  }

  formatDescription(description: string): string {
    return description
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
  }
  isModalOpen = false;
}