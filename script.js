function Nodi(){
	this.lista = [];
	this.categorie = []
	this.categoria = "";
	this.difficolta = 1;
	this.fotogramma = 1;
	this.inizializza =		//metodo che inizializza un oggetto nodi
		function(docXML){
			var nodi = docXML.getElementsByTagName("nodo");
			for (var i = 0; i < nodi.length; i++) {		// ciclo sui tag nodo
				var newNodo = new Nodo();
				newNodo.inizializza(nodi[i]);		// creazione dell'oggetto Nodi
				//console.log(newNodo.categoria)
				this.lista.push(newNodo);		// inserimento dell'oggetto stesso nell'array lista
				if(this.categorie.indexOf(newNodo.categoria) == -1){
					this.categorie.push(newNodo.categoria)
				}
			}
		}
	this.mostraCategorie = 		//visualizza le categorie nell'HTML
		function(){
			var s = '<div id="categorie"><p>Clicca su un immagine per filtrare per categoria:</p>';
			
			for (i in this.categorie){
				s += '<span class="caption"><img src="img/imgCat/' + this.categorie[i].toLowerCase() + '.jpg" alt="' + this.categorie[i] +'" id="' + this.categorie[i] + '" class="Categoria"><span>' + this.categorie[i] + '</span></span>'
			} 
			s += '</div>';
			var container = document.getElementById("container");
			container.innerHTML = s;
			var na = document.getElementsByClassName("Categoria");
			for(i in na){
				na[i].onclick = newNodi.filtraCat;		// si assegna la funzione ordina dell'oggetto iNodi all'evento click del tag img di ogni categoria
			}
		}
	this.mostraNodi =		//visualizza i Nodi nell'HTML
		function(){
			var s = '<div id="difficolta"><p>Filtra per grado di difficoltà:</p><img alt="imbarra1" src="img/difficolta/barra1.png" id="imgbarra1"><img alt="imbarra2" src="img/difficolta/barra2.png" id="imgbarra2"><img alt="imbarra3" src="img/difficolta/barra3.png" id="imgbarra3"><input type="range" id="diff" name="difficolta" min="1" max="3" value="' + this.difficolta + '"></div>';
			for (i in this.lista){
				if((this.categoria == "" && this.difficolta == 0)
					|| (this.lista[i].categoria == this.categoria && this.difficolta == 0)
					|| (this.lista[i].categoria == this.categoria && this.difficolta == this.lista[i].difficolta)
					|| (this.categoria == "" && this.difficolta == this.lista[i].difficolta)){
					s += this.lista[i].mostraNodo();
				}
			}
			s += '<br/><br/><a href="tutorial.html">Ritorna alle categorie<a><br/><br/>'
			var container = document.getElementById("container");
			container.innerHTML = s;
			var nd = document.getElementsByClassName("nodi");
			for (i in nd){
				nd[i].onclick = newNodi.mostraDatiNodo;
			}
			var diff = document.getElementById("diff");
			diff.onclick = newNodi.filtraDiff;
		}
	this.filtraCat = 
		function(){		// funzione per la visualizzazione dei nodi sulla base della categoria
			newNodi.categoria = this.id;
			newNodi.mostraNodi();
		}
	this.filtraDiff = 
		function(){		// funzione per la visualizzazione dei nodi sulla base del grado di difficoltà scelti
			newNodi.difficolta = this.value;
			newNodi.mostraNodi();
		}
	this.mostraDatiNodo = 
		function(){		// questa funzione crea e aggiunge i tag con le informazioni e l'immagine del nodo cliccato nella finestra popup
			var cl = this.title;
			var n = newNodi.lista;
			var s = "";
			
			for (i in n){
				if(n[i].nome == cl){
					s += n[i].mostraDati();		// creazione dei tag relativi al nodo cliccato
					break;		// interruzione necessaria per evitare la ripetizione di nodi aventi lo stesso nome
				}
			}
			var dat = document.getElementById("datiNodo");
			var inf = document.getElementById("info");
			dat.style.display="block";		// la finestra popu compare
			inf.innerHTML = s;		// i tag creati vengono aggiunti al div con id info
			var decrementa = document.getElementById("indietro");
			var incrementa = document.getElementById("avanti");
			incrementa.onclick = newNodi.incrementa;
			decrementa.onclick = newNodi.decrementa;
		}
	this.incrementa =		// scorre immagini in avanti
		function(){
			var img = document.getElementsByClassName("nodoAnim")[0];
			var nodo = newNodi.cercaNodo(img.id);
			var fotogrammiLength = nodo.fotogrammi;
			if(fotogrammiLength != newNodi.fotogramma){
				newNodi.fotogramma ++;
				newImg = nodo.mostraImmagine(newNodi.fotogramma);
				img.src = newImg;
			}
		}
	this.decrementa =		// scorre immagini all'indietro
		function(){
			var img = document.getElementsByClassName("nodoAnim")[0];
			var nodo = newNodi.cercaNodo(img.id);
			if(newNodi.fotogramma != 1){
				newNodi.fotogramma --;
				newImg = nodo.mostraImmagine(newNodi.fotogramma);
				img.src = newImg;
			}
		}
	this.cercaNodo = 
		function(el){		// funzione che individua e restituisce l'oggetto nodo, contenuto nell'array list, corrispondente al tag img cliccato
			for (var i = 0; i < this.lista.length; i++){
				if(this.lista[i].nome == el){
					return this.lista[i];
				}
			}
		}
		
}
function Nodo(){		
	this.nome = "";
	this.difficolta = 0;
	this.descrizione = "";
	this.curiosita = "";
	this.categoria = "";
	this.immagine = "";
	this.fotogrammi = 0;
	this.inizializza =		//inizializza oggetto nodo
		function(nodo){
			this.nome = nodo.getElementsByTagName("nome")[0].firstChild.nodeValue;
			this.descrizione = nodo.getElementsByTagName("descrizione")[0].firstChild.nodeValue;
			this.curiosita = nodo.getElementsByTagName("curiosita")[0].firstChild.nodeValue;
			this.immagine = nodo.getElementsByTagName("immagine")[0].firstChild.nodeValue;
			this.fotogrammi = parseInt(nodo.getElementsByTagName("fotogrammi")[0].firstChild.nodeValue);
			difficoltaString = nodo.getElementsByTagName("difficolta")[0].firstChild.nodeValue;
			switch(difficoltaString){
				case "facile": this.difficolta = 1; break;
				case "media": this.difficolta = 2; break;
				case "difficile": this.difficolta = 3; break;
			}
			this.categoria = nodo.getElementsByTagName("categoria")[0].firstChild.nodeValue;
		}
	this.mostraNodo=
		function(){		// si crea il tag img relativo all'oggetto
			return '<img class="nodi" title="'+ this.nome +'" src="img/nodi/'+ this.immagine +'.png" alt="'+this.nome+'" />';
		}
	this.mostraDati=
		function(){		// si creano i tag destinati al popup specifico per l'elemento (nodo) cliccato
			var diff;
			switch(this.difficolta){
				case 1: diff = "Difficolt&agrave; facile"; break;
				case 2: diff = "Difficolt&agrave; media"; break;
				case 3: diff = "Difficolt&agrave; difficile"; break;
			}
			return '<p class="nome">'+this.nome+'</p>'+ '<img class="nodoAnim" id="'+ this.nome +'" src="img/nodiAnim/'+ this.immagine +'/1.png"'+' />'+'<p class="descrizione">' + this.descrizione + '</p>' + '<p class="curiosita">' + this.curiosita + '</p>'+ '<p class="difficolta">' + diff +'</p>';
		}
	this.mostraImmagine=		//si crea l'immagine per l'animazione
		function(fotogramma){
			return 'img/nodiAnim/'+ this.immagine +'/' + fotogramma + '.png'
		}
}

function loadXML(nomeFile) {		// caricamento del file XML
   var xmlhttp;
   if (window.XMLHttpRequest) {
      // IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp = new XMLHttpRequest();
   } else {
      // IE6, IE5
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
   }
   xmlhttp.open("GET", nomeFile, false);
   xmlhttp.send();
   return xmlhttp.responseXML;
}

function chiudiDati(){		// chiusura della finestra popup
	var dat = document.getElementById("datiNodo");
	dat.style.display="none";		// scomparsa della finestra
	var inf = document.getElementById("info");
	inf.innerHTML = null;		// cancellatura del contenuto della finestra
	newNodi.fotogramma = 1
}

/*function isInt(x) {		//verifica che x sia un intero
	return x % 1 === 0;
}*/

var newNodi;
function init(){
	docXML = loadXML("nodi.xml");
	newNodi = new Nodi();
	newNodi.inizializza(docXML);
	newNodi.mostraCategorie();
	var chiudi = document.getElementById("chiudi");
	chiudi.onclick = chiudiDati;
}

window.onload = init;
