import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Define la interfaz para las recomendaciones y los juegos recomendados
interface DatosFormulario {
  recomendaciones: string[];
  juegosRecomendados: { nombre: string; url: string }[];
}

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

  recomendaciones: string[] = [];
  juegosRecomendados: any[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.history.state) {
      const navigation = window.history.state;
      
      if (navigation) {
        const datos: DatosFormulario = navigation;
        this.recomendaciones = datos.recomendaciones;
        this.juegosRecomendados = datos.juegosRecomendados;
  
        console.log("Recomendaciones:", this.recomendaciones);
        console.log("Juegos Recomendados:", this.juegosRecomendados);
      }
    } else {
      console.warn('El objeto `window` o `history.state` no está disponible.');
    }
  }
}
