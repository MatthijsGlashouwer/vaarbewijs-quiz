'use client';

import React from 'react';
import { Anchor, Sailboat, Navigation, AlertTriangle, Wrench, LifeBuoy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FallbackImageProps {
  category: string;
  alt: string;
  width?: number;
  height?: number;
}

export default function FallbackImage({ category, alt, width = 400, height = 300 }: FallbackImageProps) {
  // Get icon and colors based on category
  const getCategoryStyles = (category: string): { 
    icon: React.ReactNode; 
    className: string;
  } => {
    const styles = {
      "Navigatie en Vaarregels": {
        icon: <Navigation className="h-12 w-12" />,
        className: "bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300",
      },
      "Wetgeving en Verantwoordelijkheden": {
        icon: <Anchor className="h-12 w-12" />,
        className: "bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-300",
      },
      "Veiligheid op het Water": {
        icon: <LifeBuoy className="h-12 w-12" />,
        className: "bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-300",
      },
      "Scheepvaartverkeer": {
        icon: <Sailboat className="h-12 w-12" />,
        className: "bg-purple-100 text-purple-800 dark:bg-purple-950/50 dark:text-purple-300",
      },
      "Techniek en Navigatie": {
        icon: <Wrench className="h-12 w-12" />,
        className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/50 dark:text-yellow-300",
      },
      "Praktijksituaties": {
        icon: <AlertTriangle className="h-12 w-12" />,
        className: "bg-orange-100 text-orange-800 dark:bg-orange-950/50 dark:text-orange-300",
      }
    };
    
    return styles[category as keyof typeof styles] || {
      icon: <Sailboat className="h-12 w-12" />,
      className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
    };
  };
  
  const { icon, className } = getCategoryStyles(category);
  
  return (
    <div 
      className={cn(
        "flex items-center justify-center rounded-xl border overflow-hidden",
        className
      )}
      style={{ width, height }}
    >
      <div className="text-center p-6">
        {icon}
        <p className="font-medium mt-4">{alt}</p>
        <p className="text-sm mt-2 opacity-80">{category}</p>
      </div>
    </div>
  );
} 