var $comboPersonaje1;
var $comboPersonaje2;
var $resultadosTable = $('#resultados');
var $resultadosTableBody = $('tbody', $resultadosTable);
var resultComicTableRowTemplate;
var controller = Controller();

    $(document).on('ready', function () {
  $comboPersonaje1 = $('#personaje1');
  $comboPersonaje2 = $('#personaje2');
  var btnBuscar = document.getElementById('boton-buscar');
  resultComicTableRowTemplate = document.getElementById('resultComicTableRowTemplate');

  api.characters(controller.handleCharacters);

  btnBuscar.onclick = controller.buscarComics;

});