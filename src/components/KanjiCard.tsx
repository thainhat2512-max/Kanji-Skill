import React from 'react';
import { Volume2, Bookmark, BookmarkCheck, CheckCircle2, ChevronRight } from 'lucide-react';
import { KanjiItem } from '../types';
import { sound } from '../utils/audio';

interface Props {
  kanji: KanjiItem;
  isFavorite: boolean;
  isLearned: boolean;
  onSelect: (kanji: KanjiItem) => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onToggleLearned: (id: string, e: React.MouseEvent) => void;
}

export const KanjiCard: React.FC<Props> = ({
  kanji,
  isFavorite,
  isLearned,
  onSelect,
  onToggleFavorite,
  onToggleLearned,
}) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'N5': return 'from-emerald-400 to-teal-600 border-emerald-400/30 text-emerald-300';
      case 'N4': return 'from-cyan-400 to-blue-600 border-cyan-400/30 text-cyan-300';
      case 'N3': return 'from-violet-500 to-purple-700 border-violet-400/30 text-violet-300';
      case 'N2': return 'from-fuchsia-500 to-pink-600 border-fuchsia-400/30 text-fuchsia-300';
      case 'N1': return 'from-amber-400 to-rose-600 border-amber-400/30 text-amber-300';
      default: return 'from-pink-500 to-purple-600 border-pink-400/30 text-pink-300';
    }
  };

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    sound.speakJapanese(kanji.character);
  };

  return (
    <div
      id={`kanji-card-${kanji.id}`}
      onClick={() => {
        sound.playClick();
        onSelect(kanji);
      }}
      className="group relative cursor-pointer rounded-2xl bg-slate-900/60 hover:bg-slate-900/90 border border-white/10 hover:border-pink-500/50 backdrop-blur-md transition-all duration-300 p-4 flex flex-col justify-between shadow-lg hover:shadow-[0_10px_30px_-5px_rgba(236,72,153,0.3)] hover:-translate-y-1.5"
    >
      {/* Learned Badge Indicator */}
      {isLearned && (
        <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-[0_0_12px_rgba(16,185,129,0.8)] z-10">
          <CheckCircle2 className="w-4 h-4 text-white fill-emerald-600" />
        </div>
      )}

      {/* Top row: JLPT badge, Stroke count, and Actions */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-1.5">
          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border bg-slate-950/80 ${getLevelColor(kanji.jlpt)}`}>
            {kanji.jlpt}
          </span>
          <span className="text-[11px] font-medium text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded-full border border-white/5">
            {kanji.strokeCount} nét
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            id={`btn-fav-${kanji.id}`}
            onClick={(e) => onToggleFavorite(kanji.id, e)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-amber-400/10 transition-colors"
            title={isFavorite ? 'Bỏ lưu' : 'Lưu vào mục yêu thích'}
          >
            {isFavorite ? (
              <BookmarkCheck className="w-4 h-4 text-amber-400 fill-amber-400/20" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>

          <button
            id={`btn-speak-${kanji.id}`}
            onClick={handleSpeak}
            className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-colors"
            title="Nghe phát âm"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Center: Big Kanji Character with Rainbow Glow */}
      <div className="flex flex-col items-center justify-center my-2">
        <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-b from-slate-800/40 to-slate-950/80 border border-white/10 group-hover:border-pink-500/40 transition-colors">
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/0 via-purple-500/0 to-cyan-400/0 group-hover:from-pink-500/20 group-hover:via-purple-500/20 group-hover:to-cyan-400/20 rounded-2xl transition-all duration-500"></div>

          <span className="text-4xl font-black text-white group-hover:scale-110 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-rose-400 group-hover:via-purple-300 group-hover:to-cyan-300 transition-all duration-300">
            {kanji.character}
          </span>
        </div>

        {/* Hán Việt Title */}
        <h3 className="mt-3 text-sm font-extrabold tracking-wider text-rose-300 text-center uppercase">
          {kanji.hanViet}
        </h3>

        {/* Vietnamese Meaning */}
        <p className="text-xs text-slate-300 line-clamp-1 text-center font-medium mt-0.5">
          {kanji.vietnamese}
        </p>
      </div>

      {/* Bottom info: Readings preview */}
      <div className="mt-3 pt-2.5 border-t border-white/5 flex flex-col gap-1 text-[11px]">
        {kanji.onyomi.length > 0 && (
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="text-[10px] font-bold text-pink-400/90 bg-pink-950/40 px-1.5 py-0.2 rounded">On</span>
            <span className="truncate text-slate-300">
              {kanji.onyomi.map(o => o.split(' ')[0]).join(', ')}
            </span>
          </div>
        )}

        {kanji.kunyomi.length > 0 && (
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="text-[10px] font-bold text-cyan-400/90 bg-cyan-950/40 px-1.5 py-0.2 rounded">Kun</span>
            <span className="truncate text-slate-300">
              {kanji.kunyomi.map(k => k.split(' ')[0]).join(', ')}
            </span>
          </div>
        )}
      </div>

      {/* Hover action footer */}
      <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-purple-400 group-hover:text-pink-400 transition-colors">
        <span>Tập viết & ví dụ</span>
        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};
