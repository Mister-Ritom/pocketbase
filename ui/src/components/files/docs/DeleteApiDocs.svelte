<script>
    import ApiClient from "@/utils/ApiClient";
    import CommonHelper from "@/utils/CommonHelper";
    import CodeBlock from "@/components/base/CodeBlock.svelte";
    import SdkTabs from "@/components/base/SdkTabs.svelte";

    let responseTab = 204;
    let responses = [];

    $: backendAbsUrl = CommonHelper.getApiExampleUrl(ApiClient.baseURL);

    $: responses = [
        {
            code: 204,
            body: "",
        },
        {
            code: 403,
            body: `{
  "status": 403,
  "message": "You don't have permission to delete this file",
  "data": {}
}`,
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

<h3 class="m-b-sm">Delete File</h3>
<div class="content txt-lg m-b-sm">
    <p>Delete a file by its ID. Only the file owner or superusers can delete files.</p>
</div>

<SdkTabs
    js={`import PocketBase from 'pocketbase';

const pb = new PocketBase('${backendAbsUrl}');

// authenticate if needed
await pb.admins.authWithPassword('test@example.com', '123456');

await pb.files.delete('f_abc123def456');
// file deleted`}
    dart={`import 'package:pocketbase/pocketbase.dart';

final pb = PocketBase('${backendAbsUrl}');

// authenticate if needed
await pb.admins.authWithPassword('test@example.com', '123456');

await pb.files.delete('f_abc123def456');
// file deleted`}
/>

<h6 class="m-b-xs">API details</h6>
<div class="alert alert-info">
    <strong class="label label-primary">DELETE</strong>
    <div class="content">
        <p>/api/files/&#123;id&#125;</p>
    </div>
    <p class="txt-hint txt-sm txt-right">Requires <code>Authorization:TOKEN</code> header</p>
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
