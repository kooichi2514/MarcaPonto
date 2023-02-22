export class Funcionario{
    constructor(id, nome) {
        this.id = id;
        this.nome = nome;
        this.entrada = '';                   // make Object.property for all later;
        this.horasAcumuladasNoMes = 0;
        this.registrosBackup = [];
    }

    registraEntrada() {
        console.log(`cheguei no registra entrada do ${this.id}`); 
        if(!this.entrada) {
            this.entrada = (Date.now() / 1000).toFixed();
            return;
        }
        this.registraDiaria();
    }

    resetHoras() {
        // if(dia !== '1') return;

        this.horasAcumuladasNoMes = 0;
    }

    registraDiaria() {
        const checkOut = (Date.now() / 1000).toFixed();
        const valor = Funcionario.timeStampParaHoras(this.entrada, checkOut);
        this.horasAcumuladasNoMes += valor;
        this.backupCheckInOut(this.entrada, checkOut);
        this.entrada = '';
    }

    backupCheckInOut(checkIn, checkOut) {
        this.registrosBackup.push({ id: this.id, checkIn: checkIn, checkOut: checkOut });
    }

    amostraRegistro() {
        for(let registro of this.registrosBackup){
            const {checkIn, checkOut} = registro;
            console.log(`Entrada: ${checkIn}. Saída: ${checkOut}. || Horas Totais: ${Funcionario.timeStampParaHoras(checkIn, checkOut)}.`);
        }
    }

    estaLogado() {
        if(!this.entrada) return 'Não está logado.';
        const hora = new Date(this.entrada * 1000);
        return hora.toLocaleTimeString('pt-BR');

        const seila = this.entrada ? 'Está logado.': 'Não está logado.';
        return seila;
    }


    static timeStampParaHoras(entrada, saida) {
        return ((saida - entrada) / 60 / 60).toFixed(2);
    }

    static pegaInput(registro) {
        const inputId = document.querySelector('.input-code');
        const btn = document.querySelector('.btn-marca');      //Essa parte do código ta meio cagada, acho que da pra refatorar
        Funcionario.executaCode(inputId, btn, registro);
    }


    static pegaTexto(pessoa) {
            const { chave } = pessoa;
            return `${chave.nome} ${chave.id} ${chave.estaLogado()} ${chave.horasAcumuladasNoMes}`; 
    }
    static executaCode(codeInput, button, registro){
        button.addEventListener('click', () => {
            for(const pessoa of registro){
                const { chave } = pessoa;
                if(codeInput.value === chave.id){
                chave.registraEntrada();
                    }
                }
        })

    }
}

export class Agenda{
    constructor(mes) {
        this.mes = mes;
        this.tabela = [];
    }


    addTabela(funcionario) {
        const funId = funcionario.id;
        const objeto = { id: funId, horasTotais: 0 }
        this.tabela.push(objeto);
    }

    salvaHorasTotais(funcionario) {
        for(let registradoTabela of this.tabela) {
            const { id } = registradoTabela;
            if (id == funcionario.id) {
                registradoTabela.horasTotais += funcionario.horasAcumuladasNoMes;
                funcionario.resetHoras();
            }
        }
    }
}


// // Show case
// const f1 = new Funcionario('123', 'Victor');
// const f2 = new Funcionario('321', 'Rotciv');
// const janeiro = new Agenda('Jan');
// janeiro.addTabela(f1);
// janeiro.addTabela(f2);
// console.log(f1);
// f1.registraEntrada()
// console.log(f1);
// f1.registraEntrada()
// console.log(f1);

