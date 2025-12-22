import { uploadVideo } from './supabase.js';

const fileInput = document.getElementById('video-file');
const fileLabel = document.getElementById('file-label');
const previewVideo = document.getElementById('preview-video');
const uploadBtn = document.getElementById('upload-btn');
const statusMsg = document.getElementById('status-msg');
const form = document.getElementById('upload-form');

let selectedFile = null;

fileInput.addEventListener('change', (e) => {
    selectedFile = e.target.files[0];
    if (selectedFile) {
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
    if (!selectedFile) return;

    statusMsg.textContent = 'Uploading...';
    statusMsg.className = 'status';
    uploadBtn.disabled = true;

    const result = await uploadVideo(selectedFile);

    if (result.success) {
        statusMsg.textContent = 'Upload Successful!';
        statusMsg.className = 'status success';
        // Reset form
        setTimeout(() => {
            // Optional: reload or clear
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
