<script>
    import CodeBlock from "@/components/base/CodeBlock.svelte";
</script>

<h3 class="m-b-sm">Delete Vector</h3>
<div class="content txt-lg m-b-sm">
    <p>Delete a vector by its ID.</p>
</div>

<h6 class="m-b-xs">API details</h6>
<div class="alert alert-danger">
    <strong class="label label-danger">DELETE</strong>
    <div class="content">
        <p>/api/vectors/{"{id}"}</p>
    </div>
</div>

<div class="section-title">Response</div>
<CodeBlock content={`204 No Content`} />

<div class="section-title">Example</div>
<CodeBlock content={`curl -X DELETE http://localhost:8090/api/vectors/vec1 \\
  -H "Authorization: Bearer YOUR_TOKEN"`} />
