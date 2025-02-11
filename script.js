const ws = new WebSocket(`ws://${window.location.host}/ws`);

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.type === "position") {
    const { x, y, z } = data;
    document.getElementById("xValue").textContent = x;
    document.getElementById("yValue").textContent = y;
    document.getElementById("zValue").textContent = z;

    document.querySelectorAll("#grid div").forEach(cell => cell.style.backgroundColor = "#fff");
    document.querySelectorAll("#z-axis div").forEach(cell => cell.style.backgroundColor = "#fff");

    const gridCell = document.getElementById(`cell-${x}-${y}`);
    if (gridCell) gridCell.style.backgroundColor = "#4CAF50";

    const zCell = document.getElementById(`z-cell-${z}`);
    if (zCell) zCell.style.backgroundColor = "#4CAF50";
  }

  if (data.type === "maxValues") {
    document.getElementById("maxXValue").textContent = data.maxX;
    document.getElementById("maxYValue").textContent = data.maxY;
    document.getElementById("maxZValue").textContent = data.maxZ;
  }
};

function resetYaw() {
  fetch("/resetYaw")
    .then(response => response.text())
    .then(data => {
      alert(data);
    });
}

function sendUid(axis) {
  const uid = document.getElementById(`newUid${axis}`).value;
  fetch(`/setUid?axis=${axis}&uid=${uid}`)
    .then(response => response.text())
    .then(data => {
      alert(data);
    });
}