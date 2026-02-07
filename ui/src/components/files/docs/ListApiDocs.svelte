<script>
    import ApiClient from "@/utils/ApiClient";
    import CommonHelper from "@/utils/CommonHelper";
    import CodeBlock from "@/components/base/CodeBlock.svelte";
    import SdkTabs from "@/components/base/SdkTabs.svelte";

    let responseTab = 200;
    let responses = [];

    $: backendAbsUrl = CommonHelper.getApiExampleUrl(ApiClient.baseURL);

    $: responses = [
        {
            code: 200,
            body: JSON.stringify(
                {
                    page: 1,
                    perPage: 30,
                    totalPages: 1,
                    totalItems: 2,
                    items: [
                        {
                            id: "f_abc123def456",
                            original_name: "example.jpg",
                            stored_name: "f_abc123def456.jpg",
                            mime: "image/jpeg",
                            size: 1024000,
                            protected: false,
                            created_by: "abc123",
                            created_at: "2024-01-01T10:00:00Z",
                            updated_at: "2024-01-01T10:00:00Z"
                        }
                    ]
                },
                null,
                2,
            ),
        },
    ];
</script>

<h3 class="m-b-sm">List Files</h3>
<div class="content txt-lg m-b-sm">
    <p>Fetch a paginated list of all standalone files.</p>
</div>

<SdkTabs
    js={`import PocketBase from 'pocketbase';

const pb = new PocketBase('${backendAbsUrl}');

const result = await pb.files.getList(1, 50, {
    filter: 'original_name ~ "image"',
});

console.log(result);
// { page: 1, perPage: 50, totalItems: 2, items: [...] }`}
    dart={`import 'package:pocketbase/pocketbase.dart';

final pb = PocketBase('${backendAbsUrl}');

final result = await pb.files.getList(
  page: 1,
  perPage: 50,
  filter: 'original_name ~ "image"',
);

print(result);
// { page: 1, perPage: 50, totalItems: 2, items: [...] }`}
/>

<h6 class="m-b-xs">API details</h6>
<div class="alert alert-info">
    <strong class="label label-primary">GET</strong>
    <div class="content">
        <p>/api/files</p>
    </div>
</div>

<div class="section-title">Query parameters</div>
<table class="table-compact table-border m-b-base">
    <thead>
        <tr>
            <th>Param</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>page</td>
            <td><span class="label">Number</span></td>
            <td>The page of the paginated list (default to 1).</td>
        </tr>
        <tr>
            <td>perPage</td>
            <td><span class="label">Number</span></td>
            <td>Max returned records per page (default to 30).</td>
        </tr>
        <tr>
            <td>filter</td>
            <td><span class="label">String</span></td>
            <td>Filter by file name. Ex.: <code>?filter=original_name~"image"</code></td>
        </tr>
    </tbody>
</table>

<div class="section-title">Responses</div>
<div class="tabs">
    <div class="tabs-header compact combined left">
        {#each responses as response (response.code)}
            <button
                type="button"
                class="tab-item"
                class:active={responseTab === response.code}
                on:click={() => (responseTab = response.code)}
            >
                {response.code}
            </button>
        {/each}
    </div>
    <div class="tabs-content">
        {#each responses as response (response.code)}
            <div class="tab-item" class:active={responseTab === response.code}>
                <CodeBlock content={response.body} />
            </div>
        {/each}
    </div>
</div>
