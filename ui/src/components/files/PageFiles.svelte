<script>
    import { tick } from "svelte";
    import { querystring } from "svelte-spa-router";
    import CommonHelper from "@/utils/CommonHelper";
    import tooltip from "@/actions/tooltip";
    import PageWrapper from "@/components/base/PageWrapper.svelte";
    import RefreshButton from "@/components/base/RefreshButton.svelte";
    import Searchbar from "@/components/base/Searchbar.svelte";
    import Toggler from "@/components/base/Toggler.svelte";
    import PageFilesApiDocs from "@/components/files/PageFilesApiDocs.svelte";
    import { pageTitle } from "@/stores/app";
    import { confirm } from "@/stores/confirmation";
    import { addSuccessToast } from "@/stores/toasts";
    import ApiClient from "@/utils/ApiClient";

    const initialQueryParams = new URLSearchParams($querystring);

    let currentPath = initialQueryParams.get("path") || "/";
    let files = [];
    let isLoading = false;
    let isUploading = false;
    let uploadProgress = 0;
    let totalCount = 0;
    let filter = initialQueryParams.get("filter") || "";
    let fileInput;
    let filesApiDocsPanel;

    $: $pageTitle = "Files";

    loadFiles();

    $: reactiveParams = new URLSearchParams($querystring);

    $: pathQueryParam = reactiveParams.get("path");

    $: if (pathQueryParam && pathQueryParam != currentPath) {
        currentPath = pathQueryParam;
        loadFiles();
    }

    // keep the url params in sync
    $: updateQueryParams();

    async function loadFiles() {
        if (isLoading) return;

        isLoading = true;

        try {
            // Load all files and filter by current path
            const response = await ApiClient.files.getList({
                page: 1,
                perPage: 1000,
                filter: filter || "",
            });

            files = response.items || [];
            totalCount = response.totalItems || 0;

            // Group files by directory for navigation
            processFilesByDirectory();

        } catch (err) {
            console.warn("Failed to load files:", err);
            files = [];
            totalCount = 0;
        } finally {
            isLoading = false;
        }
    }

    function processFilesByDirectory() {
        // Group files by their directory structure
        const fileMap = new Map();
        const dirMap = new Map();

        files.forEach(file => {
            const dir = file.directory || "/";
            if (!fileMap.has(dir)) {
                fileMap.set(dir, []);
                dirMap.set(dir, true);
            }
            fileMap.get(dir).push(file);
        });

        // Create directory structure for current path
        const currentFiles = fileMap.get(currentPath) || [];
        const subDirs = Array.from(dirMap.keys())
            .filter(dir => dir.startsWith(currentPath) && dir !== currentPath)
            .map(dir => dir.substring(currentPath === "/" ? 1 : currentPath.length + 1).split("/")[0])
            .filter((value, index, self) => self.indexOf(value) === index)
            .map(name => ({
                id: `dir_${name}`,
                name: name,
                type: "directory",
                size: 0,
                created_at: null,
                isDirectory: true,
            }));

        files = [...subDirs, ...currentFiles];
    }

    function navigateToDirectory(dirName) {
        const newPath = currentPath === "/" ? `/${dirName}` : `${currentPath}/${dirName}`;
        currentPath = newPath;
        updateQueryParams();
        loadFiles();
    }

    function goToParentDirectory() {
        if (currentPath === "/") return;

        const parts = currentPath.split("/");
        parts.pop();
        currentPath = parts.length <= 1 ? "/" : parts.join("/");
        updateQueryParams();
        loadFiles();
    }

    function getBreadcrumbItems() {
        if (currentPath === "/") return [{ name: "Root", path: "/" }];

        const parts = currentPath.split("/").filter(p => p);
        const items = [{ name: "Root", path: "/" }];

        let current = "";
        parts.forEach(part => {
            current += "/" + part;
            items.push({ name: part, path: current });
        });

        return items;
    }

    function formatFileSize(bytes) {
        if (!bytes) return "";
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    }

    function getFileIcon(file) {
        if (file.isDirectory) return "ri-folder-line";

        const mime = file.mime || "";
        if (mime.startsWith("image/")) return "ri-image-line";
        if (mime.startsWith("video/")) return "ri-video-line";
        if (mime.startsWith("audio/")) return "ri-music-line";
        if (mime.includes("pdf")) return "ri-file-pdf-line";
        if (mime.includes("zip") || mime.includes("rar")) return "ri-file-zip-line";
        if (mime.includes("text")) return "ri-file-text-line";

        return "ri-file-line";
    }

    function isImageFile(file) {
        return file.mime && file.mime.startsWith("image/");
    }

    function getImagePreviewUrl(file) {
        if (isImageFile(file)) {
            return `/api/files/${file.id}/${file.stored_name}`;
        }
        return null;
    }

    function updateQueryParams() {
        CommonHelper.replaceHashQueryParams({
            path: currentPath,
            filter: filter,
        });
    }

    function handleFileClick(file) {
        if (file.isDirectory) {
            navigateToDirectory(file.name);
        } else {
            // Open file preview or download
            const downloadUrl = `/api/files/${file.id}/${file.stored_name}`;
            window.open(downloadUrl, '_blank');
        }
    }

    function handleUploadClick() {
        fileInput?.click();
    }

    async function handleFileSelect(event) {
        const selectedFiles = Array.from(event.target.files);
        if (selectedFiles.length === 0) return;

        isUploading = true;
        uploadProgress = 0;

        try {
            const uploadPromises = selectedFiles.map(async (file, index) => {
                const formData = new FormData();
                formData.append('files', file);

                console.log('Uploading file:', file.name);

                // Simulate progress for better UX
                const progressInterval = setInterval(() => {
                    if (uploadProgress < 90) {
                        uploadProgress += Math.random() * 10;
                    }
                }, 200);

                const response = await ApiClient.files.upload(formData);
                clearInterval(progressInterval);
                uploadProgress = ((index + 1) / selectedFiles.length) * 100;

                console.log('Upload response:', response);
                return response;
            });

            await Promise.all(uploadPromises);
            uploadProgress = 100;

            // Small delay to show 100% completion
            setTimeout(() => {
                // Clear the input
                if (fileInput) {
                    fileInput.value = '';
                }

                // Reload files
                loadFiles();
            }, 500);

        } catch (err) {
            console.error("Failed to upload files:", err);
            // Show error message to user
            alert(`Upload failed: ${err.message || 'Unknown error'}`);
        } finally {
            setTimeout(() => {
                isUploading = false;
                uploadProgress = 0;
            }, 1000);
        }
    }

    function copyFileId(file) {
        CommonHelper.copyToClipboard(file.id);
        addSuccessToast("File ID copied to clipboard!");
    }

    function copyFileUrl(file) {
        const url = `${window.location.origin}/api/files/${file.id}/${file.stored_name}`;
        CommonHelper.copyToClipboard(url);
        addSuccessToast("File URL copied to clipboard!");
    }

    function deleteFile(file) {
        console.log('Attempting to delete file:', file.id, file.original_name);

        confirm(
            `Are you sure you want to delete "${file.original_name || file.name}"?`,
            async () => {
                // User clicked "Yes/Confirm"
                console.log('User confirmed deletion');
                try {
                    console.log('Calling API to delete file:', file.id);
                    const result = await ApiClient.files.delete(file.id);
                    console.log('Delete API result:', result);
                    addSuccessToast("File deleted successfully!");
                    console.log('Refreshing file list');
                    loadFiles(); // Refresh the list
                } catch (err) {
                    console.error("Failed to delete file:", err);
                    ApiClient.error(err);
                }
            },
            () => {
                // User clicked "No/Cancel"
                console.log('User cancelled deletion');
            }
        );
    }
</script>

<PageWrapper class="flex-content">
    <header class="page-header">
        <nav class="breadcrumbs">
            {#each getBreadcrumbItems() as item, index}
                {#if index > 0}
                    <span class="breadcrumb-separator">/</span>
                {/if}
                {#if item.path === currentPath}
                    <div class="breadcrumb-item current">{item.name}</div>
                {:else}
                    <button
                        class="breadcrumb-item link"
                        on:click={() => {
                            currentPath = item.path;
                            updateQueryParams();
                            loadFiles();
                        }}
                    >
                        {item.name}
                    </button>
                {/if}
            {/each}
        </nav>

        <div class="inline-flex gap-5">
            {#if currentPath !== "/"}
                <button
                    type="button"
                    aria-label="Go to parent directory"
                    class="btn btn-transparent btn-circle"
                    use:tooltip={{ text: "Go to parent directory", position: "right" }}
                    on:click={goToParentDirectory}
                >
                    <i class="ri-arrow-up-line" />
                </button>
            {/if}

            <RefreshButton on:refresh={loadFiles} />
        </div>

        <div class="btns-group">
            <button
                type="button"
                class="btn btn-outline"
                on:click={() => filesApiDocsPanel?.show()}
            >
                <i class="ri-code-s-slash-line" />
                <span class="txt">API Preview</span>
            </button>

            <button type="button" class="btn btn-expanded" disabled={isUploading} on:click={handleUploadClick}>
                <i class="ri-upload-line" />
                <span class="txt">Upload Files</span>
            </button>
        </div>

        {#if isUploading}
            <div class="upload-progress">
                <div class="upload-progress-bar">
                    <div class="upload-progress-fill" style="width: {uploadProgress}%"></div>
                </div>
                <div class="upload-progress-text">
                    <span class="txt-sm">Uploading... {Math.round(uploadProgress)}%</span>
                </div>
            </div>
        {/if}

        <!-- Hidden file input -->
        <input
            bind:this={fileInput}
            type="file"
            multiple
            style="display: none"
            on:change={handleFileSelect}
        />
    </header>

    <Searchbar
        value={filter}
        placeholder="Search files..."
        on:submit={(e) => {
            filter = e.detail;
            updateQueryParams();
            loadFiles();
        }}
    />

    <div class="clearfix m-b-sm" />

    {#if isLoading}
        <div class="text-center p-lg">
            <span class="loader" />
            <div class="txt-hint m-t-sm">Loading files...</div>
        </div>
    {:else if files.length === 0}
        <div class="text-center p-lg">
            <div class="icon icon-lg txt-hint m-b-base">
                <i class="ri-folder-open-line" />
            </div>
            <h3 class="txt-hint">No files found</h3>
            <p class="txt-hint">This directory is empty.</p>
        </div>
    {:else}
        <div class="files-grid">
            {#each files as file}
                <div
                    class="file-item"
                    class:directory={file.isDirectory}
                    on:click={() => handleFileClick(file)}
                    role="button"
                    tabindex="0"
                >
                    <div class="file-icon">
                        {#if isImageFile(file)}
                            <img
                                src={getImagePreviewUrl(file)}
                                alt={file.original_name || file.name}
                                class="file-preview"
                                loading="lazy"
                            />
                        {:else}
                            <i class={getFileIcon(file)} />
                        {/if}
                    </div>
                    <div class="file-info">
                        <div class="file-name" title={file.original_name || file.name}>
                            {file.original_name || file.name}
                        </div>
                        <div class="file-meta">
                            {#if file.isDirectory}
                                <span class="txt-hint">Directory</span>
                            {:else}
                                <span class="txt-hint">{formatFileSize(file.size)}</span>
                                {#if file.mime}
                                    <span class="txt-hint">•</span>
                                    <span class="txt-hint">{file.mime.split('/')[1]?.toUpperCase()}</span>
                                {/if}
                                {#if file.protected}
                                    <span class="txt-hint">•</span>
                                    <span class="txt-warning">Protected</span>
                                {/if}
                            {/if}
                        </div>
                    </div>
                    <div class="file-actions">
                        <button
                            type="button"
                            class="btn btn-transparent btn-sm"
                            use:tooltip={{ text: "More actions" }}
                            on:click|stopPropagation
                        >
                            <i class="ri-more-line" />
                            <Toggler class="dropdown dropdown-right dropdown-nowrap">
                                <button
                                    type="button"
                                    class="dropdown-item closable"
                                    on:click|stopPropagation={() => copyFileId(file)}
                                >
                                    <i class="ri-clipboard-line" />
                                    <span class="txt">Copy ID</span>
                                </button>
                                <button
                                    type="button"
                                    class="dropdown-item closable"
                                    on:click|stopPropagation={() => copyFileUrl(file)}
                                >
                                    <i class="ri-link" />
                                    <span class="txt">Copy URL</span>
                                </button>
                                {#if file.created_by === ApiClient.authStore.record?.id || ApiClient.authStore.isSuperuser}
                                    <hr />
                                    <button
                                        type="button"
                                        class="dropdown-item txt-danger closable"
                                        on:click|stopPropagation={() => deleteFile(file)}
                                    >
                                        <i class="ri-delete-bin-7-line" />
                                        <span class="txt">Delete</span>
                                    </button>
                                {/if}
                            </Toggler>
                        </button>
                    </div>
                </div>
            {/each}
        </div>
    {/if}

    <svelte:fragment slot="footer">
        <div class="txt-sm txt-hint">
            {totalCount} file{totalCount !== 1 ? 's' : ''} total
        </div>
    </svelte:fragment>
</PageWrapper>

<PageFilesApiDocs bind:this={filesApiDocsPanel} />

<style>
    .files-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 1rem;
        padding: 1rem 0;
    }

    .file-item {
        display: flex;
        align-items: center;
        padding: 0.75rem;
        border: 1px solid var(--borderColor);
        border-radius: var(--borderRadius);
        background: var(--bodyColor);
        transition: all 0.2s ease;
        cursor: pointer;
    }

    .file-item:hover {
        background: var(--hoverColor);
        border-color: var(--primaryColor);
    }

    .file-item.directory {
        border-color: var(--primaryColor);
        background: rgba(var(--primaryColorRgb), 0.05);
    }

    .file-icon {
        font-size: 2rem;
        color: var(--txtHintColor);
        margin-right: 0.75rem;
        min-width: 2rem;
        text-align: center;
    }

    .file-item.directory .file-icon {
        color: var(--primaryColor);
    }

    .file-info {
        flex: 1;
        min-width: 0;
    }

    .file-name {
        font-weight: 500;
        color: var(--txtColor);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 0.25rem;
    }

    .file-meta {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.875rem;
        color: var(--txtHintColor);
    }

    .file-actions {
        opacity: 0;
        transition: opacity 0.2s ease;
    }

    .file-item:hover .file-actions {
        opacity: 1;
    }

    .breadcrumb-item.link {
        color: var(--primaryColor);
        cursor: pointer;
    }

    .breadcrumb-item.link:hover {
        text-decoration: underline;
    }

    .breadcrumb-item.current {
        color: var(--txtColor);
        font-weight: 500;
    }

    .breadcrumb-separator {
        color: var(--txtHintColor);
        margin: 0 0.25rem;
    }

    .file-preview {
        width: 2rem;
        height: 2rem;
        object-fit: cover;
        border-radius: 4px;
        background: var(--bodyColor);
    }

    .upload-progress {
        margin-top: 1rem;
        padding: 1rem;
        background: var(--bodyColor);
        border: 1px solid var(--borderColor);
        border-radius: var(--borderRadius);
    }

    .upload-progress-bar {
        width: 100%;
        height: 8px;
        background: var(--hoverColor);
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 0.5rem;
    }

    .upload-progress-fill {
        height: 100%;
        background: var(--primaryColor);
        border-radius: 4px;
        transition: width 0.3s ease;
    }

    .upload-progress-text {
        text-align: center;
        font-size: 0.875rem;
        color: var(--txtHintColor);
    }
</style>
