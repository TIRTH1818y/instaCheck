/**
 * Report Generator Service
 * Exports CSV, JSON, and printable HTML/PDF reports from normalized InstagramData.
 */

export function downloadJsonReport(data) {
    if (!data) return;
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    downloadBlob(blob, `instagram_analysis_${data.profile?.username || 'user'}.json`);
}

export function downloadCsvReport(data) {
    if (!data) return;
    let csvContent = `Category,Metric,Value\n`;

    csvContent += `Profile,Username,"${data.profile?.username || ''}"\n`;
    csvContent += `Profile,Name,"${data.profile?.name || ''}"\n`;
    csvContent += `Profile,Account Type,"${data.profile?.accountType || ''}"\n`;
    csvContent += `Connections,Followers,${data.followers?.length || 0}\n`;
    csvContent += `Connections,Following,${data.following?.length || 0}\n`;
    csvContent += `Connections,Mutuals,${data.connections?.mutuals?.length || 0}\n`;
    csvContent += `Connections,Non-followers,${data.connections?.nonFollowers?.length || 0}\n`;
    csvContent += `Content,Posts,${data.posts?.length || 0}\n`;
    csvContent += `Content,Reels,${data.reels?.length || 0}\n`;
    csvContent += `Content,Stories,${data.stories?.length || 0}\n`;
    csvContent += `Activity,Likes,${data.likes?.length || 0}\n`;
    csvContent += `Activity,Comments,${data.comments?.length || 0}\n`;
    csvContent += `Activity,Saved Content,${data.saved?.length || 0}\n`;
    csvContent += `Activity,Searches,${data.searches?.length || 0}\n`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    downloadBlob(blob, `instagram_summary_${data.profile?.username || 'user'}.csv`);
}

export function printPdfReport(data) {
    if (!data) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return alert('Please allow popups to generate the report.');

    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Instagram Data Analysis Report - @${data.profile?.username || 'user'}</title>
            <style>
                body { font-family: 'Helvetica Neue', Arial, sans-serif; padding: 40px; color: #111; line-height: 1.6; }
                h1 { color: #833ab4; margin-bottom: 5px; }
                h2 { color: #e1306c; border-bottom: 2px solid #eee; padding-bottom: 8px; margin-top: 30px; }
                .subtitle { color: #666; margin-top: 0; font-size: 14px; }
                .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin: 20px 0; }
                .card { background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px; padding: 15px; text-align: center; }
                .card-val { font-size: 24px; font-weight: bold; color: #e1306c; }
                .card-lbl { font-size: 12px; color: #666; text-transform: uppercase; margin-top: 5px; }
                table { width: 100%; border-collapse: collapse; margin-top: 15px; }
                th, td { border: 1px solid #dee2e6; padding: 10px; text-align: left; font-size: 13px; }
                th { background: #f1f3f5; }
                .footer { margin-top: 50px; font-size: 12px; color: #888; text-align: center; border-top: 1px solid #eee; padding-top: 15px; }
            </style>
        </head>
        <body>
            <h1>Instagram Data Analysis Report</h1>
            <p class="subtitle">Generated locally by Instagram Data Analyzer for @${data.profile?.username || 'User'} on ${new Date().toLocaleDateString()}</p>
            
            <h2>1. Profile Overview</h2>
            <p><strong>Username:</strong> @${data.profile?.username || ''}</p>
            <p><strong>Name:</strong> ${data.profile?.name || ''}</p>
            <p><strong>Account Type:</strong> ${data.profile?.accountType || ''}</p>

            <h2>2. Activity & Connections Summary</h2>
            <div class="grid">
                <div class="card"><div class="card-val">${(data.followers?.length || 0).toLocaleString()}</div><div class="card-lbl">Followers</div></div>
                <div class="card"><div class="card-val">${(data.following?.length || 0).toLocaleString()}</div><div class="card-lbl">Following</div></div>
                <div class="card"><div class="card-val">${(data.connections?.mutuals?.length || 0).toLocaleString()}</div><div class="card-lbl">Mutual Connections</div></div>
                <div class="card"><div class="card-val">${(data.posts?.length || 0).toLocaleString()}</div><div class="card-lbl">Posts</div></div>
                <div class="card"><div class="card-val">${(data.reels?.length || 0).toLocaleString()}</div><div class="card-lbl">Reels</div></div>
                <div class="card"><div class="card-val">${(data.likes?.length || 0).toLocaleString()}</div><div class="card-lbl">Likes</div></div>
                <div class="card"><div class="card-val">${(data.comments?.length || 0).toLocaleString()}</div><div class="card-lbl">Comments</div></div>
                <div class="card"><div class="card-val">${(data.saved?.length || 0).toLocaleString()}</div><div class="card-lbl">Saved Items</div></div>
                <div class="card"><div class="card-val">${(data.searches?.length || 0).toLocaleString()}</div><div class="card-lbl">Searches</div></div>
            </div>

            <h2>3. Security & Login Overview</h2>
            <p><strong>Logins Tracked:</strong> ${data.security?.logins?.length || 0}</p>
            <p><strong>Password Changes:</strong> ${data.security?.passwordChanges || 0}</p>

            <div class="footer">
                Instaddict - Instagram Data Analyzer • 100% Private Local Processing
            </div>

            <script>
                window.onload = function() { window.print(); }
            </script>
        </body>
        </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
}

function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
