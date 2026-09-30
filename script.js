/* =====================================================
   NEBULA
   SCRIPT.JS
===================================================== */


/* =====================================================
   BANCO DE PERSONAGENS
===================================================== */

const characters = [

    {
        id: "luna-vega",

        name: "Luna Vega",

        category: "original",

        icon: "🌙",

        accent: "#9c7cff",

        description:
            "Astronauta urbana criada para representar uma personagem original dentro da comunidade NEBULA.",

        difficulty: "Intermediário",

        budget: 220,

        materials: [
            "Peruca roxa",
            "Tecido metalizado",
            "EVA",
            "Acessórios luminosos"
        ],

        colors: [
            "Roxo",
            "Prata",
            "Azul"
        ],

        steps: [
            "Montar a base da roupa",
            "Criar detalhes em EVA",
            "Estilizar a peruca",
            "Adicionar acessórios"
        ]
    },


    {
        id: "akari",

        name: "Akari Hoshino",

        category: "anime",

        icon: "🌸",

        accent: "#ff75d1",

        description:
            "Personagem demonstrativa com estética anime, fantasia e elementos delicados.",

        difficulty: "Fácil",

        budget: 160,

        materials: [
            "Peruca rosa",
            "Tecido leve",
            "Fita",
            "Acessórios"
        ],

        colors: [
            "Rosa",
            "Branco",
            "Lilás"
        ],

        steps: [
            "Montar a roupa",
            "Ajustar a saia",
            "Estilizar a peruca",
            "Finalizar os acessórios"
        ]
    },


    {
        id: "nova",

        name: "Nova — Guardiã",

        category: "game",

        icon: "⚔️",

        accent: "#66e8ff",

        description:
            "Personagem demonstrativa de RPG futurista com foco em armadura leve.",

        difficulty: "Avançado",

        budget: 390,

        materials: [
            "EVA",
            "Tinta",
            "Tecido preto",
            "Fivelas",
            "Espuma"
        ],

        colors: [
            "Preto",
            "Ciano",
            "Prata"
        ],

        steps: [
            "Criar o molde",
            "Construir a armadura",
            "Selar e pintar o EVA",
            "Montar acessórios"
        ]
    },


    {
        id: "iris",

        name: "Íris — Cosplay Urbano",

        category: "filme",

        icon: "🪐",

        accent: "#79f2ba",

        description:
            "Cosplay urbano baseado em peças que podem ser reutilizadas em diferentes projetos.",

        difficulty: "Fácil",

        budget: 130,

        materials: [
            "Jaqueta",
            "Tecido",
            "Acessórios",
            "Maquiagem"
        ],

        colors: [
            "Verde",
            "Preto",
            "Cinza"
        ],

        steps: [
            "Selecionar peças",
            "Customizar a jaqueta",
            "Preparar maquiagem",
            "Adicionar acessórios"
        ]
    },


    {
        id: "astra",

        name: "Astra — OC",

        category: "original",

        icon: "✨",

        accent: "#c49cff",

        description:
            "Personagem original criada para demonstrar como a NEBULA pode documentar OCs.",

        difficulty: "Intermediário",

        budget: 280,

        materials: [
            "Peruca",
            "Tule",
            "EVA",
            "Pedrarias"
        ],

        colors: [
            "Violeta",
            "Prata",
            "Branco"
        ],

        steps: [
            "Criar o molde",
            "Cortar os tecidos",
            "Aplicar os detalhes",
            "Finalizar o visual"
        ]
    },


    {
        id: "kai",

        name: "Kai — Tech Suit",

        category: "game",

        icon: "🤖",

        accent: "#7ce8ff",

        description:
            "Conceito tecnológico com estruturas leves, espuma e pintura.",

        difficulty: "Avançado",

        budget: 450,

        materials: [
            "EVA",
            "Espuma",
            "Tinta",
            "LED decorativo"
        ],

        colors: [
            "Ciano",
            "Preto",
            "Branco"
        ],

        steps: [
            "Planejar a estrutura",
            "Construir as peças",
            "Pintar",
            "Adicionar detalhes"
        ]
    }

];



/* =====================================================
   BANCO DE MATERIAIS
===================================================== */

const materials = [

    {
        name: "EVA",
        icon: "⬡",
        description:
            "Base para armaduras, acessórios e estruturas leves.",
        price: "R$ 8–35"
    },

    {
        name: "Perucas",
        icon: "✂️",
        description:
            "Perucas para cortes, estilização e penteados.",
        price: "R$ 40–180"
    },

    {
        name: "Tecidos",
        icon: "🧵",
        description:
            "Opções para roupas, capas, saias e detalhes.",
        price: "R$ 15–60/m"
    },

    {
        name: "Espuma",
        icon: "◈",
        description:
            "Material útil para estruturas e volumes.",
        price: "R$ 15–80"
    },

    {
        name: "Tintas",
        icon: "🎨",
        description:
            "Tintas e acabamentos para EVA e outras superfícies.",
        price: "R$ 8–45"
    },

    {
        name: "Acessórios",
        icon: "💎",
        description:
            "Fivelas, pedrarias, fitas e outros detalhes.",
        price: "R$ 5–100"
    }

];



/* =====================================================
   ELEMENTOS
===================================================== */

const $ = selector =>
    document.querySelector(selector);


const $$ = selector =>
    [...document.querySelectorAll(selector)];



/* =====================================================
   FAVORITOS
===================================================== */

let favorites =
    JSON.parse(
        localStorage.getItem("nebulaFavorites") || "[]"
    );


function saveFavorites() {

    localStorage.setItem(
        "nebulaFavorites",
        JSON.stringify(favorites)
    );

    $("#favoriteCount").textContent =
        favorites.length;
}



function toggleFavorite(id) {

    if (favorites.includes(id)) {

        favorites =
            favorites.filter(
                item => item !== id
            );

        showToast(
            "Removido dos favoritos."
        );

    } else {

        favorites.push(id);

        showToast(
            "Adicionado aos favoritos!"
        );

    }

    saveFavorites();

    renderCharacters(
        filterCharacters()
    );
}



/* =====================================================
   FORMATAÇÃO
===================================================== */

function formatMoney(value) {

    return Number(value).toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}



/* =====================================================
   TOAST
===================================================== */

function showToast(message) {

    const toast =
        $("#toast");

    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );

    setTimeout(() => {

        toast.classList.remove(
            "show"
        );

    }, 2500);

}



/* =====================================================
   WIKI
===================================================== */

function renderCharacters(
    list = characters
) {

    const grid =
        $("#characterGrid");


    if (!list.length) {

        grid.innerHTML = `

            <div class="material">

                <h3>
                    Nenhum resultado encontrado
                </h3>

                <p>
                    Tente pesquisar outro personagem,
                    categoria ou material.
                </p>

            </div>

        `;

        return;

    }


    grid.innerHTML =
        list.map(character => `

            <article class="card">

                <div
                    class="character-art"
                    style="--accent:${character.accent}"
                >
                    ${character.icon}
                </div>


                <div class="card-content">

                    <div class="card-meta">

                        <span class="badge">
                            ${character.category}
                        </span>

                        <span class="badge">
                            ${character.difficulty}
                        </span>

                    </div>


                    <h3>
                        ${character.name}
                    </h3>


                    <p>
                        ${character.description}
                    </p>


                    <div class="card-actions">

                        <button
                            class="small-button view-character"
                            data-id="${character.id}"
                        >
                            Ver Wiki
                        </button>


                        <button
                            class="small-button favorite-character"
                            data-id="${character.id}"
                        >

                            ${
                                favorites.includes(
                                    character.id
                                )
                                    ? "♥"
                                    : "♡"
                            }

                            Favoritar

                        </button>

                    </div>

                </div>

            </article>

        `).join("");

}



/* =====================================================
   MATERIAIS
===================================================== */

function renderMaterials(
    list = materials
) {

    const grid =
        $("#materialGrid");


    if (!list.length) {

        grid.innerHTML = `

            <article class="material">

                <h3>
                    Nenhum material encontrado
                </h3>

                <p>
                    Tente pesquisar por EVA,
                    tecido, peruca ou acessórios.
                </p>

            </article>

        `;

        return;

    }


    grid.innerHTML =
        list.map(material => `

            <article class="material">

                <div class="material-icon">
                    ${material.icon}
                </div>

                <h3>
                    ${material.name}
                </h3>

                <p>
                    ${material.description}
                </p>

                <span class="price">
                    ${material.price}
                </span>

            </article>

        `).join("");

}



/* =====================================================
   FILTRO DA WIKI
===================================================== */

function filterCharacters() {

    const term =
        $("#wikiSearch")
            .value
            .toLowerCase()
            .trim();


    const category =
        $("#categoryFilter")
            .value;


    return characters.filter(
        character => {

            const searchableText = [

                character.name,

                character.category,

                character.description,

                ...character.materials

            ]
                .join(" ")
                .toLowerCase();


            return (

                searchableText.includes(
                    term
                )

                &&

                (
                    category === "todos"

                    ||

                    character.category ===
                    category
                )

            );

        }
    );

}



/* =====================================================
   MODAL DA WIKI
===================================================== */

function openCharacter(id) {

    const character =
        characters.find(
            item => item.id === id
        );


    if (!character)
        return;


    $("#characterDetails").innerHTML = `

        <div
            class="detail-art"
            style="
                box-shadow:
                inset 0 0 80px
                ${character.accent}33;
            "
        >

            ${character.icon}

        </div>


        <div class="detail-content">

            <div class="card-meta">

                <span class="badge">
                    ${character.category}
                </span>

                <span class="badge">
                    ${character.difficulty}
                </span>

            </div>


            <h2>
                ${character.name}
            </h2>


            <p>
                ${character.description}
            </p>


            <h3>
                🎨 Características visuais
            </h3>


            <p>
                Cores principais:
                ${character.colors.join(" • ")}
            </p>


            <h3>
                🧵 Materiais sugeridos
            </h3>


            <ul class="detail-list">

                ${character.materials
                    .map(
                        material =>
                            `<li>${material}</li>`
                    )
                    .join("")
                }

            </ul>


            <h3>
                🛠️ Etapas do projeto
            </h3>


            <ol class="detail-list">

                ${character.steps
                    .map(
                        step =>
                            `<li>${step}</li>`
                    )
                    .join("")
                }

            </ol>


            <p>

                <strong>
                    Orçamento de referência:
                </strong>

                ${formatMoney(
                    character.budget
                )}

            </p>


            <button
                class="primary-button full-button use-character"
                data-id="${character.id}"
            >

                Usar no Criador

            </button>

        </div>

    `;


    $("#characterModal")
        .classList
        .remove("hidden");

}



/* =====================================================
   PESQUISA GLOBAL
===================================================== */

function globalSearch(term) {

    const value =
        term
            .toLowerCase()
            .trim();


    if (!value) {

        $("#wiki")
            .scrollIntoView({
                behavior: "smooth"
            });

        return;

    }


    const characterResults =
        characters.filter(
            character => {

                const text = [

                    character.name,

                    character.category,

                    character.description,

                    ...character.materials

                ]
                    .join(" ")
                    .toLowerCase();


                return text.includes(
                    value
                );

            }
        );


    if (
        characterResults.length
    ) {

        $("#wikiSearch").value =
            term;

        renderCharacters(
            characterResults
        );

        $("#wiki")
            .scrollIntoView({
                behavior: "smooth"
            });

        showToast(
            `${characterResults.length} resultado(s) encontrado(s).`
        );

        return;

    }


    const materialResults =
        materials.filter(
            material =>
                (
                    material.name +
                    " " +
                    material.description
                )
                    .toLowerCase()
                    .includes(value)
        );


    renderMaterials(
        materialResults
    );


    $("#materiais")
        .scrollIntoView({
            behavior: "smooth"
        });


    showToast(

        materialResults.length

            ? `${materialResults.length} material(is) encontrado(s).`

            : "Nenhum resultado encontrado."

    );

}



/* =====================================================
   CRIADOR DE COSPLAY
===================================================== */

function buildCosplay() {

    const character =
        characters.find(
            item =>
                item.id ===
                $("#characterSelect").value
        );


    const budget =
        Math.max(
            0,
            Number(
                $("#budgetInput").value
            ) || 0
        );


    const level =
        $("#styleSelect").value;


    const distribution = {

        economico:
            [0.55,0.25,0.20],

        equilibrado:
            [0.40,0.35,0.25],

        completo:
            [0.32,0.38,0.30]

    };


    const percentages =
        distribution[level];


    const names = [

        "Roupa / tecido",

        "Peruca / cabelo",

        "Acessórios / estrutura"

    ];


    const allocations =
        percentages.map(
            (percentage,index) => ({

                name:
                    names[index],

                value:
                    Math.round(
                        budget *
                        percentage
                    )

            })
        );


    const currentTotal =
        allocations.reduce(
            (total,item) =>
                total + item.value,
            0
        );


    allocations[
        allocations.length - 1
    ].value +=
        budget -
        currentTotal;


    $("#creatorResult").innerHTML = `

        <div class="result-head">

            <div>

                <p>
                    PROJETO PERSONALIZADO
                </p>

                <h3>
                    ${character.icon}
                    ${character.name}
                </h3>

                <p>
                    Nível:
                    ${level}
                </p>

            </div>


            <span class="budget-pill">

                ${formatMoney(
                    budget
                )}

            </span>

        </div>


        <ul class="item-list">

            ${allocations
                .map(
                    item => `

                        <li>

                            <span>
                                ${item.name}
                            </span>

                            <strong>
                                ${formatMoney(
                                    item.value
                                )}
                            </strong>

                        </li>

                    `
                )
                .join("")
            }

        </ul>


        <div class="total">

            <span>
                Total planejado
            </span>

            <span>
                ${formatMoney(
                    budget
                )}
            </span>

        </div>


        <p class="helper-text">

            O sistema distribuiu automaticamente
            o orçamento entre categorias.

        </p>


        <div class="result-actions">

            <button
                class="primary-button"
                id="exportButton"
            >
                🖼️ Exportar ficha
            </button>


            <button
                class="outline-button"
                id="favoriteResult"
            >
                ♡ Favoritar
            </button>

        </div>

    `;


    $("#exportButton")
        .addEventListener(
            "click",
            () =>
                exportProject(
                    character,
                    budget,
                    allocations,
                    level
                )
        );


    $("#favoriteResult")
        .addEventListener(
            "click",
            () =>
                toggleFavorite(
                    character.id
                )
        );


    showToast(
        "Cosplay planejado com sucesso!"
    );

}



/* =====================================================
   EXPORTAÇÃO DA FICHA
===================================================== */

function exportProject(
    character,
    budget,
    allocations,
    level
) {

    const canvas =
        document.createElement(
            "canvas"
        );


    canvas.width =
        1200;

    canvas.height =
        850;


    const ctx =
        canvas.getContext(
            "2d"
        );


    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            1200,
            850
        );


    gradient.addColorStop(
        0,
        "#080a22"
    );


    gradient.addColorStop(
        1,
        "#211451"
    );


    ctx.fillStyle =
        gradient;

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    /* TÍTULO */

    ctx.fillStyle =
        "#66e8ff";

    ctx.font =
        "bold 24px Arial";

    ctx.fillText(
        "✦ NEBULA • COSPLAY LAB",
        70,
        75
    );


    /* PERSONAGEM */

    ctx.fillStyle =
        "#ffffff";

    ctx.font =
        "bold 52px Arial";

    ctx.fillText(
        character.name,
        70,
        145
    );


    ctx.fillStyle =
        "#b5b7d5";

    ctx.font =
        "22px Arial";

    ctx.fillText(

        `Projeto ${level} • Orçamento: ${formatMoney(budget)}`,

        70,
        185

    );


    /* CAIXA */

    ctx.strokeStyle =
        "#9c7cff";

    ctx.lineWidth =
        2;

    ctx.strokeRect(
        70,
        225,
        1060,
        420
    );


    ctx.fillStyle =
        "#ffffff";

    ctx.font =
        "bold 28px Arial";

    ctx.fillText(
        "Materiais e distribuição",
        105,
        275
    );


    ctx.font =
        "23px Arial";


    allocations.forEach(
        (item,index) => {

            const y =
                335 +
                index * 75;


            ctx.fillStyle =
                "#b5b7d5";

            ctx.fillText(
                item.name,
                105,
                y
            );


            ctx.fillStyle =
                "#79f2ba";

            ctx.fillText(
                formatMoney(
                    item.value
                ),
                900,
                y
            );

        }
    );


    ctx.fillStyle =
        "#8185aa";

    ctx.font =
        "18px Arial";


    ctx.fillText(

        "Ficha gerada pelo protótipo NEBULA — dados demonstrativos.",

        70,
        730

    );


    ctx.fillText(

        "nebula • cosplay research & creation lab",

        70,
        765

    );


    /* DOWNLOAD */

    const link =
        document.createElement(
            "a"
        );


    link.download =
        `nebula-${character.id}-projeto.png`;


    link.href =
        canvas.toDataURL(
            "image/png"
        );


    link.click();


    showToast(
        "Ficha exportada como imagem!"
    );

}



/* =====================================================
   FAVORITOS
===================================================== */

function showFavorites() {

    const list =
        $("#favoritesList");


    if (!favorites.length) {

        list.innerHTML = `

            <p class="helper-text">

                Você ainda não adicionou
                personagens aos favoritos.

            </p>

        `;

    } else {

        list.innerHTML =
            favorites
                .map(id => {

                    const character =
                        characters.find(
                            item =>
                                item.id === id
                        );


                    if (!character)
                        return "";


                    return `

                        <div class="favorite-row">

                            <strong>

                                ${character.icon}

                                ${character.name}

                            </strong>

                            <span>
                                ${character.category}
                            </span>

                        </div>

                    `;

                })
                .join("");

    }


    $("#favoritesModal")
        .classList
        .remove("hidden");

}



/* =====================================================
   EVENTOS
===================================================== */


/* Pesquisa Wiki */

$("#wikiSearch")
    .addEventListener(
        "input",
        () =>
            renderCharacters(
                filterCharacters()
            )
    );


/* Categoria */

$("#categoryFilter")
    .addEventListener(
        "change",
        () =>
            renderCharacters(
                filterCharacters()
            )
    );


/* Pesquisa global */

$("#searchButton")
    .addEventListener(
        "click",
        () =>
            globalSearch(
                $("#globalSearch").value
            )
    );


$("#globalSearch")
    .addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter"
            ) {

                globalSearch(
                    event.target.value
                );

            }

        }
    );


/* Tags */

$$(".tag")
    .forEach(
        tag => {

            tag.addEventListener(
                "click",
                () =>
                    globalSearch(
                        tag.dataset.search
                    )
            );

        }
    );


/* Criador */

$("#buildButton")
    .addEventListener(
        "click",
        buildCosplay
    );


/* Favoritos */

$("#favoritesButton")
    .addEventListener(
        "click",
        showFavorites
    );


/* Planos */

$$(".plan-button")
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    showToast(

                        `Plano ${button.dataset.plan} selecionado — demonstração.`

                    );

                }
            );

        }
    );


/* Menu mobile */

$("#menuButton")
    .addEventListener(
        "click",
        () => {

            $("#nav")
                .classList
                .toggle("open");

        }
    );


/* Clique geral */

document.addEventListener(
    "click",
    event => {

        const view =
            event.target.closest(
                ".view-character"
            );


        const favorite =
            event.target.closest(
                ".favorite-character"
            );


        const use =
            event.target.closest(
                ".use-character"
            );


        const close =
            event.target.closest(
                "[data-close]"
            );


        if (view) {

            openCharacter(
                view.dataset.id
            );

        }


        if (favorite) {

            toggleFavorite(
                favorite.dataset.id
            );

        }


        if (use) {

            $("#characterSelect").value =
                use.dataset.id;


            $("#characterModal")
                .classList
                .add("hidden");


            $("#criador")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }


        if (close) {

            $(`#${close.dataset.close}`)
                .classList
                .add("hidden");

        }

    }
);


/* ESC */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            $$(".modal")
                .forEach(
                    modal =>
                        modal.classList
                            .add("hidden")
                );

        }

    }
);



/* =====================================================
   INICIALIZAÇÃO
===================================================== */

function initialize() {

    saveFavorites();

    renderCharacters();

    renderMaterials();


    $("#characterSelect").innerHTML =
        characters
            .map(
                character => `

                    <option
                        value="${character.id}"
                    >

                        ${character.name}

                    </option>

                `
            )
            .join("");

}


initialize();
