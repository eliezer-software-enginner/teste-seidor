import { DataTable } from './components/funcionarioTable/FuncionarioTable';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from './components/ui/field';

import styles from '@/App.module.css'; // Importa o CSS
import { columns } from './components/funcionarioTable/FuncionarioColumnDef';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';

function App() {
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
            <Input id='nome' autoComplete='off' placeholder='Evil Rabbit' />
            <FieldDescription>
              This appears on invoices and emails.
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel htmlFor='cpf'>CPF</FieldLabel>
            <Input id='cpf' autoComplete='off' />
          </Field>
          <Field>
            <FieldLabel htmlFor='salarioBruto'>Salário bruto</FieldLabel>
            <Input id='salarioBruto' autoComplete='off' />
          </Field>
          <Field>
            <FieldLabel htmlFor='descontoDaPrevidencia'>
              Desconto da previdência
            </FieldLabel>
            <Input id='descontoDaPrevidencia' autoComplete='off' />
          </Field>
          <Field>
            <FieldLabel htmlFor='numeroDeDependentes'>
              Número de dependentes
            </FieldLabel>
            <Input id='numeroDeDependentes' autoComplete='off' />
          </Field>
        </FieldGroup>
        <Button>Cadastrar funcionário</Button>
      </FieldSet>

      <DataTable columns={columns} data={[]} />
    </div>
  );
}

export default App;
