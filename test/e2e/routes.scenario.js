/**
 * End-to-End Testing: Routes
 */

describe('End-to-End Testing: Routes', function () {
    'use strict';

    beforeEach(function() {
        browser().navigateTo('/');
    });

    // Module: application
    // #/home
    it('should open to the /home path when / is accessed', function() {
        browser().navigateTo('#/');
        expect(browser().location().path()).toBe('/home');
    });

    it('should open to the /home path when /home is accessed', function() {
        browser().navigateTo('#/home');
        expect(browser().location().path()).toBe('/home');
    });

    // #/about
    it('should open the /about path when /about is accessed', function() {
        browser().navigateTo('#/about');
        expect(browser().location().path()).toBe('/about');
    });

    // #/contact
    it('should open the /contact path when /contact is accessed', function() {
        browser().navigateTo('#/contact');
        expect(browser().location().path()).toBe('/contact');
    });


    // Module: user
    // #/user/dashboard
    it('should open the /user/dashboard path when /user/dashboard is accessed', function() {
        browser().navigateTo('#/user/dashboard');
        expect(browser().location().path()).toBe('/user/dashboard');
    });

    // #/user/account
    it('should open the /user/account path when /user/account is accessed', function() {
        browser().navigateTo('#/user/account');
        expect(browser().location().path()).toBe('/user/account');
    });

    // #/user/profile
    it('should open the /user/profile path when /user/profile is accessed', function() {
        browser().navigateTo('#/user/profile');
        expect(browser().location().path()).toBe('/user/profile');
    });
});
