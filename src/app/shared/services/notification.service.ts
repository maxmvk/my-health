import {Injectable, TemplateRef} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ComponentType} from '@angular/cdk/overlay';
import {MatDialogRef} from '@angular/material/dialog/dialog-ref';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
  }

  showMessage(message: string): void {
    this.snackBar.open(message, null, {
      duration: 3000,
      panelClass: 'snake-bur-primary'
    });
  }

  showPopup<T>(component: ComponentType<T> | TemplateRef<T>, config?: MatDialogConfig): MatDialogRef<T> {
    return this.dialog.open(component, {
      hasBackdrop: true,
      autoFocus: false,
      scrollStrategy: undefined,
      ...config
    });
  }
}
