﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get(`${environment.apiUrl}/users`);
    }

    getById(id: string) {
        return this.http.get(`${environment.apiUrl}/users/${id}`);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    // update(user: User) {
    //     return this.http.patch(`${environment.apiUrl}/users/${user.id}`, user);
    // }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`);
    }
}