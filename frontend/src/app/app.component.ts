import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <nav class="navbar">
      <div class="nav-inner">
        <span class="brand">👤 EmpManager</span>
      </div>
    </nav>
    <main>
      <router-outlet />
    </main>
  `,
  styles: [`
    .navbar {
      background: white;
      border-bottom: 1px solid #e2e8f0;
      padding: 0 1.5rem;
      height: 58px;
      display: flex;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 1px 4px rgba(0,0,0,0.05);
    }
    .nav-inner { max-width: 1100px; width: 100%; margin: 0 auto; }
    .brand {
      font-size: 1.05rem;
      font-weight: 700;
      color: #1e293b;
      letter-spacing: -0.02em;
    }
    main {
      min-height: calc(100vh - 58px);
      background: #f8fafc;
    }
  `]
})
export class AppComponent {}
