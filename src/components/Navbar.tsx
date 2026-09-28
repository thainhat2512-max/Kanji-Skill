import React from 'react';
import { 
  Sparkles, 
  BookOpen, 
  PenTool, 
  HelpCircle, 
  Bookmark, 
  Volume2, 
  VolumeX, 
  Search, 
  CheckCircle2, 
  Award, 
  Coins, 
  Shirt, 
  User 
} from 'lucide-react';
import { ActiveTab, StickmanProfile } from '../types';
import { StickmanRenderer } from './StickmanRenderer';
import { sound } from '../utils/audio';

interface Props {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  learnedCount: number;
  totalKanjiCount: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  coins: number;
  stickmanProfile: StickmanProfile;
}

export const Navbar: React.FC<Props> = ({
  activeTab,
  onSelectTab,
  searchQuery,
  onSearchChange,
  learnedCount,
  totalKanjiCount,
  soundEnabled,
  onToggleSound,
  coins,
  stickmanProfile,
}) => {
  const percentLearned = totalKanjiCount > 0 
    ? Math.round((learnedCount / totalKanjiCount) * 100) 
    : 0;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl transition-all">
      {/* Rainbow top line glow */}
      <div className="h-[2px] w-full bg-gradient-to-r from-rose-500 via-purple-500 via-cyan-400 to-amber-400 animate-rainbow"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo & Brand */}
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <div 
            onClick={() => {
              sound.playClick();
              onSelectTab('library');
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Rainbow glowing badge logo */}
            <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 via-purple-500 to-cyan-400 p-0.5 shadow-[0_0_20px_rgba(236,72,153,0.5)] group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-cyan-300 font-japanese">
                  虹
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-1">
                  Kanji <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-300">Niji</span>
                </h1>
                <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-gradient-to-r from-rose-500 to-indigo-500 text-white uppercase tracking-wider">
                  Stickman RPG
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Học Kanji & Đổi đồ cho Người Que
              </p>
            </div>
          </div>

          {/* Mobile Right Controls: Coins & Sound */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                onSelectTab('stickman-shop');
              }}
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold"
            >
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              <span>{coins}</span>
            </button>

            <button
              onClick={onToggleSound}
              className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300"
              title={soundEnabled ? 'Tắt âm' : 'Bật âm'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>
          </div>
        </div>

        {/* Center: Search Box */}
        <div className="relative w-full md:max-w-xs lg:max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            id="kanji-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm Kanji, Hán Việt, nghĩa, On, Kun..."
            className="w-full pl-10 pr-4 py-2 rounded-2xl bg-slate-900/90 border border-white/10 focus:border-pink-500/60 focus:outline-none focus:ring-2 focus:ring-pink-500/20 text-xs text-white placeholder-slate-500 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
            >
              ✕
            </button>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          <button
            id="nav-tab-library"
            onClick={() => {
              sound.playClick();
              onSelectTab('library');
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'library'
                ? 'bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.4)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Thư viện</span>
          </button>

          <button
            id="nav-tab-practice"
            onClick={() => {
              sound.playClick();
              onSelectTab('practice-draw');
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'practice-draw'
                ? 'bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Tập viết</span>
          </button>

          <button
            id="nav-tab-quiz-choice"
            onClick={() => {
              sound.playClick();
              onSelectTab('quiz-choice');
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'quiz-choice'
                ? 'bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 text-white shadow-[0_0_15px_rgba(217,70,239,0.4)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Trắc nghiệm</span>
          </button>

          <button
            id="nav-tab-quiz-stroke"
            onClick={() => {
              sound.playClick();
              onSelectTab('quiz-stroke');
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'quiz-stroke'
                ? 'bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 text-white shadow-[0_0_15px_rgba(251,191,36,0.4)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Thử thách viết</span>
          </button>

          <button
            id="nav-tab-stickman-shop"
            onClick={() => {
              sound.playClick();
              onSelectTab('stickman-shop');
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
              activeTab === 'stickman-shop'
                ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white border-pink-400 shadow-[0_0_20px_rgba(244,63,94,0.5)] scale-105'
                : 'bg-pink-950/30 text-pink-300 border-pink-500/30 hover:bg-pink-900/50 hover:text-white'
            }`}
          >
            <Shirt className="w-3.5 h-3.5 text-pink-400" />
            <span>Người Que & Shop</span>
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          </button>

          <button
            id="nav-tab-favorites"
            onClick={() => {
              sound.playClick();
              onSelectTab('favorites');
            }}
            className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'favorites'
                ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Đã lưu</span>
          </button>

          {/* Desktop Coin Counter & Avatar Button */}
          <div className="hidden md:flex items-center gap-2 pl-2 border-l border-white/10">
            {/* Coins Chip */}
            <button
              onClick={() => {
                sound.playClick();
                onSelectTab('stickman-shop');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 border border-amber-500/40 text-amber-300 transition-all shadow-[0_0_10px_rgba(251,191,36,0.2)]"
              title="Số Xu Cầu Vồng kiếm được từ viết Kanji - Bấm để vào Shop"
            >
              <Coins className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="text-xs font-black">{coins.toLocaleString('vi-VN')} Xu</span>
            </button>

            {/* Stickman mini head button */}
            <button
              onClick={() => {
                sound.playClick();
                onSelectTab('stickman-shop');
              }}
              className="w-8 h-8 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/15 overflow-hidden flex items-center justify-center group p-0.5"
              title={`Người que: ${stickmanProfile.name} - Bấm để chỉnh sửa`}
            >
              <StickmanRenderer
                profile={stickmanProfile}
                size="xs"
                showGlow={false}
              />
            </button>

            {/* Audio Toggle */}
            <button
              onClick={onToggleSound}
              className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-cyan-400/40 transition-colors"
              title={soundEnabled ? 'Tắt âm' : 'Bật âm thanh'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>

            {/* Progress pill */}
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-1.5 rounded-xl border border-emerald-500/20 shadow-sm" title={`Đã thuộc ${learnedCount}/${totalKanjiCount} Kanji`}>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{percentLearned}%</span>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};
