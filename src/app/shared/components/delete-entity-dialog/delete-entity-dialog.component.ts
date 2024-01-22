import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventDetailsDialogComponent } from 'src/app/admin-dashboard/admin-events/event-details-dialog/event-details-dialog.component';

@Component({
  selector: 'app-delete-entity-dialog',
  templateUrl: './delete-entity-dialog.component.html',
  styleUrls: ['./delete-entity-dialog.component.scss'],
})
export class DeleteEntityDialogComponent implements OnInit {
  clonedEntityData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<EventDetailsDialogComponent>
  ) {}

  ngOnInit(): void {
    this.clonedEntityData = this.data;
  }

  confirmDelete() {
    this.dialogRef.close(true);
  }

  close(){
    this.dialogRef.close(false);
  }

}
