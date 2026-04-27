const fs = require('fs');
const path = '/home/node/.openclaw/openclaw.json';

const config = JSON.parse(fs.readFileSync(path, 'utf8'));

// Configure media output paths
if (!config.media) config.media = {};
config.media.preserveFilenames = true;
config.media.outputDir = {
  images: '/media/images',
  videos: '/media/videos'
};

// Ensure proper image size limits
if (!config.agents) config.agents = {};
if (!config.agents.defaults) config.agents.defaults = {};
config.agents.defaults.imageMaxDimensionPx = 4096;

config.meta.lastTouchedAt = new Date().toISOString();

fs.writeFileSync(path, JSON.stringify(config, null, 2));

console.log('✅ Media paths configured:');
console.log('   Images: /media/images → H:/Project Pictures');
console.log('   Videos: /media/videos → H:/Videos');
console.log('   Image max dimension: 4096px');
