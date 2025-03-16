// This file is just to demonstrate how we could generate SVG placeholders
// It's not actually needed for the application to work

const fs = require('fs');
const path = require('path');

const createPlaceholder = (name, text, color, bgColor) => {
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
    <rect width="400" height="300" fill="${bgColor}" />
    <text x="50%" y="50%" font-family="Arial" font-size="20" fill="${color}" text-anchor="middle">${text}</text>
  </svg>`;
  
  fs.writeFileSync(path.join(__dirname, `${name}.svg`), svgContent);
};

// Create some placeholders
createPlaceholder('hoofdvaarweg', 'Kruising van hoofdvaarweg met nevenvaarweg', '#fff', '#3b82f6');
createPlaceholder('doorvaart-verboden', 'Rood licht bij een brug', '#fff', '#ef4444');
createPlaceholder('blauw-bord', 'Blauw bord met wit knipperlicht op een schip', '#fff', '#3b82f6');
createPlaceholder('gele-ruit', 'Gele ruit op een brug', '#000', '#facc15');
createPlaceholder('groene-lichten', 'Twee groene lichten bij een brug', '#fff', '#22c55e');
createPlaceholder('rood-wit-rood', 'Rood-wit-rood bord', '#000', '#ef4444');

console.log('Placeholder SVGs created in the images directory'); 