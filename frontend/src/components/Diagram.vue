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
            diagramZoom: null,
            zoomValue: null,
            mobileZoom: null,
            mobileZoomValue: null,
            divider: null,

            treeData: null,
            participants: null,

            percentageX: 50,
        };
    },
    methods: {
        fetchData() {
            this.diagramZoom = DataStore.data.diagramZoom,
            this.zoomValue = DataStore.data.zoomValue,
            this.mobileZoom = DataStore.data.mobileZoom,
            this.mobileZoomValue = DataStore.data.mobileZoomValue,
            this.divider = DataStore.data.divider,
            this.treeData = DataStore.data.treeData;
            this.participants = DataStore.data.participants;
            setTimeout(this.recolorParticipants, 1);
            setTimeout(this.rescalePage, 1);
        },
        mobileZoomFunc(mode) {
            if(mode == "in") this.mobileZoom = this.mobileZoom + this.mobileZoomValue;
            else this.mobileZoom = this.mobileZoom - this.mobileZoomValue
            document.querySelector('#diagram').style.zoom = this.mobileZoom;
        },
        checkClick(event) {
            if(event.target.classList.contains('extend_handle')) { // Ponowne przekolorowanie odpowiedzi przy zamknięciu gałęzi
                this.recolorParticipants();
            }
            let object = event.target.parentElement.parentElement;

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
                this.zoomToCursor("in",event)
            } else if((event.wheelDeltaY == -120  || event.deltaY == 3) && this.diagramZoom > 0.25) {
                this.diagramZoom = this.diagramZoom - this.zoomValue;
                this.zoomToCursor("out",event);
            }

            document.querySelector('#diagram').style.zoom = this.diagramZoom;

            document.querySelector('#diagram').style.cssText += "-moz-transform:scale(" + this.diagramZoom + ")";
            document.querySelector('#diagram').style.cssText += "-moz-transform-origin: top left";
        },
        zoomToCursor(mode,event) {
            let windowWidth = window.innerWidth;
            let windowHeight = document.querySelector('#diagram-scroll').getBoundingClientRect().height;
            let diagram = document.querySelector("#diagram-scroll");
            let valueX = 300;
            let valueY = 100;
            let divider = 8;

            if(mode == "in") {
                if(event.screenX < windowWidth/2) // kliknięcie w lewo
                {
                    if(event.screenY < windowHeight/2) {
                        //console.log("lewo góra");
                        diagram.scrollLeft -= valueX / divider;
                        diagram.scrollTop -= valueY;
                    }
                    else if(event.screenY > windowHeight/2) {
                        //console.log("lewo dół");
                        diagram.scrollLeft -= valueX / divider;
                        diagram.scrollTop += valueY;
                    }
                }
                else if(event.screenX > windowWidth/2)  // kliknięcie w prawo
                {
                    if(event.screenY < windowHeight/2) {
                        //console.log("prawo góra");
                        diagram.scrollLeft += valueX;
                        diagram.scrollTop -= valueY;
                    }
                    else if(event.screenY > windowHeight/2) {
                        //console.log("prawo dół");
                        diagram.scrollLeft += valueX;
                        diagram.scrollTop += valueY;
                    }
                }
            }
            else if(mode == "out") {
                if(event.screenX < windowWidth/2) // kliknięcie w lewo
                {
                    if(event.screenY < windowHeight/2) {
                        //console.log("lewo góra");
                        diagram.scrollLeft += valueX / divider;
                        diagram.scrollTop -= valueY;
                    }
                    else if(event.screenY > windowHeight/2) {
                        //console.log("lewo dół");
                        diagram.scrollLeft += valueX / divider;
                        diagram.scrollTop -= valueY;
                    }
                }
                else if(event.screenX > windowWidth/2)  // kliknięcie w prawo
                {
                    if(event.screenY < windowHeight/2) {
                       //console.log("prawo góra");
                        diagram.scrollLeft -= valueX;
                        diagram.scrollTop -= valueY;
                    }
                    else if(event.screenY > windowHeight/2) {
                        //console.log("prawo dół");
                        diagram.scrollLeft -= valueX;
                        diagram.scrollTop -= valueY;
                    }
                }
            }
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
            content.scrollLeft += width / DataStore.data.divider;
        },
    },
    mounted() {
        document.querySelector('#diagram-scroll').addEventListener('wheel', this.handleScroll);
    },
    destroyed () {
        document.querySelector('#diagram-scroll').removeEventListener('wheel', this.handleScroll);
    },
};
</script>

<style lang="scss">

    #diagram {
    }

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
        transform-origin: 50% 50%;
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

    img {
        width: 70px !important;
        height: 70px !important;
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
