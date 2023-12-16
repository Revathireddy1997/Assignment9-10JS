document.addEventListener('DOMContentLoaded', function () {
    // Drawing Canvas
    var drawingCanvas = document.getElementById('main');
    var canvasContext = drawingCanvas.getContext('2d');
    var isDrawing = false;

    // Initial brush settings
    var brushColor = '#000000'; // default to black
    var brushSize = 5;

    // Event listeners
    drawingCanvas.addEventListener('mousedown', startDrawing);
    drawingCanvas.addEventListener('mouseup', stopDrawing);
    drawingCanvas.addEventListener('mousemove', drawOnCanvas);

    // Button event listeners
    document.getElementById('new').addEventListener('click', clearCanvas);
    document.getElementById('erase').addEventListener('click', useEraser);
    document.getElementById('black').addEventListener('click', function () { setBrushColor('#000000'); });
    document.getElementById('pink').addEventListener('click', function () { setBrushColor('#F50057'); });
    document.getElementById('blue').addEventListener('click', function () { setBrushColor('#2979FF'); });
    document.getElementById('yellow').addEventListener('click', function () { setBrushColor('#FFD600'); });

    // Slider event listener
    var sizeSlider = document.getElementById('slider');
    var brushSizeDisplay = document.getElementById('brushSize');
    sizeSlider.addEventListener('input', function () {
        brushSize = this.value;
        brushSizeDisplay.textContent = brushSize;
    });

    // Functions
    function startDrawing(e) {
        isDrawing = true;
        drawOnCanvas(e);
    }

    function stopDrawing() {
        isDrawing = false;
        canvasContext.beginPath();
    }

    function drawOnCanvas(e) {
        if (!isDrawing) return;

        var rect = drawingCanvas.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        canvasContext.lineWidth = brushSize;
        canvasContext.lineCap = 'round';
        canvasContext.strokeStyle = brushColor;

        canvasContext.lineTo(x, y);
        canvasContext.stroke();
        canvasContext.beginPath();
        canvasContext.moveTo(x, y);
    }

    function clearCanvas() {
        canvasContext.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
    }

    function useEraser() {
        brushColor = '#ffffff'; // white color for eraser
        brushSize = 10; // set an appropriate size for eraser
        brushSizeDisplay.textContent = brushSize;
    }

    function setBrushColor(color) {
        brushColor = color;
    }
});