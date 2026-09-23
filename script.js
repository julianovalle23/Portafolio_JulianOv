// Fondo animado de líneas orgánicas (estilo curvas de nivel) usando Canvas API
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');

let width, height;
let time = 0;

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Cada línea tiene su propia frecuencia, fase y amplitud, así no todas
// ondulan igual (unas más cerradas, otras más largas o más planas).
function wave(x, t, seed, freq) {
  return (
    Math.sin(x * freq + t + seed) * 1.0 +
    Math.sin(x * freq * 0.3 - t * 0.4 + seed * 1.7) * 0.35
  );
}

// Menos líneas, cada una con su propia "personalidad".
const LINES = 5;
const lineConfig = Array.from({ length: LINES }, (_, i) => ({
  seed: i * 1.1 + Math.random() * 0.6,
  freq: 0.002 + Math.random() * 0.0006,
  amplitude: 40 + Math.random() * 15
}));

function drawLines() {
  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < LINES; i++) {
    const baseY = (height / (LINES + 1)) * (i + 1);
    const { seed, freq, amplitude } = lineConfig[i];

    ctx.beginPath();
    for (let x = -50; x <= width + 50; x += 20) {
      const offset = wave(x, time, seed, freq) * amplitude;
      const y = baseY + offset;
      if (x === -50) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }

    ctx.strokeStyle = 'rgba(50, 168, 107, 0.5)';
    ctx.lineWidth = 1.2;
    ctx.stroke();
  }
}

function animate() {
  time += 0.003;
  drawLines();
  requestAnimationFrame(animate);
}

animate();