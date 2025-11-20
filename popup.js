document.getElementById('mark-complete').addEventListener('click', () => {
  sendMessage({ action: 'toggleCompletion' });
});

document.getElementById('download-pdfs').addEventListener('click', () => {
  sendMessage({ action: 'download' });
});

document.getElementById('set-speed').addEventListener('click', () => {
  const factor = parseFloat(document.getElementById('speed-input').value);
  sendMessage({ action: 'customSpeed', factor });
});

document.getElementById('old-ui').addEventListener('click', () => {
	sendMessage({ action: 'oldUI' });
});

function sendMessage(message) {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, message);
  });
}
