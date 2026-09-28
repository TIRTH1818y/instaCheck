<script>
    export let svg;
    export let strokeWidth = 2;
    export let strokeLinecap = 'round';
    export let strokeLinejoin = 'round';
    export let count = null;
    export let content = null;
    export let explanation = null;
    export let thirdColor = false;

    const htmlContent = content ?
        content.includes('%') ? content.split('%')[0] + '<span class="text-discord" class="'+(thirdColor && 'third-count')+'">' + (count !== null ? count.toLocaleString('en-US') : 'N/A') + '</span>' + content.split('%')[1] : content
        : null;
</script>

<div class="fact-wrapper">
    <div class="fun-fact">
        <div class="icon-badge">
            <slot name="icon">
                <svg class="{thirdColor ? 'third-svg' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap={strokeLinecap} stroke-linejoin={strokeLinejoin} stroke-width={strokeWidth} d="{ svg }"></path></svg>
            </slot>
        </div>
        <slot name="content">
            <h3 class="fact-content">{ @html htmlContent }</h3>
        </slot>
    </div>
    <slot name="explanation">
        {#if explanation && !isNaN(count)}
            <small class="fact-explanation">{ explanation }</small>
        {:else if !count && content}
            <small class="fact-explanation unavailable">This data is not available...</small>
        {/if}
    </slot>
</div>

<style>
    .fact-wrapper {
        margin-bottom: 1rem;
        padding: 0.6rem 0.8rem;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.02);
        transition: background 0.2s ease;
    }

    .fact-wrapper:hover {
        background: rgba(255, 255, 255, 0.05);
    }

    .fun-fact {
        display: flex;
        align-items: center;
    }

    .icon-badge {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem;
        border-radius: 10px;
        background: rgba(225, 48, 108, 0.12);
        border: 1px solid rgba(225, 48, 108, 0.2);
        margin-right: 0.8rem;
        flex-shrink: 0;
    }

    .fact-content {
        margin: 0;
        font-size: 1rem;
        font-weight: 500;
        color: #e2e8f0;
        line-height: 1.4;
    }

    .fact-explanation {
        display: block;
        margin-top: 0.4rem;
        margin-left: 3.3rem;
        color: #94a3b8;
        font-size: 0.85rem;
    }

    .fact-explanation.unavailable {
        color: #64748b;
        font-style: italic;
    }
</style>

