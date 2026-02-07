#!/usr/bin/env python3
"""
PocketBase CLIP Service - Simple HTTP Server for AI embeddings

This script provides CLIP embeddings via simple HTTP server.
Accepts POST requests to /embed with base64 image data.

Install dependencies:
    pip install torch torchvision transformers pillow

Run the service:
    python clip_runner.py
"""

import base64
import io
import json
import threading
import time
from http.server import BaseHTTPRequestHandler, HTTPServer
from typing import List
import torch
from transformers import CLIPProcessor, CLIPModel
from PIL import Image

# Global variables for model and processor
model = None
processor = None

def load_clip_model():
    """Load CLIP model and processor"""
    global model, processor
    print("Loading CLIP model (this may take a moment)...")
    try:
        model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
        processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

        # Move to GPU if available
        if torch.cuda.is_available():
            model = model.to("cuda")
            print("CLIP model loaded on GPU")
        else:
            print("CLIP model loaded on CPU (GPU not available)")

    except Exception as e:
        print(f"Error loading CLIP model: {e}")
        print("Make sure you have installed the required packages:")
        print("pip install torch torchvision transformers pillow")
        raise

def get_image_embedding(image_data: str) -> List[float]:
    """Generate CLIP embedding for base64 image"""
    global model, processor

    if model is None or processor is None:
        raise RuntimeError("CLIP model not loaded")

    try:
        # Remove data URL prefix if present
        if image_data.startswith("data:image"):
            image_data = image_data.split(",")[1]

        # Decode base64
        image_bytes = base64.b64decode(image_data)

        # Convert to PIL Image
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

        # Process image
        inputs = processor(images=image, return_tensors="pt")

        # Move to same device as model
        if torch.cuda.is_available():
            inputs = {k: v.to("cuda") for k, v in inputs.items()}

        # Generate embedding
        with torch.no_grad():
            image_features = model.get_image_features(**inputs)

        # Normalize
        image_features = image_features / image_features.norm(dim=-1, keepdim=True)

        # Convert to list
        embedding = image_features.cpu().numpy().flatten().tolist()

        return embedding

    except Exception as e:
        raise RuntimeError(f"Error processing image: {str(e)}")

class CLIPRequestHandler(BaseHTTPRequestHandler):
    """HTTP request handler for CLIP service"""

    def do_GET(self):
        """Handle GET requests"""
        if self.path == "/health":
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            response = {"status": "healthy", "model_loaded": model is not None}
            self.wfile.write(json.dumps(response).encode())
        else:
            self.send_response(404)
            self.end_headers()

    def do_POST(self):
        """Handle POST requests"""
        if self.path == "/embed":
            try:
                # Read request body
                content_length = int(self.headers['Content-Length'])
                post_data = self.rfile.read(content_length)

                # Parse JSON
                request_data = json.loads(post_data.decode())
                image_data = request_data.get("image", "")

                if not image_data:
                    self.send_response(400)
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({"embedding": [], "error": "No image data provided"}).encode())
                    return

                # Generate embedding
                embedding = get_image_embedding(image_data)

                # Send response
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                response = {"embedding": embedding, "error": ""}
                self.wfile.write(json.dumps(response).encode())

            except Exception as e:
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                response = {"embedding": [], "error": str(e)}
                self.wfile.write(json.dumps(response).encode())
        else:
            self.send_response(404)
            self.end_headers()

class ReusableTCPServer(HTTPServer):
    allow_reuse_address = True  # <--- This is the magic fix

import os

# ... imports ...

def run_server():
    try:
        port = int(os.environ.get("PORT", 8001))
        server_address = ('127.0.0.1', port)
        print(f"Binding to {server_address}", flush=True) 
        
        # Use the custom class instead of HTTPServer
        httpd = ReusableTCPServer(server_address, CLIPRequestHandler)
        
        print("HTTP server created successfully", flush=True)
        print("Starting server loop...", flush=True)
        httpd.serve_forever()
    except Exception as e:
        print(f"CRITICAL ERROR starting server: {e}", flush=True)
        # We must exit with non-zero so Go knows we failed
        import sys
        sys.exit(1)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8001))
    print("Starting PocketBase CLIP Service...", flush=True)
    print(f"Service will be available on http://127.0.0.1:{port}", flush=True)
    print("For GPU support, ensure CUDA is available", flush=True)

    # Load model in main thread
    print("Loading CLIP model...")
    load_clip_model()
    print("CLIP model loaded successfully")

    # Start server
    print("Starting HTTP server...")
    run_server()
