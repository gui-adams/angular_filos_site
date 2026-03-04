import { Routes } from '@angular/router';

export const routes: Routes = [
  // HOME
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },

  // LANDING PAGE ADS (mantém separado)
  {
    path: 'faculdade-ads-aguas-lindas-go',
    loadComponent: () =>
      import('./pages/cursos/ads/lead-ads-lp.component').then(
        (m) => m.LeadAdsLpComponent
      ),
  },

  // -------- ROTAS ANTIGAS → REDIRECT SEO --------
  { path: 'cursos/direito', redirectTo: 'graduacao-direito-aguas-lindas-go', pathMatch: 'full' },
  { path: 'cursos/administracao', redirectTo: 'graduacao-administracao-aguas-lindas-go', pathMatch: 'full' },
  { path: 'cursos/pedagogia', redirectTo: 'graduacao-pedagogia-aguas-lindas-go', pathMatch: 'full' },
  { path: 'cursos/radiologia', redirectTo: 'graduacao-radiologia-aguas-lindas-go', pathMatch: 'full' },

  // aliases TI
  { path: 'cursos/ti', redirectTo: 'faculdade-ads-aguas-lindas-go', pathMatch: 'full' },
  { path: 'faculdade-ti-aguas-lindas-go', redirectTo: 'faculdade-ads-aguas-lindas-go', pathMatch: 'full' },
  { path: 'curso-ti-aguas-lindas', redirectTo: 'faculdade-ads-aguas-lindas-go', pathMatch: 'full' },

  // -------- INSTITUCIONAL --------
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

  // -------- CURSOS DINÂMICOS (CANÔNICO + SEO) --------
  {
    path: ':slug',
    loadComponent: () =>
      import('./pages/course-page/course-page.component').then(
        (m) => m.CoursePageComponent
      ),
  },

  // fallback
  { path: '**', redirectTo: '' },
];