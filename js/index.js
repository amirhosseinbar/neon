const primaryText = document.getElementById("primary-text");
const backgroundPreview = document.getElementById("picture");
const colorsEl = document.querySelectorAll(".color");
const fontsEl = document.querySelectorAll(".font");
const fontSizeEl = document.getElementById("customRange2");
const backgroundEl = document.querySelectorAll(".tumbnail-background-img");
const draggable = document.querySelector(".draggable");
var draggableWidth = backgroundPreview.getBoundingClientRect().width;
var draggableHeight = backgroundPreview.getBoundingClientRect().height;

Array.from(colorsEl).forEach((item) => {
  item.addEventListener("click", (event) => {
    primaryText.style.textShadow = event.currentTarget.dataset["textshadow"];
  });
});
Array.from(fontsEl).forEach((item) => {
  item.addEventListener("click", (event) => {
    primaryText.style.fontFamily = event.currentTarget.dataset["font"];
  });
});
Array.from(backgroundEl).forEach((item) => {
  item.addEventListener("click", (event) => {
    backgroundPreview.style.backgroundImage =
      event.currentTarget.dataset["src"];
  });
});

function showFonts() {
  document.getElementById("fonts-wrapper").classList.toggle("d-none");
}

function onTextChange() {
  primaryText.innerText = document.getElementById("input-text").value;
}

function onFontSizeChange() {
  const fontSize = fontSizeEl.value + "px";
  primaryText.style.fontSize = fontSize;
}

document
  .getElementById("fileInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imageUrl = e.target.result;
        document.getElementById(
          "picture"
        ).style.backgroundImage = `url(${imageUrl})`;

        // Print the Base64 string in console for verification
        console.log(imageUrl);
      };
      reader.readAsDataURL(file);
    } else {
      alert("لطفاً یک فایل تصویری انتخاب کنید.");
    }
  });

draggable.addEventListener("mousedown", function (e) {
  // گرفتن موقعیت اولیه ماوس
  let shiftX = e.clientX - draggable.offsetLeft;
  let shiftY = e.clientY - draggable.offsetTop;

  // تابعی برای حرکت دادن المان
  // function moveAt(pageX, pageY) {
  //     draggable.style.left = pageX - shiftX + 'px';
  //     draggable.style.top = pageY - shiftY + 'px';
  // }
  function moveAt(pageX, pageY) {
    let newLeft = pageX - shiftX;
    let newTop = pageY - shiftY;

    // اعمال محدودیت‌های حرکت افقی
    if (newLeft >= draggableWidth - draggable.getBoundingClientRect().width) {
      newLeft = draggableWidth - draggable.getBoundingClientRect().width;
    } else if (newLeft <= 0) {
      newLeft = 0;
    }

    if (
      newTop >=
      draggableHeight - draggable.getBoundingClientRect().height - 200
    ) {
      newTop = draggableHeight - draggable.getBoundingClientRect().height - 200;
    } else if (newTop < 0) {
      newTop = 0;
    }

    draggable.style.left = newLeft + "px";
    draggable.style.top = newTop + "px";
  }

  // حرکت دادن المان به موقعیت اولیه ماوس
  moveAt(e.pageX, e.pageY);

  // تابعی برای جابجایی المان با حرکت ماوس
  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // گوش دادن به رویداد حرکت ماوس
  document.addEventListener("mousemove", onMouseMove);

  // حذف گوش دادن به رویداد حرکت ماوس زمانی که ماوس را رها می‌کنیم
  document.addEventListener("mouseup", function () {
    document.removeEventListener("mousemove", onMouseMove);
  });

  // جلوگیری از کشیدن متن در مرورگر
  draggable.ondragstart = function () {
    return false;
  };
});
