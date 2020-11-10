import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import vuetify from "@/plugins/vuetify";

// Filtro para formatação de valores numéricos em monetário
Vue.filter("grana", function(value: number | string) {
  if (typeof value !== "number") {
    return value;
  }

  value = value.toFixed(2).replace(".", ",");
  return `R$ ${value}`;
});

// Filtro para formatação de campos booleanos em sim/não
Vue.filter("pergunta", function(value: boolean | undefined) {
  if (value === undefined) {
    return "Não";
  }
  if (typeof value !== "boolean") {
    return value;
  }

  return value ? "Sim" : "Não";
});

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
