import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },

  // --- GRADUAÇÃO (CURSOS) ---
  {
    path: 'cursos/administracao',
    loadComponent: () =>
      import('./pages/cursos/administracao/administracao.component').then(
        (m) => m.AdministracaoComponent
      ),
  },
  {
    path: 'cursos/direito',
    loadComponent: () =>
      import('./pages/cursos/direito/direito.component').then(
        (m) => m.DireitoComponent
      ),
  },
  {
    path: 'cursos/pedagogia',
    loadComponent: () =>
      import('./pages/cursos/pedagogia/pedagogia.component').then(
        (m) => m.PedagogiaComponent
      ),
  },
  {
    path: 'cursos/radiologia',
    loadComponent: () =>
      import('./pages/cursos/radiologia/radiologia.component').then(
        (m) => m.RadiologiaComponent
      ),
  },

  // --- INSTITUCIONAL ---
  {
    path: 'institucional/cpa',
    loadComponent: () =>
      import('./pages/institucional/cpa/cpa.component').then(
        (m) => m.CpaComponent
      ),
  },
  {
    path: 'institucional/ouvidoria',
    loadComponent: () =>
      import('./pages/institucional/ouvidoria/ouvidoria.component').then(
        (m) => m.OuvidoriaComponent
      ),
  },

  // ✅ BIBLIOTECA (faltava isso)
  {
    path: 'institucional/biblioteca',
    loadComponent: () =>
      import('./pages/institucional/biblioteca/biblioteca.component').then(
        (m) => m.BibliotecaComponent
      ),
  },

  {
    path: 'sobre-nos',
    loadComponent: () =>
      import('./components/why-college/why-college.component').then(
        (m) => m.WhyCollegeComponent
      ),
  },

  // Wildcard: Redireciona qualquer rota não encontrada para a Home
  { path: '**', redirectTo: '' },
];
