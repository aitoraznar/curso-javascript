var api = {
  characters: function (callback) {
    $.get('/data/characters.json', function (characters) {
      callback(characters);
    });
  },
  comics: function (characterId, callback) {
    $.get('/data/comics-' + characterId + '.json', function (response) {
      callback(response);
    });
  }
};