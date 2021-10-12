import { expect } from 'chai';
import {
  $,
  $$,
  browser,
  By,
  element,
  ExpectedConditions,
  until
} from 'protractor';

describe('When: I use the reading list feature', () => {
  it('Then: I should see my reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  });
});

describe('When: I click UNDO after adding book to reading list', () => {
  it('Then: The book should be removed from the reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const readingListToggleOpen = await $(
      '[data-testing="toggle-reading-list"]'
    );
    await readingListToggleOpen.click();

    const removeButtons = element.all(
      By.tagName('[data-testing="remove-button"]')
    );
    for (const i = 0; i < (await removeButtons).length; i + 1) {
      const removeButton = removeButtons.get(i);
      await removeButton.click();
    }

    const readingListToggleClose = await $(
      '[data-testing="close-reading-list"]'
    );
    await readingListToggleClose.click();

    const list = await $$('[data-testing="reading-list"]');
    const initialListLength = list.length;

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('dancing');
    await form.submit();

    const addBookButton = await $('[data-testing="add-book-to-list"]');
    await addBookButton.click();

    const undoButton = browser.driver.wait(
      until.elementLocated(By.tagName('.mat-simple-snackbar button')),
      10000
    );

    await undoButton.click();

    const list2 = await $$('[data-testing="reading-list"]');
    const finalListLength = list2.length;

    expect(initialListLength).to.equal(finalListLength);
  });
}).timeout(10000);
