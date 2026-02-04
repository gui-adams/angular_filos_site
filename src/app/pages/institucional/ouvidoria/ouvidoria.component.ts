import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { RecaptchaFormsModule, RecaptchaModule, RecaptchaComponent } from 'ng-recaptcha';

import emailjs from '@emailjs/browser';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-ouvidoria',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RecaptchaModule,      
    RecaptchaFormsModule, 
  ],
  templateUrl: './ouvidoria.component.html',
  styleUrls: ['./ouvidoria.component.scss'],
})
export class OuvidoriaComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);
  private fb = inject(FormBuilder);

  @ViewChild(RecaptchaComponent) recaptchaCmp?: RecaptchaComponent;

  form: FormGroup;
  loading = false;
  feedbackMsg = '';
  isSuccess = false;

  private readonly serviceID = environment.emailjs.serviceID;
  private readonly templateID = environment.emailjs.templateIDouvidoria; // <--- USANDO A NOVA CHAVE
  private readonly publicKey = environment.emailjs.publicKey;

  constructor() {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      assunto: ['', Validators.required],
      mensagem: ['', [Validators.required, Validators.minLength(10)]],
      recaptcha: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.title.setTitle('Ouvidoria | Faculdade Filos');
    this.meta.updateTag({
      name: 'description',
      content: 'Canal oficial de comunicação da Faculdade Filos para manifestações da comunidade.',
    });
  }

  resolved(token: string | null) {
  }

  async onSubmit() {
    if (this.form.invalid || this.loading) return;

    this.loading = true;
    this.feedbackMsg = '';
    this.isSuccess = false;

    const templateParams = {
      from_name: this.form.value.nome,
      from_email: this.form.value.email,
      subject: this.form.value.assunto,
      message: this.form.value.mensagem,
      'g-recaptcha-response': this.form.value.recaptcha,
      origin: 'Ouvidoria Institucional',
    };

    try {
      const res = await emailjs.send(
        this.serviceID, 
        this.templateID, // Usa o template_hir47k6 definido acima
        templateParams, 
        this.publicKey
      );

      if (res.status === 200) {
        this.isSuccess = true;
        this.feedbackMsg = '✅ Obrigado! Sua manifestação foi enviada com sucesso. Nossa equipe analisará e, se necessário, entraremos em contato.';
        
        this.form.reset();
        this.recaptchaCmp?.reset(); 
      } else {
        throw new Error('Erro no status do envio');
      }
    } catch (error) {
      console.error('Erro ao enviar ouvidoria:', error);
      this.isSuccess = false;
      this.feedbackMsg = 'Não foi possível enviar sua manifestação no momento. Por favor, tente novamente mais tarde.';
      
      this.recaptchaCmp?.reset(); 
    } finally {
      this.loading = false;
    }
  }
}