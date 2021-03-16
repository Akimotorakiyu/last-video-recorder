import "VideoRecording";

console.log(VideoRecording);

const startBtn = document.createElement("button");
const stopBtn = document.createElement("button");
const download = document.createElement("button");
const preview = document.createElement("video");

const recordList: Blob[] = [];

startBtn.innerHTML = "start record";
stopBtn.innerHTML = "stop record";
download.innerHTML = "download record";

preview.controls = true;

document.body.append(startBtn);
document.body.append(stopBtn);
document.body.append(download);

document.body.append(preview);

const video = document.querySelector("video");

var videoRecording = new VideoRecording(video);

function save() {
  videoRecording.stopRecording().then((blob) => {
    window.URL.revokeObjectURL(preview.src);
    preview.src = window.URL.createObjectURL(blob);
    recordList.push(blob);
    console.log(recordList);
  });
}

video.onplay = () => {
  console.log("recording");
  videoRecording.startRecording();
};

video.onpause = () => {
  console.log("stop");

  save();
};

video.onended = () => {
  console.log("stop");

  save();
};

download.onclick = () => {
  const elink = document.createElement("a");
  elink.download = "download";
  elink.style.display = "none";
  const blob = new Blob(recordList);
  elink.href = URL.createObjectURL(blob);
  document.body.appendChild(elink);
  elink.click();
  URL.revokeObjectURL(elink.href); //释放URL对象
  document.body.removeChild(elink);
};
