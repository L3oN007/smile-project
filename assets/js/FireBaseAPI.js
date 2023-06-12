
var stream; // Store the camera stream reference

function startCamera() {
    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (mediaStream) {
            var videoElement = document.getElementById('video');
            videoElement.srcObject = mediaStream;
            stream = mediaStream;
            document.getElementById('toggleButton').textContent = 'Turn Camera Off';
        })
        .catch(function (error) {
            console.log('Error accessing camera:', error);
        });
}

function stopCamera() {
    if (stream) {
        stream.getTracks().forEach(function (track) {
            track.stop();
        });
        stream = null;
        document.getElementById('toggleButton').textContent = 'Turn Camera On';
    }
}

function captureImage() {
    var videoElement = document.getElementById('video');
    var canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    var context = canvas.getContext('2d');
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    var imgData = canvas.toDataURL('image/jpeg');
    stopCamera(); // Stop the camera stream after capturing the image
    console.log(imgData);

    // Set the captured image data in the form input
    var imageDataInput = document.getElementById('imageDataInput');
    imageDataInput.value = imgData;

    // Submit the form
    var imageUploadForm = document.getElementById('imageUploadForm');
    imageUploadForm.submit();
}

document.getElementById('toggleButton').addEventListener('click', function () {
    if (stream) {
        stopCamera();
    } else {
        startCamera();
    }
});

document.getElementById('captureButton').addEventListener('click', captureImage);
