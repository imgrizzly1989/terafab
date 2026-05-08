"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

type ViewMode = "satellite" | "district" | "cleanroom" | "human";

type CameraPose = {
  label: string;
  eyebrow: string;
  description: string;
  position: THREE.Vector3;
  target: THREE.Vector3;
  fogNear: number;
  fogFar: number;
};

const viewModes: Record<ViewMode, CameraPose> = {
  satellite: {
    label: "Satellite",
    eyebrow: "01 / orbital approach",
    description: "A 12 km² industrial organism: fabrication, power, cooling and logistics compressed into one luminous terrain.",
    position: new THREE.Vector3(0, 58, 78),
    target: new THREE.Vector3(0, 0, 0),
    fogNear: 42,
    fogFar: 142,
  },
  district: {
    label: "District",
    eyebrow: "02 / industrial city",
    description: "Chip-fab blocks, substations, cooling towers and robotic logistics routes read as districts, not rooms.",
    position: new THREE.Vector3(-28, 24, 38),
    target: new THREE.Vector3(1, 2, -4),
    fogNear: 22,
    fogFar: 88,
  },
  cleanroom: {
    label: "Clean-room",
    eyebrow: "03 / process scale",
    description: "The camera descends into fab-scale corridors where humans become maintenance annotations beside automated systems.",
    position: new THREE.Vector3(-8, 8, 15),
    target: new THREE.Vector3(-8, 3, -5),
    fogNear: 9,
    fogFar: 42,
  },
  human: {
    label: "Human scale",
    eyebrow: "04 / scale shock",
    description: "A 1.8 m figure is almost invisible against clean-room bays, power spines and autonomous transport lanes.",
    position: new THREE.Vector3(-3.4, 2.8, 8.8),
    target: new THREE.Vector3(-3.2, 1.2, 1.8),
    fogNear: 4,
    fogFar: 23,
  },
};

const routePoints = [
  [new THREE.Vector3(-42, 0.18, -16), new THREE.Vector3(-20, 0.18, -10), new THREE.Vector3(0, 0.18, -18), new THREE.Vector3(38, 0.18, -8)],
  [new THREE.Vector3(-38, 0.2, 14), new THREE.Vector3(-12, 0.2, 8), new THREE.Vector3(12, 0.2, 13), new THREE.Vector3(42, 0.2, 4)],
  [new THREE.Vector3(-26, 0.22, 30), new THREE.Vector3(-18, 0.22, 0), new THREE.Vector3(-8, 0.22, -24)],
  [new THREE.Vector3(22, 0.22, 28), new THREE.Vector3(18, 0.22, 2), new THREE.Vector3(10, 0.22, -30)],
];

const districtLabels = [
  { label: "Chip fabrication districts", x: -17, z: -9, color: "cyan" },
  { label: "Cooling infrastructure", x: 22, z: 16, color: "blue" },
  { label: "Power spine", x: -34, z: 20, color: "amber" },
  { label: "Robotic logistics loop", x: 4, z: 25, color: "cyan" },
];

function addBox(
  scene: THREE.Scene,
  size: [number, number, number],
  position: [number, number, number],
  material: THREE.Material,
) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
  mesh.position.set(...position);
  scene.add(mesh);
  return mesh;
}

function makeLabelSprite(text: string, color: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0,0,0,0.58)";
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.roundRect(12, 22, 488, 76, 18);
    ctx.fill();
    ctx.stroke();
    ctx.font = "500 32px Arial";
    ctx.fillStyle = "rgba(242,248,255,0.92)";
    ctx.fillText(text.toUpperCase(), 34, 72);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.86 });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(10.5, 2.6, 1);
  return sprite;
}

export function TeraFabMegaCity() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [mode, setMode] = useState<ViewMode>("satellite");
  const modeRef = useRef<ViewMode>("satellite");
  const activePose = viewModes[mode];

  const stats = useMemo(
    () => [
      { label: "model footprint", value: "12 km²" },
      { label: "camera range", value: mode === "human" ? "1.8 m" : mode === "cleanroom" ? "80 m" : mode === "district" ? "1.6 km" : "12 km" },
      { label: "systems visible", value: "6 layers" },
    ],
    [mode],
  );

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    if (!hostRef.current) return;
    const host = hostRef.current;
    let frame = 0;
    let disposed = false;
    const disposables: { dispose: () => void }[] = [];
    const movers: { mesh: THREE.Mesh; curve: THREE.CatmullRomCurve3; speed: number; offset: number }[] = [];
    const pulseMaterials: THREE.MeshStandardMaterial[] = [];

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowPower = window.devicePixelRatio > 1.5 || window.innerWidth < 768;
    let visible = true;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020306);
    scene.fog = new THREE.Fog(0x06111b, viewModes.satellite.fogNear, viewModes.satellite.fogFar);

    const camera = new THREE.PerspectiveCamera(42, host.clientWidth / host.clientHeight, 0.08, 240);
    camera.position.copy(viewModes.satellite.position);
    camera.lookAt(viewModes.satellite.target);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: !lowPower, alpha: false, powerPreference: lowPower ? "low-power" : "high-performance" });
    } catch {
      host.dataset.webglUnavailable = "true";
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowPower ? 1.05 : 1.35));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.24;
    host.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    const blackMetal = new THREE.MeshStandardMaterial({ color: 0x11161d, roughness: 0.62, metalness: 0.38 });
    const darkPanel = new THREE.MeshStandardMaterial({ color: 0x151b24, roughness: 0.54, metalness: 0.45 });
    const fabMaterial = new THREE.MeshStandardMaterial({ color: 0x27313e, roughness: 0.34, metalness: 0.58, emissive: 0x0b2333, emissiveIntensity: 0.24 });
    const blueGlow = new THREE.MeshStandardMaterial({ color: 0x62d8ff, emissive: 0x18bfff, emissiveIntensity: 2.3, roughness: 0.22, metalness: 0.2 });
    const amberGlow = new THREE.MeshStandardMaterial({ color: 0xffbd4a, emissive: 0xff8b13, emissiveIntensity: 2.2, roughness: 0.26, metalness: 0.18 });
    const coldGlass = new THREE.MeshStandardMaterial({ color: 0xbfefff, transparent: true, opacity: 0.22, emissive: 0x0d8fb7, emissiveIntensity: 0.5, roughness: 0.08, metalness: 0.2 });
    const humanMaterial = new THREE.MeshStandardMaterial({ color: 0xf8fbff, emissive: 0xdcefff, emissiveIntensity: 0.45 });
    disposables.push(blackMetal, darkPanel, fabMaterial, blueGlow, amberGlow, coldGlass, humanMaterial);
    pulseMaterials.push(blueGlow, amberGlow);

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(96, 62, lowPower ? 24 : 56, lowPower ? 16 : 36),
      new THREE.MeshStandardMaterial({ color: 0x05080c, roughness: 0.92, metalness: 0.08 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.03;
    root.add(ground);
    disposables.push(ground.geometry, ground.material as THREE.Material);

    const grid = new THREE.GridHelper(96, 64, 0x22404a, 0x101e24);
    grid.position.y = 0.02;
    root.add(grid);

    // Central chip fabrication districts.
    for (let row = 0; row < 4; row += 1) {
      for (let col = 0; col < 7; col += 1) {
        const height = 1.1 + ((row + col) % 3) * 0.35;
        const x = -24 + col * 6.4;
        const z = -14 + row * 6.2;
        const block = addBox(scene, [4.8, height, 3.8], [x, height / 2, z], fabMaterial);
        root.add(block);
        const roof = addBox(scene, [3.8, 0.08, 2.8], [x, height + 0.08, z], coldGlass);
        root.add(roof);
      }
    }

    // Clean-room spine and human-scale corridor.
    for (let i = 0; i < 12; i += 1) {
      const x = -18 + i * 3.2;
      const bay = addBox(scene, [2.2, 0.52, 1.4], [x, 0.28, -25], darkPanel);
      root.add(bay);
      const light = addBox(scene, [1.5, 0.05, 0.08], [x, 0.58, -24.22], blueGlow);
      root.add(light);
    }

    // Cooling towers.
    for (let i = 0; i < 9; i += 1) {
      const x = 20 + (i % 3) * 5;
      const z = 8 + Math.floor(i / 3) * 5.4;
      const tower = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.55, 5.2, lowPower ? 18 : 28), blackMetal);
      tower.position.set(x, 2.6, z);
      root.add(tower);
      const plume = new THREE.Mesh(
        new THREE.SphereGeometry(1.55, lowPower ? 12 : 20, lowPower ? 8 : 10),
        new THREE.MeshBasicMaterial({ color: 0x9fcfff, transparent: true, opacity: 0.09, depthWrite: false }),
      );
      plume.position.set(x, 5.6, z);
      plume.scale.set(1, 0.42, 1);
      root.add(plume);
      disposables.push(tower.geometry, plume.geometry, plume.material as THREE.Material);
    }

    // Power infrastructure and substations.
    for (let i = 0; i < 8; i += 1) {
      const x = -43 + i * 4.3;
      const mast = addBox(scene, [0.22, 4.6, 0.22], [x, 2.3, 22], amberGlow);
      root.add(mast);
      const cross = addBox(scene, [2.4, 0.14, 0.14], [x, 4.2, 22], amberGlow);
      root.add(cross);
    }
    for (let i = 0; i < 5; i += 1) {
      const sub = addBox(scene, [3.4, 1, 2.2], [-40 + i * 5.1, 0.5, 28], darkPanel);
      root.add(sub);
      const core = addBox(scene, [2.2, 0.14, 1.5], [-40 + i * 5.1, 1.06, 28], amberGlow);
      root.add(core);
    }

    // Massive assembly halls.
    for (let i = 0; i < 5; i += 1) {
      const hall = addBox(scene, [9, 2.8 + i * 0.18, 5.8], [-15 + i * 10.8, 1.5 + i * 0.09, 16], blackMetal);
      root.add(hall);
      const slit = addBox(scene, [8.2, 0.12, 0.12], [-15 + i * 10.8, 2.85 + i * 0.18, 13.05], blueGlow);
      root.add(slit);
    }

    // Glowing logistics routes.
    routePoints.forEach((points, index) => {
      const curve = new THREE.CatmullRomCurve3(points);
      const geometry = new THREE.TubeGeometry(curve, lowPower ? 42 : 72, 0.075, lowPower ? 5 : 7, false);
      const material = new THREE.MeshBasicMaterial({ color: index === 1 ? 0xffb020 : 0x42e8ff, transparent: true, opacity: 0.9 });
      const route = new THREE.Mesh(geometry, material);
      root.add(route);
      disposables.push(geometry, material);

      for (let j = 0; j < 4; j += 1) {
        const mover = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.24, 0.36), index === 1 ? amberGlow : blueGlow);
        root.add(mover);
        movers.push({ mesh: mover, curve, speed: 0.035 + index * 0.006, offset: j / 4 + index * 0.08 });
      }
    });

    // Small human-scale figure.
    const human = new THREE.Group();
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.12, 0.82, 6, 12), humanMaterial);
    body.position.y = 0.62;
    human.add(body);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 12), humanMaterial);
    head.position.y = 1.22;
    human.add(head);
    human.position.set(-3.2, 0.02, 2.0);
    root.add(human);
    disposables.push(body.geometry, head.geometry);

    districtLabels.forEach((item) => {
      const color = item.color === "amber" ? "rgba(255,176,32,.75)" : item.color === "blue" ? "rgba(77,163,255,.75)" : "rgba(66,232,255,.75)";
      const sprite = makeLabelSprite(item.label, color);
      sprite.position.set(item.x, 5.8, item.z);
      root.add(sprite);
      if (sprite.material.map) disposables.push(sprite.material.map);
      disposables.push(sprite.material);
    });

    // Distant city lights around the industrial campus.
    const cityLights = new THREE.BufferGeometry();
    const lightCount = lowPower ? 360 : 680;
    const lightPositions = new Float32Array(lightCount * 3);
    for (let i = 0; i < lightCount; i += 1) {
      const ring = 38 + Math.random() * 36;
      const angle = Math.random() * Math.PI * 2;
      lightPositions[i * 3] = Math.cos(angle) * ring;
      lightPositions[i * 3 + 1] = 0.1 + Math.random() * 0.2;
      lightPositions[i * 3 + 2] = Math.sin(angle) * ring * 0.62;
    }
    cityLights.setAttribute("position", new THREE.BufferAttribute(lightPositions, 3));
    const cityParticles = new THREE.Points(
      cityLights,
      new THREE.PointsMaterial({ color: 0x9edfff, size: 0.075, transparent: true, opacity: 0.52, depthWrite: false }),
    );
    root.add(cityParticles);
    disposables.push(cityLights, cityParticles.material as THREE.Material);

    scene.add(new THREE.HemisphereLight(0x9fcfff, 0x061018, 1.2));
    const moon = new THREE.DirectionalLight(0xffffff, 4.1);
    moon.position.set(-35, 42, 26);
    scene.add(moon);
    const cyanRim = new THREE.PointLight(0x42e8ff, 125, 90);
    cyanRim.position.set(10, 12, -18);
    scene.add(cyanRim);
    const amberRim = new THREE.PointLight(0xff9c20, 92, 80);
    amberRim.position.set(-32, 8, 25);
    scene.add(amberRim);

    const mouse = new THREE.Vector2(0, 0);
    const currentTarget = new THREE.Vector3();
    const onPointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const onResize = () => {
      camera.aspect = host.clientWidth / host.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(host.clientWidth, host.clientHeight);
    };

    host.addEventListener("pointermove", onPointerMove);
    window.addEventListener("resize", onResize);
    const observer = "IntersectionObserver" in window ? new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    }, { threshold: 0.05 }) : null;
    observer?.observe(host);

    const clock = new THREE.Clock();
    const animate = () => {
      if (disposed) return;
      frame = requestAnimationFrame(animate);
      if (document.hidden || !visible) return;
      const elapsed = clock.getElapsedTime();
      const pose = viewModes[modeRef.current];
      const parallax = modeRef.current === "satellite" ? 1.8 : modeRef.current === "human" ? 0.18 : 0.55;
      const desired = pose.position.clone().add(new THREE.Vector3(mouse.x * parallax, -mouse.y * parallax * 0.36, mouse.y * parallax));
      camera.position.lerp(desired, 0.035);
      currentTarget.lerp(pose.target, 0.045);
      camera.lookAt(currentTarget);
      const fog = scene.fog as THREE.Fog;
      fog.near = THREE.MathUtils.lerp(fog.near, pose.fogNear, 0.035);
      fog.far = THREE.MathUtils.lerp(fog.far, pose.fogFar, 0.035);
      root.rotation.y = prefersReducedMotion ? 0 : Math.sin(elapsed * 0.08) * 0.018;
      pulseMaterials.forEach((material, index) => {
        material.emissiveIntensity = prefersReducedMotion ? 1.9 : 1.9 + Math.sin(elapsed * 1.4 + index) * 0.38;
      });
      if (!prefersReducedMotion) movers.forEach((item) => {
        const t = (elapsed * item.speed + item.offset) % 1;
        const point = item.curve.getPointAt(t);
        const tangent = item.curve.getTangentAt(t);
        item.mesh.position.copy(point).add(new THREE.Vector3(0, 0.22, 0));
        item.mesh.rotation.y = Math.atan2(tangent.x, tangent.z);
      });
      cityParticles.rotation.y += prefersReducedMotion ? 0 : 0.00014;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      host.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      observer?.disconnect();
      scene.traverse((object) => {
        const maybeMesh = object as THREE.Mesh;
        maybeMesh.geometry?.dispose?.();
        const material = maybeMesh.material;
        if (Array.isArray(material)) {
          material.forEach((item) => item.dispose());
        } else {
          material?.dispose?.();
        }
      });
      disposables.forEach((item) => item.dispose());
      renderer.dispose();
      if (renderer.domElement.parentElement) renderer.domElement.parentElement.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section id="mega-city" className="relative isolate overflow-hidden bg-black py-10 sm:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(66,232,255,.14),transparent_28rem),linear-gradient(180deg,rgba(0,0,0,.9),transparent_18%,rgba(0,0,0,.92)_92%)]" />
      <div className="mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-8">
        <div className="relative min-h-[760px] overflow-hidden rounded-[2.4rem] border border-white/10 bg-[#020306] shadow-2xl shadow-cyan-950/30 sm:min-h-[860px]">
          <div ref={hostRef} className="absolute inset-0" aria-hidden />
          <div className="pointer-events-none absolute inset-0 grid-overlay opacity-25" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.72),transparent_34%,transparent_66%,rgba(0,0,0,.62)),radial-gradient(circle_at_50%_65%,transparent,rgba(0,0,0,.72)_78%)]" />

          <div className="absolute left-4 right-4 top-4 z-10 flex flex-col gap-4 sm:left-8 sm:right-8 sm:top-8 lg:flex-row lg:items-start lg:justify-between">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl rounded-[2rem] border border-white/10 bg-black/45 p-5 backdrop-blur-md sm:p-7"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-100/70">{activePose.eyebrow}</p>
              <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-[0.9] tracking-[-0.075em] text-white sm:text-6xl lg:text-7xl">
                Industrial mega-city view.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">{activePose.description}</p>
            </motion.div>

            <div className="rounded-[1.5rem] border border-white/10 bg-black/45 p-2 backdrop-blur-md">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1">
                {(Object.keys(viewModes) as ViewMode[]).map((item) => (
                  <button
                    key={item}
                    onClick={() => setMode(item)}
                    aria-pressed={mode === item}
                    className={`min-h-11 rounded-full px-4 font-mono text-[10px] uppercase tracking-[0.2em] transition ${
                      mode === item ? "bg-cyan-100 text-black shadow-[0_0_34px_rgba(66,232,255,.25)]" : "text-slate-400 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {viewModes[item].label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col gap-3 sm:bottom-8 sm:left-8 sm:right-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="grid gap-3 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-black/50 p-4 backdrop-blur-md">
                  <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-slate-500">{stat.label}</p>
                  <p className="mt-2 text-2xl font-semibold tracking-[-0.06em] text-white">{stat.value}</p>
                </div>
              ))}
            </div>
            <div className="rounded-full border border-white/10 bg-black/55 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-300 backdrop-blur-md">
              Move pointer for parallax · switch view to zoom
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
