import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lead-ads-lp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  template: `
  <div class="page">
    <header class="hero">
      <div class="brand">ADS • Águas Lindas</div>

      <h1>Tecnologo em <span>Análise e Desenvolvimento de Sistemas</span> em Águas Lindas (GO)</h1>

      <p class="sub">
        Quer trabalhar com TI? Estamos avaliando a abertura de uma turma presencial/semipresencial em Águas Lindas.
        Cadastre-se para receber informações sobre modalidade, turno, valores e previsão de início.
      </p>

      <!-- SEO content (texto escaneável com keywords locais) -->
      <div class="seoBlock" aria-label="Conteúdo informativo">
        <h2>Por que fazer ADS em Águas Lindas?</h2>
        <p>
          O curso de <strong>Análise e Desenvolvimento de Sistemas (ADS)</strong> prepara você para atuar com
          programação, desenvolvimento web, aplicativos, bancos de dados e projetos práticos para portfólio.
        </p>
        <ul>
          <li><strong>Curso de TI em Águas Lindas</strong> com foco em prática e empregabilidade</li>
          <li>Possibilidade de carreira em tecnologia e trabalho remoto</li>
          <li>Formação direta ao ponto: projetos e desafios desde o início</li>
        </ul>
      </div>

      <div class="cards">
        <div class="card">
          <div class="title">O que você ganha</div>
          <ul>
            <li>Informações em primeira mão</li>
            <li>Condições especiais de lançamento</li>
            <li>Pesquisa rápida (1 minuto)</li>
          </ul>
        </div>
        <div class="card">
          <div class="title">Para quem é</div>
          <ul>
            <li>Quem quer entrar em TI</li>
            <li>Quem busca diploma + prática</li>
            <li>Quem mora em Águas Lindas e região</li>
          </ul>
        </div>
      </div>
    </header>

    <main class="main">
      <section class="formWrap">
        <h2>Inscreva-se para receber mais informações</h2>
        <p class="hint">Sem spam. Você pode sair quando quiser.</p>

        <form [formGroup]="form" (ngSubmit)="submit()" class="form" *ngIf="!submitted">
          <label>
            Nome
            <input type="text" formControlName="name" placeholder="Seu nome" />
            <small *ngIf="showError('name')">Informe seu nome.</small>
          </label>

          <label>
            WhatsApp
            <input type="tel" formControlName="whatsapp" placeholder="(61) 9xxxx-xxxx" />
            <small *ngIf="showError('whatsapp')">Informe um WhatsApp válido (11+ dígitos).</small>
          </label>

          <label>
            E-mail
            <input type="email" formControlName="email" placeholder="seuemail@exemplo.com" />
            <small *ngIf="showError('email')">Informe um e-mail válido.</small>
          </label>

          <label>
            Você prefere:
            <select formControlName="mode">
              <option value="Presencial">Presencial</option>
              <option value="Semipresencial">Semipresencial</option>
              <option value="EAD">EAD</option>
            </select>
          </label>

          <label>
            Quando você pretende começar?
            <select formControlName="start">
              <option value="Imediato">Imediato</option>
              <option value="Em 3 meses">Em 3 meses</option>
              <option value="Em 6 meses">Em 6 meses</option>
              <option value="Só pesquisando">Só pesquisando</option>
            </select>
          </label>

          <label class="check">
            <input type="checkbox" formControlName="consent" />
            Aceito receber contato com informações sobre a faculdade.
          </label>
          <small *ngIf="showError('consent')">Você precisa aceitar para enviar.</small>

          <button class="cta" type="submit" [disabled]="loading">
            {{ loading ? 'Enviando...' : 'Quero receber informações' }}
          </button>

          <p class="privacy">
            Ao enviar, você concorda com o uso dos seus dados apenas para contato sobre esta pesquisa.
          </p>
        </form>

        <div class="thanks" *ngIf="submitted">
          <h3>Pronto! ✅</h3>
          <p>Recebemos seu interesse. Em breve enviaremos novidades sobre a turma de ADS em Águas Lindas.</p>
          <button class="ghost" (click)="reset()">Enviar outro contato</button>
        </div>

        <div class="error" *ngIf="errorMsg">{{ errorMsg }}</div>
      </section>

      <section class="proof">
        <h3>Por que estamos fazendo isso?</h3>
        <p>
          Queremos entender a demanda local para montar a melhor proposta: modalidade, turno e mensalidade.
          Quanto mais pessoas interessadas, mais rápido tiramos do papel.
        </p>

        <div class="mini">
          <div class="metric">
            <div class="k">Objetivo</div>
            <div class="v">Validar demanda</div>
          </div>
          <div class="metric">
            <div class="k">Cidade foco</div>
            <div class="v">Águas Lindas (GO)</div>
          </div>
          <div class="metric">
            <div class="k">Curso</div>
            <div class="v">ADS</div>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <span>© Pesquisa de demanda • ADS</span>
    </footer>
  </div>
  `,
  styles: [`
    :host { display:block; font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial; color:#0f172a; }
    .page { min-height: 100vh; background: radial-gradient(1200px 600px at 20% 0%, #dbeafe, transparent 60%),
                                 radial-gradient(1000px 500px at 90% 10%, #dcfce7, transparent 55%),
                                 #ffffff; }
    .hero { padding: 48px 18px 20px; max-width: 980px; margin: 0 auto; }
    .brand { font-weight: 700; letter-spacing:.5px; color:#1d4ed8; }
    h1 { font-size: clamp(28px, 3.4vw, 44px); line-height: 1.1; margin: 12px 0 10px; }
    h1 span { color:#16a34a; }
    .sub { color:#334155; max-width: 780px; margin: 0 0 14px; }

    .seoBlock { background: rgba(255,255,255,.7); border:1px solid #e2e8f0; border-radius: 16px; padding: 14px; }
    .seoBlock h2 { margin: 0 0 8px; font-size: 16px; }
    .seoBlock p { margin: 0 0 10px; color:#334155; }
    .seoBlock ul { margin: 0; padding-left: 18px; color:#334155; }
    .seoBlock li { margin: 6px 0; }

    .cards { display:grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; margin-top: 16px; }
    .card { background:#fff; border:1px solid #e2e8f0; border-radius: 16px; padding: 14px 14px; box-shadow: 0 10px 20px rgba(2,6,23,.06); }
    .title { font-weight: 700; margin-bottom: 8px; }
    ul { margin: 0; padding-left: 18px; color:#334155; }
    li { margin: 6px 0; }
    .main { max-width: 980px; margin: 0 auto; display:grid; grid-template-columns: 1.1fr .9fr; gap: 16px; padding: 10px 18px 40px; }
    @media (max-width: 880px){ .main{ grid-template-columns: 1fr; } }
    .formWrap { background:#fff; border:1px solid #e2e8f0; border-radius: 18px; padding: 18px; box-shadow: 0 10px 22px rgba(2,6,23,.06); }
    .hint { margin-top: -6px; color:#475569; }
    .form { display:grid; gap: 12px; margin-top: 10px; }
    label { display:grid; gap: 6px; font-size: 14px; }
    input, select { padding: 12px 12px; border:1px solid #cbd5e1; border-radius: 12px; font-size: 14px; outline:none; }
    input:focus, select:focus { border-color:#60a5fa; box-shadow: 0 0 0 4px rgba(96,165,250,.25); }
    small { color:#dc2626; }
    .check { display:flex; align-items:center; gap:10px; margin-top: 4px; }
    .check input { width: 18px; height: 18px; }
    .cta { margin-top: 4px; padding: 12px 14px; border:0; border-radius: 14px; background:#1d4ed8; color:white; font-weight: 700; cursor:pointer; }
    .cta:disabled { opacity:.65; cursor:not-allowed; }
    .privacy { color:#64748b; font-size: 12px; margin: 0; }
    .thanks { padding: 10px 4px; }
    .ghost { margin-top: 10px; border:1px solid #cbd5e1; background:#fff; padding: 10px 12px; border-radius: 12px; cursor:pointer; }
    .error { margin-top: 10px; color:#b91c1c; }
    .proof { padding: 10px 6px; }
    .proof h3 { margin: 8px 0; }
    .proof p { color:#334155; }
    .mini { display:grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 10px; margin-top: 14px; }
    .metric { background: rgba(255,255,255,.7); border:1px solid #e2e8f0; border-radius: 16px; padding: 12px; }
    .k { color:#64748b; font-size: 12px; }
    .v { font-weight: 800; }
    .footer { max-width:980px; margin:0 auto; padding: 14px 18px 24px; color:#64748b; font-size: 12px; }
  `]
})
export class LeadAdsLpComponent implements OnInit {
  loading = false;
  submitted = false;
  errorMsg = '';
  form: any;

  private endpoint = 'https://SEU-ENDPOINT-AQUI/lead';

  // ajuste para o seu domínio real
  private canonicalUrl = 'https://faculdadefilos.edu.br/faculdade-ads-aguas-lindas-go';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private doc: Document
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      whatsapp: ['', [Validators.required, Validators.pattern(/^\D*(\d\D*){11,}$/)]],
      email: ['', [Validators.required, Validators.email]],
      mode: ['Presencial', Validators.required],
      start: ['Imediato', Validators.required],
      consent: [false, Validators.requiredTrue],
    });
  }

ngOnInit(): void {
  const pageTitle = 'Faculdade de ADS em Águas Lindas (GO) | TI, Software e Games';
  const description =
    'Faculdade de Análise e Desenvolvimento de Sistemas (ADS) em Águas Lindas (GO). TI, tecnologia, informática, programação, desenvolvimento de software e games. Cadastre-se e receba informações.';
  const canonical = 'https://SEU-DOMINIO.com/faculdade-ads-aguas-lindas-go';

  // termos/keywords (variações locais)
  const keywords = [
    'TI em Águas Lindas',
    'tecnologia em Águas Lindas',
    'informática em Águas Lindas',
    'faculdade de TI em Águas Lindas',
    'Análise e Desenvolvimento de Sistemas Águas Lindas',
    'ADS Águas Lindas GO',
    'curso de programação Águas Lindas',
    'desenvolvimento de software Águas Lindas',
    'curso de informática Águas Lindas',
    'desenvolvimento de sistemas',
    'programação',
    'desenvolvimento web',
    'aplicativos',
    'banco de dados',
    'games',
    'desenvolvimento de jogos'
  ].join(', ');

  // ✅ Title
  this.title.setTitle(pageTitle);

  // ✅ Básicas
  this.meta.updateTag({ name: 'description', content: description });
  this.meta.updateTag({ name: 'keywords', content: keywords });
  this.meta.updateTag({ name: 'robots', content: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' });
  this.meta.updateTag({ name: 'viewport', content: 'width=device-width, initial-scale=1' });

  // ✅ UX / browser
  this.meta.updateTag({ name: 'theme-color', content: '#1d4ed8' });
  this.meta.updateTag({ name: 'color-scheme', content: 'light' });

  // ✅ "Assunto" (ajuda em alguns crawlers/compartilhamento)
  this.meta.updateTag({ name: 'author', content: 'Colégio e Faculdade Filos' });
  this.meta.updateTag({ name: 'publisher', content: 'Colégio e Faculdade Filos' });
  this.meta.updateTag({ name: 'category', content: 'Educação' });
  this.meta.updateTag({ name: 'subject', content: 'Faculdade de TI, ADS, Desenvolvimento de Software, Games' });

  // ✅ Open Graph
  this.meta.updateTag({ property: 'og:title', content: pageTitle });
  this.meta.updateTag({ property: 'og:description', content: description });
  this.meta.updateTag({ property: 'og:type', content: 'website' });
  this.meta.updateTag({ property: 'og:url', content: canonical });
  this.meta.updateTag({ property: 'og:locale', content: 'pt_BR' });
  this.meta.updateTag({ property: 'og:site_name', content: 'Colégio e Faculdade Filos' });

  // Se tiver uma imagem (recomendado)
  // this.meta.updateTag({ property: 'og:image', content: 'https://SEU-DOMINIO.com/assets/og/ads-aguas-lindas.jpg' });
  // this.meta.updateTag({ property: 'og:image:width', content: '1200' });
  // this.meta.updateTag({ property: 'og:image:height', content: '630' });

  // ✅ Twitter
  this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
  this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
  this.meta.updateTag({ name: 'twitter:description', content: description });
  // this.meta.updateTag({ name: 'twitter:image', content: 'https://SEU-DOMINIO.com/assets/og/ads-aguas-lindas.jpg' });

  // ✅ Canonical
  this.setCanonical(canonical);

  // ✅ Opcional: alternate (se tiver versões)
  // this.setAlternate('pt-BR', canonical);

  // ✅ Geo (não “garante” ranking, mas é ok ter)
  this.meta.updateTag({ name: 'geo.region', content: 'BR-GO' });
  this.meta.updateTag({ name: 'geo.placename', content: 'Águas Lindas' });

  // ✅ Schema JSON-LD (mais rico)
  this.injectJsonLd({
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    "name": "Análise e Desenvolvimento de Sistemas (ADS)",
    "description": "Faculdade de ADS em Águas Lindas (GO) com foco em TI, programação, desenvolvimento de software, projetos práticos e games.",
    "provider": {
      "@type": "CollegeOrUniversity",
      "name": "Colégio e Faculdade Filos",
      "url": "https://SEU-DOMINIO.com"
    },
    "educationalProgramMode": "Presencial/Semipresencial",
    "areaServed": {
      "@type": "City",
      "name": "Águas Lindas",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Águas Lindas",
        "addressRegion": "GO",
        "addressCountry": "BR"
      }
    },
    "teaches": [
      "Programação",
      "Desenvolvimento de Sistemas",
      "Desenvolvimento Web",
      "Banco de Dados",
      "Desenvolvimento de Software",
      "Desenvolvimento de Jogos"
    ],
    "occupationalCategory": "Software Developer",
    "keywords": keywords,
    "url": canonical,
    "about": [
      { "@type": "Thing", "name": "TI em Águas Lindas" },
      { "@type": "Thing", "name": "Tecnologia em Águas Lindas" },
      { "@type": "Thing", "name": "Informática em Águas Lindas" },
      { "@type": "Thing", "name": "Desenvolvimento de Software" },
      { "@type": "Thing", "name": "Games" }
    ]
  });
}

  private setCanonical(url: string) {
    let link: HTMLLinkElement | null = this.doc.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private injectJsonLd(schema: Record<string, any>) {
    const id = 'jsonld-ads-aguas-lindas';
    const existing = this.doc.getElementById(id);
    if (existing) existing.remove();

    const script = this.doc.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.text = JSON.stringify(schema);
    this.doc.head.appendChild(script);
  }

  showError(controlName: string) {
    const c = this.form.get(controlName);
    return !!c && c.invalid && (c.dirty || c.touched);
  }

  submit() {
    this.errorMsg = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const payload = {
      ...this.form.value,
      createdAt: new Date().toISOString(),
      city: 'Águas Lindas (GO)',
      course: 'Análise e Desenvolvimento de Sistemas (ADS)',
      source: 'landing-page'
    };

    this.http.post(this.endpoint, payload).subscribe({
      next: () => {
        this.submitted = true;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        console.log('LEAD (fallback):', payload);
        this.submitted = true;
      }
    });
  }

  reset() {
    this.submitted = false;
    this.form.reset({
      name: '',
      whatsapp: '',
      email: '',
      mode: 'Presencial',
      start: 'Imediato',
      consent: false,
    });
  }
}