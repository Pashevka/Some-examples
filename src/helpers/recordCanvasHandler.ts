const chunks = [];
export function recordCanvasHandler(button: HTMLButtonElement) {
    chunks.length = 0;
    let stream = document.querySelector('canvas').captureStream(60);
    console.log("🚀 ~ recordCanvasHandler ~ stream:", stream)
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = e => {
        if (e.data.size) {
            chunks.push(e.data);
        }
    };
    recorder.onstop = exportVideo;
    button.onclick = e => {
        recorder.stop();
        button.textContent = 'start recording';
        button.onclick = () => recordCanvasHandler(btn);
    };
    recorder.start();
    button.textContent = 'stop recording';
}
function exportVideo(e) {
    var blob = new Blob(chunks, { 'type': 'video/mp4' });

    // Draw video to screen
    var videoElement = document.createElement('video');
    videoElement.setAttribute("id", Date.now());
    videoElement.controls = true;
    document.body.appendChild(videoElement);
    videoElement.src = window.URL.createObjectURL(blob);

    // Download the video 
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
    a.href = url;
    a.download = 'newVid.webm';
    a.click();
    window.URL.revokeObjectURL(url);

}