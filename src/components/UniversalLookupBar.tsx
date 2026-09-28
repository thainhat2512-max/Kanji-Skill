import React, { useState } from 'react';
import { Search, Sparkles, BookOpen, Layers, X, Flame } from 'lucide-react';
import { KanjiItem } from '../types';
import { lookupAnyKanji } from '../utils/dictionaryEngine';
import { sound } from '../utils/audio';

interface Props {
  onSelectKanji: (kanji: KanjiItem) => void;
  onOpenRadicalPicker: () => void;
  selectedRadical: string | null;
  onClearRadical: () => void;
  strokeFilter: { min: number | null; max: number | null };
  onSetStrokeFilter: (filter: { min: number | null; max: number | null }) => void;
}

export const UniversalLookupBar: React.FC<Props> = ({
  onSelectKanji,
  onOpenRadicalPicker,
  selectedRadical,
  onClearRadical,
  strokeFilter,
  onSetStrokeFilter,
}) => {
  const [directInput, setDirectInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLookup = (textToLookup?: string) => {
    const target = textToLookup || directInput;
    if (!target.trim()) return;

    sound.playClick();
    const result = lookupAnyKanji(target.trim());
    if (result) {
      setErrorMsg('');
      onSelectKanji(result);
      setDirectInput('');
    } else {
      setErrorMsg(`Không tìm thấy Kanji phù hợp với "${target}". Hãy thử nhập 1 chữ Hán tự (ví dụ: 鬱, 龍, 桜, 夢).`);
      setTimeout(() => setErrorMsg(''), 4000);
    }
  };

  const sampleKanji = ['鬱', '龍', '桜', '愛', '夢', '鬼', '侍', '忍', '鑑', '鳳', '鶴', '薔'];

  return (
    <div className="w-full rounded-3xl bg-slate-900/90 border border-white/15 p-4 sm:p-5 backdrop-blur-xl shadow-xl flex flex-col gap-3">
      
      {/* Search Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-gradient-to-r from-pink-500 to-cyan-400">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5">
              Tra Cứu Kanji Toàn Năng Trong Từ Điển
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-950/60 border border-pink-500/30 text-pink-300 font-bold">
                Tất cả Kanji CJK
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Nhập hoặc dán bất kỳ chữ Kanji nào để xem nghĩa, phát âm & kiểm tra thứ tự nét vẽ ngay lập tức
            </p>
          </div>
        </div>

        {/* Radical & Stroke Count Tool Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => {
              sound.playClick();
              onOpenRadicalPicker();
            }}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
              selectedRadical
                ? 'bg-pink-500 text-white border-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.5)]'
                : 'bg-slate-800/80 text-slate-300 border-white/10 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{selectedRadical ? `Bộ: ${selectedRadical}` : 'Tra 214 Bộ Thủ'}</span>
            {selectedRadical && (
              <span 
                onClick={(e) => {
                  e.stopPropagation();
                  onClearRadical();
                }}
                className="hover:text-red-200"
              >
                ✕
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Input Row */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleLookup();
        }}
        className="flex items-center gap-2"
      >
        <div className="relative flex-1">
          <input
            id="universal-kanji-input"
            type="text"
            value={directInput}
            onChange={(e) => setDirectInput(e.target.value)}
            placeholder="Dán hoặc gõ bất kỳ Kanji nào (ví dụ: 鬱, 龍, 桜, 鬼, 侍, 曖, 夢, 愛, 麒麟...)"
            className="w-full pl-4 pr-10 py-2.5 rounded-2xl bg-slate-950/80 border border-white/15 focus:border-cyan-400/70 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 text-xs sm:text-sm text-white placeholder-slate-500 transition-all font-medium"
          />
          {directInput && (
            <button
              type="button"
              onClick={() => setDirectInput('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
            >
              ✕
            </button>
          )}
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all flex items-center gap-1.5 whitespace-nowrap"
        >
          <Search className="w-4 h-4" />
          <span>Tra từ điển</span>
        </button>
      </form>

      {/* Error Message */}
      {errorMsg && (
        <div className="p-2 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs animate-in fade-in">
          {errorMsg}
        </div>
      )}

      {/* Sample Quick Kanji Chips to try */}
      <div className="flex items-center gap-1.5 flex-wrap pt-1 text-xs">
        <span className="text-slate-400 text-[11px] font-semibold flex items-center gap-1 mr-1">
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          Gợi ý chữ thú vị:
        </span>
        {sampleKanji.map((char) => (
          <button
            key={char}
            type="button"
            onClick={() => handleLookup(char)}
            className="w-7 h-7 rounded-lg bg-slate-800/80 hover:bg-gradient-to-tr hover:from-pink-500 hover:to-cyan-400 hover:text-white border border-white/10 text-slate-200 font-japanese font-bold text-xs flex items-center justify-center transition-all"
            title={`Tra cứu chữ ${char}`}
          >
            {char}
          </button>
        ))}

        {/* Quick Stroke Range Filter Buttons */}
        <div className="ml-auto flex items-center gap-1">
          <span className="text-[11px] text-slate-400">Số nét:</span>
          {[
            { label: 'Tất cả', min: null, max: null },
            { label: '1-5', min: 1, max: 5 },
            { label: '6-10', min: 6, max: 10 },
            { label: '11-15', min: 11, max: 15 },
            { label: '16+', min: 16, max: 40 },
          ].map((item, idx) => {
            const isActive = strokeFilter.min === item.min && strokeFilter.max === item.max;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  sound.playClick();
                  onSetStrokeFilter({ min: item.min, max: item.max });
                }}
                className={`px-2 py-0.5 rounded-lg text-[11px] font-semibold transition-colors ${
                  isActive
                    ? 'bg-cyan-500/30 border border-cyan-400 text-cyan-300'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
