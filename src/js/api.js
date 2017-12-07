var api = {
  characters: function (callback) {
    return $.get('/data/characters.json', callback);
  },

  comics: function (characterId, callback) {
    return $.get('/data/comics-' + characterId + '.json', callback);
  }
};