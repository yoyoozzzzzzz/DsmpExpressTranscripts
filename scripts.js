const dropZone = document.getElementById("drop-zone");
const fileInput = document.getElementById("file-input");
const iframe = document.getElementById("transcript-viewer");

dropZone.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", handleFile);
dropZone.addEventListener("dragover", e => {
  e.preventDefault();
  dropZone.style.borderColor = "#6aa0ff";
});
dropZone.addEventListener("dragleave", () => {
  dropZone.style.borderColor = "#aaa";
});
dropZone.addEventListener("drop", e => {
  e.preventDefault();
  dropZone.style.borderColor = "#aaa";
  if (e.dataTransfer.files.length > 0) {
    loadTranscriptFile(e.dataTransfer.files[0]);
  }
});

function handleFile(e) {
  if (e.target.files.length > 0) {
    loadTranscriptFile(e.target.files[0]);
  }
}

function loadTranscriptFile(file) {
  if (!file.name.endsWith(".html")) {
    alert("Only HTML transcript files are supported.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const blob = new Blob([e.target.result], { type: "text/html" });
    iframe.src = URL.createObjectURL(blob);
  };
  reader.readAsText(file);
}
