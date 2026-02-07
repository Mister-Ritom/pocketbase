<script>
    import { onMount } from "svelte";
    import { createEventDispatcher } from "svelte";
    import { querystring } from "svelte-spa-router";
    import CommonHelper from "@/utils/CommonHelper";
    import tooltip from "@/actions/tooltip";
    import Scroller from "@/components/base/Scroller.svelte";
    import ApiClient from "@/utils/ApiClient";

    export let collection = null; // We'll use a mock collection for vectors
    export let filter = "";
    export let sort = "-created";

    const dispatch = createEventDispatcher();
    const perPage = 40;

    let scrollWrapper;
    let records = [];
    let currentPage = 1;
    let lastTotal = 0;
    let totalItems = 0;
    let isLoading = false;
    let yieldedRecordsId = 0;

    $: canLoadMore = lastTotal >= perPage;

    onMount(() => {
        load();
    });

    // Mock collection for vectors
    $: mockCollection = {
        id: "_vectors",
        name: "Vectors",
        type: "base",
        fields: [
            {
                id: "id",
                name: "id",
                type: "text",
                required: true,
                system: true,
            },
            {
                id: "type",
                name: "type",
                type: "select",
                required: true,
                options: {
                    values: ["text", "image", "video", "file"],
                },
            },
            {
                id: "embedding",
                name: "embedding",
                type: "json",
                required: true,
            },
            {
                id: "metadata",
                name: "metadata",
                type: "json",
            },
            {
                id: "created",
                name: "created",
                type: "autodate",
                system: true,
            },
        ],
    };

    // Load vectors from API with pagination
    export async function load(page = 1, breakTasks = true) {
        console.log("[VectorsList] Loading vectors page", page);
        isLoading = true;

        try {
            const response = await ApiClient.send("/api/vectors", {
                method: "GET",
                query: {
                    page: page,
                    perPage: perPage,
                    sort: sort,
                    filter: filter,
                    skipTotal: page > 1 ? 1 : 0, // Skip total count for subsequent pages
                },
            });

            console.log("[VectorsList] API response for page", page, ":", response);

            if (page <= 1) {
                clearList();
            }

            currentPage = response.page || page;
            lastTotal = response.items?.length || 0;
            totalItems = response.totalItems || totalItems;

            // Optimize the records listing by rendering the rows in task batches
            if (breakTasks && response.items?.length) {
                const currentYieldId = ++yieldedRecordsId;
                while (response.items?.length) {
                    if (yieldedRecordsId != currentYieldId) {
                        break; // new yield has been started
                    }

                    const subset = response.items.splice(0, 20);
                    for (let item of subset) {
                        CommonHelper.pushOrReplaceByKey(records, item);
                    }
                    records = records;

                    await CommonHelper.yieldToMain();
                }
            } else {
                for (let item of response.items || []) {
                    CommonHelper.pushOrReplaceByKey(records, item);
                }
                records = records;
            }

            console.log("[VectorsList] Loaded page", page, "with", lastTotal, "vectors, total so far:", records.length);

            // Notify parent about the count
            dispatch('countUpdated', { count: totalItems });
        } catch (err) {
            // Handle auto-cancelled requests gracefully
            if (err.isAbort) {
                console.log("[VectorsList] Request was auto-cancelled, ignoring");
                return;
            }

            console.error("[VectorsList] Failed to load vectors:", err);
            console.error("[VectorsList] Error details:", {
                message: err.message,
                status: err.status,
                response: err.response
            });

            if (page <= 1) {
                records = [];
                totalItems = 0;
            }
        } finally {
            isLoading = false;
        }
    }

    function clearList() {
        scrollWrapper?.resetVerticalScroll();
        records = [];
        currentPage = 1;
        lastTotal = 0;
    }



    export async function reloadLoadedPages() {
        const loadedPages = currentPage;

        for (let i = 1; i <= loadedPages; i++) {
            if (i === 1 || canLoadMore) {
                await load(i, false);
            }
        }
    }

    export function hasRecord(id) {
        return records.some(r => r.id === id);
    }

    function formatEmbedding(embedding) {
        if (!Array.isArray(embedding) || embedding.length === 0) return "Empty";
        if (embedding.length <= 5) return `[${embedding.map(v => v.toFixed(3)).join(", ")}]`;
        return `[${embedding.slice(0, 3).map(v => v.toFixed(3)).join(", ")}, ..., ${embedding.length} total]`;
    }
</script>

{#if isLoading}
    <div class="text-center p-lg">
        <span class="loader" />
        <div class="txt-hint m-t-sm">Loading vectors...</div>
    </div>
{:else if records.length === 0}
    <div class="text-center p-lg">
        <div class="icon icon-lg txt-hint m-b-base">
            <i class="ri-search-line" />
        </div>
        <h3 class="txt-hint">No vectors found</h3>
        <p class="txt-hint">Create your first vector to get started.</p>
        <button
            type="button"
            class="btn btn-primary m-t-base"
            on:click={() => dispatch('new')}
        >
            <i class="ri-add-line" />
            <span class="txt">Create vector</span>
        </button>
    </div>
{:else}
    <Scroller bind:this={scrollWrapper} class="table-wrapper">
        <table class="table" class:table-loading={isLoading}>
            <thead>
                <tr>
                    <th class="table-header">ID</th>
                    <th class="table-header">Type</th>
                    <th class="table-header">Embedding Preview</th>
                    <th class="table-header">Created</th>
                    <th class="table-header min-width">Actions</th>
                </tr>
            </thead>
            <tbody>
                {#each records as record (!isLoading ? record.id : record)}
                    <tr class="table-row">
                        <td class="table-cell">
                            <button
                                class="link-hint"
                                on:click={() => dispatch('select', record)}
                            >
                                {record.id}
                            </button>
                        </td>
                        <td class="table-cell">
                            <div class="type-cell">
                                <span class="badge badge-sm">
                                    {record.type}
                                </span>
                                {#if record.type === 'image' && record.metadata?.previewUrl}
                                    <div class="mini-preview">
                                        <img src={record.metadata.previewUrl} alt="Preview" class="mini-image" />
                                    </div>
                                {:else if record.type === 'text' && record.metadata?.content}
                                    <div class="text-snippet">
                                        {record.metadata.content.length > 30 ? record.metadata.content.substring(0, 30) + '...' : record.metadata.content}
                                    </div>
                                {/if}
                            </div>
                        </td>
                        <td class="table-cell">
                            <code class="txt-sm">
                                {formatEmbedding(record.embedding)}
                            </code>
                        </td>
                        <td class="table-cell txt-hint">
                            {new Date(record.created || record.created_at).toLocaleString()}
                        </td>
                        <td class="table-cell min-width">
                            <button
                                type="button"
                                class="btn btn-transparent btn-sm"
                                use:tooltip={{ text: "Edit" }}
                                on:click={() => dispatch('select', record)}
                            >
                                <i class="ri-edit-line" />
                            </button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>

        {#if records.length && canLoadMore}
            <div class="load-more-container">
                <button
                    class="btn btn-expanded-lg btn-secondary btn-horizontal-sticky"
                    disabled={isLoading}
                    class:btn-loading={isLoading}
                    on:click|preventDefault={() => load(currentPage + 1)}
                >
                    <span class="txt">Load more</span>
                </button>
            </div>
        {/if}
    </Scroller>
{/if}

<style>
    .records-table {
        background: var(--bodyColor);
        border: 1px solid var(--borderColor);
        border-radius: var(--borderRadius);
        overflow: hidden;
    }

    .table {
        width: 100%;
        border-collapse: collapse;
    }

    .table-head {
        background: var(--hoverColor);
    }

    .table-header {
        padding: 1rem;
        text-align: left;
        font-weight: 600;
        color: var(--txtColor);
        border-bottom: 1px solid var(--borderColor);
    }

    .table-body {
        background: var(--bodyColor);
    }

    .table-row {
        border-bottom: 1px solid var(--borderColor);
    }

    .table-row:hover {
        background: var(--hoverColor);
    }

    .table-cell {
        padding: 1rem;
        vertical-align: middle;
    }

    .badge {
        display: inline-block;
        padding: 0.25rem 0.5rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--txtColor);
        background: var(--bodyColor);
        border: 1px solid var(--borderColor);
        border-radius: 4px;
    }

    .badge-sm {
        font-size: 0.7rem;
        padding: 0.2rem 0.4rem;
    }

    .link-hint {
        color: var(--primaryColor);
        text-decoration: none;
        cursor: pointer;
    }

    .link-hint:hover {
        text-decoration: underline;
    }

    .txt-sm {
        font-size: 0.875rem;
    }

    .txt-hint {
        color: var(--txtHintColor);
    }

    .type-cell {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .mini-preview {
        margin-top: 0.25rem;
    }

    .mini-image {
        width: 60px;
        height: 40px;
        object-fit: cover;
        border-radius: 4px;
        border: 1px solid var(--borderColor);
    }

    .text-snippet {
        font-size: 0.75rem;
        color: var(--txtHintColor);
        font-style: italic;
        margin-top: 0.25rem;
    }
</style>
