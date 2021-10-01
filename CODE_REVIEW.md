Code Review

- In book-search.component.html, the ngIf directive condition is based of if the searchTerm variable in books.reducer.ts has a term. While this works logically, it is not consistent with the ways the other components are giving the ngIf condition. To be consistent, the book-search component should use an async pipe subscribed to an observable that gives the result of the booksearch [fixed]

- reading-list.reducer.spec.ts and reading-list.selectors.spec.ts have describe() methods using 'Books' instead of 'ReadingList' which would be confusing to the person debugging since it is describing the wrong feature

- In book-search.component.html the click event is in a link html element, but it would be better for the html element to be a button since there is no link involved.

- When a bad query is given, there is no indication in the UI that the search query was bad, the bad query error is only logged in the console. To be less confusing to users, the webpage itself should show that the search term was not valid

- An an improvement, allow the search bar to float so that the user doesn't have to scroll up to the top to make another search

- Another improvement is allowing for the user to add books to the reading list while the reading-list component is open. This would allow the user to see the exact books that are in their reading list as they are picking new books to add

Automated Accessibility Issues

1. "Buttons do not have an accessible name" The buttons on book-search component did not have function identifying labels for those using text to speech software
   [fixed] -> added aria labels to the inaccessable buttons
2. "Background and foreground colors do not have a sufficient contrast ratio." The reading list button was the same color as the header, making it difficult to realize that it was a clickable component
   [fixed] -> changed the color of the reading list button to white, to offset against the pin background

Manual Accessibility Issues

1. Book covers and titles in reading-list component are small in reading list, making it difficult for those who are visually impaired to see them
   [fixed] -> In the reading list, the book cover images were made larger and the font size was increased to 16px (ADA compliant)
2. Book titles in book-search component are small and get lost amidst the rest of the information, which may be difficult for those with cognitive disabilities to navigate
   [fixed] -> The book titles in book-search were made over 16px font size, bolded, and underlined to differentiate from the rest of the information
3. Search bar is small, which may make it hard to access for those with motor or visual impairments
   [fixed] -> The search bar was made larger
4. The button to remove books from the reading list is small, which can make it difficult for those with motor disabilities to remove a book
   [fixed] -> The remove buttons in the reading list were made almost 2x larger
