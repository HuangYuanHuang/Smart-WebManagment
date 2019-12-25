import { SmartSystemTemplatePage } from './app.po';

describe('SmartSystem App', function() {
  let page: SmartSystemTemplatePage;

  beforeEach(() => {
    page = new SmartSystemTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
