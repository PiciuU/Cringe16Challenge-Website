export default {

    data: {

        diagramZoom: 0.9, // Przybliżenie diagramu dla PC
        mobileZoom: 0.5, // Przybliżenie diagramu dla telefonów
        zoomValue: 0.1, // Prędkość przybliżania dla PC
        mobileZoomValue: 0.01, // Prędkość przybliżania dla telefonów

        divider: 4,  // Dzielnik dla diagramu do środkowania

        newestAnswerLink: 'https://www.youtube.com/watch?v=PyhR3Ekty-0&list=PLWcG9PJhXKyKgFiswMtY5kIBX5F-3yb8Z&index=10', // Link do najnowszej odpowiedzi
        newestAnswerThumbnail: 'https://img.youtube.com/vi/PyhR3Ekty-0/hqdefault.jpg', // Link do miniaturki - wstawić url filmu
        newestAnswerTitle: 'Laska Kuli #cringe16challenge', // Tytuł odpowiedzi

        treeData: { // Drzewko nominacji
            name: 'piciuhombre',
            image_url: require("@/assets/imgs/piciuhombre.jpg"),

            children: [
            {
                name: 'vxEr',
                image_url: require("@/assets/imgs/vxEr.jpg"),

                children: [
                {
                    name: 'Kasia Krzanowska',
                    image_url: require("@/assets/imgs/Kasia Krzanowska.jpg"),

                    children: [
                        {
                            name: 'Kamila Zajchowska',
                            image_url: require("@/assets/imgs/Kamila Zajchowska.jpg"),
                        },
                        {
                            name: 'Daniel Wiernasz',
                            image_url: require("@/assets/imgs/Daniel Wiernasz.jpg"),
                        },
                        {
                            name: 'Szczaku',
                            image_url: require("@/assets/imgs/noname.jpg"),
                        },
                        {
                            name: 'Patle`Daniel',
                            image_url: require("@/assets/imgs/Patle`Daniel.jpg"),
                        },
                        {
                            name: 'Laska Kuli',
                            image_url: require("@/assets/imgs/Oliwka Zielińska.jpg"),

                            children: [
                                {
                                    name: 'Kula',
                                    image_url: require("@/assets/imgs/Kula.jpg"),
                                },
                                {
                                    name: 'Krecik',
                                    image_url: require("@/assets/imgs/noname.jpg"),
                                },
                                {
                                    name: 'Kremcia',
                                    image_url: require("@/assets/imgs/Kremcia.jpg"),
                                },
                                {
                                    name: 'Zielu',
                                    image_url: require("@/assets/imgs/noname.jpg"),
                                },
                            ],
                        },
                        {
                            name: 'Jacob Wheeles',
                            image_url: require("@/assets/imgs/Jacob Wheeles.jpg"),

                            children: [
                                {
                                    name: 'Igor Dudek',
                                    image_url: require("@/assets/imgs/Igor Dudek.jpg"),
                                },
                                {
                                    name: 'Mikołaj Lachiewicz',
                                    image_url: require("@/assets/imgs/Mikołaj Lachiewicz.jpg"),
                                },
                                {
                                    name: 'Damian Mularczyk',
                                    image_url: require("@/assets/imgs/noname.jpg"),
                                },
                                {
                                    name: 'Szubidubidu',
                                    image_url: require("@/assets/imgs/Szubidubidu.jpg"),
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'Michał Niżnik',
                    image_url: require("@/assets/imgs/Michał Niżnik.jpg"),
                },
                {
                    name: 'Monika Serwińska',
                    image_url: require("@/assets/imgs/Monika Serwińska.jpg"),
                },
                {
                    name: 'Trybunyrator',
                    image_url: require("@/assets/imgs/Trybunyrator.jpg"),

                    children: [
                        {
                            name: 'Jakub Zygmunt',
                            image_url: require("@/assets/imgs/Jakub Zygmunt.jpg"),

                            children: [
                                {
                                    name: 'Kacpulol',
                                    image_url: require("@/assets/imgs/kacpulol.jpg"),
                                },
                                {
                                    name: 'Pasti',
                                    image_url: require("@/assets/imgs/noname.jpg"),
                                },
                                {
                                    name: 'Rav',
                                    image_url: require("@/assets/imgs/noname.jpg"),
                                },
                            ],
                        },
                        {
                            name: 'Buczo',
                            image_url: require("@/assets/imgs/Buczo.jpg"),

                            children: [
                                {
                                    name: 'Nyaxize',
                                    image_url: require("@/assets/imgs/Nyaxize.jpg"),
                                },
                                {
                                    name: 'ALPHACK',
                                    image_url: require("@/assets/imgs/alphack.jpg"),
                                },
                            ],
                        },
                        {
                            name: 'Michał Kisiołek',
                            image_url: require("@/assets/imgs/Michał Kisiołek.jpg"),
                        }
                    ],
                },
                {
                    name: 'Dunk',
                    image_url: require("@/assets/imgs/dunk.jpg"),

                    children: [
                        {
                            name: 'Herbata',
                            image_url: require("@/assets/imgs/herbata.jpg"),
                        },
                        {
                            name: 'Jaca',
                            image_url: require("@/assets/imgs/jaca.jpg"),
                        },
                        {
                            name: 'Remigiusz',
                            image_url: require("@/assets/imgs/remigiusz.jpg"),

                            children: [
                                {
                                    name: 'grundi',
                                    image_url: require("@/assets/imgs/noname.jpg"),
                                },
                                {
                                    name: 'żelek',
                                    image_url: require("@/assets/imgs/noname.jpg"),
                                },
                            ],
                        },
                    ],
                },
                ],

            },
            ],
        },

        participants: [ // Odpowiedzi uczestników
            {
                name: 'piciuhombre',
                link: 'https://www.youtube.com/watch?v=JKxRD2D0shA&list=PLWcG9PJhXKyKgFiswMtY5kIBX5F-3yb8Z&index=1',
            },
            {
                name: 'vxer',
                link: 'https://www.youtube.com/watch?v=P99E0TqwT3k&list=PLWcG9PJhXKyKgFiswMtY5kIBX5F-3yb8Z&index=3',
            },
            {
                name: 'trybunyrator',
                link: 'https://www.youtube.com/watch?v=k13sBWrSW_o&list=PLWcG9PJhXKyKgFiswMtY5kIBX5F-3yb8Z&index=4',
            },
            {
                name: 'dunk',
                link: 'https://www.youtube.com/watch?v=8LAiMbn_2QY&list=PLWcG9PJhXKyKgFiswMtY5kIBX5F-3yb8Z&index=5',
            },
            {
                name: 'buczo',
                link: 'https://www.youtube.com/watch?v=IwMzU5rSWLM&list=PLWcG9PJhXKyKgFiswMtY5kIBX5F-3yb8Z&index=6',
            },
            {
                name: 'remigiusz',
                link: 'https://www.youtube.com/watch?v=_Da3Rm6OOjc&list=PLWcG9PJhXKyKgFiswMtY5kIBX5F-3yb8Z&index=7',
            },
            {
                name: 'kasia krzanowska',
                link: 'https://www.youtube.com/watch?v=sh1SewaaX-s&list=PLWcG9PJhXKyKgFiswMtY5kIBX5F-3yb8Z&index=7',
            },
            {
                name: 'jacob wheeles',
                link: 'https://www.youtube.com/watch?v=AIkvjV_iVl4&list=PLWcG9PJhXKyKgFiswMtY5kIBX5F-3yb8Z&index=9&t=0s',
            },
            {
                name: 'jakub zygmunt',
                link: 'https://www.youtube.com/watch?v=YzNErFYh1CM&list=PLWcG9PJhXKyKgFiswMtY5kIBX5F-3yb8Z&index=9',
            },
            {
                name: 'laska kuli',
                link: 'https://www.youtube.com/watch?v=PyhR3Ekty-0&list=PLWcG9PJhXKyKgFiswMtY5kIBX5F-3yb8Z&index=10',
            },
        ],
    },


    getAnswers() { // Zwrócenie ilości odpowiedzi
        return this.data.participants.length;
    },

    getParticipants() { // Zwrócenie ilości nominowanych
        return document.querySelectorAll(".name").length;
    }

}