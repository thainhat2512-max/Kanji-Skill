import React, { useState } from 'react';
import { X, Search, Sparkles, Filter } from 'lucide-react';
import { KANGXI_RADICALS, RadicalItem } from '../data/radicalsData';
import { sound } from '../utils/audio';

interface Props {
  selectedRadical: string | null;
  onSelectRadical: (radicalChar: string | null) => void;
  onClose: () => void;
}

export const RadicalPickerModal: React.FC<Props> = ({
  selectedRadical,
  onSelectRadical,
  onClose,
}) => {
  const [search, setSearch] = useState('');
  const [selectedStrokeFilter, setSelectedStrokeFilter] = useState<number | 'all'>('all');

  // Distinct stroke groups
  const strokeNumbers = Array.from(new Set(KANGXI_RADICALS.map(r => r.strokes))).sort((a, b) => a - b);

  const filteredRadicals = KANGXI_RADICALS.filter(r => {
    if (selectedStrokeFilter !== 'all' && r.strokes !== selectedStrokeFilter) {
      return false;
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      return (
        r.character.includes(q) ||
        r.hanViet.toLowerCase().includes(q) ||
        r.meaning.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-slate-900 border border-white/15 shadow-[0_0_50px_rgba(236,72,153,0.3)] overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-500 to-cyan-400 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <span className="text-xl font-black text-pink-400 font-japanese">部</span>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                214 Bộ Thủ Khang Hy (康熙部首)
              </h2>
              <p className="text-xs text-slate-400">
                Tra cứu Kanji theo bộ thủ cấu thành chữ Hán
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {selectedRadical && (
              <button
                onClick={() => {
                  sound.playClick();
                  onSelectRadical(null);
                }}
                className="text-xs px-3 py-1.5 rounded-xl bg-slate-800 text-pink-300 hover:bg-slate-700 transition-colors"
              >
                Xóa bộ thủ đang chọn
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="p-4 border-b border-white/10 bg-slate-950/40 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm tên bộ thủ, nghĩa tiếng Việt..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
            />
          </div>

          {/* Stroke count quick filter pills */}
          <div className="flex items-center gap-1 overflow-x-auto w-full pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedStrokeFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                selectedStrokeFilter === 'all'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white'
              }`}
            >
              Tất cả
            </button>
            {strokeNumbers.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedStrokeFilter(s)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                  selectedStrokeFilter === s
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white'
                }`}
              >
                {s} nét
              </button>
            ))}
          </div>
        </div>

        {/* Radicals Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
          {filteredRadicals.map((rad) => {
            const isSelected = selectedRadical === rad.character;
            return (
              <button
                key={rad.number}
                onClick={() => {
                  sound.playClick();
                  onSelectRadical(rad.character);
                  onClose();
                }}
                className={`p-3 rounded-2xl border text-left transition-all group flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-tr from-pink-500/25 to-purple-500/25 border-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.3)]'
                    : 'bg-slate-950/60 border-white/5 hover:border-pink-500/30 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xl sm:text-2xl font-black font-japanese text-white group-hover:text-pink-400 transition-colors">
                    {rad.character}
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-900 border border-white/10 text-slate-400">
                    {rad.strokes} nét
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-pink-300">
                    {rad.hanViet}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1">
                    {rad.meaning}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <span>Tìm thấy {filteredRadicals.length} bộ thủ</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-white hover:bg-slate-700 transition-colors"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
};
