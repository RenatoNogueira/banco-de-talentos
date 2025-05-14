import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="container logout-container">
  <div class="logout-alert">
    <span class="logout-message">Saindo em {{ countdown }}...</span>
  </div>
</div>`,
  styles: `.logout-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.logout-alert {
  background-color: #ffe08a;
  border-left: 6px solid #ffbf00;
  padding: 20px 30px;
  border-radius: 12px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  animation: fadeIn 0.8s ease-out;
}

.logout-message {
  font-size: 1.5rem;
  font-weight: 500;
  color: #5c4400;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`
})
export class LogoutComponent implements OnInit {

  countdown = 3; // segundos

  constructor(private router: Router) {}

  ngOnInit() {
    localStorage.removeItem('user');

    const interval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        clearInterval(interval);
        this.router.navigate(['/auth']);
      }
    }, 1000);
  }
}
