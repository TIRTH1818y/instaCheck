<script>
    import { navigate } from 'svelte-routing';
    import { processInstagramExport } from '../app/parser';
    import { data, loadTask, setDemoMode } from '../app/store';
    import ExportGuide from '../components/ExportGuide.svelte';

    let isScanning = false;
    let errorMessage = null;
    let scanSummary = null;

    async function handleZipFile(file) {
        if (!file) return;
        isScanning = true;
        errorMessage = null;

        try {
            const result = await processInstagramExport(file);
            scanSummary = result.summary;
            data.set(result.data);
            isScanning = false;
        } catch (err) {
            console.error('Import error:', err);
            errorMessage = err.message || 'Could not parse ZIP package. Please ensure it is a valid Instagram JSON export.';
            isScanning = false;
        }
    }

    async function handleFolderSelect(e) {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        isScanning = true;
        errorMessage = null;

        try {
            const result = await processInstagramExport(files);
            scanSummary = result.summary;
            data.set(result.data);
            isScanning = false;
        } catch (err) {
            console.error('Folder import error:', err);
            errorMessage = err.message || 'Could not parse extracted folder. Make sure it contains Instagram JSON files.';
            isScanning = false;
        }
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    async function handleDrop(e) {
        e.preventDefault();
        const items = e.dataTransfer.items;
        if (!items || items.length === 0) return;

        const item = items[0];
        if (item.kind === 'file') {
            const file = item.getAsFile();
            if (file && (file.name.endsWith('.zip') || file.type.includes('zip'))) {
                handleZipFile(file);
            } else {
                handleFolderSelect({ target: { files: e.dataTransfer.files } });
            }
        }
    }

    function launchDemo() {
        setDemoMode();
        navigate('/dashboard');
    }

    function goToDashboard() {
        navigate('/dashboard');
    }
</script>

<div class="import-page">
    <div class="import-hero">
        <div class="hero-badge">🔒 100% Local & Private Analysis</div>
        <h1 class="hero-title">Import Instagram Data Export</h1>
        <p class="hero-desc">
            Understand your account activity, connections, content, and security directly from your official Instagram data download.
            No passwords required. No server uploads.
        </p>
    </div>

    <!-- DROP ZONE -->
    <div
        class="drop-zone"
        class:scanning={isScanning}
        on:dragover={handleDragOver}
        on:drop={handleDrop}
    >
        <div class="drop-icon">📁</div>
        <h3>Drop your Instagram ZIP archive or extracted folder here</h3>
        <p class="drop-sub">Supports .ZIP files, extracted folders, and individual JSON files</p>

        <div class="drop-buttons">
            <label class="btn btn-primary">
                📦 Choose ZIP File
                <input type="file" accept=".zip" on:change={(e) => handleZipFile(e.target.files[0])} hidden />
            </label>

            <label class="btn btn-secondary">
                📂 Choose Extracted Folder
                <input type="file" webkitdirectory directory multiple on:change={handleFolderSelect} hidden />
            </label>
        </div>

        {#if isScanning}
            <div class="scanning-status">
                <div class="spinner"></div>
                <span>{$loadTask || 'Scanning export content...'}</span>
            </div>
        {/if}

        {#if errorMessage}
            <div class="error-box">{errorMessage}</div>
        {/if}
    </div>

    <!-- SCAN RESULTS SUMMARY -->
    {#if scanSummary}
        <div class="summary-card">
            <h2 class="summary-title">Import Complete 🎉</h2>
            <div class="metrics-grid">
                <div class="metric">
                    <span class="m-val">{scanSummary.totalFilesScanned}</span>
                    <span class="m-lbl">Files Scanned</span>
                </div>
                <div class="metric">
                    <span class="m-val">{scanSummary.jsonFilesCount}</span>
                    <span class="m-lbl">JSON Files</span>
                </div>
                <div class="metric">
                    <span class="m-val">{scanSummary.mediaFilesCount}</span>
                    <span class="m-lbl">Media Files</span>
                </div>
                <div class="metric">
                    <span class="m-val">{scanSummary.recordsAnalyzedCount.toLocaleString()}</span>
                    <span class="m-lbl">Records Analyzed</span>
                </div>
            </div>

            <div class="categories-breakdown">
                <div class="cat-column">
                    <h3>Detected Categories ({scanSummary.detectedCategories.length})</h3>
                    <ul class="cat-list detected">
                        {#each scanSummary.detectedCategories as cat}
                            <li>✓ {cat.name}</li>
                        {/each}
                    </ul>
                </div>

                <div class="cat-column">
                    <h3>Missing Categories ({scanSummary.missingCategories.length})</h3>
                    <ul class="cat-list missing">
                        {#each scanSummary.missingCategories as cat}
                            <li>- {cat.name}</li>
                        {/each}
                    </ul>
                </div>
            </div>

            <div class="summary-actions">
                <button class="btn btn-primary" on:click={goToDashboard}>
                    🚀 Launch Dashboard
                </button>
            </div>
        </div>
    {/if}

    <!-- DEMO ALTERNATIVE -->
    <div class="demo-box">
        <span>Don't have your Instagram ZIP ready?</span>
        <button class="btn btn-demo" on:click={launchDemo}>
            ✨ Try Interactive Demo Mode
        </button>
    </div>

    <!-- EXPORT GUIDE -->
    <ExportGuide />
</div>

<style lang="scss">
    .import-page {
        max-width: 900px;
        margin: 0 auto;
    }

    .import-hero {
        text-align: center;
        margin-bottom: 2rem;
    }

    .hero-badge {
        display: inline-block;
        background: rgba(225, 48, 108, 0.15);
        color: #e1306c;
        border: 1px solid rgba(225, 48, 108, 0.3);
        padding: 0.35rem 0.9rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 700;
        margin-bottom: 0.8rem;
    }

    .hero-title {
        font-size: 2.2rem;
        color: #ffffff;
        margin-bottom: 0.5rem;
    }

    .hero-desc {
        color: #94a3b8;
        font-size: 1rem;
        line-height: 1.6;
        max-width: 650px;
        margin: 0 auto;
    }

    .drop-zone {
        background: rgba(22, 25, 34, 0.6);
        border: 2px dashed rgba(225, 48, 108, 0.4);
        border-radius: 20px;
        padding: 3rem 2rem;
        text-align: center;
        backdrop-filter: blur(12px);
        transition: all 0.3s ease;
        margin-bottom: 2rem;

        &:hover {
            border-color: #e1306c;
            background: rgba(225, 48, 108, 0.08);
        }

        .drop-icon {
            font-size: 3.5rem;
            margin-bottom: 1rem;
        }

        h3 {
            color: #ffffff;
            font-size: 1.3rem;
            margin-bottom: 0.4rem;
        }

        .drop-sub {
            color: #94a3b8;
            font-size: 0.9rem;
            margin-bottom: 1.8rem;
        }
    }

    .drop-buttons {
        display: flex;
        justify-content: center;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .btn {
        padding: 0.75rem 1.4rem;
        border-radius: 12px;
        font-size: 0.9rem;
        font-weight: 700;
        cursor: pointer;
        border: none;
        transition: all 0.2s ease;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
    }

    .btn-primary {
        background: linear-gradient(135deg, #e1306c, #fd1d1d);
        color: #ffffff;
        box-shadow: 0 4px 15px rgba(225, 48, 108, 0.3);

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(225, 48, 108, 0.4);
        }
    }

    .btn-secondary {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.15);
        color: #ffffff;

        &:hover {
            background: rgba(255, 255, 255, 0.15);
            transform: translateY(-2px);
        }
    }

    .btn-demo {
        background: rgba(252, 176, 69, 0.15);
        border: 1px solid rgba(252, 176, 69, 0.4);
        color: #fcb045;

        &:hover {
            background: rgba(252, 176, 69, 0.25);
            transform: scale(1.03);
        }
    }

    .scanning-status {
        margin-top: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.8rem;
        color: #e1306c;
        font-weight: 600;
    }

    .spinner {
        width: 20px;
        height: 20px;
        border: 3px solid rgba(225, 48, 108, 0.2);
        border-top-color: #e1306c;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    .error-box {
        margin-top: 1.2rem;
        background: rgba(239, 68, 68, 0.15);
        border: 1px solid rgba(239, 68, 68, 0.3);
        color: #f87171;
        padding: 0.8rem 1rem;
        border-radius: 10px;
        font-size: 0.9rem;
    }

    .summary-card {
        background: rgba(22, 25, 34, 0.8);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        padding: 2rem;
        margin-bottom: 2rem;
    }

    .summary-title {
        color: #ffffff;
        font-size: 1.5rem;
        margin-bottom: 1.2rem;
        text-align: center;
    }

    .metrics-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
        margin-bottom: 2rem;

        @media (max-width: 600px) {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    .metric {
        background: rgba(13, 14, 18, 0.6);
        border-radius: 12px;
        padding: 1rem;
        text-align: center;
        border: 1px solid rgba(255, 255, 255, 0.05);

        .m-val {
            display: block;
            font-size: 1.5rem;
            font-weight: 800;
            color: #fcb045;
        }

        .m-lbl {
            font-size: 0.75rem;
            color: #94a3b8;
            text-transform: uppercase;
        }
    }

    .categories-breakdown {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
        margin-bottom: 1.5rem;

        @media (max-width: 600px) {
            grid-template-columns: 1fr;
        }
    }

    .cat-column {
        h3 {
            font-size: 0.95rem;
            color: #ffffff;
            margin-bottom: 0.8rem;
        }
    }

    .cat-list {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
            padding: 0.35rem 0.6rem;
            border-radius: 6px;
            font-size: 0.85rem;
            margin-bottom: 4px;
        }

        &.detected li {
            background: rgba(34, 197, 94, 0.12);
            color: #4ade80;
        }

        &.missing li {
            background: rgba(148, 163, 184, 0.1);
            color: #94a3b8;
        }
    }

    .summary-actions {
        text-align: center;
        margin-top: 1.5rem;
    }

    .demo-box {
        text-align: center;
        padding: 1.5rem;
        background: rgba(13, 14, 18, 0.5);
        border-radius: 14px;
        color: #94a3b8;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        flex-wrap: wrap;
    }
</style>
