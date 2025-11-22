import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from './components/ui/field';

import styles from '@/App.module.css';
import { useState } from 'react';
import { columns } from './components/funcionarioTable/FuncionarioColumnDef';
import { DataTable } from './components/funcionarioTable/FuncionarioTable';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import type { FuncionarioModel } from './services/funcionario/FuncionarioModel';

function App() {
  const initialState: Omit<FuncionarioModel, 'id'> = {
    nome: '',
    cpf: '',
    descontoDaPrevidencia: '',
    numeroDeDependentes: '',
    salarioBruto: '',
  };

  const [funcionarioState, setFuncionarioState] =
    useState<Omit<FuncionarioModel, 'id'>>(initialState);

  function handleChange(key: string, value: string) {
    setFuncionarioState({
      ...funcionarioState,
      [key]: value,
    });
  }

  function handleSave() {}

  return (
    <div className={styles.mainContainer}>
      <FieldSet>
        <FieldLegend>Cadastro de Funcionários</FieldLegend>
        <FieldDescription>
          This appears on invoices and emails.
        </FieldDescription>

        <FieldGroup className={styles.formGrid}>
          <Field>
            <FieldLabel htmlFor='nome'>Nome</FieldLabel>
            <Input
              id='nome'
              autoComplete='off'
              placeholder='Evil Rabbit'
              onChange={(ev) => handleChange('nome', ev.target.value)}
            />
            <FieldDescription>
              This appears on invoices and emails.
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel htmlFor='cpf'>CPF</FieldLabel>
            <Input
              id='cpf'
              autoComplete='off'
              onChange={(ev) => handleChange('cpf', ev.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor='salarioBruto'>Salário bruto</FieldLabel>
            <Input
              id='salarioBruto'
              autoComplete='off'
              onChange={(ev) => handleChange('salarioBruto', ev.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor='descontoDaPrevidencia'>
              Desconto da previdência
            </FieldLabel>
            <Input
              id='descontoDaPrevidencia'
              autoComplete='off'
              onChange={(ev) =>
                handleChange('descontoDaPrevidencia', ev.target.value)
              }
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
            />
          </Field>
        </FieldGroup>
        <Button onClick={handleSave}>Cadastrar funcionário</Button>
      </FieldSet>

      <DataTable columns={columns} data={[]} />
    </div>
  );
}

export default App;
