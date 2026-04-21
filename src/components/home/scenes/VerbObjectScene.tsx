"use client";
import { useEffect, useImperativeHandle, useRef, forwardRef } from "react";
import * as THREE from "three";

export type VerbObjectHandle = {
  setBeat: (idx: number, beatProgress: number) => void;
};

const VerbObjectScene = forwardRef<VerbObjectHandle>(function VerbObjectScene(
  _props,
  ref
) {
  const hostRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<VerbObjectHandle | null>(null);

  useImperativeHandle(
    ref,
    () => ({
      setBeat: (idx, p) => handleRef.current?.setBeat(idx, p),
    }),
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
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
    camera.position.set(0, 0, 5);

    scene.add(new THREE.AmbientLight(0xfaf7f2, 0.5));
    const l = new THREE.DirectionalLight(0xc4a882, 1.1);
    l.position.set(3, 4, 3);
    scene.add(l);
    const l2 = new THREE.DirectionalLight(0xb5886a, 0.55);
    l2.position.set(-3, -1, 2);
    scene.add(l2);

    const objects: THREE.Group[] = [];

    // 0 — Lotus (discover)
    const lotus = new THREE.Group();
    for (let ring = 0; ring < 3; ring++) {
      const petals = 6 + ring * 2;
      for (let i = 0; i < petals; i++) {
        const a = (i / petals) * Math.PI * 2;
        const petal = new THREE.Mesh(
          new THREE.ConeGeometry(0.3 - ring * 0.05, 0.9 - ring * 0.15, 4),
          new THREE.MeshStandardMaterial({
            color: new THREE.Color().lerpColors(
              new THREE.Color(0xd6ddd0),
              new THREE.Color(0x7b8d68),
              ring / 3
            ),
            roughness: 0.6,
            flatShading: true,
          })
        );
        petal.position.set(
          Math.cos(a) * (0.4 - ring * 0.1),
          ring * 0.08,
          Math.sin(a) * (0.4 - ring * 0.1)
        );
        petal.rotation.z = Math.sin(a) * 0.7;
        petal.rotation.x = -Math.cos(a) * 0.7;
        lotus.add(petal);
      }
    }
    objects.push(lotus);

    // 1 — Calendar (book)
    const cal = new THREE.Group();
    const calBody = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 1.8, 0.15),
      new THREE.MeshStandardMaterial({ color: 0xfaf7f2, roughness: 0.6 })
    );
    cal.add(calBody);
    const calTop = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.35, 0.18),
      new THREE.MeshStandardMaterial({ color: 0xb5886a, roughness: 0.5 })
    );
    calTop.position.y = 0.72;
    cal.add(calTop);
    for (let x = 0; x < 5; x++)
      for (let y = 0; y < 4; y++) {
        const dot = new THREE.Mesh(
          new THREE.CircleGeometry(0.06, 12),
          new THREE.MeshBasicMaterial({
            color: x === 2 && y === 1 ? 0xb5886a : 0xe8e1d3,
          })
        );
        dot.position.set(-0.55 + x * 0.28, 0.3 - y * 0.28, 0.085);
        cal.add(dot);
      }
    objects.push(cal);

    // 2 — Molecule (source)
    const mol = new THREE.Group();
    const nodes: [number, number, number][] = [
      [0, 0, 0],
      [1, 0.4, 0],
      [-1, 0.3, 0.3],
      [0.4, -0.9, 0.2],
      [-0.5, -0.6, -0.5],
      [1.2, -0.5, -0.3],
    ];
    const sphMat = new THREE.MeshStandardMaterial({
      color: 0xc4a882,
      roughness: 0.3,
      metalness: 0.5,
    });
    for (const n of nodes) {
      const s = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 12), sphMat);
      s.position.set(...n);
      mol.add(s);
    }
    const bondMat = new THREE.MeshBasicMaterial({ color: 0xb5886a });
    const bonds: [number, number][] = [
      [0, 1],
      [0, 2],
      [0, 3],
      [3, 4],
      [1, 5],
      [3, 5],
    ];
    for (const [a, b] of bonds) {
      const va = new THREE.Vector3(...nodes[a]),
        vb = new THREE.Vector3(...nodes[b]);
      const mid = va.clone().add(vb).multiplyScalar(0.5);
      const len = va.distanceTo(vb);
      const bond = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, len),
        bondMat
      );
      bond.position.copy(mid);
      bond.lookAt(vb);
      bond.rotateX(Math.PI / 2);
      mol.add(bond);
    }
    objects.push(mol);

    // 3 — Heart-pulse (track)
    const pulse = new THREE.Group();
    const heart = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.55, 0.2, 80, 12, 2, 3),
      new THREE.MeshStandardMaterial({
        color: 0xb5886a,
        roughness: 0.35,
        metalness: 0.3,
      })
    );
    pulse.add(heart);
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1 + i * 0.15, 0.01, 8, 64),
        new THREE.MeshBasicMaterial({
          color: 0xc4a882,
          transparent: true,
          opacity: 0.3 - i * 0.08,
        })
      );
      ring.rotation.x = Math.PI / 2 + i * 0.3;
      ring.rotation.y = i * 0.4;
      pulse.add(ring);
    }
    objects.push(pulse);

    objects.forEach((o) => {
      o.visible = false;
      scene.add(o);
    });
    objects[0].visible = true;

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

    let active = 0,
      t = 0,
      progress = 0;
    let raf = 0;
    const tick = () => {
      t += 0.01;
      objects.forEach((o) => {
        o.rotation.y = t * 0.5 + progress * Math.PI * 2;
        o.rotation.x = Math.sin(t * 0.3) * 0.15;
        if (o.visible) {
          const s = 1;
          o.scale.x += (s - o.scale.x) * 0.1;
          o.scale.y += (s - o.scale.y) * 0.1;
          o.scale.z += (s - o.scale.z) * 0.1;
        }
      });
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    handleRef.current = {
      setBeat: (idx, beatProgress) => {
        progress = beatProgress || 0;
        if (idx !== active && objects[idx]) {
          objects[active].visible = false;
          active = idx;
          objects[active].visible = true;
          objects[active].scale.set(0.5, 0.5, 0.5);
        }
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

export default VerbObjectScene;
