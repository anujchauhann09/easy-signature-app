const colorPicker = document.getElementById('color-picker');
const canvasColor = document.getElementById('canvas-color');
const canvas = document.getElementById('signature-canvas');
const clearButton = document.getElementById('clear-btn');
const saveButton = document.getElementById('download-btn');
const retrieveButton = document.getElementById('retrieve-btn');
const fontSizePicker = document.getElementById('font-size-picker');

const ctx = canvas.getContext('2d');
let isDrawing = false;
let lastX = 0;
let lastY = 0;

colorPicker.addEventListener('change', (event) => {
    ctx.fillStyle = event.target.value;
    ctx.strokeStyle = event.target.value;
});

canvasColor.addEventListener('change', (event) => {
    ctx.fillStyle = event.target.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

// Mouse events
canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    lastX = event.offsetX;
    lastY = event.offsetY;
});

canvas.addEventListener('mousemove', (event) => {
    if (isDrawing) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();

        lastX = event.offsetX;
        lastY = event.offsetY;
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

// Touch events
canvas.addEventListener('touchstart', (event) => {
    isDrawing = true;
    const touch = event.touches[0];
    lastX = touch.clientX - canvas.getBoundingClientRect().left;
    lastY = touch.clientY - canvas.getBoundingClientRect().top;
    event.preventDefault();
});

canvas.addEventListener('touchmove', (event) => {
    if (isDrawing) {
        const touch = event.touches[0];
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        lastX = touch.clientX - canvas.getBoundingClientRect().left;
        lastY = touch.clientY - canvas.getBoundingClientRect().top;
        ctx.lineTo(lastX, lastY);
        ctx.stroke();
    }
    event.preventDefault();
});

canvas.addEventListener('touchend', () => {
    isDrawing = false;
});

canvas.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

fontSizePicker.addEventListener('change', (event) => {
    ctx.lineWidth = event.target.value;
});

clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

saveButton.addEventListener('click', () => {
    localStorage.setItem('canvasContents', canvas.toDataURL());
    let link = document.createElement('a');

    link.download = 'my-canvas.png';
    link.href = canvas.toDataURL();

    link.click();
});

retrieveButton.addEventListener('click', () => {
    let savedCanvas = localStorage.getItem('canvasContents');

    if (savedCanvas) {
        let img = new Image();
        img.src = savedCanvas;
        ctx.drawImage(img, 0, 0);
    }
});
