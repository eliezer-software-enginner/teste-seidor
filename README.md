Eu desenvolvi o site com cobertura de testes, validações e com garantia de qualidade e boa experiência para o usuário.

O site está disponível online para você poder testar
[acessar o site](https://teste-seidor-iota.vercel.app/)

Abaixo estão alguns dados para você realizar o teste:

## Dado 1:

- Nome: Teste 1
- Cpf: 10605923005
- Salario bruto: R$ 7.000,00
- Desconto da previdência: R$ 600,00
- Número de dependentes: 0

Resultado esperado:

- Salário base (IR): R$ 6.400,00
- Desconto (IRRF): R$ 864,00

## Dado 2:

- Nome: Teste 2
- Cpf: 78812057098
- Salario bruto: R$ 4.000,00
- Desconto da previdência: R$ 400,00
- Número de dependentes: 1

Resultado esperado:

- Salário base (IR): R$ 3.410,41
- Desconto (IRRF): R$ 130,12

# Para baixar o código fonte

```bash
git clone https://github.com/eliezer-software-enginner/teste-seidor.git
```

# Para rodar o projeto localmente

- entre na pasta do projeto clonado

```bash
cd teste-seidor
```

- instale as dependências

```bash
npm install
```

- então rode o projeto

```bash
npm run dev
```

- então basta abrir a seguinte url em seu navegador

```bash
http://localhost:5173/
```

Observação: Você precisa ter o **NodeJs** instalado em seu ambiente.
