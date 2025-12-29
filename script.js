const imgGalleryList = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "14.jpg",
  "15.jpg"
]

const headerDialogList = [
  "From Denmark to Sweden",
  "First stop in Sweden",
  "First stop in Norway",
  "Simply beautiful",
  "Water of life",
  "In Norway's sights",
  "Borgund Stavkirke",
  "Mirror of life",
  "Contrast between <br> earth and sky",
  "Anarchy",
  "The way to the glacier",
  "Near sognefjellet",
  "Sognefjellet",
  "back offroad",
  "The picture speaks for itself."
]

const dialogRef = document.getElementById('myDialog');
const imgDialog = document.getElementById('imgDialog');
const headerDialog = document.getElementById('headerDialog');

let nummberOfImg = document.getElementById('nummberOfImg');
let imgIndex = 0;
let index = 0;

function loadGallery() {
  let imgElement = document.getElementById('gallery');
  for (let pos = 0; pos < imgGalleryList.length; pos++) {
    const img = imgGalleryList[pos];
    imgElement.innerHTML += `<img src="./img/${img}" aria-haspopup="dialog" aria-controls="myDialog" onclick="openDialog(${pos})" tabindex="0" onkeydown="openDialogEnter(event, ${pos})" alt="${headerDialogList[pos]}">`;
  }
}

function openDialog(pos) {
  dialogRef.showModal();
  document.getElementById('myDialog').style.display = "flex";
  imgDialog.innerHTML = `<img src="./img/${imgGalleryList[pos]}">`;
  headerDialog.innerHTML = `${headerDialogList[pos]}`;
  imgIndex = pos;
  nummberOfImg.innerHTML = `<h3>${imgIndex + 1}/${imgGalleryList.length}</h3>`;
  releaseTabIndex();
  document.getElementById('body').style.overflow = "hidden";
}

function releaseTabIndex() {
  document.getElementById('myDialog').tabIndex = 0;
  document.getElementById('close_button').tabIndex = 0;
  document.getElementById('imgBack').tabIndex = 0;
  document.getElementById('imgNext').tabIndex = 0;
}

function closeDialog() {
  dialogRef.close();
  document.getElementById('myDialog').style.display = "none";
  document.getElementById('body').style.overflow = "scroll";
  document.getElementById('myDialog').tabIndex = -1;
  document.getElementById('close_button').tabIndex = -1;
  document.getElementById('imgBack').tabIndex = -1;
  document.getElementById('imgNext').tabIndex = -1;
}

function postImg() {
  imgDialog.innerHTML = '';
  headerDialog.innerHTML = '';
  nummberOfImg.innerHTML = '';
  imgIndex += 1;
  if (imgIndex >= imgGalleryList.length) imgIndex = 0;
  imgDialog.innerHTML = `<img src="./img/${imgGalleryList[imgIndex]}">`;
  headerDialog.innerHTML = `${headerDialogList[imgIndex]}`;
  index += 1;
  if (index > imgGalleryList.length) index = 1;
  nummberOfImg.innerHTML = `<h3>${index}/${imgGalleryList.length}</h3>`;
}

function preImg() {
  imgDialog.innerHTML = '';
  headerDialog.innerHTML = '';
  nummberOfImg.innerHTML = '';
  imgIndex -= 1;
  if (imgIndex < 0) imgIndex = imgGalleryList.length - 1;
  imgDialog.innerHTML = `<img src="./img/${imgGalleryList[imgIndex]}">`;
  headerDialog.innerHTML = `${headerDialogList[imgIndex]}`;
  index -= 1;
  if (index <= 0) index = imgGalleryList.length;
  nummberOfImg.innerHTML = `<h3>${index}/${imgGalleryList.length}</h3>`;
}

addEventListener('keydown', (e) => {
  if (e.repeat) return;
  if (e.key === "ArrowRight") {
    postImg();
  }
  if (e.key === "ArrowLeft") {
    preImg();
  }
  if (e.key === "Escape") {
    closeDialog();
  }
});

function openDialogEnter(e, pos) {
  if (e.key === "Enter" || e.key === " ") {
    openDialog(pos);
  }
}

//https://codepen.io/alexgriss/pen/mdvQXpJ
const modalElement = document.getElementById("myDialog");

const handleModalClick = ({ currentTarget, target }) => {
  const isClickedOnBackdrop = target === currentTarget;

  if (isClickedOnBackdrop) {
    //currentTarget.close();
    closeDialog()
  }
};

modalElement.addEventListener("click", handleModalClick);
