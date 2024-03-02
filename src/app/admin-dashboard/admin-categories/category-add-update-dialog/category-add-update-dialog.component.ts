import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  Category,
  CreateCategory,
  UpdateCategory,
} from 'src/app/core/models/category.model';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-category-add-update-dialog',
  templateUrl: './category-add-update-dialog.component.html',
  styleUrls: ['./category-add-update-dialog.component.scss'],
})
export class CategoryAddUpdateDialogComponent implements OnInit {
  clonedCategoryData: Category;
  categoryForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Category,
    private dialogRef: MatDialogRef<CategoryAddUpdateDialogComponent>,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.clonedCategoryData = this.data ?? {};

    console.log(typeof(this.clonedCategoryData));

    this.initCategoryFormGroup();
  }

  initCategoryFormGroup() {
    this.categoryForm = this.formBuilder.group({
      name: [
        this.clonedCategoryData.name ?? '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
        ],
      ],
    });
  }

  submit() {
    if (!this.categoryForm.valid) return;

    if (this.clonedCategoryData.categoryId) {
      this.update();
    } else {
      this.create();
    }
  }

  update() {
    let categoryUpdated: UpdateCategory = {
      categoryId: this.clonedCategoryData.categoryId,
      name: this.categoryForm.get('name')?.value,
    };

    this.categoryService.updateCategory(categoryUpdated).subscribe({
      next: (result) => this.dialogRef.close(true),
      error: (error) => console.log(error),
    });
  }

  create() {
    let newCategoryCreated: CreateCategory = {
      name: this.categoryForm.get('name')?.value,
    };

    console.log(newCategoryCreated);

    this.categoryService.createCategory(newCategoryCreated).subscribe({
      next: (result) => this.dialogRef.close(true),
      error: (error) => console.log(error),
    });
  }

  close() {
    this.dialogRef.close();
  }
}
