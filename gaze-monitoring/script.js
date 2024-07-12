document.addEventListener('DOMContentLoaded', () => {
    // Form submission for contact page
    const form = document.getElementById('contact-form');

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            alert('Form submitted!');
        });
    }

    // Recording functionality for record page
    const video = document.getElementById('video');
    const startRecordingButton = document.getElementById('start-recording');
    const stopRecordingButton = document.getElementById('stop-recording');
    const recordedVideo = document.getElementById('recorded-video');
    let mediaRecorder;
    let recordedBlobs;

    if (video && startRecordingButton && stopRecordingButton && recordedVideo) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                video.srcObject = stream;

                startRecordingButton.addEventListener('click', () => {
                    recordedBlobs = [];
                    mediaRecorder = new MediaRecorder(stream);
                    mediaRecorder.ondataavailable = event => {
                        if (event.data.size > 0) {
                            recordedBlobs.push(event.data);
                        }
                    };
                    mediaRecorder.onstop = () => {
                        const superBuffer = new Blob(recordedBlobs, { type: 'video/webm' });
                        recordedVideo.src = window.URL.createObjectURL(superBuffer);
                    };
                    mediaRecorder.start();
                    startRecordingButton.disabled = true;
                    stopRecordingButton.disabled = false;
                });

                stopRecordingButton.addEventListener('click', () => {
                    mediaRecorder.stop();
                    startRecordingButton.disabled = false;
                    stopRecordingButton.disabled = true;
                });
            })
            .catch(error => {
                console.error('Error accessing media devices.', error);
            });
    }

    // Customizing tasks for customize page
    const customizeForm = document.getElementById('customize-form');

    if (customizeForm) {
        customizeForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const movement = document.getElementById('movement').value;
            const task = document.getElementById('task').value;
            alert(`Saved: ${movement} -> ${task}`);
            // Save the movement-task mapping (e.g., to local storage or send to server)
        });
    }
});
