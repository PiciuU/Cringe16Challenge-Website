import axios from 'axios';
export default {

    datas: {

        diagramZoom: 0.9, // Przybliżenie diagramu dla PC
        mobileZoom: 0.5, // Przybliżenie diagramu dla telefonów
        zoomValue: 0.1, // Prędkość przybliżania dla PC
        mobileZoomValue: 0.01, // Prędkość przybliżania dla telefonów

        divider: 4,  // Dzielnik dla diagramu do środkowania

        newestAnswerLink: 'https://www.youtube.com/watch?v=PyhR3Ekty-0&list=PLWcG9PJhXKyKgFiswMtY5kIBX5F-3yb8Z&index=10', // Link do najnowszej odpowiedzi
        newestAnswerThumbnail: 'https://img.youtube.com/vi/PyhR3Ekty-0/hqdefault.jpg', // Link do miniaturki - wstawić url filmu
        newestAnswerTitle: 'Laska Kuli #cringe16challenge', // Tytuł odpowiedzi

        treeData: { // Lista nominacji
            "name":"piciuhombre",
            "image_url":"https://cringe16.dream-speak.pl/imgs/piciuhombre.jpg",

            "children": [
                {
                    "name": "vxEr",
                    "image_url": "https://cringe16.dream-speak.pl/imgs/vxEr.jpg",

                    "children": [
                        {
                            "name": "Kasia Krzanowska",
                            "image_url": "https://cringe16.dream-speak.pl/imgs/Kasia Krzanowska.jpg",

                            "children": [
                                {
                                    "name": "Kamila Zajchowska",
                                    "image_url": "https://cringe16.dream-speak.pl/imgs/Kamila Zajchowska.jpg"
                                },
                                {
                                    "name": "Daniel Wiernasz",
                                    "image_url": "https://cringe16.dream-speak.pl/imgs/Daniel Wiernasz.jpg"
                                },
                                {
                                    "name": "Szczaku",
                                    "image_url": "https://cringe16.dream-speak.pl/imgs/noname.jpg"
                                },
                                {
                                    "name": "Patle`Daniel",
                                    "image_url": "https://cringe16.dream-speak.pl/imgs/Patle`Daniel.jpg"
                                },
                                {
                                    "name": "Laska Kuli",
                                    "image_url": "https://cringe16.dream-speak.pl/imgs/Oliwka Zielińska.jpg",

                                    "children": [
                                        {
                                            "name": "Kula",
                                            "image_url": "https://cringe16.dream-speak.pl/imgs/Kula.jpg"
                                        },
                                        {
                                            "name": "Krecik",
                                            "image_url": "https://cringe16.dream-speak.pl/imgs/noname.jpg"
                                        },
                                        {
                                            "name": "Kremcia",
                                            "image_url": "https://cringe16.dream-speak.pl/imgs/Kremcia.jpg",

                                            "children": [
                                                {
                                                    "name": "Amelka Trzaskoś",
                                                    "image_url": "https://cringe16.dream-speak.pl/imgs/noname.jpg"
                                                },
                                                {
                                                    "name": "Kuba Kozioł",
                                                    "image_url": "https://cringe16.dream-speak.pl/imgs/noname.jpg"
                                                },
                                                {
                                                    "name": "Aleksandra Gabor",
                                                    "image_url": "https://cringe16.dream-speak.pl/imgs/noname.jpg"
                                                },
                                                {
                                                    "name": "Paweł Pelc",
                                                    "image_url": "https://cringe16.dream-speak.pl/imgs/noname.jpg"
                                                }
                                            ]
                                        },
                                        {
                                            "name": "Zielu",
                                            "image_url": "https://cringe16.dream-speak.pl/imgs/noname.jpg"
                                        }
                                    ]
                                },
                                {
                                    "name": "Jacob Wheeles",
                                    "image_url": "https://cringe16.dream-speak.pl/imgs/Jacob Wheeles.jpg",

                                    "children": [
                                        {
                                            "name": "Igor Dudek",
                                            "image_url": "https://cringe16.dream-speak.pl/imgs/Igor Dudek.jpg"
                                        },
                                        {
                                            "name": "Mikołaj Lachiewicz",
                                            "image_url": "https://cringe16.dream-speak.pl/imgs/Mikołaj Lachiewicz.jpg"
                                        },
                                        {
                                            "name": "Damian Mularczyk",
                                            "image_url": "https://cringe16.dream-speak.pl/imgs/noname.jpg"
                                        },
                                        {
                                            "name": "Szubidubidu",
                                            "image_url": "https://cringe16.dream-speak.pl/imgs/Szubidubidu.jpg"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "name": "Michał Niżnik",
                            "image_url": "https://cringe16.dream-speak.pl/imgs/Michał Niżnik.jpg"
                        },
                        {
                            "name": "Monika Serwińska",
                            "image_url": "https://cringe16.dream-speak.pl/imgs/Monika Serwińska.jpg"
                        },
                        {
                            "name": "Trybunyrator",
                            "image_url": "https://cringe16.dream-speak.pl/imgs/Trybunyrator.jpg",

                            "children": [
                                {
                                    "name": "Jakub Zygmunt",
                                    "image_url": "https://cringe16.dream-speak.pl/imgs/Jakub Zygmunt.jpg",

                                    "children": [
                                        {
                                            "name": "Kacpulol",
                                            "image_url": "https://cringe16.dream-speak.pl/imgs/kacpulol.jpg",

                                            "children": [
                                                {
                                                    "name": "Janek Dworak",
                                                    "image_url": "https://cringe16.dream-speak.pl/imgs/noname.jpg"
                                                },
                                                {
                                                    "name": "Michał Szarecki",
                                                    "image_url": "https://cringe16.dream-speak.pl/imgs/noname.jpg"
                                                },
                                                {
                                                    "name": "Alan Jurczyk",
                                                    "image_url": "https://cringe16.dream-speak.pl/imgs/noname.jpg"
                                                },
                                                {
                                                    "name": "Ada Golowska",
                                                    "image_url": "https://cringe16.dream-speak.pl/imgs/noname.jpg"
                                                },
                                                {
                                                    "name": "Agnieszka Borek",
                                                    "image_url": "https://cringe16.dream-speak.pl/imgs/noname.jpg"
                                                }
                                            ]
                                        },
                                        {
                                            "name": "Pasti",
                                            "image_url": "https://cringe16.dream-speak.pl/imgs/noname.jpg"
                                        },
                                        {
                                            "name": "Rav",
                                            "image_url": "https://cringe16.dream-speak.pl/imgs/noname.jpg"
                                        }
                                    ]
                                },
                                {
                                    "name": "Buczo",
                                    "image_url": "https://cringe16.dream-speak.pl/imgs/Buczo.jpg",

                                    "children": [
                                        {
                                            "name": "Nyaxize",
                                            "image_url": "https://cringe16.dream-speak.pl/imgs/Nyaxize.jpg",

                                            "children": [
                                                {
                                                    "name": "Seweryn Marcinowski",
                                                    "image_url": "https://cringe16.dream-speak.pl/imgs/Seweryn Marcinowski.jpg",

                                                    "children": [
                                                        {
                                                            "name": "Karolina Guzik",
                                                            "image_url": "https://cringe16.dream-speak.pl/imgs/noname.jpg"
                                                        },
                                                        {
                                                            "name": "Wiktor Gleń",
                                                            "image_url": "https://cringe16.dream-speak.pl/imgs/noname.jpg"
                                                        },
                                                        {
                                                            "name": "Qadrat",
                                                            "image_url": "https://cringe16.dream-speak.pl/imgs/noname.jpg"
                                                        },
                                                        {
                                                            "name": "Kacper Moskal",
                                                            "image_url": "https://cringe16.dream-speak.pl/imgs/noname.jpg"
                                                        }
                                                    ]
                                                },
                                                {
                                                    "name": "Sebastian Bańkowski",
                                                    "image_url": "https://cringe16.dream-speak.pl/imgs/Sebastian Bańkowski.jpg",

                                                    "children": [
                                                        {
                                                            "name": "Natalia Ignarska",
                                                            "image_url": "https://cringe16.dream-speak.pl/imgs/noname.jpg"
                                                        },
                                                        {
                                                            "name": "Łukasz Długosz",
                                                            "image_url": "https://cringe16.dream-speak.pl/imgs/noname.jpg"
                                                        },
                                                        {
                                                            "name": "Patryk Machała",
                                                            "image_url": "https://cringe16.dream-speak.pl/imgs/noname.jpg"
                                                        }
                                                    ]
                                                },
                                                {
                                                    "name": "Michał Półchłopek",
                                                    "image_url": "https://cringe16.dream-speak.pl/imgs/noname.jpg"
                                                }
                                            ]
                                        },
                                        {
                                            "name": "ALPHACK",
                                            "image_url": "https://cringe16.dream-speak.pl/imgs/alphack.jpg"
                                        }
                                    ]
                                },
                                {
                                    "name": "Michał Kisiołek",
                                    "image_url": "https://cringe16.dream-speak.pl/imgs/Michał Kisiołek.jpg"
                                }
                            ]
                        },
                        {
                            "name": "Dunk",
                            "image_url": "https://cringe16.dream-speak.pl/imgs/dunk.jpg",

                            "children": [
                                {
                                    "name": "Herbata",
                                    "image_url": "https://cringe16.dream-speak.pl/imgs/herbata.jpg"
                                },
                                {
                                    "name": "Jaca",
                                    "image_url": "https://cringe16.dream-speak.pl/imgs/jaca.jpg"
                                },
                                {
                                    "name": "Remigiusz",
                                    "image_url": "https://cringe16.dream-speak.pl/imgs/remigiusz.jpg",

                                    "children": [
                                        {
                                            "name": "grundi",
                                            "image_url": "https://cringe16.dream-speak.pl/imgs/noname.jpg"
                                        },
                                        {
                                            "name": "żelek",
                                            "image_url": "https://cringe16.dream-speak.pl/imgs/noname.jpg"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
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
            {
                name: 'kremcia',
                link: 'https://www.youtube.com/watch?v=VRPsJT617dA&list=PLWcG9PJhXKyKgFiswMtY5kIBX5F-3yb8Z&index=11',
            },
            {
                name: 'nyaxize',
                link: 'https://www.youtube.com/watch?v=0OleQAzmAxc&list=PLWcG9PJhXKyKgFiswMtY5kIBX5F-3yb8Z&index=12',
            },
            {
                name: 'sebastian bańkowski',
                link: 'https://www.youtube.com/watch?v=YZJ416cWDVI&list=PLWcG9PJhXKyKgFiswMtY5kIBX5F-3yb8Z&index=13',
            },
            {
                name: 'kacpulol',
                link: 'https://www.youtube.com/watch?v=QvlXxeAWrBY&list=PLWcG9PJhXKyKgFiswMtY5kIBX5F-3yb8Z&index=14',
            },
            {
                name: 'seweryn marcinowski',
                link: 'https://www.youtube.com/watch?v=WaJVr6o04Ss&list=PLWcG9PJhXKyKgFiswMtY5kIBX5F-3yb8Z&index=15',
            },
        ],
    },



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