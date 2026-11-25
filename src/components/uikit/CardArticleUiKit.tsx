import React, { useState } from 'react';
import {
  Bookmark,
  Heart,
  ArrowRight,
  Clock,
  BookOpen,
  Share2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UiDocPage, UiDocSection } from './UiDocBlock';
import { ACTION_BTN_PRIMARY, ACTION_BTN_SECONDARY } from '../../constants/buttonStyles';
import { playUiMotionSound } from '../../utils/uiMotionSound';
import articleDesignImg from '../../assets/images/article_design_system_1795058561161.jpg';
import articleAnalyticsImg from '../../assets/images/article_data_analytics_1795058562089.jpg';
import cardOverlayImg from '../../assets/images/card_overlay_calculus_1794562505077.jpg';

interface ArticleItem {
  id: string;
  category: string;
  readTime: string;
  title: string;
  excerpt: string;
  author: string;
  authorInitials: string;
  authorColor: string;
  date: string;
  image: string;
  imageAlt: string;
  likes: number;
}

const ARTICLE_ITEMS: ArticleItem[] = [
  {
    id: 'art-1',
    category: 'Design System',
    readTime: '6 menit baca',
    title: 'Menyusun Token Warna & Kontras Permukaan Terang maupun Gelap',
    excerpt:
      'Panduan praktis menjaga keterbacaan teks sekunder, batas kartu 1px, dan aksen utama tanpa mengorbankan hierarki visual.',
    author: 'Nadia Putri',
    authorInitials: 'NP',
    authorColor: 'bg-[#FEF1F5] text-[#9D113C] dark:bg-[#ee2e65]/20 dark:text-[#f895b5]',
    date: '16 Nov 2026',
    image: articleDesignImg,
    imageAlt: 'Meja kerja desain UI dengan buku catatan grid dan kartu palet warna',
    likes: 48,
  },
  {
    id: 'art-2',
    category: 'Arsitektur UI',
    readTime: '5 menit baca',
    title: 'Hierarki Tipografi Editorial untuk Kartu Materi Pembelajaran',
    excerpt:
      'Mengurangi kepadatan visual dengan mengganti lencana kotak statis menjadi pemisah titik tengah dan spasi ritmis.',
    author: 'Dimas Arya',
    authorInitials: 'DA',
    authorColor: 'bg-[#EDE9FE] text-[#543DE2] dark:bg-indigo-500/20 dark:text-indigo-300',
    date: '14 Nov 2026',
    image: articleAnalyticsImg,
    imageAlt: 'Buku terbuka dan model geometri kayu di ruang studi arsitektur modern',
    likes: 34,
  },
  {
    id: 'art-3',
    category: 'Kurikulum',
    readTime: '8 menit baca',
    title: 'Strategi Evaluasi Cepat Kalkulus Terapan Berbasis Latihan Terpandu',
    excerpt:
      'Bagaimana mengombinasikan ringkasan visual, contoh langkah demi langkah, dan kuis kilat dalam satu alur belajar.',
    author: 'Sinta Dewi',
    authorInitials: 'SD',
    authorColor: 'bg-[#E6F9F0] text-[#146C43] dark:bg-emerald-500/20 dark:text-emerald-300',
    date: '11 Nov 2026',
    image: cardOverlayImg,
    imageAlt: 'Catatan rumus kalkulus dan grafik koordinat matematika di atas meja',
    likes: 62,
  },
];

export const CardArticleUiKit: React.FC = () => {
  const { triggerToast } = useApp();
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['art-1']);
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  const toggleBookmark = (article: ArticleItem) => {
    playUiMotionSound('pop');
    setBookmarkedIds((prev) => {
      const exists = prev.includes(article.id);
      const next = exists ? prev.filter((id) => id !== article.id) : [...prev, article.id];
      triggerToast(
        exists ? 'Dihapus dari Daftar Baca' : 'Artikel Disimpan',
        article.title,
        exists ? 'info' : 'success'
      );
      return next;
    });
  };

  const toggleLike = (id: string) => {
    playUiMotionSound('tick');
    setLikedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <UiDocPage
      title="Card Article"
      description="Komponen kartu artikel editorial untuk blog, pustaka materi, dan buletin akademik dengan gambar 4:3, metadata tipografis unboxed (pemisah ·), dan aksi interaktif simpan/suka."
      subLinks={[
        { id: 'art-vertical', label: 'Vertical Editorial Cards' },
        { id: 'art-horizontal', label: 'Horizontal Feed Article' },
        { id: 'art-featured', label: 'Featured Split Article' },
      ]}
    >
      {/* 1. Vertical Article Cards */}
      <UiDocSection
        id="art-vertical"
        title="Vertical Editorial Article Cards"
        description="Grid kartu artikel 3-kolom dengan gambar cover 4:3, metadata terstruktur tanpa tumpukan pill, serta tombol bookmark & suka interaktif."
        classesHint="rounded-2xl border / aspect-[4/3] object-cover / line-clamp-2"
        codeSnippet={`<article className="rounded-2xl border border-black/[0.12] bg-white overflow-hidden flex flex-col">\n  <div className="aspect-[4/3] overflow-hidden">\n    <img src={cover} alt={alt} className="w-full h-full object-cover" />\n  </div>\n  <div className="p-4 space-y-2">\n    <div className="text-[11px] font-semibold text-[#ee2e65]">Design System · 6 menit baca</div>\n    <h3 className="text-sm font-bold text-gray-900 line-clamp-2">{title}</h3>\n    <p className="text-xs text-gray-500 line-clamp-2">{excerpt}</p>\n  </div>\n</article>`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ARTICLE_ITEMS.map((article) => {
            const isSaved = bookmarkedIds.includes(article.id);
            const isLiked = likedIds.includes(article.id);
            const likeCount = article.likes + (isLiked ? 1 : 0);

            return (
              <article
                key={article.id}
                className="group rounded-2xl border border-black/[0.12] dark:border-white/[0.10] bg-white dark:bg-[#181B21] overflow-hidden flex flex-col hover:shadow-[0_14px_34px_-16px_rgba(15,23,42,0.18)] dark:hover:border-white/[0.18] transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]"
              >
                <div className="relative aspect-[4/3] bg-gradient-to-br from-[#FEF1F5] to-[#EDE9FE] dark:from-[#1B1E24] dark:to-[#121418] overflow-hidden">
                  {!brokenImages[article.id] ? (
                    <img
                      src={article.image}
                      alt={article.imageAlt}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setBrokenImages((prev) => ({ ...prev, [article.id]: true }))
                      }
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 gap-1.5">
                      <BookOpen className="w-7 h-7 opacity-70" />
                      <span className="text-[11px] font-medium">{article.category}</span>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => toggleBookmark(article)}
                    aria-label={`Simpan ${article.title}`}
                    className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full backdrop-blur-md border flex items-center justify-center transition-colors cursor-pointer ${
                      isSaved
                        ? 'bg-[#ee2e65] border-[#ee2e65] text-white'
                        : 'bg-white/90 dark:bg-[#15181E]/85 border-black/10 dark:border-white/15 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-[#1B1E24]'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-semibold tracking-tight flex items-center gap-1.5 text-[#ee2e65] dark:text-[#f895b5]">
                      <span>{article.category}</span>
                      <span className="text-gray-400 dark:text-gray-600">·</span>
                      <span className="text-gray-500 dark:text-gray-400 font-medium inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3
                      onClick={() =>
                        triggerToast('Membuka Artikel', article.title, 'info')
                      }
                      className="text-sm font-bold text-[#1C1D21] dark:text-[#F3F4F6] leading-snug line-clamp-2 group-hover:text-[#ee2e65] dark:group-hover:text-[#f895b5] transition-colors cursor-pointer"
                    >
                      {article.title}
                    </h3>

                    <p className="text-xs text-[#5A5D67] dark:text-gray-400 leading-relaxed line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between gap-2 text-[11px]">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${article.authorColor}`}
                      >
                        {article.authorInitials}
                      </span>
                      <div className="min-w-0 truncate">
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          {article.author}
                        </span>
                        <span className="text-gray-400 dark:text-gray-600 mx-1">·</span>
                        <span className="text-gray-500 dark:text-gray-400">{article.date}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleLike(article.id)}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md font-semibold tabular-nums transition-colors cursor-pointer shrink-0 ${
                        isLiked
                          ? 'text-[#ee2e65] bg-[#FEF1F5] dark:bg-[#ee2e65]/15 dark:text-[#f895b5]'
                          : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/[0.06]'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                      <span>{likeCount}</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </UiDocSection>

      {/* 2. Horizontal Compact Feed Article Cards */}
      <UiDocSection
        id="art-horizontal"
        title="Horizontal Compact Article Card"
        description="Varian daftar ringkas dengan thumbnail di kiri dan metadata sejajar di kanan, ideal untuk feed berita atau rekomendasi artikel terkait."
        classesHint="flex items-stretch gap-3.5 rounded-2xl border p-3"
        codeSnippet={`<article className="rounded-2xl border border-black/[0.12] bg-white p-3 flex gap-3.5 items-center">\n  <img src={thumb} alt={alt} className="w-24 h-20 rounded-xl object-cover shrink-0" />\n  <div className="min-w-0 flex-1 space-y-1">...</div>\n</article>`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
          {ARTICLE_ITEMS.slice(0, 2).map((article) => {
            const isSaved = bookmarkedIds.includes(article.id);
            return (
              <article
                key={`h-${article.id}`}
                className="rounded-2xl border border-black/[0.12] dark:border-white/[0.10] bg-white dark:bg-[#181B21] p-3 flex items-center gap-3.5 hover:border-[#ee2e65]/40 transition-colors"
              >
                <div className="w-24 sm:w-28 h-20 sm:h-24 rounded-xl overflow-hidden bg-gray-100 dark:bg-[#1B1E24] shrink-0">
                  {!brokenImages[article.id] ? (
                    <img
                      src={article.image}
                      alt={article.imageAlt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <BookOpen className="w-5 h-5" />
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1 space-y-1">
                  <div className="text-[11px] font-semibold text-[#ee2e65] dark:text-[#f895b5] flex items-center gap-1.5">
                    <span>{article.category}</span>
                    <span className="text-gray-400 dark:text-gray-600">·</span>
                    <span className="text-gray-500 dark:text-gray-400 font-medium">
                      {article.readTime}
                    </span>
                  </div>

                  <h4
                    onClick={() => triggerToast('Membuka Artikel', article.title, 'info')}
                    className="text-xs sm:text-sm font-bold text-[#1C1D21] dark:text-[#F3F4F6] line-clamp-2 hover:text-[#ee2e65] dark:hover:text-[#f895b5] transition-colors cursor-pointer"
                  >
                    {article.title}
                  </h4>

                  <div className="pt-1 flex items-center justify-between gap-2 text-[11px] text-gray-500 dark:text-gray-400">
                    <span className="truncate">
                      {article.author} · {article.date}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleBookmark(article)}
                      className={`p-1 rounded-md transition-colors cursor-pointer shrink-0 ${
                        isSaved
                          ? 'text-[#ee2e65] dark:text-[#f895b5]'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                      }`}
                      title={isSaved ? 'Tersimpan' : 'Simpan artikel'}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </UiDocSection>

      {/* 3. Featured Split Hero Article Card */}
      <UiDocSection
        id="art-featured"
        title="Featured Editorial Split Card"
        description="Kartu artikel sorotan utama (featured) dengan tata letak split grid 12-kolom seimbang dan tombol aksi baca langsung."
        classesHint="grid grid-cols-1 md:grid-cols-12 items-stretch rounded-2xl overflow-hidden"
        codeSnippet={`<article className="rounded-2xl border border-black/[0.12] bg-white overflow-hidden grid grid-cols-1 md:grid-cols-12 items-stretch">\n  <div className="md:col-span-5 aspect-[4/3] md:aspect-auto">\n    <img src={featuredImg} className="w-full h-full object-cover" />\n  </div>\n  <div className="md:col-span-7 p-6 flex flex-col justify-between">...</div>\n</article>`}
      >
        <article className="max-w-4xl rounded-2xl border border-black/[0.12] dark:border-white/[0.10] bg-white dark:bg-[#181B21] overflow-hidden grid grid-cols-1 md:grid-cols-12 items-stretch">
          <div className="md:col-span-5 aspect-[4/3] md:aspect-auto bg-gray-100 dark:bg-[#1B1E24] overflow-hidden">
            {!brokenImages['art-1'] ? (
              <img
                src={ARTICLE_ITEMS[0].image}
                alt={ARTICLE_ITEMS[0].imageAlt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full min-h-[200px] flex items-center justify-center text-gray-400">
                <BookOpen className="w-8 h-8" />
              </div>
            )}
          </div>

          <div className="md:col-span-7 p-5 sm:p-6 flex flex-col justify-between gap-4">
            <div className="space-y-2.5">
              <div className="text-[11px] font-semibold text-[#ee2e65] dark:text-[#f895b5] flex items-center gap-1.5">
                <span>Pilihan Editor</span>
                <span className="text-gray-400 dark:text-gray-600">·</span>
                <span>{ARTICLE_ITEMS[0].category}</span>
                <span className="text-gray-400 dark:text-gray-600">·</span>
                <span className="text-gray-500 dark:text-gray-400 font-medium">
                  {ARTICLE_ITEMS[0].readTime}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[#1C1D21] dark:text-[#F3F4F6] leading-snug">
                {ARTICLE_ITEMS[0].title}
              </h3>

              <p className="text-xs sm:text-sm text-[#5A5D67] dark:text-gray-400 leading-relaxed">
                {ARTICLE_ITEMS[0].excerpt} Pelajari bagaimana memadukan warna dasar Obsidian Dark (#121418) dengan permukaan elevated yang tetap nyaman dibaca dalam sesi panjang.
              </p>
            </div>

            <div className="pt-3 border-t border-black/[0.08] dark:border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 text-xs">
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold ${ARTICLE_ITEMS[0].authorColor}`}
                >
                  {ARTICLE_ITEMS[0].authorInitials}
                </span>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-[#F3F4F6]">
                    {ARTICLE_ITEMS[0].author}
                  </div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400">
                    Lead UI Architect · {ARTICLE_ITEMS[0].date}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    triggerToast(
                      'Tautan Artikel Disalin',
                      'Tautan artikel pilihan siap dibagikan.',
                      'info'
                    )
                  }
                  className={ACTION_BTN_SECONDARY}
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Bagikan</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    triggerToast('Membaca Artikel', ARTICLE_ITEMS[0].title, 'success')
                  }
                  className={ACTION_BTN_PRIMARY}
                >
                  <span>Baca Artikel</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </article>
      </UiDocSection>
    </UiDocPage>
  );
};
