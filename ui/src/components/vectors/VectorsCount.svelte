<script>
    export let totalCount = 0;

    export function updateCount(count) {
        totalCount = count;
    }
</script>

<span>
    {totalCount} vector{totalCount !== 1 ? 's' : ''} total
</span>
