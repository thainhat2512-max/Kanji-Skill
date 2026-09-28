import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  RotateCcw, 
  PenTool, 
  Sparkles, 
  Award, 
  ArrowRight, 
  Volume2, 
  CheckCircle2, 
  HelpCircle 
} from 'lucide-react';
import { KanjiItem } from '../types';
import { KanjiStrokeWriter } from './KanjiStrokeWriter';
import { sound } from '../utils/audio';

interface Props {
  kanjiList: KanjiItem[];
  onCompleteChallenge: (totalScore: number) => void;
  onOpenKanjiDetail: (kanji: KanjiItem) => void;
}

export const QuizStrokeMode: React.FC<Props> = ({
  kanjiList,
  onCompleteChallenge,
  onOpenKanjiDetail,
}) => {
  const [challengeList, setChallengeList] = useState<KanjiItem[]>(() => {
    return [...kanjiList].sort(() => 0.5 - Math.random()).slice(0, 5);
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const resetChallenge = () => {
    const fresh = [...kanjiList].sort(() => 0.5 - Math.random()).slice(0, 5);
    setChallengeList(fresh);
    setCurrentIndex(0);
    setScores([]);
    setIsFinished(false);
  };

  const handleKanjiCompleted = (accuracy: number) => {
    const updatedScores = [...scores, accuracy];
    setScores(updatedScores);

    if (currentIndex < challengeList.length - 1) {
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 1200);
    } else {
      setTimeout(() => {
        setIsFinished(true);
        const avgScore = Math.round(updatedScores.reduce((a, b) => a + b, 0) / updatedScores.length);
        onCompleteChallenge(avgScore);

        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#f43f5e', '#ec4899', '#a855f7', '#38bdf8', '#10b981', '#fbbf24']
        });
      }, 1000);
    }
  };

  if (challengeList.length === 0) {
    return (
      <div className="text-center p-8 text-slate-400">
        Không có đủ Kanji để tạo thử thách luyện viết.
      </div>
    );
  }

  const currentKanji = challengeList[currentIndex];
  const averageScore = scores.length > 0 
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) 
    : 0;

  const getRank = (score: number) => {
    if (score >= 95) return { rank: 'SSS', title: 'Kỳ Lân Cầu Vồng (Vua Thư Pháp)', color: 'text-amber-300' };
    if (score >= 85) return { rank: 'S', title: 'Bậc Thầy Nét Vẽ', color: 'text-pink-400' };
    if (score >= 70) return { rank: 'A', title: 'Nét Bút Điêu Luyện', color: 'text-cyan-400' };
    if (score >= 50) return { rank: 'B', title: 'Chăm Chỉ Rèn Luyện', color: 'text-purple-400' };
    return { rank: 'C', title: 'Cần Luyện Tập Thêm', color: 'text-slate-400' };
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      
      {/* Header / Progress Bar */}
      {!isFinished ? (
        <div className="w-full mb-6">
          <div className="flex items-center justify-between mb-2 text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Thử thách viết:</span>
              <span className="text-white font-bold px-2.5 py-0.5 rounded-full bg-slate-800 border border-white/10">
                {currentIndex + 1} / {challengeList.length}
              </span>
            </div>

            <div className="flex items-center gap-2 text-cyan-300">
              <PenTool className="w-4 h-4 text-cyan-400" />
              <span>Điểm TB: {scores.length > 0 ? averageScore : 100}%</span>
            </div>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden border border-white/5">
            <div 
              className="h-full bg-gradient-to-r from-rose-500 via-purple-500 to-cyan-400 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / challengeList.length) * 100}%` }}
            />
          </div>
        </div>
      ) : null}

      {/* Main Challenge Card */}
      {!isFinished ? (
        <div className="w-full rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl p-6 shadow-2xl relative flex flex-col items-center">
          
          {/* Top Rainbow Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-purple-500 to-cyan-400"></div>

          {/* Prompt Header */}
          <div className="text-center mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-pink-400 block mb-1">
              Hãy viết chữ Kanji sau đây theo đúng thứ tự nét:
            </span>
            <div className="flex items-center justify-center gap-3">
              <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-200 to-cyan-200 uppercase">
                {currentKanji.hanViet}
              </h2>
              <button
                onClick={() => sound.speakJapanese(currentKanji.character)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                title="Nghe phát âm"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-300 font-medium mt-0.5">
              Nghĩa: {currentKanji.vietnamese} • ({currentKanji.strokeCount} nét)
            </p>
          </div>

          {/* Interactive Stroke Writer Box */}
          <KanjiStrokeWriter 
            key={currentKanji.id}
            kanji={currentKanji}
            onCompletePractice={handleKanjiCompleted}
            initialMode="interactive"
          />

          {/* Quick Skip or Inspect Button */}
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                onOpenKanjiDetail(currentKanji);
              }}
              className="text-xs text-slate-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Xem chi tiết chữ này</span>
            </button>

            {currentIndex < challengeList.length - 1 && (
              <button
                onClick={() => {
                  sound.playClick();
                  setCurrentIndex(prev => prev + 1);
                }}
                className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors"
              >
                <span>Bỏ qua</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>
      ) : (
        /* Finished Results View */
        <div className="w-full rounded-3xl bg-slate-900/90 border border-white/15 backdrop-blur-xl p-6 sm:p-10 shadow-[0_0_50px_rgba(236,72,153,0.3)] text-center flex flex-col items-center animate-in zoom-in-95 duration-300">
          
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-rose-500 via-purple-500 to-cyan-400 p-1 mb-4 shadow-[0_0_30px_rgba(236,72,153,0.5)]">
            <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-amber-300 animate-spin" />
            </div>
          </div>

          <h3 className="text-2xl font-black text-white mb-1">
            Thử Thách Viết Kanji Thành Công!
          </h3>
          <p className="text-sm text-slate-300 mb-6">
            Bảng điểm chấm nét vẽ Kanji vừa hoàn thành
          </p>

          {/* Rank Badge */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 w-full max-w-sm mb-6 flex items-center justify-between">
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Xếp hạng</span>
              <span className={`text-base font-bold ${getRank(averageScore).color}`}>
                {getRank(averageScore).title}
              </span>
            </div>
            <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-300">
              {getRank(averageScore).rank}
            </div>
          </div>

          {/* Kanji breakdown */}
          <div className="w-full space-y-2 mb-6 text-left">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Chi tiết các chữ đã viết:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {challengeList.map((k, idx) => (
                <div 
                  key={k.id}
                  onClick={() => onOpenKanjiDetail(k)}
                  className="p-2.5 rounded-xl bg-slate-950/60 border border-white/5 flex items-center justify-between cursor-pointer hover:border-pink-500/30 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-white font-japanese">{k.character}</span>
                    <span className="text-xs text-slate-300">{k.hanViet}</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-400">
                    {scores[idx] !== undefined ? `${scores[idx]}%` : 'Đạt'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            id="btn-retry-stroke-quiz"
            onClick={resetChallenge}
            className="px-8 py-3 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-rose-500 via-purple-500 to-cyan-400 hover:opacity-95 shadow-[0_0_25px_rgba(236,72,153,0.4)] flex items-center gap-2 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Thử thách đợt chữ mới
          </button>
        </div>
      )}

    </div>
  );
};
