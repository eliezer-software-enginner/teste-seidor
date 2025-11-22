export class IRRFService {
  private static DEDUCAOPORDEPENDENTE = 189.59;

  public static calcularSalarioBaseComDescontoDeIR(
    salarioBruto: number,
    descontoDaPrevidencia: number,
    numeroDeDependentes: number
  ) {
    const salarioBaseIR =
      salarioBruto -
      descontoDaPrevidencia -
      this.DEDUCAOPORDEPENDENTE * numeroDeDependentes;

    /*
      Base de cálculo Alíquota Parcela a deduzir do IRPF
        Até 2.259,20  Isento R$ 0,00 ok
        De R$ 2.259,21 até R$ 2.826,65 7,5% R$ 169,44 ok
        De R$ 2.826,66 até R$ 3.751,05 15% R$ 381,44
        De R$ 3.751,06 até R$ 4.664,68 22,5% R$ 662,77
        Acima de R$ 4.664,68 27,5% R$ 896,00
        */

    const baseDeCalculo = Math.max(0, salarioBaseIR);

    let aliquota = 0;
    let parcelaADeduzir = 0;

    if (baseDeCalculo <= 2259.2) {
      aliquota = 0;
      parcelaADeduzir = 0;
    } else if (baseDeCalculo <= 2826.65) {
      aliquota = 0.075;
      parcelaADeduzir = 169.44;
    } else if (baseDeCalculo <= 3751.05) {
      aliquota = 0.15;
      parcelaADeduzir = 381.44;
    } else if (baseDeCalculo <= 4664.68) {
      aliquota = 0.225;
      parcelaADeduzir = 662.77;
    } else {
      aliquota = 0.275;
      parcelaADeduzir = 896.0;
    }

    const impostoBruto = baseDeCalculo * aliquota;
    const descontoIRRF = impostoBruto - parcelaADeduzir;

    const irrfFinal = Math.max(0, descontoIRRF);

    return {
      salarioBaseIR: baseDeCalculo.toFixed(2),
      aliquota,
      descontoIRRF: irrfFinal.toFixed(2),
    };
  }
}
