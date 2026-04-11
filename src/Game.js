import React, { useState, useEffect, useRef, useCallback } from 'react';
import Modal from './Modal';
import {
  WORLD_W, WORLD_H, SPAWN,
  PLAYER_W, PLAYER_H, PLAYER_SPEED, INTERACT_EXPAND,
  gameObjects, resumeData,
} from './data';

// ── Helpers ───────────────────────────────────────────────────────────────────
function overlaps(ax, ay, aw, ah, bx, by, bw, bh) {
  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}

// ── Player SVG Character ──────────────────────────────────────────────────────
const PlayerSVG = (
  <svg width={PLAYER_W} height={PLAYER_H} viewBox="0 0 22 34" aria-hidden="true">
    {/* head */}
    <circle cx="11" cy="8" r="7" fill="#fde68a" />
    {/* eyes */}
    <circle cx="8.5" cy="7.5" r="1.3" fill="#78350f" />
    <circle cx="13.5" cy="7.5" r="1.3" fill="#78350f" />
    {/* body */}
    <rect x="5" y="15" width="12" height="9" rx="2" fill="#818cf8" />
    {/* legs */}
    <rect x="5" y="24" width="4.5" height="10" rx="1.5" fill="#4338ca" />
    <rect x="12.5" y="24" width="4.5" height="10" rx="1.5" fill="#4338ca" />
  </svg>
);

// ── World Decorations (static, renders once) ──────────────────────────────────
const TREES = [
  [720,150],[840,310],[680,520],[760,730],[700,940],
  [900,220],[1010,420],[970,620],[1100,850],[960,1100],
  [1500,220],[1560,510],[1450,820],[1380,1100],
  [2100,220],[2150,720],[2060,1140],[2200,1600],
  [2500,360],[2620,820],[2550,1150],[2480,1600],
  [3100,250],[3200,700],[3100,1200],[3150,1700],
  [600,1250],[700,1380],[850,1260],
  [1200,2200],[1450,2300],[1900,2380],[2100,2280],
  [450,2000],[350,1850],[550,2200],
];

const ZONE_AREAS = [
  { cls: 'zone-edu',      x: 240, y: 180, w: 560, h: 480 },
  { cls: 'zone-work',     x: 140, y: 830, w: 540, h: 980 },
  { cls: 'zone-projects', x: 2640, y: 230, w: 1160, h: 1440 },
  { cls: 'zone-skills',   x: 1440, y: 1940, w: 860, h: 450 },
  { cls: 'zone-home',     x: 1640, y: 960, w: 440, h: 350 },
];

const ZONE_LABELS = [
  { text: '// EDUCATION',   x: 250, y: 148 },
  { text: '// WORK EXP',    x: 150, y: 800 },
  { text: '// PROJECTS',    x: 2650, y: 198 },
  { text: '// SKILLS',      x: 1455, y: 1908 },
  { text: '// HOME',        x: 1658, y: 928 },
];

function WorldDecor() {
  return (
    <>
      {ZONE_AREAS.map((z, i) => (
        <div key={i} className={`zone-area ${z.cls}`}
          style={{ left: z.x, top: z.y, width: z.w, height: z.h }} />
      ))}
      {ZONE_LABELS.map((l, i) => (
        <div key={i} className="zone-label"
          style={{ left: l.x, top: l.y }}>{l.text}</div>
      ))}
      {TREES.map(([x, y], i) => (
        <div key={i} className="tree" style={{ left: x, top: y }} />
      ))}
    </>
  );
}

// ── Minimap ───────────────────────────────────────────────────────────────────
const MM_SCALE = 0.055;
const MM_W = Math.round(WORLD_W * MM_SCALE);
const MM_H = Math.round(WORLD_H * MM_SCALE);

function Minimap({ dotRef }) {
  return (
    <div className="minimap" style={{ width: MM_W, height: MM_H }}>
      <span className="minimap-label">MAP</span>
      {gameObjects.map((obj) => (
        <div
          key={obj.id}
          className="minimap-obj"
          style={{
            left: Math.round(obj.x * MM_SCALE),
            top: Math.round(obj.y * MM_SCALE),
            width: Math.max(6, Math.round(obj.w * MM_SCALE)),
            height: Math.max(4, Math.round(obj.h * MM_SCALE)),
            background: obj.color,
          }}
        />
      ))}
      <div ref={dotRef} className="minimap-dot"
        style={{ left: Math.round(SPAWN.x * MM_SCALE) - 2, top: Math.round(SPAWN.y * MM_SCALE) - 2 }} />
    </div>
  );
}

// ── Mobile D-pad ──────────────────────────────────────────────────────────────
function MobileControls({ keysRef, onInteract }) {
  const bind = (key) => ({
    onTouchStart:  (e) => { e.preventDefault(); keysRef.current.add(key); },
    onTouchEnd:    (e) => { e.preventDefault(); keysRef.current.delete(key); },
    onTouchCancel: (e) => { e.preventDefault(); keysRef.current.delete(key); },
  });

  return (
    <div className="mobile-controls" aria-label="Game controls">
      <div className="dpad">
        <button className="dpad-btn dpad-up" {...bind('ArrowUp')}>▲</button>
        <div className="dpad-row">
          <button className="dpad-btn dpad-left" {...bind('ArrowLeft')}>◀</button>
          <div className="dpad-center" />
          <button className="dpad-btn dpad-right" {...bind('ArrowRight')}>▶</button>
        </div>
        <button className="dpad-btn dpad-down" {...bind('ArrowDown')}>▼</button>
      </div>
      <button
        className="interact-btn"
        onTouchStart={(e) => { e.preventDefault(); onInteract(); }}
        onMouseDown={(e) => { e.preventDefault(); onInteract(); }}
        aria-label="Interact"
      >
        E
      </button>
    </div>
  );
}

// ── Start Screen ──────────────────────────────────────────────────────────────
function StartScreen({ onStart }) {
  return (
    <div className="start-screen">
      <div className="start-bg" aria-hidden="true" />
      <div className="start-content">
        <p className="start-eyebrow">portfolio.exe</p>
        <h1 className="start-name">DAVID SONG</h1>
        <p className="start-role">Software Engineer</p>
        <div className="start-rule" />
        <p className="start-desc">
          Navigate my world and interact with buildings<br />
          to explore my experience and projects.
        </p>
        <button className="start-btn" onClick={onStart}>▶ START</button>
        <div className="start-hint">
          <span className="key-badge">WASD</span>&nbsp;move&nbsp;&nbsp;
          <span className="key-badge">E</span>&nbsp;interact
        </div>
      </div>
    </div>
  );
}

// ── Main Game ─────────────────────────────────────────────────────────────────
export default function Game() {
  const [started,  setStarted]  = useState(false);
  const [nearbyId, setNearbyId] = useState(null);
  const [modalId,  setModalId]  = useState(null);

  // DOM refs for imperative updates (camera, player, minimap dot, obj nearby class)
  const viewportRef   = useRef(null);
  const playerElRef   = useRef(null);
  const minimapDotRef = useRef(null);
  const objElsRef     = useRef({});  // { [id]: element }

  // Game-state refs (no re-render needed)
  const posRef    = useRef({ ...SPAWN });
  const keysRef   = useRef(new Set());
  const nearbyRef = useRef(null);
  const rafRef    = useRef(null);
  const lastTRef  = useRef(null);

  const openInteract = useCallback(() => {
    if (nearbyRef.current) setModalId(nearbyRef.current);
  }, []);

  const gameLoop = useCallback((t) => {
    if (!lastTRef.current) lastTRef.current = t;
    const dt = Math.min(t - lastTRef.current, 50) / 16;
    lastTRef.current = t;

    // ── Input ──────────────────────────────────────────────────────────────
    const k = keysRef.current;
    let dx = 0, dy = 0;
    if (k.has('ArrowLeft')  || k.has('a') || k.has('A')) dx -= 1;
    if (k.has('ArrowRight') || k.has('d') || k.has('D')) dx += 1;
    if (k.has('ArrowUp')    || k.has('w') || k.has('W')) dy -= 1;
    if (k.has('ArrowDown')  || k.has('s') || k.has('S')) dy += 1;
    if (dx && dy) { dx *= 0.7071; dy *= 0.7071; }

    // ── Movement & collision ───────────────────────────────────────────────
    const spd = PLAYER_SPEED * dt;
    let nx = Math.max(0, Math.min(WORLD_W - PLAYER_W, posRef.current.x + dx * spd));
    let ny = Math.max(0, Math.min(WORLD_H - PLAYER_H, posRef.current.y + dy * spd));

    for (const obj of gameObjects) {
      if (!obj.solid) continue;
      if (overlaps(nx, ny, PLAYER_W, PLAYER_H, obj.x, obj.y, obj.w, obj.h)) {
        // Try sliding along X only
        if (!overlaps(nx, posRef.current.y, PLAYER_W, PLAYER_H, obj.x, obj.y, obj.w, obj.h)) {
          ny = posRef.current.y;
        // Try sliding along Y only
        } else if (!overlaps(posRef.current.x, ny, PLAYER_W, PLAYER_H, obj.x, obj.y, obj.w, obj.h)) {
          nx = posRef.current.x;
        } else {
          nx = posRef.current.x;
          ny = posRef.current.y;
        }
        break;
      }
    }

    posRef.current = { x: nx, y: ny };

    // ── Imperative DOM: camera ─────────────────────────────────────────────
    if (viewportRef.current) {
      const cx = nx + PLAYER_W / 2;
      const cy = ny + PLAYER_H / 2;
      viewportRef.current.style.transform =
        `translate(calc(50vw - ${cx}px), calc(50vh - ${cy}px))`;
    }

    // ── Imperative DOM: player position + animation class ─────────────────
    if (playerElRef.current) {
      playerElRef.current.style.left = nx + 'px';
      playerElRef.current.style.top  = ny + 'px';
      let facing = 'down';
      if      (dx > 0) facing = 'right';
      else if (dx < 0) facing = 'left';
      else if (dy < 0) facing = 'up';
      const mv = dx !== 0 || dy !== 0;
      playerElRef.current.className = `player player-${facing}${mv ? ' player-moving' : ''}`;
    }

    // ── Imperative DOM: minimap dot ────────────────────────────────────────
    if (minimapDotRef.current) {
      minimapDotRef.current.style.left = (nx * MM_SCALE - 2) + 'px';
      minimapDotRef.current.style.top  = (ny * MM_SCALE - 2) + 'px';
    }

    // ── Proximity detection ────────────────────────────────────────────────
    let nearby = null;
    for (const obj of gameObjects) {
      if (overlaps(
        nx - INTERACT_EXPAND, ny - INTERACT_EXPAND,
        PLAYER_W + INTERACT_EXPAND * 2, PLAYER_H + INTERACT_EXPAND * 2,
        obj.x, obj.y, obj.w, obj.h
      )) { nearby = obj.id; break; }
    }

    // ── Imperative DOM: nearby glow class ─────────────────────────────────
    if (nearby !== nearbyRef.current) {
      const prev = nearbyRef.current;
      nearbyRef.current = nearby;
      if (prev && objElsRef.current[prev]) {
        objElsRef.current[prev].classList.remove('nearby');
      }
      if (nearby && objElsRef.current[nearby]) {
        objElsRef.current[nearby].classList.add('nearby');
      }
      setNearbyId(nearby); // updates HUD prompt (fine to trigger re-render here)
    }

    rafRef.current = requestAnimationFrame(gameLoop);
  }, []);

  useEffect(() => {
    if (!started) return;

    // Sync initial camera & player
    const { x, y } = posRef.current;
    if (viewportRef.current) {
      viewportRef.current.style.transform =
        `translate(calc(50vw - ${x + PLAYER_W / 2}px), calc(50vh - ${y + PLAYER_H / 2}px))`;
    }
    if (playerElRef.current) {
      playerElRef.current.style.left = x + 'px';
      playerElRef.current.style.top  = y + 'px';
    }

    const onKeyDown = (e) => {
      keysRef.current.add(e.key);
      if ((e.key === 'e' || e.key === 'E' || e.key === 'Enter') && nearbyRef.current) {
        setModalId(nearbyRef.current);
      }
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key)) {
        e.preventDefault();
      }
    };
    const onKeyUp = (e) => keysRef.current.delete(e.key);

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup',   onKeyUp);
    rafRef.current = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup',   onKeyUp);
      cancelAnimationFrame(rafRef.current);
      lastTRef.current = null;
    };
  }, [started, gameLoop]);

  if (!started) return <StartScreen onStart={() => setStarted(true)} />;

  return (
    <div className="game-root">
      {/* ── World ─────────────────────────────────────────── */}
      <div ref={viewportRef} className="world-viewport">
        <div className="world" style={{ width: WORLD_W, height: WORLD_H }}>
          <WorldDecor />

          {/* Game objects */}
          {gameObjects.map((obj) => (
            <div
              key={obj.id}
              ref={(el) => { if (el) objElsRef.current[obj.id] = el; }}
              className="game-object"
              style={{
                left: obj.x, top: obj.y,
                width: obj.w, height: obj.h,
                '--obj-color': obj.color,
                '--obj-glow':  obj.glowColor,
              }}
            >
              <div className="obj-inner">
                <div className="obj-icon">{obj.icon}</div>
                <div className="obj-label">{obj.label}</div>
                <div className="obj-sublabel">{obj.sublabel}</div>
              </div>
              <div className="obj-hint">Press <kbd>E</kbd></div>
            </div>
          ))}

          {/* Player */}
          <div
            ref={playerElRef}
            className="player player-down"
            style={{ position: 'absolute', left: SPAWN.x, top: SPAWN.y }}
          >
            <div className="player-shadow" />
            {PlayerSVG}
            <div className="player-tag">you</div>
          </div>
        </div>
      </div>

      {/* ── HUD ───────────────────────────────────────────── */}
      <div className="hud-name-card">
        <span className="hud-name">David Song</span>
        <span className="hud-title">Software Engineer</span>
      </div>

      <div className="hud-controls">
        <span className="key-badge">WASD</span> move&nbsp;&nbsp;
        <span className="key-badge">E</span> interact
      </div>

      {nearbyId && (
        <div className="hud-prompt">
          <span className="key-badge">E</span> interact
        </div>
      )}

      <Minimap dotRef={minimapDotRef} />
      <MobileControls keysRef={keysRef} onInteract={openInteract} />

      {modalId && (
        <Modal id={modalId} data={resumeData} onClose={() => setModalId(null)} />
      )}
    </div>
  );
}
