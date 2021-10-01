import { $, $$, browser, ExpectedConditions } from 'protractor';
import { expect } from 'chai';

describe('When: Use the search feature', () => {
  it('Then: I should be able to search books by title', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();

    const items = await $$('[data-testing="book-item"]');
    expect(items.length).to.be.greaterThan(1, 'At least one book');
  });

  it('Then: I should not see search results if I have typed 2 or fewer letters', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const input = await $('input[type="search"]');
    await input.sendKeys('ja');

    const items = await $$('[data-testing="book-item"]');

    expect(items.length).to.be.lessThan(1, 'No books showing yet');
  });

  it('Then: I should see search results as I am typing and have typed more than 2 letters', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const input = await $('input[type="search"]');
    await input.sendKeys('java');

    const items = await $$('[data-testing="book-item"]');

    expect(items.length).to.be.greaterThan(1, 'Book results are now showing');
  });
});
