import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-cognitivo',
  templateUrl: './cognitivo.component.html',
  styleUrl: './cognitivo.component.css'
})
export class CognitivoComponent {
  // url: any;

  // constructor(private sanitizer: DomSanitizer) { }

  // ngOnInit(): void {
  //   const pageUrl = 'https://wordwall.net/es-ar/community/memory-game';
  //   this.url = this.sanitizer.bypassSecurityTrustResourceUrl(pageUrl);
  // }
}
