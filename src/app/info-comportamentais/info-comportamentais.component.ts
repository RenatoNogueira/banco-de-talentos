import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { toggleField } from '../utils/field-utils';

declare var bootstrap: any;

@Component({
  selector: 'app-info-comportamentais',
  standalone: true,
  templateUrl: './info-comportamentais.component.html',
  styleUrls: ['./info-comportamentais.component.css']
})
export class InfoComportamentaisComponent implements AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  toggleFieldFromComponent(id: string, enable: boolean) {
    toggleField(id, enable);
  }

ngAfterViewInit(): void {
  if (isPlatformBrowser(this.platformId)) {
    const popoverTriggerList = Array.from(
      document.querySelectorAll('[data-bs-toggle="popover"]')
    );
    popoverTriggerList.forEach((popoverTriggerEl) => {
      new bootstrap.Popover(popoverTriggerEl, {
        trigger: 'hover focus',      // pode ser 'click', 'hover', 'focus', ou 'manual'
        placement: 'top',            // top, bottom, left, right, auto
        animation: true,             // efeito de fade
        delay: { show: 300, hide: 100 },  // delay em ms
        container: 'body',           // evita conflitos com overflows
        boundary: 'window'           // limites do popover
      });
    });
  }
}
}
