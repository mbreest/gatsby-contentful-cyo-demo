function navigationMenu(navigationMenu, path) {
    path = path + "/";
    const menu = navigationMenu.map(ne => { return {name: ne.name, path: ne.path}});        
    var submenu = null;
    var selectedMenu = navigationMenu.filter(ne => ne.path === path);
    if (selectedMenu.length == 0) {
        selectedMenu = navigationMenu.filter(ne => ne.submenu && ne.submenu.map(nes => nes.path).includes(path))        
    } 
    
    if (selectedMenu && selectedMenu.length > 0 && "submenu" in selectedMenu[0]) {        
        submenu = selectedMenu[0].submenu;        
    }    

    return {menu: menu, submenu: submenu};
}

exports.navigationMenu = navigationMenu;