class ValidateCpf {
  constructor() {
    this.form = document.querySelector("#form");
    this.cpf = this.form.querySelector("#cpf");
    this.ValidateCPF();
  }

  cpfValue(cpf) {
    if (cpf.value === "") return;
    return cpf.value.replace(/\D+/g, "").slice(0, -2);
  }

  ValidateCPF(cpf) {
    this.form.addEventListener("submit", (e) => {
      const cpfOrigin = this.cpf.value.replace(/\D+/g, "");
      const newCpf =
        this.cpfValue(this.cpf) +
        this.digitCalculate(this.firstCalculate()) +
        this.digitCalculate(this.secondCalculate());

      if (cpfOrigin !== newCpf) {
        console.log(cpfOrigin);
        console.log(newCpf);
        const cpf = this.form.querySelector("#cpf");
        const p = document.createElement("p");
        p.innerText = "Cpf Inválido";
        p.classList.add("bad");
        cpf.insertAdjacentElement("afterend", p);
      }
    });
  }
  firstCalculate() {
    if (this.cpf.value === "") return;
    const newCpf = this.cpfValue(this.cpf);
    let max = newCpf.length + 1;
    return newCpf.split("").reduce((ac, value) => {
      ac += max * Number(value);
      max--;
      return ac;
    }, 0);
  }

  digitCalculate(digit) {
    const result = 11 - (digit % 11);
    const verificate = result > 9 ? 0 : result;
    return verificate;
  }

  secondCalculate() {
    const newCpf =
      this.cpfValue(this.cpf) + this.digitCalculate(this.firstCalculate());
    let max = newCpf.length + 1;
    return newCpf.split("").reduce((ac, value) => {
      ac += max * Number(value);
      max--;
      return ac;
    }, 0);
  }
}

const validatecpf = new ValidateCpf();
