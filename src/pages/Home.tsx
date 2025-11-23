import { useSessionContext } from '@/contexts/SessionContext';
import type { FuncionarioModel } from '@/services/funcionario/FuncionarioModel';
import { useState } from 'react';
import { toast } from 'sonner';
import FuncionarioForm from './components/funcionarioForm/FuncionarioForm';
import { FuncionarioTable } from './components/funcionarioTable/FuncionarioTable';
import styles from './Home.module.css';

export default function Home() {
  const initialState: FuncionarioModel = {
    id: '',
    nome: '',
    cpf: '',
    salarioBruto: '',
    descontoDaPrevidencia: '',
    numeroDeDependentes: '',
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

      funcionarioState.salarioBruto = funcionarioState.salarioBruto.replace(
        ',',
        '.'
      );

      funcionarioState.descontoDaPrevidencia =
        funcionarioState.descontoDaPrevidencia.replace(',', '.');

      if (editMode) {
        editarFuncionario(funcionarioState);
        toast.success('Funcionário atualizado com sucesso');
        setEditMode(false);
      } else {
        saveFuncionario(funcionarioState);
        toast.success('Funcionário cadastrado com sucesso');
      }
      setFuncionarioState(initialState);
    } catch (e: any) {
      setError(e.message);
    }
  }

  function handleClickEditar(id: string) {
    setError(null);
    const funcionario = buscarFuncionario(id);

    if (funcionario) {
      setEditMode(true);
      setFuncionarioState(funcionario);
    }
  }

  function handleClickExcluir(id: string) {
    setError(null);
    const isConfirmed = window.confirm(
      `Tem certeza que deseja excluir o funcionário com ID: ${id}? Esta ação não pode ser desfeita.`
    );

    if (isConfirmed) {
      try {
        excluirFuncionario(id);
        toast.success(`Funcionário com ID ${id} excluído com sucesso!`);
      } catch (error) {
        setError(`Erro ao excluir funcionário: ${(error as Error).message}`);
      }
    }
  }

  return (
    <div className={styles.mainContainer}>
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <FuncionarioForm
          editMode={editMode}
          error={error}
          funcionarioState={funcionarioState}
          handleChange={handleChange}
          handleSaveOrUpdate={handleSaveOrUpdate}
        />
      </div>

      <br />
      <h1>Lista de funcionários</h1>

      <FuncionarioTable
        data={funcionarios}
        handleClickEditar={handleClickEditar}
        handleClickExcluir={handleClickExcluir}
      />
    </div>
  );
}
