<script>
    import OverlayPanel from "@/components/base/OverlayPanel.svelte";

    const tabs = {
        upload: {
            label: "Upload",
            component: import("@/components/files/docs/UploadApiDocs.svelte"),
        },
        list: {
            label: "List",
            component: import("@/components/files/docs/ListApiDocs.svelte"),
        },
        view: {
            label: "View",
            component: import("@/components/files/docs/ViewApiDocs.svelte"),
        },
        delete: {
            label: "Delete",
            component: import("@/components/files/docs/DeleteApiDocs.svelte"),
        },
        download: {
            label: "Download",
            component: import("@/components/files/docs/DownloadApiDocs.svelte"),
        },
    };

    let docsPanel;
    let activeTab;

    // reset active tab on component init
    if (tabs) {
        activeTab = Object.keys(tabs)[0];
    }

    export function show() {
        changeTab(Object.keys(tabs)[0]);
        return docsPanel?.show();
    }

    export function hide() {
        return docsPanel?.hide();
    }

    export function changeTab(newTab) {
        activeTab = newTab;
    }
</script>

<OverlayPanel bind:this={docsPanel} on:hide on:show class="docs-panel">
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
    .docs-panel :global(.panel-content) {
        height: 80vh;
        max-height: 600px;
    }

    .docs-content-wrapper {
        display: flex;
        height: 100%;
        gap: 1rem;
    }

    .docs-sidebar {
        width: 200px;
        flex-shrink: 0;
        border-right: 1px solid var(--borderColor);
    }

    .sidebar-content {
        padding: 1rem 0;
    }

    .sidebar-item {
        display: block;
        width: 100%;
        padding: 0.5rem 1rem;
        text-align: left;
        background: none;
        border: none;
        color: var(--txtColor);
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .sidebar-item:hover {
        background: var(--hoverColor);
    }

    .sidebar-item.active {
        background: var(--primaryColor);
        color: white;
    }

    .docs-content {
        flex: 1;
        padding: 1rem;
        overflow-y: auto;
    }

    @media (max-width: 768px) {
        .docs-content-wrapper {
            flex-direction: column;
        }

        .docs-sidebar {
            width: 100%;
            border-right: none;
            border-bottom: 1px solid var(--borderColor);
        }

        .sidebar-content {
            display: flex;
            gap: 0.5rem;
            padding: 0.5rem;
            overflow-x: auto;
        }

        .sidebar-item {
            flex-shrink: 0;
            padding: 0.5rem 1rem;
            white-space: nowrap;
        }
    }
</style>
