import axios from 'axios';
export default {

    data: {
        diagramZoom: null, // Przybliżenie diagramu dla PC
        mobileZoom: null, // Przybliżenie diagramu dla telefonów
        zoomValue: null, // Prędkość przybliżania dla PC
        mobileZoomValue: null, // Prędkość przybliżania dla telefonów

        divider: null,  // Dzielnik dla diagramu do środkowania

        latestAnswerVideo: null, // Link do najnowszej odpowiedzi
        latestAnswerThumbnail: null, // Link do miniaturki - wstawić url filmu
        latestAnswerTitle: null, // Tytuł odpowiedzi

        treeData: null, // Drzewko nominacji
        participants: null, // Odpowiedzi uczestników
    },

    // Pobieranie danych z bazy i ich przypisanie do magazynu
    fetchData() {
        // console.log(JSON.stringify(this.datas.treeData));
        return axios.get('/api/data')
        .then((response) =>{
            this.data.diagramZoom = parseFloat(response.data[0].diagram_zoom);
            this.data.mobileZoom = parseFloat(response.data[0].mobile_zoom);
            this.data.zoomValue = parseFloat(response.data[0].zoom_value);
            this.data.mobileZoomValue = parseFloat(response.data[0].mobile_zoom_value);
            this.data.divider = parseFloat(response.data[0].divider);

            this.data.latestAnswerVideo = response.data[0].last_answer_video;
            this.data.latestAnswerThumbnail = response.data[0].last_answer_thumbnail;
            this.data.latestAnswerTitle = response.data[0].last_answer_title;
            this.data.treeData = JSON.parse(response.data[0].nominations);
            this.data.participants = JSON.parse(response.data[0].answered);
        })
        .catch((error) => {
            console.log(error);
        })
    },

    // Zwrócenie ilości nominowanych
    getParticipants() {
        return document.querySelectorAll(".name").length;
    },
}