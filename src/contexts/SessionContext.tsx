import { createContext, useContext, useEffect, useState } from 'react';

import type { FuncionarioModel } from '@/services/funcionario/FuncionarioModel';
import { FuncionarioService } from '@/services/funcionario/FuncionarioService';
import type { FuncionarioViewModel } from '@/services/funcionario/FuncionarioViewModel';
import type React from 'react';

interface SessionContextInterface {
  funcionarios: FuncionarioViewModel[];
  saveFuncionario(funcionario: Omit<FuncionarioModel, 'id'>): void;
  editarFuncionario(funcionario: FuncionarioModel): void;
  excluirFuncionario(id: string): void;
}

const SessionContext = createContext<SessionContextInterface | undefined>(
  undefined
);

export function useAppContext() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
}

export function SessionContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [funcionarios, setFuncionarios] = useState<FuncionarioViewModel[]>([]);
  const funcionarioService = new FuncionarioService();

  useEffect(() => {
    setFuncionarios(funcionarioService.listarFuncionariosComIRRF());
  }, []);

  function saveFuncionario(funcionario: Omit<FuncionarioModel, 'id'>) {
    funcionarioService.cadastrar(funcionario);
    reloadListFuncionarios;
  }

  function editarFuncionario(funcionario: FuncionarioModel) {
    funcionarioService.atualizar(funcionario);
    reloadListFuncionarios;
  }

  function excluirFuncionario(id: string) {
    funcionarioService.excluir(id);
    reloadListFuncionarios;
  }

  function reloadListFuncionarios() {
    setFuncionarios(funcionarioService.listarFuncionariosComIRRF());
  }

  return (
    <SessionContext.Provider
      value={{
        funcionarios,
        saveFuncionario,
        editarFuncionario,
        excluirFuncionario,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
