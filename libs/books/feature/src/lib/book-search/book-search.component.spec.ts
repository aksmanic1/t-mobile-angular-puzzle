import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createBook, SharedTestingModule } from '@tmo/shared/testing';

import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';

describe('ProductsListComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, NoopAnimationsModule, SharedTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
});
