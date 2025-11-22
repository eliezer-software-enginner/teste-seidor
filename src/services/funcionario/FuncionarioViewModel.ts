import type { FuncionarioModel } from './FuncionarioModel';

export type FuncionarioViewModel = FuncionarioModel & {
  salarioBaseIR: string;
  descontoIRRF: string;
};
