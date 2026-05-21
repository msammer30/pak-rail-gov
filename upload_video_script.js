import { uploadVideo, getVideos, deleteVideo, getGlobalSettings, updateGlobalSettings } from './supabase.js';

const fileInput = document.getElementById('video-file');
const fileLabel = document.getElementById('file-label');
const previewVideo = document.getElementById('preview-video');
const uploadBtn = document.getElementById('upload-btn');
const statusMsg = document.getElementById('status-msg');
const form = document.getElementById('upload-form');

const slidesBetweenInput = document.getElementById('slides-between');
const saveSettingsBtn = document.getElementById('save-settings-btn');
const settingsStatus = document.getElementById('settings-status');
const playlistContainer = document.getElementById('playlist-container');

let selectedFile = null;

// Initialize Page Data
document.addEventListener('DOMContentLoaded', async () => {
    await loadSettings();
    await loadPlaylist();
});

async function loadSettings() {
    const result = await getGlobalSettings();
    if (result.success) {
        slidesBetweenInput.value = result.slides_between_videos;
    }
}

async function loadPlaylist() {
    playlistContainer.innerHTML = '<p>Loading playlist...</p>';
    const result = await getVideos();
    
    if (result.success) {
        if (result.data.length === 0) {
            playlistContainer.innerHTML = '<p>No videos uploaded yet.</p>';
            return;
        }

        playlistContainer.innerHTML = '';
        result.data.forEach((video, index) => {
            const item = document.createElement('div');
            item.className = 'playlist-item';
            
            // Format date safely
            let uploadDateLabel = 'Unknown date';
            if (video.created_at) {
                 const dateObj = new Date(video.created_at);
                 if (!isNaN(dateObj)) uploadDateLabel = dateObj.toLocaleString();
            }

            item.innerHTML = `
                <div>
                    <strong>#${index + 1}</strong> <a href="${video.public_url}" target="_blank">${video.filename}</a>
                    <div style="font-size: 0.8em; color: #95a5a6; margin-top: 3px;">Uploaded: ${uploadDateLabel}</div>
                </div>
                <button class="btn-delete" data-id="${video.id}" data-filename="${video.filename}">Delete</button>
            `;
            playlistContainer.appendChild(item);
        });

        // Attach event listeners to delete buttons
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = e.target.getAttribute('data-id');
                const filename = e.target.getAttribute('data-filename');
                if (confirm(`Delete video ${filename}?`)) {
                    e.target.textContent = 'Deleting...';
                    e.target.disabled = true;
                    const delRes = await deleteVideo(id, filename);
                    if (delRes.success) {
                        await loadPlaylist(); // Refresh
                    } else {
                        alert(delRes.message);
                        e.target.textContent = 'Delete';
                        e.target.disabled = false;
                    }
                }
            });
        });
    } else {
        playlistContainer.innerHTML = `<p class="error">Failed to load playlist: ${result.message}</p>`;
    }
}

// Display Settings
saveSettingsBtn.addEventListener('click', async () => {
    const val = parseInt(slidesBetweenInput.value);
    if (isNaN(val) || val < 1) {
        settingsStatus.textContent = 'Please enter a valid number (minimum 1).';
        settingsStatus.className = 'status error';
        return;
    }

    settingsStatus.textContent = 'Saving...';
    settingsStatus.className = 'status';
    saveSettingsBtn.disabled = true;

    const result = await updateGlobalSettings(val);
    
    if (result.success) {
        settingsStatus.textContent = 'Settings saved successfully!';
        settingsStatus.className = 'status success';
        setTimeout(() => { settingsStatus.textContent = ''; }, 3000);
    } else {
        settingsStatus.textContent = result.message;
        settingsStatus.className = 'status error';
    }
    saveSettingsBtn.disabled = false;
});

// Video Upload
fileInput.addEventListener('change', (e) => {
    selectedFile = e.target.files[0];
    if (selectedFile) {
        // Validate File Type
        if (!selectedFile.type.startsWith('video/')) {
            statusMsg.textContent = 'Error: Invalid file type. Please upload a video file.';
            statusMsg.className = 'status error';
            fileInput.value = ''; // Clear input
            previewVideo.style.display = 'none';
            uploadBtn.disabled = true;
            return;
        }

        // Validate File Size (50MB)
        const maxSize = 50 * 1024 * 1024; // 50MB in bytes
        if (selectedFile.size > maxSize) {
            statusMsg.textContent = `Error: File size (${(selectedFile.size / (1024 * 1024)).toFixed(2)}MB) exceeds 50MB limit.`;
            statusMsg.className = 'status error';
            fileInput.value = ''; // Clear input
            previewVideo.style.display = 'none';
            uploadBtn.disabled = true;
            return;
        }

        fileLabel.textContent = selectedFile.name;
        const url = URL.createObjectURL(selectedFile);
        previewVideo.src = url;
        previewVideo.style.display = 'block';

        // Check duration
        previewVideo.onloadedmetadata = () => {
            const duration = previewVideo.duration;
            if (duration > 31) { // tolerance
                statusMsg.textContent = `Error: Video is ${Math.round(duration)}s long. Max 30s allowed.`;
                statusMsg.className = 'status error';
                uploadBtn.disabled = true;
            } else {
                statusMsg.textContent = `Video duration: ${duration.toFixed(1)}s. Ready to upload.`;
                statusMsg.className = 'status success';
                uploadBtn.disabled = false;
            }
        };
    } else {
        fileLabel.textContent = 'Click to select video';
        previewVideo.style.display = 'none';
        uploadBtn.disabled = true;
        statusMsg.textContent = '';
    }
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    statusMsg.textContent = 'Uploading is temporarily disabled.';
    statusMsg.className = 'status error';
    return;

    if (!selectedFile) return;

    statusMsg.textContent = 'Uploading...';
    statusMsg.className = 'status';
    uploadBtn.disabled = true;

    const result = await uploadVideo(selectedFile);

    if (result.success) {
        statusMsg.textContent = 'Upload Successful!';
        statusMsg.className = 'status success';
        
        // Refresh Playlist
        await loadPlaylist();

        // Reset form
        setTimeout(() => {
            fileInput.value = '';
            fileLabel.textContent = 'Click to select video';
            previewVideo.style.display = 'none';
            uploadBtn.disabled = true;
            statusMsg.textContent = '';
        }, 3000);
    } else {
        statusMsg.textContent = 'Upload Failed: ' + result.message;
        statusMsg.className = 'status error';
        uploadBtn.disabled = false;
    }
});

