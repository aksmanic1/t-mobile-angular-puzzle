import { TestBed } from '@angular/core/testing';
import { expect } from 'chai';
import { ReplaySubject } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';
import {
  createBook,
  createReadingListItem,
  SharedTestingModule
} from '@tmo/shared/testing';

import { ReadingListEffects } from './reading-list.effects';
import * as ReadingListActions from './reading-list.actions';
import { HttpTestingController } from '@angular/common/http/testing';

describe('ToReadEffects', () => {
  let actions: ReplaySubject<any>;
  let effects: ReadingListEffects;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot(), SharedTestingModule],
      providers: [
        ReadingListEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.inject(ReadingListEffects);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('loadReadingList$', () => {
    it('should work', done => {
      actions = new ReplaySubject();
      actions.next(ReadingListActions.loadReadingList());

      effects.loadReadingList$.subscribe(action => {
        expect(action).to.eql(
          ReadingListActions.loadReadingListSuccess({ list: [] })
        );
        done();
      });

      httpMock.expectOne('/api/reading-list').flush([]);
    });
  });

  it('should add book', done => {
    actions = new ReplaySubject();
    const book = createBook('testBook');
    actions.next(ReadingListActions.addToReadingList({ book }));

    effects.addBook$.subscribe(action => {
      expect(action).to.eql(
        ReadingListActions.confirmedAddToReadingList({ book })
      );
      done();
    });

    httpMock.expectOne('/api/reading-list').flush([]);
  });

  it('should undo add book', done => {
    actions = new ReplaySubject();
    const book = createBook('testBook');
    actions.next(ReadingListActions.addToReadingList({ book }));

    effects.addBook$.subscribe(action => {
      expect(action).to.eql(
        ReadingListActions.confirmedAddToReadingList({ book })
      );
      done();
    });

    httpMock.expectOne('/api/reading-list').flush([]);
  });

  it('should remove book', done => {
    actions = new ReplaySubject();
    const item = createReadingListItem('testBook');
    actions.next(ReadingListActions.removeFromReadingList({ item }));

    effects.removeBook$.subscribe(action => {
      expect(action).to.eql(
        ReadingListActions.confirmedRemoveFromReadingList({ item })
      );
      done();
    });

    httpMock.expectOne('/api/reading-list/testBook').flush([]);
  });

  it('should call ngrxOnInitEffects()', done => {
    actions = new ReplaySubject();
    actions.next(effects.ngrxOnInitEffects());
    done();
  });
});
