import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getShortcutGroups } from '../data/shortcutHelp';
import { shortcutLabel } from '../hooks/useEditorShortcuts';
import { useI18n } from '../i18n/context';
import { usePageSEO } from '../hooks/usePageSEO';

const SECTION_IDS = ['quick-start', 'md-basics', 'editor-features', 'file-ops', 'shortcuts', 'faq'];

function ShortcutsBlock() {
  const { t } = useI18n();
  const groups = useMemo(() => getShortcutGroups(t.shortcutDesc), [t.shortcutDesc]);
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {groups.map(g => (
        <div key={g.title}>
          <h4 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">{g.title}</h4>
          <div className="space-y-1">
            {g.items.map(i => (
              <div key={i.keys} className="flex items-center justify-between py-1">
                <span className="text-sm text-gray-700 dark:text-gray-300">{i.desc}</span>
                <span className="text-xs font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">{shortcutLabel(i.keys)}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ListBlock({ title, items }: { title?: string; items: string[] }) {
  return (
    <div>
      {title && <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">{title}</h3>}
      <ul className="space-y-1.5">
        {items.map((li, j) => (
          <li key={j} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
            <span className="text-gray-300 dark:text-gray-600 mt-0.5">•</span>
            <span>{li}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FaqBlock({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((faq, j) => (
        <details key={j} className="group rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <summary className="flex items-center justify-between px-4 py-3 cursor-pointer text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            {faq.q}
            <svg className="w-4 h-4 text-gray-400 shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </summary>
          <div className="px-4 pb-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</div>
        </details>
      ))}
    </div>
  );
}

export default function HelpPage() {
  const { t } = useI18n();
  usePageSEO('help');
  const h = t.help;
  const titles = h.sectionTitles;
  const key = shortcutLabel('Mod+K');
  const r = (s: string) => s.replace('{key}', key);

  const [activeId, setActiveId] = useState(SECTION_IDS[0]);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => { for (const e of entries) { if (e.isIntersecting) { setActiveId(e.target.id); break; } } },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );
    SECTION_IDS.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => { setMobileNavOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

  return (
    <div className="max-w-6xl mx-auto flex min-h-[calc(100vh-3.5rem)]">
      <aside className="hidden md:block w-52 shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-auto border-r border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 py-6 px-4">
        <h2 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">{h.title}</h2>
        <nav className="space-y-1">
          {SECTION_IDS.map((id, i) => (
            <button key={id} onClick={() => scrollTo(id)} className={`block w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${activeId === id ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>{titles[i]}</button>
          ))}
        </nav>
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Link to="/guide" className="block text-xs text-blue-600 dark:text-blue-400 hover:underline mb-2">{h.syntaxLink}</Link>
          <Link to="/editor" className="block text-xs text-blue-600 dark:text-blue-400 hover:underline">{h.editorLink}</Link>
        </div>
      </aside>

      <main className="flex-1 min-w-0 px-4 md:px-8 py-8">
        <div className="md:hidden mb-6">
          <button onClick={() => setMobileNavOpen(!mobileNavOpen)} className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300">
            <span>{h.mobileNav}</span>
            <svg className={`w-4 h-4 transition-transform ${mobileNavOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
          {mobileNavOpen && (
            <div className="mt-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
              {SECTION_IDS.map((id, i) => (
                <button key={id} onClick={() => scrollTo(id)} className={`block w-full text-left px-4 py-2 text-sm border-b border-gray-100 dark:border-gray-700 last:border-0 ${activeId === id ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-600 dark:text-gray-400'}`}>{titles[i]}</button>
              ))}
            </div>
          )}
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">{h.title}</h1>

        <div className="space-y-12">
          <section id="quick-start" className="scroll-mt-20">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">{titles[0]}</h2>
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{h.quickStartIntro}</p>
              <ListBlock title={h.quickStartHow} items={h.quickStartSteps.map(r)} />
            </div>
          </section>

          <section id="md-basics" className="scroll-mt-20">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">{titles[1]}</h2>
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{h.mdIntro}</p>
              <ListBlock title={h.mdSyntaxTitle} items={h.mdSyntax} />
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{h.mdMore}</p>
            </div>
          </section>

          <section id="editor-features" className="scroll-mt-20">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">{titles[2]}</h2>
            <div className="space-y-4">
              <ListBlock title={h.coreTitle} items={h.core} />
              <ListBlock title={h.tabsTitle} items={h.tabs} />
              <ListBlock title={h.advancedTitle} items={h.advanced.map(r)} />
            </div>
          </section>

          <section id="file-ops" className="scroll-mt-20">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">{titles[3]}</h2>
            <ListBlock items={h.fileOps} />
          </section>

          <section id="shortcuts" className="scroll-mt-20">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">{titles[4]}</h2>
            <ShortcutsBlock />
          </section>

          <section id="faq" className="scroll-mt-20">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">{titles[5]}</h2>
            <FaqBlock items={h.faq} />
          </section>
        </div>
      </main>
    </div>
  );
}
