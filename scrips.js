const botaoUpload = document.getElementById("upload-btn");
const inputImagem = document.getElementById("image-upload");
const imagemPreview = document.querySelector(".main-imagem");
const nomeImagem = document.querySelector(".container-imagem-nome p");

botaoUpload.addEventListener("click", () => {
    inputImagem.click();
})

// Exercício 1 - Construindo a função de leitura de arquivo
function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();

        leitor.onload = () => {
            resolve({
                resultado: leitor.result,
                nome: arquivo.name
            });
        };

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo: ${arquivo.name}`);
        };

        leitor.readAsDataURL(arquivo);
    });
};

// Exercício 2 - Filtrando lista de gatos
function filtrarGatoPorCor(listaDeGatos, corDesejada) {
    return listaDeGatos.filter(gato => gato.cor.toLowerCase() === corDesejada.toLowerCase());
};

// Exercício 3 - Manipulando o upload de imagem com Promise e Async/Await

botaoUpload.addEventListener("click", () => {
    inputImagem.click();
});

inputImagem.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0];

    if (!arquivo) return;

    try {
        const { resultado, nome } = await lerConteudoDoArquivo(arquivo);
        imagemPreview.src = resultado;
        nomeImagem.textContent = nome;
    } catch (erro) {
        alert(erro);
    };
});

//Exercício 4- Preview de texto

document.getElementById("texto-upload").addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0];
    const preview = document.getElementById("preview-texto");

    if (!arquivo) return;

    try {
        const conteudo = await new Promise((resolve, reject) => {
            const leitor = new FileReader();
            leitor.onload = () => resolve(leitor.result);
            leitor.onerror = () => reject("Erro ao ler o arquivo de texto");
            leitor.readAsText(arquivo);
        });

        preview.textContent = conteudo;
    } catch (erro) {
        preview.textContent = erro;
    };
});

// Exercício 5 - Ler JSON e exibir como lista

document.getElementById("json-upload").addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0];
    const lista = document.getElementById("lista-json");

    if (!arquivo) return;

    try {
        const conteudo = await new Promise((resolve, reject) => {
            const leitor = new FileReader();
            leitor.onload = () => resolve(leitor.result);
            leitor.onerror = () => reject("Erro ao ler o JSON");
            leitor.readAsText(arquivo);
        });

        const dados = JSON.parse(conteudo);
        lista.innerHTML = "";

        dados.forEach(item => {
            const li = document.createElement("li");
            li.textContent = JSON.stringify(item);
            lista.appendChild(li);
        });
    } catch (erro) {
        alert(erro);
    };
});

const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");

listaTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-tag")) {
        const tagRemovida = evento.target.parentElement;
        listaTags.removeChild(tagRemovida);
    };
});

const tagsDisponiveis = [
    "Gato",
    "Cachorro",
    "Passaro",
    "Tartaruga",
    "Peixe",
    "Porco"
];

async function verificaTagsDisponiveis(tagTexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto));
        }, 1000);
    });
};

inputTags.addEventListener("keypress", (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        const tagTexto = inputTags.value.trim();
            if (tagTexto !== "" && tagsDisponiveis.includes(tagTexto)) {
                const tagNova = document.createElement("li");
                tagNova.innerHTML = `${tagTexto} <img src="img/close.svg" class="remove-tag">`;
                listaTags.appendChild(tagNova);
                inputTags.value = "";
            } else {
                alert("Tag inválida");
            };
        };    
    });

