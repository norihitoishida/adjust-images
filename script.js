let n_drop=0; // ドロップ回数(idをユニークにするために用意)
let uniqueid;

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

function del() {
    uniqueid = this.id.slice(13,);
    let delContainer = document.getElementById(`imgContainer_${uniqueid}`);
    delContainer.remove();
}

function rotateLeft() {
    uniqueid = this.id.slice(17,);
    let targetimg = document.getElementById(`img_${uniqueid}`);
    let angle = Number(targetimg.name);
    angle = (angle - 90) % 360;
    targetimg.name = angle;
    targetimg.style.transform = `rotate(${angle}deg)`;
}

function rotateRight() {
    uniqueid = this.id.slice(18,);
    let targetimg = document.getElementById(`img_${uniqueid}`);
    let angle = Number(targetimg.name);
    angle = (angle + 90) % 360;
    targetimg.name = angle;
    targetimg.style.transform = `rotate(${angle}deg)`;

    let targetcontainer = document.getElementById(`imgContainer_${uniqueid}`);
    targetcontainer.height = Math.max(targetimg.height, targetimg.width);
}

function handleFiles(files) {
    n_drop++;
    let gallery = document.getElementById("imgGallery");

    for (let i = 0; i < files.length; i++) {
        uniqueid = `${n_drop}_${i}`;

        // コンテナ全体を作る
        let container = document.createElement("div");
        container.className = "imgContainer";
        container.id = `imgContainer_${uniqueid}`;
        gallery.appendChild(container);
        
        // プレビュー欄を作る
        let preview = document.createElement("div");
        preview.className = "imgPreview";
        preview.id = `imgPreview_${uniqueid}`;
        container.appendChild(preview);

        // imageを読み込み
        let img = document.createElement("img");
        img.classList.add("obj");
        img.id = `img_${uniqueid}`;
        img.name = 0; //角度
        let file = files[i];
        img.file = file;
        img.style.transform = "translateY(50%)";
                
        // 貼り付け
        preview.appendChild(img);
        let reader = new FileReader();
        reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
        reader.readAsDataURL(file);
        
        
        // リサイズ
        if (img.height > img.width) {
            // 縦長
            img.height = 140;
        } else {
            // 横長
            img.width = 140;
        }
        container.height += 10;        

        // 設定ボックス(回転・削除)
        let settingbox = document.createElement("div");
        settingbox.className = "settingBox";
        settingbox.id = `settingBox_${uniqueid}`;
        container.appendChild(settingbox);

        // 設定ボックスに回転ボタンを追加
        let rotatebutton_left = document.createElement("button");
        rotatebutton_left.id = `rotateButtonLeft_${uniqueid}`;
        rotatebutton_left.textContent = "左回転";
        settingbox.appendChild(rotatebutton_left);
        rotatebutton_left.addEventListener("click", rotateLeft);

        let rotatebutton_right = document.createElement("button");
        rotatebutton_right.id = `rotateButtonRight_${uniqueid}`;
        rotatebutton_right.textContent = "右回転";
        settingbox.appendChild(rotatebutton_right);
        rotatebutton_right.addEventListener("click", rotateRight);

        // 設定ボックスに削除ボタンを追加
        let delbutton = document.createElement("button");
        delbutton.id = `deleteButton_${uniqueid}`;
        delbutton.textContent = "クリア";
        settingbox.appendChild(delbutton);
        delbutton.addEventListener("click", del);

        // コメント欄
        let commentbox = document.createElement("textarea");
        commentbox.className = "commentBox";
        commentbox.id = `commentBox_${uniqueid}`;
        commentbox.placeholder = "コメント";
        container.appendChild(commentbox);
    }
}

let dropbox;
dropbox = document.getElementById("dropbox");
dropbox.addEventListener("dragenter", dragenter);
dropbox.addEventListener("dragover", dragover);
dropbox.addEventListener("drop", drop);
