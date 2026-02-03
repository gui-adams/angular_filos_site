import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// Imports do Material
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Imports Externos
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import emailjs from '@emailjs/browser';

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
    <div class="modal-header">
      <h2 mat-dialog-title>
        {{ data?.cursoInteresse ? 'Interesse em ' + data.cursoInteresse : 'Inscreva-se na Filos' }}
      </h2>
      <button mat-icon-button (click)="close()" type="button" aria-label="Fechar">
        <mat-icon>close</mat-icon>
      </button>
    </div>

    <mat-dialog-content>
      <form [formGroup]="form" (ngSubmit)="onSubmit()">

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Nome Completo</mat-label>
          <input matInput formControlName="nome" placeholder="Seu nome">
          <mat-error *ngIf="form.get('nome')?.hasError('required')">
            Nome é obrigatório
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>E-mail</mat-label>
          <input matInput formControlName="email" type="email" placeholder="seu@email.com">
          <mat-error *ngIf="form.get('email')?.hasError('email')">
            E-mail inválido
          </mat-error>
          <mat-error *ngIf="form.get('email')?.hasError('required')">
            E-mail é obrigatório
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Telefone / WhatsApp</mat-label>
          <input matInput formControlName="telefone" placeholder="(61) 99999-9999">
          <mat-error *ngIf="form.get('telefone')?.hasError('required')">
            Telefone é obrigatório
          </mat-error>
        </mat-form-field>

        <div class="recaptcha-container">
          <re-captcha
            (resolved)="resolved($event)"
            [siteKey]="siteKey"
            formControlName="recaptcha">
          </re-captcha>
        </div>

        <div class="actions">
          <button mat-raised-button color="primary" type="submit"
                  [disabled]="form.invalid || loading">
            <span *ngIf="!loading">ENVIAR INSCRIÇÃO</span>
            <mat-spinner *ngIf="loading" diameter="20"></mat-spinner>
          </button>
        </div>

        <p *ngIf="feedbackMsg"
           [ngClass]="{'success': isSuccess, 'error': !isSuccess}"
           class="feedback">
          {{ feedbackMsg }}
        </p>
      </form>
    </mat-dialog-content>
  `,
  styles: [`
    .modal-header { display: flex; justify-content: space-between; align-items: center; padding: 0; margin-bottom: 10px; }
    h2 { font-size: 1.2rem; margin: 0; color: #0c2d62; font-weight: 700; }
    .full-width { width: 100%; margin-bottom: 5px; }

    .recaptcha-container {
      display: flex;
      justify-content: center;
      margin: 15px 0;
      transform: scale(0.9);
      transform-origin: center;
    }

    .actions { display: flex; justify-content: flex-end; margin-top: 10px; }

    .feedback { text-align: center; margin-top: 15px; font-weight: bold; font-size: 0.9rem; }
    .success { color: #166534; background: #dcfce7; padding: 10px; border-radius: 8px; }
    .error { color: #991b1b; background: #fee2e2; padding: 10px; border-radius: 8px; }

    mat-spinner { margin-left: 10px; display: inline-block; }
  `]
})
export class SubscriptionModalComponent {
  form: FormGroup;
  loading = false;
  feedbackMsg = '';
  isSuccess = false;

  siteKey = '6LddwV8sAAAAANaFQAY9659XZVvDub23vf5v2zJH';

  private readonly serviceID = 'service_4xq0qtm';
  private readonly templateID = 'template_m1e3hrq';
  private readonly publicKey = 'JWUVW3xnAaDrSDV6b';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SubscriptionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      recaptcha: ['', Validators.required],
    });
  }

  resolved(token: string | null) {
    this.form.get('recaptcha')?.setValue(token);
    this.form.get('recaptcha')?.markAsTouched();
  }

  async onSubmit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.feedbackMsg = '';

    const templateParams = {
      from_name: this.form.value.nome,
      from_email: this.form.value.email,
      phone: this.form.value.telefone,
      interest_origin: this.data?.cursoInteresse || 'Geral/Não especificado',
      message: 'Novo lead captado pelo site.',
      'g-recaptcha-response': this.form.value.recaptcha,
    };

    try {
      await emailjs.send(this.serviceID, this.templateID, templateParams, this.publicKey);

      this.isSuccess = true;
      this.feedbackMsg = 'Recebemos sua inscrição! Entraremos em contato em breve.';
      this.form.reset();

      this.form.get('recaptcha')?.setValue('');

      setTimeout(() => this.dialogRef.close(), 3000);
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      this.isSuccess = false;
      this.feedbackMsg = 'Erro ao enviar. Por favor, tente novamente ou use o WhatsApp.';
    } finally {
      this.loading = false;
    }
  }

  close() {
    this.dialogRef.close();
  }
}
