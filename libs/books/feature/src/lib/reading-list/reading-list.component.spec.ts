import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  createReadingListItem,
  SharedTestingModule
} from '@tmo/shared/testing';

import { ReadingListComponent } from './reading-list.component';
import { BooksFeatureModule } from '@tmo/books/feature';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReplaySubject } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { confirmedRemoveFromReadingList } from '@tmo/books/data-access';

describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;
  let actions: ReplaySubject<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BooksFeatureModule,
        SharedTestingModule,
        BrowserAnimationsModule
      ],
      providers: [provideMockActions(() => actions)]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove book from reading list', () => {
    const item = createReadingListItem('testBook');
    component.removeFromReadingList(item);
  });

  it('should display snackBar', () => {
    const item = createReadingListItem('testBook');
    component.displaySnackBarOnRemove(item);
  });

  it('should only remove book on success', () => {
    const item = createReadingListItem('testBook');
    const spy = spyOn(component, 'displaySnackBarOnRemove');

    actions = new ReplaySubject();
    component.ngOnInit();
    actions.next(confirmedRemoveFromReadingList({ item }));

    expect(spy).toBeCalled();
  });
});
