<script lang="ts">
import Vue from "vue";
import Cachorro from "../models/cachorro";

export default Vue.extend({
  // Este método é utilizado tanto pelo componente Banho quanto Veterinário, logo podemos mover para esta camada "pai" e reutilizar o código.
  methods: {
    realizarServico(cliente: Cachorro): void {
      this.$emit("atendido", cliente);
    }
  }
});
</script>
