 const ArtistAPI = {
    artists: [
        { name: "Bob Marley", id: "1", albums: [{name: "Exodus", year: 1977}] },
        { name: "Queen", id: "2"},
        { name: "Matchbox 20", id: "3"},
        { name: "Foo Fighters", id: "4"},
        { name: "Blink 182", id: "5"},
        { name: "Coldplay", id: "6"},
        { name: "Keane", id: "7"},
        { name: "Arctic Monkeys", id: "8"},
        { name: "3 Doors Down", id: "9"},
    ],
    all: function () {
        return this.artists
    },
    get: function (id) {
        return this.artists.find((a) => a.id === id);
    }
}

 export default ArtistAPI;