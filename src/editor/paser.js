export default function () {
    document.body.addEventListener('paste', function (e) {
        let clipboardData = e.clipboardData;
        if (clipboardData) {
            let data = clipboardData.items;
            if (data.length) {
                for (let i = 0; i < data.length; i++) {
                    let item = data[i];

                    if (item.kind === "file" ) {
                        let FileBlob = item.getAsFile()
                        console.log("file");
                        console.log(FileBlob);
                        console.log(quill.getLength());
                        if( item.type.startsWith("image/")){
                            if (FileBlob.size >= 1024 * 20) {
                                console.log("loading");
                                alert("文件超大")
                                break;
                            }
                            const {
                                type
                            } = item
                            let reader = new FileReader();
                            reader.readAsDataURL(FileBlob);
                            reader.onload = (e) => {
                                quill.insertEmbed(quill.getLength(), "image", e
                                    .target.result);
                            };
                        }else{
                            quill.insertEmbed(quill.getLength()-1, "FileEmbed", {File:FileBlob,callback:saveTxt()});
                            console.log(FileBlob);
                        }
                    }else{
                        console.log('txt',item);
                    }
                }
            }
        }

}