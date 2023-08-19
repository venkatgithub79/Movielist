import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { APIRoutes } from '../interfaces/api.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  login(payload: any): Observable<any> {
    return this.http.post(APIRoutes.login, payload);
  }

  getMovies(pageNumber = 1): Observable<any> {
    return this.http.get(APIRoutes.moviesList+'?page='+pageNumber);
  }
}
