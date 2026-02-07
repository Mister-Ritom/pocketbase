<script>
    import OverlayPanel from "@/components/base/OverlayPanel.svelte";

    const tabs = {
        upsert: {
            label: "Upsert",
            component: import("@/components/vectors/docs/UpsertApiDocs.svelte"),
        },
        search: {
            label: "Search",
            component: import("@/components/vectors/docs/SearchApiDocs.svelte"),
        },
        view: {
            label: "View",
            component: import("@/components/vectors/docs/ViewApiDocs.svelte"),
        },
        delete: {
            label: "Delete",
            component: import("@/components/vectors/docs/DeleteApiDocs.svelte"),
        },
    };

    let docsPanel;
    let activeTab = "upsert";

    export function show() {
        docsPanel?.show();
    }

    export function hide() {
        docsPanel?.hide();
    }

    function changeTab(newTab) {
        activeTab = newTab;
    }
</script>

<OverlayPanel bind:this={docsPanel} class="docs-panel" on:hide on:show>
    <div class="docs-content-wrapper">
        <aside class="docs-sidebar">
            <nav class="sidebar-content">
                {#each Object.entries(tabs) as [key, tab] (key)}
                    <button
                        type="button"
                        class="sidebar-item"
                        class:active={activeTab === key}
                        on:click={() => changeTab(key)}
                    >
                        {tab.label}
                    </button>
                {/each}
            </nav>
        </aside>

        <div class="docs-content">
            {#each Object.entries(tabs) as [key, tab] (key)}
                {#if activeTab === key}
                    {#await tab.component then { default: TabComponent }}
                        <TabComponent />
                    {/await}
                {/if}
            {/each}
        </div>
    </div>

    <!-- visible only on small screens -->
    <svelte:fragment slot="footer">
        <button type="button" class="btn btn-transparent" on:click={() => hide()}>
            <span class="txt">Close</span>
        </button>
    </svelte:fragment>
</OverlayPanel>

<style>
    .api-docs {
        max-height: 70vh;
        overflow-y: auto;
    }

    .api-section {
        margin-bottom: 2rem;
    }

    .api-section h4 {
        margin-bottom: 1rem;
        color: var(--txtColor);
        border-bottom: 1px solid var(--borderColor);
        padding-bottom: 0.5rem;
    }

    .endpoint {
        margin-bottom: 1.5rem;
        padding: 1rem;
        background: var(--hoverColor);
        border-radius: var(--borderRadius);
        border-left: 4px solid var(--primaryColor);
    }

    .endpoint .method {
        background: var(--successColor);
        color: white;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: 500;
        min-width: 60px;
        text-align: center;
        display: inline-block;
        margin-right: 1rem;
    }

    .endpoint .path {
        font-family: monospace;
        font-weight: 500;
        color: var(--primaryColor);
        margin-right: 1rem;
    }

    .endpoint .description {
        color: var(--txtColor);
        margin-bottom: 0.5rem;
    }

    .endpoint .example {
        margin-top: 0.5rem;
    }

    .endpoint .example pre {
        background: var(--codeBgColor);
        border: 1px solid var(--borderColor);
        border-radius: var(--borderRadius);
        padding: 1rem;
        margin-top: 0.5rem;
        overflow-x: auto;
        white-space: pre-wrap;
        word-break: break-all;
    }

    .endpoint .example code {
        font-family: monospace;
        font-size: 0.875rem;
        color: var(--txtColor);
    }

    .api-section pre {
        background: var(--codeBgColor);
        border: 1px solid var(--borderColor);
        border-radius: var(--borderRadius);
        padding: 1rem;
        overflow-x: auto;
    }

    .api-section code {
        font-family: monospace;
        font-size: 0.875rem;
        color: var(--txtColor);
    }
</style>
