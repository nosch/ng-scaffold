/**
 * End-To-End Testing: route "home"
 */
describe('Route "home"', function () {
    'use strict';

    beforeEach(function () {
        browser.get('/#/');
    });

    describe('titles and headings', function () {
        it('should display the correct page title', function () {
            var expected = 'Angular Scaffold!';
            var title = browser.getTitle();

            expect(title).toBe(expected);
        });

        it('should display the correct page heading', function () {
            var expected = 'Angular Scaffold!';
            var heading1 = element(by.binding('heading'));

            expect(heading1.getText()).toBe(expected);
        });
    });

    describe('links and buttons', function () {
        describe('click on "Learn more..."', function () {
            it('should open the "About" page', function () {
                var button = element(by.className('btn'));

                button.click();

                expect(browser.getCurrentUrl()).toMatch('/#/about');
            });
        });
    });
});
