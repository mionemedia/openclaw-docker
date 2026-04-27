# OpenClaw Media Generation Setup

**Status:** Image Generation ✅ Working | Video Generation ⏸️ Blocked by Bug  
**Last Updated:** April 27, 2026

---

## Quick Start

### Generate Images
```
Generate a [description]. Save to generated-images/my-image.png
```
**Examples:**
- "Generate a fantasy book cover with magical energy. Save to generated-images/book-cover.png"
- "Generate a red circle on white background. Save to generated-images/test.png"

### Generate Videos (After OpenClaw Update)
```
Generate a [duration] video: [description]. Save to generated-videos/my-video.mp4
```
**Note:** Video generation currently blocked by OpenClaw v2026.4.21 async bug. Will work in v2026.4.25+

---

## Configuration Details

### Image Generation ✅ WORKING

**Model:** Google Gemini 3.1 Flash Image Preview  
**Provider:** Google AI (via Gemini API)  
**Cost:** Free within usage limits  
**Quality:** Up to 4K resolution (4096px max)  
**Features:**
- Text-to-image generation
- Multi-image editing (up to 5 reference images)
- Subject detail preservation
- Clear text rendering

**Backup Model:** OpenAI GPT Image 2 (DALL-E 3)
- Cost: $0.04-0.12 per image
- Available as fallback

### Video Generation ⏸️ CONFIGURED (BLOCKED BY BUG)

**Primary Model:** Seedance 2.0 (ByteDance via OpenRouter)  
**Fallback Model:** Veo 3.1 Fast (Google Gemini)  
**Status:** Configuration verified, task submission working  
**Issue:** OpenClaw v2026.4.21 has async completion callback bug  
**Fix:** Upgrade to OpenClaw v2026.4.25+ (stable)

**Error in logs:**
```
scope upgrade pending approval
Media generation completion wake failed
```

---

## File Paths

### Windows Directories
- **Images:** `H:\Project Pictures`
- **Videos:** `H:\Videos`

### Container Paths
- **Images:** `/media/images` → `H:\Project Pictures`
- **Videos:** `/media/videos` → `H:\Videos`

### Workspace Shortcuts (Symbolic Links)
- **Images:** `workspace/generated-images/` → `/media/images`
- **Videos:** `workspace/generated-videos/` → `/media/videos`

---

## Docker Configuration

### Volume Mounts (`docker-compose.yml`)
```yaml
volumes:
  - openclaw-data:/home/node/.openclaw
  - ./workspace:/home/node/.openclaw/workspace
  - "H:/Documents/Papi projects:/obsidian-vault:ro"
  - "H:/Project Pictures:/media/images"
  - "H:/Videos:/media/videos"
  - /var/run/docker.sock:/var/run/docker.sock
```

### Environment Variables
```yaml
environment:
  OPENCLAW_VIDEO_GENERATION_MODEL_PRIMARY: "openrouter/bytedance/seedance-2.0"
  OPENCLAW_VIDEO_GENERATION_MODEL_FALLBACKS: "google/veo-3.1-fast-generate-preview"
```

### OpenClaw Config (`/home/node/.openclaw/openclaw.json`)
```json
{
  "agents": {
    "defaults": {
      "imageMaxDimensionPx": 4096
    }
  },
  "media": {
    "preserveFilenames": true
  }
}
```

---

## Authentication

### API Keys Required
- **GEMINI_API_KEY** - For image generation (Gemini 3.1 Flash)
- **OPENROUTER_API_KEY** - For video generation (Seedance 2.0) and chat models
- **OPENAI_API_KEY** - For image fallback (DALL-E 3)

### OpenClaw Gateway Access
- **URL:** http://localhost:18789
- **Token:** Get from `.env` file (see Setup section)
- **Full URL:** http://localhost:18789/?token=YOUR_TOKEN_HERE

---

## Troubleshooting

### Images Not Displaying in Browser

**Symptom:** Images generate but don't show in OpenClaw UI  
**Cause:** Browser cache blocking display  

**Solutions:**
1. **Hard Refresh:** Press `Ctrl + Shift + R`
2. **Clear Cache:** 
   - Press `F12` → Application tab → Clear site data
3. **Use Incognito Mode:** `Ctrl + Shift + N`
4. **Check Extensions:** Disable ad blockers for localhost

**Files still save correctly to `H:\Project Pictures` even if not displayed!**

### Video Generation Not Completing

**Symptom:** Video task starts but never finishes  
**Cause:** OpenClaw v2026.4.21 async completion callback bug  

**Log Evidence:**
```
scope upgrade pending approval
Media generation completion wake failed
```

**Solution:** Wait for OpenClaw v2026.4.25+ update

### Checking Generated Files

**View Images:**
```powershell
Get-ChildItem "H:\Project Pictures\" | Sort-Object LastWriteTime -Descending | Select-Object -First 10
```

**View Videos:**
```powershell
Get-ChildItem "H:\Videos\" -Filter "*.mp4" | Sort-Object LastWriteTime -Descending | Select-Object -First 10
```

**Check Container Paths:**
```bash
docker exec openclaw-gateway ls -lh /media/images/
docker exec openclaw-gateway ls -lh /media/videos/
```

---

## Test Results (April 27, 2026)

### Image Generation Test ✅
**Prompt:** "Generate a simple test image: a red circle on a white background. Save to generated-images/test-circle.png"

**Results:**
- ✅ Image generated in ~15 seconds
- ✅ File created: `H:\Project Pictures\test-circle.png` (453 KB)
- ✅ Displayed in OpenClaw UI
- ✅ Model used: Google Gemini 3.1 Flash Image Preview

### Video Generation Test ⏸️
**Prompt:** "Generate a 3-second test video: a spinning cube. Save to generated-videos/test-cube.mp4"

**Results:**
- ✅ Task submitted successfully
- ✅ Seedance 2.0 started processing
- ❌ Completion callback blocked by OpenClaw bug
- ❌ File not created

---

## Known Limitations

### Seedream 4.5 NOT Supported
**Why:** OpenClaw requires models that return both image AND text (`modalities: ["image", "text"]`)  
**Seedream 4.5:** Only returns images (`modalities: ["image"]`)  
**Incompatibility:** Architectural mismatch, no configuration workaround exists

**Research Sources:**
- OpenRouter API docs confirm Seedream 4.5 is image-only
- OpenClaw docs require dual-output models
- GitHub Issue #18961 (LiteLLM) confirms compatibility problems

### OpenClaw v2026.4.21 Async Bug
**Affected Features:**
- Video generation completion callbacks
- Any async background task completion

**Workaround:** None available - wait for v2026.4.25+ update

---

## Use Cases

### Motion Graphics Workflow
1. **Concept Images** - Generate book covers, character designs (working now)
2. **Video Clips** - Generate promotional clips (after OpenClaw update)
3. **Marketing Content** - Combine with NotebookLM + OSP Marketing Tools
4. **Iterative Design** - Multi-image editing for refining concepts

### The Zahanara Chronicles Project
**Successfully Generated:**
- Fantasy book cover with magical spider web energy
- Photorealistic quality with orange-red glow effects
- Clear title text rendering
- Perfect for YouTube video thumbnails and social media teasers

---

## Next Steps

1. ✅ **Use Image Generation** - Fully operational for book covers and concept art
2. ⏸️ **Monitor OpenClaw Updates** - Watch for v2026.4.25+ release
3. 📁 **Check Output Folders** - All generated media auto-saves to Windows directories
4. 🎨 **Create Content** - Start generating images for The Zahanara Chronicles project

---

## Support

**OpenClaw Docs:** https://docs.openclaw.ai  
**OpenRouter Docs:** https://openrouter.ai/docs  
**Google Gemini API:** https://ai.google.dev/gemini-api/docs

**Container:** openclaw-gateway  
**Version:** v2026.4.21  
**Network:** openclaw-docker_openclaw-network
