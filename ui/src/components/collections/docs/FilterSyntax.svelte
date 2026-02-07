<script>
    let expanded = false;

    function toggle() {
        expanded = !expanded;
    }
</script>

<button class="btn btn-sm btn-secondary m-t-10" on:click={toggle}>
    {#if expanded}
        <span class="txt">Hide details</span>
        <i class="ri-arrow-up-s-line" />
    {:else}
        <span class="txt">Show details</span>
        <i class="ri-arrow-down-s-line" />
    {/if}
</button>

{#if expanded}
    <p>
        The syntax basically follows the format
        <code>
            <span class="txt-success">OPERAND</span>
            <span class="txt-danger">OPERATOR</span>
            <span class="txt-success">OPERAND</span></code
        >, where:
    </p>
    <ul>
        <li>
            <code class="txt-success">OPERAND</code> - could be any of the above field literal, string (single
            or double quoted), number, null, true, false
        </li>
        <li>
            <code class="txt-danger">OPERATOR</code> - is one of:
            <br />
            <ul>
                <li>
                    <code class="filter-op">{"="}</code>
                    <span class="txt">Equal</span>
                </li>
                <li>
                    <code class="filter-op">{"!="}</code>
                    <span class="txt">NOT equal</span>
                </li>
                <li>
                    <code class="filter-op">{">"}</code>
                    <span class="txt">Greater than</span>
                </li>
                <li>
                    <code class="filter-op">{">="}</code>
                    <span class="txt">Greater than or equal</span>
                </li>
                <li>
                    <code class="filter-op">{"<"}</code>
                    <span class="txt">Less than</span>
                </li>
                <li>
                    <code class="filter-op">{"<="}</code>
                    <span class="txt">Less than or equal</span>
                </li>
                <li>
                    <code class="filter-op">{"~"}</code>
                    <span class="txt">
                        Like/Contains (if not specified auto wraps the right string OPERAND in a "%" for
                        wildcard match)
                    </span>
                </li>
                <li>
                    <code class="filter-op">{"!~"}</code>
                    <span class="txt">
                        NOT Like/Contains (if not specified auto wraps the right string OPERAND in a "%" for
                        wildcard match)
                    </span>
                </li>

                <li>
                    <code class="filter-op">{"?="}</code>
                    <em class="txt-hint">Any/At least one of</em>
                    <span class="txt">Equal</span>
                </li>
                <li>
                    <code class="filter-op">{"?!="}</code>
                    <em class="txt-hint">Any/At least one of</em>
                    <span class="txt">NOT equal</span>
                </li>
                <li>
                    <code class="filter-op">{"?>"}</code>
                    <em class="txt-hint">Any/At least one of</em>
                    <span class="txt">Greater than</span>
                </li>
                <li>
                    <code class="filter-op">{"?>="}</code>
                    <em class="txt-hint">Any/At least one of</em>
                    <span class="txt">Greater than or equal</span>
                </li>
                <li>
                    <code class="filter-op">{"?<"}</code>
                    <em class="txt-hint">Any/At least one of</em>
                    <span class="txt">Less than</span>
                </li>
                <li>
                    <code class="filter-op">{"?<="}</code>
                    <em class="txt-hint">Any/At least one of</em>
                    <span class="txt">Less than or equal</span>
                </li>
                <li>
                    <code class="filter-op">{"?~"}</code>
                    <em class="txt-hint">Any/At least one of</em>
                    <span class="txt">
                        Like/Contains (if not specified auto wraps the right string OPERAND in a "%" for
                        wildcard match)
                    </span>
                </li>
                <li>
                    <code class="filter-op">{"?!~"}</code>
                    <em class="txt-hint">Any/At least one of</em>
                    <span class="txt">
                        NOT Like/Contains (if not specified auto wraps the right string OPERAND in a "%" for
                        wildcard match)
                    </span>
                </li>

                <!-- Array Operators -->
                <li>
                    <code class="filter-op">{"contains"}</code>
                    <span class="txt">Array/string contains value</span>
                </li>
                <li>
                    <code class="filter-op">{"containsAny"}</code>
                    <span class="txt">Array contains any of the values</span>
                </li>
                <li>
                    <code class="filter-op">{"containsAll"}</code>
                    <span class="txt">Array contains all of the values</span>
                </li>
                <li>
                    <code class="filter-op">{"notContains"}</code>
                    <span class="txt">Array/string does not contain value</span>
                </li>

                <!-- Text Operators -->
                <li>
                    <code class="filter-op">{"startsWith"}</code>
                    <span class="txt">String starts with prefix</span>
                </li>
                <li>
                    <code class="filter-op">{"endsWith"}</code>
                    <span class="txt">String ends with suffix</span>
                </li>
                <li>
                    <code class="filter-op">{"regex"}</code>
                    <span class="txt">String matches regex pattern</span>
                </li>

                <!-- Length Operators -->
                <li>
                    <code class="filter-op">{"lengthGt"}</code>
                    <span class="txt">Array/string length greater than</span>
                </li>
                <li>
                    <code class="filter-op">{"lengthLt"}</code>
                    <span class="txt">Array/string length less than</span>
                </li>
            </ul>
        </li>
    </ul>

    <p>
        To group and combine several expressions you could use brackets
        <code>(...)</code>, <code>&&</code> (AND) and <code>||</code> (OR) tokens.
    </p>
{/if}

<style>
    .filter-op {
        display: inline-block;
        vertical-align: top;
        margin-right: 5px;
        width: 30px;
        text-align: center;
        padding-left: 0;
        padding-right: 0;
    }
</style>
