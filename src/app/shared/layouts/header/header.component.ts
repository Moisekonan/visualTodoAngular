import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../../core/services/token.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { IUser } from '../../../core/models/auth.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isAuthenticated$: any;
  nameCurrentUser: string = '';
  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.isAuthenticated$ = this.tokenService.isAuthentication;
    // recuper le nom de l'utilisateur du localstorage
    this.nameCurrentUser = JSON.parse(localStorage.getItem('user') || '{}').username || '';
  }

  onLogout() {
    this.authService.onLogout();
  }
}
