<script>
    export let compact = false;

    let activeStep = 1;
    let viewMode = 'interactive'; // 'interactive' or 'grid'

    const steps = [
        {
            number: 1,
            title: "Go to Meta Accounts Center",
            icon: "🌐",
            actionText: "Open Accounts Center",
            actionUrl: "https://accountscenter.instagram.com/",
            summary: "Open Instagram in Meta Accounts Center or navigate via Instagram Settings.",
            details: "On your phone or web browser, go to Meta Accounts Center (`accountscenter.instagram.com`). You can also open the Instagram app -> go to your Profile -> tap the menu (≡) -> select **Settings and Privacy** -> **Accounts Center**.",
            badge: "Step 1 of 8",
            tip: "Ensure you are logged into the correct Instagram account."
        },
        {
            number: 2,
            title: "Click Your Information & Permissions",
            icon: "🛡️",
            summary: "Locate the Account Settings section inside Accounts Center.",
            details: "Scroll down to the **Account Settings** section and tap or click on **Your information and permissions**.",
            badge: "Step 2 of 8"
        },
        {
            number: 3,
            title: "Click Export Your Information",
            icon: "📥",
            summary: "Select the option to export or download your account data.",
            details: "Inside the permissions screen, click **Export your information** (or **Download your information**).",
            badge: "Step 3 of 8"
        },
        {
            number: 4,
            title: "Click Create Export",
            icon: "✨",
            summary: "Initiate a new data download request.",
            details: "Click the **Download or transfer information** / **Create export** button to start requesting your archive file.",
            badge: "Step 4 of 8"
        },
        {
            number: 5,
            title: "Select Your Instagram Account",
            icon: "👤",
            summary: "Choose the target profile if you have multiple linked accounts.",
            details: "If you have Facebook and Instagram accounts connected under Meta, place a checkmark next to your **Instagram account** and click **Next**.",
            badge: "Step 5 of 8"
        },
        {
            number: 6,
            title: "Select Export to Device",
            icon: "💻",
            summary: "Choose to download your file directly to your phone or computer.",
            details: "Select **Export to device** (or choose **All available information** / **Some of your information** depending on your choice).",
            badge: "Step 6 of 8"
        },
        {
            number: 7,
            title: "Select Date Range 'All Time' & Format 'JSON'",
            icon: "⚙️",
            summary: "IMPORTANT: Choose 'All time' date range & 'JSON' file format.",
            details: "Change **Date Range** to **'All time'** to get complete history. Then click **Format** and select **JSON** (Do NOT choose HTML, as Instaddict requires JSON format to parse your analytics).",
            badge: "Critical Step",
            isWarning: true,
            warningMessage: "⚠️ Must select JSON format (not HTML) for Instaddict to parse your data!"
        },
        {
            number: 8,
            title: "Start Export & Download File",
            icon: "📦",
            summary: "Submit request, wait for Meta notification, and download your file.",
            details: "Click **Create files** / **Start export**. Meta will process your request (takes a few minutes to an hour). You'll get an email/notification with a **Download** link when ready. Once downloaded, drop the `.ZIP` file into Instaddict!",
            badge: "Final Step",
            tip: "Keep the downloaded ZIP file safe on your local drive!"
        }
    ];

    function setStep(num) {
        activeStep = num;
    }

    function nextStep() {
        if (activeStep < steps.length) activeStep++;
    }

    function prevStep() {
        if (activeStep > 1) activeStep--;
    }
</script>

<div class="export-guide-container" class:compact>
    <div class="guide-header">
        <div class="title-group">
            <span class="guide-icon">📖</span>
            <div>
                <h2>How to Export Your Instagram Data</h2>
                <p class="sub-text">Follow this official step-by-step guide to download your raw Instagram data package directly from Meta.</p>
            </div>
        </div>

        <div class="view-toggle">
            <button 
                class="toggle-btn" 
                class:active={viewMode === 'interactive'} 
                on:click={() => viewMode = 'interactive'}
            >
                ⚡ Interactive Wizard
            </button>
            <button 
                class="toggle-btn" 
                class:active={viewMode === 'grid'} 
                on:click={() => viewMode = 'grid'}
            >
                📋 All Steps Grid
            </button>
        </div>
    </div>

    <!-- STEP NAVIGATION BAR -->
    <div class="step-nav-bar">
        {#each steps as step}
            <button 
                class="step-nav-pill" 
                class:active={activeStep === step.number}
                class:warning-pill={step.isWarning}
                on:click={() => { setStep(step.number); viewMode = 'interactive'; }}
            >
                <span class="pill-num">{step.number}</span>
                <span class="pill-title">{step.title.split(' ')[0]}</span>
            </button>
        {/each}
    </div>

    {#if viewMode === 'interactive'}
        <!-- INTERACTIVE SINGLE STEP CARD -->
        {#each steps as step}
            {#if activeStep === step.number}
                <div class="active-step-card" class:warning-card={step.isWarning}>
                    <div class="step-card-header">
                        <div class="step-badge-icon">
                            <span class="step-big-num">#{step.number}</span>
                            <span class="step-emoji">{step.icon}</span>
                        </div>
                        <div class="step-header-text">
                            <span class="meta-badge" class:warning-badge={step.isWarning}>{step.badge}</span>
                            <h3>{step.title}</h3>
                            <p class="summary-text">{step.summary}</p>
                        </div>
                    </div>

                    <div class="step-body">
                        <div class="details-box">
                            <p>{step.details}</p>
                        </div>

                        {#if step.isWarning}
                            <div class="warning-callout">
                                <span class="warn-icon">🚨</span>
                                <div class="warn-content">
                                    <strong>Format Requirement:</strong>
                                    <span>You <u>MUST</u> select <strong>JSON</strong> format during export. Instaddict cannot parse HTML format exports.</span>
                                </div>
                            </div>
                        {/if}

                        {#if step.tip}
                            <div class="tip-callout">
                                <span class="tip-icon">💡</span>
                                <span>{step.tip}</span>
                            </div>
                        {/if}

                        {#if step.actionUrl}
                            <div class="action-bar">
                                <a href={step.actionUrl} target="_blank" rel="noopener noreferrer" class="btn btn-action">
                                    <span>{step.actionText}</span>
                                    <span>↗</span>
                                </a>
                            </div>
                        {/if}
                    </div>

                    <!-- CARD CONTROLS -->
                    <div class="step-card-footer">
                        <button class="btn btn-nav" on:click={prevStep} disabled={activeStep === 1}>
                            ← Previous Step
                        </button>
                        <span class="step-indicator">Step {activeStep} of {steps.length}</span>
                        <button class="btn btn-nav btn-next" on:click={nextStep} disabled={activeStep === steps.length}>
                            Next Step →
                        </button>
                    </div>
                </div>
            {/if}
        {/each}
    {:else}
        <!-- GRID VIEW OF ALL STEPS -->
        <div class="steps-grid">
            {#each steps as step}
                <div class="grid-step-card" class:warning-card={step.isWarning}>
                    <div class="grid-card-head">
                        <span class="grid-step-num">{step.number}</span>
                        <span class="grid-icon">{step.icon}</span>
                        <h4>{step.title}</h4>
                    </div>
                    <p class="grid-details">{step.details}</p>

                    {#if step.isWarning}
                        <div class="grid-warn-tag">⚠️ Select JSON & All Time</div>
                    {/if}

                    {#if step.actionUrl}
                        <a href={step.actionUrl} target="_blank" rel="noopener noreferrer" class="grid-link">
                            {step.actionText} ↗
                        </a>
                    {/if}
                </div>
            {/each}
        </div>
    {/if}
</div>

<style lang="scss">
    .export-guide-container {
        background: rgba(18, 20, 29, 0.85);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        padding: 2rem;
        margin: 2rem 0;
        backdrop-filter: blur(16px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);

        &.compact {
            padding: 1.25rem;
            margin: 1rem 0;
        }
    }

    .guide-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
        gap: 1rem;

        .title-group {
            display: flex;
            align-items: center;
            gap: 1rem;

            .guide-icon {
                font-size: 2.2rem;
                background: rgba(225, 48, 108, 0.15);
                padding: 0.6rem;
                border-radius: 16px;
                border: 1px solid rgba(225, 48, 108, 0.3);
            }

            h2 {
                color: #ffffff;
                font-size: 1.4rem;
                margin: 0 0 0.2rem 0;
                font-weight: 700;
            }

            .sub-text {
                color: #94a3b8;
                font-size: 0.88rem;
                margin: 0;
            }
        }
    }

    .view-toggle {
        display: flex;
        background: rgba(10, 12, 18, 0.7);
        padding: 4px;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.08);

        .toggle-btn {
            background: transparent;
            border: none;
            color: #94a3b8;
            padding: 0.45rem 0.9rem;
            font-size: 0.8rem;
            font-weight: 600;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s ease;

            &.active {
                background: linear-gradient(135deg, #e1306c, #fd1d1d);
                color: #ffffff;
                box-shadow: 0 2px 8px rgba(225, 48, 108, 0.3);
            }

            &:hover:not(.active) {
                color: #ffffff;
            }
        }
    }

    .step-nav-bar {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
        overflow-x: auto;
        padding-bottom: 0.5rem;
        scrollbar-width: thin;

        .step-nav-pill {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: #94a3b8;
            padding: 0.4rem 0.8rem;
            border-radius: 10px;
            font-size: 0.8rem;
            display: flex;
            align-items: center;
            gap: 0.4rem;
            cursor: pointer;
            white-space: nowrap;
            transition: all 0.2s ease;

            .pill-num {
                background: rgba(255, 255, 255, 0.1);
                color: #ffffff;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                font-size: 0.75rem;
                font-weight: 700;
            }

            &.active {
                background: rgba(225, 48, 108, 0.2);
                border-color: #e1306c;
                color: #ffffff;

                .pill-num {
                    background: #e1306c;
                }
            }

            &.warning-pill.active {
                background: rgba(245, 158, 11, 0.2);
                border-color: #f59e0b;

                .pill-num {
                    background: #f59e0b;
                }
            }

            &:hover:not(.active) {
                background: rgba(255, 255, 255, 0.1);
                color: #ffffff;
            }
        }
    }

    .active-step-card {
        background: rgba(10, 12, 18, 0.6);
        border: 1px solid rgba(225, 48, 108, 0.3);
        border-radius: 16px;
        padding: 1.5rem;
        transition: all 0.3s ease;

        &.warning-card {
            border-color: rgba(245, 158, 11, 0.6);
            background: rgba(245, 158, 11, 0.05);
        }
    }

    .step-card-header {
        display: flex;
        gap: 1.2rem;
        align-items: flex-start;
        margin-bottom: 1.2rem;

        .step-badge-icon {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: rgba(225, 48, 108, 0.15);
            border: 1px solid rgba(225, 48, 108, 0.3);
            border-radius: 14px;
            padding: 0.8rem;
            min-width: 65px;

            .step-big-num {
                font-size: 0.75rem;
                font-weight: 800;
                color: #e1306c;
            }

            .step-emoji {
                font-size: 1.8rem;
                margin-top: 2px;
            }
        }

        .step-header-text {
            flex: 1;

            .meta-badge {
                display: inline-block;
                background: rgba(255, 255, 255, 0.08);
                color: #e1306c;
                font-size: 0.72rem;
                font-weight: 700;
                padding: 2px 8px;
                border-radius: 6px;
                text-transform: uppercase;
                margin-bottom: 0.3rem;

                &.warning-badge {
                    background: rgba(245, 158, 11, 0.2);
                    color: #fbbf24;
                }
            }

            h3 {
                color: #ffffff;
                font-size: 1.2rem;
                margin: 0 0 0.3rem 0;
            }

            .summary-text {
                color: #94a3b8;
                font-size: 0.9rem;
                margin: 0;
            }
        }
    }

    .step-body {
        background: rgba(255, 255, 255, 0.03);
        border-radius: 12px;
        padding: 1.2rem;
        margin-bottom: 1.2rem;
        border: 1px solid rgba(255, 255, 255, 0.05);

        .details-box p {
            color: #cbd5e1;
            font-size: 0.95rem;
            line-height: 1.6;
            margin: 0;

            :global(strong) {
                color: #ffffff;
            }
        }
    }

    .warning-callout {
        margin-top: 1rem;
        background: rgba(245, 158, 11, 0.15);
        border: 1px solid rgba(245, 158, 11, 0.4);
        border-radius: 10px;
        padding: 0.8rem 1rem;
        display: flex;
        gap: 0.8rem;
        align-items: flex-start;

        .warn-icon {
            font-size: 1.3rem;
        }

        .warn-content {
            color: #fef3c7;
            font-size: 0.88rem;
            line-height: 1.4;

            strong {
                color: #fbbf24;
            }
        }
    }

    .tip-callout {
        margin-top: 1rem;
        background: rgba(59, 130, 246, 0.15);
        border: 1px solid rgba(59, 130, 246, 0.3);
        border-radius: 10px;
        padding: 0.6rem 1rem;
        display: flex;
        gap: 0.6rem;
        align-items: center;
        color: #93c5fd;
        font-size: 0.85rem;
    }

    .action-bar {
        margin-top: 1.2rem;
    }

    .btn-action {
        background: linear-gradient(135deg, #e1306c, #fd1d1d);
        color: #ffffff;
        text-decoration: none;
        padding: 0.65rem 1.2rem;
        border-radius: 10px;
        font-weight: 700;
        font-size: 0.88rem;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        box-shadow: 0 4px 12px rgba(225, 48, 108, 0.3);
        transition: all 0.2s ease;

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(225, 48, 108, 0.4);
        }
    }

    .step-card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .step-indicator {
            color: #64748b;
            font-size: 0.82rem;
            font-weight: 600;
        }

        .btn-nav {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.12);
            color: #ffffff;
            padding: 0.5rem 1rem;
            border-radius: 10px;
            font-size: 0.85rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;

            &:disabled {
                opacity: 0.3;
                cursor: not-allowed;
            }

            &:hover:not(:disabled) {
                background: rgba(255, 255, 255, 0.15);
            }

            &.btn-next {
                background: rgba(225, 48, 108, 0.2);
                border-color: rgba(225, 48, 108, 0.4);
                color: #e1306c;

                &:hover:not(:disabled) {
                    background: rgba(225, 48, 108, 0.35);
                    color: #ffffff;
                }
            }
        }
    }

    /* GRID VIEW STYLES */
    .steps-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        gap: 1rem;
    }

    .grid-step-card {
        background: rgba(10, 12, 18, 0.6);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 14px;
        padding: 1.2rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        &.warning-card {
            border-color: rgba(245, 158, 11, 0.5);
            background: rgba(245, 158, 11, 0.06);
        }

        .grid-card-head {
            display: flex;
            align-items: center;
            gap: 0.6rem;
            margin-bottom: 0.8rem;

            .grid-step-num {
                background: rgba(225, 48, 108, 0.2);
                color: #e1306c;
                font-weight: 800;
                font-size: 0.8rem;
                padding: 2px 8px;
                border-radius: 6px;
            }

            .grid-icon {
                font-size: 1.3rem;
            }

            h4 {
                color: #ffffff;
                font-size: 0.95rem;
                margin: 0;
            }
        }

        .grid-details {
            color: #94a3b8;
            font-size: 0.85rem;
            line-height: 1.5;
            margin: 0 0 1rem 0;

            :global(strong) {
                color: #ffffff;
            }
        }

        .grid-warn-tag {
            background: rgba(245, 158, 11, 0.2);
            color: #fbbf24;
            padding: 4px 8px;
            border-radius: 6px;
            font-size: 0.75rem;
            font-weight: 700;
            margin-bottom: 0.6rem;
        }

        .grid-link {
            color: #e1306c;
            text-decoration: none;
            font-size: 0.82rem;
            font-weight: 700;

            &:hover {
                text-decoration: underline;
            }
        }
    }
</style>
