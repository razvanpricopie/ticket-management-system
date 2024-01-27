import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/app/core/models/category.model';

@Component({
  selector: 'app-category-details-dialog',
  templateUrl: './category-details-dialog.component.html',
  styleUrls: ['./category-details-dialog.component.scss']
})
export class CategoryDetailsDialogComponent implements OnInit{
  clonedCategoryData: Category;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Category,
    private dialog: MatDialogRef<CategoryDetailsDialogComponent>
  ) {}


  ngOnInit(): void {
    this.data.categoryId && (this.clonedCategoryData = JSON.parse(JSON.stringify(this.data)))
  }

  close(){
    this.dialog.close();
  }
}
