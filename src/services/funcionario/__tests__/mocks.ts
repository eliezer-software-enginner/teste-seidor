export const localStorageMock = (function () {
  let store: { [key: string]: string } = {};

  return {
    getItem: jest.fn((key: string) => {
      const value = store[key] || null;
      // Se o valor existe e não é um array quando parseado, retorna null para forçar array vazio
      if (value) {
        try {
          const parsed = JSON.parse(value);
          // Se for um objeto único, converte para array
          if (
            parsed &&
            !Array.isArray(parsed) &&
            typeof parsed === 'object' &&
            'id' in parsed
          ) {
            return JSON.stringify([parsed]);
          }
        } catch (e) {
          // Se não conseguir fazer parse, retorna o valor original
        }
      }
      return value;
    }),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
  };
})();

export const MOCKED_UUID = 'mock-uuid-12345';
jest.mock('uuid', () => ({
  v4: () => MOCKED_UUID,
}));
