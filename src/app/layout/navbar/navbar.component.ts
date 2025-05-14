import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() userName: string = 'Usuário';
  @Input() userAvatar: string = '';
  @Input() showEditButton: boolean = true;
  @Input() editRoute: string = '/formulario'; // <== rota de edição

  @Output() editClicked = new EventEmitter<void>();

  constructor(private router: Router) {}

  onEditClick(): void {
    this.editClicked.emit();
    this.router.navigate([this.editRoute]);
  }
}
