import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from '../css/Home.module.css';
import { useNavigate } from 'react-router-dom';
import { Navbar, Footer, DiscountedProducts, FAQButton } from '../components';

function Home() {
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/product');
  };

  useEffect(() => {
    let scene, camera, renderer, sphere, ricev;
    window.scrollTo(0, 0);
    const initThree = () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
      renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
      renderer.setSize(window.innerWidth - 15, window.innerHeight);

      const maxCanvasWidth = window.innerWidth;
      const maxCanvasHeight = window.innerHeight;

      const vertexShader = `
      varying vec3 vNormal;
          
      void main() {
        vNormal = normal;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
      `;

      const fragmentShader = `
    varying vec3 vNormal;
    uniform float time; // Time uniform for animation
        
    void main() {
      // Base colors for the gradient
      vec3 color1 = vec3(0.15, 0.5, 0.85); // Light blue
      vec3 color2 = vec3(0.05, 0.2, 0.4); // Dark blue
        
      // Calculate the noise value based on position and time
      float noise = 0.5 + 0.5 * sin(time * 2.0 + gl_FragCoord.x * 0.01 + gl_FragCoord.y * 0.01);
        
      // Smooth the normal length for edge detection
      float edgeFactor = fwidth(length(vNormal)) * 1.5;
      float alpha = smoothstep(0.0, edgeFactor, 1.0 - length(vNormal));
        
      // Interpolate between color1 and color2 based on noise and alpha
      vec3 gradientColor = mix(color1, color2, noise);
      vec3 finalColor = mix(vec3(0.5), gradientColor, alpha);
        
      gl_FragColor = vec4(finalColor, 1.0);
    }
    `;
      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        side: THREE.DoubleSide,
        wireframe: true,
        wireframeLinewidth: 1,
      });

      const geometry = new THREE.SphereGeometry(0.9, 32, 16);
      sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(1, 0.5, 1.5);
      scene.add(sphere);

      const geometry2 = new THREE.IcosahedronGeometry(1.6, 1);
      ricev = new THREE.Mesh(geometry2, material);
      ricev.position.set(-1.6, -0.9, -0.4);
      scene.add(ricev);

      camera.position.z = 2.5;

      const animate = () => {
        requestAnimationFrame(animate);

        sphere.rotation.x += 0.002;
        sphere.rotation.y += 0.002;
        ricev.rotation.x -= 0.002;
        ricev.rotation.y -= 0.002;

        renderer.render(scene, camera);
      };

      animate();

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        if (renderer.domElement.width > maxCanvasWidth) {
          renderer.setSize(maxCanvasWidth, renderer.domElement.height);
        }
        if (renderer.domElement.height > maxCanvasHeight) {
          renderer.setSize(renderer.domElement.width, maxCanvasHeight);
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    };

    initThree();

    return () => {
      if (renderer) {
        renderer.dispose();
      }
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.canvasContainer}>
        <canvas ref={canvasRef} className="webgl" />
      </div>

      <div className={`${styles.container} mx-3`}>
        <div className={`${styles.content}`}>
          <div className={`${styles.textContainer}`}>
            <h1 className="card-title fs-1 text-black fw-bold mb-3">Welcome to T.rust Shop</h1>
            <p className="card-text fs-5 text-black w-100">
              Discover the latest gadgets and accessories from top brands like Apple, Samsung, Xiaomi, Huawei, and Dell.
            </p>
            <button className="btn btn-dark mt-3" onClick={handleSubmit}>Shop Now</button>
          </div>
          <div className={`${styles.imageContainer}`}>
            <img
              className={`${styles.cardImg} img-fluid`}
              src="./assets/bghome.png"
              alt="Trust Gadget Shop"
            />
          </div>
        </div>
      </div>

      <DiscountedProducts />
      <FAQButton />
      <Footer />
    </>
  );
}

export default Home;
