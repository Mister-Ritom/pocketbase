<script>
    import { tick } from "svelte";
    import { querystring } from "svelte-spa-router";
    import CommonHelper from "@/utils/CommonHelper";
    import tooltip from "@/actions/tooltip";
    import PageWrapper from "@/components/base/PageWrapper.svelte";
    import RefreshButton from "@/components/base/RefreshButton.svelte";
    import Searchbar from "@/components/base/Searchbar.svelte";
    import VectorDocsPanel from "@/components/vectors/VectorDocsPanel.svelte";
    import VectorUpsertPanel from "@/components/vectors/VectorUpsertPanel.svelte";
    import VectorsList from "@/components/vectors/VectorsList.svelte";
    import VectorsCount from "@/components/vectors/VectorsCount.svelte";
    import VectorSearchPanel from "@/components/vectors/VectorSearchPanel.svelte";
    import { hideControls, pageTitle } from "@/stores/app";

    let vectorUpsertPanel;
    let vectorDocsPanel;
    let vectorSearchPanel;
    let vectorsList;
    let vectorsCount;
    let totalCount = 0;

    function handleSearchSimilar(event) {
        console.log("[PageVectors] handleSearchSimilar called with event:", event);
        console.log("[PageVectors] event type:", typeof event);
        console.log("[PageVectors] event keys:", Object.keys(event));
        console.log("[PageVectors] event detail property exists:", 'detail' in event);
        console.log("[PageVectors] event.detail value:", event.detail);
        console.log("[PageVectors] event.detail type:", typeof event.detail);
        if (event.detail) {
            console.log("[PageVectors] event.detail keys:", Object.keys(event.detail));
            console.log("[PageVectors] event.detail values:", JSON.stringify(event.detail));
        }
        const eventDetail = event.detail;
        console.log("[PageVectors] eventDetail:", eventDetail);

        if (!eventDetail) {
            console.error("[PageVectors] No event detail provided");
            alert("Error: No vector data provided for similarity search.");
            return;
        }

        if (!eventDetail.embedding) {
            console.error("[PageVectors] No embedding in event detail, detail:", eventDetail);
            alert("Error: Vector has no embedding data for similarity search.");
            return;
        }

        if (!eventDetail.type) {
            console.error("[PageVectors] No type in event detail, detail:", eventDetail);
            alert("Error: Vector type not specified for similarity search.");
            return;
        }

        console.log("[PageVectors] Opening search panel with embedding:", eventDetail.embedding?.length, "dimensions, type:", eventDetail.type);

        // Open search panel with the vector's embedding
        vectorSearchPanel?.show();
        // Pass the embedding data to search for similar vectors
        // We'll need to modify the search panel to accept pre-loaded embedding
        setTimeout(() => {
            try {
                vectorSearchPanel?.performSearchWithEmbedding(eventDetail.embedding, eventDetail.type);
                console.log("[PageVectors] Search initiated successfully");
            } catch (error) {
                console.error("[PageVectors] Error performing search:", error);
                alert("Error: Failed to perform similarity search.");
            }
        }, 100);
    }

    $: $pageTitle = "Vectors";
</script>

<PageWrapper class="flex-content">
    <header class="page-header">
        <nav class="breadcrumbs">
            <div class="breadcrumb-item">Vectors</div>
        </nav>

        <div class="inline-flex gap-5">
            <RefreshButton
                on:refresh={() => {
                    vectorsList?.load();
                    vectorsCount?.reload();
                }}
            />
        </div>

        <div class="btns-group">
            <button
                type="button"
                class="btn btn-outline"
                on:click={() => vectorSearchPanel?.show()}
            >
                <i class="ri-search-line" />
                <span class="txt">Search Similar</span>
            </button>

            <button
                type="button"
                class="btn btn-outline"
                on:click={() => vectorDocsPanel?.show()}
            >
                <i class="ri-code-s-slash-line" />
                <span class="txt">API Preview</span>
            </button>

            <button type="button" class="btn btn-expanded" on:click={() => vectorUpsertPanel?.show()}>
                <i class="ri-add-line" />
                <span class="txt">New Vector</span>
            </button>
        </div>
    </header>

    <Searchbar
        value=""
        placeholder="Search vectors..."
        on:submit={(e) => {
            // TODO: Implement search
        }}
    />

    <div class="clearfix m-b-sm" />

    <VectorsList
        bind:this={vectorsList}
        on:select={(e) => {
            vectorUpsertPanel?.show(e.detail);
        }}
        on:delete={() => {
            vectorsList?.load();
        }}
        on:new={() => vectorUpsertPanel?.show()}
        on:countUpdated={(e) => {
            vectorsCount?.updateCount(e.detail.count);
        }}
    />

    <svelte:fragment slot="footer">
        <VectorsCount
            bind:this={vectorsCount}
            class="m-r-auto txt-sm txt-hint"
            bind:totalCount
        />
    </svelte:fragment>
</PageWrapper>

    <VectorUpsertPanel
        bind:this={vectorUpsertPanel}
        on:save={() => {
            // Delay the reload slightly to avoid auto-cancellation
            setTimeout(() => {
                vectorsList?.load();
            }, 100);
        }}
        on:searchSimilar={handleSearchSimilar}
    />

<VectorDocsPanel
    bind:this={vectorDocsPanel}
/>

<VectorSearchPanel
    bind:this={vectorSearchPanel}
/>
