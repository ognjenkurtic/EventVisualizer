import { ApuVisualizerPage } from './app.po';

describe('apu-visualizer App', () => {
  let page: ApuVisualizerPage;

  beforeEach(() => {
    page = new ApuVisualizerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
