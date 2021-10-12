import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  confirmedRemoveFromReadingList,
  getReadingList,
  removeFromReadingList,
  undoRemoveFromReadingList
} from '@tmo/books/data-access';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Book } from '@tmo/shared/models';
import { Subscription } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent implements OnInit, OnDestroy {
  readingList$ = this.store.select(getReadingList);
  subsc = new Subscription();

  constructor(
    private readonly store: Store,
    private snackBar: MatSnackBar,
    private actions$: Actions
  ) {}

  ngOnInit(): void {
    this.subsc = this.actions$
      .pipe(ofType(confirmedRemoveFromReadingList))
      .subscribe(({ item }) => {
        this.displaySnackBarOnRemove(item);
      });
  }

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
  }

  displaySnackBarOnRemove(item) {
    const snackBarRef = this.snackBar.open(
      '"' + item.title + '"' + ' removed',
      'UNDO',
      { duration: 4000 }
    );
    const book = item as Book;

    snackBarRef
      .onAction()
      .subscribe(() =>
        this.store.dispatch(undoRemoveFromReadingList({ book }))
      );
  }

  ngOnDestroy() {
    this.subsc.unsubscribe();
  }
}
