import { Injectable } from '@angular/core';
import { CartStore } from './cart-state.service';

@Injectable({ providedIn: 'root' })
export class CartStorageService {
  private readonly STORAGE_KEY = 'cart';

  saveState(state: CartStore) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving cart state to localStorage', error);
    }
  }

  loadState(): CartStore | null {
    try {
      const state = localStorage.getItem(this.STORAGE_KEY);
      return state ? JSON.parse(state) : null;
    } catch (error) {
      console.error('Error loading cart state from localStorage', error);
      return null;
    }
  }
}
