// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://pyeji.kr',
  // Cloudflare가 /about을 /about/으로 리다이렉트하므로 주소는 항상 슬래시로 끝나게 맞춘다
  trailingSlash: 'always',
  integrations: [react(), sitemap()]
});
