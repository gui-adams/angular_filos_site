import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },

  // --- CURSOS ---
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
  // Adicionei Radiologia para não dar erro 404 ao clicar no menu (verifique se o caminho existe)


  // --- INSTITUCIONAL / SOBRE (Aqui está o que você pediu) ---
  {
    path: 'about',
    loadComponent: () =>
      // Ajuste o caminho './components/...' se necessário, baseado na sua pasta raiz
      import('./components/why-college/why-college.component').then(
        (m) => m.WhyCollegeComponent
      ),
  },

  // Wildcard: Sempre deixe por último!
  { path: '**', redirectTo: '' },
];