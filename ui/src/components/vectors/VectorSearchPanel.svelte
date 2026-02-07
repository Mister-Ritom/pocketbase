<script>
    import { createEventDispatcher, onMount } from "svelte";
    import OverlayPanel from "@/components/base/OverlayPanel.svelte";
    import ApiClient from "@/utils/ApiClient";
    import CommonHelper from "@/utils/CommonHelper";

    const dispatch = createEventDispatcher();

    let searchPanel;

    let searchText = "";
    let searchType = "text"; // text, image, file
    let searchImage = null;
    let searchFile = null;
    let isLoading = false;
    let searchResults = [];
    let errorMessage = "";

    function hide() {
        searchPanel?.hide();
        reset();
    }

    export function show() {
        searchPanel?.show();
    }

    export function performSearchWithEmbedding(embedding, type) {
        // Set up search with pre-loaded embedding
        searchResults = [];
        errorMessage = "";

        // Perform search with the provided embedding
        performSearchWithEmbeddingInternal(embedding, type);
    }

    async function performSearchWithEmbeddingInternal(embedding, type) {
        isLoading = true;
        errorMessage = "";
        searchResults = [];

        try {
            const searchResponse = await ApiClient.send("/api/vectors/search", {
                method: "POST",
                body: JSON.stringify({
                    embedding: embedding,
                    top: 10,
                    type: type === "text" ? "" : type // Empty type means search all for text
                })
            });

            searchResults = searchResponse.results || [];

        } catch (error) {
            console.error("Search error:", error);
            errorMessage = error.message || "Search failed";
        } finally {
            isLoading = false;
        }
    }

    function reset() {
        searchText = "";
        searchType = "text";
        // Clean up uploaded files to avoid memory issues
        if (searchImage) {
            searchImage = null;
        }
        if (searchFile) {
            searchFile = null;
        }
        searchResults = [];
        errorMessage = "";
        isLoading = false;
    }

    async function performSearch() {
        if (isLoading) return;

        isLoading = true;
        errorMessage = "";
        searchResults = [];

        try {
            let searchData = {
                top: 10,
                type: searchType === "text" ? "" : searchType // Empty type means search all for text
            };

            if (searchType === "text" && searchText.trim()) {
                // Use text directly - server will generate embedding
                searchData.text = searchText.trim();
            } else if (searchType === "image" && searchImage) {
                // Convert image to base64 and send to API for processing
                const reader = new FileReader();
                const base64Promise = new Promise((resolve, reject) => {
                    reader.onload = () => resolve(reader.result.split(',')[1]); // Remove data:image/... prefix
                    reader.onerror = reject;
                    reader.readAsDataURL(searchImage);
                });

                try {
                    const base64Data = await base64Promise;
                    searchData.imageData = base64Data;
                    console.log("Image converted to base64 for search:", base64Data.substring(0, 50) + "...");
                } catch (error) {
                    console.error("Failed to convert image to base64:", error);
                    throw new Error("Failed to process image");
                }
            } else if (searchType === "file" && searchFile) {
                // For now, file search uses placeholder - would need server-side file processing
                searchData.embedding = new Array(384).fill(0).map(() => Math.random() * 2 - 1);
                console.warn("File search using placeholder embedding - implement actual file processing");
            } else {
                throw new Error("Please provide search input");
            }

            // Perform the search
            const searchResponse = await ApiClient.send("/api/vectors/search", {
                method: "POST",
                body: JSON.stringify(searchData)
            });

            searchResults = searchResponse.results || [];

        } catch (error) {
            console.error("Search error:", error);
            errorMessage = error.message || "Search failed";
        } finally {
            isLoading = false;
        }
    }

    function handleImageSelect(event) {
        const file = event.target.files[0];
        if (file) {
            searchImage = file;
        }
    }

    function handleFileSelect(event) {
        const file = event.target.files[0];
        if (file) {
            searchFile = file;
        }
    }

    function removeImage() {
        searchImage = null;
    }

    function removeFile() {
        searchFile = null;
    }
</script>

<OverlayPanel bind:this={searchPanel} class="overlay-panel-lg" on:hide on:show>
    <svelte:fragment slot="header">
        <h4 class="txt txt-lg">Search Similar Vectors</h4>
    </svelte:fragment>

    <div class="content">
            <!-- Search Type Selection -->
            <div class="form-field">
                <label class="form-label">Search Type</label>
                <div class="search-type-tabs">
                    <button
                        type="button"
                        class="tab-btn {searchType === 'text' ? 'active' : ''}"
                        on:click={() => searchType = 'text'}
                    >
                        <i class="ri-text" />
                        Text
                    </button>
                    <button
                        type="button"
                        class="tab-btn {searchType === 'image' ? 'active' : ''}"
                        on:click={() => searchType = 'image'}
                    >
                        <i class="ri-image-line" />
                        Image
                    </button>
                    <button
                        type="button"
                        class="tab-btn {searchType === 'file' ? 'active' : ''}"
                        on:click={() => searchType = 'file'}
                    >
                        <i class="ri-file-line" />
                        File
                    </button>
                </div>
            </div>

            <!-- Text Search Input -->
            {#if searchType === 'text'}
                <div class="form-field">
                    <label class="form-label">Search Text</label>
                    <textarea
                        class="form-input"
                        placeholder="Enter text to find similar content..."
                        bind:value={searchText}
                        rows="3"
                    />
                </div>
            {/if}

            <!-- Image Search Input -->
            {#if searchType === 'image'}
                <div class="form-field">
                    <label class="form-label">Upload Image</label>
                    {#if !searchImage}
                        <div class="file-upload-area">
                            <input
                                type="file"
                                accept="image/*"
                                on:change={handleImageSelect}
                                style="display: none;"
                                id="image-upload"
                            />
                            <label for="image-upload" class="file-upload-label">
                                <i class="ri-image-add-line" />
                                <span>Click to upload an image</span>
                            </label>
                        </div>
                    {:else}
                        <div class="file-preview">
                            <div class="file-info">
                                <i class="ri-image-line" />
                                <span>{searchImage.name}</span>
                                <span class="file-size">({CommonHelper.formattedFileSize(searchImage.size)})</span>
                            </div>
                            <button type="button" class="btn-remove" on:click={removeImage}>
                                <i class="ri-close-line" />
                            </button>
                        </div>
                    {/if}
                </div>
            {/if}

            <!-- File Search Input -->
            {#if searchType === 'file'}
                <div class="form-field">
                    <label class="form-label">Upload File</label>
                    {#if !searchFile}
                        <div class="file-upload-area">
                            <input
                                type="file"
                                on:change={handleFileSelect}
                                style="display: none;"
                                id="file-upload"
                            />
                            <label for="file-upload" class="file-upload-label">
                                <i class="ri-file-add-line" />
                                <span>Click to upload a file</span>
                            </label>
                        </div>
                    {:else}
                        <div class="file-preview">
                            <div class="file-info">
                                <i class="ri-file-line" />
                                <span>{searchFile.name}</span>
                                <span class="file-size">({CommonHelper.formattedFileSize(searchFile.size)})</span>
                            </div>
                            <button type="button" class="btn-remove" on:click={removeFile}>
                                <i class="ri-close-line" />
                            </button>
                        </div>
                    {/if}
                </div>
            {/if}

            <!-- Error Message -->
            {#if errorMessage}
                <div class="error-message">
                    <i class="ri-error-warning-line" />
                    <span>{errorMessage}</span>
                </div>
            {/if}

            <!-- Search Button -->
            <div class="form-actions">
                <button
                    type="button"
                    class="btn btn-primary"
                    disabled={isLoading || (!searchText.trim() && !searchImage && !searchFile)}
                    on:click={performSearch}
                >
                    {#if isLoading}
                        <i class="ri-loader-4-line loader-sm" />
                        <span>Searching...</span>
                    {:else}
                        <i class="ri-search-line" />
                        <span>Search</span>
                    {/if}
                </button>
            </div>

            <!-- Search Results -->
            {#if searchResults.length > 0}
                <div class="search-results">
                    <h4>Search Results ({searchResults.length})</h4>
                    <div class="results-list">
                        {#each searchResults as result}
                            <div class="result-item">
                                <div class="result-header">
                                    <span class="result-type">
                                        <span class="badge badge-sm">{result.type}</span>
                                    </span>
                                    <span class="badge score-badge">{result.score?.toFixed(3) || 'N/A'}</span>
                                </div>
                                <div class="result-content">
                                    {#if result.type === 'text' && result.metadata?.content}
                                        <div class="text-preview">
                                            <i class="ri-text" />
                                            <span>{result.metadata.content.length > 50 ? result.metadata.content.substring(0, 50) + '...' : result.metadata.content}</span>
                                        </div>
                                    {:else if result.type === 'image'}
                                        <div class="image-preview">
                                            <i class="ri-image-line" />
                                            <span>Image vector</span>
                                            {#if result.metadata?.previewUrl}
                                                <img src={result.metadata.previewUrl} alt="Preview" class="result-mini-image" />
                                            {/if}
                                        </div>
                                    {:else if result.type === 'video'}
                                        <div class="video-preview">
                                            <i class="ri-video-line" />
                                            <span>Video vector</span>
                                        </div>
                                    {:else}
                                        <div class="file-preview">
                                            <i class="ri-file-line" />
                                            <span>File vector</span>
                                        </div>
                                    {/if}
                                </div>
                                <div class="result-footer">
                                    <span class="result-id">ID: {result.id}</span>
                                    {#if result.ref_id}
                                        <span class="result-ref">Ref: {result.ref_id}</span>
                                    {/if}
                                    <span class="result-date">{new Date(result.created || result.created_at).toLocaleString()}</span>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            {/if}
    </div>
</OverlayPanel>

<style>
    .search-modal {
        max-height: 80vh;
        display: flex;
        flex-direction: column;
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        border-bottom: 1px solid var(--borderColor);
    }

    .modal-header h3 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--txtColor);
    }

    .btn-close {
        background: none;
        border: none;
        color: var(--txtHintColor);
        cursor: pointer;
        padding: 0.5rem;
        border-radius: var(--borderRadius);
        transition: all 0.2s;
    }

    .btn-close:hover {
        background: var(--hoverColor);
        color: var(--txtColor);
    }

    .modal-body {
        padding: 1.5rem;
        overflow-y: auto;
        flex: 1;
    }

    .form-field {
        margin-bottom: 1.5rem;
    }

    .form-label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: var(--txtColor);
    }

    .search-type-tabs {
        display: flex;
        gap: 0.5rem;
        border-bottom: 1px solid var(--borderColor);
    }

    .tab-btn {
        background: none;
        border: none;
        padding: 0.75rem 1rem;
        cursor: pointer;
        border-radius: var(--borderRadius) var(--borderRadius) 0 0;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
        color: var(--txtHintColor);
    }

    .tab-btn:hover {
        background: var(--hoverColor);
        color: var(--txtColor);
    }

    .tab-btn.active {
        background: var(--primaryColor);
        color: white;
        border-bottom: 2px solid var(--primaryColor);
    }

    .form-input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid var(--borderColor);
        border-radius: var(--borderRadius);
        background: var(--bodyColor);
        color: var(--txtColor);
        font-family: inherit;
        font-size: 0.875rem;
        resize: vertical;
    }

    .form-input:focus {
        outline: none;
        border-color: var(--primaryColor);
        box-shadow: 0 0 0 2px rgba(var(--primaryColorRgb), 0.1);
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

    .error-message {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem;
        background: rgba(var(--dangerColorRgb), 0.1);
        border: 1px solid var(--dangerColor);
        border-radius: var(--borderRadius);
        color: var(--dangerColor);
        margin-bottom: 1rem;
    }

    .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 0.75rem;
        margin-top: 2rem;
        padding-top: 1rem;
        border-top: 1px solid var(--borderColor);
    }

    .search-results {
        margin-top: 2rem;
    }

    .search-results h4 {
        margin: 0 0 1rem 0;
        color: var(--txtColor);
        font-size: 1rem;
    }

    .results-list {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        max-height: 300px;
        overflow-y: auto;
    }

    .result-item {
        padding: 1rem;
        border: 1px solid var(--borderColor);
        border-radius: var(--borderRadius);
        background: var(--hoverColor);
    }

    .result-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
    }

    .result-id {
        font-family: monospace;
        font-weight: 500;
        color: var(--primaryColor);
    }

    .badge {
        background: var(--successColor);
        color: white;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: 500;
    }

    .result-ref {
        font-size: 0.875rem;
        color: var(--txtHintColor);
        font-family: monospace;
    }

    .loader-sm {
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
</style>
