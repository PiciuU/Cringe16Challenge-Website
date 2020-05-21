<template>
    <div v-dragscroll="true" id="diagram-scroll" class="diagram" @click="checkClick">
        <TreeChart id="diagram" :json="treeData"/>
    </div>
</template>

<script>
import TreeChart from "vue-tree-chart";
import DataStore from '../store/dataStore';
import { dragscroll } from 'vue-dragscroll';

export default {
    name: 'Home',
    components: {
        TreeChart,
    },
    directives: {
        'dragscroll': dragscroll
    },
    data() {
        return {
            diagramZoom: DataStore.data.diagramZoom,
            zoomValue: DataStore.data.zoomValue,
            mobileZoom: DataStore.data.mobileZoom,
            mobileZoomValue: DataStore.data.mobileZoomValue,
            divider: DataStore.data.divider,

            treeData: DataStore.data.treeData,
            participants: DataStore.data.participants,
        };
    },
    methods: {
        mobileZoomFunc(mode) {
            if(mode == "in") this.mobileZoom = this.mobileZoom + this.mobileZoomValue;
            else this.mobileZoom = this.mobileZoom - this.mobileZoomValue
            document.querySelector('#diagram').style.zoom = this.mobileZoom;
        },
        checkClick(event) {
            if(event.target.classList.contains('extend_handle')) {
                this.recolorParticipants();
            }
            let object = event.target.parentElement.parentElement

            if(object.classList.contains('person'))
            {
                let child = object.lastChild.innerHTML.toLowerCase();

                for(let i=0; i < this.participants.length; i++) {
                    if(this.participants[i].name == child && this.participants[i].link != '') {
                        window.open(this.participants[i].link);
                    }
                }
            }
        },
        recolorParticipants() {
            let participants_view = document.querySelectorAll(".name");
            let avatars = document.querySelectorAll(".avat");

            for(let i=0; i < this.participants.length; i++) {
                for(let x=0; x < participants_view.length; x++) {
                    if(this.participants[i].name == participants_view[x].innerHTML.toLowerCase()) {
                        participants_view[x].style.color = "#08A045";
                        avatars[x].style.cssText = "border-color: #08A045 !important; cursor: pointer";
                    }
                }
            }
        },
        handleScroll(event) {
            if(event.wheelDeltaY == 120 || event.deltaY == -3 ) {
                this.diagramZoom = this.diagramZoom + this.zoomValue;
            } else if((event.wheelDeltaY == -120  || event.deltaY == 3) && this.diagramZoom > 0.35) {
                this.diagramZoom = this.diagramZoom - this.zoomValue;
            }

            document.querySelector('#diagram').style.zoom = this.diagramZoom;

            document.querySelector('#diagram').style.cssText += "-moz-transform:scale(" + this.diagramZoom + ")";
            document.querySelector('#diagram').style.cssText += "-moz-transform-origin: top left";
        },
        rescalePage() {
            if(window.screen.width < 768) {
                document.querySelector('#diagram').style.zoom = this.mobileZoom;

                document.querySelector('#diagram').style.cssText += "-moz-transform:scale(" + this.mobileZoom + ")";
                document.querySelector('#diagram').style.cssText += "-moz-transform-origin: top left";
            } else {
                document.querySelector('#diagram').style.zoom = this.diagramZoom;

                document.querySelector('#diagram').style.cssText += "-moz-transform:scale(" + this.diagramZoom + ")";
                document.querySelector('#diagram').style.cssText += "-moz-transform-origin: top left";
            }
            let width = document.querySelector("#diagram").getBoundingClientRect().width;
            let content = document.querySelector("#diagram-scroll");
            // let page = document.querySelector("#diagram-scroll").getBoundingClientRect().width;
            content.scrollLeft += width / DataStore.data.divider;

            // let loop = true;
            // let start = 200;
            // let startSize = 1400;

            // console.log(width, page);
            // // Psuedopozycjonowanie -> Zrobić jeszcze skalowanie przy powiększaniu diagramu bo aktualnie powiększa poprawnie tylko na szerokości która jest przy aktualnym drzewku

            // while(loop) {
            //     if(page <= start)
            //     {
            //         console.log(startSize);
            //         content.scrollLeft += startSize;
            //         loop = false;
            //     } else {
            //         start = start + 100;
            //         startSize = startSize - 50;
            //     }
            // }
            // content.scrollLeft += width / DataStore.data.divider;

            // Wyświetlacz 200 - scrollLeft 1400
            // Wyświetlacz 1000 - scrollLeft 1000
            // Wyświetlacz 1900 - scorllLeft 550
        },
    },
    mounted() {
        this.recolorParticipants();
        this.rescalePage();
        document.querySelector('#diagram-scroll').addEventListener('wheel', this.handleScroll);
    },
    destroyed () {
        document.querySelector('#diagram-scroll').removeEventListener('wheel', this.handleScroll);
    },
};
</script>

<style lang="scss">

    .diagram {
        position: relative;
        font-family: Glenn-Sans;
        overflow: hidden;
        height:100%;
        background:whitesmoke;
        cursor:grab;
    }

    table {
        font-family: Glenn-Sans;
        margin:0 auto;
        width:100% !important;
        margin-top:10px;
        margin-bottom:-100px;
    }

    .person {
        overflow: unset !important;
    }

    .avat {
        border-radius:50%;
        width:5em !important;
        height:5em !important;
        border: 5px solid #E9190F !important;
        transition: all .3s ease-in-out;
    }

    .avat:hover {
        transform:scale(1.15);
    }

    .avat:hover ~ .name {
        margin-top:10px;
    }

    .name {
        width: 208px !important;
        margin-left: -55px;
        color:#E9190F;
        transition: all .3s ease-in-out;
        z-index:999;
        line-height:0px !important;
        padding-top:15px;
        box-sizing: border-box;
    }

    .childLevel[data-v-3e1326fa]:before, .extend[data-v-3e1326fa]:after {
        border-color: rgb(150, 150, 150) !important;
    }

    .childLevel[data-v-3e1326fa]:first-child:after {
        border-color: rgb(150, 150, 150) transparent transparent rgb(150, 150, 150) !important;
    }

    .childLevel[data-v-3e1326fa]:last-child:after {
        border-color: rgb(150, 150, 150) rgb(150, 150, 150) transparent transparent !important;
    }

    .childLevel[data-v-3e1326fa]:after {
        border-top: 2px solid rgb(150, 150, 150) !important;
    }

    .extend_handle[data-v-3e1326fa]:before {
        border-color: rgb(150, 150, 150) rrgb(150, 150, 150)d transparent transparent !important;
    }
</style>
