const timer = ms => new Promise(res => setTimeout(res, ms));

async function download() {
  const lectures = document.querySelectorAll('[id^=lecture-card]');
  if (!lectures) {
    console.log('No lectures found');
    return;
  }
  for (let i = 0; i < lectures.length; i++) {
    // click attachments button
    lectures[
      i
    ].children[0].children[0].children[1].children[1].children[1].children[1].click();
    await timer(2500);
    // click pdf download button
    document
      .getElementsByClassName('_modal_fcrfu_6')[0]
      .children[0].children[1].children[0].children[1].children[0].children[1].click();
    await timer(1000);
    // exit out of modal
    document
      .getElementsByClassName('_modal_fcrfu_6')[0]
      .children[0].children[0].children[1].click();
    await timer(500);
  }
}

async function toggleCompletion() {
  const completionButtons = document.getElementsByClassName(
    '_markCompleteIcon_tsbtx_128'
  );
  if (!completionButtons) {
    console.log('No completion buttons found');
    return;
  }
  await Array.from(completionButtons).forEach(async button => {
	  await timer(1500);
	  button.click();
	});
}

function customSpeed(factor) {
  const v = document.getElementsByTagName('video')[0];
  if (!v) {
    console.log('No video found');
    return;
  }
  v.preservesPitch = true;
  v.playbackRate = factor;
}

chrome.runtime.onMessage.addListener(message => {
  if (message.action === 'toggleCompletion') {
    toggleCompletion();
  } else if (message.action === 'customSpeed') {
    customSpeed(message.factor);
  } else if (message.action === 'download') {
    download();
  } else if (message.action === 'oldUI') {
		window.location.href = window.location.href.replace('study-v2', 'study');
	}
});
