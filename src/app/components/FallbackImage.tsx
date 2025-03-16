'use client';

interface FallbackImageProps {
  category: string;
  alt: string;
  width?: number;
  height?: number;
}

export default function FallbackImage({ category, alt, width = 400, height = 300 }: FallbackImageProps) {
  // Generate a color based on the category for visual distinction
  const getCategoryColor = (category: string) => {
    const colors = {
      "Navigatie en Vaarregels": "bg-blue-100 text-blue-800",
      "Wetgeving en Verantwoordelijkheden": "bg-green-100 text-green-800",
      "Veiligheid op het Water": "bg-red-100 text-red-800",
      "Scheepvaartverkeer": "bg-purple-100 text-purple-800",
      "Techniek en Navigatie": "bg-yellow-100 text-yellow-800",
      "Praktijksituaties": "bg-orange-100 text-orange-800"
    };
    
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };
  
  return (
    <div 
      className={`flex items-center justify-center ${getCategoryColor(category)} rounded-md overflow-hidden`} 
      style={{ width, height }}
    >
      <div className="text-center p-4">
        <div className="text-3xl mb-2">🚢</div>
        <p className="font-medium">{alt}</p>
        <p className="text-sm mt-2 opacity-80">{category}</p>
      </div>
    </div>
  );
} 