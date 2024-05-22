import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Category, CreateCategory, UpdateCategory } from '../models/category.model';

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

  getCategoryWithEvents(
    categoryId: string,
    includeHistory: boolean
  ): Observable<Category> {
    return this.httpClient.get<Category>(
      `${this.basePath}/api/category/${categoryId}?includeHistory=${includeHistory}`
    );
  }

  createCategory(createdCategory: CreateCategory): Observable<string> {
    const formData = new FormData();
    formData.append('name', createdCategory.name);
    formData.append('image', createdCategory.image);

    return this.httpClient.post<string>(
      `${this.basePath}/api/category/addcategory`,
      formData
    );
  }

  updateCategory(updatedCategory: UpdateCategory): Observable<void> {
    const formData = new FormData();
    formData.append('categoryId', updatedCategory.categoryId);
    formData.append('name', updatedCategory.name);
    formData.append('image', updatedCategory.image);

    return this.httpClient.put<void>(
      `${this.basePath}/api/category/updatecategory`,
      formData
    );
  }

  deleteCategory(categoryId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.basePath}/api/category/${categoryId}`);
  }
}
