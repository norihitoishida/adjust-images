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
    alert(files.length);
    for (let i = 0; i < files.length; i++) {
        
        
        let container = document.createElement("div");
        container.id = "imgContainer";
        container.innerText = `コンテナ No.${i+1}`;
        gallery.appendChild(container);
        
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