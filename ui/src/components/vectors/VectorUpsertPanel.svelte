<script>
    import { createEventDispatcher } from "svelte";
    import OverlayPanel from "@/components/base/OverlayPanel.svelte";
    import ApiClient from "@/utils/ApiClient";

    export let isVisible = false;
    export let vector = null; // If editing existing vector

    const dispatch = createEventDispatcher();

    let vectorPanel;
    let isLoading = false;
    let formData = {
        id: "",
        type: "text",
        embedding: "",
        metadata: "{}",
        textContent: "",
    };

    let fileInput;
    let selectedFile = null;
    let filePreviewUrl = null;

    // Initialize form data when vector changes
    let isInitialized = false;

    $: if (vector && !isInitialized) {
        formData.id = vector.id || "";
        formData.type = vector.type || "text";
        formData.embedding = (vector.embedding && Array.isArray(vector.embedding)) ? JSON.stringify(vector.embedding) : "";
        formData.metadata = vector.metadata ? JSON.stringify(vector.metadata) : "{}";
        formData.textContent = (vector.metadata && vector.metadata.content) ? vector.metadata.content : "";
        isInitialized = true;

        // Don't clear file selection for existing vectors - let user upload new files if needed
        // Only clear for new vectors
        if (fileInput && !selectedFile) {
            fileInput.value = "";
        }
    } else if (!vector && isInitialized) {
        formData = {
            id: "",
            type: "text",
            embedding: "",
            metadata: "{}",
            textContent: "",
        };
        // Clear file selection for new vector
        selectedFile = null;
        filePreviewUrl = null;
        if (fileInput) {
            fileInput.value = "";
        }
        isInitialized = false;
    }

    export function show(vectorData = null) {
        vector = vectorData;
        vectorPanel?.show();
    }

    function hide() {
        vector = null;
        vectorPanel?.hide();
    }

    function forceHide() {
        hide();
    }

    function searchSimilar() {
        console.log("[VectorUpsertPanel] searchSimilar called with vector:", vector);

        // Use the current vector's embedding to search for similar vectors
        if (vector) {
            console.log("[VectorUpsertPanel] Vector exists:", vector.id, vector.type);

            if (vector.embedding) {
                console.log("[VectorUpsertPanel] Vector has embedding:", vector.embedding);

                // Ensure embedding is an array (parse if it's a string from form data)
                let embeddingArray = vector.embedding;
                if (typeof vector.embedding === 'string') {
                    try {
                        embeddingArray = JSON.parse(vector.embedding);
                        console.log("[VectorUpsertPanel] Parsed embedding string to array");
                    } catch (e) {
                        console.error("Failed to parse embedding string:", e);
                        alert("This vector's embedding data is corrupted and cannot be used for similarity search.");
                        return;
                    }
                }

            if (Array.isArray(embeddingArray) && embeddingArray.length > 0) {
                console.log("[VectorUpsertPanel] Embedding array valid, calling callback");

                // Store vector data before hiding (hide() sets vector = null)
                const searchData = {
                    embedding: embeddingArray,
                    type: vector.type
                };

                // Close the current panel
                hide();

                // Call the callback with the search data
                dispatch("searchSimilar", searchData);
            } else {
                    alert("This vector has no embedding data and cannot be used for similarity search.");
                }
            } else {
                console.log("[VectorUpsertPanel] Vector has no embedding");
                alert("This vector has no embedding data and cannot be used for similarity search.");
            }
        } else {
            console.log("[VectorUpsertPanel] No vector available");
            alert("No vector data available for similarity search.");
        }
    }

    function handleFileSelect(event) {
        const file = event.target.files[0];
        if (file) {
            selectedFile = file;
            if (formData.type === 'image') {
                const reader = new FileReader();
                reader.onload = (e) => {
                    filePreviewUrl = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        }
    }

    function formatFileSize(bytes) {
        if (!bytes) return "";
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    }

    function removeFile() {
        selectedFile = null;
        filePreviewUrl = null;
        if (fileInput) {
            fileInput.value = '';
        }
    }

    async function handleSubmit() {
        console.log("[VectorUpsertPanel] Starting handleSubmit");

        if (isLoading) {
            console.log("[VectorUpsertPanel] Already loading, returning");
            return;
        }

        try {
            console.log("[VectorUpsertPanel] Form data:", formData);

            // No validation needed for ID since it's optional and auto-generated

            let embedding;
            if (formData.embedding.trim()) {
                console.log("[VectorUpsertPanel] Parsing custom embedding");
                // If embedding is provided, validate it
                try {
                    embedding = JSON.parse(formData.embedding);
                    if (!Array.isArray(embedding)) {
                        throw new Error("Embedding must be an array");
                    }
                    console.log("[VectorUpsertPanel] Custom embedding parsed:", embedding.length, "dimensions");
                } catch (e) {
                    console.error("[VectorUpsertPanel] Invalid embedding format:", e);
                    alert("Invalid embedding format. Must be a JSON array of numbers.");
                    return;
                }
            } else {
                // If embedding is empty, set to null for auto-generation
                console.log("[VectorUpsertPanel] Using null embedding for auto-generation");
                embedding = null;
            }

            let metadata = {};
            try {
                console.log("[VectorUpsertPanel] Parsing metadata");
                metadata = JSON.parse(formData.metadata);
                console.log("[VectorUpsertPanel] Metadata parsed:", metadata);
            } catch (e) {
                console.error("[VectorUpsertPanel] Invalid metadata format:", e);
                alert("Invalid metadata format. Must be valid JSON.");
                return;
            }

            // Add text content to metadata if it's a text vector
            if (formData.type === 'text' && formData.textContent.trim()) {
                metadata.content = formData.textContent.trim();
                console.log("[VectorUpsertPanel] Added text content to metadata:", metadata.content);
            }

            console.log("[VectorUpsertPanel] Setting isLoading to true");
            isLoading = true;

            const vectorData = {
                type: formData.type,
                embedding: embedding || null,
                metadata: metadata,
            };

            // Only include ID if it's not empty
            if (formData.id.trim()) {
                vectorData.id = formData.id;
                console.log("[VectorUpsertPanel] Including custom ID:", vectorData.id);
            } else {
                console.log("[VectorUpsertPanel] No custom ID, will auto-generate");
            }

            console.log("[VectorUpsertPanel] Final vectorData:", vectorData);

            // Prepare request body with image data if available
            const requestBody = {
                vectors: [vectorData],
            };

            // Add image data for image types
            if (formData.type === 'image' && selectedFile) {
                // Convert file to base64
                const reader = new FileReader();
                const base64Promise = new Promise((resolve, reject) => {
                    reader.onload = () => resolve(reader.result.split(',')[1]); // Remove data:image/... prefix
                    reader.onerror = reject;
                    reader.readAsDataURL(selectedFile);
                });

                try {
                    const base64Data = await base64Promise;
                    requestBody.imageData = base64Data;
                    console.log("[VectorUpsertPanel] Added image data to request");
                } catch (error) {
                    console.error("[VectorUpsertPanel] Failed to convert image to base64:", error);
                    // Continue without image data - embedding will still work
                }
            }

            console.log("[VectorUpsertPanel] Making API call to /api/vectors/upsert");

            const response = await ApiClient.send("/api/vectors/upsert", {
                method: "POST",
                body: requestBody,
            });

            console.log("[VectorUpsertPanel] API call successful, response:", response);

            console.log("[VectorUpsertPanel] Dispatching save event");
            dispatch("save", { isNew: !vector });

            console.log("[VectorUpsertPanel] Calling hide()");
            hide();

        } catch (err) {
            console.error("[VectorUpsertPanel] Failed to save vector:", err);
            console.error("[VectorUpsertPanel] Error details:", {
                message: err.message,
                stack: err.stack,
                response: err.response,
                status: err.status
            });
            alert(`Failed to save vector: ${err.message || 'Unknown error'}`);
        } finally {
            console.log("[VectorUpsertPanel] Setting isLoading to false");
            isLoading = false;
        }
    }
</script>

<OverlayPanel bind:this={vectorPanel} class="overlay-panel-lg" on:hide on:show>
    <svelte:fragment slot="header">
        <h4 class="txt txt-lg">
            {#if vector}
                Edit Vector
            {:else}
                New Vector
            {/if}
        </h4>
    </svelte:fragment>

    <div class="content">
        <form on:submit|preventDefault={handleSubmit}>
            <div class="form-field">
                <label for="vector-id" class="form-label">ID</label>
                <input
                    id="vector-id"
                    type="text"
                    bind:value={formData.id}
                    placeholder="unique-vector-id (optional - auto-generated)"
                    class="form-input"
                    disabled={!!vector}
                />
                <small class="form-hint">Unique identifier for the vector (optional - auto-generated if empty)</small>
            </div>

            <div class="form-field">
                <label for="vector-type" class="form-label">Type *</label>
                <select
                    id="vector-type"
                    bind:value={formData.type}
                    class="form-input"
                    required
                >
                    <option value="text">Text</option>
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="file">File</option>
                </select>
            </div>

            {#if formData.type === 'text'}
                <div class="form-field">
                    <label for="vector-text" class="form-label">Text Content *</label>
                    <textarea
                        id="vector-text"
                        bind:value={formData.textContent}
                        placeholder="Enter text to generate embedding..."
                        class="form-input"
                        rows="4"
                        required
                    />
                    <small class="form-hint">Text content that will be used to generate the vector embedding</small>
                </div>
            {:else}
                <div class="form-field">
                    <label class="form-label">{formData.type === 'image' ? 'Image' : 'File'} *</label>

                    {#if vector && !selectedFile}
                        <!-- Show existing vector content for editing -->
                        <div class="existing-content">
                            {#if formData.type === 'image' && vector.metadata?.previewUrl}
                                <div class="existing-image-with-preview">
                                    <img src={vector.metadata.previewUrl} alt="Current image" class="existing-image-preview" />
                                    <small>This vector already has image content. Upload a new image to replace it.</small>
                                </div>
                            {:else if formData.type === 'image'}
                                <div class="existing-image">
                                    <i class="ri-image-line"></i>
                                    <span>Image content already embedded</span>
                                    <small>This vector already has image content. Upload a new image to replace it.</small>
                                </div>
                            {:else if formData.type === 'video'}
                                <div class="existing-video">
                                    <i class="ri-video-line"></i>
                                    <span>Video content already embedded</span>
                                    <small>This vector already has video content. Upload a new video to replace it.</small>
                                </div>
                            {:else}
                                <div class="existing-file">
                                    <i class="ri-file-line"></i>
                                    <span>File content already embedded</span>
                                    <small>This vector already has file content. Upload a new file to replace it.</small>
                                </div>
                            {/if}
                            <button type="button" class="btn-secondary" on:click={() => { if (fileInput) fileInput.click(); }}>
                                Replace {formData.type === 'image' ? 'Image' : formData.type === 'video' ? 'Video' : 'File'}
                            </button>
                        </div>
                    {:else if !selectedFile}
                        <div class="file-upload-area">
                            <input
                                type="file"
                                accept={formData.type === 'image' ? 'image/*' : formData.type === 'video' ? 'video/*' : '*'}
                                on:change={handleFileSelect}
                                style="display: none;"
                                bind:this={fileInput}
                                id="vector-file"
                            />
                            <label for="vector-file" class="file-upload-label">
                                {#if formData.type === 'image'}
                                    <i class="ri-image-add-line"></i>
                                {:else if formData.type === 'video'}
                                    <i class="ri-video-line"></i>
                                {:else}
                                    <i class="ri-file-add-line"></i>
                                {/if}
                                <span>Choose {formData.type === 'image' ? 'image' : formData.type === 'video' ? 'video' : 'file'}</span>
                            </label>
                        </div>
                    {:else}
                        <div class="file-preview">
                            {#if formData.type === 'image'}
                                <img src={filePreviewUrl} alt="Selected image" class="image-preview" />
                            {:else}
                                <div class="file-info">
                                    <i class="ri-file-line"></i>
                                    <span>{selectedFile.name}</span>
                                    <span class="file-size">({formatFileSize(selectedFile.size)})</span>
                                </div>
                            {/if}
                            <button type="button" class="btn-remove" on:click={removeFile}>
                                <i class="ri-close-line"></i>
                            </button>
                        </div>
                    {/if}
                    <small class="form-hint">
                        {#if vector}
                            Upload a new {formData.type === 'image' ? 'image' : formData.type === 'video' ? 'video' : 'file'} to replace the existing content
                        {:else}
                            Upload {formData.type === 'image' ? 'an image' : formData.type === 'video' ? 'a video' : 'a file'} to generate embedding
                        {/if}
                    </small>
                </div>
            {/if}

            <div class="form-field">
                <label for="vector-embedding" class="form-label">Embedding</label>
                <textarea
                    id="vector-embedding"
                    bind:value={formData.embedding}
                    placeholder='[0.1, 0.2, 0.3, ...] (leave empty for auto-generation)'
                    class="form-input"
                    rows="4"
                />
                <small class="form-hint">JSON array of numbers representing the vector embedding (optional - will be auto-generated if empty)</small>
            </div>

            <div class="form-field">
                <label for="vector-metadata" class="form-label">Metadata</label>
                <textarea
                    id="vector-metadata"
                    bind:value={formData.metadata}
                    placeholder="Optional metadata as JSON"
                    class="form-input"
                    rows="3"
                />
                <small class="form-hint">Optional JSON metadata associated with the vector</small>
            </div>
        </form>
    </div>

    <svelte:fragment slot="footer">
        {#if vector}
            <button type="button" class="btn btn-transparent" on:click={searchSimilar}>
                <i class="ri-search-line" />
                <span class="txt">Search Similar</span>
            </button>
        {/if}

        <button type="button" class="btn btn-transparent" disabled={isLoading} on:click={() => hide()}>
            Cancel
        </button>

        <button
            type="button"
            class="btn btn-primary"
            disabled={isLoading}
            on:click={handleSubmit}
        >
            {#if isLoading}
                <span class="loader loader-sm" />
                <span class="txt">Saving...</span>
            {:else}
                <i class="ri-save-line" />
                <span class="txt">Save Vector</span>
            {/if}
        </button>
    </svelte:fragment>
</OverlayPanel>

<style>
    .form-field {
        margin-bottom: 1.5rem;
    }

    .form-label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: var(--txtColor);
    }

    .form-input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid var(--borderColor);
        border-radius: var(--borderRadius);
        background: var(--bodyColor);
        color: var(--txtColor);
        font-family: monospace;
        font-size: 0.875rem;
    }

    .form-input:focus {
        outline: none;
        border-color: var(--primaryColor);
        box-shadow: 0 0 0 2px rgba(var(--primaryColorRgb), 0.1);
    }

    .form-input:disabled {
        background: var(--hoverColor);
        color: var(--txtHintColor);
        cursor: not-allowed;
    }

    .form-hint {
        display: block;
        margin-top: 0.25rem;
        font-size: 0.75rem;
        color: var(--txtHintColor);
    }

    .loader-sm {
        width: 1rem;
        height: 1rem;
    }

    .file-upload-area {
        border: 2px dashed var(--borderColor);
        border-radius: var(--borderRadius);
        padding: 2rem;
        text-align: center;
        transition: all 0.2s;
        cursor: pointer;
    }

    .file-upload-area:hover {
        border-color: var(--primaryColor);
        background: rgba(var(--primaryColorRgb), 0.05);
    }

    .file-upload-label {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        color: var(--txtHintColor);
        cursor: pointer;
    }

    .file-upload-label i {
        font-size: 2rem;
    }

    .file-preview {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        border: 1px solid var(--borderColor);
        border-radius: var(--borderRadius);
        background: var(--hoverColor);
    }

    .file-info {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .file-info i {
        color: var(--primaryColor);
    }

    .file-size {
        color: var(--txtHintColor);
        font-size: 0.875rem;
    }

    .image-preview {
        max-width: 200px;
        max-height: 150px;
        border-radius: var(--borderRadius);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .btn-remove {
        background: none;
        border: none;
        color: var(--txtHintColor);
        cursor: pointer;
        padding: 0.25rem;
        border-radius: var(--borderRadius);
        transition: all 0.2s;
    }

    .btn-remove:hover {
        background: var(--dangerColor);
        color: white;
    }

    .existing-content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        border: 1px solid var(--successColor);
        border-radius: var(--borderRadius);
        background: rgba(var(--successColorRgb), 0.1);
    }

    .existing-image, .existing-video, .existing-file {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        color: var(--txtColor);
    }

    .existing-image i, .existing-video i, .existing-file i {
        font-size: 2rem;
        color: var(--successColor);
    }

    .existing-content small {
        color: var(--txtHintColor);
        font-size: 0.75rem;
        text-align: center;
    }

    .btn-secondary {
        background: var(--bodyColor);
        border: 1px solid var(--borderColor);
        color: var(--txtColor);
        padding: 0.5rem 1rem;
        border-radius: var(--borderRadius);
        cursor: pointer;
        transition: all 0.2s;
        align-self: center;
    }

    .btn-secondary:hover {
        background: var(--hoverColor);
        border-color: var(--primaryColor);
    }

    .existing-image-with-preview {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
    }

    .existing-image-preview {
        max-width: 200px;
        max-height: 150px;
        border-radius: var(--borderRadius);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        border: 1px solid var(--borderColor);
    }
</style>
