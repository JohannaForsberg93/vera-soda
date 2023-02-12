window.addEventListener("DOMContentLoaded", () => getProducts());

document.addEventListener("DOMContentLoaded", function () {
	var elems = document.querySelectorAll(".dropdown-trigger");
	var instances = M.Dropdown.init(elems);
});

//Produkter från api
let productArray = [];
let cartItems = [];

const row = document.getElementById("card-html");
row.classList.add("row");

const ul = document.getElementById("dropdown1");


async function getProducts(){
	const response = await fetch("https://fakestoreapi.com/products");
	 productArray = await response.json();

			productArray.map((element) => {

				const col = document.createElement("div");
				const card = document.createElement("div");

				const cardImage = document.createElement("div");
				const img = document.createElement("img");

				const cardContent = document.createElement("div");
				const title = document.createElement("span");
				const br = document.createElement("br");
				const price = document.createElement("h5");

				const cardAction = document.createElement("div");
				const addButton = document.createElement("button");
				const iconAdd = document.createElement("i");
				//Modal
				const modalButton = document.createElement("button");
				const iconModal = document.createElement("i");
				const modalContainer = document.createElement("div");
				const modalDiv = document.createElement("div");
				const modalText = document.createElement("h4")

				//Styling
				col.classList.add("col","s12","m6","l4");
				card.classList.add("card");
				cardImage.classList.add("card-image");
				img.classList.add("responsive-img");
				cardContent.classList.add("card-content");
				title.classList.add("card-title","truncate");
				price.classList.add("center")
				cardAction.classList.add("card-action","center");
				addButton.classList.add("waves-effect","waves-light","btn-small");
				iconAdd.classList.add("material-icons","right");
				//modal
				modalButton.classList.add("waves-effect","waves-light","btn-small","modal-class","modal-trigger");
				iconModal.classList.add("material-icons");
				modalContainer.classList.add("modal")
				modalDiv.classList.add("modal-content")

				//Innehåll
				title.innerText = `${element.title}`;
				price.innerText = `${element.price} $`;
				img.setAttribute("src", `${element.image}`);
				img.setAttribute("alt","example image")

				//modal innehåll
				modalButton.setAttribute("data-target", "modal1")
				modalContainer.setAttribute("id", "modal1")
				modalText.innerText = "Snälla funka!!"

				iconAdd.innerText = "add_circle"
				addButton.innerText = "Lägg till"
				iconModal.innerText ="expand_more"

				//Append
				modalDiv.appendChild(modalText);
				modalContainer.appendChild(modalDiv);

				cardImage.appendChild(img)
				cardContent.appendChild(title);
				cardContent.appendChild(br);
				cardContent.appendChild(price);

				addButton.append(iconAdd);
				modalButton.append(iconModal);

				cardAction.append(addButton);
				cardAction.append(modalButton);

				card.append(cardImage,cardContent,cardAction);
				col.append(card);
				row.appendChild(col);

				addButton.addEventListener("click", () => {addProduct(element) } );
				
				//Funkar ej
				modalButton.addEventListener('click', function() {
					console.log("Klickade på modal!");
					console.log("Vad innehåller modalContainer?", modalContainer);
					var elems = document.querySelectorAll('.modal');
					var instances = M.Modal.init(elems);
				});
			});


}

let addProduct = (element) => {

	M.toast({html: 'Tillagd i varukorgen!', displayLength: 1000, classes: 'toast-class'})

	cartItems.push({
		id: element.id,
		img: element.image	
	});

	//Skapa cart-items för varje gång man klickat på lägg till
	const li = document.createElement("li");
	const a = document.createElement("a");

	const span = document.createElement("span");
	const img = document.createElement("img");
	const remove = document.createElement("button")
	//Innehåll
	img.classList.add("img-cart");
	img.setAttribute("src", `${element.image}`)
	img.setAttribute("alt", "example-image")

	span.classList.add("amount-cart","right")
	remove.classList.add("right","waves-effect","waves-light","btn-small")

	a.setAttribute("href", "#");
	span.innerText = `Antal: ${1}`;
	remove.innerText = "x";

	a.appendChild(img)
	a.appendChild(remove)
	a.appendChild(span)
	li.appendChild(a)
	ul.appendChild(li)

	//Tar bort i varukorg
	remove.addEventListener("click", (event) => {
		let buttonClicked = event.target;
		buttonClicked.parentElement.parentElement.remove();		
	})
};


