import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SubscriptionModalComponent } from '../components/subscription-modal/subscription-modal.component';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private dialog: MatDialog) { }

  // 1. Adicionamos o parâmetro 'origem' (pode ser null se não tiver)
  openForm(origem: string = 'Geral') {
    this.dialog.open(SubscriptionModalComponent, {
      width: '450px',
      maxWidth: '95vw',
      panelClass: 'subscription-dialog-container',
      autoFocus: false,
      data: {
        cursoInteresse: origem
      }
    });
  }
}