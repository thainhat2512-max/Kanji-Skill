import React, { useState } from 'react';
import { Sparkles, ChevronLeft, ChevronRight, Volume2, Bookmark, CheckCircle2, Coins, Shirt } from 'lucide-react';
import { KanjiItem, StickmanProfile } from '../types';
import { KanjiStrokeWriter } from './KanjiStrokeWriter';
import { StickmanRenderer } from './StickmanRenderer';
import { sound } from '../utils/audio';

interface Props {
  allKanji: KanjiItem[];
  selectedKanji: KanjiItem;
  onSelectKanji: (kanji: KanjiItem) => void;
  isFavorite: boolean;
  isLearned: boolean;
  onToggleFavorite: (id: string) => void;
  onToggleLearned: (id: string) => void;
  stickmanProfile: StickmanProfile;
  coins: number;
  onCorrectStroke?: () => void;
  onCompleteCharacter?: (score: number) => void;
  onOpenShop?: () => void;
}

export const PracticeDrawView: React.FC<Props> = ({
  allKanji,
  selectedKanji,
  onSelectKanji,
  isFavorite,
  isLearned,
  onToggleFavorite,
  onToggleLearned,
  stickmanProfile,
  coins,
  onCorrectStroke,
  onCompleteCharacter,
  onOpenShop,
}) => {
  const currentIndex = allKanji.findIndex(k => k.id === selectedKanji.id);
  const prevKanji = currentIndex > 0 ? allKanji[currentIndex - 1] : null;
  const nextKanji = currentIndex < allKanji.length - 1 ? allKanji[currentIndex + 1] : null;

  const [stickmanCheer, setStickmanCheer] = useState<string>('Hãy cùng viết đúng từng nét nhé!');
  const [stickmanPose, setStickmanPose] = useState<'idle' | 'celebrating'>('idle');

  const handleCorrectStroke = () => {
    const cheers = [
      'Nét chuẩn lắm! +10 Xu 🪙',
      'Xuất sắc! Tiếp tục nào! 🌟',
      'Nét vẽ đẹp tuyệt vời! +10 Xu 🪙',
      'Giỏi quá! Cố lên bạn ơi! ✨'
    ];
    const randomCheer = cheers[Math.floor(Math.random() * cheers.length)];
    setStickmanCheer(randomCheer);
    setStickmanPose('celebrating');
    setTimeout(() => setStickmanPose('idle'), 1000);

    if (onCorrectStroke) {
      onCorrectStroke();
    }
  };

  const handleCompletePractice = (score: number) => {
    setStickmanCheer(`Tuyệt vời! Bạn viết đúng chữ ${selectedKanji.character} (+50 Xu) 🎉`);
    setStickmanPose('celebrating');
    setTimeout(() => setStickmanPose('idle'), 2500);

    if (onCompleteCharacter) {
      onCompleteCharacter(score);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
      
      {/* Banner / Level Selector Strip */}
      <div className="w-full mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-500 to-cyan-400 p-0.5 flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.3)]">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <span className="text-2xl font-black text-white font-japanese">{selectedKanji.character}</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-white uppercase tracking-wide">
                {selectedKanji.hanViet}
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-pink-950/50 text-pink-300 border border-pink-500/30">
                {selectedKanji.jlpt}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {selectedKanji.strokeCount} nét • Bộ {selectedKanji.radical}
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Nghĩa: <span className="text-cyan-300 font-medium">{selectedKanji.vietnamese}</span>
            </p>
          </div>
        </div>

        {/* Action Controls & Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleFavorite(selectedKanji.id)}
            className={`p-2.5 rounded-2xl border transition-all ${
              isFavorite
                ? 'bg-amber-500 text-white border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.5)]'
                : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-white/10'
            }`}
            title={isFavorite ? 'Đã lưu vào danh sách yêu thích' : 'Lưu Kanji này'}
          >
            <Bookmark className="w-5 h-5" />
          </button>

          <button
            onClick={() => onToggleLearned(selectedKanji.id)}
            className={`p-2.5 rounded-2xl border transition-all ${
              isLearned
                ? 'bg-emerald-500 text-white border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-white/10'
            }`}
            title={isLearned ? 'Đã đánh dấu đã thuộc' : 'Đánh dấu đã thuộc'}
          >
            <CheckCircle2 className="w-5 h-5" />
          </button>

          <div className="w-[1px] h-6 bg-white/10 mx-1"></div>

          <button
            onClick={() => {
              if (prevKanji) {
                sound.playClick();
                onSelectKanji(prevKanji);
              }
            }}
            disabled={!prevKanji}
            className="p-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700 disabled:opacity-30 border border-white/10 text-slate-200 transition-all"
            title="Chữ trước"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              sound.playClick();
              sound.speakJapanese(selectedKanji.character);
            }}
            className="p-2.5 rounded-2xl bg-slate-800/80 hover:bg-pink-500/20 hover:text-pink-400 border border-white/10 text-slate-200 transition-all"
            title="Phát âm chữ"
          >
            <Volume2 className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              if (nextKanji) {
                sound.playClick();
                onSelectKanji(nextKanji);
              }
            }}
            disabled={!nextKanji}
            className="p-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700 disabled:opacity-30 border border-white/10 text-slate-200 transition-all"
            title="Chữ tiếp theo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Practice Container */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Interactive Stroke Writer */}
        <div className="lg:col-span-7 flex flex-col items-center p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl shadow-2xl">
          <KanjiStrokeWriter 
            key={selectedKanji.id} 
            kanji={selectedKanji}
            initialMode="interactive"
            onCorrectStroke={handleCorrectStroke}
            onCompletePractice={handleCompletePractice}
          />
        </div>

        {/* Right Column: Companion Stickman & Character Quick Reference */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          
          {/* Stickman Companion Cheer Box */}
          <div className="p-4 rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950/30 to-slate-900 border border-pink-500/20 backdrop-blur-xl shadow-xl flex items-center gap-4">
            <div 
              onClick={() => {
                sound.playClick();
                setStickmanPose('celebrating');
                setTimeout(() => setStickmanPose('idle'), 1200);
              }}
              className="cursor-pointer hover:scale-105 transition-transform shrink-0"
              title="Bạn đồng hành Người Que cổ vũ bạn"
            >
              <StickmanRenderer
                profile={stickmanProfile}
                size="sm"
                actionPose={stickmanPose}
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[10px] font-bold text-pink-400 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {stickmanProfile.name}
                </span>
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5" />
                  {coins} Xu
                </span>
              </div>

              {/* Thought Bubble */}
              <div className="p-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-xs text-white leading-tight font-medium shadow-inner">
                {stickmanCheer}
              </div>

              {onOpenShop && (
                <button
                  onClick={() => {
                    sound.playClick();
                    onOpenShop();
                  }}
                  className="mt-2 text-[11px] font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 hover:underline"
                >
                  <Shirt className="w-3 h-3" />
                  <span>Vào Cửa Hàng mua đồ cho Người Que ➔</span>
                </button>
              )}
            </div>
          </div>

          {/* Readings Card */}
          <div className="p-5 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-pink-400 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Cách đọc chuẩn
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-950/60 border border-pink-500/20">
                <span className="text-[10px] font-bold text-pink-400 block mb-1 uppercase">
                  Âm On (Âm Hán):
                </span>
                <p className="text-sm font-semibold text-white">
                  {selectedKanji.onyomi.join(' • ') || 'Không có'}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950/60 border border-cyan-500/20">
                <span className="text-[10px] font-bold text-cyan-400 block mb-1 uppercase">
                  Âm Kun (Âm Nhật):
                </span>
                <p className="text-sm font-semibold text-white">
                  {selectedKanji.kunyomi.join(' • ') || 'Không có'}
                </p>
              </div>

              {selectedKanji.mnemonics && (
                <div className="p-3 rounded-2xl bg-purple-950/30 border border-purple-500/20">
                  <span className="text-[10px] font-bold text-purple-300 block mb-1 uppercase">
                    Mẹo nhớ chữ:
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedKanji.mnemonics}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Kanji Picker Tray */}
          <div className="p-4 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Chọn nhanh Kanji để luyện tập:
            </span>
            <div className="grid grid-cols-6 gap-2 max-h-40 overflow-y-auto pr-1">
              {allKanji.map((k) => (
                <button
                  key={k.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectKanji(k);
                  }}
                  className={`h-10 rounded-xl font-bold font-japanese text-sm transition-all flex items-center justify-center ${
                    k.id === selectedKanji.id
                      ? 'bg-gradient-to-tr from-pink-500 to-cyan-400 text-white shadow-md scale-105'
                      : 'bg-slate-950/60 text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                  title={`${k.character} (${k.hanViet})`}
                >
                  {k.character}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
