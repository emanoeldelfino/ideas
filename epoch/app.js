const currentWrapper = document.querySelector('.current-wrapper');
const current = document.querySelector('#current');
const submit = document.querySelector('#submit');
const resultLocal = document.querySelector('#result span#local-time');
const resultGMT = document.querySelector('#result span#gmt-time');
const epoch = document.querySelector('#epoch');
let setTimeoutId;

let pause = false;

function updateEpoch() {
  current.innerHTML = Date.now().toString().slice(0, 10);
  if (!pause) {
    setTimeoutId = setTimeout(updateEpoch, 1000);
  }
}
updateEpoch();

['mouseover', 'mouseout'].forEach((event) => {
  current.addEventListener(event, () => {
    pause = !pause;
    if(!pause) {
      updateEpoch();
    } else {
      clearTimeout(setTimeoutId);
    }
    currentWrapper.classList.toggle("pause");
  });
});

submit.addEventListener('click', (evt) => {
  evt.preventDefault();
  resultLocal.innerHTML = new Date(epoch.value * 1000);
  resultGMT.innerHTML = new Date(epoch.value * 1000).toGMTString();
})