const primaryText = document.getElementById('primary-text');
const backgroundPreview = document.getElementById('picture');
const colorsEl = document.querySelectorAll('.color');
const fontsEl = document.querySelectorAll('.font');
const backgroundEl = document.querySelectorAll('.tumbnail-background-img');

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
