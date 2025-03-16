'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import FallbackImage from './FallbackImage';

interface AnimationConfig {
  type: 'vessel-movement' | 'signal-flash' | 'water-flow' | 'path-trace' | 'none';
  duration?: number; // in seconds
  loop?: boolean;
  delay?: number; // in seconds
}

interface AnimatedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  animation?: AnimationConfig;
  category: string;
}

export default function AnimatedImage({ 
  src, 
  alt, 
  width = 400, 
  height = 300, 
  animation = { type: 'none' },
  category
}: AnimatedImageProps) {
  const [imageError, setImageError] = useState(false);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [animationActive, setAnimationActive] = useState(true);
  
  // Fetch and load SVG content for animations
  useEffect(() => {
    if (src.endsWith('.svg')) {
      fetch(src)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to load SVG');
          }
          return response.text();
        })
        .then(svgText => {
          setSvgContent(svgText);
        })
        .catch(error => {
          console.error('Error loading SVG:', error);
          setImageError(true);
        });
    }
  }, [src]);

  // Apply animations to the SVG content
  useEffect(() => {
    if (!svgContent || !svgContainerRef.current || animation.type === 'none') {
      return;
    }

    // Insert the SVG content into the container
    svgContainerRef.current.innerHTML = svgContent;
    
    // Get all elements that need animation
    const svgElement = svgContainerRef.current.querySelector('svg');
    if (!svgElement) return;

    // Apply animations based on the type
    switch (animation.type) {
      case 'vessel-movement':
        applyVesselMovementAnimation(svgElement, animation);
        break;
      case 'signal-flash':
        applySignalFlashAnimation(svgElement, animation);
        break;
      case 'water-flow':
        applyWaterFlowAnimation(svgElement, animation);
        break;
      case 'path-trace':
        applyPathTraceAnimation(svgElement, animation);
        break;
    }

  }, [svgContent, animation, animationActive]);

  // Animation handlers
  const applyVesselMovementAnimation = (svg: SVGElement, config: AnimationConfig) => {
    const vessels = svg.querySelectorAll('.vessel, .ship');
    vessels.forEach(vessel => {
      const animateElement = document.createElementNS('http://www.w3.org/2000/svg', 'animateTransform');
      animateElement.setAttribute('attributeName', 'transform');
      animateElement.setAttribute('type', 'translate');
      animateElement.setAttribute('from', '0 0');
      animateElement.setAttribute('to', '50 0');
      animateElement.setAttribute('dur', `${config.duration || 5}s`);
      animateElement.setAttribute('repeatCount', config.loop ? 'indefinite' : '1');
      animateElement.setAttribute('begin', `${config.delay || 0}s`);
      vessel.appendChild(animateElement);
    });
  };

  const applySignalFlashAnimation = (svg: SVGElement, config: AnimationConfig) => {
    const signals = svg.querySelectorAll('.signal, .light');
    signals.forEach(signal => {
      const animateElement = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      animateElement.setAttribute('attributeName', 'opacity');
      animateElement.setAttribute('values', '1;0.3;1');
      animateElement.setAttribute('dur', `${config.duration || 2}s`);
      animateElement.setAttribute('repeatCount', config.loop ? 'indefinite' : '1');
      signal.appendChild(animateElement);
    });
  };

  const applyWaterFlowAnimation = (svg: SVGElement, config: AnimationConfig) => {
    const waterElements = svg.querySelectorAll('.water, .wave');
    
    // Create a pattern for water if it doesn't exist
    let defsElement = svg.querySelector('defs');
    if (!defsElement) {
      defsElement = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      svg.appendChild(defsElement);
    }
    
    waterElements.forEach(water => {
      // Apply subtle wave animation
      const animateElement = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      animateElement.setAttribute('attributeName', 'transform');
      animateElement.setAttribute('type', 'translate');
      animateElement.setAttribute('values', '0 0; 5 2; 0 0');
      animateElement.setAttribute('dur', `${config.duration || 3}s`);
      animateElement.setAttribute('repeatCount', 'indefinite');
      water.appendChild(animateElement);
    });
  };

  const applyPathTraceAnimation = (svg: SVGElement, config: AnimationConfig) => {
    const paths = svg.querySelectorAll('path:not(.water):not(.wave):not(.vessel)');
    paths.forEach(path => {
      // Get the path length
      const pathLength = (path as SVGPathElement).getTotalLength();
      
      // Set initial properties
      path.setAttribute('stroke-dasharray', pathLength.toString());
      path.setAttribute('stroke-dashoffset', pathLength.toString());
      
      // Animate the dash offset
      const animateElement = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      animateElement.setAttribute('attributeName', 'stroke-dashoffset');
      animateElement.setAttribute('from', pathLength.toString());
      animateElement.setAttribute('to', '0');
      animateElement.setAttribute('dur', `${config.duration || 3}s`);
      animateElement.setAttribute('begin', `${config.delay || 0}s`);
      animateElement.setAttribute('fill', 'freeze');
      animateElement.setAttribute('repeatCount', config.loop ? 'indefinite' : '1');
      path.appendChild(animateElement);
    });
  };

  // Toggle animation state
  const toggleAnimation = () => {
    setAnimationActive(!animationActive);
  };

  // If using a regular image or if SVG loading failed
  if (imageError || !src.endsWith('.svg')) {
    return (
      <div className="relative rounded-lg overflow-hidden shadow-md">
        {!imageError ? (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <FallbackImage 
            category={category}
            alt={alt}
            width={width}
            height={height}
          />
        )}
      </div>
    );
  }

  // For SVG content with animations
  return (
    <div className="relative rounded-lg overflow-hidden shadow-md">
      <div 
        ref={svgContainerRef} 
        style={{ width, height }}
        className="svg-container"
      />
      
      {animation.type !== 'none' && (
        <button
          onClick={toggleAnimation}
          className="absolute bottom-2 right-2 bg-white/80 hover:bg-white text-gray-800 p-1 rounded-full shadow-sm"
          title={animationActive ? "Animatie pauzeren" : "Animatie afspelen"}
        >
          {animationActive ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
} 