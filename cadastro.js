//criar função para gerar numero de funcionario automaticamente

export class FormCadastro {
    constructor(formulario, classe) {
        this.formulario = formulario;
        this.classe = classe;
        this.nome = '';
        this.numeroUsuario = '';
        this.eventos();
    }

    eventos() {
        this.formulario.addEventListener('submit', e => {
            e.preventDefault();
            this.handleSubmit(e);
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.nomeValido();
        this.usuarioValido();
        const cadastro = this.criarCadastro();
        this.salvarCadastro(cadastro);
    }

    nomeValido() {
        const nome = this.formulario.querySelector('.nome');
        this.nome = nome.value;
    }
    usuarioValido() {
        const usu = this.formulario.querySelector('.numero-usuario');
        this.numeroUsuario = usu.value;
    }

    criarCadastro() {
        const cadastro = new this.classe(this.numeroUsuario, this.nome);
        return cadastro;
    }

    salvarCadastro(cadastro) {
        const listaDeCadastros = this.getCadastros();

        if(!listaDeCadastros) {
            this.salvaEmJSON([cadastro]);
            return;
        }

        listaDeCadastros.push(cadastro);
        this.salvaEmJSON(listaDeCadastros);
    }

    getCadastros() {
        const cadastros = localStorage.getItem('cadastros');
        const listaDeCadastros = JSON.parse(cadastros);
        return listaDeCadastros;
    }

    salvaEmJSON(arquivo) {
        const cadastrosJSON = JSON.stringify(arquivo);
        localStorage.setItem('cadastros', cadastrosJSON);
    }

}