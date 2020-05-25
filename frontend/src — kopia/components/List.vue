<template>
    <main>
<table>
  <caption>Przesłane zgłoszenia</caption>
  <thead>
    <tr>
      <th>Nazwa</th>
      <th>Nominacja od</th>
      <th>Link do nagrania</th>
      <th>Link do zdjęcia</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="participant in participants" :key="participant.id">
        <td data-label="Nazwa">{{ participant.name }}</td>
        <td data-label="Nominacja od">{{ participant.nomination_from }}</td>
        <td class="text" data-label="Link do nagrania"><a :href="participant.video" target="_blank">{{ participant.video }}</a></td>
        <td class="text" data-label="Link do zdjęcia">
            <span v-if="participant.avatar != null"><a :href="participant.avatar" target="_blank"> {{ participant.avatar }} </a></span>
            <span v-else>Brak zdjęcia</span>
        </td>
        <td class="text" data-label="Status">
            <span class="green" v-if="participant.status == 1">Dodane</span>
            <span class="red" v-else>Niedodane</span>
        </td>
    </tr>
  </tbody>
</table>
    </main>
</template>

<script>
import axios from 'axios';
export default {
    name: 'List',
    data() {
        return {
            participants: [],
        };
    },
    methods: {
        getList() {
            axios.get('/api/list')
            .then((response) =>{
                this.participants = response.data.list;
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    },
    created() {
        this.getList();
    },
};
</script>

<style lang="scss" scoped>
    main {
        width:100%;
        height:100%;
        display:flex;
        flex-direction: column;
    }
    table {
        border: 1px solid #ccc;
        border-collapse: collapse;
        margin: 0;
        padding: 0;
        width: 100%;
        table-layout: fixed;
        margin-top:50px;
        font-family:Montserrat;
    }

    a {
        text-decoration: none;
        color: black;
    }

    table caption {
        font-size: 48px;
        margin: .5em 0 .75em;
        }

    table tr {
        background-color: #f8f8f8;
        border: 1px solid #ddd;
        padding: .35em;
    }

    table th,
    table td {
        padding: .625em;
        text-align: center;
    }

    table th {
        font-size: .85em;
        letter-spacing: .1em;
        text-transform: uppercase;
        color:#E9190F;
        font-family:Montserrat-Bold;
    }

    .text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        .green {
            color:#08A045;
        }

        .red {
            color:#E9190F;
        }
    }

    @media screen and (max-width: 600px) {
        table {
            border: 0;
        }

        table caption {
            font-size: 30px;
        }

        table thead {
            border: none;
            clip: rect(0 0 0 0);
            height: 1px;
            margin: -1px;
            overflow: hidden;
            padding: 0;
            position: absolute;
            width: 1px;
        }

        table tr {
            border-bottom: 3px solid #ddd;
            display: block;
            margin-bottom: .625em;
        }

        table td {
            border-bottom: 1px solid #ddd;
            display: block;
            font-size: .8em;
            text-align: right;
        }

        table td::before {
            content: attr(data-label);
            float: left;
            font-weight: bold;
            text-transform: uppercase;
            color:#E9190F;
        }

        table td:last-child {
            border-bottom: 0;
        }
    }
</style>