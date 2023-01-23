class ValidateCpf {
  constructor() {
    this.form = document.querySelector("#form");
    this.cpf = this.form.querySelector("#cpf");
    // this.ValidateCPF();
  }

  cpfValue(cpf) {
    if (cpf.value === "") return;
    return cpf.value.replace(/\D+/g, "").slice(0, -2);
  }

  ValidateCPF(cpf) {
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
      return false;
    }
    return true;
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

class ValidateForm extends ValidateCpf {
  constructor() {
    super();
    this.form = document.querySelector("#form");
    this.validate();
  }

  validate() {
    this.form.addEventListener("submit", (e) => {
      this.handdleSubmit(e);
    });
  }
  handdleSubmit(e) {
    e.preventDefault();
    this.inputsEmpty();
    this.nicknameIsValid();
    this.ValidateCPF();
    this.passwordIsValid();
    this.checkPassWords();
    this.checkAllInputs();
  }

  inputsEmpty() {
    let valid = true;
    for (let errorText of this.form.querySelectorAll(".bad")) {
      errorText.remove();
    }
    const inputs = this.form.querySelectorAll(".valueInputs");
    for (let input of inputs) {
      if (!input.value) {
        this.createError(
          input,
          `Input "${input.previousElementSibling.innerText}" está Vazio`
        );

        valid = false;
      }
    }
    return valid;
  }
  createSucess(input, sucess) {
    const p = document.createElement("p");
    p.innerText = sucess;
    p.classList.add("sucess");
    input.insertAdjacentElement("afterend", p);
  }

  createError(input, error) {
    const p = document.createElement("p");
    p.innerText = error;
    p.classList.add("bad");
    input.insertAdjacentElement("afterend", p);
  }

  nicknameIsValid() {
    const user = this.form.querySelector("#user");
    const userValue = user.value;

    if (!user.value) return false;
    if (!userValue.match(/^[a-zA-Z0-9]+$/g)) {
      this.createError(user, "User só pode conter letras e números");
      return false;
    }
    if (userValue.length < 3 || userValue.length > 12) {
      this.createError(
        user,
        "Usuario Precisa ter No Mínimo 3 letras e no no Máximo 12"
      );
      return false;
    }
    return true;
  }
  passwordIsValid() {
    const password = this.form.querySelector("#password");
    const valuePassword = password.value;

    if (!valuePassword) return false;
    if (valuePassword.length < 6 || valuePassword.length > 12) {
      this.createError(
        password,
        "Senha precisa ter no Mínimo 6 caracteres e no Máximo 12 Caracteres"
      );
      return false;
    }
    return true;
  }
  checkPassWords() {
    const password = this.form.querySelector("#password");
    const repeatPassword = this.form.querySelector("#repeat-password");

    const passwordValue = password.value;
    const repeatPasswordValue = repeatPassword.value;
    if (!repeatPasswordValue) return;
    console.log(passwordValue);
    console.log(repeatPasswordValue);
    if (repeatPasswordValue !== passwordValue) {
      this.createError(repeatPassword, "Senhas Não estão iguais");
      return false;
    }
    return true;
  }
  checkAllInputs() {
    const input = this.form.querySelector(".btn-submit");
    const removeP = this.form.querySelector(".sucess");
    if (removeP !== null) {
      removeP.remove();
    }
    if (
      this.passwordIsValid() &&
      this.inputsEmpty() &&
      this.nicknameIsValid() &&
      this.checkPassWords()
    ) {
      this.createSucess(input, "Cadastro realizado com Sucesso");
    }
  }
}

const validateform = new ValidateForm();
