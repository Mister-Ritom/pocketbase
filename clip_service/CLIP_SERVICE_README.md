# PocketBase CLIP Service

This service provides **free CLIP AI embeddings** for PocketBase without requiring paid APIs.

## 🚀 Quick Start

### 1. Install Python Dependencies

```bash
pip install torch torchvision transformers fastapi uvicorn pillow
```

### 2. Start the CLIP Service

```bash
python clip_service.py
```

The service will start on `http://localhost:8000`

### 3. Configure PocketBase (Optional)

Set the service URL if not using localhost:8000:

```bash
export CLIP_SERVICE_URL="http://your-host:8000"
```

### 4. Test the Service

```bash
curl http://localhost:8000/health
# Should return: {"status":"healthy","model_loaded":true}
```

## 🎯 How It Works

1. **PocketBase** sends base64-encoded images to the CLIP service
2. **CLIP Service** uses OpenAI's CLIP model to generate embeddings
3. **PocketBase** receives 512-dimensional embeddings for similarity search
4. **No API costs** - runs locally on your hardware

## 🖥️ System Requirements

### Minimum (CPU Only)

- Python 3.8+
- 4GB RAM
- ~2GB disk space for CLIP model

### Recommended (GPU)

- CUDA-compatible GPU
- 8GB+ VRAM
- Much faster processing

## 🔧 Advanced Configuration

### Custom Port

```python
uvicorn.run(app, host="0.0.0.0", port=9090)
```

### Custom Model

Replace in `clip_service.py`:

```python
model = CLIPModel.from_pretrained("openai/clip-vit-large-patch14")  # Larger model
```

### GPU Selection

The service automatically uses GPU if available. For multi-GPU:

```python
model = model.to("cuda:0")  # Specific GPU
```

## 🧪 Testing

### Health Check

```bash
curl http://localhost:8000/health
```

### Test Embedding

```bash
curl -X POST http://localhost:8000/embed \
  -H "Content-Type: application/json" \
  -d '{"image": "base64_encoded_image_here"}'
```

## 🚀 Production Deployment

### Using Docker

```dockerfile
FROM python:3.9-slim

RUN pip install torch torchvision transformers fastapi uvicorn pillow

COPY clip_service.py .
EXPOSE 8000

CMD ["python", "clip_service.py"]
```

### Systemd Service

```ini
[Unit]
Description=PocketBase CLIP Service
After=network.target

[Service]
Type=simple
User=your-user
WorkingDirectory=/path/to/pocketbase
ExecStart=/usr/bin/python3 clip_service.py
Restart=always

[Install]
WantedBy=multi-user.target
```

## 🎯 Benefits

- ✅ **Free** - No API costs
- ✅ **Local** - Your data stays private
- ✅ **Fast** - GPU acceleration available
- ✅ **Reliable** - Open-source CLIP model
- ✅ **Production-ready** - REST API with error handling

## 🔍 Troubleshooting

### Model Loading Issues

```bash
# Check PyTorch installation
python -c "import torch; print(torch.cuda.is_available())"

# Clear cache if needed
rm -rf ~/.cache/huggingface/transformers
```

### Memory Issues

- Use smaller CLIP model: `clip-vit-base-patch32` instead of `clip-vit-large-patch14`
- Process images sequentially instead of parallel

### Connection Issues

- Check firewall allows port 8000
- Verify service is running: `ps aux | grep clip_service`
- Test with curl: `curl http://localhost:8000/health`

## 📚 Learn More

- [CLIP Paper](https://arxiv.org/abs/2103.00020)
- [OpenAI CLIP](https://github.com/openai/CLIP)
- [Hugging Face Transformers](https://huggingface.co/docs/transformers/model_doc/clip)

---

**PocketBase** now has production-quality AI embeddings at **zero cost**! 🎉
