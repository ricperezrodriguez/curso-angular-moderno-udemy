import { TestBed } from '@angular/core/testing';
import { CartStore } from '@store/cart-state/cart-state.service';
import { CartStorageService } from './cart-storage.service';

describe('CartStorageService', () => {
  let service: CartStorageService;
  
  const mockCartStore: CartStore = {
    products: [],
    totalAmount: 0,
    productsCount: 0,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartStorageService],
    });
    service = TestBed.inject(CartStorageService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save state to localStorage', () => {
    service.saveState(mockCartStore);
    const stored = localStorage.getItem('cart_state');
    expect(stored).toBe(JSON.stringify(mockCartStore));
  });

  it('should load state from localStorage', () => {
    localStorage.setItem('cart_state', JSON.stringify(mockCartStore));
    const loadedState = service.loadState();
    expect(loadedState).toEqual(mockCartStore);
  });

  it('should return null if no state is stored', () => {
    const loadedState = service.loadState();
    expect(loadedState).toBeNull();
  });

  it('should handle JSON parse errors gracefully', () => {
    localStorage.setItem('cart_state', 'invalid JSON');
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    const loadedState = service.loadState();
    expect(loadedState).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error loading cart state',
      expect.any(SyntaxError)
    );
    consoleSpy.mockRestore();
  });
});


// Explicación de las pruebas:
// Creación del servicio: Verifica que el servicio se crea correctamente.
// Guardar estado: Comprueba que el estado se guarda correctamente en localStorage.
// Cargar estado: Verifica que el estado se carga correctamente desde localStorage.
// Estado no almacenado: Asegura que se devuelve null si no hay estado almacenado.
// Errores de JSON: Asegura que el servicio maneja errores de análisis JSON y registra un error en la consola.
// Asegúrate de definir un objeto mockCartStore que represente un estado válido de CartStore para tus pruebas.