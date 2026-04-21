"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = { onHover?: (idx: number) => void };

export default function GlobeScene({ onHover }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const onHoverRef = useRef(onHover);
  onHoverRef.current = onHover;

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
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
    camera.position.set(0, 0, 7);
    scene.add(new THREE.AmbientLight(0xfaf7f2, 0.35));
    const keyL = new THREE.DirectionalLight(0xc4a882, 1.2);
    keyL.position.set(3, 3, 4);
    scene.add(keyL);
    const rim = new THREE.DirectionalLight(0xb5886a, 0.7);
    rim.position.set(-4, -2, -2);
    scene.add(rim);

    // Glass forest-tinted sphere (no oxblood)
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(2.1, 64, 48),
      new THREE.MeshPhysicalMaterial({
        color: 0x1e2a1e,
        roughness: 0.15,
        metalness: 0.0,
        transmission: 0.85,
        thickness: 0.6,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        transparent: true,
        opacity: 0.85,
      })
    );
    scene.add(sphere);

    const wire = new THREE.Mesh(
      new THREE.SphereGeometry(2.11, 24, 18),
      new THREE.MeshBasicMaterial({
        color: 0xc4a882,
        wireframe: true,
        transparent: true,
        opacity: 0.12,
      })
    );
    scene.add(wire);

    const cities = [
      { name: "Dubai", lat: 25.2, lon: 55.27 },
      { name: "Abu Dhabi", lat: 24.47, lon: 54.37 },
      { name: "Sharjah", lat: 25.35, lon: 55.41 },
      { name: "Al Ain", lat: 24.19, lon: 55.76 },
      { name: "Ajman", lat: 25.41, lon: 55.43 },
    ];
    const latLonToXYZ = (lat: number, lon: number, r: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return [
        -r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta),
      ] as const;
    };
    const dots: THREE.Mesh[] = [];
    const glowProto = new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 16, 12),
      new THREE.MeshBasicMaterial({
        color: 0xc4a882,
        transparent: true,
        opacity: 0.35,
      })
    );
    cities.forEach((c, i) => {
      const [x, y, z] = latLonToXYZ(c.lat, c.lon, 2.12);
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 12, 8),
        new THREE.MeshBasicMaterial({ color: 0xc4a882 })
      );
      dot.position.set(x, y, z);
      dot.userData = { index: i };
      sphere.add(dot);
      const halo = glowProto.clone();
      halo.material = (glowProto.material as THREE.MeshBasicMaterial).clone();
      halo.position.set(x, y, z);
      sphere.add(halo);
      (dot.userData as { halo: THREE.Mesh }).halo = halo;
      dots.push(dot);
    });

    for (let i = 0; i < dots.length - 1; i++) {
      const a = dots[i].position.clone();
      const b = dots[i + 1].position.clone();
      const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(2.7);
      const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
      const arc = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 24, 0.008, 6, false),
        new THREE.MeshBasicMaterial({
          color: 0xc4a882,
          transparent: true,
          opacity: 0.4,
        })
      );
      sphere.add(arc);
    }

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

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let hovered = -1;
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    canvas.addEventListener("pointermove", onPointerMove);
    const onPointerLeave = () => {
      hovered = -1;
      onHoverRef.current?.(-1);
    };
    canvas.addEventListener("pointerleave", onPointerLeave);

    let auto = 0;
    const autoTimer = setInterval(() => {
      auto = (auto + 1) % dots.length;
      if (hovered === -1) onHoverRef.current?.(auto);
    }, 2800);

    let raf = 0,
      t = 0;
    const tick = () => {
      t += 0.004;
      sphere.rotation.y = t;
      wire.rotation.y = -t * 0.8;

      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(dots, false);
      const newHover = hits[0]
        ? (hits[0].object.userData as { index: number }).index
        : -1;
      if (newHover !== hovered) {
        hovered = newHover;
        onHoverRef.current?.(hovered === -1 ? auto : hovered);
      }

      dots.forEach((d, i) => {
        const on = hovered === i;
        const s = on ? 1.8 : 1 + Math.sin(t * 4 + i) * 0.15;
        d.scale.setScalar(s);
        const halo = (d.userData as { halo: THREE.Mesh }).halo;
        halo.scale.setScalar(1 + Math.sin(t * 3 + i * 0.7) * 0.4 + (on ? 1.5 : 0));
        (halo.material as THREE.MeshBasicMaterial).opacity = 0.35 + (on ? 0.3 : 0);
      });

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(autoTimer);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      ro.disconnect();
      renderer.dispose();
      canvas.remove();
    };
  }, []);

  return <div ref={hostRef} className="absolute inset-0" />;
}
