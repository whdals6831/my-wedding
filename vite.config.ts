import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig, type HtmlTagDescriptor, type Plugin } from 'vite';
import { wedding } from './src/config/wedding.ts';

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * public/ 에 공유 이미지가 있을 때만 절대 URL을 만든다.
 * 파일 내용 해시를 쿼리로 붙여 이미지를 바꾸면 카카오톡 캐시도 새로 갱신되게 한다.
 */
function resolveOgImageUrl(): string {
  const filePath = fileURLToPath(new URL(`./public/${wedding.share.image}`, import.meta.url));
  if (!existsSync(filePath)) return '';
  const hash = createHash('sha1').update(readFileSync(filePath)).digest('hex').slice(0, 8);
  return `${wedding.siteUrl}${wedding.share.image}?v=${hash}`;
}

/** 링크 미리보기 크롤러는 JS를 실행하지 않으므로 메타 태그를 빌드 시 HTML에 넣는다 */
function weddingMeta(ogImageUrl: string): Plugin {
  const meta = (attrs: Record<string, string>): HtmlTagDescriptor => ({ tag: 'meta', attrs, injectTo: 'head' });
  const { title, description } = wedding.share;

  return {
    name: 'wedding-meta',
    transformIndexHtml: () => [
      // 속성값은 Vite가 이스케이프하지만 children 문자열은 그대로 들어간다
      { tag: 'title', children: escapeHtml(title), injectTo: 'head' },
      meta({ name: 'description', content: description }),
      meta({ property: 'og:type', content: 'website' }),
      meta({ property: 'og:url', content: wedding.siteUrl }),
      meta({ property: 'og:title', content: title }),
      meta({ property: 'og:description', content: description }),
      ...(ogImageUrl
        ? [
            meta({ property: 'og:image', content: ogImageUrl }),
            meta({ property: 'og:image:width', content: '1200' }),
            meta({ property: 'og:image:height', content: '600' }),
          ]
        : []),
    ],
  };
}

const ogImageUrl = resolveOgImageUrl();

export default defineConfig({
  base: new URL(wedding.siteUrl).pathname,
  plugins: [react(), weddingMeta(ogImageUrl)],
  define: {
    __OG_IMAGE_URL__: JSON.stringify(ogImageUrl),
  },
  server: {
    host: true,
  },
});
