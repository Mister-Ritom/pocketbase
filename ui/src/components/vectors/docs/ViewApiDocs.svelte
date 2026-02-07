<script>
    import CodeBlock from "@/components/base/CodeBlock.svelte";
</script>

<h3 class="m-b-sm">View Vector</h3>
<div class="content txt-lg m-b-sm">
    <p>Get a vector by its ID.</p>
</div>

<h6 class="m-b-xs">API details</h6>
<div class="alert alert-success">
    <strong class="label label-primary">GET</strong>
    <div class="content">
        <p>/api/vectors/{"{id}"}</p>
    </div>
</div>

<div class="section-title">Response</div>
<CodeBlock content={`{
  "id": "vec1",
  "type": "text",
  "ref_id": null,
  "embedding": [0.1, 0.2, 0.3],
  "metadata": {
    "tags": ["flutter"]
  },
  "created_at": "2024-01-01T00:00:00Z"
}`} />

<div class="section-title">Example</div>
<CodeBlock content={`curl -X GET http://localhost:8090/api/vectors/vec1 \\
  -H "Authorization: Bearer YOUR_TOKEN"`} />
