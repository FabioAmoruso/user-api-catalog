import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Response } from '../interfaces/response.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl: string = 'https://randomuser.me/api/';

  constructor(private http: HttpClient) { }

  // fetch users
  getUsers(size: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?results=${size}`).pipe(
      map(response => this.processResponse(response))
    );
  }

  // fetch a user using the id.
  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?id=${id}`).pipe(
      map(response => this.processResponse(response))
    );
  }

  private processResponse(response: Response): Response {
    return {
      info: { ...response.info },
      results: response.results.map((user: any) => (<User>{
        id: user.login.uuid,
        firstName: user.name.first,
        lastName: user.name.last,
        email: user.email,
        username: user.login.username,
        gender: user.gender,
        address: `${user.location.street.number} ${user.location.street.name}, ${user.location.city} - ${user.location.country}`,
        dateOfBirth: user.dob.date,
        phone: user.phone,
        imageUrl: user.picture.medium,
        coordinate: {latitude: +user.location.coordinates.latitude, longitude: +user.location.coordinates.longitude}
      }))
    };
  }

}
