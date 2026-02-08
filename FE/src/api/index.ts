import type {
  AuthResponse,
  CreateOrder,
  CreateProduct,
  Login,
  OrderResponse,
  Product,
  Register,
} from 'project-shared';

const API_BASE_URL = 'http://localhost:3000'; //in a real world scenario, i will put this in .env, i will also configure based on the environment, local, staging, live

const AUTH_TOKEN_KEY = 'auth_token';

const getAuthToken = () => localStorage.getItem(AUTH_TOKEN_KEY);

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/products`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}

export async function createProduct(
  payload: CreateProduct,
): Promise<CreateProduct> {
  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create product.');
  }

  return response.json();
}

export async function registerUser(payload: Register): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to register.');
  }

  return response.json();
}

export async function loginUser(payload: Login): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to sign in.');
  }

  return response.json();
}

export async function placeOrder(payload: CreateOrder): Promise<OrderResponse> {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to place order.');
  }

  return response.json();
}

export async function fetchOrder(orderId: string): Promise<OrderResponse> {
  const response = await fetch(`${API_BASE_URL}/orders/${orderId}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Order ${orderId} not found.`);
    }
    throw new Error('Failed to fetch order details.');
  }

  return response.json();
}
