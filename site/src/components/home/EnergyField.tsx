'use client';
import { useEffect, useRef } from 'react';

/**
 * WebGL backdrop for the hero: curved conductors converge from the left into the
 * image card on the right, with glowing current pulses running along them and dust
 * floating in depth. The camera follows the pointer. `surge` bumps every time the
 * carousel changes slide so the current visibly accelerates.
 * three.js is imported on demand and skipped entirely with reduced motion.
 */
export function EnergyField({ surge }: { surge: number }) {
  const host = useRef<HTMLDivElement>(null);
  const surgeRef = useRef(0);

  useEffect(() => { surgeRef.current = 1; }, [surge]);

  useEffect(() => {
    const el = host.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let dispose = () => {};
    let cancelled = false;

    (async () => {
      const THREE = await import('three');
      if (cancelled) return;
      const small = window.innerWidth < 768;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 1.75));
      renderer.setClearColor(0x000000, 0);
      el.appendChild(renderer.domElement);
      renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%';

      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0x15110f, 10, 30);
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
      camera.position.set(0, 0, 14);

      const red = new THREE.Color('#ff3b2f');
      const copper = new THREE.Color('#e0b27a');
      const white = new THREE.Color('#fff4e8');

      // ── Conductors ───────────────────────────────────────────────────────
      const PATHS = small ? 16 : 34;
      const SAMPLES = 240;
      const curves: Float32Array[] = [];
      const rnd = (a: number, b: number) => a + Math.random() * (b - a);
      const target = new THREE.Vector3(small ? 0 : 4.2, small ? 2.5 : 0, 0);
      const linePos: number[] = [];

      for (let i = 0; i < PATHS; i++) {
        const y0 = rnd(-9, 9), z0 = rnd(-8, 3);
        const pts = [
          new THREE.Vector3(-20, y0, z0),
          new THREE.Vector3(-9, y0 * 0.8 + rnd(-1.5, 1.5), z0 * 0.8),
          new THREE.Vector3(-2, y0 * 0.45 + rnd(-1, 1), z0 * 0.5),
          new THREE.Vector3(target.x - 1.5, target.y + y0 * 0.12, target.z + z0 * 0.15),
          new THREE.Vector3(target.x + 4, target.y + y0 * 0.35, z0 * 0.4),
          new THREE.Vector3(22, y0 * 0.7, z0),
        ];
        const curve = new THREE.CatmullRomCurve3(pts, false, 'centripetal');
        const sampled = curve.getSpacedPoints(SAMPLES - 1);
        const arr = new Float32Array(SAMPLES * 3);
        sampled.forEach((p, k) => { arr[k * 3] = p.x; arr[k * 3 + 1] = p.y; arr[k * 3 + 2] = p.z; });
        curves.push(arr);
        for (let k = 0; k < SAMPLES - 1; k++) linePos.push(arr[k * 3], arr[k * 3 + 1], arr[k * 3 + 2], arr[k * 3 + 3], arr[k * 3 + 4], arr[k * 3 + 5]);
      }
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));
      const lineMat = new THREE.LineBasicMaterial({ color: copper, transparent: true, opacity: 0.11, blending: THREE.AdditiveBlending, depthWrite: false });
      const lines = new THREE.LineSegments(lineGeo, lineMat);
      scene.add(lines);

      // ── Current pulses (points with fading trails) ──────────────────────
      const PER = small ? 2 : 3;
      const TRAIL = 14;
      const pulses = Array.from({ length: PATHS * PER }, (_, i) => ({
        path: i % PATHS,
        t: Math.random(),
        speed: rnd(0.035, 0.08),
        color: Math.random() < 0.7 ? red : Math.random() < 0.5 ? copper : white,
      }));
      const count = pulses.length * TRAIL;
      const pPos = new Float32Array(count * 3);
      const pCol = new Float32Array(count * 3);
      const pAlpha = new Float32Array(count);
      const pSize = new Float32Array(count);
      pulses.forEach((p, i) => {
        for (let k = 0; k < TRAIL; k++) {
          const j = i * TRAIL + k;
          const f = 1 - k / TRAIL;
          pCol.set([p.color.r, p.color.g, p.color.b], j * 3);
          pAlpha[j] = f * f;
          pSize[j] = (k === 0 ? 1.6 : 1) * (0.35 + 0.65 * f);
        }
      });
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
      pGeo.setAttribute('alpha', new THREE.BufferAttribute(pAlpha, 1));
      pGeo.setAttribute('size', new THREE.BufferAttribute(pSize, 1));
      const glow = new THREE.ShaderMaterial({
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
        uniforms: { uScale: { value: 1 }, uBoost: { value: 0 } },
        vertexShader: /* glsl */ `
          attribute vec3 color; attribute float alpha; attribute float size;
          uniform float uScale; uniform float uBoost;
          varying vec3 vColor; varying float vAlpha;
          void main() {
            vColor = color; vAlpha = alpha * (0.85 + uBoost * 0.6);
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * uScale * (1.0 + uBoost * 0.5) * (40.0 / -mv.z);
            gl_Position = projectionMatrix * mv;
          }`,
        fragmentShader: /* glsl */ `
          varying vec3 vColor; varying float vAlpha;
          void main() {
            float d = length(gl_PointCoord - 0.5);
            float a = smoothstep(0.5, 0.0, d);
            a = a * a;
            gl_FragColor = vec4(vColor * (1.0 + a), a * vAlpha);
          }`,
      });
      const points = new THREE.Points(pGeo, glow);
      scene.add(points);

      // ── Dust ─────────────────────────────────────────────────────────────
      const DUST = small ? 220 : 520;
      const dPos = new Float32Array(DUST * 3);
      for (let i = 0; i < DUST; i++) dPos.set([rnd(-22, 22), rnd(-12, 12), rnd(-14, 6)], i * 3);
      const dGeo = new THREE.BufferGeometry();
      dGeo.setAttribute('position', new THREE.BufferAttribute(dPos, 3));
      const dMat = new THREE.PointsMaterial({ color: copper, size: 0.045, transparent: true, opacity: 0.45, depthWrite: false, blending: THREE.AdditiveBlending });
      const dust = new THREE.Points(dGeo, dMat);
      scene.add(dust);

      // ── Size / pointer / visibility ──────────────────────────────────────
      const resize = () => {
        const { clientWidth: w, clientHeight: h } = el;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        glow.uniforms.uScale.value = renderer.getPixelRatio() * Math.min(1.4, h / 700);
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(el);

      const mouse = { x: 0, y: 0, sx: 0, sy: 0 };
      const onMove = (e: PointerEvent) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener('pointermove', onMove, { passive: true });

      let visible = true;
      const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
      io.observe(el);

      // ── Loop ─────────────────────────────────────────────────────────────
      const clock = new THREE.Clock();
      let raf = 0;
      let boost = 0;
      const tick = () => {
        raf = requestAnimationFrame(tick);
        if (!visible || document.hidden) { clock.getDelta(); return; }
        const dt = Math.min(clock.getDelta(), 0.05);
        const time = clock.elapsedTime;

        // surge eases in quickly, decays slowly
        if (surgeRef.current > 0) { boost = Math.max(boost, surgeRef.current); surgeRef.current = 0; }
        boost *= Math.pow(0.35, dt);
        glow.uniforms.uBoost.value = boost;
        lineMat.opacity = 0.11 + boost * 0.12;

        const step = 1 / SAMPLES;
        for (let i = 0; i < pulses.length; i++) {
          const p = pulses[i];
          p.t = (p.t + p.speed * dt * (1 + boost * 5)) % 1;
          const c = curves[p.path];
          for (let k = 0; k < TRAIL; k++) {
            let tt = p.t - k * step * (1.4 + boost * 2);
            if (tt < 0) tt += 1;
            const f = tt * (SAMPLES - 1);
            const a = Math.floor(f), b = Math.min(a + 1, SAMPLES - 1), m = f - a;
            const j = (i * TRAIL + k) * 3;
            pPos[j] = c[a * 3] + (c[b * 3] - c[a * 3]) * m;
            pPos[j + 1] = c[a * 3 + 1] + (c[b * 3 + 1] - c[a * 3 + 1]) * m;
            pPos[j + 2] = c[a * 3 + 2] + (c[b * 3 + 2] - c[a * 3 + 2]) * m;
          }
        }
        pGeo.attributes.position.needsUpdate = true;

        dust.rotation.y = time * 0.012;
        dust.position.y = Math.sin(time * 0.2) * 0.3;

        mouse.sx += (mouse.x - mouse.sx) * 0.04;
        mouse.sy += (mouse.y - mouse.sy) * 0.04;
        camera.position.x = mouse.sx * 1.6;
        camera.position.y = -mouse.sy * 1.1;
        camera.lookAt(0, 0, 0);
        scene.rotation.z = Math.sin(time * 0.1) * 0.03;

        renderer.render(scene, camera);
      };
      tick();
      el.dataset.ready = '';

      dispose = () => {
        cancelAnimationFrame(raf);
        ro.disconnect(); io.disconnect();
        window.removeEventListener('pointermove', onMove);
        [lineGeo, pGeo, dGeo].forEach((g) => g.dispose());
        [lineMat, glow, dMat].forEach((m) => m.dispose());
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => { cancelled = true; dispose(); };
  }, []);

  return <div ref={host} aria-hidden className="energy-field pointer-events-none absolute inset-0 -z-10" />;
}
