/*
・アップした写真枚数分「imgContainer」を用意してグリッド配置
・「imgContainer」には「サムネ」「回転ボタン」「ナンバリング」「説明フォーム」がある
・「サムネ」をクリックしたら画像が拡大表示
*/

function dragenter(e) {
    e.stopPropagation();
    e.preventDefault();
}
  
function dragover(e) {
    e.stopPropagation();
    e.preventDefault();
}

function drop(e) {
    e.stopPropagation();
    e.preventDefault();
    const files = e.dataTransfer.files;  
    handleFiles(files);
}

function handleFiles(files) {
    let gallery = document.getElementById("imgGallery");
    for (let i = 0; i < files.length; i++) {
        
        
        let container = document.createElement("div");
        container.id = "imgContainer";
        gallery.appendChild(container);
        
        let preview = document.createElement("div");
        preview.id = "imgPreview";
        preview.innerText = "プレビュー";
        container.appendChild(preview);

        let setting = document.createElement("div");
        setting.id = "settingBox";
        setting.innerText = "設定";
        container.appendChild(setting);
        /*
        let file = files[i];
        let img = document.createElement("img");
        // let preview = document.createElement("imgContainer");

        img.classList.add("obj");
        img.file = file;
        preview.appendChild(img);
        
        const reader = new FileReader();
        reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
        reader.readAsDataURL(file);
        */
    }
}




let dropbox;

dropbox = document.getElementById("dropbox");
dropbox.addEventListener("dragenter", dragenter);
dropbox.addEventListener("dragover", dragover);
dropbox.addEventListener("drop", drop);