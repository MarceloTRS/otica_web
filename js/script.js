/* Apresentação Modal */
setTimeout(ApresentarModal, 5000);  // ajustando o modal para aparecer com 5 segundos apos abrir  a página
function ApresentarModal(){
    var modal = document.querySelector(".modal");

    if(modal != null) // função que encontra os modais nas paginas, faleconosco e ondeestamos, só exibe se encontrar o modal
    {       
        document.querySelector(".modal").style.display = "block";  // encontrando o elemento

        document
            .querySelector(".modal a") // seleciono o link dentro da tag <a> que esta dentro de modal, na pagina .html
            .addEventListener("click", function(){ // adiciono uma função para "escutar" o click do usuário
                document.querySelector(".modal").style.display = "none"; //seletor para fechar o modal.
            });
    }
}

/* Validação Modal (Página Inicial) */
if( document.forms["modal_form"] != undefined){
    //validação
    var form = document.forms["modal_form"];

    form.addEventListener("submit",validarFormModal); //vai ouvir o evento do 'submit'
    form.email.addEventListener("keyup", function () { //evento keyup, quando precionar a tecla
    form.email.className = "";
    document.querySelector("span.nao_valido").style.display = "none";
    
    }); 
}

  // Validar o form email
function validarFormModal(evt){
    var form = document.forms["modal_form"];

    var inputEmail = form.email;         // checka o form do campo email
    var valorEmail = form.email.value;    // checka o value do campo email

    var posicaoArroba = valorEmail.indexOf("@"); //variavel para checkar a posição do '@'

    if( !ValidarEmail(valorEmail) ){  //chama a função de validação de email abaixo

        inputEmail.className = "nao_valido";
        document.querySelector("span.nao_valido").style.display = "block";
        evt.preventDefault();
    }
        
}

/* Validação Fale Conosco */
if( document.forms["form_contato"] != undefined ){

    var form = document.forms["form_contato"];

    form.addEventListener("submit", function(evt){

        var formValido = true;
    

        if(!NaoVazio(form.Nome_Completo.value)){                       /*chama a função NaoVazio, definida a baixo*/ 
            form.Nome_Completo.className = "nao_valido";  /* 'nao_valido' é a estrutura css definida no styles*/
            formValido = false;
        }

        if(!NaoVazio(form.Telefone.value)){
            form.Telefone.className = "nao_valido";
            formValido = false;
        }

        if(!NaoVazio(form.Mensagem.value)){
            form.Mensagem.className = "nao_valido";
            formValido = false;
        }

        if(!ValidarEmail(form.Email.value)){
            form.Email.className = "nao_valido";
            formValido = false;
        }

        if(!formValido){
            evt.preventDefault();
        }
    
    });

    var inputs = document.querySelectorAll("form[name=form_contato] input[type=text]");
    

    for(var i = 0; i < inputs.length; i++){   /* for para localizar cada campo e adicionar o evento de precionar as teclas do botão */

        inputs[i].addEventListener("keypress", function(){   /* pegando cada um dos campos input */
            this.className = "";
            
        });
    
    }

    var textarea = document.querySelector("form[name=form_contato] textarea");

    textarea.addEventListener("keyup", function(){
        this.className = "";
        document.querySelector(".texto").innerHTML = "Caracteres(s) " + this.value.length;  /*adiciona a palavra caracteres e concatena com o numero de caracteres*/
    });
}

/* Funções */
function ValidarEmail(valorEmail){  //funcao para validar o email que o usuário digitar
    if(
        valorEmail != "" &&                     /*se o campo email for diferente de vazio*/
        valorEmail.indexOf("@") > 3 &&              /*se existe no indice o caracter @ apoś 3 catacteres*/
        valorEmail.lastIndexOf(".") > posicaoArroba     /*verifica se a posição do . é maior do que o @*/
    ){
        return true;

    }else{
        return false;
    }
}
function NaoVazio(texto){
    if(texto.trim().length > 0){ // remove o espaço que o usuário deixar vazio
        return true;
    }else{
        return false;
    }
}

