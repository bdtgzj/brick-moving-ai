// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightBlog from 'starlight-blog';

// https://astro.build/config
export default defineConfig({
	site: 'https://ai.bdtgzj.com',
	markdown: {
		smartypants: false,
  	},
	integrations: [
		starlight({
			plugins: [starlightBlog({
				postCount: 5, // 每页 post 条数
				recentPostCount: 10, // sidebar 中 recent post 条数
				navigation: 'none', // navigation 中，显示 blog link 的方式
			})],
			title: {
				en: 'Brick Moving AI',
				'zh-CN': '搬砖AI',
			},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/bdtgzj/brick-moving-ai' }],
			sidebar: [
			],
			defaultLocale: 'root', // optional
			locales: {
				root: {
					label: '简体中文',
					lang: 'zh-CN', // lang is required for root locales
				},
				'en': {
					label: 'English',
					lang: 'en',
				},
			},
		}),
	],
});
