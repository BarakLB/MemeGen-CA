
function uploadImg() {
    var gElCanvas = document.querySelector('.canvas')
    const imgDataUrl = gElCanvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        // document.querySelector('.user-msg').innerText = `Your photo is available here: ${uploadedImgUrl}`

        document.querySelector('.share-container').innerHTML = `
        <a class="share-a" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
       Click Here To Share
        </a>`
    }
    doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData();
    formData.append('img', imgDataUrl)

    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}


// The next 2 functions handle IMAGE UPLOADING to img tag from file system: 
function onImgInput(ev) {
    loadImageFromInput(ev, addImg)
}

function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader()

    reader.onload = (event) => {
        console.log('onload');
        var img = new Image()
        // Render on canvas
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result
    }
    console.log('after');
    reader.readAsDataURL(ev.target.files[0])
    renderImgs()
}

function addImgToGallery(btnAddImg) {
    if (btnAddImg.classList.contains('upload')) {
        document.getElementById('getFile').click();
        setTimeout(() => {
            btnAddImg.innerText = 'Add';
            btnAddImg.classList.add('add-img');
            btnAddImg.classList.remove('upload');
        }, 1000);
    } else {
        btnAddImg.innerText = 'Upload';
        btnAddImg.classList.remove('add-img');
        btnAddImg.classList.add('upload');
    }
    renderImgs();
}



