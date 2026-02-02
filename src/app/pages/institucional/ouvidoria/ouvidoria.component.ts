import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-ouvidoria',
  standalone: true,
  imports: [
    CommonModule, NgOptimizedImage, MatIconModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, 
    MatProgressSpinnerModule, RecaptchaModule, RecaptchaFormsModule
  ],
  templateUrl: './ouvidoria.component.html',
  styleUrls: ['./ouvidoria.component.scss']
})
export class OuvidoriaComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);
  private fb = inject(FormBuilder);

  form: FormGroup;
  loading = false;
  feedbackMsg = '';
  isSuccess = false;

  constructor() {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      assunto: ['', Validators.required],
      mensagem: ['', [Validators.required, Validators.minLength(10)]],
      recaptcha: ['', Validators.required] // Validação do Captcha
    });
  }

  ngOnInit(): void {
    this.title.setTitle('Ouvidoria | Faculdade Filos');
    this.meta.updateTag({ 
      name: 'description', 
      content: 'Canal oficial de comunicação da Faculdade Filos para manifestações da comunidade.' 
    });
  }

  async onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.feedbackMsg = '';

    const templateParams = {
      from_name: this.form.value.nome,
      from_email: this.form.value.email,
      subject: this.form.value.assunto,
      message: this.form.value.mensagem,
      'g-recaptcha-response': this.form.value.recaptcha,
      origin: 'Ouvidoria Institucional'
    };

    try {
      await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_PUBLIC_KEY');
      this.isSuccess = true;
      this.feedbackMsg = 'Manifestação enviada com sucesso!';
      this.form.reset();
    } catch (error) {
      this.isSuccess = false;
      this.feedbackMsg = 'Erro ao enviar. Tente o WhatsApp ou tente mais tarde.';
    } finally {
      this.loading = false;
    }
  }

  resolved(token: string | null) {
    console.log('Captcha resolvido');
  }
}