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
      <div class="brand">Você quer uma Faculdade de Tecnologia em Águas Lindas? </div>

      <h1>O Caminho Ninja para o <span class="highlight">Mundo Tech</span></h1>

      <div class="hero-image">
        <img src="assets/naruto.png" alt="Naruto Programador" class="char-img">
      </div>

      <div class="growth-box">
        <span class="tag">DADOS DE MERCADO</span>
        <div class="stat-main">
          <span class="number">400%</span>
          <span class="text">CRESCIMENTO <br>AO ANO</span>
        </div>
        <p>A TI é a área que mais escala no mundo. O "Estalo de Thanos" não atinge quem domina o código.</p>
      </div>

      <div class="tech-grid">
        <div class="tech-card">
          <div class="tech-icon java">JAVA</div>
          <h3>Estilo Madeira: Base Sólida</h3>
          <p>Aprenda a linguagem que é o pilar das maiores empresas do mundo. Robusta e Escalável</p>
        </div>

        <div class="tech-card">
          <div class="tech-icon cloud">CLOUD</div>
          <h3>Invocação Hacker</h3>
          <p>Escale sistemas globalmente como um hacker invoca suas armaduras. Poder infinito processado na nuvem.</p>
        </div>

        <div class="tech-card full">
          <div class="tech-icon ai">IA</div>
          <h3>Domine a IA: Modo Sábio & Protocolo Friday</h3>
          <p>
            Não tenha medo da IA, aprenda a usá-la. Utilize Inteligência Artificial para multiplicar sua produtividade
            como um Jutsu Multiclones das Sombras. Seja o mestre que comanda a tecnologia.
          </p>
        </div>
      </div>
    </header>

    <main class="main-content">
      <section class="marketing-copy">
        <h2>Seu Exame Chunin de Tecnologia</h2>
        <p>
          O mercado não aceita amadores. A solução para a estabilidade financeira é o <strong>preparo técnico de elite</strong>.
        </p>
        <ul class="feat-list">
          <li><strong>Zero Teoria Vazia:</strong> Foco total em projetos e portfólio.</li>
          <li><strong>Arsenal Hacker/Dev:</strong> Java, Cloud Computing, Mobile e IA Generativa.</li>
          <li><strong>Evolução Hacker:</strong> Resolva problemas complexos com o suporte das melhores IAs.</li>
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
            <input type="text" formControlName="name" placeholder="Ex: Peter Parker ou Naruto Uzumaki" />
            <small *ngIf="showError('name')">Informe seu nome.</small>
          </div>

          <div class="input-group">
            <label>WhatsApp (Seu comunicador)</label>
            <input type="tel" formControlName="whatsapp" placeholder="(61) 9xxxx-xxxx" />
            <small *ngIf="showError('whatsapp')">Informe um WhatsApp válido (11+ dígitos).</small>
          </div>

          <div class="input-group">
            <label>E-mail</label>
            <input type="email" formControlName="email" placeholder="seu@email.com" />
            <small *ngIf="showError('email')">Informe um e-mail válido.</small>
          </div>

          <div class="row-2">
            <div class="input-group">
              <label>Você prefere:</label>
              <select formControlName="mode">
                <option value="Presencial">Presencial</option>
                <option value="Semipresencial">Semipresencial</option>
                <option value="EAD">EAD</option>
              </select>
              <small *ngIf="showError('mode')">Selecione uma preferência.</small>
            </div>

            <div class="input-group">
              <label>Quando pretende começar?</label>
              <select formControlName="start">
                <option value="Imediato">Imediato</option>
                <option value="Em 3 meses">Em 3 meses</option>
                <option value="Em 6 meses">Em 6 meses</option>
                <option value="Só pesquisando">Só pesquisando</option>
              </select>
              <small *ngIf="showError('start')">Selecione quando pretende começar.</small>
            </div>
          </div>

          <label class="check">
            <input type="checkbox" formControlName="consent" />
            Aceito receber contato com informações sobre a faculdade.
          </label>
          <small *ngIf="showError('consent')">Você precisa aceitar para enviar.</small>

          <div class="captcha-wrapper">
            <re-captcha (resolved)="onCaptchaResolved($event)"></re-captcha>
            <small *ngIf="showError('recaptcha')">Confirme o reCAPTCHA.</small>
          </div>

          <button class="cta-neon" type="submit" [disabled]="loading || form.invalid">
            {{ loading ? 'ENVIANDO SINAL...' : 'REIVINDICAR MEU DESTINO' }}
          </button>

          <p class="privacy">
            Ao enviar, você concorda com o uso dos seus dados apenas para contato sobre esta pesquisa.
          </p>

          <div class="error" *ngIf="errorMsg">{{ errorMsg }}</div>
        </form>

        <div class="thanks-container" *ngIf="submitted">
          <div class="success-icon">🎯</div>
          <h3>Missão Aceita!</h3>
          <p>Recebemos seu sinal. Fique atento ao WhatsApp para as próximas coordenadas.</p>
          <button class="ghost-btn" (click)="reset()">Voltar</button>
        </div>
      </section>
    </main>

    <footer class="legal-footer">
      <p>© 2026 Faculdade Filos. As referências a personagens e universos da cultura pop são utilizadas de forma ilustrativa, paródica e pedagógica.</p>
    </footer>
  </div>
  `,
  styles: [`
    /* (mantive suas styles — se quiser eu recoloco 100% igual ao seu original) */
    :host { display:block; font-family: 'Inter', sans-serif; }
    .page { background: #050507; color: #e2e8f0; min-height: 100vh; }
    .hero { padding: 60px 20px; text-align: center; max-width: 1000px; margin: 0 auto; }
    .brand { color: #ff9d00; font-weight: 900; letter-spacing: 2px; margin-bottom: 15px; }
    h1 { font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 950; color: #fff; line-height: 1.1; margin-bottom: 30px; }
    .highlight { color: #00d4ff; text-shadow: 0 0 25px rgba(0, 212, 255, 0.5); }
    .hero-image { margin: 0 auto 40px; width: 220px; height: 220px; }
    .char-img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; border: 5px solid #ff9d00; box-shadow: 0 0 40px rgba(255, 157, 0, 0.4); }
    .growth-box { background: rgba(255, 157, 0, 0.05); border: 2px solid #ff9d00; border-radius: 28px; padding: 50px 20px; margin: 40px 0; }
    .number { font-size: 6rem; font-weight: 950; color: #fff; line-height: 1; }
    .text { font-size: 1.4rem; font-weight: 800; color: #ff9d00; text-align: left; line-height: 1.1; }
    .stat-main { display: flex; align-items: center; justify-content: center; gap: 20px; }
    .tech-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-top: 50px; }
    @media (max-width: 768px) { .tech-grid { grid-template-columns: 1fr; } }
    .tech-card { background: #111114; padding: 35px; border-radius: 24px; border: 1px solid #2d2d30; text-align: left; transition: 0.3s; }
    .tech-card:hover { border-color: #00d4ff; transform: translateY(-5px); }
    .tech-card.full { grid-column: 1 / -1; border: 1px solid #00d4ff; background: rgba(0, 212, 255, 0.02); }
    .tech-icon { font-weight: 950; font-size: 0.9rem; padding: 8px 16px; border-radius: 8px; margin-bottom: 20px; display: inline-block; letter-spacing: 1px; }
    .java { background: #f89820; color: #fff; }
    .cloud { background: #232f3e; color: #ff9900; border: 1px solid #ff9900; }
    .ai { background: #00d4ff; color: #050507; }
    .main-content { max-width: 1150px; margin: 0 auto; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 60px; padding: 40px 20px; }
    @media (max-width: 950px) { .main-content { grid-template-columns: 1fr; gap: 40px; } }
    .marketing-copy h2 { font-size: 2.5rem; color: #fff; margin-bottom: 30px; font-weight: 900; }
    .feat-list { list-style: none; padding: 0; margin-top: 40px; }
    .feat-list li { padding: 15px 0 15px 50px; position: relative; font-size: 1.2rem; border-bottom: 1px solid #1e293b; }
    .feat-list li::before { content: '⚡'; position: absolute; left: 10px; color: #00d4ff; font-weight: bold; }
    .formWrap { background: #ffffff; color: #0f172a; padding: 50px 40px; border-radius: 32px; box-shadow: 0 30px 60px -12px rgba(0,0,0,0.6); height: fit-content; }
    .form-header { margin-bottom: 40px; text-align: center; }
    .form-header h3 { font-size: 2rem; margin: 0; font-weight: 900; }
    .form-header p { color: #64748b; margin-top: 10px; }
    .form-container { display: flex; flex-direction: column; gap: 18px; }
    .input-group { display: flex; flex-direction: column; gap: 10px; }
    .input-group label { font-weight: 800; font-size: 0.95rem; color: #334155; }
    input, select { padding: 16px; border: 2px solid #e2e8f0; border-radius: 14px; font-size: 1.05rem; width: 100%; box-sizing: border-box; transition: 0.3s; background: #f8fafc; }
    input:focus, select:focus { border-color: #00d4ff; outline: none; box-shadow: 0 0 0 5px rgba(0, 212, 255, 0.1); background: #fff; }
    .row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .row-2 .input-group label {
  min-height: 44px; /* ajuste: 40~52 dependendo da sua fonte */
  display: flex;
  align-items: flex-end;
  line-height: 1.15;
}

@media (max-width: 650px) {
  .row-2 { grid-template-columns: 1fr; }
  .row-2 .input-group label { min-height: auto; }
}
    @media (max-width: 650px) { .row-2 { grid-template-columns: 1fr; } }
    .check { display:flex; gap:10px; align-items:flex-start; color:#334155; font-weight: 700; }
    .check input { width: 18px; height: 18px; margin-top: 2px; }
    .captcha-wrapper { display: flex; flex-direction: column; align-items: center; min-height: 80px; margin: 10px 0; overflow: hidden; }
    @media (max-width: 480px) { .captcha-wrapper { transform: scale(0.82); margin: 0 -30px; } .formWrap { padding: 40px 20px; } .number { font-size: 4rem; } }
    small { color: #dc2626; font-weight: 700; }
    .cta-neon { background: linear-gradient(90deg, #00d4ff, #0088ff); color: #fff; padding: 18px; border: none; border-radius: 16px; font-weight: 950; font-size: 1.1rem; cursor: pointer; transition: 0.4s; box-shadow: 0 10px 25px rgba(0, 212, 255, 0.3); letter-spacing: 1px; }
    .cta-neon:hover { transform: translateY(-2px); box-shadow: 0 15px 35px rgba(0, 212, 255, 0.5); }
    .cta-neon:disabled { opacity: .6; cursor: not-allowed; transform: none; box-shadow: none; }
    .privacy { color:#64748b; font-size: 12px; margin: 0; text-align: center; }
    .error { color:#b91c1c; font-weight: 800; text-align: center; }
    .thanks-container { text-align: center; padding: 30px 0; }
    .success-icon { font-size: 5rem; margin-bottom: 20px; }
    .ghost-btn { background: none; border: 2px solid #cbd5e1; padding: 15px 30px; border-radius: 12px; cursor: pointer; font-weight: 700; margin-top: 30px; color: #64748b; }
    .legal-footer { padding: 80px 20px; text-align: center; font-size: 14px; color: #94a3b8; opacity: 0.85; line-height: 1.6; max-width: 1000px; margin: 0 auto; }
  `],
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
      'Faculdade de Análise e Desenvolvimento de Sistemas (ADS) em Águas Lindas (GO). TI, tecnologia, informática e IA. Cadastre-se.';
    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: description });
    this.setCanonical(this.canonicalUrl);
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
      preferencia: this.form.value.mode,
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
        const apiMsg = err?.error?.error || err?.error?.message;
        this.errorMsg = apiMsg ? String(apiMsg) : 'Erro ao enviar. Verifique o reCAPTCHA e tente novamente.';
        // força o usuário marcar de novo
        this.form.patchValue({ recaptcha: null });
      },
    });
  }

  reset() {
    this.submitted = false;
    this.errorMsg = '';

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