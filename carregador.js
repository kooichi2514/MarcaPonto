import CalculaIMC from "./imc";
import Calculadora from "./calculadora";
import Tarefas from "./listadetarefas";
import timer from "./timer";
import ValidaFormulario from "./validaform/validaform";
import Relogio from "./marcaPonto/visu";
import { Funcionario, Agenda } from "./marcaPonto/pontada";
import { FormCadastro } from "./marcaPonto/cadastro";


function pegaBotao(classe) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const botao = document.querySelector(classe);
            console.log('Ainda não sei como resolver essa parte de uma forma melhor');
            resolve(botao);
        }, 2000);
    });
}


export default async function carregaScript(paginaAtual) {
    // Na verdade deveria começar o script logo que aparece o html.......
    let funcao;
    if(paginaAtual === 'CalcIMC.html') {
        funcao = imc;
        funcao();
    }

    if(paginaAtual === 'Calculadora.html') {
        funcao = calculadora;
        funcao();
    }

    if(paginaAtual === 'listaDeTarefas.html') {
        funcao = listaTarefa;
        funcao();
    }

    if(paginaAtual === 'timer.html') {
        funcao = ligaTimer;
        funcao();
    }

    if(paginaAtual === 'validaform.html') {
        funcao = ligaValidaForm;
        funcao();
    }

    if(paginaAtual === 'marcaPonto.html') {
        funcao = ligaMarcaPonto;
        funcao();
    }

    if(paginaAtual === 'registraFuncionario.html') {
        funcao = ligaCadastro;
        funcao();
    }
}

////////////////////////////////////////////////////////
function imc() {
    const imc = new CalculaIMC();
    imc.inicia();
}

async function calculadora() {
    const botao = await pegaBotao('.display');
    const calculadora = new Calculadora(botao);
    calculadora.inicia();
}

async function listaTarefa() {
    const botao = await pegaBotao('.btn-tarefa')
    const tarefas = new Tarefas(botao);
    tarefas.inicia();
}

async function ligaTimer() {
    const botao = await pegaBotao('.relogio');
    timer(botao);
}

async function ligaValidaForm() {
    const botao = await pegaBotao('.formulario');
    const valida = new ValidaFormulario(botao);
}

async function ligaMarcaPonto() {
    const botao = await pegaBotao('.mostrar');
    const relogio = new Relogio(botao);
    let registro = [];

    const janeiro = new Agenda('Jan');
    const f1 = new Funcionario('123', 'Victor');
    const f2 = new Funcionario('321', 'Rotciv');
    const f3 = new Funcionario('145', 'Ronaldo');
    const f4 = new Funcionario('154', 'Joelson');
    registro.push({ chave: f1 });
    registro.push({ chave: f2 });
    registro.push({ chave: f3 });
    registro.push({ chave: f4 });


    Funcionario.pegaInput(registro);

    const listaDeFunc = document.querySelector('.funcionarios');
    botao.addEventListener('click', () => {
        if(!listaDeFunc.innerText){
            for(const pessoa of registro){
                const texto = Funcionario.pegaTexto(pessoa);
                const li = addLi(texto);
                listaDeFunc.appendChild(li);
            }
        }   else{
            listaDeFunc.innerText = '';
        }
    });

    for(const pessoa of registro){
        const texto = Funcionario.pegaTexto(pessoa);
        try {
            relogio.mostraRegistroNaTela(texto);
        } catch(e) {
            console.log('Tem um erro que precisa arrumar aqui :(')
        }
    }
}

async function ligaCadastro() {
    const formulario = await pegaBotao('.cadastro');
    const regustri = new FormCadastro(formulario, Funcionario);
    // console.log(regustri);
}

/////////////////////////////////////////////////////////////////////////

function criaLi() {
    const li = document.createElement('li');
    return li;
}
function addLi(texto) {
        const li = criaLi();
        li.innerText = texto;
        return li;
    }

