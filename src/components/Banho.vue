<template>
  <div>
    <h3>Fila de Banho</h3>
    <v-simple-table v-if="clientes.length > 0">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Idade</th>
          <th>Raça</th>
          <th>Tosa?</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cliente, index) in clientes" :key="index">
          <td>{{ cliente.nome }}</td>
          <td>{{ cliente.idade }}</td>
          <td>{{ cliente.raca }}</td>
          <td>{{ cliente.servico.extra | pergunta }}</td>
          <td>
            <v-btn @click="realizarServico(cliente)">Dar banho</v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <div v-else>
      Nenhum cliente aguardando
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
// Componente pai, onde se encontra a função realizarServico
import Servico from "@/components/Servico.vue";

export default Vue.extend({
  props: ["clientes"],
  extends: Servico
});
</script>
