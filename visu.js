export default class Relogio {
    constructor(botao){
        this.date = new Date();
        this.h2 = document.querySelector('.marca-ponto h2');
        this.h1 = document.querySelector('.marca-ponto h1');
        this.setDate();
        this.renewDate();
        this.botao = botao;
    }
    
    setDate() {
        const opcoes = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        const brDate = this.date.toLocaleDateString('pt-BR', opcoes);
        if (brDate != this.h2.innerHTML) {
            this.h2.innerHTML = brDate;
        }

        const hours = this.date.toLocaleTimeString('pt-BR');
        this.h1.innerHTML = hours;
    }

    renewDate() {
        setInterval(() => {
            this.date = new Date();
            this.setDate();
        }, 1000);
    }


    criaLi() {
        const li = document.createElement('li');
        return li;
    }
    addLi(texto) {
            const li = this.criaLi();
            li.innerText = texto;
            this.funcionarios.appendChild(li);
        }
    mostraRegistroNaTela(texto){
        this.botao.addEventListener('click', this.addLi(texto));
    }
    

}