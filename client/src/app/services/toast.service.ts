import { Injectable } from '@angular/core';
import { Toast, ToastType } from '../models/toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public toasts: Toast[] = [];
  private toastId = 0;

  constructor() {}

  showToast(message: string, type: ToastType = 'info', duration: number = 4000): void {
    const toast: Toast = {
      id: this.generateId(),
      message,
      type,
      duration
    };

    this.toasts.push(toast);

    // Auto remove toast after duration
    setTimeout(() => {
      this.removeToast(toast.id);
    }, duration);
  }

  showSuccess(message: string): void {
    this.showToast(message, 'success');
  }

  showError(message: string): void {
    this.showToast(message, 'error', 6000); // Show errors longer
  }

  showWarning(message: string): void {
    this.showToast(message, 'warning');
  }

  showInfo(message: string): void {
    this.showToast(message, 'info');
  }

  removeToast(id: string): void {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
  }

  clearAll(): void {
    this.toasts = [];
  }

  private generateId(): string {
    return `toast-${++this.toastId}-${Date.now()}`;
  }
}