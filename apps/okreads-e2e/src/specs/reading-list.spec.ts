import { $, browser, By, element, ExpectedConditions } from 'protractor';

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

  it('Then: I should be able to mark a book as finished', async () => {
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

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('painting');
    await form.submit();

    const bookAddButton = await $('[data-testing="book-add-button"]');
    await bookAddButton.click();

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-item--details"]'),
        'Book not finished.'
      )
    );

    const bookFinishedButton = await $('[data-testing="mark-book-finished"]');
    await bookFinishedButton.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-item--details"]'),
        'Book finished!'
      )
    );
  });
});
