<script>
    import { link } from 'svelte-routing';
	import { Unzip, AsyncUnzipInflate } from 'fflate';
    import { navigate } from "svelte-routing";
    import { loadTask, loadEstimatedTime, data } from '../app/store';
    import { extractData } from '../app/extractor';

    let loading = false;
    let error = false;
    async function handleFile (file) {
        console.log(`Reading package file...`);
        loading = true;
        const uz = new Unzip();
        uz.register(AsyncUnzipInflate);
        const files = [];
        uz.onfile = (f) => files.push(f);
        if (!file.stream) {
            loading = false;
            error = 'This browser is not supported. Try using Google Chrome instead.';
            return;
        }
        const reader = file.stream().getReader();
        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                uz.push(new Uint8Array(0), true);
                break;
            }
            for (let i = 0; i < value.length; i += 65536) {
                uz.push(value.subarray(i, i + 65536));
            }
        }
        console.log('File read.');
        let validPackage = true;
        if (files.some((file) => file.name === 'index.html')) {
            error = 'We need the data as JSON format, not HTML one! Ask your data again and check JSON 😉';
            loading = false;
            return;
        }
        const requiredFiles = [
            'account_information/account_information.json',
            'personal_information/personal_information/account_information.json',
            'personal_information/personal_information/personal_information.json'
        ];
        let foundRequiredFile = false;
        for (const requiredFile of requiredFiles) {
          if (files.some((file) => file.name === requiredFile)) {
            foundRequiredFile = true;
            break;
          }
        }
        if (!foundRequiredFile) {
          error = 'Required files not found. Likely that Instagram changed their data format.'
          return false;
        }
        if (!validPackage) {
            error = 'Your package seems to be corrupted. Click or drop your package file here to retry';
            loading = false;
            return;
        }
        const extractStartAt = Date.now();
        extractData(files).then((extractedData) => {
            loading = false;
            data.set(extractedData);
            loadTask.set(null);
            loadEstimatedTime.set(null);
            console.log(`[debug] Data extracted in ${(Date.now() - extractStartAt) / 1000} seconds.`);
            navigate('/stats');
        }).catch((err) => {
            error = 'Something went wrong... Click or drop your package file here to retry';
            loading = false;
            alert(err.stack);
        });
    }
    function handleDragOver (event) {
        event.preventDefault();
    }
    /** @see https://developer.mozilla.org/en-US/docs/Web/API/Document/drop_event */
    function handleDrop (event) {
        event.preventDefault();
        if (event.dataTransfer.items[0].getAsFile() !== null) {
            handleFile(event.dataTransfer.items[0].getAsFile());
        } else {
            error = 'Error trying to handle the dropped file. Try clicking instead.';
        }
    }
    function filePopup (event) {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', '.zip');
        input.addEventListener('change', (e) => handleFile(e.target.files[0]));
        input.addEventListener('error', () => error = true);
        input.click();
    }
</script>
    
<template>
    <div class="app-loader">
        <div class="app-loader-boxes">
            <div class="hero-badge">
                <span>🔒 100% Private & Local Processing</span>
            </div>
            <p class="app-loader-description">
                <a href="/" use:link class="brand-link">Instaddict</a> analyzes your Instagram Data Package directly on your device. 
                <span class="sub-desc">No data is ever sent to any server!</span>
            </p>

            <div class="step-container">
                <a class="app-loader-tuto" href="https://www.instagram.com/download/request/" target="_blank">
                    <small class="app-loader-tag tag">1</small>
                    <span class="tuto-title">Get your Instagram JSON data 👆</span>
                    <span class="tuto-sub">(click here to request package on Instagram)</span>
                </a>
            </div>

            <div class="app-loader-upload" on:click="{filePopup}" style="cursor: { loading ? '' : 'pointer' }" on:drop="{handleDrop}" on:dragover="{handleDragOver}">
                <small class="app-loader-tag tag">2</small>
                <label for="upload">
                    <div class="upload-icon-container">
                        <svg width="50" height="42" viewBox="0 0 59 49" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29.5 0.652008C25.0436 0.652008 20.5671 2.36576 17.1679 5.81576C14.4136 8.61109 12.8123 12.1254 12.2894 15.7607C5.37305 16.6594 0.0200195 22.6337 0.0200195 29.892C0.0200195 37.7705 6.32733 44.172 14.09 44.172H21.46C21.5488 44.1733 21.6369 44.1566 21.7193 44.123C21.8017 44.0894 21.8767 44.0395 21.9399 43.9763C22.0032 43.913 22.0534 43.8376 22.0876 43.7545C22.1219 43.6713 22.1396 43.5821 22.1396 43.492C22.1396 43.4019 22.1219 43.3127 22.0876 43.2295C22.0534 43.1464 22.0032 43.071 21.9399 43.0077C21.8767 42.9445 21.8017 42.8946 21.7193 42.861C21.6369 42.8274 21.5488 42.8107 21.46 42.812H14.09C7.0516 42.812 1.36002 37.0355 1.36002 29.892C1.36002 23.1472 6.43112 17.6122 12.9175 17.0145C13.0706 17.001 13.2145 16.9345 13.325 16.8262C13.4355 16.7179 13.506 16.5743 13.5247 16.4195C13.928 12.8934 15.4639 9.47896 18.1309 6.77201C21.273 3.58315 25.383 2.01201 29.5 2.01201C33.617 2.01201 37.7052 3.58215 40.8481 6.77201C44.4813 10.4594 46.0212 15.486 45.4544 20.287C45.4425 20.3832 45.4509 20.4808 45.4792 20.5734C45.5075 20.666 45.555 20.7513 45.6184 20.8238C45.6818 20.8962 45.7598 20.954 45.8471 20.9934C45.9343 21.0328 46.0289 21.0528 46.1244 21.052H46.92C52.8705 21.052 57.64 25.8927 57.64 31.932C57.64 37.9713 52.8705 42.812 46.92 42.812H37.54C37.4512 42.8107 37.3631 42.8274 37.2807 42.861C37.1983 42.8946 37.1233 42.9445 37.0601 43.0077C36.9969 43.071 36.9467 43.1464 36.9124 43.2295C36.8781 43.3127 36.8605 43.4019 36.8605 43.492C36.8605 43.5821 36.8781 43.6713 36.9124 43.7545C36.9467 43.8376 36.9969 43.913 37.0601 43.9763C37.1233 44.0395 37.1983 44.0894 37.2807 44.123C37.3631 44.1566 37.4512 44.1733 37.54 44.172H46.92C53.5897 44.172 58.98 38.7012 58.98 31.932C58.98 25.1628 53.5897 19.692 46.92 19.692H46.7944C47.1723 14.7203 45.554 9.61428 41.8113 5.81576C38.4131 2.36678 33.9565 0.652008 29.5 0.652008ZM29.437 23.772C29.2789 23.7856 29.1417 23.8585 29.0393 23.942L21.6693 30.742C21.4092 30.9862 21.385 31.457 21.6277 31.7195C21.8699 31.982 22.3337 31.9878 22.5908 31.7406L28.83 25.9819V47.5718C28.83 47.9474 29.13 48.2518 29.5 48.2518C29.8701 48.2518 30.17 47.9474 30.17 47.5718V25.9819L36.4094 31.7406C36.6665 31.9879 37.1303 31.9821 37.3725 31.7195C37.6147 31.457 37.6062 31.0233 37.331 30.742L29.961 23.942C29.7746 23.8029 29.5957 23.7581 29.4375 23.772H29.437Z" fill="url(#upload-grad)"></path><defs><linearGradient id="upload-grad" x1="0" y1="0" x2="59" y2="49" gradientUnits="userSpaceOnUse"><stop stop-color="#E1306C"/><stop offset="1" stop-color="#FCAF45"/></linearGradient></defs></svg>
                    </div>
                    <span class="app-loader-upload-info">
                        {#if loading}
                            <span class="loading-text">{$loadTask || "Loading your package file..."}</span>
                            {#if $loadEstimatedTime}
                                <small style="display: block; margin-top: 4px;">{$loadEstimatedTime}</small>
                            {/if}
                        {:else if error}
                            <p class="error-msg">{@html error}</p>
                        {:else}
                            Drop your <strong class="highlight">.ZIP file</strong> here or click to browse
                        {/if}
                    </span>
                </label>
            </div>

            <div class="app-discord">
                <a href="https://androz2091.fr/discord" target="_blank">
                    <button class="app-discord-btn">
                        <span>Need help? Join our Discord Community</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/></svg>
                    </button>
                </a>
            </div>

            <div class="app-demo">
                Want to test first? <a href="/stats/demo" use:link class="demo-link">✨ Explore Interactive Demo</a>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .app-loader {
        padding-top: 4rem;
        padding-bottom: 3rem;
        max-width: 680px;
        margin: auto;
    }
    .app-loader-boxes {
        padding: 0 20px;
        text-align: center;
    }
    .hero-badge {
        display: inline-block;
        padding: 0.4rem 1rem;
        border-radius: 50px;
        background: rgba(225, 48, 108, 0.1);
        border: 1px solid rgba(225, 48, 108, 0.25);
        color: #ff85b3;
        font-size: 0.85rem;
        font-weight: 600;
        margin-bottom: 1rem;
    }
    .app-loader-description {
        font-size: 1.2rem;
        font-weight: 500;
        line-height: 1.6;
        margin: 0.5rem auto 2.5rem;
        color: #d1d5db;

        .brand-link {
            font-size: 1.3rem;
            font-weight: 800;
            background: linear-gradient(135deg, #fcb045, #fd1d1d, #833ab4);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .sub-desc {
            display: block;
            font-size: 0.95rem;
            color: #9ca3af;
            margin-top: 0.3rem;
        }
    }
    .step-container {
        margin-bottom: 1.5rem;
    }
    .app-loader-tuto {
        position: relative;
        padding: 1.2rem 1rem;
        text-decoration: none;
        text-align: center;
        background: rgba(22, 25, 34, 0.8);
        border: 1px solid rgba(255, 255, 255, 0.08);
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 16px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease;

        &:hover {
            transform: translateY(-2px);
            border-color: rgba(225, 48, 108, 0.4);
            box-shadow: 0 12px 30px rgba(225, 48, 108, 0.15);
        }

        .tuto-title {
            font-size: 1.1rem;
            font-weight: 700;
            color: #ffffff;
        }
        .tuto-sub {
            font-size: 0.85rem;
            color: #94a3b8;
            margin-top: 0.2rem;
        }
    }
    .app-loader-upload {
        position: relative;
        margin-top: 2rem;

        label {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 2.5rem 1.5rem;
            background: rgba(22, 25, 34, 0.5);
            border: 2px dashed rgba(225, 48, 108, 0.5);
            border-radius: 20px;
            cursor: pointer;
            backdrop-filter: blur(10px);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

            &:hover {
                background: rgba(225, 48, 108, 0.08);
                border-color: #e1306c;
                box-shadow: 0 0 35px rgba(225, 48, 108, 0.25);
                transform: scale(1.01);
            }
        }

        .upload-icon-container {
            margin-bottom: 1rem;
            transition: transform 0.3s ease;
        }

        label:hover .upload-icon-container {
            transform: translateY(-5px);
        }
    }
    .app-loader-upload-info {
        font-size: 1.05rem;
        color: #cbd5e1;

        .highlight {
            color: #fcb045;
        }
        .loading-text {
            color: #e1306c;
            font-weight: 600;
        }
        .error-msg {
            color: #f87171;
            margin: 0;
        }
    }
    .app-loader-tag {
        position: absolute;
        top: -12px;
        left: 20px;
        color: white;
        z-index: 2;
    }
    .app-discord {
        padding-top: 2.2rem;
        width: 100%;
    }
    .app-discord-btn {
        padding: 1rem 1.5rem;
        color: white;
        font-size: 1rem;
        font-weight: 700;
        font-family: 'Outfit', sans-serif;
        cursor: pointer;
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 14px;
        background: linear-gradient(135deg, #833ab4 0%, #5865F2 100%);
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.6rem;
        box-shadow: 0 8px 25px rgba(88, 101, 242, 0.3);
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 35px rgba(88, 101, 242, 0.5);
            background: linear-gradient(135deg, #9b4bd4 0%, #6975f3 100%);
        }
    }
    .app-demo {
        padding-top: 1.5rem;
        font-size: 0.95rem;
        color: #94a3b8;

        .demo-link {
            display: inline-block;
            margin-left: 0.4rem;
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            background: rgba(252, 176, 69, 0.12);
            border: 1px solid rgba(252, 176, 69, 0.3);
            color: #fcb045 !important;
            font-weight: 700;
            transition: all 0.2s ease;

            &:hover {
                background: rgba(252, 176, 69, 0.25);
                transform: scale(1.05);
            }
        }
    }
</style>