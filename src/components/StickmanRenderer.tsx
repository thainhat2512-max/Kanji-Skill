import React from 'react';
import { StickmanProfile, StickmanColor, StickmanExpression } from '../types';
import { getItemById } from '../data/stickmanCatalog';

interface Props {
  profile: StickmanProfile;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  actionPose?: 'idle' | 'writing' | 'celebrating' | 'action';
  onClick?: () => void;
  showGlow?: boolean;
}

export const StickmanRenderer: React.FC<Props> = ({
  profile,
  size = 'md',
  actionPose = 'idle',
  onClick,
  showGlow = true,
}) => {
  const outfit = getItemById(profile.equippedOutfit);
  const hat = getItemById(profile.equippedHat);
  const prop = getItemById(profile.equippedProp);
  const aura = getItemById(profile.equippedAura);

  // Size mapping
  const sizeClasses = {
    xs: 'w-10 h-14',
    sm: 'w-16 h-22',
    md: 'w-28 h-36',
    lg: 'w-48 h-60',
    xl: 'w-64 h-80',
  }[size];

  // Color mapping
  const colorPalette: Record<StickmanColor, { stroke: string; glow: string; fill?: string }> = {
    white: { stroke: '#ffffff', glow: 'rgba(255,255,255,0.7)' },
    rainbow: { stroke: '#f43f5e', glow: 'rgba(236,72,153,0.9)', fill: 'url(#rainbow-body-gradient)' },
    cyan: { stroke: '#06b6d4', glow: 'rgba(6,182,212,0.9)' },
    pink: { stroke: '#f43f5e', glow: 'rgba(244,63,94,0.9)' },
    gold: { stroke: '#fbbf24', glow: 'rgba(251,191,36,0.9)' },
    emerald: { stroke: '#10b981', glow: 'rgba(16,185,129,0.9)' },
    crimson: { stroke: '#ef4444', glow: 'rgba(239,68,68,0.9)' },
    shadow: { stroke: '#94a3b8', glow: 'rgba(148,163,184,0.7)' },
  };

  const currentColor = colorPalette[profile.color] || colorPalette.white;
  const strokeColor = currentColor.stroke;

  return (
    <div
      onClick={onClick}
      className={`relative flex items-center justify-center select-none ${sizeClasses} ${
        onClick ? 'cursor-pointer hover:scale-105 active:scale-95 transition-transform' : ''
      }`}
    >
      <svg
        viewBox="0 0 200 260"
        className="w-full h-full overflow-visible drop-shadow-md"
      >
        <defs>
          {/* Rainbow Gradient */}
          <linearGradient id="rainbow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="25%" stopColor="#ec4899" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="75%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>

          <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>

          <linearGradient id="cyber-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>

          <filter id="stickman-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ================= 1. BACK AURA LAYER ================= */}
        {aura?.id === 'aura_rainbow' && (
          <g className="animate-spin" style={{ transformOrigin: '100px 130px', animationDuration: '10s' }}>
            <circle
              cx="100"
              cy="130"
              r="75"
              fill="none"
              stroke="url(#rainbow-grad)"
              strokeWidth="4"
              strokeDasharray="12 6"
              opacity="0.8"
            />
            <circle
              cx="100"
              cy="130"
              r="62"
              fill="none"
              stroke="url(#rainbow-grad)"
              strokeWidth="2"
              opacity="0.5"
            />
          </g>
        )}

        {aura?.id === 'aura_circle' && (
          <g className="animate-spin" style={{ transformOrigin: '100px 220px', animationDuration: '8s' }}>
            <ellipse cx="100" cy="220" rx="70" ry="22" fill="none" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="6 4" opacity="0.8" />
            <ellipse cx="100" cy="220" rx="52" ry="16" fill="none" stroke="#38bdf8" strokeWidth="1.5" opacity="0.6" />
            <text x="75" y="223" fill="#a855f7" fontSize="9" fontWeight="bold" opacity="0.8">虹 漢 字 龍</text>
          </g>
        )}

        {aura?.id === 'aura_wings' && (
          <g className="animate-pulse" style={{ animationDuration: '2s' }}>
            {/* Left Wing */}
            <path
              d="M90,95 C60,60 20,65 15,100 C12,125 50,135 85,115"
              fill="rgba(224, 231, 255, 0.4)"
              stroke="#c7d2fe"
              strokeWidth="2.5"
            />
            <path
              d="M80,105 C55,80 30,85 28,110 C25,125 55,130 80,120"
              fill="none"
              stroke="#e0e7ff"
              strokeWidth="1.5"
            />
            {/* Right Wing */}
            <path
              d="M110,95 C140,60 180,65 185,100 C188,125 150,135 115,115"
              fill="rgba(224, 231, 255, 0.4)"
              stroke="#c7d2fe"
              strokeWidth="2.5"
            />
            <path
              d="M120,105 C145,80 170,85 172,110 C175,125 145,130 120,120"
              fill="none"
              stroke="#e0e7ff"
              strokeWidth="1.5"
            />
          </g>
        )}

        {aura?.id === 'aura_kitsune' && (
          <g>
            {/* Floating Will-o'-the-wisp Kitsune Flames */}
            <circle cx="45" cy="85" r="9" fill="#06b6d4" opacity="0.7" className="animate-ping" style={{ animationDuration: '3s' }} />
            <circle cx="45" cy="85" r="6" fill="#38bdf8" />
            <circle cx="155" cy="75" r="9" fill="#06b6d4" opacity="0.7" className="animate-ping" style={{ animationDuration: '2.5s', animationDelay: '1s' }} />
            <circle cx="155" cy="75" r="6" fill="#38bdf8" />
            <circle cx="50" cy="160" r="7" fill="#818cf8" opacity="0.6" className="animate-pulse" />
          </g>
        )}

        {aura?.id === 'aura_neko' && (
          <g transform="translate(142, 55)" className="animate-bounce" style={{ animationDuration: '3s' }}>
            {/* Floating Mini Maneki Neko */}
            <ellipse cx="14" cy="18" rx="14" ry="16" fill="#ffffff" stroke="#f59e0b" strokeWidth="1.5" />
            {/* Ears */}
            <polygon points="4,7 10,2 12,8" fill="#f87171" stroke="#f59e0b" strokeWidth="1" />
            <polygon points="24,7 18,2 16,8" fill="#f87171" stroke="#f59e0b" strokeWidth="1" />
            {/* Face */}
            <circle cx="10" cy="14" r="1.5" fill="#1e293b" />
            <circle cx="18" cy="14" r="1.5" fill="#1e293b" />
            <path d="M12,18 Q14,20 16,18" fill="none" stroke="#ef4444" strokeWidth="1.2" />
            {/* Waving Paw */}
            <path d="M22,14 Q28,8 26,4 Q22,4 21,10" fill="#ffffff" stroke="#f59e0b" strokeWidth="1.2" />
            {/* Gold Coin on Chest */}
            <ellipse cx="14" cy="24" rx="5" ry="6" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
            <text x="11.5" y="27" fill="#78350f" fontSize="7" fontWeight="black">万</text>
          </g>
        )}

        {/* ================= 2. STICKMAN SKELETON LAYER ================= */}
        {/* Shadow under feet */}
        <ellipse cx="100" cy="225" rx="36" ry="7" fill="rgba(0,0,0,0.3)" />

        <g id="stickman-body-group" className={actionPose === 'celebrating' ? 'animate-bounce' : ''}>
          
          {/* Head (Circle) */}
          <circle
            cx="100"
            cy="58"
            r="26"
            fill="#0f172a"
            stroke={profile.color === 'rainbow' ? 'url(#rainbow-grad)' : strokeColor}
            strokeWidth="5"
            filter={showGlow ? 'url(#stickman-glow)' : undefined}
          />

          {/* Facial Expression */}
          <g id="stickman-face">
            {profile.expression === 'happy' && (
              <>
                {/* Curved happy eyes */}
                <path d="M88,54 Q92,48 96,54" fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
                <path d="M104,54 Q108,48 112,54" fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
                {/* Big Smile */}
                <path d="M92,66 Q100,76 108,66" fill="none" stroke="#f43f5e" strokeWidth="3.5" strokeLinecap="round" />
              </>
            )}

            {profile.expression === 'determined' && (
              <>
                {/* Fierce angled brows & eyes */}
                <line x1="88" y1="50" x2="97" y2="54" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
                <line x1="112" y1="50" x2="103" y2="54" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
                <circle cx="93" cy="56" r="2.5" fill="#f43f5e" />
                <circle cx="107" cy="56" r="2.5" fill="#f43f5e" />
                {/* Confident smirk */}
                <path d="M94,68 L106,66" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
              </>
            )}

            {profile.expression === 'cool' && (
              <>
                {/* Pixel Thug Life Glasses / Sunglasses on face */}
                <rect x="85" y="50" width="13" height="10" rx="2" fill="#000000" stroke="#38bdf8" strokeWidth="1.5" />
                <rect x="102" y="50" width="13" height="10" rx="2" fill="#000000" stroke="#38bdf8" strokeWidth="1.5" />
                <line x1="97" y1="55" x2="103" y2="55" stroke="#38bdf8" strokeWidth="2" />
                {/* Smile */}
                <path d="M95,68 Q100,72 105,68" fill="none" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
              </>
            )}

            {profile.expression === 'kawaii' && (
              <>
                {/* Anime sparkling wide eyes */}
                <ellipse cx="91" cy="54" rx="4" ry="5" fill="#38bdf8" />
                <circle cx="90" cy="52" r="1.5" fill="#ffffff" />
                <ellipse cx="109" cy="54" rx="4" ry="5" fill="#38bdf8" />
                <circle cx="108" cy="52" r="1.5" fill="#ffffff" />
                {/* Cute blush cheeks */}
                <circle cx="85" cy="62" r="4" fill="#f43f5e" opacity="0.6" />
                <circle cx="115" cy="62" r="4" fill="#f43f5e" opacity="0.6" />
                {/* Cat-like mouth */}
                <path d="M96,64 Q98,68 100,65 Q102,68 104,64" fill="none" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
              </>
            )}

            {profile.expression === 'winking' && (
              <>
                {/* Winking eye & open round eye */}
                <path d="M87,54 L97,54" stroke={strokeColor} strokeWidth="3.5" strokeLinecap="round" />
                <circle cx="109" cy="54" r="3.5" fill="#fbbf24" />
                {/* Playful mouth */}
                <path d="M94,66 Q100,74 107,67" fill="none" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
              </>
            )}

            {profile.expression === 'fire' && (
              <>
                {/* Flaming fire eyes */}
                <path d="M92,48 Q96,55 92,60 Q88,54 92,48" fill="#f59e0b" stroke="#ef4444" strokeWidth="1.5" />
                <path d="M108,48 Q112,55 108,60 Q104,54 108,48" fill="#f59e0b" stroke="#ef4444" strokeWidth="1.5" />
                {/* Intense grin */}
                <path d="M92,67 Q100,73 108,67" fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
              </>
            )}
          </g>

          {/* Spine (Body Line) */}
          <line
            x1="100"
            y1="84"
            x2="100"
            y2="155"
            stroke={profile.color === 'rainbow' ? 'url(#rainbow-grad)' : strokeColor}
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Left Arm & Hand */}
          {actionPose === 'celebrating' ? (
            <path
              d="M100,98 L75,70 L55,50"
              fill="none"
              stroke={strokeColor}
              strokeWidth="5"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M100,98 L70,120 L58,145"
              fill="none"
              stroke={strokeColor}
              strokeWidth="5"
              strokeLinecap="round"
            />
          )}

          {/* Right Arm & Hand (Holds prop or writes) */}
          {actionPose === 'celebrating' ? (
            <path
              d="M100,98 L125,70 L145,50"
              fill="none"
              stroke={strokeColor}
              strokeWidth="5"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M100,98 L130,118 L146,135"
              fill="none"
              stroke={strokeColor}
              strokeWidth="5"
              strokeLinecap="round"
            />
          )}

          {/* Legs */}
          {/* Left Leg */}
          <path
            d="M100,155 L82,185 L76,220"
            fill="none"
            stroke={profile.color === 'rainbow' ? 'url(#rainbow-grad)' : strokeColor}
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          {/* Right Leg */}
          <path
            d="M100,155 L118,185 L124,220"
            fill="none"
            stroke={profile.color === 'rainbow' ? 'url(#rainbow-grad)' : strokeColor}
            strokeWidth="5.5"
            strokeLinecap="round"
          />

          {/* ================= 3. OUTFITS LAYER ================= */}
          {outfit?.id === 'outfit_karate' && (
            <g id="outfit-karate">
              {/* White Karate Gi Robe */}
              <path
                d="M84,95 L116,95 L120,150 L80,150 Z"
                fill="#ffffff"
                stroke="#cbd5e1"
                strokeWidth="2"
              />
              {/* V-Collar wrap */}
              <path d="M86,95 L102,125 L114,95" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
              {/* Black Belt (Đai đen) */}
              <rect x="78" y="130" width="44" height="9" rx="2" fill="#0f172a" />
              <path d="M102,138 L98,155 M105,138 L108,152" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
            </g>
          )}

          {outfit?.id === 'outfit_gakuran' && (
            <g id="outfit-gakuran">
              {/* Dark Gakuran Coat */}
              <path d="M82,92 L118,92 L122,154 L78,154 Z" fill="#0f172a" stroke="#334155" strokeWidth="2" />
              {/* Standing Collar */}
              <rect x="86" y="88" width="28" height="6" rx="2" fill="#1e293b" stroke="#475569" strokeWidth="1" />
              <line x1="90" y1="91" x2="110" y2="91" stroke="#ffffff" strokeWidth="1" />
              {/* Golden Brass Buttons */}
              <circle cx="100" cy="104" r="2.5" fill="#fbbf24" />
              <circle cx="100" cy="118" r="2.5" fill="#fbbf24" />
              <circle cx="100" cy="132" r="2.5" fill="#fbbf24" />
              <circle cx="100" cy="146" r="2.5" fill="#fbbf24" />
            </g>
          )}

          {outfit?.id === 'outfit_sailor' && (
            <g id="outfit-sailor">
              {/* Sailor Top */}
              <path d="M84,95 L116,95 L120,146 L80,146 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
              {/* Navy Sailor Collar */}
              <path d="M82,94 L118,94 L112,116 L100,126 L88,116 Z" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
              {/* Red Ribbon / Bowtie */}
              <polygon points="95,116 105,116 100,123" fill="#ef4444" />
              <polygon points="93,121 100,123 90,132" fill="#ef4444" />
              <polygon points="107,121 100,123 110,132" fill="#ef4444" />
            </g>
          )}

          {outfit?.id === 'outfit_kimono' && (
            <g id="outfit-kimono">
              {/* Rainbow Cherry Blossom Kimono */}
              <path
                d="M80,94 L120,94 L128,165 L72,165 Z"
                fill="url(#rainbow-grad)"
                opacity="0.9"
              />
              {/* Cross collar */}
              <path d="M84,94 L104,130 M116,94 L96,130" stroke="#ffffff" strokeWidth="2.5" />
              {/* Flowing Sleeves */}
              <path d="M78,102 L56,138 L72,142 L84,116" fill="url(#rainbow-grad)" opacity="0.85" />
              <path d="M122,102 L144,138 L128,142 L116,116" fill="url(#rainbow-grad)" opacity="0.85" />
              {/* Gold Obi Sash Belt */}
              <rect x="74" y="125" width="52" height="15" rx="3" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
              <line x1="74" y1="132" x2="126" y2="132" stroke="#ef4444" strokeWidth="2" />
            </g>
          )}

          {outfit?.id === 'outfit_ninja' && (
            <g id="outfit-ninja">
              {/* Shinobi black vest & mesh */}
              <path d="M82,94 L118,94 L122,152 L78,152 Z" fill="#090d16" stroke="#334155" strokeWidth="2" />
              {/* Red Shinobi sash */}
              <rect x="78" y="126" width="44" height="10" fill="#dc2626" />
              <path d="M105,136 L112,158 M101,136 L104,154" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
            </g>
          )}

          {outfit?.id === 'outfit_cyber' && (
            <g id="outfit-cyber">
              {/* Cyberpunk Hoodie */}
              <path d="M78,92 L122,92 L125,152 L75,152 Z" fill="#1e293b" stroke="#06b6d4" strokeWidth="2.5" />
              {/* Glowing Cyber Seams */}
              <line x1="88" y1="96" x2="88" y2="150" stroke="#06b6d4" strokeWidth="2" />
              <line x1="112" y1="96" x2="112" y2="150" stroke="#06b6d4" strokeWidth="2" />
              {/* Neon Triangle Core */}
              <polygon points="100,105 106,115 94,115" fill="#f43f5e" stroke="#06b6d4" strokeWidth="1" />
            </g>
          )}

          {outfit?.id === 'outfit_samurai' && (
            <g id="outfit-samurai">
              {/* Samurai Breastplate (Do) */}
              <path d="M80,94 L120,94 L124,152 L76,152 Z" fill="#78350f" stroke="#fbbf24" strokeWidth="2" />
              {/* Armored plates slats */}
              <line x1="80" y1="108" x2="120" y2="108" stroke="#fbbf24" strokeWidth="2" />
              <line x1="78" y1="122" x2="122" y2="122" stroke="#fbbf24" strokeWidth="2" />
              <line x1="77" y1="136" x2="123" y2="136" stroke="#fbbf24" strokeWidth="2" />
              {/* Tiered Shoulder Armor (Sode) */}
              <path d="M76,96 L58,104 L62,122 L80,110 Z" fill="#991b1b" stroke="#fbbf24" strokeWidth="1.5" />
              <path d="M124,96 L142,104 L138,122 L120,110 Z" fill="#991b1b" stroke="#fbbf24" strokeWidth="1.5" />
              {/* Golden Dragon Crest on Chest */}
              <circle cx="100" cy="115" r="5" fill="#fbbf24" />
            </g>
          )}

          {outfit?.id === 'outfit_wizard' && (
            <g id="outfit-wizard">
              {/* Wizard Robe */}
              <path d="M78,92 L122,92 L132,170 L68,170 Z" fill="#6b21a8" stroke="#a855f7" strokeWidth="2" />
              {/* Starry cape border */}
              <path d="M84,94 L100,126 L116,94" fill="none" stroke="#fbbf24" strokeWidth="2.5" />
              <circle cx="100" cy="126" r="3.5" fill="#fbbf24" />
              <circle cx="88" cy="150" r="1.5" fill="#fef08a" />
              <circle cx="112" cy="155" r="1.5" fill="#fef08a" />
              <circle cx="100" cy="144" r="2" fill="#38bdf8" />
            </g>
          )}

          {/* ================= 4. HATS & HEADGEAR LAYER ================= */}
          {hat?.id === 'hat_cap' && (
            <g id="hat-cap">
              {/* Red Baseball Cap */}
              <ellipse cx="100" cy="40" rx="27" ry="14" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.5" />
              {/* Visor Brim */}
              <path d="M80,44 C95,36 125,36 138,44 C132,49 86,49 80,44" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />
              <circle cx="100" cy="30" r="2.5" fill="#ffffff" />
            </g>
          )}

          {hat?.id === 'hat_ninja_band' && (
            <g id="hat-ninja-band">
              {/* Ninja Headband Cloth */}
              <rect x="74" y="44" width="52" height="12" rx="3" fill="#1e293b" />
              {/* Metal Plate */}
              <rect x="88" y="46" width="24" height="8" rx="2" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="1" />
              <text x="96" y="53" fill="#0f172a" fontSize="6.5" fontWeight="bold">忍</text>
              {/* Band tails trailing in wind */}
              <path d="M126,50 Q138,45 145,56" fill="none" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
              <path d="M126,53 Q136,52 142,65" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          )}

          {hat?.id === 'hat_sunglasses' && (
            <g id="hat-sunglasses">
              {/* Thug Life Sunglasses */}
              <rect x="80" y="48" width="18" height="13" rx="2" fill="#000000" stroke="#f43f5e" strokeWidth="1.5" />
              <rect x="102" y="48" width="18" height="13" rx="2" fill="#000000" stroke="#f43f5e" strokeWidth="1.5" />
              <line x1="98" y1="54" x2="102" y2="54" stroke="#ffffff" strokeWidth="2" />
              <line x1="83" y1="51" x2="88" y2="51" stroke="#ffffff" strokeWidth="1.5" />
              <line x1="105" y1="51" x2="110" y2="51" stroke="#ffffff" strokeWidth="1.5" />
            </g>
          )}

          {hat?.id === 'hat_cat_ears' && (
            <g id="hat-cat-ears">
              {/* Pink Cute Cat Ears */}
              <polygon points="76,46 88,24 96,44" fill="#f472b6" stroke="#db2777" strokeWidth="2" />
              <polygon points="80,44 88,30 93,42" fill="#fdf2f8" />
              <polygon points="124,46 112,24 104,44" fill="#f472b6" stroke="#db2777" strokeWidth="2" />
              <polygon points="120,44 112,30 107,42" fill="#fdf2f8" />
              {/* Gold Bell Ribbon */}
              <circle cx="100" cy="38" r="4" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
            </g>
          )}

          {hat?.id === 'hat_ronin' && (
            <g id="hat-ronin">
              {/* Ronin Conical Straw Hat */}
              <polygon points="100,16 148,46 52,46" fill="#d97706" stroke="#78350f" strokeWidth="2" />
              <line x1="100" y1="16" x2="70" y2="46" stroke="#92400e" strokeWidth="1" />
              <line x1="100" y1="16" x2="100" y2="46" stroke="#92400e" strokeWidth="1" />
              <line x1="100" y1="16" x2="130" y2="46" stroke="#92400e" strokeWidth="1" />
            </g>
          )}

          {hat?.id === 'hat_fox_mask' && (
            <g id="hat-fox-mask" transform="translate(18, -4)">
              {/* Kitsune Mask tilted */}
              <ellipse cx="108" cy="40" rx="14" ry="17" fill="#ffffff" stroke="#ef4444" strokeWidth="1.5" />
              {/* Ears */}
              <polygon points="98,28 103,16 109,27" fill="#ffffff" stroke="#ef4444" strokeWidth="1" />
              <polygon points="108,28 114,16 119,27" fill="#ffffff" stroke="#ef4444" strokeWidth="1" />
              {/* Red Eyes & Whiskers paint */}
              <path d="M102,38 Q106,35 110,38" stroke="#ef4444" strokeWidth="2" fill="none" />
              <circle cx="108" cy="44" r="2" fill="#000000" />
            </g>
          )}

          {hat?.id === 'hat_wizard_hat' && (
            <g id="hat-wizard-hat">
              {/* Pointy Wizard Hat */}
              <polygon points="100,4 128,42 72,42" fill="#7c3aed" stroke="#6d28d9" strokeWidth="2" />
              <ellipse cx="100" cy="42" rx="34" ry="8" fill="#6d28d9" stroke="#5b21b6" strokeWidth="1.5" />
              {/* Golden Ribbon & Star */}
              <ellipse cx="100" cy="38" rx="22" ry="5" fill="#fbbf24" />
              <polygon points="100,16 102,21 107,21 103,24 105,29 100,26 95,29 97,24 93,21 98,21" fill="#fef08a" />
            </g>
          )}

          {hat?.id === 'hat_crown' && (
            <g id="hat-crown">
              {/* Golden Royal Rainbow Crown */}
              <polygon
                points="76,40 76,22 88,32 100,16 112,32 124,22 124,40"
                fill="#fbbf24"
                stroke="#d97706"
                strokeWidth="2"
              />
              {/* Gems */}
              <circle cx="76" cy="22" r="2.5" fill="#f43f5e" />
              <circle cx="100" cy="16" r="3.5" fill="#38bdf8" />
              <circle cx="124" cy="22" r="2.5" fill="#a855f7" />
              <circle cx="100" cy="34" r="2" fill="#10b981" />
            </g>
          )}

          {/* ================= 5. WEAPONS & PROPS LAYER ================= */}
          {prop?.id === 'prop_brush' && (
            <g id="prop-brush" transform="translate(138, 110) rotate(-35)">
              {/* Giant Calligraphy Brush */}
              <rect x="-4" y="-70" width="8" height="85" rx="3" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />
              {/* Ferrule */}
              <rect x="-6" y="15" width="12" height="10" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
              {/* Brush Tip with glowing ink */}
              <path d="M-6,25 Q0,50 0,55 Q0,50 6,25 Z" fill="url(#rainbow-grad)" stroke="#ec4899" strokeWidth="1" />
              {/* Ink drop */}
              <circle cx="0" cy="62" r="3.5" fill="#38bdf8" className="animate-ping" style={{ animationDuration: '2s' }} />
            </g>
          )}

          {prop?.id === 'prop_katana' && (
            <g id="prop-katana" transform="translate(142, 115) rotate(15)">
              {/* Glowing Katana Blade */}
              <path d="M0,-80 Q-4,-20 0,20 L4,20 Q0,-20 2,-80 Z" fill="#e0e7ff" stroke="#818cf8" strokeWidth="2" />
              {/* Blade lightning glow */}
              <line x1="0" y1="-70" x2="0" y2="15" stroke="#a855f7" strokeWidth="1.5" />
              {/* Tsuba (Guard) */}
              <ellipse cx="1" cy="20" rx="9" ry="4" fill="#fbbf24" stroke="#b45309" strokeWidth="1" />
              {/* Tsuka (Handle with wrap) */}
              <rect x="-3" y="24" width="7" height="30" rx="2" fill="#1e293b" stroke="#475569" strokeWidth="1" />
              <line x1="-3" y1="30" x2="4" y2="34" stroke="#fbbf24" strokeWidth="1" />
              <line x1="-3" y1="38" x2="4" y2="42" stroke="#fbbf24" strokeWidth="1" />
              <line x1="-3" y1="46" x2="4" y2="50" stroke="#fbbf24" strokeWidth="1" />
            </g>
          )}

          {prop?.id === 'prop_fan' && (
            <g id="prop-fan" transform="translate(140, 126)">
              {/* Sakura Folding Fan */}
              <path
                d="M-20,-10 C-35,-40 35,-40 20,-10 L0,10 Z"
                fill="#f43f5e"
                stroke="#fda4af"
                strokeWidth="1.5"
              />
              <circle cx="0" cy="-25" r="3" fill="#ffffff" />
              <circle cx="-12" cy="-20" r="2.5" fill="#fecdd3" />
              <circle cx="12" cy="-20" r="2.5" fill="#fecdd3" />
              <line x1="0" y1="10" x2="-25" y2="-28" stroke="#fbbf24" strokeWidth="1" />
              <line x1="0" y1="10" x2="25" y2="-28" stroke="#fbbf24" strokeWidth="1" />
            </g>
          )}

          {prop?.id === 'prop_scroll' && (
            <g id="prop-scroll" transform="translate(136, 115) rotate(10)">
              {/* Ancient Scroll */}
              <rect x="-10" y="-30" width="20" height="50" rx="3" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
              {/* Wooden Spindles */}
              <rect x="-13" y="-33" width="26" height="5" rx="1.5" fill="#854d0e" />
              <rect x="-13" y="18" width="26" height="5" rx="1.5" fill="#854d0e" />
              {/* Kanji text on scroll */}
              <text x="-6" y="-14" fill="#854d0e" fontSize="7" fontWeight="bold">道</text>
              <text x="-6" y="-2" fill="#854d0e" fontSize="7" fontWeight="bold">氣</text>
              <text x="-6" y="10" fill="#854d0e" fontSize="7" fontWeight="bold">光</text>
            </g>
          )}

          {prop?.id === 'prop_wand' && (
            <g id="prop-wand" transform="translate(142, 115) rotate(-20)">
              {/* Magic Star Wand */}
              <line x1="0" y1="30" x2="0" y2="-50" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" />
              <polygon
                points="0,-65 5,-50 20,-50 8,-40 12,-25 0,-35 -12,-25 -8,-40 -20,-50 -5,-50"
                fill="#fbbf24"
                stroke="#f59e0b"
                strokeWidth="1.5"
                className="animate-spin"
                style={{ transformOrigin: '0px -45px', animationDuration: '6s' }}
              />
              <circle cx="0" cy="-45" r="4" fill="#ffffff" />
            </g>
          )}

          {prop?.id === 'prop_matcha' && (
            <g id="prop-matcha" transform="translate(138, 130)">
              {/* Matcha Bowl */}
              <path d="M-10,0 C-12,12 12,12 10,0 Z" fill="#3f6212" stroke="#1e293b" strokeWidth="1.5" />
              <ellipse cx="0" cy="0" rx="10" ry="3.5" fill="#84cc16" stroke="#4d7c0f" strokeWidth="1" />
              {/* Aroma Steam */}
              <path d="M-3,-4 Q-6,-12 -2,-18" fill="none" stroke="#a3e635" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
              <path d="M3,-4 Q6,-12 2,-18" fill="none" stroke="#a3e635" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            </g>
          )}

        </g>
      </svg>
    </div>
  );
};
