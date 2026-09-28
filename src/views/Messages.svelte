<script>
    import { data, restoreFromLocalStorage, setDemoMode } from '../app/store';
    import EmptyState from '../components/EmptyState.svelte';
    import { onMount } from 'svelte';

    onMount(() => {
        if (!$data) {
            const restored = restoreFromLocalStorage();
            if (!restored) setDemoMode();
        }
    });

    $: messagesData = $data?.messages || { conversations: [], totalConversations: 0, totalMessages: 0 };
    let selectedConv = null;

    $: if (messagesData.conversations && messagesData.conversations.length > 0 && !selectedConv) {
        selectedConv = messagesData.conversations[0];
    }

    function selectConversation(conv) {
        selectedConv = conv;
    }
</script>

<div class="messages-page">
    <div class="header-box">
        <div>
            <h1 class="title">Messages & Conversations</h1>
            <p class="desc">Direct message inbox analysis and chat history.</p>
        </div>
        <div class="stat-badge">{(messagesData.totalMessages || 0).toLocaleString()} Total Messages</div>
    </div>

    {#if !messagesData.conversations || messagesData.conversations.length === 0}
        <EmptyState title="Message Data Not Found" message="Message data was not included in this export package." icon="✈️" />
    {:else}
        <div class="messages-layout">
            <!-- CONVERSATIONS LIST -->
            <div class="conv-sidebar">
                <div class="sidebar-title">Inbox Conversations ({messagesData.totalConversations})</div>
                <div class="conv-list">
                    {#each messagesData.conversations as conv}
                        <div
                            class="conv-item"
                            class:active={selectedConv && selectedConv.id === conv.id}
                            on:click={() => selectConversation(conv)}
                        >
                            <div class="conv-avatar">{conv.title[0].toUpperCase()}</div>
                            <div class="conv-info">
                                <div class="conv-name">{conv.title}</div>
                                <div class="conv-sub">{conv.messageCount} messages ({conv.sentCount} sent)</div>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>

            <!-- CHAT VIEWER -->
            <div class="chat-viewer">
                {#if !selectedConv}
                    <div class="chat-placeholder">Select a conversation from the left to view messages.</div>
                {:else}
                    <div class="chat-header">
                        <h2>{selectedConv.title}</h2>
                        <span class="chat-meta">{selectedConv.messageCount} messages total</span>
                    </div>

                    <div class="messages-scroll">
                        {#each selectedConv.messages as msg}
                            <div class="msg-row" class:sent={msg.isSent}>
                                <div class="msg-bubble">
                                    <div class="msg-sender">{msg.sender}</div>
                                    <div class="msg-text">{msg.content}</div>
                                    {#if msg.mediaUrl}
                                        <img src={msg.mediaUrl} alt="attachment" class="msg-attachment" />
                                    {/if}
                                    <div class="msg-time">{msg.dateStr}</div>
                                </div>
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
    {/if}
</div>

<style lang="scss">
    .messages-page {
        max-width: 1200px;
        margin: 0 auto;
    }

    .header-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1.5rem;
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
        background: linear-gradient(135deg, #e1306c, #833ab4);
        color: #ffffff;
        padding: 0.6rem 1.2rem;
        border-radius: 20px;
        font-weight: 800;
        font-size: 0.95rem;
        box-shadow: 0 4px 15px rgba(225, 48, 108, 0.3);
    }

    .messages-layout {
        display: grid;
        grid-template-columns: 320px 1fr;
        gap: 1.2rem;
        min-height: 600px;

        @media (max-width: 900px) {
            grid-template-columns: 1fr;
        }
    }

    .conv-sidebar {
        background: rgba(13, 14, 18, 0.85);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        padding: 1rem;
        max-height: 700px;
        overflow-y: auto;
    }

    .sidebar-title {
        font-size: 0.82rem;
        font-weight: 800;
        color: #94a3b8;
        text-transform: uppercase;
        margin-bottom: 0.8rem;
        padding-bottom: 0.4rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .conv-list {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
    }

    .conv-item {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        padding: 0.65rem;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
            background: rgba(225, 48, 108, 0.12);
        }

        &.active {
            background: rgba(225, 48, 108, 0.25);
            border: 1px solid rgba(225, 48, 108, 0.4);
        }
    }

    .conv-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: linear-gradient(135deg, #833ab4, #e1306c);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        font-weight: 800;
        font-size: 1rem;
    }

    .conv-info {
        display: flex;
        flex-direction: column;
    }

    .conv-name {
        color: #ffffff;
        font-weight: 700;
        font-size: 0.9rem;
    }

    .conv-sub {
        color: #94a3b8;
        font-size: 0.75rem;
    }

    .chat-viewer {
        background: rgba(22, 25, 34, 0.75);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        padding: 1.2rem;
        display: flex;
        flex-direction: column;
        backdrop-filter: blur(12px);
    }

    .chat-placeholder {
        margin: auto;
        color: #64748b;
        font-size: 0.95rem;
    }

    .chat-header {
        padding-bottom: 0.8rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;

        h2 { color: #ffffff; font-size: 1.3rem; margin: 0; }
        .chat-meta { color: #94a3b8; font-size: 0.8rem; }
    }

    .messages-scroll {
        flex: 1;
        max-height: 550px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
        padding-right: 0.4rem;
    }

    .msg-row {
        display: flex;
        justify-content: flex-start;

        &.sent {
            justify-content: flex-end;
            .msg-bubble {
                background: linear-gradient(135deg, #e1306c, #fd1d1d);
                color: #ffffff;
            }
        }
    }

    .msg-bubble {
        background: rgba(13, 14, 18, 0.8);
        border-radius: 14px;
        padding: 0.7rem 1rem;
        max-width: 70%;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

    .msg-sender {
        font-size: 0.72rem;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: 0.2rem;
    }

    .msg-text {
        font-size: 0.9rem;
        line-height: 1.4;
        word-break: break-word;
    }

    .msg-attachment {
        max-width: 100%;
        border-radius: 8px;
        margin-top: 0.4rem;
    }

    .msg-time {
        font-size: 0.65rem;
        color: rgba(255, 255, 255, 0.6);
        margin-top: 0.3rem;
        text-align: right;
    }
</style>
