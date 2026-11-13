/**
 * Three.js 3D Interactive Hero Experience
 * Aslam Rashid Shaikh - Portfolio
 */

(function () {
  "use strict";

  const container = document.getElementById("hero-3d-canvas-container");
  if (!container) return;

  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // WebGL Availability check
  function isWebGLAvailable() {
    try {
      const canvas = document.createElement("canvas");
      return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
    } catch (e) {
      return false;
    }
  }

  if (!isWebGLAvailable() || typeof THREE === "undefined") {
    console.info("WebGL or Three.js not active, falling back to CSS background effect.");
    container.classList.add("webgl-fallback");
    return;
  }

  // Scene setup
  let scene, camera, renderer, animationFrameId;
  let mainGroup, particleSystem, linesMesh;
  let floatingMeshes = [];
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;
  let isHeroVisible = true;

  const width = container.clientWidth || window.innerWidth;
  const height = container.clientHeight || window.innerHeight;

  try {
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050816, 0.035);

    camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.z = 18;
    camera.position.y = 0;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Dynamic Lighting
    const ambientLight = new THREE.AmbientLight(0x0d1b3e, 2.5);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00f2fe, 3.5, 50);
    cyanLight.position.set(12, 10, 10);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0x8b5cf6, 3.0, 50);
    violetLight.position.set(-12, -8, 8);
    scene.add(violetLight);

    const blueLight = new THREE.PointLight(0x3b82f6, 2.5, 40);
    blueLight.position.set(0, 12, -5);
    scene.add(blueLight);

    // Central 3D Tech Core
    const coreGroup = new THREE.Group();
    mainGroup.add(coreGroup);

    // 1. Outer Wireframe Icosahedron
    const outerGeo = new THREE.IcosahedronGeometry(4.2, 1);
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.35,
      transparent: true,
      opacity: 0.75
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    coreGroup.add(outerMesh);

    // 2. Inner Glowing Torus Knot
    const knotGeo = new THREE.TorusKnotGeometry(2.0, 0.45, 120, 24);
    const knotMat = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      roughness: 0.15,
      metalness: 0.85,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.45,
      wireframe: false
    });
    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    coreGroup.add(knotMesh);

    // 3. Inner Glass Octahedron
    const octGeo = new THREE.OctahedronGeometry(1.4, 0);
    const octMat = new THREE.MeshStandardMaterial({
      color: 0xc084fc,
      emissive: 0x9333ea,
      emissiveIntensity: 0.6,
      roughness: 0.1,
      metalness: 0.9,
      wireframe: true
    });
    const octMesh = new THREE.Mesh(octGeo, octMat);
    coreGroup.add(octMesh);

    // Position the 3D core slightly to the right on desktop, centered on mobile
    function updateCorePosition() {
      if (window.innerWidth >= 1024) {
        coreGroup.position.set(5.5, 0.2, 0);
        coreGroup.scale.set(1.0, 1.0, 1.0);
      } else if (window.innerWidth >= 768) {
        coreGroup.position.set(3.0, -1.0, -2);
        coreGroup.scale.set(0.85, 0.85, 0.85);
      } else {
        coreGroup.position.set(0, -2.5, -4);
        coreGroup.scale.set(0.65, 0.65, 0.65);
      }
    }
    updateCorePosition();

    // Orbiting Floating Tech Shapes
    const orbitGeometries = [
      new THREE.TetrahedronGeometry(0.8, 0),
      new THREE.BoxGeometry(0.9, 0.9, 0.9),
      new THREE.DodecahedronGeometry(0.7, 0),
      new THREE.IcosahedronGeometry(0.7, 0)
    ];

    const orbitColors = [0x38bdf8, 0xa855f7, 0x3b82f6, 0x06b6d4];

    for (let i = 0; i < 7; i++) {
      const geo = orbitGeometries[i % orbitGeometries.length];
      const mat = new THREE.MeshStandardMaterial({
        color: orbitColors[i % orbitColors.length],
        wireframe: true,
        emissive: orbitColors[i % orbitColors.length],
        emissiveIntensity: 0.4,
        roughness: 0.3,
        metalness: 0.8
      });
      const mesh = new THREE.Mesh(geo, mat);
      
      const angle = (i / 7) * Math.PI * 2;
      const radius = 6.5 + (i % 3) * 1.5;
      mesh.position.set(
        Math.cos(angle) * radius + coreGroup.position.x,
        Math.sin(angle) * (radius * 0.6) + (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 6
      );

      mesh.userData = {
        orbitAngle: angle,
        orbitRadius: radius,
        speed: 0.003 + (i % 3) * 0.002,
        rotSpeedX: 0.01 + Math.random() * 0.015,
        rotSpeedY: 0.01 + Math.random() * 0.015,
        verticalPhase: Math.random() * Math.PI * 2
      };

      mainGroup.add(mesh);
      floatingMeshes.push(mesh);
    }

    // Particle Cloud System (600 glowing particles)
    const particleCount = window.innerWidth < 768 ? 250 : 550;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0x38bdf8); // Cyan
    const c2 = new THREE.Color(0x818cf8); // Indigo
    const c3 = new THREE.Color(0xa855f7); // Purple

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 45;
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 35;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 30;

      const mixedColor = i % 3 === 0 ? c1 : i % 3 === 1 ? c2 : c3;
      particleColors[i * 3] = mixedColor.r;
      particleColors[i * 3 + 1] = mixedColor.g;
      particleColors[i * 3 + 2] = mixedColor.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    // Particle Material with Soft Circular Point Texture
    function createPointTexture() {
      const cv = document.createElement("canvas");
      cv.width = 64;
      cv.height = 64;
      const ctx = cv.getContext("2d");
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.3, "rgba(100,200,255,0.8)");
      grad.addColorStop(0.7, "rgba(50,100,255,0.2)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(cv);
    }

    const particleMat = new THREE.PointsMaterial({
      size: 0.45,
      map: createPointTexture(),
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Mouse Interaction
    function onPointerMove(e) {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      targetX = (e.clientX - halfW) / halfW;
      targetY = (e.clientY - halfH) / halfH;
    }
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    // Handle Resize
    function onWindowResize() {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      updateCorePosition();
    }
    window.addEventListener("resize", onWindowResize);

    // Intersection Observer to pause rendering when hero is off-screen
    const heroSection = document.getElementById("hero");
    if (heroSection && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            isHeroVisible = entry.isIntersecting;
            if (isHeroVisible && !animationFrameId) {
              animate();
            }
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(heroSection);
    }

    // Animation Loop
    let clock = new THREE.Clock();

    function animate() {
      if (!isHeroVisible) {
        animationFrameId = null;
        return;
      }

      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth mouse parallax lerp
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      if (!prefersReducedMotion) {
        // Continuous rotation of the core
        outerMesh.rotation.x += 0.003;
        outerMesh.rotation.y += 0.005;

        knotMesh.rotation.x -= 0.006;
        knotMesh.rotation.y += 0.008;

        octMesh.rotation.y -= 0.01;
        octMesh.rotation.z += 0.007;

        // Subtle vertical floating breath
        coreGroup.position.y += Math.sin(elapsed * 1.5) * 0.004;

        // Animate floating secondary shapes
        floatingMeshes.forEach((mesh, idx) => {
          mesh.userData.orbitAngle += mesh.userData.speed;
          mesh.rotation.x += mesh.userData.rotSpeedX;
          mesh.rotation.y += mesh.userData.rotSpeedY;

          const r = mesh.userData.orbitRadius;
          mesh.position.x = Math.cos(mesh.userData.orbitAngle) * r + coreGroup.position.x;
          mesh.position.y = Math.sin(mesh.userData.orbitAngle) * (r * 0.5) + Math.sin(elapsed + mesh.userData.verticalPhase) * 1.2;
        });

        // Rotate particle cloud slowly
        particleSystem.rotation.y = elapsed * 0.02;
        particleSystem.rotation.x = elapsed * 0.01;
      }

      // Parallax response
      mainGroup.rotation.y = mouseX * 0.28;
      mainGroup.rotation.x = -mouseY * 0.2;
      camera.position.x = mouseX * 1.2;
      camera.position.y = -mouseY * 0.9;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }

    animate();
  } catch (err) {
    console.error("Three.js setup encountered an issue:", err);
    container.classList.add("webgl-fallback");
  }
})();

