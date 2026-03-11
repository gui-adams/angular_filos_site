import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environment';

// 1. Declaramos a variável global do script do Google
declare const grecaptcha: any;

@Component({
  selector: 'app-subscription-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <button class="close-btn" (click)="close()" type="button" aria-label="Fechar">
      <mat-icon>close</mat-icon>
    </button>

    <div class="header-section">
      <h2>Vem ser Filos!</h2>
      <p class="subtitle">
        Eu quero receber informações exclusivas da <strong>Faculdade Filos</strong>
      </p>
    </div>

    <mat-dialog-content class="scrollable-content">
      <a href="https://wa.me/5561999061757?text=Olá! Gostaria de mais informações sobre a Faculdade Filos."
         target="_blank"
         class="whatsapp-card">
        <div class="wa-icon-box"><mat-icon>chat</mat-icon></div>
        <div class="wa-text">
          <span class="wa-label">Rápido e fácil</span>
          <span class="wa-title">WhatsApp</span>
        </div>
        <div class="wa-arrow"><mat-icon>chevron_right</mat-icon></div>
      </a>

      <div class="divider"><span>ou</span></div>

      <p class="form-instruction">Deixe seus dados para contato:</p>

      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="outline" class="custom-field">
          <mat-label>Nome</mat-label>
          <input matInput formControlName="nome">
          <mat-error *ngIf="form.get('nome')?.hasError('required')">Obrigatório</mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="custom-field">
          <mat-label>Telefone</mat-label>
          <input matInput formControlName="telefone" placeholder="(61) 99999-9999">
          <mat-error *ngIf="form.get('telefone')?.hasError('required')">Obrigatório</mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="custom-field">
          <mat-label>E-mail</mat-label>
          <input matInput formControlName="email" type="email">
          <mat-error *ngIf="form.get('email')?.hasError('required')">Obrigatório</mat-error>
          <mat-error *ngIf="form.get('email')?.hasError('email')">E-mail inválido</mat-error>
        </mat-form-field>

        <p class="legal-text">
          Estou de acordo com a <a href="#">Política de Privacidade</a> e autorizo o envio de conteúdos da Faculdade Filos.
        </p>

        <button mat-flat-button type="submit" class="btn-submit" [disabled]="loading">
          <span *ngIf="!loading">Enviar</span>
          <mat-spinner *ngIf="loading" diameter="20" color="accent"></mat-spinner>
        </button>

        <p *ngIf="feedbackMsg" class="feedback" [ngClass]="isSuccess ? 'success' : 'error'">
          {{ feedbackMsg }}
        </p>
      </form>
    </mat-dialog-content>
  `,
  styleUrls: ['./subscription-modal.component.scss']
})
export class SubscriptionModalComponent {
  form: FormGroup;
  loading = false;
  feedbackMsg = '';
  isSuccess = false;

  private readonly serviceID = environment.emailjs.serviceID;
  private readonly templateID = environment.emailjs.templateID;
  private readonly publicKey = environment.emailjs.publicKey;

  // 2. Adicionamos a sua chave do reCAPTCHA v3
  readonly recaptchaSiteKey = environment.recaptcha.siteKey;
  
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SubscriptionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async onSubmit() {
    if (this.loading) return;

    this.feedbackMsg = '';
    this.isSuccess = false;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    try {
      // 3. Preparamos o reCAPTCHA
      grecaptcha.ready(async () => {
        try {
          // 4. Executamos a verificação invisível (ação: modal_lead)
          const token = await grecaptcha.execute(this.recaptchaSiteKey, { action: 'modal_lead' });

          // 5. Incluímos o token no envio do EmailJS
          const templateParams = {
            from_name: this.form.value.nome,
            from_email: this.form.value.email,
            phone: this.form.value.telefone,
            interest_origin: this.data?.cursoInteresse || 'Geral',
            message: 'Novo lead (Modal UDF Style)',
            'g-recaptcha-response': token, 
          };

          await emailjs.send(this.serviceID, this.templateID, templateParams, this.publicKey);
          
          this.isSuccess = true;
          this.feedbackMsg = 'Recebemos seu contato!';

          this.form.reset({
            nome: '',
            telefone: '',
            email: '',
          });

          setTimeout(() => this.dialogRef.close(), 3000);
        } catch (error) {
          console.error('Erro no EmailJS ou na geração do token:', error);
          this.isSuccess = false;
          this.feedbackMsg = 'Erro ao enviar. Tente novamente.';
        } finally {
          this.loading = false;
        }
      });
    } catch (error) {
      console.error('Erro fatal ao iniciar o reCAPTCHA:', error);
      this.loading = false;
      this.feedbackMsg = 'Erro interno de segurança. Tente recarregar a página.';
    }
  }

  close() {
    this.dialogRef.close();
  }
}