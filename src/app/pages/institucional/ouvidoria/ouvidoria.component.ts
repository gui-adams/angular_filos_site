import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import emailjs from '@emailjs/browser';
import { environment } from '../../../../environments/environment';

declare const grecaptcha: any;

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
  ],
  templateUrl: './ouvidoria.component.html',
  styleUrls: ['./ouvidoria.component.scss'],
})
export class OuvidoriaComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);
  private fb = inject(FormBuilder);

  form: FormGroup;
  loading = false;
  feedbackMsg = '';
  isSuccess = false;

  private readonly serviceID = environment.emailjs.serviceID;
  private readonly templateID = environment.emailjs.templateIDouvidoria;
  private readonly publicKey = environment.emailjs.publicKey;

  // ATENÇÃO: Esta chave deve ser OBRIGATORIAMENTE uma chave gerada para o reCAPTCHA v3.
  // Chaves do v2 não funcionam no script do v3.
  readonly recaptchaSiteKey = environment.recaptcha.siteKey;

  constructor() {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      assunto: ['', Validators.required],
      mensagem: ['', [Validators.required, Validators.minLength(10)]],
      // O campo "recaptcha" foi removido daqui pois a validação agora é invisível
    });
  }

  ngOnInit(): void {
    this.title.setTitle('Ouvidoria | Faculdade Filos');
    this.meta.updateTag({
      name: 'description',
      content: 'Canal oficial de comunicação da Faculdade Filos para manifestações da comunidade.',
    });
  }

  showError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  async onSubmit() {
    if (this.loading) return;

    this.feedbackMsg = '';
    this.isSuccess = false;

    // Apenas valida os campos normais do formulário
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.feedbackMsg = 'Preencha os campos obrigatórios.';
      return;
    }

    this.loading = true;

    try {
      grecaptcha.ready(async () => {
        try {
          const token = await grecaptcha.execute(this.recaptchaSiteKey, { action: 'enviar_ouvidoria' });

          const templateParams = {
            from_name: this.form.value.nome,
            from_email: this.form.value.email,
            subject: this.form.value.assunto,
            message: this.form.value.mensagem,
            'g-recaptcha-response': token, 
            origin: 'Ouvidoria Institucional',
          };

          // 4. Dispara o e-mail
          const res = await emailjs.send(
            this.serviceID,
            this.templateID,
            templateParams,
            this.publicKey
          );

          if (res.status === 200) {
            this.isSuccess = true;
            this.feedbackMsg =
              '✅ Obrigado! Sua manifestação foi enviada com sucesso. Nossa equipe analisará e, se necessário, entraremos em contato.';

            this.form.reset({
              nome: '',
              email: '',
              assunto: '',
              mensagem: '',
            });
          } else {
            throw new Error('Erro no status do envio');
          }
        } catch (error) {
          console.error('Erro ao enviar ouvidoria:', error);
          this.isSuccess = false;
          this.feedbackMsg =
            'Não foi possível enviar sua manifestação no momento. Por favor, tente novamente mais tarde.';
        } finally {
          this.loading = false;
        }
      });
    } catch (error) {
      console.error('Erro fatal ao iniciar o reCAPTCHA:', error);
      this.loading = false;
      this.feedbackMsg = 'Erro interno ao validar a segurança. Tente recarregar a página.';
    }
  }
}