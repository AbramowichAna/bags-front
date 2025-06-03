import { expect } from '@wdio/globals'
import LandingPage from '../pageobjects/landing.page.js'

describe('Landing Page', () => {
    it('should display header and hero section content correctly', async () => {
        await LandingPage.open()

        // Check for Header Title
        await expect(LandingPage.headerTitle).toBeExisting()
        await expect(LandingPage.headerTitle).toHaveText('Digital Wallet')

        // Check for Hero Section Title
        await expect(LandingPage.heroSectionTitle).toBeExisting()
        await expect(LandingPage.heroSectionTitle).toHaveText('Manage your money with ease')

        // Check for buttons
        await expect(LandingPage.getStartedButton).toBeExisting()
        await expect(LandingPage.signInButton).toBeExisting()
    })
}) 