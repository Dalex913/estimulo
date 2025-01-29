import { Component, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements AfterViewInit{
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (typeof IntersectionObserver !== 'undefined') {
        const features: NodeListOf<HTMLElement> = this.el.nativeElement.querySelectorAll('.feature');
  
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.renderer.addClass(entry.target, 'in-view');
            } else {
              this.renderer.removeClass(entry.target, 'in-view');
            }
          });
        }, {
          threshold: 0.5
        });
  
        features.forEach((feature: HTMLElement) => {
          observer.observe(feature);
        });
      }
    }, 0);
  }
}
