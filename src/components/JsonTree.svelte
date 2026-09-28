<script>
    export let node = null; // { name, isFolder, children, content, path }

    let expanded = false;
    let selectedFile = null;
    let searchFilter = '';
    let copySuccess = false;

    function toggleExpand(targetNode) {
        if (targetNode.isFolder) {
            targetNode.expanded = !targetNode.expanded;
            node = { ...node }; // trigger reactivity
        } else {
            selectedFile = targetNode;
        }
    }

    function copyToClipboard() {
        if (!selectedFile || !selectedFile.content) return;
        navigator.clipboard.writeText(
            typeof selectedFile.content === 'string'
                ? selectedFile.content
                : JSON.stringify(selectedFile.content, null, 2)
        );
        copySuccess = true;
        setTimeout(() => (copySuccess = false), 2000);
    }

    function downloadFile() {
        if (!selectedFile || !selectedFile.content) return;
        const text =
            typeof selectedFile.content === 'string'
                ? selectedFile.content
                : JSON.stringify(selectedFile.content, null, 2);
        const blob = new Blob([text], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = selectedFile.name || 'data.json';
        a.click();
        URL.revokeObjectURL(url);
    }
</script>

<div class="json-explorer-layout">
    <!-- LEFT SIDE: FOLDER & FILE TREE -->
    <div class="tree-sidebar">
        <div class="tree-title">📂 Export File Explorer</div>
        {#if !node || !node.children || node.children.length === 0}
            <div class="tree-empty">No files loaded in Explorer.</div>
        {:else}
            <div class="tree-nodes">
                {#each node.children as child}
                    <div class="tree-node">
                        <div
                            class="node-label"
                            class:is-active={selectedFile && selectedFile.path === child.path}
                            on:click={() => toggleExpand(child)}
                        >
                            <span class="node-icon">{child.isFolder ? (child.expanded ? '📂' : '📁') : '📄'}</span>
                            <span class="node-name">{child.name}</span>
                        </div>

                        {#if child.isFolder && child.expanded && child.children}
                            <div class="node-children">
                                {#each child.children as subChild}
                                    <div
                                        class="node-label sub-label"
                                        class:is-active={selectedFile && selectedFile.path === subChild.path}
                                        on:click={() => toggleExpand(subChild)}
                                    >
                                        <span class="node-icon">{subChild.isFolder ? (subChild.expanded ? '📂' : '📁') : '📄'}</span>
                                        <span class="node-name">{subChild.name}</span>
                                    </div>
                                    {#if subChild.isFolder && subChild.expanded && subChild.children}
                                        <div class="node-children">
                                            {#each subChild.children as leaf}
                                                <div
                                                    class="node-label leaf-label"
                                                    class:is-active={selectedFile && selectedFile.path === leaf.path}
                                                    on:click={() => toggleExpand(leaf)}
                                                >
                                                    <span class="node-icon">📄</span>
                                                    <span class="node-name">{leaf.name}</span>
                                                </div>
                                            {/each}
                                        </div>
                                    {/if}
                                {/each}
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        {/if}
    </div>

    <!-- RIGHT SIDE: PRETTY JSON VIEWER -->
    <div class="json-viewer-content">
        {#if !selectedFile}
            <div class="viewer-placeholder">
                <span class="placeholder-icon">🗂️</span>
                <h3>Select a JSON file from the left tree</h3>
                <p>Browse raw exported Instagram files, search JSON content, and inspect missing or unknown categories.</p>
            </div>
        {:else}
            <div class="viewer-header">
                <div class="viewer-file-info">
                    <span class="file-icon">📄</span>
                    <div>
                        <div class="file-name">{selectedFile.name}</div>
                        <div class="file-path">{selectedFile.path}</div>
                    </div>
                </div>
                <div class="viewer-actions">
                    <button class="action-btn" on:click={copyToClipboard}>
                        {copySuccess ? '✓ Copied!' : '📋 Copy JSON'}
                    </button>
                    <button class="action-btn" on:click={downloadFile}>
                        📥 Download JSON
                    </button>
                </div>
            </div>

            <div class="json-pre-box">
                <pre>{typeof selectedFile.content === 'string' ? selectedFile.content : JSON.stringify(selectedFile.content, null, 2)}</pre>
            </div>
        {/if}
    </div>
</div>

<style lang="scss">
    .json-explorer-layout {
        display: grid;
        grid-template-columns: 320px 1fr;
        gap: 1.2rem;
        min-height: 600px;

        @media (max-width: 900px) {
            grid-template-columns: 1fr;
        }
    }

    .tree-sidebar {
        background: rgba(13, 14, 18, 0.85);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        padding: 1rem;
        max-height: 700px;
        overflow-y: auto;
    }

    .tree-title {
        font-size: 0.85rem;
        font-weight: 800;
        color: #94a3b8;
        text-transform: uppercase;
        margin-bottom: 0.8rem;
        padding-bottom: 0.4rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .tree-empty {
        color: #64748b;
        font-size: 0.85rem;
        padding: 1rem;
        text-align: center;
    }

    .node-label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.45rem 0.6rem;
        border-radius: 8px;
        cursor: pointer;
        font-size: 0.88rem;
        color: #cbd5e1;
        transition: all 0.2s ease;

        &:hover {
            background: rgba(225, 48, 108, 0.12);
            color: #ffffff;
        }

        &.is-active {
            background: rgba(225, 48, 108, 0.25);
            color: #ffffff;
            font-weight: 700;
        }
    }

    .node-children {
        padding-left: 1rem;
    }

    .sub-label {
        font-size: 0.82rem;
    }

    .leaf-label {
        font-size: 0.8rem;
    }

    .json-viewer-content {
        background: rgba(22, 25, 34, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        padding: 1.2rem;
        display: flex;
        flex-direction: column;
        backdrop-filter: blur(12px);
    }

    .viewer-placeholder {
        margin: auto;
        text-align: center;
        color: #94a3b8;
        padding: 3rem 1rem;

        .placeholder-icon {
            font-size: 3rem;
            display: block;
            margin-bottom: 0.8rem;
        }

        h3 {
            color: #ffffff;
            margin-bottom: 0.5rem;
        }

        p {
            max-width: 400px;
            margin: auto;
            font-size: 0.9rem;
            line-height: 1.5;
        }
    }

    .viewer-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 1rem;
        margin-bottom: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        flex-wrap: wrap;
        gap: 1rem;
    }

    .viewer-file-info {
        display: flex;
        align-items: center;
        gap: 0.8rem;
    }

    .file-icon {
        font-size: 1.8rem;
    }

    .file-name {
        font-size: 1.1rem;
        font-weight: 700;
        color: #ffffff;
    }

    .file-path {
        font-size: 0.78rem;
        color: #94a3b8;
        font-family: monospace;
    }

    .viewer-actions {
        display: flex;
        gap: 0.6rem;
    }

    .action-btn {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.15);
        color: #ffffff;
        padding: 0.45rem 0.8rem;
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

    .json-pre-box {
        background: rgba(13, 14, 18, 0.9);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 10px;
        padding: 1rem;
        max-height: 600px;
        overflow: auto;

        pre {
            margin: 0;
            font-family: 'Consolas', 'Fira Code', monospace;
            font-size: 0.85rem;
            color: #38bdf8;
            white-space: pre-wrap;
            word-break: break-all;
        }
    }
</style>
