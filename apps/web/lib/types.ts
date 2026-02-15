export interface Item {
  id: string;
  name: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  count?: number;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}
