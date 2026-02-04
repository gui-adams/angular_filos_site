import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SubscriptionModalComponent } from '../components/subscription-modal/subscription-modal.component';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private dialog = inject(MatDialog);

  openForm(origem: string = 'Geral') {
    this.dialog.open(SubscriptionModalComponent, {
      width: '450px',       
      maxWidth: '95vw',     
      maxHeight: '90vh',    
      panelClass: 'subscription-dialog-container',
      autoFocus: false,    
      data: { cursoInteresse: origem }
    });
  }
}