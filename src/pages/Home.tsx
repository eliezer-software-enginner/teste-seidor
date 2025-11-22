import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';

import { CurrencyInputMask } from '@/components/CurrencyInputMask';
import { DataTable } from '@/components/funcionarioTable/FuncionarioTable';
import { MaskInput } from '@/components/MaskInput';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSessionContext } from '@/contexts/SessionContext';
import type { FuncionarioModel } from '@/services/funcionario/FuncionarioModel';
import { useState } from 'react';
import styles from './Home.module.css';

export default function Home() {
  const initialState: FuncionarioModel = {
    id: '',
    nome: 'Nome completo da Silva',
    cpf: '80605923000',
    salarioBruto: '1610.10',
    descontoDaPrevidencia: '10',
    numeroDeDependentes: '2',
  };

  const [funcionarioState, setFuncionarioState] =
    useState<FuncionarioModel>(initialState);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);

  const {
    saveFuncionario,
    funcionarios,
    buscarFuncionario,
    editarFuncionario,
    excluirFuncionario,
  } = useSessionContext();

  function handleChange(key: string, value: string) {
    setFuncionarioState({
      ...funcionarioState,
      [key]: value,
    });
  }

  function handleSaveOrUpdate() {
    try {
      setError(null);

      console.log('Enviando para backend:', funcionarioState.salarioBruto);

      if (editMode) editarFuncionario(funcionarioState);
      saveFuncionario(funcionarioState);
    } catch (e: any) {
      setError(e.message);
    }
  }

  function handleClickEditar(id: string) {
    const funcionario = buscarFuncionario(id);

    if (funcionario) {
      setEditMode(true);
      setFuncionarioState(funcionario);
    }
  }

  function handleClickExcluir(id: string) {
    const isConfirmed = window.confirm(
      `Tem certeza que deseja excluir o funcionário com ID: ${id}? Esta ação não pode ser desfeita.`
    );

    if (isConfirmed) {
      try {
        excluirFuncionario(id);
        alert(`Funcionário com ID ${id} excluído com sucesso!`);
      } catch (error) {
        setError(`Erro ao excluir funcionário: ${(error as Error).message}`);
      }
    }
  }

  return (
    <div className={styles.mainContainer}>
      <FieldSet>
        <FieldLegend>Cadastro de Funcionário</FieldLegend>
        <FieldDescription>
          This appears on invoices and emails.
        </FieldDescription>
        {error != null && <FieldError>{error}</FieldError>}

        <FieldGroup className={styles.formGrid}>
          <Field>
            <FieldLabel htmlFor='nome'>Nome</FieldLabel>
            <Input
              id='nome'
              autoComplete='off'
              placeholder='Evil Rabbit'
              onChange={(ev) => handleChange('nome', ev.target.value)}
              value={funcionarioState.nome}
            />
            <FieldDescription>
              This appears on invoices and emails.
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel htmlFor='cpf'>CPF</FieldLabel>

            <MaskInput
              mask='999.999.999-99'
              id='cpf'
              autoComplete='off'
              onChange={(ev: any) => {
                // Remove a máscara da string para salvar o valor limpo (somente dígitos)
                const unmaskedValue = ev.target.value.replace(/[^0-9]/g, '');
                handleChange('cpf', unmaskedValue);
              }}
              value={funcionarioState.cpf}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor='salarioBruto'>Salário bruto</FieldLabel>
            <CurrencyInputMask
              id='salarioBruto'
              value={funcionarioState.salarioBruto}
              onValueChange={(value) => {
                const safeValue = value ?? '';
                handleChange('salarioBruto', safeValue);
              }}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor='descontoDaPrevidencia'>
              Desconto da previdência
            </FieldLabel>

            <CurrencyInputMask
              id='descontoDaPrevidencia'
              value={funcionarioState.descontoDaPrevidencia}
              onValueChange={(value) => {
                const safeValue = value ?? '';
                handleChange('descontoDaPrevidencia', safeValue);
              }}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor='numeroDeDependentes'>
              Número de dependentes
            </FieldLabel>
            <Input
              id='numeroDeDependentes'
              autoComplete='off'
              onChange={(ev) =>
                handleChange('numeroDeDependentes', ev.target.value)
              }
              value={funcionarioState.numeroDeDependentes}
            />
          </Field>
        </FieldGroup>
        <Button onClick={handleSaveOrUpdate}>
          {editMode ? 'Atualizar funcionário' : 'Cadastrar funcionário'}
        </Button>
      </FieldSet>

      <br />
      <h1>Lista de funcionários</h1>

      <DataTable
        data={funcionarios}
        handleClickEditar={handleClickEditar}
        handleClickExcluir={handleClickExcluir}
      />
    </div>
  );
}
