export enum TipoServico {
  Banho = "banho",
  Consulta = "consulta"
}

type Servico = {
  nome: string;
  observacoes: string;
  finalizado: boolean;
  extra: boolean;
  data: string;
  tipo?: TipoServico;
  preco?: number;
};

interface Cachorro {
  nome: string;
  idade: number;
  raca: string;
  servico: Servico;
}
// Classe de exemplo para armazenarmos a informação do cliente
class Cachorro implements Cachorro {
  nome: string;
  idade: number;
  raca: string;
  servico: Servico;

  constructor() {
    this.nome = "";
    this.idade = 0;
    this.raca = "";
    this.servico = {
      nome: "",
      observacoes: "",
      finalizado: false,
      extra: false,
      data: ""
    };
  }
}

export default Cachorro;
