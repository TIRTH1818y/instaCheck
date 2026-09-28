<script>
    import { link } from 'svelte-routing';

    export let title = 'No Data Found';
    export let message = 'Your Instagram export does not contain information for this section.';
    export let icon = '📂';
</script>

<div class="empty-state-box">
    <div class="empty-icon">{icon}</div>
    <h2 class="empty-title">{title}</h2>
    <p class="empty-message">{message}</p>
    <div class="empty-actions">
        <a href="/dashboard" use:link class="btn btn-primary">
            🏠 Back to Dashboard
        </a>
        <a href="/data-explorer" use:link class="btn btn-secondary">
            🗂️ Open Data Explorer
        </a>
    </div>
</div>

<style lang="scss">
    .empty-state-box {
        text-align: center;
        padding: 4rem 2rem;
        background: rgba(22, 25, 34, 0.5);
        border: 1px dashed rgba(255, 255, 255, 0.12);
        border-radius: 20px;
        max-width: 600px;
        margin: 3rem auto;
        backdrop-filter: blur(10px);
    }

    .empty-icon {
        font-size: 3.5rem;
        margin-bottom: 1rem;
    }

    .empty-title {
        font-size: 1.5rem;
        font-weight: 800;
        color: #ffffff;
        margin-bottom: 0.5rem;
    }

    .empty-message {
        font-size: 0.95rem;
        color: #94a3b8;
        line-height: 1.6;
        margin-bottom: 2rem;
    }

    .empty-actions {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .btn {
        padding: 0.75rem 1.4rem;
        border-radius: 12px;
        font-size: 0.9rem;
        font-weight: 700;
        text-decoration: none;
        transition: all 0.2s ease;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
    }

    .btn-primary {
        background: linear-gradient(135deg, #e1306c, #fd1d1d);
        color: #ffffff !important;
        box-shadow: 0 4px 15px rgba(225, 48, 108, 0.3);

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(225, 48, 108, 0.4);
        }
    }

    .btn-secondary {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.15);
        color: #f1f5f9 !important;

        &:hover {
            background: rgba(255, 255, 255, 0.15);
            transform: translateY(-2px);
        }
    }
</style>
