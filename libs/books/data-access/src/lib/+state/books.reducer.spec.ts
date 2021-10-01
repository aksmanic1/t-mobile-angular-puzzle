import { initialState, reducer, State } from './books.reducer';
import * as BooksActions from './books.actions';
import { createBook } from '@tmo/shared/testing';

describe('Books Reducer', () => {
  describe('valid Books actions', () => {
    it('loadBooksSuccess should return set the list of known Books', () => {
      const books = [createBook('A'), createBook('B'), createBook('C')];
      const action = BooksActions.searchBooksSuccess({ books });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(3);
    });

    it('searchBooks should return set the list of Books', () => {
      const books = [createBook('A'), createBook('B'), createBook('C')];
      const term = 'A';
      const action = BooksActions.searchBooks({ term });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.searchTerm).toEqual(term);
    });

    it('searchBookFailure should error', () => {
      const books = [createBook('A'), createBook('B'), createBook('C')];
      const error = 'Error';
      const action = BooksActions.searchBooksFailure({ error });

      const result: State = reducer(initialState, action);

      expect(error);
    });

    it('clearSearch should clear all books', () => {
      const books = [createBook('A'), createBook('B'), createBook('C')];
      const action1 = BooksActions.searchBooksSuccess({ books });

      const firstResult: State = reducer(initialState, action1);

      const action2 = BooksActions.clearSearch();

      const lastResult: State = reducer(firstResult, action2);

      expect(lastResult.ids.length).toBe(0);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
