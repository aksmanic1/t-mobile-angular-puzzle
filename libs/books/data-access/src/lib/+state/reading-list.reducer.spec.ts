import { expect } from 'chai';
import * as ReadingListActions from './reading-list.actions';
import {
  initialState,
  readingListAdapter,
  reducer,
  State
} from './reading-list.reducer';
import { createBook, createReadingListItem } from '@tmo/shared/testing';

describe('Books Reducer', () => {
  describe('valid Books actions', () => {
    let state: State;

    beforeEach(() => {
      state = readingListAdapter.setAll(
        [createReadingListItem('A'), createReadingListItem('B')],
        initialState
      );
    });

    it('loadReadingList should load books from reading list', () => {
      const action = ReadingListActions.loadReadingList();

      const result: State = reducer(initialState, action);

      expect(result.loaded).to.be.false;
      expect(result.error).to.eq(null);
    });

    it('loadBooksSuccess should load books from reading list', () => {
      const list = [
        createReadingListItem('A'),
        createReadingListItem('B'),
        createReadingListItem('C')
      ];
      const action = ReadingListActions.loadReadingListSuccess({ list });

      const result: State = reducer(initialState, action);

      expect(result.loaded).to.be.true;
      expect(result.ids.length).to.eq(3);
    });

    it('loadReadingListFailure should error', () => {
      const error = 'Error';
      const action = ReadingListActions.loadReadingListError({ error });

      const result: State = reducer(initialState, action);

      expect(result.error).to.eq('Error');
    });

    it('addToReadingList should add book to the state', () => {
      const action = ReadingListActions.addToReadingList({
        book: createBook('X')
      });

      const result: State = reducer(state, action);

      expect(result.ids).to.eql(['A', 'B', 'X']);
    });

    it('removeFromReadingList should remove book from the state', () => {
      const action = ReadingListActions.removeFromReadingList({
        item: createReadingListItem('A')
      });

      const result: State = reducer(state, action);

      expect(result.ids).to.eql(['B']);
    });

    it('markBookAsRead should mark book as complete', () => {
      const action = ReadingListActions.markBookAsRead({
        item: createReadingListItem('X')
      });

      const result: State = reducer(state, action);

      expect(result.entities.X.finished).to.eql(true);
    });

    it('failedAddToReadingList should undo book addition to the state', () => {
      const action = ReadingListActions.failedAddToReadingList({
        book: createBook('B')
      });

      const result: State = reducer(state, action);

      expect(result.ids).to.eql(['A']);
    });

    it('failedRemoveFromReadingList should undo book removal from the state', () => {
      const action = ReadingListActions.failedRemoveFromReadingList({
        item: createReadingListItem('C')
      });

      const result: State = reducer(state, action);

      expect(result.ids).to.eql(['A', 'B', 'C']);
    });
  });

  it('failedMarkBookAsRead should mark book as complete', () => {
    const action = ReadingListActions.failedMarkBookAsRead({
      item: createReadingListItem('X')
    });

    const result: State = reducer(initialState, action);

    expect(result.entities.X.finished).to.eql(false);
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).to.eql(initialState);
    });
  });
});
