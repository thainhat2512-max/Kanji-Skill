import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  RotateCcw, 
  CheckCircle, 
  XCircle, 
  Volume2, 
  ArrowRight, 
  Flame, 
  Sparkles, 
  HelpCircle,
  Clock,
  Award
} from 'lucide-react';
import { KanjiItem, QuizQuestion } from '../types';
import { sound } from '../utils/audio';

interface Props {
  kanjiList: KanjiItem[];
  onCompleteQuiz: (score: number, correctCount: number) => void;
  onOpenKanjiDetail: (kanji: KanjiItem) => void;
}

export const QuizChoiceMode: React.FC<Props> = ({
  kanjiList,
  onCompleteQuiz,
  onOpenKanjiDetail
}) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [wrongKanjiList, setWrongKanjiList] = useState<KanjiItem[]>([]);

  // Generate Questions from the dataset
  const generateQuestions = () => {
    if (kanjiList.length === 0) return;

    // Shuffle kanji
    const shuffled = [...kanjiList].sort(() => 0.5 - Math.random());
    const sampleSize = Math.min(10, shuffled.length);
    const quizCandidates = shuffled.slice(0, sampleSize);

    const generated: QuizQuestion[] = quizCandidates.map((target, idx) => {
      // Pick question type randomly
      const types: Array<'han_viet' | 'vietnamese_meaning' | 'onyomi' | 'kunyomi'> = [
        'han_viet', 
        'vietnamese_meaning', 
        target.onyomi.length > 0 ? 'onyomi' : 'han_viet',
        target.kunyomi.length > 0 ? 'kunyomi' : 'vietnamese_meaning'
      ];
      const qType = types[Math.floor(Math.random() * types.length)];

      let prompt = '';
      let correctAnswer = '';
      let wrongPool: string[] = [];

      if (qType === 'han_viet') {
        prompt = `Âm Hán Việt của chữ "${target.character}" là gì?`;
        correctAnswer = target.hanViet;
        wrongPool = kanjiList.filter(k => k.id !== target.id).map(k => k.hanViet);
      } else if (qType === 'vietnamese_meaning') {
        prompt = `Ý nghĩa tiếng Việt chính xác của chữ "${target.character}" (${target.hanViet}) là gì?`;
        correctAnswer = target.vietnamese;
        wrongPool = kanjiList.filter(k => k.id !== target.id).map(k => k.vietnamese);
      } else if (qType === 'onyomi') {
        prompt = `Cách đọc On'yomi (âm Hán) của chữ "${target.character}" (${target.hanViet}) là gì?`;
        correctAnswer = target.onyomi.join(', ');
        wrongPool = kanjiList
          .filter(k => k.id !== target.id && k.onyomi.length > 0)
          .map(k => k.onyomi.join(', '));
      } else {
        prompt = `Cách đọc Kun'yomi (âm Nhật) của chữ "${target.character}" (${target.hanViet}) là gì?`;
        correctAnswer = target.kunyomi.join(', ');
        wrongPool = kanjiList
          .filter(k => k.id !== target.id && k.kunyomi.length > 0)
          .map(k => k.kunyomi.join(', '));
      }

      // Ensure distinct wrong options
      const uniqueWrongs = Array.from(new Set(wrongPool.filter(w => w !== correctAnswer)));
      const pickedWrongs = uniqueWrongs.sort(() => 0.5 - Math.random()).slice(0, 3);

      // Mix options
      const options = [correctAnswer, ...pickedWrongs].sort(() => 0.5 - Math.random());
      const correctIndex = options.indexOf(correctAnswer);

      return {
        id: `q-${idx}`,
        kanji: target,
        questionType: qType,
        prompt,
        options,
        correctIndex,
        explanation: `Chữ 【${target.character}】: Hán Việt là ${target.hanViet}. Nghĩa: ${target.vietnamese}. On'yomi: ${target.onyomi.join(', ') || 'Không có'}. Kun'yomi: ${target.kunyomi.join(', ') || 'Không có'}.`
      };
    });

    setQuestions(generated);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setCorrectCount(0);
    setStreak(0);
    setMaxStreak(0);
    setIsFinished(false);
    setWrongKanjiList([]);
  };

  useEffect(() => {
    generateQuestions();
  }, [kanjiList]);

  const handleSelectOption = (index: number) => {
    if (isAnswered || isFinished) return;

    setSelectedOption(index);
    setIsAnswered(true);

    const currentQ = questions[currentIndex];
    const isCorrect = index === currentQ.correctIndex;

    if (isCorrect) {
      sound.playCorrect();
      const points = 10 + streak * 2;
      setScore(prev => prev + points);
      setCorrectCount(prev => prev + 1);
      setStreak(prev => {
        const next = prev + 1;
        if (next > maxStreak) setMaxStreak(next);
        return next;
      });

      // Quick mini confetti on high streak
      if (streak + 1 >= 3) {
        confetti({
          particleCount: 30,
          spread: 45,
          origin: { y: 0.7 },
          colors: ['#ec4899', '#38bdf8', '#fbbf24']
        });
      }
    } else {
      sound.playWrong();
      setStreak(0);
      setWrongKanjiList(prev => [...prev, currentQ.kanji]);
    }
  };

  const handleNextQuestion = () => {
    sound.playClick();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Finished
      setIsFinished(true);
      const finalScore = Math.round((correctCount / questions.length) * 100);
      onCompleteQuiz(finalScore, correctCount);

      if (finalScore >= 70) {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#f43f5e', '#ec4899', '#a855f7', '#38bdf8', '#10b981', '#fbbf24']
        });
      }
    }
  };

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <p className="text-slate-400">Không có đủ dữ liệu Kanji để tạo bài trắc nghiệm.</p>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      
      {/* Quiz Progress & Stats Bar */}
      {!isFinished && (
        <div className="w-full mb-6">
          <div className="flex items-center justify-between mb-2 text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Câu hỏi:</span>
              <span className="text-white font-extrabold px-2.5 py-0.5 rounded-full bg-slate-800 border border-white/10">
                {currentIndex + 1} / {questions.length}
              </span>
            </div>

            {/* Streak Counter */}
            {streak > 1 && (
              <div className="flex items-center gap-1.5 text-amber-300 bg-amber-950/40 border border-amber-500/30 px-3 py-1 rounded-full animate-bounce">
                <Flame className="w-4 h-4 fill-amber-400 text-amber-500" />
                <span>Combo x{streak}!</span>
              </div>
            )}

            {/* Score */}
            <div className="flex items-center gap-1.5 text-cyan-300">
              <Trophy className="w-4 h-4 text-cyan-400" />
              <span>{score} điểm</span>
            </div>
          </div>

          {/* Rainbow Progress Bar */}
          <div className="w-full h-2 rounded-full bg-slate-800/80 overflow-hidden border border-white/5">
            <div 
              className="h-full bg-gradient-to-r from-rose-500 via-purple-500 to-cyan-400 transition-all duration-300"
              style={{ width: `${((currentIndex + (isAnswered ? 1 : 0)) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Main Question Card */}
      {!isFinished ? (
        <div className="w-full rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col items-center">
          
          {/* Subtle rainbow top accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400"></div>

          {/* Prominent Kanji Character Display */}
          <div className="relative my-2 group">
            <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-950 border border-white/15 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.2)]">
              <span className="text-6xl font-black text-white group-hover:scale-105 transition-transform duration-300 font-japanese">
                {currentQ.kanji.character}
              </span>
            </div>

            <button
              onClick={() => sound.speakJapanese(currentQ.kanji.character)}
              className="absolute -bottom-2 -right-2 p-2 rounded-full bg-pink-500 text-white shadow-lg hover:bg-pink-400 transition-all"
              title="Nghe phát âm Kanji"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          {/* Prompt */}
          <h3 className="text-base sm:text-lg font-bold text-slate-100 text-center mt-4 mb-6 leading-relaxed">
            {currentQ.prompt}
          </h3>

          {/* Options Grid */}
          <div className="w-full grid grid-cols-1 gap-3">
            {currentQ.options.map((option, idx) => {
              let optionStyle = 'bg-slate-800/60 border-white/10 text-slate-200 hover:bg-slate-800 hover:border-pink-500/40';

              if (isAnswered) {
                if (idx === currentQ.correctIndex) {
                  optionStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.3)]';
                } else if (idx === selectedOption) {
                  optionStyle = 'bg-rose-950/60 border-rose-500 text-rose-200 shadow-[0_0_15px_rgba(244,63,94,0.3)]';
                } else {
                  optionStyle = 'opacity-40 bg-slate-900 border-white/5 text-slate-500';
                }
              }

              return (
                <button
                  key={idx}
                  id={`btn-opt-${idx}`}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-2xl border text-left font-medium text-sm sm:text-base flex items-center justify-between transition-all duration-200 ${optionStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-slate-950/80 border border-white/10 flex items-center justify-center text-xs font-bold text-slate-300">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {isAnswered && idx === currentQ.correctIndex && (
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}

                  {isAnswered && idx === selectedOption && idx !== currentQ.correctIndex && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box on Answer */}
          {isAnswered && (
            <div className="w-full mt-6 p-4 rounded-2xl bg-slate-950/80 border border-white/10 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    Giải thích chi tiết:
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentQ.explanation}
                  </p>
                </div>

                <button
                  id="btn-quiz-next"
                  onClick={handleNextQuestion}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-rose-500 via-purple-500 to-cyan-400 hover:opacity-95 shadow-[0_0_20px_rgba(236,72,153,0.4)] flex items-center gap-2 shrink-0 transition-all"
                >
                  <span>{currentIndex < questions.length - 1 ? 'Câu tiếp' : 'Xem kết quả'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      ) : (
        /* Quiz Result Card */
        <div className="w-full rounded-3xl bg-slate-900/90 border border-white/15 backdrop-blur-xl p-6 sm:p-10 shadow-[0_0_50px_rgba(236,72,153,0.3)] text-center flex flex-col items-center animate-in zoom-in-95 duration-300">
          
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-rose-500 via-purple-500 to-cyan-400 p-1 mb-4 shadow-[0_0_30px_rgba(236,72,153,0.5)]">
            <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
              <Award className="w-10 h-10 text-amber-300 animate-pulse" />
            </div>
          </div>

          <h3 className="text-2xl font-black text-white mb-1">
            Tổng kết Bài Trắc Nghiệm!
          </h3>
          <p className="text-sm text-slate-300 mb-6">
            Bạn đã hoàn thành bài tập ôn tập trắc nghiệm Kanji
          </p>

          {/* Score Stats Grid */}
          <div className="grid grid-cols-3 gap-3 w-full max-w-md mb-6">
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/10">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Đúng</span>
              <span className="text-xl font-extrabold text-emerald-400">
                {correctCount}/{questions.length}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/10">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Điểm số</span>
              <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-cyan-300">
                {score}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/10">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Max Combo</span>
              <span className="text-xl font-extrabold text-amber-400">
                x{maxStreak}
              </span>
            </div>
          </div>

          {/* Wrong Kanji Review List */}
          {wrongKanjiList.length > 0 && (
            <div className="w-full mb-6 text-left">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300 mb-2">
                Các chữ bạn làm sai (nhấn để ôn lại ngay):
              </h4>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(wrongKanjiList)).map((wk) => (
                  <button
                    key={wk.id}
                    onClick={() => onOpenKanjiDetail(wk)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-rose-500/30 hover:border-rose-400 text-xs font-semibold text-slate-200 hover:text-white transition-all"
                  >
                    <span className="text-base font-bold text-rose-400">{wk.character}</span>
                    <span>{wk.hanViet}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <button
            id="btn-quiz-retry"
            onClick={generateQuestions}
            className="px-8 py-3 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-rose-500 via-purple-500 to-cyan-400 hover:opacity-95 shadow-[0_0_25px_rgba(236,72,153,0.4)] flex items-center gap-2 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Làm bài trắc nghiệm mới
          </button>
        </div>
      )}

    </div>
  );
};
