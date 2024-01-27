import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/core/models/category.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { CategoryDetailsDialogComponent } from './category-details-dialog/category-details-dialog.component';
import { CategoryAddUpdateDialogComponent } from './category-add-update-dialog/category-add-update-dialog.component';
import { DeleteEntityDialogComponent } from 'src/app/shared/components/delete-entity-dialog/delete-entity-dialog.component';

@Component({
  selector: 'admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss'],
})
export class AdminCategoriesComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  dataSource: Category[] = [];

  displayedColumns: string[] = ['index', 'name', 'edit-delete'];

  constructor(private categoryService: CategoryService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.initCategoryTableData();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  initCategoryTableData() {
    this.sub = this.categoryService
      .getAllCategories()
      .subscribe((categories) => {
        this.dataSource = [...categories];
      });
  }

  openCategoryDetails(category: CategoryService) {
    this.dialog.open(CategoryDetailsDialogComponent, {
      data: category,
      width: '500px'
    })
  }

  openAddCategoryDialog() {
    const dialogRef = this.dialog.open(CategoryAddUpdateDialogComponent, {
      width: '800px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      result && this.initCategoryTableData();
    })
  }

  openUpdateCategoryDialog(category: Category) {
    const dialogRef = this.dialog.open(CategoryAddUpdateDialogComponent, {
      data: category,
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      result && this.initCategoryTableData();
    });
  }

  deleteCategory(category: Category) {
    const dialogRef = this.dialog.open(DeleteEntityDialogComponent, {
      width: '640px',
      data: { entity: category, entityType: 'category' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      result &&
        this.categoryService.deleteCategory(category.categoryId).subscribe(() => {
          this.initCategoryTableData();
        });
    });
  }
}
