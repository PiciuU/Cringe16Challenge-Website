<template>
    <div class="features_container">

        <div class="about_challenge">
            <div class="title">#cringe16challenge</div>
            <div class="subtitle">#cringe16challenge to wyzwanie polegające na nagraniu możliwie cringowych 16 wersów i nominowaniu kolejnych osób do akcji, które mają stworzyć swój kawałek w 72 godziny. Jest to pierwsza edycja już legendarnej pseudorapowanej akcji zapoczątkowanej przez ALPHACK.</div><br>
            <div class="application">Odpowiedziałeś/aś na nominację? Zgłoś to klikając <router-link to="/application" target="_blank">TUTAJ</router-link></div>
        </div>

        <div class="media">
            <transition name="fade" mode="out-in">

                <div v-if="media" class="last-answer" key="true">
                    <span class="reply_title">Najnowsza odpowiedź</span>
                     <a :href="latestAnswerVideo" target="_blank" class="video" :style="{ backgroundImage: 'url(' + latestAnswerThumbnail + ')' }">
                        <div class="dimness"></div>
                        <span class="author">{{ latestAnswerTitle }}</span>
                        <div class="play-btn"><span class="arrowhead"></span></div>
                     </a>
                </div>

                <div v-if="!media" class="nominations" key="false">
                    <div>
                        Nominowanych: <span class="red">{{ participants }}</span>
                    </div>
                    <div>
                        Odpowiedzi: <span class="green">{{ answered }}</span>
                    </div>
                </div>

            </transition>
        </div>

    </div>
</template>

<script>
import DataStore from '@/store/dataStore';
export default {
    name: 'Features',
    data() {
        return {
            media: true,

            latestAnswerThumbnail: null,
            latestAnswerVideo: null,
            latestAnswerTitle: null,

            participants: null,
            answered: null
        };
    },
    methods: {
        fetchData() {
            this.latestAnswerThumbnail = DataStore.data.latestAnswerThumbnail;
            this.latestAnswerVideo = DataStore.data.latestAnswerVideo;
            this.latestAnswerTitle = DataStore.data.latestAnswerTitle;

            this.answered = DataStore.data.participants.length;
            setTimeout(function () { this.participants = DataStore.getParticipants(); }.bind(this), 1)
        },
        playAnimation(option) {
            if(option == 'change') this.media = !this.media;
            setTimeout(() => this.playAnimation('change'), 5000);
        },
    },
    mounted() {
        this.playAnimation();
    }
};
</script>

<style lang="scss" scoped>

    .features_container {
        width:100%;
        height:40%;
        border-top: 1px solid black;
        background:#474947;
        color:white;
        box-sizing: border-box;
        display:flex;
        flex-direction: row;
        justify-content:center;
        align-items: center;

        .about_challenge {

            width: 60%;
            padding:0px 50px 0px 100px;
            box-sizing: border-box;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;

            .title {
                font-size:64px;
                font-family:Glenn-Sans;
                margin-bottom:20px;
            }

            .subtitle {
                font-family:Montserrat;
            }

            .application {
                font-size:18px;
                font-family: Montserrat-Bold;

                a {
                    color: red;
                    text-decoration: none;
                    transition: .3s ease-in-out;
                }

            }
        }

        .media {

            width: 40%;
            height: 100%;
            padding:0px 50px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .title {
                font-size:18px;
                font-family:Glenn-Sans;
            }

            .last-answer {
                width:100%;
                max-width:500px;
                height:100%;
                font-size:24px;
                text-align: center;
                font-family:Glenn-Sans;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                span {
                    margin-bottom:10px;
                }

                .video {
                    position:relative;
                    width:100%;
                    max-width:450px;
                    height:65%;
                    background-position:center;
                    background-repeat: no-repeat;
                    background-size: cover;
                    color:white;
                    text-decoration: none;
                    font-family:Montserrat;
                    text-align:left;
                    border-radius:10px;

                    .dimness {
                        width:100%;
                        height:100%;
                        position:absolute;
                        background: rgba(0,0,0,0.5);
                        border-radius:10px;
                        transition: .5s ease-in-out;
                    }

                    &:hover > .play-btn:before {
                        animation: pulse-border 1500ms ease-out;
                    }

                    &:hover > .dimness {
                        background: rgba(0,0,0,0.1);
                    }

                    .author {
                        font-size:16px;
                        margin:10px;
                        position:absolute;
                    }

                    .play-btn {
                        position: absolute;
                        z-index: 10;
                        top: 50%;
                        left: 50%;
                        transform: translateX(-50%) translateY(-50%);
                        box-sizing: content-box;
                        display: block;
                        width: 32px;
                        height: 44px;
                        border-radius: 50%;
                        padding: 18px 20px 18px 28px;

                        &:before {
                            content: "";
                            position: absolute;
                            z-index: 0;
                            left: 50%;
                            top: 50%;
                            transform: translateX(-50%) translateY(-50%);
                            display: block;
                            width: 80px;
                            height: 80px;
                            background: #ba1f24;
                            border-radius: 50%;
                        }

                        &:after {
                            content: "";
                            position: absolute;
                            z-index: 1;
                            left: 50%;
                            top: 50%;
                            transform: translateX(-50%) translateY(-50%);
                            display: block;
                            width: 80px;
                            height: 80px;
                            background: #fa183d;
                            border-radius: 50%;
                            transition: all 200ms;
                        }

                        .arrowhead {
                            display: block;
                            position: relative;
                            z-index: 3;
                            width: 0;
                            height: 0;
                            border-left: 32px solid #fff;
                            border-top: 22px solid transparent;
                            border-bottom: 22px solid transparent;
                        }
                    }

                    @keyframes pulse-border {
                        0% {
                            transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1);
                            opacity: 1;
                        }
                        100% {
                            transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1.5);
                            opacity: 0;
                        }
                    }
                }
            }

            .nominations {
                width:100%;
                height:100%;
                display:flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                div {
                    font-family:Montserrat-Bold;
                    font-size:32px;

                    .red {
                        color:#E9190F;
                    }

                    .green {
                        color: #08A045;
                    }
                }
            }
        }
    }

    @media (max-width:1024px) {
        .features_container {
            height:80%;
            min-height:500px;
            flex-direction: column;

            .about_challenge {
                width:100%;
                padding:0px 20px;
                align-items:center;
                margin-top:20px;

                .title {
                    font-size:34px;
                }
            }

            .media {
                width: 100%;
                padding:0;

                .last-answer {
                    .reply_title {
                        font-size:24px;
                        margin-bottom:20px;
                    }

                    .video {
                        width: 85%;
                    }
                }
            }
        }
    }

    @media (max-width:360px) {
        .features_container > .about_challenge {
            .title {
                font-size:30px;
            }
            .subtitle {
                font-size:14px;
            }
            .application {
                font-size:16px;
            }
        }
        .features_container > .media {
            .nominations > div {
                font-size:28px;
            }
        }
    }


    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

</style>