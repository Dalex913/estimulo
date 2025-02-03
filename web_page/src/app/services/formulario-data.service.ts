import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormularioDataService {

  private recomendaciones: string[] = [];
  private juegosRecomendados: { nombre: string; url: string }[] = [];

  constructor() { }

  // Métodos para establecer los datos
  setDatos(recomendaciones: string[], juegosRecomendados: { nombre: string; url: string }[]) {
    this.recomendaciones = recomendaciones;
    this.juegosRecomendados = juegosRecomendados;
  }

  // Métodos para obtener los datos
  getRecomendaciones(): string[] {
    return this.recomendaciones;
  }

  getJuegosRecomendados(): { nombre: string; url: string }[] {
    return this.juegosRecomendados;
  }
}
