const fs = require('fs');
const path = '/home/node/.openclaw/openclaw.json';

const config = JSON.parse(fs.readFileSync(path, 'utf8'));

if (!config.agents) config.agents = {};
if (!config.agents.defaults) config.agents.defaults = {};

config.agents.defaults.imageGenerationModel = {
  primary: 'openrouter/bytedance-seed/seedream-4.5',
  timeoutMs: 180000,
  fallbacks: [
    'openrouter/google/gemini-3.1-flash-image-preview',
    'google/gemini-3.1-flash-image-preview'
  ]
};

config.meta.lastTouchedAt = new Date().toISOString();

fs.writeFileSync(path, JSON.stringify(config, null, 2));

console.log('✅ Image generation configured:');
console.log('   Primary: Seedream 4.5 (OpenRouter)');
console.log('   Fallback 1: Gemini 3.1 Flash (OpenRouter)');
console.log('   Fallback 2: Gemini 3.1 Flash (Direct)');
console.log('   Timeout: 180 seconds');
