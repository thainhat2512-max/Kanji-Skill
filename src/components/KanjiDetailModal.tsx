import React, { useState } from 'react';
import { 
  X, 
  Volume2, 
  Bookmark, 
  BookmarkCheck, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  BookOpen, 
  Compass, 
  ListTree, 
  Layers
} from 'lucide-react';
import { KanjiItem } from '../types';
import { KanjiStrokeWriter } from './KanjiStrokeWriter';
import { sound } from '../utils/audio';

interface Props {
  kanji: KanjiItem;
  allKanji: KanjiItem[];
  isFavorite: boolean;
  isLearned: boolean;
  onClose: () => void;
  onSelectKanji: (kanji: KanjiItem) => void;
  onToggleFavorite: (id: string) => void;
  onToggleLearned: (id: string) => void;
  onCorrectStroke?: () => void;
  onCompletePractice?: (score: number) => void;
}

export const KanjiDetailModal: React.FC<Props> = ({
  kanji,
  allKanji,
  isFavorite,
  isLearned,
  onClose,
  onSelectKanji,
  onToggleFavorite,
  onToggleLearned,
  onCorrectStroke,
  onCompletePractice,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'writer' | 'examples' | 'mnemonics'>('writer');

  // Find index for prev/next
  const currentIndex = allKanji.findIndex(k => k.id === kanji.id);
  const prevKanji = currentIndex > 0 ? allKanji[currentIndex - 1] : null;
  const nextKanji = currentIndex < allKanji.length - 1 ? allKanji[currentIndex + 1] : null;

  const handlePrev = () => {
    if (prevKanji) {
      sound.playClick();
      onSelectKanji(prevKanji);
    }
  };

  const handleNext = () => {
    if (nextKanji) {
      sound.playClick();
      onSelectKanji(nextKanji);
    }
  };

  const handleSpeak = (text: string) => {
    sound.playClick();
    sound.speakJapanese(text);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-slate-900/90 border border-white/15 backdrop-blur-2xl shadow-[0_0_50px_rgba(236,72,153,0.25)] overflow-hidden">
        
        {/* Top Header with Rainbow Gradient Accent */}
        <div className="relative px-6 py-4 border-b border-white/10 flex items-center justify-between bg-slate-950/50">
          {/* Rainbow decorative top line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-purple-500 via-cyan-400 to-amber-400 animate-rainbow"></div>

          {/* Left: Kanji Character & Level */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-500/20 via-purple-500/20 to-cyan-400/20 border border-white/15">
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-300">
                {kanji.character}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white tracking-wide uppercase">
                  {kanji.hanViet}
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-purple-950/60 text-purple-300 border border-purple-500/30">
                  {kanji.jlpt}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-slate-800 text-slate-300 border border-white/10">
                  {kanji.strokeCount} nét
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Bộ thủ: <span className="text-slate-200 font-medium">{kanji.radical}</span>
              </p>
            </div>
          </div>

          {/* Right: Quick actions & Close */}
          <div className="flex items-center gap-2">
            <button
              id="btn-modal-fav"
              onClick={() => {
                sound.playClick();
                onToggleFavorite(kanji.id);
              }}
              className={`p-2 rounded-xl border transition-all ${
                isFavorite 
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' 
                  : 'bg-slate-800/60 border-white/10 text-slate-400 hover:text-white'
              }`}
              title="Yêu thích"
            >
              {isFavorite ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
            </button>

            <button
              id="btn-modal-learned"
              onClick={() => {
                sound.playClick();
                onToggleLearned(kanji.id);
              }}
              className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isLearned 
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' 
                  : 'bg-slate-800/60 border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <CheckCircle2 className={`w-4 h-4 ${isLearned ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">{isLearned ? 'Đã thuộc' : 'Đánh dấu đã học'}</span>
            </button>

            <button
              id="btn-modal-close"
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-500/20 hover:text-rose-400 border border-white/10 text-slate-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Interactive Stroke Writer Canvas (lg: 5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center bg-slate-950/40 rounded-2xl p-4 border border-white/5">
            <div className="flex items-center justify-between w-full mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                Tập viết tương tác
              </span>
              <span className="text-[11px] text-slate-400">
                Thứ tự: 1 ➔ {kanji.strokeCount}
              </span>
            </div>

            {/* HanziWriter Stroke Tool */}
            <KanjiStrokeWriter 
              kanji={kanji} 
              onCorrectStroke={onCorrectStroke}
              onCompletePractice={onCompletePractice}
            />

            {/* Mẹo ghi nhớ / Radical explanation below canvas */}
            {kanji.mnemonics && (
              <div className="w-full mt-4 p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/20 text-xs">
                <span className="font-bold text-purple-300 block mb-1 flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-purple-400" />
                  Mẹo ghi nhớ hình tượng:
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {kanji.mnemonics}
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Information, Readings, and Vocabulary Examples (lg: 7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Meaning Card */}
            <div className="p-4 rounded-2xl bg-slate-950/40 border border-white/10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Nghĩa tiếng Việt
              </span>
              <p className="text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-200 to-cyan-200">
                {kanji.vietnamese}
              </p>
            </div>

            {/* On'yomi & Kun'yomi Readings Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* On'yomi */}
              <div className="p-3.5 rounded-2xl bg-slate-950/40 border border-pink-500/20 relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-pink-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                    Âm On (Âm Hán)
                  </span>
                  <span className="text-[10px] text-slate-500">Katakana</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {kanji.onyomi.length > 0 ? (
                    kanji.onyomi.map((on, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSpeak(on.split(' ')[0])}
                        className="group text-xs font-semibold px-2.5 py-1 rounded-lg bg-pink-950/30 border border-pink-500/30 text-pink-200 hover:border-pink-400 hover:bg-pink-900/40 flex items-center gap-1 transition-all"
                      >
                        <span>{on}</span>
                        <Volume2 className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                      </button>
                    ))
                  ) : (
                    <span className="text-xs text-slate-500 italic">Không có âm On phổ biến</span>
                  )}
                </div>
              </div>

              {/* Kun'yomi */}
              <div className="p-3.5 rounded-2xl bg-slate-950/40 border border-cyan-500/20 relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                    Âm Kun (Âm Nhật)
                  </span>
                  <span className="text-[10px] text-slate-500">Hiragana</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {kanji.kunyomi.length > 0 ? (
                    kanji.kunyomi.map((kun, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSpeak(kun.split(' ')[0])}
                        className="group text-xs font-semibold px-2.5 py-1 rounded-lg bg-cyan-950/30 border border-cyan-500/30 text-cyan-200 hover:border-cyan-400 hover:bg-cyan-900/40 flex items-center gap-1 transition-all"
                      >
                        <span>{kun}</span>
                        <Volume2 className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                      </button>
                    ))
                  ) : (
                    <span className="text-xs text-slate-500 italic">Không có âm Kun phổ biến</span>
                  )}
                </div>
              </div>
            </div>

            {/* Real-world Vocabulary & Sentence Examples */}
            <div className="p-4 rounded-2xl bg-slate-950/40 border border-white/10 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-300 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                  Từ vựng & Câu ví dụ thực tế
                </span>
                <span className="text-[11px] text-slate-400">
                  {kanji.examples.length} ví dụ
                </span>
              </div>

              <div className="space-y-3 flex-1">
                {kanji.examples.map((ex, idx) => (
                  <div 
                    key={idx} 
                    className="p-3 rounded-xl bg-slate-900/70 border border-white/5 hover:border-pink-500/30 transition-colors"
                  >
                    {/* Word row */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-lg font-bold text-white font-japanese">
                          {ex.word}
                        </span>
                        <span className="text-xs text-rose-300 font-medium">
                          【{ex.furigana}】
                        </span>
                        <span className="text-[11px] text-slate-400 italic">
                          ({ex.romaji})
                        </span>
                      </div>

                      <button
                        onClick={() => handleSpeak(ex.word)}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-cyan-400 hover:bg-cyan-950/30 transition-colors"
                        title="Nghe từ vựng"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Word meaning */}
                    <p className="text-xs font-semibold text-cyan-300 mt-1">
                      ➔ {ex.meaning}
                    </p>

                    {/* Sentence (if available) */}
                    {ex.sentence && (
                      <div className="mt-2 pt-2 border-t border-slate-800/80 text-xs">
                        <div className="flex items-start justify-between gap-1 text-slate-200">
                          <div>
                            <p className="font-japanese font-medium text-slate-100">
                              {ex.sentence.jp}
                            </p>
                            <p className="text-[11px] text-slate-400 mt-0.5">
                              {ex.sentence.furigana} ({ex.sentence.romaji})
                            </p>
                          </div>
                          <button
                            onClick={() => handleSpeak(ex.sentence?.jp || '')}
                            className="p-1 rounded text-slate-400 hover:text-purple-300 transition-colors shrink-0"
                            title="Nghe câu ví dụ"
                          >
                            <Volume2 className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-[11px] text-emerald-400/90 mt-1 font-medium">
                          Dịch: {ex.sentence.vi}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Footer with Prev / Next Kanji Navigation */}
        <div className="px-6 py-3 border-t border-white/10 bg-slate-950/70 flex items-center justify-between">
          <button
            id="btn-prev-kanji"
            onClick={handlePrev}
            disabled={!prevKanji}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Chữ trước</span>
            {prevKanji && <span className="font-bold text-rose-300">({prevKanji.character})</span>}
          </button>

          <div className="text-xs text-slate-400 font-medium">
            Chữ <span className="text-white font-bold">{currentIndex + 1}</span> / {allKanji.length}
          </div>

          <button
            id="btn-next-kanji"
            onClick={handleNext}
            disabled={!nextKanji}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            <span className="hidden sm:inline">Chữ tiếp</span>
            {nextKanji && <span className="font-bold text-cyan-300">({nextKanji.character})</span>}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
