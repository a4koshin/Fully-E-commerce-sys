
import { createApi } from "@reduxjs/toolkit/query/react";
import { daynamicApi } from '../dynamicApi';




jest.mock("@reduxjs/toolkit/query/react", () => ({
  createApi: jest.fn(),
  fetchBaseQuery: jest.fn(),
}));

describe('daynamicApi() daynamicApi method', () => {
  const mockUser = { token: 'mockToken' };
  const mockLocalStorage = {
    getItem: jest.fn(() => JSON.stringify(mockUser)),
  };

  beforeAll(() => {
    global.localStorage = mockLocalStorage;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Happy paths', () => {
    it('should create a mutation for createFunction with correct configuration', () => {
      const mockBuilder = {
        mutation: jest.fn(),
      };

      createApi.mockImplementation(({ endpoints }) => {
        endpoints(mockBuilder);
      });

      daynamicApi;

      expect(mockBuilder.mutation).toHaveBeenCalledWith(
        expect.objectContaining({
          query: expect.any(Function),
          invalidatesTags: ['customers', 'invoices', 'colors'],
        })
      );
    });

    it('should create a query for getByIdFunction with correct configuration', () => {
      const mockBuilder = {
        query: jest.fn(),
      };

      createApi.mockImplementation(({ endpoints }) => {
        endpoints(mockBuilder);
      });

      daynamicApi;

      expect(mockBuilder.query).toHaveBeenCalledWith(
        expect.objectContaining({
          query: expect.any(Function),
          providesTags: ['customers', 'invoices'],
        })
      );
    });

    // Add more happy path tests for other endpoints...
  });

  describe('Edge cases', () => {
    it('should handle missing user token gracefully in createFunction', () => {
      mockLocalStorage.getItem.mockReturnValueOnce(null);

      const mockBuilder = {
        mutation: jest.fn(),
      };

      createApi.mockImplementation(({ endpoints }) => {
        endpoints(mockBuilder);
      });

      daynamicApi;

      const queryFn = mockBuilder.mutation.mock.calls[0][0].query;
      const result = queryFn({ formData: {}, url: '/test' });

      expect(result.headers.Authorization).toBe('Bearer undefined');
    });

    it('should handle empty result in getallFunction', () => {
      const mockBuilder = {
        query: jest.fn(),
      };

      createApi.mockImplementation(({ endpoints }) => {
        endpoints(mockBuilder);
      });

      daynamicApi;

      const providesTagsFn = mockBuilder.query.mock.calls[0][0].providesTags;
      const result = providesTagsFn([]);

      expect(result).toEqual([
        { type: 'customers', id: 'LIST' },
        { type: 'invoices', id: 'LIST' },
        { type: 'colors', id: 'LIST' },
      ]);
    });

    // Add more edge case tests for other scenarios...
  });
});