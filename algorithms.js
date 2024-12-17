const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Установка пикселя
function setPixel(x, y) {
    ctx.fillRect(x, y, 1, 1);
}

// Пошаговый алгоритм
function drawStep() {
    clearCanvas();
    const x1 = 50, y1 = 50, x2 = 200, y2 = 150;
    let x = x1, y = y1;
    while (x <= x2) {
        setPixel(x, y);
        x++;
        y += (y2 - y1) / (x2 - x1); // инкремент Y
    }
}

// Алгоритм ЦДА
function drawDDA() {
    clearCanvas();
    const x1 = 50, y1 = 50, x2 = 200, y2 = 150;
    const dx = x2 - x1, dy = y2 - y1;
    const steps = Math.max(Math.abs(dx), Math.abs(dy));
    const xInc = dx / steps, yInc = dy / steps;

    let x = x1, y = y1;
    for (let i = 0; i <= steps; i++) {
        setPixel(Math.round(x), Math.round(y));
        x += xInc;
        y += yInc;
    }
}

// Алгоритм Брезенхема для прямой
function drawBresenham() {
    clearCanvas();
    let x1 = 50, y1 = 50, x2 = 200, y2 = 150;
    let dx = Math.abs(x2 - x1), dy = Math.abs(y2 - y1);
    let sx = x1 < x2 ? 1 : -1, sy = y1 < y2 ? 1 : -1;
    let err = dx - dy;

    while (true) {
        setPixel(x1, y1);
        if (x1 === x2 && y1 === y2) break;
        let e2 = 2 * err;
        if (e2 > -dy) { err -= dy; x1 += sx; }
        if (e2 < dx) { err += dx; y1 += sy; }
    }
}

// Алгоритм Брезенхема для окружности
function drawCircle() {
    clearCanvas();
    const xc = 200, yc = 200, r = 100;
    let x = 0, y = r;
    let d = 3 - 2 * r;
    while (x <= y) {
        plotCirclePoints(xc, yc, x, y);
        if (d < 0) {
            d += 4 * x + 6;
        } else {
            d += 4 * (x - y) + 10;
            y--;
        }
        x++;
    }
}

function plotCirclePoints(xc, yc, x, y) {
    setPixel(xc + x, yc + y);
    setPixel(xc - x, yc + y);
    setPixel(xc + x, yc - y);
    setPixel(xc - x, yc - y);
    setPixel(xc + y, yc + x);
    setPixel(xc - y, yc + x);
    setPixel(xc + y, yc - x);
    setPixel(xc - y, yc - x);
}

// Очистка Canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
