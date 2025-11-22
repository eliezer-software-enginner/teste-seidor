import { v4 as uuidv4 } from 'uuid';
import { IRRFService } from '../irrfService/IRRFService';
import type { FuncionarioModel } from './FuncionarioModel';
import type { FuncionarioViewModel } from './FuncionarioViewModel';

export class FuncionarioService {
  private KEY = 'funci';

  cadastrar(funcionario: Omit<FuncionarioModel, 'id'>): void {
    this.validar(funcionario);

    const funcionarioComId: FuncionarioModel = {
      ...funcionario,
      id: uuidv4(),
    };

    localStorage.setItem(this.KEY, JSON.stringify(funcionarioComId));
  }

  atualizar(funcionario: FuncionarioModel): void {
    this.validar(funcionario);

    const busca = this.buscaPorId(funcionario.id);

    if (busca) {
      busca.cpf = funcionario.cpf;
      busca.descontoDaPrevidencia = funcionario.descontoDaPrevidencia;
      busca.nome = funcionario.nome;
      busca.numeroDeDependentes = funcionario.numeroDeDependentes;
      busca.salarioBruto = funcionario.salarioBruto;
    }
  }

  excluir(id: string): void {
    if (id.trim() == '') throw new Error('Id inválido');
    const busca = this.buscaPorId(id);
    if (busca) {
      const update = this.buscarFuncionarios().filter((it) => it.id != id);
      localStorage.setItem(this.KEY, JSON.stringify(update));
    }
  }

  buscaPorId(id: string): FuncionarioModel | undefined {
    return this.buscarFuncionarios().find((it) => it.id == id);
  }

  private buscarFuncionarios(): FuncionarioModel[] {
    const data = localStorage.getItem(this.KEY);
    return data ? JSON.parse(data) : [];
  }

  listarFuncionariosComIRRF(): FuncionarioViewModel[] {
    const listaOriginal = this.buscarFuncionarios();

    const listaMapeada = listaOriginal.map((func) => {
      const salarioBruto = parseFloat(func.salarioBruto);
      const descontoDaPrevidencia = parseFloat(func.descontoDaPrevidencia);
      const numDeDependentes = parseFloat(func.numeroDeDependentes);

      const result = IRRFService.calcularSalarioBaseComDescontoDeIR(
        salarioBruto,
        descontoDaPrevidencia,
        numDeDependentes
      );

      return {
        ...func,
        salarioBaseIR: result.salarioBaseIR,
        descontoIRRF: result.descontoIRRF,
      };
    });

    return listaMapeada;
  }

  validar(funcionario: Omit<FuncionarioModel, 'id'>): void {
    const nome = funcionario.nome.trim();
    if (nome == '' || nome.length < 5) {
      throw new Error('Nome muito curto');
    }

    const cpf = funcionario.cpf.trim();
    if (cpf == '' || cpf.length != 11) {
      throw new Error('Cpf inválido');
    }

    const salarioBruto = funcionario.salarioBruto.trim();
    if (
      salarioBruto == '' ||
      Number.isNaN(salarioBruto) ||
      Number.parseFloat(salarioBruto) < 0
    ) {
      throw new Error('Salário inválido');
    }

    const descontoDaPrevidencia = funcionario.descontoDaPrevidencia.trim();
    if (
      descontoDaPrevidencia == '' ||
      Number.isNaN(descontoDaPrevidencia) ||
      Number.parseFloat(descontoDaPrevidencia) < 0
    ) {
      throw new Error('Desconto da previdência inválido');
    }

    const numeroDeDependentes = funcionario.numeroDeDependentes.trim();
    if (
      numeroDeDependentes == '' ||
      Number.isNaN(numeroDeDependentes) ||
      Number.parseInt(numeroDeDependentes) < 0
    ) {
      throw new Error('Desconto da previdência inválido');
    }
  }
}
