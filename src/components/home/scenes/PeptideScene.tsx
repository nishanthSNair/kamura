"use client";
import { useEffect, useImperativeHandle, useRef, forwardRef } from "react";
import * as THREE from "three";

export type PeptideSceneHandle = { setProgress: (p: number) => void };

const PeptideScene = forwardRef<PeptideSceneHandle>(function PeptideScene(
  _props,
  ref
) {
  const hostRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<PeptideSceneHandle | null>(null);

  useImperativeHandle(
    ref,
    () => ({ setProgress: (p) => handleRef.current?.setProgress(p) }),
    []
  );

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    host.appendChild(canvas);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 50);
    camera.position.set(0, 0, 8);
    scene.add(new THREE.AmbientLight(0xfaf7f2, 0.4));
    const l = new THREE.DirectionalLight(0xc4a882, 1.2);
    l.position.set(2, 3, 4);
    scene.add(l);
    const l2 = new THREE.DirectionalLight(0xb5886a, 0.5);
    l2.position.set(-3, -1, 2);
    scene.add(l2);

    const N = 12;
    const beads: THREE.Mesh[] = [];
    const bonds: THREE.Mesh[] = [];
    const chain = new THREE.Group();

    for (let i = 0; i < N; i++) {
      const bead = new THREE.Mesh(
        new THREE.SphereGeometry(0.26, 24, 18),
        new THREE.MeshStandardMaterial({
          color: i % 2 ? 0xc4a882 : 0xb5886a,
          roughness: 0.28,
          metalness: 0.4,
        })
      );
      const angle = (i - N / 2) * 0.35;
      (bead.userData as { target: THREE.Vector3 }).target = new THREE.Vector3(
        Math.sin(angle) * 3.0,
        Math.sin(i * 0.8) * 0.6,
        Math.cos(angle * 0.5) * 0.4
      );
      bead.position
        .copy((bead.userData as { target: THREE.Vector3 }).target)
        .multiplyScalar(1.5)
        .setY(-6);
      bead.scale.setScalar(0);
      chain.add(bead);
      beads.push(bead);

      if (i > 0) {
        const bond = new THREE.Mesh(
          new THREE.CylinderGeometry(0.05, 0.05, 1),
          new THREE.MeshBasicMaterial({ color: 0xc4a882, transparent: true, opacity: 0.7 })
        );
        bond.scale.setScalar(0);
        chain.add(bond);
        bonds.push(bond);
      }
    }
    scene.add(chain);

    const resize = () => {
      const w = host.clientWidth,
        h = host.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    let raf = 0,
      t = 0,
      progress = 0;

    const tick = () => {
      t += 0.008;
      chain.rotation.y = Math.sin(t * 0.3) * 0.35;
      chain.rotation.x = Math.sin(t * 0.2) * 0.12;

      for (let i = 0; i < N; i++) {
        const threshold = i / N;
        const reveal = Math.max(0, Math.min(1, (progress - threshold) * 2.5));
        const bead = beads[i];
        bead.scale.setScalar(reveal);
        bead.position.lerp(
          (bead.userData as { target: THREE.Vector3 }).target,
          0.1
        );
      }
      for (let i = 0; i < bonds.length; i++) {
        const threshold = (i + 0.5) / N;
        const reveal = Math.max(0, Math.min(1, (progress - threshold) * 2.5));
        const bond = bonds[i];
        const a = beads[i].position,
          b = beads[i + 1].position;
        const mid = a.clone().add(b).multiplyScalar(0.5);
        const len = a.distanceTo(b);
        bond.position.copy(mid);
        bond.lookAt(b);
        bond.rotateX(Math.PI / 2);
        bond.scale.set(reveal, len, reveal);
        (bond.material as THREE.MeshBasicMaterial).opacity = 0.7 * reveal;
      }
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    handleRef.current = {
      setProgress: (p) => {
        progress = Math.max(0, Math.min(1, p));
      },
    };

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.dispose();
      canvas.remove();
    };
  }, []);

  return <div ref={hostRef} className="absolute inset-0" />;
});

export default PeptideScene;
