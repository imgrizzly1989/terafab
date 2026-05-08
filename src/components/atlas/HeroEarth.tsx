"use client";

import { useEffect, useRef } from "react";

export function HeroEarth() {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let disposed = false;
    let frame = 0;
    let startTimer = 0;
    let cleanup = () => {};

    async function run() {
      const THREE = await import("three");
      if (!hostRef.current || disposed) return;

      const host = hostRef.current;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, host.clientWidth / host.clientHeight, 0.1, 100);
      camera.position.set(0, 0.3, 6.8);

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: window.devicePixelRatio <= 1.5, alpha: true, powerPreference: "low-power" });
      } catch {
        host.dataset.webglUnavailable = "true";
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.35));
      renderer.setSize(host.clientWidth, host.clientHeight);
      host.appendChild(renderer.domElement);

      const earthGroup = new THREE.Group();
      scene.add(earthGroup);

      const geometry = new THREE.SphereGeometry(1.8, 96, 96);
      const material = new THREE.MeshStandardMaterial({
        color: 0x132036,
        roughness: 0.72,
        metalness: 0.08,
        emissive: 0x07101f,
        emissiveIntensity: 0.5,
      });
      const earth = new THREE.Mesh(geometry, material);
      earthGroup.add(earth);

      const wire = new THREE.Mesh(
        new THREE.SphereGeometry(1.805, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0x4da3ff, wireframe: true, transparent: true, opacity: 0.085 })
      );
      earthGroup.add(wire);

      const texasPin = new THREE.Mesh(
        new THREE.SphereGeometry(0.035, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xffb020 })
      );
      texasPin.position.set(-0.55, 0.36, 1.72);
      earthGroup.add(texasPin);

      const pinGlow = new THREE.Mesh(
        new THREE.SphereGeometry(0.085, 24, 24),
        new THREE.MeshBasicMaterial({ color: 0xffb020, transparent: true, opacity: 0.23 })
      );
      pinGlow.position.copy(texasPin.position);
      earthGroup.add(pinGlow);

      const stars = new THREE.BufferGeometry();
      const positions = new Float32Array(900 * 3);
      for (let i = 0; i < 900; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 18;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 2] = -Math.random() * 8;
      }
      stars.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const starField = new THREE.Points(
        stars,
        new THREE.PointsMaterial({ color: 0xbfdfff, size: 0.011, transparent: true, opacity: 0.55 })
      );
      scene.add(starField);

      scene.add(new THREE.AmbientLight(0x6dafff, 0.52));
      const key = new THREE.DirectionalLight(0xffffff, 2.5);
      key.position.set(-4, 2.5, 5);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0x42e8ff, 2.2);
      rim.position.set(4, -1, -2);
      scene.add(rim);

      const onResize = () => {
        if (!host) return;
        camera.aspect = host.clientWidth / host.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(host.clientWidth, host.clientHeight);
      };
      window.addEventListener("resize", onResize);

      const animate = () => {
        frame = requestAnimationFrame(animate);
        if (document.hidden) return;
        const scroll = Math.min(window.scrollY / Math.max(window.innerHeight * 1.5, 1), 1);
        earthGroup.rotation.y += prefersReducedMotion ? 0 : 0.0014;
        earthGroup.rotation.x = -0.12 + scroll * 0.18;
        earthGroup.scale.setScalar(1 + scroll * 3.4);
        earthGroup.position.x = scroll * -0.55;
        earthGroup.position.y = scroll * -0.2;
        pinGlow.scale.setScalar(1 + (prefersReducedMotion ? 0 : Math.sin(Date.now() * 0.003) * 0.18));
        starField.rotation.z += prefersReducedMotion ? 0 : 0.00012;
        renderer.render(scene, camera);
      };
      animate();

      cleanup = () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        geometry.dispose();
        material.dispose();
        wire.geometry.dispose();
        (wire.material as { dispose: () => void }).dispose();
        texasPin.geometry.dispose();
        (texasPin.material as { dispose: () => void }).dispose();
        pinGlow.geometry.dispose();
        (pinGlow.material as { dispose: () => void }).dispose();
        stars.dispose();
        (starField.material as { dispose: () => void }).dispose();
        if (renderer.domElement.parentElement) renderer.domElement.parentElement.removeChild(renderer.domElement);
      };
    }

    startTimer = window.setTimeout(() => {
      if (!disposed) run();
    }, 3200);
    return () => {
      disposed = true;
      window.clearTimeout(startTimer);
      cleanup();
    };
  }, []);

  return <div ref={hostRef} aria-hidden className="absolute inset-0 opacity-90" />;
}
