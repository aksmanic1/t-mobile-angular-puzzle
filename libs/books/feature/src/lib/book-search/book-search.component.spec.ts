import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createBook, SharedTestingModule } from '@tmo/shared/testing';
import { ReplaySubject } from 'rxjs';

import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';
import { provideMockActions } from '@ngrx/effects/testing';
import { confirmedAddToReadingList } from '@tmo/books/data-access';

describe('ProductsListComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  let actions: ReplaySubject<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, NoopAnimationsModule, SharedTestingModule],
      providers: [provideMockActions(() => actions)]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should properly format published date', () => {
    const dateFormat = '2011-04-25T00:00:00.000Z';

    const result = component.formatDate(dateFormat);

    expect(result).toEqual('4/24/2011');
  });

  it('should return undefined if there is no date', () => {
    const dateFormat = '';

    const result = component.formatDate(dateFormat);

    expect(result).toEqual(undefined);
  });

  it('should set searchterm to javascript', () => {
    component.searchExample();

    expect(component.searchForm.controls.term.value).toEqual('javascript');
  });

  it('should add book to reading list', () => {
    const book = createBook('testBook');
    component.addBookToReadingList(book);
  });

  it('should search for a book', () => {
    component.searchBooks();
  });

  it('should display snackBar', () => {
    const book = createBook('testBook');
    component.displaySnackBarOnAdd(book);
  });

  it('should only add book on success', () => {
    const book = createBook('testBook');
    const spy = spyOn(component, 'displaySnackBarOnAdd');

    actions = new ReplaySubject();
    component.ngOnInit();
    actions.next(confirmedAddToReadingList({ book }));

    expect(spy).toBeCalled();
  });
});
