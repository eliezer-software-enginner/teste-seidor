import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';

import { CurrencyInputMask } from '@/components/inputs/CurrencyInputMask';
import { MaskInput } from '@/components/inputs/MaskInput';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import styles from '@/pages/Home.module.css';
import type { FuncionarioModel } from '@/services/funcionario/FuncionarioModel';

type props = {
  error: string | null;
  handleChange(key: string, value: string): void;
  funcionarioState: FuncionarioModel;
  handleSaveOrUpdate(): void;
  editMode: boolean;
};

export default function FuncionarioForm({
  error,
  handleChange,
  funcionarioState,
  handleSaveOrUpdate,
  editMode,
}: props) {
  return (
    <>
      <FieldSet>
        <FieldLegend>Cadastro de Funcionário</FieldLegend>
        <FieldDescription>
          Bem vindo(a) a central de cadastro de funcionários
        </FieldDescription>
        {error != null && <FieldError>{error}</FieldError>}

        <FieldGroup className={styles.formGrid}>
          <Field>
            <FieldLabel htmlFor='nome'>Nome</FieldLabel>
            <Input
              id='nome'
              autoComplete='off'
              placeholder='Seu nome completo'
              onChange={(ev) => handleChange('nome', ev.target.value)}
              value={funcionarioState.nome}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor='cpf'>CPF</FieldLabel>

            <MaskInput
              mask='999.999.999-99'
              id='cpf'
              autoComplete='off'
              placeholder='Informe seu cpf'
              onChange={(ev: any) => {
                // Remove a máscara da string para salvar o valor limpo (somente dígitos)
                const unmaskedValue = ev.target.value.replace(/[^0-9]/g, '');
                handleChange('cpf', unmaskedValue);
              }}
              value={funcionarioState.cpf}
              disabled={editMode}
            />
            <FieldDescription>Deve possuir 11 dígitos</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor='salarioBruto'>Salário bruto</FieldLabel>
            <CurrencyInputMask
              id='salarioBruto'
              placeholder='R$ 0,00'
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
              placeholder='R$ 0,00'
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
              placeholder='1'
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
    </>
  );
}
