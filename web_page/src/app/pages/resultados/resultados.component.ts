import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForoService } from '../../services/foro.service';
import { FormularioDataService } from '../../services/formulario-data.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

  recomendaciones: any;

  constructor(private recomendacionesService: FormularioDataService) {}

  ngOnInit():void {
    this.recomendacionesService.recomendaciones$.subscribe(data => {
      
      this.recomendaciones = data;
      console.log(data)
    });
  }
}