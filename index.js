var menu = [
    {id:1, name: "menu 0001"},
    {id:2, name: "menu 0002"},
    {id:4, name: "menu 0004"},
    {id:3, name: "menu 0003"},
    {id:5, name: "menu 0005"},
    {id:6, name: "menu 0006"}
]

menu = menu.map(function(item, index){
    return Object.assign({}, item, {index: index});
});

var idFavs = getFavorites();
var menuFavorites = menu.filter(function(x) {
    return idFavs.indexOf(x.id) >= 0;
})

var menuNoFavorites = menu.filter(function(x) {
    return idFavs.indexOf(x.id) === -1;
})


function viewModel () {
    var self = this;

    self.menu = ko.observableArray(menuNoFavorites);
    self.favorites = ko.observableArray(menuFavorites);

    self.addFavorite = function(item) {
        self.favorites.splice(item.index, 0, item);
        self.menu.remove(function(rm) {
            return rm.id === item.id;
        });
    }

    self.removeFavorite = function(item) {
        self.menu.splice(item.index, 0, item);
        self.favorites.remove(function(rm) {
            return rm.id === item.id;
        });
    }
}

var vm = new viewModel();

vm.favorites.subscribe(function(item) {
    var onlyIds = item.map(function(x) { return x.id });
    console.log("novo_array", onlyIds);

    saveFavorites(onlyIds);
});

function saveFavorites(arrayIDs) {
    window.localStorage.setItem("menu_favoritos_wow", JSON.stringify(arrayIDs));

}

function getFavorites() {
    return JSON.parse(window.localStorage.getItem("menu_favoritos_wow")) || [];
}

ko.applyBindings(vm);