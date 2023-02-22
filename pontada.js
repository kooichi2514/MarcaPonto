export class Funcionario{
    constructor(id, nome) {
        this.id = id;
        this.nome = nome;
        this.entrada = '';                   // make Object.property for all later;
        this.horasAcumuladasNoMes = 0;
        this.registrosBackup = [];
        this.inputId = '';
        this.inputBtn = '';
    }

    baterPonto(dadosDosFuncionarios) {
        this.pegaInput();
        this.clickPonto(dadosDosFuncionarios);
    }

    registraPonto() {
        console.log(`cheguei no registra entrada do ${this.id}`);
        if(this.entrada){
            this.acumulaHoras();
        }
        this.entrada = (Date.now() / 1000).toFixed();
    }

    resetHoras() {
        // if(dia !== '1') return;

        this.horasAcumuladasNoMes = 0;
    }

    acumulaHoras() {
        const checkOut = (Date.now() / 1000).toFixed();
        const valor = Funcionario.timeStampParaHoras(this.entrada, checkOut);
        this.horasAcumuladasNoMes += valor;
        this.backupCheckInOut(this.entrada, checkOut);
        this.entrada = '';
    }

    backupCheckInOut(checkIn, checkOut) {
        this.registrosBackup.push({ id: this.id, checkIn: checkIn, checkOut: checkOut });
    }

    pegaInput() {
        const inputId = document.querySelector('.input-code');
        const btn = document.querySelector('.btn-marca');      //Essa parte do código ta meio estranha, acho que da pra refatorar
        this.inputId = inputId;
        this.inputBtn = btn;
    }
    
    clickPonto(dadosDosFuncionarios){
        this.inputBtn.addEventListener('click', () => {
            registraPorId(dadosDosFuncionarios);
        });
    }

    registraPorId(dadosDosFuncionarios){
        for(const pessoa of dadosDosFuncionarios){
            const { chave } = pessoa;
            if(this.inputId === chave.id) {
                chave.registraPonto();
            }
        }
    }

    static timeStampParaHoras(entrada, saida) {
        return ((saida - entrada) / 60 / 60).toFixed(2);
    }





    amostraRegistro() {
        for(let registro of this.registrosBackup){
            const {checkIn, checkOut} = registro;
            console.log(`Entrada: ${checkIn}. Saída: ${checkOut}. || Horas Totais: ${Funcionario.timeStampParaHoras(checkIn, checkOut)}.`);
        }
    }

    fezCheckIn() {
        if(!this.entrada) return 'Ainda não fez checkin.';
        const hora = new Date(this.entrada * 1000);
        return hora.toLocaleTimeString('pt-BR');
    }

    pegaTexto(objFuncionario) {
            const { chave } = objFuncionario;
            return `${chave.nome} ${chave.id} ${chave.fezCheckIn()} ${chave.horasAcumuladasNoMes}`; 
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
// f1.baterPonto()
// console.log(f1);
// f1.baterPonto()
// console.log(f1);

