// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { ILogin, ILoginResponse } from '../models/auth.mode';
// import { apiEndpoint } from '../constants/constants';
// import { map } from 'rxjs';
// import { TokenService } from './token.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   constructor(private http: HttpClient, private tokenService: TokenService) {}

//   onLogin(data: ILogin) {
//     return this.http
//       .post<ILoginResponse>(`${apiEndpoint.AuthEndpoint.login}`, data)
//       .pipe(
//         map((response) => {
//           if (response) {
//             this.tokenService.setToken(response.token);
//           }
//           return response;
//         })
//       );
//   }

//   onLogout() {
//     this.http.post(`${apiEndpoint.AuthEndpoint.logout}`, '').subscribe({
//       next: (response) => {
//         this.tokenService.removeToken();
//       },
//     });
//   }
// }



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenService } from './token.service';
import { apiEndpoint } from '../constants/constants';
import { IUser } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<IUser | null>;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {
    this.currentUserSubject = new BehaviorSubject<IUser | null>(null);
  }

  onLogin(data: any): Observable<any> {
    return this.http.post<any>(`${apiEndpoint.AuthEndpoint.login}`, data).pipe(
      map(response => {
        if (response && response.token) {
          this.tokenService.setToken(response.token);
          // Stocker les informations de l'utilisateur dans currentUserSubject après la connexion réussie
          this.currentUserSubject.next(response.user);
        }
        return response;
      })
    );
  }

  getCurrentUser(): Observable<IUser | null> {
    return this.currentUserSubject.asObservable();
  }

  onLogout() {
    this.http.post<any>(`${apiEndpoint.AuthEndpoint.logout}`, '').subscribe({
      next: () => {
        this.tokenService.removeToken();
        // Effacer les informations de l'utilisateur après la déconnexion
        this.currentUserSubject.next(null);
      },
    });
  }
}
