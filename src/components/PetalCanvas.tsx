import { useEffect, useRef } from 'react';
import styles from './PetalCanvas.module.css';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  swayAmplitude: number;
  swaySpeed: number;
  swayPhase: number;
  rotation: number;
  rotationSpeed: number;
  flip: number;
  flipSpeed: number;
  alpha: number;
  color: string;
}

const COLORS = ['#F7C6CE', '#F2B5C0', '#FAD6DC', '#EDA9B6'];
const random = (min: number, max: number) => min + Math.random() * (max - min);

/** 벚꽃잎이 흩날리는 캔버스. 부모 요소(position: relative)를 가득 채운다 */
export function PetalCanvas({ count = 26 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createPetal = (initial: boolean): Petal => ({
      x: random(0, width),
      y: initial ? random(-height, height) : random(-40, -12),
      size: random(6, 12),
      speedY: random(24, 50),
      speedX: random(-6, 14),
      swayAmplitude: random(10, 28),
      swaySpeed: random(0.6, 1.4),
      swayPhase: random(0, Math.PI * 2),
      rotation: random(0, Math.PI * 2),
      rotationSpeed: random(-1.2, 1.2),
      flip: random(0, Math.PI * 2),
      flipSpeed: random(1.5, 3.2),
      alpha: random(0.55, 0.9),
      color: COLORS[Math.floor(random(0, COLORS.length))],
    });

    const drawPetal = (petal: Petal) => {
      const s = petal.size;
      ctx.save();
      ctx.translate(petal.x + Math.sin(petal.swayPhase) * petal.swayAmplitude, petal.y);
      ctx.rotate(petal.rotation);
      ctx.scale(Math.cos(petal.flip), 1); // 뒤집히는 입체감
      ctx.globalAlpha = petal.alpha;
      ctx.fillStyle = petal.color;
      ctx.beginPath();
      ctx.moveTo(0, s);
      ctx.bezierCurveTo(s * 0.95, s * 0.35, s * 0.8, -s * 0.85, s * 0.28, -s);
      ctx.lineTo(0, -s * 0.7); // 벚꽃잎 끝의 홈
      ctx.lineTo(-s * 0.28, -s);
      ctx.bezierCurveTo(-s * 0.8, -s * 0.85, -s * 0.95, s * 0.35, 0, s);
      ctx.fill();
      ctx.restore();
    };

    resize();
    const petals = Array.from({ length: count }, () => createPetal(true));

    let frameId = 0;
    let lastTime = 0;
    let running = false;
    let inView = true;

    const step = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const petal = petals[i];
        petal.y += petal.speedY * dt;
        petal.x += petal.speedX * dt;
        petal.swayPhase += petal.swaySpeed * dt;
        petal.rotation += petal.rotationSpeed * dt;
        petal.flip += petal.flipSpeed * dt;
        if (petal.y - petal.size > height || petal.x < -60 || petal.x > width + 60) {
          petals[i] = createPetal(false);
        }
        drawPetal(petals[i]);
      }
      frameId = requestAnimationFrame(step);
    };

    const start = () => {
      if (running || !inView || document.hidden) return;
      running = true;
      lastTime = performance.now();
      frameId = requestAnimationFrame(step);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frameId);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // 화면 밖으로 스크롤되거나 탭이 숨겨지면 멈춘다
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else stop();
    });
    intersectionObserver.observe(canvas);

    const handleVisibilityChange = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', handleVisibilityChange);

    start();
    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [count]);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
