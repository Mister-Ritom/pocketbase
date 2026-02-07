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
            body: "// File content (binary data)",
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

<h3 class="m-b-sm">Download File</h3>
<div class="content txt-lg m-b-sm">
    <p>Download a file by its ID and filename.</p>
</div>

<SdkTabs
    js={`import PocketBase from 'pocketbase';

const pb = new PocketBase('${backendAbsUrl}');

// download file
const fileUrl = pb.files.getUrl('f_abc123def456', 'example.jpg');
console.log(fileUrl);
// http://localhost:8090/api/files/f_abc123def456/example.jpg`}
    dart={`import 'package:pocketbase/pocketbase.dart';

final pb = PocketBase('${backendAbsUrl}');

// download file
final fileUrl = pb.files.getUrl('f_abc123def456', 'example.jpg');
print(fileUrl);
// http://localhost:8090/api/files/f_abc123def456/example.jpg`}
/>

<h6 class="m-b-xs">API details</h6>
<div class="alert alert-info">
    <strong class="label label-primary">GET</strong>
    <div class="content">
        <p>/api/files/&#123;id&#125;/&#123;filename&#125;</p>
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
        <tr>
            <td>filename</td>
            <td><span class="label">String</span></td>
            <td>The stored filename (required).</td>
        </tr>
    </tbody>
</table>

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
            <td>token</td>
            <td><span class="label">String</span></td>
            <td>Access token for protected files.</td>
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
