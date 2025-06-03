import { $ } from '@wdio/globals';
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LandingPage extends Page {
    /**
     * define selectors using getter methods
     */
    public get headerTitle () {
        return $('div*=Digital Wallet'); 
    }

    public get heroSectionTitle () {
        return $('h1*=Manage your money with ease');
    }

    public get getStartedButton () {
        return $('button*=Get Started');
    }

    public get signInButton () {
        return $('button*=Sign In');
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    public open () {
        return super.open(''); // Open the root path for the landing page
    }
}

export default new LandingPage(); 