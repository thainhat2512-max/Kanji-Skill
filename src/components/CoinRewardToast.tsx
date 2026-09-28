import React from 'react';
import { Coins, Sparkles } from 'lucide-react';

export interface CoinRewardEvent {
  id: string;
  amount: number;
  reason: string;
}

interface Props {
  reward: CoinRewardEvent | null;
}

export const CoinRewardToast: React.FC<Props> = ({ reward }) => {
  if (!reward) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white shadow-[0_0_25px_rgba(251,191,36,0.6)] border border-amber-300/40">
        <div className="w-8 h-8 rounded-xl bg-slate-950/80 flex items-center justify-center">
          <Coins className="w-5 h-5 text-amber-400 animate-bounce" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-black text-amber-200">
              +{reward.amount} Xu Cầu Vồng!
            </span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </div>
          <p className="text-[11px] text-white/90 font-medium">
            {reward.reason}
          </p>
        </div>
      </div>
    </div>
  );
};
