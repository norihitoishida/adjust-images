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
        
        // コンテナ全体を作る
        let container = document.createElement("div");
        container.id = "imgContainer";
        gallery.appendChild(container);
        
        // プレビュー欄を作る
        let preview = document.createElement("div");
        preview.id = "imgPreview";
        container.appendChild(preview);

        // imageを読み込み
        let img = document.createElement("img");
        let file = files[i];
        img.file = file;
        
        // リサイズ
        // let ratio = img.width / img.height;
        img.height = 140;

        // 貼り付け
        preview.appendChild(img);
        let reader = new FileReader();
        reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
        reader.readAsDataURL(file);
        
        // 設定ボックス(回転・削除)
        let settingbox = document.createElement("div");
        settingbox.id = "settingBox";
        settingbox.innerText = "設定";
        container.appendChild(settingbox);

        // コメント欄
        let commentbox = document.createElement("textarea");
        commentbox.id = "commentBox";
        commentbox.placeholder = "コメント";
        container.appendChild(commentbox);
    }
}




let dropbox;

dropbox = document.getElementById("dropbox");
dropbox.addEventListener("dragenter", dragenter);
dropbox.addEventListener("dragover", dragover);
dropbox.addEventListener("drop", drop);