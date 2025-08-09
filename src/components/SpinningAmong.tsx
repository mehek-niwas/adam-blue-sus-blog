import React, { useState, useRef, useEffect } from 'react';
import amongUsBlue from '@/assets/amongus-blue.png';
import among from '@/assets/among.png';

interface SpinningAmongProps {
  className?: string;
  variant?: 'blue' | 'regular';
  size?: 'sm' | 'md' | 'lg';
}

export const SpinningAmong: React.FC<SpinningAmongProps> = ({ 
  className = '', 
  variant = 'regular',
  size = 'md'
}) => {
  const [isNearMouse, setIsNearMouse] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const imageSrc = variant === 'blue' ? amongUsBlue : among;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imgRef.current) return;

      const rect = imgRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      );
      
      // Trigger spin when mouse is within 150px of the image
      const threshold = 150;
      setIsNearMouse(distance < threshold);
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const glowColor = variant === 'blue' 
    ? 'rgba(59, 130, 246, 0.5)' 
    : 'rgba(34, 197, 94, 0.5)';

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={`Among Us ${variant === 'blue' ? 'Blue' : 'Regular'} Character`}
      className={`
        ${sizeClasses[size]}
        transition-transform duration-500 ease-in-out
        ${isNearMouse ? 'animate-spin' : ''}
        hover:scale-110
        cursor-pointer
        ${className}
      `}
      style={{
        filter: isNearMouse ? `drop-shadow(0 0 10px ${glowColor})` : 'none',
      }}
    />
  );
};
