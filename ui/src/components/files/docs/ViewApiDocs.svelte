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
                    id: "f_abc123def456",
                    original_name: "example.jpg",
                    stored_name: "f_abc123def456.jpg",
                    mime: "image/jpeg",
                    size: 1024000,
                    protected: false,
                    created_by: "abc123",
                    created_at: "2024-01-01T10:00:00Z",
                    updated_at: "2024-01-01T10:00:00Z"
                },
                null,
                2,
            ),
        },
        {
            code: 404,
            body: `{
  "status": 404,
  "message": "The requested resource wasn't found.",
  "data": {}
}`,
        },
    ];
</script>

<h3 class="m-b-sm">View File</h3>
<div class="content txt-lg m-b-sm">
    <p>Get detailed information about a specific file by its ID.</p>
</div>

<SdkTabs
    js={`import PocketBase from 'pocketbase';

const pb = new PocketBase('${backendAbsUrl}');

const file = await pb.files.getOne('f_abc123def456');

console.log(file);
// { id: "f_abc123def456", original_name: "example.jpg", ... }`}
    dart={`import 'package:pocketbase/pocketbase.dart';

final pb = PocketBase('${backendAbsUrl}');

final file = await pb.files.getOne('f_abc123def456');

print(file);
// { id: "f_abc123def456", original_name: "example.jpg", ... }`}
/>

<h6 class="m-b-xs">API details</h6>
<div class="alert alert-info">
    <strong class="label label-primary">GET</strong>
    <div class="content">
        <p>/api/files/&#123;id&#125;</p>
    </div>
</div>

<div class="section-title">Path parameters</div>
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
            <td>id</td>
            <td><span class="label">String</span></td>
            <td>The file ID (required).</td>
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
