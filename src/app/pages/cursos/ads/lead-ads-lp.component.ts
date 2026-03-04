import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Meta, Title } from '@angular/platform-browser';

import {
  RecaptchaModule,
  RECAPTCHA_SETTINGS,
  RecaptchaSettings
} from 'ng-recaptcha';

@Component({
  selector: 'app-lead-ads-lp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RecaptchaModule],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6Le85H8sAAAAAOW-TQer2TAV8bDavtGnBjydN-S6',
      } as RecaptchaSettings,
    },
  ],
template: `
  <div class="page">
    <header class="hero">
      <div class="brand">MISSÃO ADS • ÁGUAS LINDAS</div>
      
      <h1>O Caminho Ninja para o <span class="highlight">Mundo Tech</span></h1>
      
      <div class="hero-image">
        <img src="assets/naruto.png" alt="Naruto Programador" class="char-img">
      </div>

      <div class="growth-box">
        <span class="tag">MERCADO REAL</span>
        <div class="stat-main">
          <span class="number">400%</span>
          <span class="text">CRESCIMENTO <br>AO ANO</span>
        </div>
        <p>Enquanto setores fecham, a TI acelera. Não fique para trás.</p>
      </div>

      <div class="tech-grid">
        <div class="tech-card">
          <div class="tech-icon java">JAVA</div>
          <h3>Programação com Naruto</h3>
          <p>Domine a linguagem que é o "Estilo Madeira" do mercado: robusta, segura e indestrutível.</p>
        </div>

        <div class="tech-card">
          <div class="tech-icon aws">Cloud</div>
          <h3>Nuvem: Invocação de Poder</h3>
          <p>Escale sistemas como Tony Stark com o Jarvis. Poder infinito na nuvem da AWS.</p>
        </div>
      </div>
    </header>

    <main class="main-content">
      <section class="marketing-copy">
        <h2>Prepare-se para o Exame Chunin da TI</h2>
        <p>
          O mercado não aceita amadores. A solução para o medo do desemprego é o <strong>preparo técnico de elite</strong>.
        </p>
        <ul class="feat-list">
          <li><strong>Zero Teoria Vazia:</strong> Foco em projetos reais.</li>
          <li><strong>Arsenal Moderno:</strong> Java, Cloud e Mobile.</li>
          <li><strong>Mindset Vingador:</strong> Resolva problemas como o Stark.</li>
        </ul>
      </section>

      <section class="formWrap">
        <div class="form-header">
          <h3>Inicie seu Treinamento</h3>
          <p>Valide seu interesse na turma de Águas Lindas.</p>
        </div>

        <form [formGroup]="form" (ngSubmit)="submit()" class="form-container" *ngIf="!submitted">
          <div class="input-group">
            <label>Nome de Civil (ou Ninja)</label>
            <input type="text" formControlName="name" placeholder="Ex: Peter Parker" />
          </div>

          <div class="input-group">
            <label>WhatsApp (Seu comunicador)</label>
            <input type="tel" formControlName="whatsapp" placeholder="(61) 9xxxx-xxxx" />
          </div>

          <div class="input-group">
            <label>E-mail</label>
            <input type="email" formControlName="email" placeholder="seu@email.com" />
          </div>

          <div class="captcha-wrapper">
            <re-captcha (resolved)="onCaptchaResolved($event)"></re-captcha>
          </div>

          <button class="cta-neon" type="submit" [disabled]="loading">
            {{ loading ? 'PROCESSANDO...' : 'REIVINDICAR MEU DESTINO' }}
          </button>
        </form>

        <div class="thanks-container" *ngIf="submitted">
          <div class="success-icon">🎯</div>
          <h3>Missão Aceita!</h3>
          <p>Em breve enviaremos os detalhes via WhatsApp.</p>
          <button class="ghost-btn" (click)="reset()">Voltar</button>
        </div>
      </section>
    </main>
  </div>
  `,
  styles: [`
    :host { display:block; font-family: 'Inter', sans-serif; }
    .page { background: #050507; color: #e2e8f0; min-height: 100vh; padding-bottom: 80px; }
    
    .hero { padding: 60px 20px; text-align: center; max-width: 1000px; margin: 0 auto; }
    .brand { color: #ff9d00; font-weight: 900; letter-spacing: 2px; margin-bottom: 15px; }
    h1 { font-size: clamp(2.2rem, 5vw, 3.8rem); font-weight: 900; color: #fff; line-height: 1.1; margin-bottom: 30px; }
    .highlight { color: #00d4ff; text-shadow: 0 0 20px rgba(0, 212, 255, 0.4); }

    .hero-image { margin: 0 auto 30px; width: 180px; height: 180px; }
    .char-img { 
      width: 100%; height: 100%; object-fit: cover; border-radius: 50%; 
      border: 4px solid #ff9d00; box-shadow: 0 0 30px rgba(255, 157, 0, 0.5); 
    }

    .growth-box {
      background: rgba(255, 157, 0, 0.08); border: 2px solid #ff9d00;
      border-radius: 24px; padding: 40px 20px; margin: 40px 0;
    }
    .number { font-size: 5rem; font-weight: 950; color: #fff; line-height: 1; }
    .text { font-size: 1.3rem; font-weight: 800; color: #ff9d00; text-align: left; }
    .stat-main { display: flex; align-items: center; justify-content: center; gap: 20px; }

    .tech-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 40px; }
    @media (max-width: 768px) { .tech-grid { grid-template-columns: 1fr; } }
    .tech-card { background: #111114; padding: 30px; border-radius: 20px; border: 1px solid #2d2d30; text-align: left; }
    .tech-icon { font-weight: 900; font-size: 0.8rem; padding: 6px 12px; border-radius: 6px; margin-bottom: 15px; display: inline-block; }
    .java { background: #f89820; color: #fff; }
    .aws { background: #232f3e; color: #ff9900; border: 1px solid #ff9900; }

    .main-content { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 50px; padding: 20px; }
    @media (max-width: 900px) { .main-content { grid-template-columns: 1fr; } }

    .marketing-copy h2 { font-size: 2.2rem; color: #fff; margin-bottom: 25px; }
    .feat-list { list-style: none; padding: 0; margin-top: 30px; }
    .feat-list li { padding: 12px 0 12px 40px; position: relative; font-size: 1.1rem; }
    .feat-list li::before { content: '✔️'; position: absolute; left: 0; color: #00d4ff; font-weight: bold; }

    /* FORM CORRIGIDO - SEM APERTO */
    .formWrap { 
      background: #fff; color: #111; padding: 40px 30px; border-radius: 28px; 
      box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); height: fit-content;
    }
    .form-header { margin-bottom: 30px; text-align: center; }
    .form-header h3 { font-size: 1.8rem; margin: 0; font-weight: 800; }
    .form-container { display: flex; flex-direction: column; gap: 20px; }
    
    .input-group { display: flex; flex-direction: column; gap: 8px; }
    .input-group label { font-weight: 700; font-size: 0.9rem; color: #475569; }
    input { padding: 14px; border: 2px solid #e2e8f0; border-radius: 12px; font-size: 1rem; width: 100%; box-sizing: border-box; }
    input:focus { border-color: #00d4ff; outline: none; box-shadow: 0 0 0 4px rgba(0, 212, 255, 0.1); }
    
    .captcha-wrapper { 
      margin: 10px 0; 
      display: flex; 
      justify-content: center;
      min-height: 78px;
    }
    
    /* Ajuste para o Captcha não vazar em celulares */
    @media (max-width: 400px) {
      .captcha-wrapper { transform: scale(0.85); margin: 0 -20px; }
      .formWrap { padding: 30px 20px; }
    }

    .cta-neon { 
      background: #00d4ff; color: #000; padding: 20px; border: none; border-radius: 14px; 
      font-weight: 900; font-size: 1.1rem; cursor: pointer; transition: 0.3s;
      box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);
    }
    .cta-neon:hover { transform: translateY(-3px); background: #00c2e9; }
    
    .thanks-container { text-align: center; padding: 20px 0; }
    .success-icon { font-size: 4rem; margin-bottom: 15px; }
    .ghost-btn { background: none; border: 2px solid #cbd5e1; padding: 12px 25px; border-radius: 10px; cursor: pointer; font-weight: 600; margin-top: 20px; }
  `]
})
export class LeadAdsLpComponent implements OnInit {
  loading = false;
  submitted = false;
  errorMsg = '';
  form: any;

  private endpoint = 'https://faculdadefilos.edu.br/api/leads';

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

      recaptcha: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    const pageTitle = 'Faculdade de ADS em Águas Lindas (GO) | TI, Software e Games';
    const description =
      'Faculdade de Análise e Desenvolvimento de Sistemas (ADS) em Águas Lindas (GO). TI, tecnologia, informática, programação, desenvolvimento de software e games. Cadastre-se e receba informações.';
    const canonical = this.canonicalUrl;

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

    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'keywords', content: keywords });
    this.meta.updateTag({ name: 'robots', content: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' });
    this.meta.updateTag({ name: 'viewport', content: 'width=device-width, initial-scale=1' });

    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: canonical });
    this.meta.updateTag({ property: 'og:locale', content: 'pt_BR' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Colégio e Faculdade Filos' });

    this.setCanonical(canonical);
  }

  onCaptchaResolved(token: string | null) {
    this.form.patchValue({ recaptcha: token });
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
      nome: (this.form.value.name || '').trim(),
      whatsapp: (this.form.value.whatsapp || '').trim(),
      email: (this.form.value.email || '').trim(),

      preferencia: this.form.value.mode as 'Presencial' | 'Semipresencial' | 'EAD',

      inicio: this.form.value.start,
      consentimento: !!this.form.value.consent,

      recaptchaToken: this.form.value.recaptcha,
    };

    this.http.post(this.endpoint, payload).subscribe({
      next: () => {
        this.submitted = true;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = 'Erro ao enviar. Verifique o reCAPTCHA e tente novamente.';
        // opcional: resetar recaptcha
        this.form.patchValue({ recaptcha: null });
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
      recaptcha: null,
    });
  }
}