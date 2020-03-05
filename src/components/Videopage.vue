<template>
    <div class="Videopage">
        <div class="text-content">
            疫情初期，女性医护人员和女性患者的经期用品稀缺问题被忽略。经期在我们生活中一直是
            羞于启齿的话题。我们希望可以帮助女性更坦然更自由地讨论月经。
        </div>
        <div class="video-list">
            <div class="title">
                <span class="text">她说</span>
                <span class="color-box"></span>
            </div>
            <ul>
                <li>
                    <div class="avatar"></div>
                    <div class="talk-box">
                        <span class="word">一句话</span>
                    </div>
                    <div class="video-btn" @click.stop="playVideo()"></div>
                </li>
                 <li>
                    <div class="avatar"></div>
                    <div class="talk-box">
                        <span class="word">一句话</span>
                    </div>
                    <div class="video-btn"></div>
                </li>
                 <li>
                    <div class="avatar"></div>
                    <div class="talk-box">
                        <span class="word">一句话</span>
                    </div>
                    <div class="video-btn"></div>
                </li>
            </ul>
        </div>
         <ComfirmPop ref="myConfirm" @userBehavior="userBehaviorFun"></ComfirmPop>
    </div>
</template>

<script>
import ComfirmPop from './ConfirmPop/index'
export default {
    components:{ ComfirmPop },
    methods:{
        playVideo(){
            this.$refs.myConfirm.show('确定取消订单么?',{
                cancelText:'取消订单',
                confirmText:'再考虑一下',
                type: 'confirm',
            })
        },
        userBehaviorFun(type){
            if(type=='clickCancel'){
                
                
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.Videopage {
    width: 100vw;
    height: 100vh;
    background-color: #d9e8f4;
    padding: 100px 80px;
    .text-content {
        width: 100%;
        font-size: 30px;
        margin-bottom: 60px;
    }
    .video-list  {
        width: 100%;
        &>.title {
            position: relative;
            display: inline-block;
            height: 68px;
            margin-bottom: 50px;
            .text {
                display: inline-block;
                padding-left: 40px;
                font-size: 56px;
                color: rgba(0, 111, 195, 1);
                letter-spacing: 4px;
                position: relative;
                z-index: 2;
            }
            .color-box {
                display: inline-block;
                width: 100%;
                height: 22px;
                position:absolute;
                bottom: 0;left: 0;
                background-color: rgba(86, 219, 245, 0.58);
                z-index: 0;
            }
        }
        &>ul {
            width: 100%;
            li {
                width: 100%;
                display: flex;
                align-items: center;
                position: relative;
                margin-bottom: 60px;
                &>.avatar {
                    width: 100px;
                    height: 100px;
                    border: 4px solid rgba(0, 111, 195, 1);
                    border-radius: 6px;
                    background: yellowgreen;
                    margin-right: 50px;
                }
                &>.talk-box {
                    width: calc(100% - 230px);
                    min-height: 80px;
                    position: relative;
                    border: 2px solid rgba(0, 111, 195, 1);
                    background: #FFF;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    &>.word {
                        width: 100%;
                        height: 100%;
                        background: #FFF;
                        position: relative;
                        z-index: 3;
                        padding: 0 16px;
                    }
                    &::before {
                        content: '';
                        display: block;
                        width: 24px;
                        height: 24px;
                        border-top: 2px solid rgba(0, 111, 195, 1);
                        border-left: 2px solid rgba(0, 111, 195, 1);
                        background: #FFF;
                        transform: rotate(- 45deg) translateY(-55%);
                        position: absolute;
                        top: 46%;
                        left: - 5px;
                    }
                }
                &>.video-btn {
                    width: 70px;
                    height: 70px;
                    background: url('../assets/images/video_play.svg') no-repeat center/cover;
                    border-radius: 50%;
                    margin-left: 30px;
                }
            }
        }
    }
}
</style>