const sharp = require('sharp');
const inputPath = 'C:\\Users\\lohji\\.gemini\\antigravity\\brain\\e7e14070-0c82-46a2-9d6a-062ef4d59df6\\prasasti candi dieng.webp';
const outputPath = 'c:\\Users\\lohji\\.gemini\\antigravity\\scratch\\epigrap\\src\\assets\\pariwisata_prasasti_dieng.webp';

async function processImage() {
  try {
    const metadata = await sharp(inputPath).metadata();
    const cropTop = Math.floor(metadata.height * 0.20); // Crop 20% from top
    const cropHeight = metadata.height - cropTop;

    const croppedBuffer = await sharp(inputPath)
      .extract({ left: 0, top: cropTop, width: metadata.width, height: cropHeight })
      .toBuffer();

    // Create blurred background
    const background = await sharp(croppedBuffer)
      .resize(600, 400, { fit: 'cover' })
      .blur(20)
      .modulate({ brightness: 0.5 }) // darken it
      .toBuffer();
      
    // Resize foreground to leave padding (canvas kosong) at the top/bottom and sides
    const foreground = await sharp(croppedBuffer)
      .resize(520, 360, { fit: 'inside' }) // leaves at least 20px padding on top and bottom
      .toBuffer();
      
    await sharp(background)
      .composite([{ input: foreground, gravity: 'center' }])
      .webp({ quality: 90 })
      .toFile(outputPath);
      
    console.log('Saved successfully to ' + outputPath);
  } catch (err) {
    console.error('Error processing:', err);
  }
}

processImage();
