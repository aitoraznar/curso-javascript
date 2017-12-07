function Controller() {
    var module = {
        handleCharacters: handleCharacters,
        buscarComics: buscarComics
    };

    function fillCombos(personajes) {
        var option;
        var option2;

        personajes.forEach(function (personaje) {
            option = document.createElement('option');
            option.value = personaje.id;
            option.innerText = personaje.name;

            option2 = document.createElement('option');
            option2.value = personaje.id;
            option2.innerText = personaje.name;

            $comboPersonaje1.append(option);
            $comboPersonaje2.append(option2);
        });
    }

    function handleCharacters(response) {
        fillCombos(response);
    }

    function buscarComics(e) {
        e.preventDefault();

        if (!$comboPersonaje1.val() || !$comboPersonaje2.val()) {
            return;
        }

        $.when(api.comics($comboPersonaje1.val()), api.comics($comboPersonaje2.val()))
            .done(handleComicsResults);
    }

    function handleComicsResults(response1, response2) {
        var comics1 = response1[0];
        var comics2 = response2[0];

        getMatchedComics(comics1, comics2)
            .done(printComicsResults);

    }

    function getMatchedComics(comics1, comics2) {
        var deferred = $.Deferred();

        var matches = [];

        comics1.forEach(function(comic1) {
            comics2.forEach(function(comic2) {
                if (comic1.id === comic2.id) {
                    matches.push(comic2);
                }
            });
        });

        console.log('Resultados', matches.length);
        deferred.resolve(matches);

        return deferred.promise();
    }

    function printComicsResults(comics) {
        var resultRows = document.createDocumentFragment();
        var rowHtml;

        $resultadosTableBody.empty();

        comics.forEach(function(comic) {
            rowHtml = createComicResultRow(comic);
            resultRows.appendChild(rowHtml);
        });

        $resultadosTableBody.append(resultRows);
    }

    function createComicResultRow(comic) {
        var rowHtml = resultComicTableRowTemplate.innerHTML
            .replace('{{id}}', comic.id)
            .replace('{{title}}', comic.title)
            .replace('{{characters}}', comic.characters.join(', '));

        return $(rowHtml)[0];
    }

    return module;
}
