// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://api.github.com';

  constructor(private http: HttpClient) { }

  getUser(username: string): Observable<any> {
    // Simulate a delay of 5 seconds (5000 milliseconds)
    return this.http.get(`${this.apiUrl}/users/${username}`).pipe(delay( 0));
  }

  getUserRepositories(username: string, page: number, perPage: number): Observable<any[]> {
    const params = { page: page.toString(), per_page: perPage.toString() };
    // Simulate a delay of 5 seconds (5000 milliseconds)
    return this.http.get<any[]>(`${this.apiUrl}/users/${username}/repos`, { params }).pipe(delay( 0));
  }
}
