import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';

// Importações do Cookie Consent
import { NgcCookieConsentService, NgcStatusChangeEvent } from 'ngx-cookieconsent';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  
  private ccService = inject(NgcCookieConsentService);
  private statusChangeSubscription!: Subscription;

  ngOnInit() {
    this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        
        if (event.status === 'dismiss') {
          this.habilitarAnalytics();
        }
        
        if (event.status === 'deny') {
          this.desabilitarAnalytics();
        }
      });
  }

  ngOnDestroy() {
    if (this.statusChangeSubscription) {
      this.statusChangeSubscription.unsubscribe();
    }
  }


  private habilitarAnalytics() {
    console.log('✅ Cookies aceitos. Inicializando Google Analytics / Pixel...');
  }

  private desabilitarAnalytics() {
    console.log('❌ Cookies recusados.');
  }
}