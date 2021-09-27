var padraoJogo = [];
var corDosBotoes = ["red", "blue", "green", "yellow"];
var cliquesUsuario = [];

var iniciado = false;
var nivel = 0;

$(document).keypress(function () {
  if (!iniciado) {
    // Mudar o título para o nível que o usuário está
    $("#level-title").text("Nível " + nivel);
    proximaSequencia();
    iniciado = true;
  }
});

// Função handler para pegar o ID da cor do botão que o usuário pressionou e adicionar numa lista
$(".btn").click(function () {
  var corEscolhidaPeloUsuario = $(this).attr("id");
  cliquesUsuario.push(corEscolhidaPeloUsuario);

  tocarSom(corEscolhidaPeloUsuario);
  animacaoPressionado(corEscolhidaPeloUsuario);
  checarResposta(cliquesUsuario.length - 1);
});

// Função que checa se o usuário apertou no botão correto
function checarResposta(nivelAtual) {
  if (padraoJogo[nivelAtual] === cliquesUsuario[nivelAtual]) {
    if (cliquesUsuario.length === padraoJogo.length) {
      setTimeout(function () {
        proximaSequencia();
      }, 1000);
    }
  } else {
    tocarSom("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, ENTER para restart");

    restart();
  }
}

// Escolhe um número aleatório de 0 a 3
// Escolhe uma das cores baseado no número escolhido e adiciona numa lista para saber a ordem até o momento
function proximaSequencia() {
  cliquesUsuario = [];

  nivel++;

  $("#level-title").text("Nível " + nivel);

  var numeroAleatorio = Math.floor(Math.random() * 4);
  var corEscolhidaAleatoriamente = corDosBotoes[numeroAleatorio];
  padraoJogo.push(corEscolhidaAleatoriamente);

  // Pega o ID da cor escolhida e adiciona uma animação de flash nela
  $("#" + corEscolhidaAleatoriamente)
    .fadeOut(100)
    .fadeIn(100);

  tocarSom(corEscolhidaAleatoriamente);
}

// Navega na pasta de sons para tocar o som da cor escolhida pelo usuário
function tocarSom(nome) {
  var audio = new Audio("sounds/" + nome + ".mp3");
  audio.play();
}

// Adiciona uma classe para parecer que o botão foi pressionado
function animacaoPressionado(corAtual) {
  $("#" + corAtual).addClass("pressed");

  setTimeout(function () {
    $("#" + corAtual).removeClass("pressed");
  }, 100);
}

// Função para reiniciar o jogo
function restart() {
  nivel = 0;
  iniciado = false;
  padraoJogo = [];
}
