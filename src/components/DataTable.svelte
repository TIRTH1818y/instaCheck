<script>
    export let items = [];
    export let columns = []; // [{ key: 'username', label: 'User' }, ...]
    export let title = '';
    export let searchPlaceholder = 'Search records...';

    let search = '';
    let currentPage = 1;
    let pageSize = 15;

    $: filteredItems = items.filter((item) => {
        if (!search) return true;
        const query = search.toLowerCase();
        return columns.some((col) => {
            const val = item[col.key];
            return val && String(val).toLowerCase().includes(query);
        });
    });

    $: totalPages = Math.ceil(filteredItems.length / pageSize) || 1;
    $: paginatedItems = filteredItems.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    function exportCsv() {
        if (!items || items.length === 0) return;
        const headers = columns.map((c) => c.label).join(',');
        const rows = items.map((item) =>
            columns.map((c) => `"${String(item[c.key] || '').replace(/"/g, '""')}"`).join(',')
        );
        const csvContent = [headers, ...rows].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title.toLowerCase().replace(/\s+/g, '_')}_export.csv`;
        a.click();
        URL.revokeObjectURL(url);
    }

    function exportJson() {
        if (!items || items.length === 0) return;
        const jsonStr = JSON.stringify(items, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title.toLowerCase().replace(/\s+/g, '_')}_export.json`;
        a.click();
        URL.revokeObjectURL(url);
    }
</script>

<div class="data-table-container">
    <div class="table-header">
        <div class="header-left">
            {#if title}<h3 class="table-title">{title}</h3>{/if}
            <span class="record-badge">{filteredItems.length.toLocaleString()} records</span>
        </div>
        <div class="header-right">
            <input
                type="text"
                bind:value={search}
                placeholder={searchPlaceholder}
                class="search-input"
            />
            <button class="export-btn" on:click={exportCsv}>📥 CSV</button>
            <button class="export-btn" on:click={exportJson}>📄 JSON</button>
        </div>
    </div>

    <div class="table-wrapper">
        <table>
            <thead>
                <tr>
                    {#each columns as col}
                        <th>{col.label}</th>
                    {/each}
                </tr>
            </thead>
            <tbody>
                {#if paginatedItems.length === 0}
                    <tr>
                        <td colspan={columns.length} class="empty-td">
                            No matching records found.
                        </td>
                    </tr>
                {:else}
                    {#each paginatedItems as row}
                        <tr>
                            {#each columns as col}
                                <td>
                                    {#if col.type === 'link' && row[col.key]}
                                        <a href={row[col.key]} target="_blank" rel="noopener noreferrer">
                                            {row[col.labelKey || col.key]}
                                        </a>
                                    {:else if col.type === 'image' && row[col.key]}
                                        <img src={row[col.key]} alt="preview" class="table-img-thumb" />
                                    {:else}
                                        {row[col.key] || '—'}
                                    {/if}
                                </td>
                            {/each}
                        </tr>
                    {/each}
                {/if}
            </tbody>
        </table>
    </div>

    {#if totalPages > 1}
        <div class="pagination">
            <button
                disabled={currentPage === 1}
                on:click={() => (currentPage -= 1)}
                class="page-btn"
            >
                Previous
            </button>
            <span class="page-info">Page {currentPage} of {totalPages}</span>
            <button
                disabled={currentPage === totalPages}
                on:click={() => (currentPage += 1)}
                class="page-btn"
            >
                Next
            </button>
        </div>
    {/if}
</div>

<style lang="scss">
    .data-table-container {
        background: rgba(22, 25, 34, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        padding: 1.2rem;
        margin-bottom: 1.5rem;
        backdrop-filter: blur(12px);
    }

    .table-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .header-left {
        display: flex;
        align-items: center;
        gap: 0.8rem;
    }

    .table-title {
        margin: 0;
        font-size: 1.2rem;
        color: #ffffff;
    }

    .record-badge {
        background: rgba(225, 48, 108, 0.15);
        color: #e1306c;
        border: 1px solid rgba(225, 48, 108, 0.3);
        padding: 0.2rem 0.6rem;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 700;
    }

    .header-right {
        display: flex;
        align-items: center;
        gap: 0.6rem;
    }

    .search-input {
        background: rgba(13, 14, 18, 0.8);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 8px;
        padding: 0.45rem 0.8rem;
        color: #ffffff;
        font-size: 0.85rem;
        outline: none;

        &:focus {
            border-color: #e1306c;
        }
    }

    .export-btn {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.15);
        color: #f1f5f9;
        padding: 0.45rem 0.75rem;
        border-radius: 8px;
        font-size: 0.8rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
            background: rgba(225, 48, 108, 0.2);
            border-color: rgba(225, 48, 108, 0.4);
        }
    }

    .table-wrapper {
        overflow-x: auto;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        text-align: left;
    }

    th {
        padding: 0.75rem 1rem;
        background: rgba(13, 14, 18, 0.5);
        color: #94a3b8;
        font-size: 0.78rem;
        font-weight: 700;
        text-transform: uppercase;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    td {
        padding: 0.75rem 1rem;
        color: #e2e8f0;
        font-size: 0.9rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    }

    tr:hover td {
        background: rgba(255, 255, 255, 0.02);
    }

    .empty-td {
        text-align: center;
        color: #64748b;
        padding: 2rem;
    }

    .table-img-thumb {
        width: 40px;
        height: 40px;
        object-fit: cover;
        border-radius: 6px;
    }

    .pagination {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 1rem;
        margin-top: 1rem;
        padding-top: 0.5rem;
    }

    .page-btn {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.15);
        color: #ffffff;
        padding: 0.4rem 0.8rem;
        border-radius: 6px;
        font-size: 0.8rem;
        cursor: pointer;

        &:disabled {
            opacity: 0.4;
            cursor: not-allowed;
        }

        &:hover:not(:disabled) {
            background: rgba(225, 48, 108, 0.2);
        }
    }

    .page-info {
        font-size: 0.82rem;
        color: #94a3b8;
    }
</style>
