import { Page, Locator } from '@playwright/test';
import { BrowserUtils } from '@utils/browser-utils';

export class LeftSidePanel {
    readonly page: Page;
    readonly profileSection: Locator;
    readonly profileInfoButton: Locator;
    readonly avatar: Locator;
    readonly avatarInitial: Locator;
    readonly username: Locator;
    readonly profileDropdown: Locator;
    readonly profileMenuItem: Locator;
    readonly organizationMenuItem: Locator;
    readonly localizationMenuItem: Locator;
    readonly signOutButton: Locator;
    readonly sidebarNav: Locator;
    readonly accessPatrolItem: Locator;
    readonly browseControlItem: Locator;
    readonly browseReporterItem: Locator;
    readonly enPowerManagerItem: Locator;
    readonly notificationsItem: Locator;
    readonly alertsItem: Locator;
    readonly toolsItem: Locator;
    readonly settingsItem: Locator;
    readonly knowledgeBaseLink: Locator;
    readonly contactUsLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.profileSection = page.locator('.profile-section');
        this.profileInfoButton = page.locator('.profile-info[role="button"]');
        this.avatar = page.locator('.profile-section .avatar');
        this.avatarInitial = page.locator('.profile-section .avatar p');
        this.username = page.locator('.profile-section .username');
        this.profileDropdown = page.locator('.profile-dropdown[role="menu"]');
        this.profileMenuItem = page.locator('.profile-dropdown-item').filter({ hasText: 'Profile' });
        this.organizationMenuItem = page.locator('.profile-dropdown-item').filter({ hasText: 'Organization' });
        this.localizationMenuItem = page.locator('.profile-dropdown-item').filter({ hasText: 'Localization' });
        this.signOutButton = page.locator('.profile-dropdown-item').filter({ hasText: 'Sign Out' });
        this.sidebarNav = page.locator('nav.sidebar-nav');
        this.accessPatrolItem = this.sidebarNav.locator('.sidebar-nav-item').filter({ hasText: 'AccessPatrol' });
        this.browseControlItem = this.sidebarNav.locator('.sidebar-nav-item').filter({ hasText: 'BrowseControl' });
        this.browseReporterItem = this.sidebarNav.locator('.sidebar-nav-item').filter({ hasText: 'BrowseReporter' });
        this.enPowerManagerItem = this.sidebarNav.locator('.sidebar-nav-item').filter({ hasText: 'enPowerManager' });
        this.notificationsItem = this.sidebarNav.locator('a.sidebar-nav-item[href*="notifications"]');
        this.alertsItem = this.sidebarNav.locator('a.sidebar-nav-item[href*="alerts"]');
        this.toolsItem = this.sidebarNav.locator('.sidebar-nav-item').filter({ hasText: 'Tools' });
        this.settingsItem = this.sidebarNav.locator('.sidebar-nav-item').filter({ hasText: 'Settings' });
        this.knowledgeBaseLink = this.sidebarNav.locator('a.sidebar-nav-item[href*="support.currentware.com"]');
        this.contactUsLink = this.sidebarNav.locator('a.sidebar-nav-item[href*="currentware.com/contact"]');
    }

    async getUsernameText(): Promise<string> {
        return (await this.username.textContent())?.trim() ?? '';
    }

    async getAvatarInitialText(): Promise<string> {
        return (await this.avatarInitial.textContent())?.trim() ?? '';
    }

    async clickProfileInfo(): Promise<void> {
        await BrowserUtils.click(this.page, this.profileInfoButton);
    }

    async clickProfile(): Promise<void> {
        await BrowserUtils.click(this.page, this.profileMenuItem);
    }

    async clickOrganization(): Promise<void> {
        await BrowserUtils.click(this.page, this.organizationMenuItem);
    }

    async clickLocalization(): Promise<void> {
        await BrowserUtils.click(this.page, this.localizationMenuItem);
    }

    async clickSignOut(): Promise<void> {
        await BrowserUtils.click(this.page, this.signOutButton);
    }

    async clickAccessPatrol(): Promise<void> {
        await BrowserUtils.click(this.page, this.accessPatrolItem);
    }

    async clickBrowseControl(): Promise<void> {
        await BrowserUtils.click(this.page, this.browseControlItem);
    }

    async clickBrowseReporter(): Promise<void> {
        await BrowserUtils.click(this.page, this.browseReporterItem);
    }

    async clickEnPowerManager(): Promise<void> {
        await BrowserUtils.click(this.page, this.enPowerManagerItem);
    }

    async clickNotifications(): Promise<void> {
        await BrowserUtils.click(this.page, this.notificationsItem);
    }

    async clickAlerts(): Promise<void> {
        await BrowserUtils.click(this.page, this.alertsItem);
    }

    async clickTools(): Promise<void> {
        await BrowserUtils.click(this.page, this.toolsItem);
    }

    async clickSettings(): Promise<void> {
        await BrowserUtils.click(this.page, this.settingsItem);
    }

    async clickKnowledgeBase(): Promise<void> {
        await BrowserUtils.click(this.page, this.knowledgeBaseLink);
    }

    async clickContactUs(): Promise<void> {
        await BrowserUtils.click(this.page, this.contactUsLink);
    }
}
