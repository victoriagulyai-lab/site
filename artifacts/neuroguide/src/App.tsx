import { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowRight, AudioLines, BookOpen, Check, Code2, ExternalLink, Image as ImageIcon, Menu, Music2, Search, Sparkles, Video, WandSparkles, X } from 'lucide-react';

type Category = 'Текст' | 'Изображения' | 'Видео' | 'Музыка' | 'Голос' | 'Код';
type Tool = {
  id: string;
  name: string;
  maker: string;
  category: Category;
  mark: string;
  color: string;
  summary: string;
  description: string;
  strengths: string[];
  access: string;
  url: string;
  bestFor: string;
  badge?: string;
};

const tools: Tool[] = [
  { id: 'chatgpt', name: 'ChatGPT', maker: 'OpenAI', category: 'Текст', mark: 'G', color: 'coral', summary: 'Универсальный собеседник для идей, черновиков и повседневных задач.', description: 'Чат-помощник, который работает с текстом и поддерживает мультимодальные сценарии: в зависимости от доступных функций можно задавать вопросы, разбирать материалы и создавать контент.', strengths: ['Удобно начать с обычного диалога', 'Подходит для разных бытовых и рабочих задач', 'Можно уточнять ответ в несколько шагов'], access: 'Веб-сервис и приложения · доступность функций зависит от региона и аккаунта', url: 'https://chatgpt.com', bestFor: 'Если пока не знаете, с чего начать — попробуйте его первым.', badge: 'Хороший старт' },
  { id: 'claude', name: 'Claude', maker: 'Anthropic', category: 'Текст', mark: 'C', color: 'sand', summary: 'Вдумчивая работа с длинными текстами, документами и формулировками.', description: 'Семейство языковых моделей и чат-сервис от Anthropic. Удобен для чтения больших материалов, редактуры, структурирования мыслей и совместной работы над текстом.', strengths: ['Сильная работа с объёмными документами', 'Полезен для редактуры и анализа', 'Ответы можно развивать через диалог'], access: 'Веб-сервис и приложения · требуется аккаунт', url: 'https://claude.ai', bestFor: 'Когда нужно разобраться в длинном документе или улучшить текст.' },
  { id: 'gemini', name: 'Gemini', maker: 'Google', category: 'Текст', mark: 'G', color: 'blue', summary: 'Помощник Google для вопросов, идей и работы с разными форматами.', description: 'Чат-помощник Google с мультимодальными возможностями. Набор функций может различаться в зависимости от страны, аккаунта и версии сервиса.', strengths: ['Понимает запросы в разговорной форме', 'Поддерживает работу с несколькими типами материалов', 'Знакомая экосистема Google'], access: 'Веб-сервис и приложения · некоторые функции зависят от региона', url: 'https://gemini.google.com', bestFor: 'Для быстрых вопросов и задач в экосистеме Google.' },
  { id: 'perplexity', name: 'Perplexity', maker: 'Perplexity AI', category: 'Текст', mark: 'P', color: 'teal', summary: 'Поиск с ответом и ссылками на источники, с которых удобно продолжить.', description: 'Сервис для исследования вопросов: формирует ответ на основе найденных страниц и показывает цитируемые источники. Ссылки стоит открывать и проверять самостоятельно.', strengths: ['Источники видны рядом с ответом', 'Удобно исследовать незнакомую тему', 'Помогает быстро собрать направление для поиска'], access: 'Веб-сервис и приложения · доступные режимы могут меняться', url: 'https://www.perplexity.ai', bestFor: 'Если важнее найти источники, чем просто получить черновик.' },
  { id: 'midjourney', name: 'Midjourney', maker: 'Midjourney', category: 'Изображения', mark: 'M', color: 'violet', summary: 'Создание выразительных изображений по текстовому описанию.', description: 'Инструмент генерации изображений по промптам. Подходит для визуальных концепций, иллюстраций и поиска художественного направления.', strengths: ['Много контроля над эстетикой запроса', 'Хорош для серии визуальных экспериментов', 'Есть инструменты вариаций и доработки'], access: 'Веб-сервис · для работы нужен аккаунт', url: 'https://www.midjourney.com', bestFor: 'Для поиска выразительного стиля и визуальной идеи.' },
  { id: 'firefly', name: 'Adobe Firefly', maker: 'Adobe', category: 'Изображения', mark: 'F', color: 'orange', summary: 'Генеративные инструменты для изображений и творческих задач Adobe.', description: 'Набор генеративных функций Adobe: создание изображений по описанию и инструменты редактирования. Интеграции и доступность зависят от продуктов Adobe.', strengths: ['Связан с творческой экосистемой Adobe', 'Полезен для генерации и доработки визуалов', 'Понятные сценарии для дизайнерских задач'], access: 'Веб-сервис и приложения Adobe · нужен аккаунт', url: 'https://firefly.adobe.com', bestFor: 'Если вы уже создаёте контент в инструментах Adobe.' },
  { id: 'sora', name: 'Sora', maker: 'OpenAI', category: 'Видео', mark: 'S', color: 'ink', summary: 'Эксперименты с короткими видео по текстовому описанию.', description: 'Инструмент OpenAI для генерации видео. Доступ и возможности сервиса могут зависеть от страны, плана и текущего этапа развёртывания.', strengths: ['Создание видео на основе текстовой идеи', 'Подходит для визуальных набросков', 'Можно исследовать разные сцены и настроения'], access: 'Онлайн-сервис · доступность зависит от региона и аккаунта', url: 'https://sora.com', bestFor: 'Чтобы превратить короткий сценарный замысел в визуальный черновик.' },
  { id: 'runway', name: 'Runway', maker: 'Runway', category: 'Видео', mark: 'R', color: 'plum', summary: 'Инструменты генерации и редактирования видео для авторов.', description: 'Творческая платформа с AI-инструментами для работы с видео и изображениями. Набор моделей и функций периодически обновляется.', strengths: ['Сценарии от генерации до редактирования', 'Веб-инструменты для визуальных экспериментов', 'Подходит для прототипирования роликов'], access: 'Веб-платформа · функции зависят от аккаунта', url: 'https://runwayml.com', bestFor: 'Для визуальных проб и быстрых концептов видео.' },
  { id: 'suno', name: 'Suno', maker: 'Suno', category: 'Музыка', mark: 'S', color: 'lime', summary: 'Песни и музыкальные идеи по описанию или тексту.', description: 'Сервис генерации музыки, в том числе песенных форматов, на основе текстового запроса. Перед коммерческим использованием проверьте актуальные условия сервиса.', strengths: ['Быстро превращает тему в музыкальный набросок', 'Можно задать настроение и направление', 'Подходит для творческого эксперимента'], access: 'Веб-сервис · требуется аккаунт', url: 'https://suno.com', bestFor: 'Когда хочется услышать музыкальную версию своей идеи.' },
  { id: 'elevenlabs', name: 'ElevenLabs', maker: 'ElevenLabs', category: 'Голос', mark: '11', color: 'gold', summary: 'Синтез речи и инструменты для работы с голосовым контентом.', description: 'Платформа с инструментами генерации речи и аудио. Поддержка языков и доступные функции зависят от конкретного инструмента.', strengths: ['Можно превращать текст в озвучку', 'Есть инструменты для голосового контента', 'Удобно прототипировать аудиоматериалы'], access: 'Веб-сервис · нужен аккаунт; проверьте условия использования голоса', url: 'https://elevenlabs.io', bestFor: 'Для озвучки черновиков, роликов и аудиоформатов.' },
  { id: 'whisper', name: 'Whisper', maker: 'OpenAI', category: 'Голос', mark: 'W', color: 'teal', summary: 'Распознавание речи и перевод аудио в текст.', description: 'Система распознавания речи OpenAI. Доступна как открытая модель для запуска в подходящей технической среде; готовые продукты могут использовать её по-разному.', strengths: ['Транскрибирует аудио в текст', 'Поддерживает многоязычные сценарии', 'Полезен для заметок и черновых расшифровок'], access: 'Открытая модель · для самостоятельного запуска нужна настройка', url: 'https://github.com/openai/whisper', bestFor: 'Если нужно получить текстовую расшифровку записи.' },
  { id: 'github-copilot', name: 'GitHub Copilot', maker: 'GitHub', category: 'Код', mark: '⌘', color: 'blue', summary: 'Помощник программиста прямо в привычной среде разработки.', description: 'AI-инструменты для программирования, встроенные в рабочий процесс разработчика: подсказки, чат и помощь с кодом в поддерживаемых средах.', strengths: ['Работает рядом с редактором кода', 'Помогает объяснить или набросать фрагмент', 'Удобен как помощник, а не замена проверки'], access: 'Расширения и веб-инструменты · нужна учётная запись GitHub', url: 'https://github.com/features/copilot', bestFor: 'Если вы пишете код и хотите меньше переключаться между окнами.' },
  { id: 'cursor', name: 'Cursor', maker: 'Anysphere', category: 'Код', mark: '↗', color: 'ink', summary: 'Редактор кода с AI-помощью для работы с проектом.', description: 'Среда разработки на базе привычного редакторского подхода, дополненная AI-функциями для работы с кодовой базой и правками.', strengths: ['Помогает ориентироваться в проекте', 'Поддерживает диалог о коде', 'Подходит для итеративных изменений'], access: 'Приложение для компьютера · доступные функции зависят от аккаунта', url: 'https://cursor.com', bestFor: 'Для разработчиков, которые хотят обсуждать изменения рядом с кодом.' },
];

const categories: { name: Category | 'Все'; icon: typeof Sparkles; hint: string }[] = [
  { name: 'Все', icon: Sparkles, hint: 'Весь каталог' },
  { name: 'Текст', icon: BookOpen, hint: 'Писать и исследовать' },
  { name: 'Изображения', icon: ImageIcon, hint: 'Придумывать визуальное' },
  { name: 'Видео', icon: Video, hint: 'Собирать видеосцены' },
  { name: 'Музыка', icon: Music2, hint: 'Создавать музыку' },
  { name: 'Голос', icon: AudioLines, hint: 'Работать с речью' },
  { name: 'Код', icon: Code2, hint: 'Программировать' },
];

function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category | 'Все'>('Все');
  const [selected, setSelected] = useState<Tool | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('ru');
    return tools.filter((tool) => (category === 'Все' || tool.category === category) &&
      (!q || [tool.name, tool.maker, tool.category, tool.summary, tool.bestFor].join(' ').toLocaleLowerCase('ru').includes(q)));
  }, [query, category]);

  useEffect(() => {
    if (!selected) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setSelected(null); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [selected]);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-scroll-reveal]'));
    const showAll = () => elements.forEach((element) => element.classList.add('is-visible'));

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      showAll();
      return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const chooseCategory = (value: Category | 'Все') => {
    setCategory(value);
    setMobileMenu(false);
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="page-grain min-h-[100dvh]">
      <header className="relative z-20 border-b border-[#d8d3c5]">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-10">
          <a href="#top" className="flex items-center gap-3 text-[#173f38] no-underline" data-testid="link-home">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#173f38] text-[#f4f0e5]"><WandSparkles size={18} /></span>
            <span className="serif text-[23px] font-semibold tracking-[-.04em]">НейроГид</span>
            <span className="mono hidden border-l border-[#d8d3c5] pl-3 text-[10px] uppercase tracking-[.15em] text-[#68756b] sm:inline">Путеводитель по AI</span>
          </a>
          <nav className="hidden items-center gap-8 text-[13px] font-medium text-[#58665e] md:flex">
            <a className="transition-colors hover:text-[#173f38]" href="#catalog">Каталог</a>
            <a className="transition-colors hover:text-[#173f38]" href="#choose">Как выбрать</a>
            <a className="transition-colors hover:text-[#173f38]" href="#about">О проекте</a>
          </nav>
          <button onClick={() => setMobileMenu(!mobileMenu)} aria-label="Открыть навигацию" className="grid h-10 w-10 place-items-center rounded-full border border-[#d8d3c5] md:hidden" data-testid="button-mobile-menu"><Menu size={19} /></button>
        </div>
        {mobileMenu && <nav className="mobile-nav-enter grid gap-3 border-t border-[#d8d3c5] px-6 py-5 text-sm md:hidden"><a href="#catalog" onClick={() => setMobileMenu(false)}>Каталог</a><a href="#choose" onClick={() => setMobileMenu(false)}>Как выбрать</a><a href="#about" onClick={() => setMobileMenu(false)}>О проекте</a></nav>}
      </header>

      <section id="top" className="relative mx-auto max-w-[1400px] overflow-hidden px-5 pb-16 pt-12 md:px-10 md:pb-24 md:pt-[78px]">
        <div className="absolute right-[-80px] top-[-90px] hidden h-[460px] w-[460px] rounded-full border border-[#d8d3c5] md:block" />
        <div className="absolute right-[-6px] top-[-16px] hidden h-[315px] w-[315px] rounded-full border border-[#d8d3c5] md:block" />
        <div className="absolute right-[122px] top-[95px] hidden h-3 w-3 rounded-full bg-[#e87554] md:block" />
        <div className="relative max-w-[850px] reveal">
          <div className="mono mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[.16em] text-[#65736b]"><span className="h-px w-8 bg-[#e87554]" />Не нужно быть экспертом</div>
          <h1 className="serif max-w-[850px] text-[clamp(3.2rem,8.5vw,7.5rem)] leading-[.91] tracking-[-.065em] text-[#173f38]">Хорошая нейросеть — та, что <span className="relative italic text-[#d9684c]">подходит</span> вашей задаче.</h1>
          <div className="mt-8 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <p className="max-w-[440px] text-[16px] leading-7 text-[#58665e] md:text-[18px]">Понятный путеводитель по AI-инструментам. Найдите, с чего начать — для текста, картинки, голоса или кода.</p>
            <a href="#catalog" className="group inline-flex w-fit items-center gap-3 border-b border-[#173f38] pb-2 text-[13px] font-semibold text-[#173f38] no-underline">Выбрать инструмент <span className="grid h-7 w-7 place-items-center rounded-full bg-[#dce6c4] transition-transform group-hover:translate-y-1"><ArrowDown size={15} /></span></a>
          </div>
        </div>
        <div data-scroll-reveal className="relative mt-12 grid grid-cols-3 border-y border-[#d8d3c5] py-4 md:mt-[76px] md:max-w-[630px]">
          <div><div className="serif text-[28px] text-[#173f38]">{tools.length}</div><div className="mono text-[9px] uppercase tracking-[.1em] text-[#718077] md:text-[10px]">инструментов</div></div>
          <div className="border-l border-[#d8d3c5] pl-5"><div className="serif text-[28px] text-[#173f38]">6</div><div className="mono text-[9px] uppercase tracking-[.1em] text-[#718077] md:text-[10px]">направлений</div></div>
          <div className="border-l border-[#d8d3c5] pl-5"><div className="serif text-[28px] text-[#173f38]">0</div><div className="mono text-[9px] uppercase tracking-[.1em] text-[#718077] md:text-[10px]">сложных терминов</div></div>
        </div>
      </section>

      <section id="catalog" className="bg-[#e9e6da] px-5 py-14 md:px-10 md:py-[76px]">
        <div className="mx-auto max-w-[1320px]">
            <div data-scroll-reveal className="mb-8 flex flex-col justify-between gap-5 md:mb-10 md:flex-row md:items-end">
            <div>
              <div className="mono mb-3 text-[10px] uppercase tracking-[.15em] text-[#778078]">01 / Каталог</div>
              <h2 className="serif text-[42px] leading-none tracking-[-.04em] text-[#173f38] md:text-[55px]">Найдите свою отправную точку.</h2>
            </div>
            <p className="max-w-[330px] text-[13px] leading-6 text-[#66736b]">Не рейтинг и не соревнование. Просто инструменты для разных способов создавать.</p>
          </div>

          <div data-scroll-reveal style={{ transitionDelay: '90ms' }} className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map(({ name, icon: Icon }) => (
                <button key={name} onClick={() => setCategory(name)} aria-pressed={category === name} className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-[12px] font-semibold transition-colors ${category === name ? 'border-[#173f38] bg-[#173f38] text-[#f5f1e7]' : 'border-[#d2d0c4] bg-transparent text-[#59665f] hover:border-[#7c9183]'}`} data-testid={`filter-${name.toLocaleLowerCase()}`}><Icon size={14} />{name}</button>
              ))}
            </div>
            <label className="flex h-12 min-w-0 items-center gap-3 rounded-full border border-[#d2d0c4] bg-[#f5f2e9] px-4 lg:w-[330px]">
              <Search size={17} className="shrink-0 text-[#758078]" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Поиск: задача или название" className="w-full bg-transparent text-[13px] text-[#173f38] outline-none placeholder:text-[#8b928b]" aria-label="Поиск по инструментам" data-testid="input-search" />
              {query && <button onClick={() => setQuery('')} className="text-[#718077]" aria-label="Очистить поиск" data-testid="button-clear-search"><X size={15} /></button>}
            </label>
          </div>

          <div className="mb-5 flex items-center justify-between">
            <span className="mono text-[10px] uppercase tracking-[.12em] text-[#7a837b]" data-testid="text-results-count">{filtered.length} {filtered.length === 1 ? 'инструмент' : 'инструментов'}</span>
            {(category !== 'Все' || query) && <button className="text-[11px] font-semibold text-[#bd6148] underline underline-offset-4" onClick={() => { setCategory('Все'); setQuery(''); }} data-testid="button-reset-filters">Сбросить фильтры</button>}
          </div>

          {filtered.length ? <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((tool, index) => <button key={tool.id} onClick={() => setSelected(tool)} className="tool-card tool-card-enter group relative flex min-h-[246px] flex-col rounded-[17px] border border-[#d7d3c7] bg-[#f6f3ea] p-5 text-left md:p-6" data-testid={`card-tool-${tool.id}`} style={{ animationDelay: `${index * 35}ms` }}>
              <div className="mb-5 flex items-start justify-between">
                <div className={`brand-mark ${tool.color} grid h-11 w-11 place-items-center rounded-[13px] text-[15px] font-bold`}>{tool.mark}</div>
                <div className="flex items-center gap-2"><span className="mono rounded-full bg-[#e9e6da] px-3 py-1.5 text-[9px] uppercase tracking-[.08em] text-[#65736b]">{tool.category}</span><span className="grid h-8 w-8 place-items-center rounded-full border border-[#dedace] text-[#627168] transition-colors group-hover:border-[#173f38] group-hover:bg-[#173f38] group-hover:text-[#f6f3ea]"><ArrowRight size={14} /></span></div>
              </div>
              <div className="mb-2 flex flex-wrap items-center gap-2"><h3 className="serif text-[25px] tracking-[-.035em] text-[#173f38]">{tool.name}</h3>{tool.badge && <span className="rounded-full bg-[#e3e9d4] px-2 py-1 text-[9px] font-semibold text-[#46634d]">{tool.badge}</span>}</div>
              <div className="mono mb-3 text-[10px] text-[#8a8f85]">{tool.maker}</div>
              <p className="max-w-[360px] text-[13px] leading-[1.7] text-[#66736b]">{tool.summary}</p>
              <div className="mt-auto flex items-center gap-2 pt-5 text-[11px] font-semibold text-[#bd6148] opacity-0 transition-opacity group-hover:opacity-100">Открыть карточку <ArrowRight size={13} /></div>
            </button>)}
          </div> : <div className="rounded-[18px] border border-dashed border-[#c9c7ba] px-6 py-16 text-center">
            <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-[#dce6c4] text-[#365848]"><Search size={20} /></div>
            <h3 className="serif text-2xl text-[#173f38]">Пока ничего не нашлось</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#66736b]">Попробуйте другое слово или покажите все инструменты.</p>
            <button onClick={() => { setQuery(''); setCategory('Все'); }} className="mt-5 rounded-full bg-[#173f38] px-5 py-2.5 text-xs font-semibold text-[#f5f1e7]" data-testid="button-empty-reset">Показать весь каталог</button>
          </div>}
          <p className="mt-6 max-w-2xl text-[11px] leading-5 text-[#7b837a]">Возможности и доступность сервисов меняются. Перед началом работы проверьте актуальные условия на официальном сайте инструмента.</p>
        </div>
      </section>

      <section id="choose" className="mx-auto grid max-w-[1320px] gap-10 px-5 py-16 md:grid-cols-[.8fr_1.2fr] md:px-10 md:py-24">
        <div data-scroll-reveal>
          <div className="mono mb-4 text-[10px] uppercase tracking-[.15em] text-[#778078]">02 / Как выбрать</div>
          <h2 className="serif max-w-[470px] text-[42px] leading-[1.04] tracking-[-.045em] text-[#173f38] md:text-[54px]">Начните не с модели, а с дела.</h2>
          <p className="mt-5 max-w-[370px] text-[14px] leading-7 text-[#66736b]">Поставьте себе три простых вопроса. Так выбор станет понятнее, даже если название модели ничего не говорит.</p>
        </div>
        <div className="border-t border-[#d8d3c5]">
          {[
            ['01', 'Что хочу получить на выходе?', 'Текст, изображение, расшифровку или рабочий код? Выберите формат результата — это сразу сузит круг.'],
            ['02', 'Мне нужен черновик или готовый файл?', 'Одни инструменты помогают придумать направление, другие удобнее для последовательной доработки.'],
            ['03', 'Где я буду этим пользоваться?', 'Проверьте, работает ли сервис в вашем регионе, устройстве и привычном рабочем процессе.'],
          ].map(([n, title, text], index) => <div key={n} data-scroll-reveal style={{ transitionDelay: `${index * 85}ms` }} className="grid grid-cols-[45px_1fr] gap-3 border-b border-[#d8d3c5] py-6 md:grid-cols-[60px_1fr] md:gap-5">
            <span className="mono pt-1 text-[11px] text-[#c96b4f]">{n}</span><div><h3 className="serif text-[21px] text-[#173f38] md:text-[24px]">{title}</h3><p className="mt-2 max-w-[530px] text-[13px] leading-6 text-[#66736b]">{text}</p></div>
          </div>)}
        </div>
      </section>

      <section className="mx-5 mb-16 overflow-hidden rounded-[22px] bg-[#173f38] text-[#f3efe4] md:mx-10 md:mb-24">
        <div data-scroll-reveal className="relative mx-auto max-w-[1320px] px-6 py-12 md:px-12 md:py-16">
          <div className="absolute -right-12 -top-20 h-[300px] w-[300px] rounded-full border border-[#ffffff24]" /><div className="absolute right-12 top-12 h-[130px] w-[130px] rounded-full border border-[#ffffff24]" />
          <div className="mono mb-4 text-[10px] uppercase tracking-[.15em] text-[#bfd0b4]">Небольшой совет</div>
          <h2 className="serif relative max-w-[700px] text-[38px] leading-[1.05] tracking-[-.04em] md:text-[55px]">Первый запрос не обязан быть идеальным.</h2>
          <p className="relative mt-5 max-w-[490px] text-[14px] leading-7 text-[#d0d9cc]">Опишите задачу так, как объяснили бы её коллеге. Посмотрите на результат, уточните детали — и только потом решайте, подходит ли инструмент.</p>
          <a href="#catalog" className="relative mt-8 inline-flex items-center gap-3 rounded-full bg-[#dce6c4] px-5 py-3 text-[12px] font-bold text-[#173f38] no-underline transition-transform hover:translate-x-1">Выбрать и попробовать <ArrowRight size={15} /></a>
        </div>
      </section>

      <footer id="about" className="border-t border-[#d8d3c5] px-5 py-8 md:px-10">
        <div data-scroll-reveal className="mx-auto flex max-w-[1320px] flex-col justify-between gap-5 md:flex-row md:items-center">
          <div className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#173f38] text-[#f4f0e5]"><WandSparkles size={15} /></span><span className="serif text-[20px] text-[#173f38]">НейроГид</span><span className="mono text-[9px] uppercase tracking-[.12em] text-[#879087]">Путеводитель, не рейтинг</span></div>
          <p className="max-w-lg text-[11px] leading-5 text-[#7b837a]">Справочный проект. НейроГид не связан с перечисленными компаниями и не гарантирует доступность их сервисов. Всегда сверяйтесь с официальными источниками.</p>
          <a href="#top" className="text-[11px] font-semibold text-[#53665a] no-underline hover:text-[#bd6148]">Наверх ↑</a>
        </div>
      </footer>

      {selected && <div className="dialog-backdrop-in fixed inset-0 z-50 flex items-end justify-center bg-[#152b25]/45 p-0 backdrop-blur-[3px] md:items-center md:p-5" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
        <section role="dialog" aria-modal="true" aria-labelledby="detail-title" className="dialog-panel-in relative max-h-[92dvh] w-full max-w-[650px] overflow-y-auto rounded-t-[22px] bg-[#f6f3ea] p-6 shadow-2xl md:rounded-[22px] md:p-9">
          <button onClick={() => setSelected(null)} aria-label="Закрыть карточку" className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-[#d7d3c7] text-[#56655b] hover:bg-[#e9e6da]" data-testid="button-close-detail"><X size={18} /></button>
          <div className="mb-7 flex items-center gap-4">
            <div className={`brand-mark ${selected.color} grid h-14 w-14 place-items-center rounded-[16px] text-[18px] font-bold`}>{selected.mark}</div>
            <div><div className="mono mb-1 text-[10px] uppercase tracking-[.12em] text-[#778078]">{selected.category} / {selected.maker}</div><h2 id="detail-title" className="serif text-[34px] leading-none tracking-[-.04em] text-[#173f38]">{selected.name}</h2></div>
          </div>
          <p className="text-[15px] leading-7 text-[#52635a]">{selected.description}</p>
          <div className="my-7 rounded-[14px] bg-[#e9e6da] p-5"><div className="mono mb-2 text-[9px] uppercase tracking-[.13em] text-[#81877e]">Хороший выбор, если</div><p className="serif text-[20px] leading-snug text-[#173f38]">{selected.bestFor}</p></div>
          <h3 className="mb-3 text-[12px] font-bold uppercase tracking-[.1em] text-[#617067]">Чем может быть полезен</h3>
          <ul className="grid gap-3">{selected.strengths.map((strength) => <li key={strength} className="flex items-start gap-3 text-[13px] leading-5 text-[#52635a]"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#dce6c4] text-[#46634d]"><Check size={12} /></span>{strength}</li>)}</ul>
          <div className="mt-7 border-t border-[#d8d3c5] pt-5"><div className="mono mb-2 text-[9px] uppercase tracking-[.12em] text-[#81877e]">Формат доступа</div><p className="text-[12px] leading-5 text-[#66736b]">{selected.access}</p></div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href={selected.url} target="_blank" rel="noreferrer" className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#173f38] px-5 text-[12px] font-bold text-[#f5f1e7] no-underline transition-colors hover:bg-[#28594f]" data-testid={`link-official-${selected.id}`}>На официальный сайт <ExternalLink size={14} /></a>
            <button onClick={() => setSelected(null)} className="min-h-12 rounded-full border border-[#d7d3c7] px-5 text-[12px] font-semibold text-[#53645a] hover:bg-[#e9e6da]" data-testid="button-back-catalog">Вернуться к каталогу</button>
          </div>
        </section>
      </div>}
    </main>
  );
}

export default App;
