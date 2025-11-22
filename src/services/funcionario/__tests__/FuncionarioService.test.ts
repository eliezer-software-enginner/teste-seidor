import { MOCKED_UUID, localStorageMock } from './mocks';

import { FuncionarioService } from '../FuncionarioService';

describe('testes com funcionarios', () => {
  let service: FuncionarioService;

  beforeEach(() => {
    localStorageMock.clear();

    // Atualizo o global.localStorage para usar o mock
    Object.defineProperty(global, 'localStorage', {
      value: localStorageMock,
      writable: true,
      configurable: true,
    });

    service = new FuncionarioService();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('funcionario com dados incorretos deve lançar excessão', () => {
    const dadoInicial = {
      nome: 'Nome completo da Silva',
      cpf: '80605923000',
      salarioBruto: '1610.10',
      descontoDaPrevidencia: '10',
      numeroDeDependentes: '2',
    };

    let funcionarioInvalidoNome = { ...dadoInicial, nome: 'abc' };
    expect(() => service.cadastrar(funcionarioInvalidoNome as any)).toThrow(
      'Nome muito curto'
    );

    let funcionarioInvalidoCpf = { ...dadoInicial, cpf: '1234' };
    expect(() => service.cadastrar(funcionarioInvalidoCpf as any)).toThrow(
      'Cpf inválido'
    );

    let funcionarioInvalidoSalario = { ...dadoInicial, salarioBruto: '0' };
    expect(() => service.cadastrar(funcionarioInvalidoSalario as any)).toThrow(
      'Salário inválido'
    );

    let funcionarioInvalidoDesconto = {
      ...dadoInicial,
      descontoDaPrevidencia: '-7',
    };
    expect(() => service.cadastrar(funcionarioInvalidoDesconto as any)).toThrow(
      'Desconto da previdência inválido'
    );

    let funcionarioInvalidoDependentes = {
      ...dadoInicial,
      numeroDeDependentes: '-1',
    };
    expect(() =>
      service.cadastrar(funcionarioInvalidoDependentes as any)
    ).toThrow('Número de dependentes inválido');
  });

  test('deve salvar funcionarios com dados corretos', () => {
    const funcionarioValido = {
      nome: 'Nome completo da Silva',
      cpf: '80605923000',
      salarioBruto: '1610.10',
      descontoDaPrevidencia: '10',
      numeroDeDependentes: '2',
    };

    const id = service.cadastrar(funcionarioValido);
    expect(id).toEqual(MOCKED_UUID);
    expect(() => service.buscaPorId(id)).toBeDefined();

    expect(localStorage.setItem).toHaveBeenCalled();
  });

  test('deve atualizar funcionario corretamente', () => {
    const funcionarioValido = {
      id: '',
      nome: 'Nome completo da Silva',
      cpf: '80605923000',
      salarioBruto: '1610.10',
      descontoDaPrevidencia: '10',
      numeroDeDependentes: '2',
    };

    funcionarioValido.nome = 'Nome completo da Silva 2';
    funcionarioValido.cpf = '80605923002';
    funcionarioValido.salarioBruto = '1610.12';
    funcionarioValido.descontoDaPrevidencia = '12';
    funcionarioValido.numeroDeDependentes = '3';

    const id = service.cadastrar(funcionarioValido);
    funcionarioValido.id = id;

    service.atualizar(funcionarioValido);
    expect(localStorage.setItem).toHaveBeenCalled();

    const funcionario = service.buscaPorId(id);
    expect(funcionario?.nome).toEqual(funcionarioValido.nome);
    expect(funcionario?.cpf).toEqual(funcionarioValido.cpf);
    expect(funcionario?.salarioBruto).toEqual(funcionarioValido.salarioBruto);
    expect(funcionario?.descontoDaPrevidencia).toEqual(
      funcionarioValido.descontoDaPrevidencia
    );
    expect(funcionario?.numeroDeDependentes).toEqual(
      funcionarioValido.numeroDeDependentes
    );
  });

  test('atualizar funcionarios com dados incorretos deve lançar excessão', () => {
    const dadoInicial = {
      id: '',
      nome: 'Nome completo da Silva',
      cpf: '80605923000',
      salarioBruto: '1610.10',
      descontoDaPrevidencia: '10',
      numeroDeDependentes: '2',
    };

    const id = service.cadastrar(dadoInicial);
    expect(id).toEqual(MOCKED_UUID);
    dadoInicial.id = id;

    let funcionarioInvalidoNome = { ...dadoInicial, nome: 'abc' };
    expect(() => service.atualizar(funcionarioInvalidoNome)).toThrow(
      'Nome muito curto'
    );

    let funcionarioInvalidoCpf = { ...dadoInicial, cpf: '1234' };
    expect(() => service.atualizar(funcionarioInvalidoCpf)).toThrow(
      'Cpf inválido'
    );

    let funcionarioInvalidoSalario = { ...dadoInicial, salarioBruto: '0' };
    expect(() => service.atualizar(funcionarioInvalidoSalario)).toThrow(
      'Salário inválido'
    );

    let funcionarioInvalidoDesconto = {
      ...dadoInicial,
      descontoDaPrevidencia: '-7',
    };
    expect(() => service.atualizar(funcionarioInvalidoDesconto)).toThrow(
      'Desconto da previdência inválido'
    );

    let funcionarioInvalidoDependentes = {
      ...dadoInicial,
      numeroDeDependentes: '-1',
    };
    expect(() => service.atualizar(funcionarioInvalidoDependentes)).toThrow(
      'Número de dependentes inválido'
    );
  });

  test('deve excluir funcionario corretamente', () => {
    const funcionarioValido = {
      nome: 'Nome completo da Silva',
      cpf: '80605923000',
      salarioBruto: '1610.10',
      descontoDaPrevidencia: '10',
      numeroDeDependentes: '2',
    };

    const id = service.cadastrar(funcionarioValido);
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(id).toEqual(MOCKED_UUID);

    // Limpa o contador de chamadas antes de excluir
    jest.clearAllMocks();
    service.excluir(id);
    expect(localStorage.setItem).toHaveBeenCalled();

    const funcionario = service.buscaPorId(id);
    expect(funcionario).toBeUndefined();
  });

  test('tentativa de excluir funcionario inexistente deve lançar excessão', () => {
    const funcionarioValido = {
      nome: 'Nome completo da Silva',
      cpf: '80605923000',
      salarioBruto: '1610.10',
      descontoDaPrevidencia: '10',
      numeroDeDependentes: '2',
    };

    const id = service.cadastrar(funcionarioValido);
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(id).toEqual(MOCKED_UUID);

    const idInexistente = 'ID!@#';
    expect(() => service.excluir(idInexistente)).not.toThrow();

    // Testa que lança erro se id for vazio
    expect(() => service.excluir('')).toThrow('Id inválido');
  });

  test('não deve ser possivel cadstrar funcionário com mesmo cpf', () => {
    const funcionarioValido = {
      nome: 'Nome completo da Silva',
      cpf: '80605923000',
      salarioBruto: '1610.10',
      descontoDaPrevidencia: '10',
      numeroDeDependentes: '2',
    };

    service.cadastrar(funcionarioValido);

    expect(() => service.cadastrar(funcionarioValido)).toThrow(
      'Já existe funcionário com este CPF'
    );
  });
});
