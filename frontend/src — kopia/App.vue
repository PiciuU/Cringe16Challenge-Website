<template>
    <div id="app">

        <router-view/>
    </div>
</template>

<style lang="scss">
    @font-face {
        font-family: "Glenn-Sans";
        src: url("assets/fonts/GlennSans-Bold.otf");
    }

    @font-face {
        font-family: "Montserrat";
        src: url("assets/fonts/Montserrat-Regular.ttf");
    }

     @font-face {
        font-family: "Montserrat-Bold";
        src: url("assets/fonts/Montserrat-Bold.ttf");
    }

    body,html {
        padding:0;
        margin:0;
        width:100%;
        height:100%;
    }

    #app {
        width:100%;
        height:100%;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    main {
        height:100%;
    }

    /* Scrollbar */
    @media (min-width:1024px) {
        ::-webkit-scrollbar {
            width: 10px;
            background-color:lightgray;
        }
        ::-webkit-scrollbar-thumb {
            background-color: #F90;
            background-image: -webkit-linear-gradient(45deg,
                rgba(255, 255, 255, .2) 25%,
                transparent 25%,
                transparent 50%,
                rgba(255, 255, 255, .2) 50%,
                rgba(255, 255, 255, .2) 75%,
                transparent 75%,
                transparent)
        }
    }

</style>
