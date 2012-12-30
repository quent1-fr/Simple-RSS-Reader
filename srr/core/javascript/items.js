/*
 * Items.js
 * Les fonctions présentes dans ce fichier permettent d'interagir avec les items
*/

/*
  * Fonction qui charge un item
*/
function load_item(id){
    afficher_loader();
    var xhr = getXMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {         
            document.getElementsByTagName('article')[0].scrollTop = 0; // Permet de retourner automatiquement en haut de l'article   
            document.getElementsByTagName('article')[0].innerHTML = xhr.responseText;
            mark_as(id, 1);
            masquer_loader();
        }
    };
    xhr.open('GET', 'core/interact.php?action=get&id=' + id, true);
    xhr.send(null);
    return false;
}

/*
  * Fonction qui change l'état d'un item (lu ou non)
*/
function mark_as(id, lu){
    afficher_loader();
        
    var xhr = getXMLHttpRequest();
    
    if(lu == 0){
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)){
                document.getElementById('markas').onclick = function() {mark_as(id, 1);}
                document.getElementById('markas').innerHTML = 'Marquer comme lu';
                if(document.getElementById('item' + id).style.fontWeight != 'bold')
                    items_non_lus++;
                document.getElementById('item' + id).style.fontWeight = 'bold';
                changer_titre();
                masquer_loader();
            }
        };
        xhr.open('GET', 'core/interact.php?action=set&id=' + id + '&as=unread', true);
        xhr.send(null);
    }
    else{
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)){
                document.getElementById('markas').onclick = function() {mark_as(id, 0);}
                document.getElementById('markas').innerHTML = 'Marquer comme non lu';
                if(document.getElementById('item' + id).style.fontWeight != 'normal')
                    items_non_lus--;
                document.getElementById('item' + id).style.fontWeight = 'normal';
                changer_titre();
                masquer_loader();
            }
        };
        xhr.open('GET', 'core/interact.php?action=set&id=' + id + '&as=read', true);
        xhr.send(null);
    }
}