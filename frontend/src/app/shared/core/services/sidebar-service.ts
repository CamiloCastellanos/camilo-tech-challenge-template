import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Response } from '../../../models/response';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  constructor(private readonly http: HttpClient) { }

  async getMenu() {
    return await firstValueFrom(this.http.get('https://localhost:44368/api/Menu/GetMenu')).then(
      (resp) => {
        return resp as Response
      }
    );
  }
}
