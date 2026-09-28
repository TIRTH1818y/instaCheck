<script>
    import { data, restoreFromLocalStorage, setDemoMode } from '../app/store';
    import { downloadCsvReport, downloadJsonReport, printPdfReport } from '../app/reportGenerator';
    import { onMount } from 'svelte';

    onMount(() => {
        if (!$data) {
            const restored = restoreFromLocalStorage();
            if (!restored) setDemoMode();
        }
    });

    function handlePdf() {
        printPdfReport($data);
    }

    function handleCsv() {
        downloadCsvReport($data);
    }

    function handleJson() {
        downloadJsonReport($data);
    }
</script>

<div class="reports-page">
    <div class="header-box">
        <div>
            <h1 class="title">Export Reports Generator</h1>
            <p class="desc">Generate comprehensive PDF, CSV, or JSON summary reports based on your analyzed data.</p>
        </div>
        <div class="stat-badge">Report Center</div>
    </div>

    <div class="report-options-grid">
        <div class="option-card" on:click={handlePdf}>
            <div class="opt-icon">📄</div>
            <h3>Printable PDF Report</h3>
            <p>Full formatted report containing profile overview, connection metrics, activity totals, and privacy checklist.</p>
            <button class="btn btn-pdf">🖨️ Generate PDF</button>
        </div>

        <div class="option-card" on:click={handleCsv}>
            <div class="opt-icon">📊</div>
            <h3>Spreadsheet CSV Summary</h3>
            <p>Download categorized metrics in tabular CSV format compatible with Excel, Google Sheets, or Apple Numbers.</p>
            <button class="btn btn-csv">📥 Download CSV</button>
        </div>

        <div class="option-card" on:click={handleJson}>
            <div class="opt-icon">💾</div>
            <h3>Full Normalized JSON</h3>
            <p>Export the complete normalized internal data object model for developer analysis or archiving.</p>
            <button class="btn btn-json">📄 Export JSON</button>
        </div>
    </div>
</div>

<style lang="scss">
    .reports-page {
        max-width: 1100px;
        margin: 0 auto;
    }

    .header-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 2rem;
        flex-wrap: wrap;
        gap: 1rem;
    }

    .title {
        font-size: 2rem;
        color: #ffffff;
        margin-bottom: 0.3rem;
    }

    .desc {
        color: #94a3b8;
        font-size: 0.95rem;
    }

    .stat-badge {
        background: linear-gradient(135deg, #e1306c, #fd1d1d);
        color: #ffffff;
        padding: 0.6rem 1.2rem;
        border-radius: 20px;
        font-weight: 800;
        font-size: 0.95rem;
        box-shadow: 0 4px 15px rgba(225, 48, 108, 0.3);
    }

    .report-options-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;

        @media (max-width: 900px) {
            grid-template-columns: 1fr;
        }
    }

    .option-card {
        background: rgba(22, 25, 34, 0.75);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 20px;
        padding: 2rem 1.5rem;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
            transform: translateY(-5px);
            border-color: rgba(225, 48, 108, 0.4);
            box-shadow: 0 10px 30px rgba(225, 48, 108, 0.2);
        }

        .opt-icon { font-size: 3.5rem; margin-bottom: 1rem; }

        h3 { color: #ffffff; font-size: 1.3rem; margin-bottom: 0.5rem; }

        p { color: #94a3b8; font-size: 0.88rem; line-height: 1.5; margin-bottom: 1.5rem; }
    }

    .btn {
        padding: 0.7rem 1.2rem;
        border-radius: 10px;
        font-size: 0.88rem;
        font-weight: 700;
        border: none;
        cursor: pointer;
        transition: all 0.2s ease;
        width: 100%;
    }

    .btn-pdf {
        background: linear-gradient(135deg, #e1306c, #fd1d1d);
        color: #ffffff;
    }

    .btn-csv {
        background: linear-gradient(135deg, #38bdf8, #0284c7);
        color: #ffffff;
    }

    .btn-json {
        background: linear-gradient(135deg, #833ab4, #e1306c);
        color: #ffffff;
    }
</style>
