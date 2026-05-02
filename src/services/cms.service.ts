import { CMSContent, delay } from './db';

const CMS_KEY = 'loome_cms_v4';

export const cmsService = {
  async getContent(): Promise<CMSContent> {
    await delay(200);
    // Return what's in local storage, or fallback if something went wrong
    const content = localStorage.getItem(CMS_KEY);
    if (!content) {
      throw new Error('CMS content not initialized');
    }
    return JSON.parse(content);
  },

  async updateContent(updates: Partial<CMSContent>): Promise<CMSContent> {
    await delay(400);
    const content: CMSContent = JSON.parse(localStorage.getItem(CMS_KEY) || '{}');
    const newContent = { ...content, ...updates };
    localStorage.setItem(CMS_KEY, JSON.stringify(newContent));
    return newContent;
  }
};
