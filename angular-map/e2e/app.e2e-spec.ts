import { AngularMapPage } from './app.po';

describe('angular-map App', () => {
  let page: AngularMapPage;

  beforeEach(() => {
    page = new AngularMapPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
