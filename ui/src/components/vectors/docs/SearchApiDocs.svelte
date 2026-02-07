<script>
    import CodeBlock from "@/components/base/CodeBlock.svelte";
</script>

<h3 class="m-b-sm">Search Vectors</h3>
<div class="content txt-lg m-b-sm">
    <p>Search for similar vectors using cosine similarity.</p>
</div>

<h6 class="m-b-xs">API details</h6>
<div class="alert alert-success">
    <strong class="label label-primary">POST</strong>
    <div class="content">
        <p>/api/vectors/search</p>
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
                    <span>embedding</span>
                </div>
            </td>
            <td>
                <span class="label">Array</span>
            </td>
            <td>Vector embedding to search for</td>
        </tr>
        <tr>
            <td>
                <div class="inline-flex">
                    <span class="label label-warning">Optional</span>
                    <span>top</span>
                </div>
            </td>
            <td>
                <span class="label">Number</span>
            </td>
            <td>Number of results to return (default: 10, max: 100)</td>
        </tr>
        <tr>
            <td>
                <div class="inline-flex">
                    <span class="label label-warning">Optional</span>
                    <span>type</span>
                </div>
            </td>
            <td>
                <span class="label">String</span>
            </td>
            <td>Filter by vector type</td>
        </tr>
    </tbody>
</table>

<div class="section-title">Request Body</div>
<CodeBlock content={`{
  "embedding": [0.1, 0.2, 0.3],
  "top": 10,
  "type": "text"
}`} />

<div class="section-title">Response</div>
<CodeBlock content={`{
  "results": [
    {
      "id": "vec1",
      "score": 0.95,
      "ref_id": null
    }
  ]
}`} />

<div class="section-title">Example</div>
<CodeBlock content={`curl -X POST http://localhost:8090/api/vectors/search \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "embedding": [0.1, 0.2, 0.3],
    "top": 10,
    "type": "text"
  }'`} />
