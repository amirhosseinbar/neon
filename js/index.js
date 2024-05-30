const primaryText = document.getElementById('primary-text');
const backgroundPreview = document.getElementById('picture');
const colorsEl = document.querySelectorAll('.color');
const fontsEl = document.querySelectorAll('.font');
const backgroundEl = document.querySelectorAll('.tumbnail-background-img');
const draggable = document.getElementById('draggable');


Array.from(colorsEl).forEach(item=>{
    item.addEventListener('click',event=>{
        primaryText.style.textShadow = event.currentTarget.dataset['textshadow']
    })
})
Array.from(fontsEl).forEach(item=>{
    item.addEventListener('click',event=>{
        primaryText.style.fontFamily = event.currentTarget.dataset['font'];
    })
})
Array.from(backgroundEl).forEach(item=>{
    item.addEventListener('click',event=>{
        backgroundPreview.style.backgroundImage = event.currentTarget.dataset['src'];
    })
})


function showFonts() {
    document.getElementById("fonts-wrapper").classList.toggle('d-none')
}

function onTextChange() {
    primaryText.innerText = document.getElementById('input-text').value;

}

document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            document.getElementById('picture').style.backgroundImage = `url(${imageUrl})`;

            // Print the Base64 string in console for verification
            console.log(imageUrl);
        };
        reader.readAsDataURL(file);
    } else {
        alert('لطفاً یک فایل تصویری انتخاب کنید.');
    }
});
draggable.addEventListener('mousedown', function(e) {
    // گرفتن موقعیت اولیه ماوس
    let shiftX = e.clientX - draggable.getBoundingClientRect().left;
    let shiftY = e.clientY - draggable.getBoundingClientRect().top;

    // تابعی برای حرکت دادن المان
    function moveAt(pageX, pageY) {
        draggable.style.left = pageX - shiftX + 'px';
        draggable.style.top = pageY - shiftY + 'px';
    }

    // حرکت دادن المان به موقعیت اولیه ماوس
    moveAt(e.pageX, e.pageY);

    // تابعی برای جابجایی المان با حرکت ماوس
    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // گوش دادن به رویداد حرکت ماوس
    document.addEventListener('mousemove', onMouseMove);

    // حذف گوش دادن به رویداد حرکت ماوس زمانی که ماوس را رها می‌کنیم
    draggable.addEventListener('mouseup', function() {
        document.removeEventListener('mousemove', onMouseMove);
    });

    // جلوگیری از کشیدن متن در مرورگر
    draggable.ondragstart = function() {
        return false;
    };
});
