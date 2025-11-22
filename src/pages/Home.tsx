import FuncionarioForm from './components/funcionarioForm/FuncionarioForm';
import type { FuncionarioModel } from '@/services/funcionario/FuncionarioModel';
import { FuncionarioTable } from './components/funcionarioTable/FuncionarioTable';
import styles from './Home.module.css';
import { useSessionContext } from '@/contexts/SessionContext';
import { useState } from 'react';

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
      <FuncionarioForm
        editMode={editMode}
        error={error}
        funcionarioState={funcionarioState}
        handleChange={handleChange}
        handleSaveOrUpdate={handleSaveOrUpdate}
      />
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
