const readline = require('readline');
const fs = require('fs');
const { Triangle, Circle, Square } = require('./shapes2');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to generate the logo
function generateLogo(text, textColor, shape, shapeColor) {
  let logo = '';

  // Generate the logo based on the selected shape
  switch (shape) {
    case 'circle':
      logo = `<circle cx="150" cy="100" r="50" fill="${shapeColor}" />`;
      break;
    case 'triangle':
      logo = `<polygon points="150, 18 244, 182 56, 182" fill="${shapeColor}" />`;
      break;
    case 'square':
      logo = `<rect x="50" y="50" width="200" height="100" fill="${shapeColor}" />`;
      break;
    default:
      break;
  }

  // Create the SVG markup with the logo and text
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="300" height="200">
    ${logo}
    <text x="150" y="120" font-size="40" text-anchor="middle" fill="${textColor}">${text}</text>
  </svg>`;
  return svg;
}

// Function to start the logo generation
function startLogoGeneration() {
  rl.question('Enter the text for the logo (maximum 3 characters): ', (text) => {
    if (text.length > 3) {
      console.log('\x1b[31mError: Text should be maximum 3 characters.\x1b[0m');
      startLogoGeneration();
      return;
    }

    rl.question('Enter the text color (keyword or hexadecimal number): ', (textColor) => {
      rl.question('Select a shape for the logo (circle, triangle, square): ', (shape) => {
        if (!['circle', 'triangle', 'square'].includes(shape)) {
          console.log('\x1b[31mError: Invalid shape selected.\x1b[0m');
          startLogoGeneration();
          return;
        }

        rl.question('Enter the shape color (keyword or hexadecimal number): ', (shapeColor) => {
          const logo = generateLogo(text, textColor, shape, shapeColor);

          // Save the generated SVG to a file
          const fileName = 'logo.svg';
          fs.writeFile(fileName, logo, (err) => {
            if (err) {
              console.log('\x1b[31mError: Failed to save the SVG file.\x1b[0m');
            } else {
              console.log('\x1b[32mGenerated logo.svg\x1b[0m');
            }

            rl.question('Do you want to generate another logo? (yes/no): ', (answer) => {
              if (answer.toLowerCase() === 'yes') {
                startLogoGeneration();
              } else {
                rl.close();
              }
            });
          });
        });
      });
    });
  });
}

module.exports = { startLogoGeneration };

