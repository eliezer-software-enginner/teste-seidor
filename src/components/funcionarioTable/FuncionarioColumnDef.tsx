'use client';

import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

import { formatBrlCurrency } from '@/lib/utils';
import type { FuncionarioViewModel } from '@/services/funcionario/FuncionarioViewModel';
import type { ColumnDef } from '@tanstack/react-table';
import { Button } from '../ui/button';

export const columns_: ColumnDef<FuncionarioViewModel>[] = [
  {
    accessorKey: 'descontoDaPrevidencia',
    header: () => <div className='text-right'>Desconto da previdência</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('descontoDaPrevidencia'));
      return (
        <div className='text-right font-medium'>
          {formatBrlCurrency(amount)}
        </div>
      );
    },
  },

  {
    accessorKey: 'numeroDeDependentes',
    header: 'Número de dependentes',
  },

  {
    accessorKey: 'salarioBaseIR',
    header: () => <div className='text-right'>Salário Base (IR)</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('salarioBaseIR'));

      return (
        <div className='text-right font-medium'>
          {formatBrlCurrency(amount)}
        </div>
      );
    },
  },

  {
    accessorKey: 'descontoIRRF',
    header: () => <div className='text-right'>Desconto IRRF</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('descontoIRRF'));
      return (
        <div className='text-right font-medium'>
          {formatBrlCurrency(amount)}
        </div>
      );
    },
  },
];

export const getFuncionarioColumns = (
  handleClickEditar: (id: string) => void,
  handleClickExcluir: (id: string) => void
): ColumnDef<FuncionarioViewModel>[] => [
  {
    accessorKey: 'nome',
    header: 'Nome',

    cell: ({ row }) => <div className='capitalize'>{row.getValue('nome')}</div>,
  },
  {
    accessorKey: 'cpf',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          CPF
          <ArrowUpDown />
        </Button>
      );
    },

    cell: ({ row }) => <div className='lowercase'>{row.getValue('cpf')}</div>,
  },
  {
    accessorKey: 'salarioBruto',
    header: () => <div className='text-right'>Salário Bruto</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('salarioBruto'));

      return (
        <div className='text-right font-medium'>
          {formatBrlCurrency(amount)}
        </div>
      );
    },
  },
  //restamte das colunas
  ...columns_,
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const funcionario = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Ações</DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleClickEditar(funcionario.id)}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleClickExcluir(funcionario.id)}
              className='text-red-600'
            >
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
