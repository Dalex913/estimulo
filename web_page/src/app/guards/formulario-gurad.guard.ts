import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const formularioGuradGuard: CanActivateFn = (route, state) => {
  // Verificar si estamos en el entorno del navegador
  if (typeof window !== 'undefined' && window.localStorage) {
    const formularioCompleto = localStorage.getItem('formularioCompleto');
    
    // Si no está completo, redirige al formulario
    if (!formularioCompleto) {
      const router = inject(Router); // Inyecta el Router
      router.navigate(['/formulario']); // Redirige al formulario
      return false;
    }
  }

  return true;
};
