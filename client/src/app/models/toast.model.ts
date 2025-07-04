export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export type ToastType = 'success' | 'error' | 'warning' | 'info';