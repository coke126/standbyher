<template>
    <div class="homepage">
        <div class="container">
            <div class="img-wrapper" ref="cutimg">
                <div class="user-image" >
                    <img :src="modelSrc" v-if="model"/>
                    <vueCropper
                    v-else
                    ref="cropper"
                    :img="option.img"
                    :outputSize="option.size"
                    :outputType="option.outputType"
                    :full="option.full"
                    :original="option.original"
                    :autoCrop="option.autoCrop"
                    :autoCropWidth="option.autoCropWidth"
                    :autoCropHeight="option.autoCropHeight"
                    :fixedBox="option.fixedBox"
                    ></vueCropper>
                    <input id="upload_pic" ref="uploadpic" type="file" accept='image/*' style="display: none;" name="file" @change="fileChange($event)" />
                </div>
                <div class="cover-image" ></div>
            </div>
            <div id="btns">
                <button class="upload-btn" @click.stop="choosepic()">选择图片</button>
                <button class="save-btn" @click.stop=" generatorImage()">下载图片</button>
            </div>
        </div>
    </div>
</template>

<script>
import html2canvas from 'html2canvas';
export default {
    data(){return{
        option:{
            img: '', // img的URL或者base64
            size: 1,
            outputType: 'png',
            full: true,
            original: false,  // 上传图片是否显示原始宽高
            canMove: true,  // 能否拖动图片
            autoCrop: true, // 是否默认生成截图框
            autoCropWidth: 600, 
            autoCropHeight: 800, 
            fixedBox: true// 截图框固定大小
         },
         model: false,
         modelSrc: ''
    }},
    methods:{
        choosepic(){
           
            this.$refs.uploadpic.click();
        },
        fileChange(){
            let files= this.$refs.uploadpic.files;
            var reader = new FileReader();
            var content;
            var current=this;
            reader.onload = function(event) {
                content = event.target.result;
                //console.log(content)
               // current.ImgList.push(content);// 形成预览的图片数组
               current.option.img=content
            }   
            reader.onerror = function() {
                alert('error')
            }
            content = reader.readAsDataURL(files[0],"UTF-8");  
        },
        random_string (){
            function preDate_string() {
                let NowDay = new Date()
                let YY = NowDay.getFullYear().toString()
                let MM=NowDay.getMonth() + 1
                MM = MM > 10 ? MM : '0' + MM;
                let DD = NowDay.getDate()
                DD = DD > 10 ? DD : '0' + DD
                return YY + MM + DD
            }
            const len = 16
            var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
            var maxPos = chars.length
            const preDate = preDate_string()
            var pwd = ''
            for (let i = 0; i < len; i++) {
                pwd += chars.charAt(Math.floor(Math.random() * maxPos))
            }
            // 随机文件名之前加上时间前缀
            pwd = preDate + pwd
            return pwd
        },
        generatorImage() {
            this.$refs.cropper.getCropData((data) => { 
                this.model = true; 
                this.modelSrc = data; 
            }) 
            setTimeout(()=>{
                html2canvas(this.$refs.cutimg,{
                    backgroundColor: null
                }).then(canvas => {
                    // this.$refs.addImage.append(canvas);//在下面添加canvas节点
                    let link = document.createElement("a");
                    link.href = canvas.toDataURL();//下载链接
                    link.setAttribute("download",this.random_string()+".png");
                    link.style.display = "none";//a标签隐藏
                    document.body.appendChild(link);
                    link.click();
                });
                this.model= false
                this.modelSrc= '';
            },800)
            
        },
    }
}
</script>

<style lang="scss" scoped>
.homepage {
    width: 100%;

    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .img-wrapper {
            width: 300px;
            height: 400px;
            position: relative;
            .user-image {
                width: 100%;
                height: 100%;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .cover-image {
                width: 100%;
                height: 100%;
                position: absolute;
                top:0;left: 0;
                z-index: 99;
                background: url('../assets/images/WechatIMG54.png') no-repeat center/cover;
                user-select: none;
                pointer-events: none;
            }
        }
        #btns {
            margin-top: 40px;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            button {
                width: 180px;
                height: 50px;
                border-radius: 4px;
                background: #f0f0f0;
                border: 0;
                outline: none;
                &:first-child {
                    margin-right: 80px;
                }
            }
        }
    }
}
</style>