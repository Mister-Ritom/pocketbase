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
                    files: [
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
        {
            code: 400,
            body: `
                {
                  "status": 400,
                  "message": "Something went wrong while processing your request.",
                  "data": {}
                }
            `,
        },
        {
            code: 403,
            body: `
                {
                  "status": 403,
                  "message": "The request requires valid authorization token.",
                  "data": {}
                }
            `,
        },
        {
            code: 413,
            body: `
                {
                  "status": 413,
                  "message": "Request entity too large",
                  "data": {}
                }
            `,
        },
    ];
</script>

<h3 class="m-b-sm">Upload Files</h3>
<div class="content txt-lg m-b-sm">
    <p>
        Upload one or more files to create standalone file records.
        Files are stored independently and can be referenced by collections later.
    </p>
</div>

<SdkTabs
    js={`import PocketBase from 'pocketbase';

const pb = new PocketBase('${backendAbsUrl}');

// authenticate if needed
await pb.admins.authWithPassword('test@example.com', '123456');

// upload a single file
const formData = new FormData();
formData.append('files', fileInput.files[0]);

const result = await pb.files.upload(formData);

console.log(result);
// { files: [...] }`}
    dart={`import 'package:pocketbase/pocketbase.dart';

final pb = PocketBase('${backendAbsUrl}');

// authenticate if needed
await pb.admins.authWithPassword('test@example.com', '123456');

// upload a single file
final formData = FormData();
formData.files.add(MapEntry(
  'files',
  MultipartFile.fromBytes(
    'example.jpg',
    await file.readAsBytes(),
    filename: 'example.jpg',
  ),
));

final result = await pb.files.upload(formData);

print(result);
// { files: [...] }`}
/>

<h6 class="m-b-xs">API details</h6>
<div class="alert alert-info">
    <strong class="label label-primary">POST</strong>
    <div class="content">
        <p>/api/files/upload</p>
    </div>
    <p class="txt-hint txt-sm txt-right">Requires <code>Authorization:TOKEN</code> header</p>
</div>

<div class="section-title">Request body</div>
<div class="content m-b-base">
    <p>
        The request body should be a <code>multipart/form-data</code> with one or more files under the <code>files</code> field.
    </p>
    <CodeBlock
        content={`
            Content-Type: multipart/form-data; boundary=...

            --boundary
            Content-Disposition: form-data; name="files"; filename="example.jpg"
            Content-Type: image/jpeg

            ...file content...
            --boundary--
        `}
    />
</div>

<div class="section-title">Notes</div>
<div class="content m-b-base">
    <ul>
        <li>Files are uploaded with randomly generated IDs (prefixed with <code>f_</code>)</li>
        <li>Maximum file size is configurable in Settings → Files storage</li>
        <li>Files are not automatically associated with any collection</li>
        <li>Use the returned file IDs to reference files in collection records</li>
    </ul>
</div>

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
