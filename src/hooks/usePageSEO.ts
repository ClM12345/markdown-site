import { useEffect } from 'react';
import { useI18n } from '../i18n/context';

const BASE_URL = 'https://markdown.ltd';

interface SEOMeta {
  title: string;
  description: string;
  path?: string;
}

function setMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) || document.querySelector(`meta[property="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    if (name.startsWith('og:') || name.startsWith('article:')) {
      el.setAttribute('property', name);
    } else {
      el.setAttribute('name', name);
    }
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(url: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.href = url;
}

export function usePageSEO(pageKey: string, path?: string) {
  const { lang, t } = useI18n();

  useEffect(() => {
    const seoData = (t.seo as Record<string, SEOMeta>)[pageKey];
    if (!seoData) return;

    document.title = seoData.title;
    document.documentElement.lang = lang === 'zh-CN' ? 'zh-CN' : 'en';

    const canonical = BASE_URL + (path ?? seoData.path ?? '/');
    setCanonical(canonical);

    setMeta('description', seoData.description);
    setMeta('og:title', seoData.title);
    setMeta('og:description', seoData.description);
    setMeta('og:url', canonical);
    setMeta('og:type', 'website');
    setMeta('og:site_name', lang === 'zh-CN' ? 'Markdown 工具站' : 'Markdown Toolbox');
    setMeta('og:locale', lang === 'zh-CN' ? 'zh_CN' : 'en_US');
    setMeta('twitter:card', 'summary');
    setMeta('twitter:title', seoData.title);
    setMeta('twitter:description', seoData.description);
  }, [pageKey, path, lang, t]);
}
