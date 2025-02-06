const pokemonName = document.querySelector(".pokemon_name");
const pokemonNumber = document.querySelector(".pokemon_number");
const pokemonImage = document.querySelector(".pokemon_image");
const form = document.querySelector(".form");
const input = document.querySelector(".input_search");

let search = document.querySelector(".btn_search");

const btnPrev = document.querySelector(".btn_prev");
const btnNext = document.querySelector(".btn_next");


const trainerCard = document.querySelector(".trainer_card");
const trainerName = document.querySelector(".trainer_name");

const cardImages = document.querySelectorAll(".card_image");




const addBtn = document.querySelector(".add_btn");
const addName = document.querySelector(".add_name");
const nameInput = document.querySelector(".input_name");

const clearBtn = document.querySelector(".btn_clear");


let searchPokemon = 1;


// Laço para alterar todos as imagens nos slots
cardImages.forEach((img) => {
    img.addEventListener('click', () => {
        // Verifica se há uma imagem no slot
        if (img.getAttribute('src') !== "") {
            // Remove a imagem do slot
            img.setAttribute('src', "");
            // Resetar os estilos inline para que o slot volte ao estado original
            img.style.opacity = "";
            img.style.position = "";
            img.style.width = "";
            img.style.height = "";
            img.style.transform = "";
        }
    });
});


const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
   
   if(APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
   }
   

}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = "Loading...";
    const data = await fetchPokemon(pokemon);

    if(data) {
        pokemonImage.style.display = 'flex';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
        
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = "Not found";
        pokemonNumber.innerHTML = '';
    }


}


search.addEventListener('click', () => {
    renderPokemon(input.value.toLowerCase());
});


form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
    
});


btnPrev.addEventListener('click', () => {
    if(searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }

});

btnNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});


addBtn.addEventListener('click', () => {
    // Verifica se há uma imagem de pokémon válida (ou seja, se o 'src' não está vazio).
    if(pokemonImage.src) {
        // Percorre cada slot do trainer card.
        for(let i = 0; i < cardImages.length; i++) {
            // Usamos getAttribute para verificar se o atributo 'src' está vazio.
            if(cardImages[i].getAttribute('src') === "") {
                cardImages[i].setAttribute('src', pokemonImage.src);
                cardImages[i].style.opacity = "1";         // Remove a baixa opacidade
                cardImages[i].style.position = "static";     // Remove posicionamento absoluto
                cardImages[i].style.width = "100%";           // Ajusta a largura para preencher o slot
                cardImages[i].style.height = "100%";          // Ajusta a altura para preencher o slot
                cardImages[i].style.transform = "none";       // Remove transformações indesejadas

                break; // Sai do loop após preencher o primeiro espaço vazio.
            }
        }
    }
});


addName.addEventListener('click', () => {
    trainerName.innerHTML = nameInput.value;
});

clearBtn.addEventListener('click', () => {
    trainerName.innerHTML = '';
});


renderPokemon(searchPokemon);
