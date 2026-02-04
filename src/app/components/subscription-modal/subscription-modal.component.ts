import { Component, Inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { RecaptchaModule, RecaptchaFormsModule, RecaptchaComponent } from 'ng-recaptcha';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environment';

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
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  template: `
    <button class="close-btn" (click)="close()" type="button" aria-label="Fechar">
      <mat-icon>close</mat-icon>
    </button>

    <div class="header-section">
      <h2>Quero me cadastrar!</h2>
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

        <div class="recaptcha-container">
          <re-captcha formControlName="recaptcha" (resolved)="resolved($event)"></re-captcha>
        </div>

        <button mat-flat-button type="submit" class="btn-submit" [disabled]="form.invalid || loading">
          <span *ngIf="!loading">Enviar</span>
          <mat-spinner *ngIf="loading" diameter="20" color="accent"></mat-spinner>
        </button>

        <p *ngIf="feedbackMsg" class="feedback" [ngClass]="isSuccess ? 'success' : 'error'">
          {{ feedbackMsg }}
        </p>
      </form>

    </mat-dialog-content>
  `,
  styleUrls: ['./subscription-modal.component.scss'] // <--- Link para o arquivo SCSS criado
})
export class SubscriptionModalComponent {
  form: FormGroup;
  loading = false;
  feedbackMsg = '';
  isSuccess = false;

  @ViewChild(RecaptchaComponent) recaptchaCmp?: RecaptchaComponent;

  private readonly serviceID = environment.emailjs.serviceID;
  private readonly templateID = environment.emailjs.templateID;
  private readonly publicKey = environment.emailjs.publicKey;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SubscriptionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      recaptcha: ['', Validators.required],
    });
  }

  resolved(token: string | null) { }

  async onSubmit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.feedbackMsg = '';

    const templateParams = {
      from_name: this.form.value.nome,
      from_email: this.form.value.email,
      phone: this.form.value.telefone,
      interest_origin: this.data?.cursoInteresse || 'Geral',
      message: 'Novo lead (Modal UDF Style)',
      'g-recaptcha-response': this.form.value.recaptcha,
    };

    try {
      await emailjs.send(this.serviceID, this.templateID, templateParams, this.publicKey);
      this.isSuccess = true;
      this.feedbackMsg = 'Recebemos seu contato!';
      this.form.reset();
      this.recaptchaCmp?.reset();
      setTimeout(() => this.dialogRef.close(), 3000);
    } catch (error) {
      console.error(error);
      this.isSuccess = false;
      this.feedbackMsg = 'Erro ao enviar. Tente novamente.';
      this.recaptchaCmp?.reset();
    } finally {
      this.loading = false;
    }
  }

  close() {
    this.dialogRef.close();
  }
}