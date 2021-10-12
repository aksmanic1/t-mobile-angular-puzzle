import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  searchBooks,
  confirmedAddToReadingList,
  undoAddToReadingList
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { createReadingListItem } from '@tmo/shared/testing';
import { Subscription } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit, OnDestroy {
  books$ = this.store.select(getAllBooks);
  subsc = new Subscription();

  searchForm = this.fb.group({
    term: ''
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private snackBar: MatSnackBar,
    private actions$: Actions
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.subsc = this.actions$
      .pipe(ofType(confirmedAddToReadingList))
      .subscribe(({ book }) => {
        this.displaySnackBarOnAdd(book);
      });
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }

  displaySnackBarOnAdd(book) {
    const snackBarRef = this.snackBar.open(
      '"' + book.title + '"' + ' added',
      'UNDO',
      { duration: 4000 }
    );
    const item = createReadingListItem(book.id);

    snackBarRef
      .onAction()
      .subscribe(() => this.store.dispatch(undoAddToReadingList({ item })));
  }

  ngOnDestroy() {
    this.subsc.unsubscribe();
  }
}
