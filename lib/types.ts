export interface CartItem {
  id: number;
  name: string;
  description: string;
  volume: string;
  price: string;
  quantity: number;
  category: string;
}

export interface CartState {
  items: CartItem[];
  total: number;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  email?: string;
  address?: string;
  comment?: string;
}
