'use client';

import type { FuncionarioViewModel } from '@/services/funcionario/FuncionarioViewModel';
import type { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<FuncionarioViewModel>[] = [
  {
    accessorKey: 'nome',
    header: 'Nome',
  },
  {
    accessorKey: 'cpf',
    header: 'CPF',
  },
  {
    accessorKey: 'salarioBruto',
    header: 'Salário Bruto',
  },
  {
    accessorKey: 'descontoDaPrevidencia',
    header: 'Desconto da previdência',
  },
  {
    accessorKey: 'numeroDeDependentes',
    header: 'Número de dependentes',
  },
  {
    accessorKey: 'salarioBaseIR',
    header: 'Salário Base (IR)',
  },
  {
    accessorKey: 'descontoIRRF',
    header: 'Desconto IRRF',
  },
];
