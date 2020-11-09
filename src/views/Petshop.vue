<template>
  <div class="container">
    <v-row>
      <v-col md="6" sm="12">
        <v-card class="pa-4">
          <recepcao @novo-cadastro="encaminharCliente"></recepcao>
        </v-card>
      </v-col>
      <v-col md="6" sm="12">
        <v-card class="pa-4 mb-4">
          <veterinario
            :clientes="clientesVeterinario"
            @atendido="finalizarConsulta"
          ></veterinario>
        </v-card>
        <v-card class="pa-4">
          <banho :clientes="clientesBanho" @atendido="finalizarBanho"></banho>
        </v-card>
      </v-col>
    </v-row>
    <v-spacer></v-spacer>
    <v-row>
      <v-col sm="12">
        <v-card class="pa-4">
          <balanco :clientes="clientesAtendidos"></balanco>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import DataService from "../services/DataService";
import Cachorro from "../models/cachorro";

// Importando os componentes que serão utilizados nesta página - caso sejam utilizados com frequência, mover para main.js
import Recepcao from "@/components/Recepcao.vue";
import Banho from "@/components/Banho.vue";
import Veterinario from "@/components/Veterinario.vue";
import Balanco from "@/components/Balanco.vue";

export default Vue.extend({
  name: "Home",
  components: {
    Recepcao,
    Banho,
    Veterinario,
    Balanco
  },
  data() {
    return {
      clientesBanho: [] as Cachorro[],
      clientesVeterinario: [] as Cachorro[],
      clientesAtendidos: [] as Cachorro[]
    };
  },
  async created() {
    const { data } = await DataService.getClientes();
    if (!data) {
      return;
    }

    this.clientesBanho = data.filter(
      (cliente: Cachorro) => cliente.servico.nome === "banho"
    );
    this.clientesVeterinario = data.filter(
      (cliente: Cachorro) => cliente.servico.nome === "consulta"
    );
  },
  methods: {
    encaminharCliente(cliente: Cachorro) {
      cliente.servico.tipo === "banho"
        ? this.clientesBanho.push(cliente)
        : this.clientesVeterinario.push(cliente);
    },
    finalizarBanho(cliente: Cachorro) {
      this.clientesAtendidos.push(cliente);

      // Nem todas as operações são rastreadas pelo Vue,
      // neste caso temos que "forçar" que a lista seja re-renderizada,
      // uma vez que operações filter e splice (metodos comuns para remover itens de um array)ao contrário do push não notificam o observador
      Vue.delete(
        this.clientesBanho,
        this.clientesBanho.findIndex(
          (clienteBanho: Cachorro) => clienteBanho.nome === cliente.nome
        )
      );
    },
    finalizarConsulta(cliente: Cachorro) {
      this.clientesAtendidos.push(cliente);
      Vue.delete(
        this.clientesVeterinario,
        this.clientesVeterinario.findIndex(
          (clienteAtendido: Cachorro) => clienteAtendido.nome === cliente.nome
        )
      );
    }
  }
});
</script>
