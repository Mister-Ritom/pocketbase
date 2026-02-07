<script>
    import CodeBlock from "@/components/base/CodeBlock.svelte";
</script>

<h3 class="m-b-sm">Upsert Vectors</h3>
<div class="content txt-lg m-b-sm">
    <p>Add or update vectors in the database.</p>
</div>

<h6 class="m-b-xs">API details</h6>
<div class="alert alert-success">
    <strong class="label label-primary">POST</strong>
    <div class="content">
        <p>/api/vectors/upsert</p>
    </div>
</div>

<div class="section-title">Body Parameters</div>
<table class="table-compact table-border m-b-base">
    <thead>
        <tr>
            <th>Param</th>
            <th>Type</th>
            <th width="50%">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <div class="inline-flex">
                    <span class="label label-success">Required</span>
                    <span>vectors</span>
                </div>
            </td>
            <td>
                <span class="label">Array</span>
            </td>
            <td>Array of vector objects to upsert</td>
        </tr>
    </tbody>
</table>

<div class="section-title">Request Body</div>
<CodeBlock content={`{
  "vectors": [
    {
      "id": "string",
      "type": "text|image|video|file",
      "embedding": [0.1, 0.2, 0.3],
      "metadata": {
        "tags": ["example"],
        "source": "api"
      }
    }
  ]
}`} />

<div class="section-title">Response</div>
<CodeBlock content={`{
  "message": "Vectors upserted successfully",
  "count": 1
}`} />

<div class="section-title">Example</div>
<CodeBlock content={`curl -X POST http://localhost:8090/api/vectors/upsert \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "vectors": [
      {
        "id": "vec1",
        "type": "text",
        "embedding": [0.1, 0.2, 0.3],
        "metadata": {"tags": ["flutter"]}
      }
    ]
  }'`} />
