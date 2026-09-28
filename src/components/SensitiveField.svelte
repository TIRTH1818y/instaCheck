<script>
    import { privacyMasked } from '../app/store';

    export let label = 'Sensitive Information';
    export let value = '';
    export let type = 'text'; // 'email' | 'phone' | 'location' | 'text'

    let localRevealed = false;

    $: isMasked = $privacyMasked && !localRevealed;

    function maskValue(val, valType) {
        if (!val) return 'N/A';
        if (valType === 'email') {
            const parts = val.split('@');
            if (parts.length === 2) {
                return parts[0][0] + '***@' + parts[1];
            }
            return '***@***.com';
        } else if (valType === 'phone') {
            return '******' + val.slice(-4);
        } else if (valType === 'location') {
            return 'XX.XXXX, YY.YYYY (Masked)';
        }
        return '********';
    }

    function toggleReveal() {
        localRevealed = !localRevealed;
    }
</script>

<div class="sensitive-field">
    <div class="field-label">{label}</div>
    <div class="field-value-container">
        <span class="field-value" class:masked={isMasked}>
            {isMasked ? maskValue(value, type) : (value || 'N/A')}
        </span>
        {#if value}
            <button class="reveal-btn" on:click={toggleReveal}>
                {isMasked ? '👁️ Show sensitive information' : '🔒 Hide'}
            </button>
        {/if}
    </div>
</div>

<style lang="scss">
    .sensitive-field {
        background: rgba(22, 25, 34, 0.6);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 12px;
        padding: 0.9rem 1.1rem;
        margin-bottom: 0.8rem;
    }

    .field-label {
        font-size: 0.78rem;
        font-weight: 700;
        color: #94a3b8;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 0.35rem;
    }

    .field-value-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }

    .field-value {
        font-size: 1.05rem;
        font-weight: 600;
        color: #ffffff;
        word-break: break-all;

        &.masked {
            color: #fbbf24;
            font-family: monospace;
            letter-spacing: 0.05em;
        }
    }

    .reveal-btn {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.15);
        color: #e2e8f0;
        padding: 0.4rem 0.8rem;
        border-radius: 8px;
        font-size: 0.78rem;
        font-weight: 600;
        cursor: pointer;
        white-space: nowrap;
        transition: all 0.2s ease;

        &:hover {
            background: rgba(225, 48, 108, 0.2);
            border-color: rgba(225, 48, 108, 0.4);
            color: #ffffff;
        }
    }
</style>
