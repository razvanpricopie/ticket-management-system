import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly basePath = environment.API_ENDPOINT;

  constructor(private httpClient: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(
      `${this.basePath}/api/category/allcategories`
    );
  }

  //to complete this method
  getCategoryWithEvents(
    categoryId: string,
    includeHistory: boolean
  ): Observable<Category> {
    return this.httpClient.get<Category>(
      `${this.basePath}/api/category/${categoryId}?includeHistory=${includeHistory}`
    );
  }
}
