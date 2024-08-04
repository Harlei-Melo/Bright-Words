document.addEventListener('DOMContentLoaded', function() {
  let index = 0,
      interval = 1000;

  const rand = (min, max) => 
    Math.floor(Math.random() * (max - min + 2)) + min;

  const animate = star => {
    star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
    star.style.setProperty("--star-top", `${rand(10, 45)}%`); 

    star.style.animation = "none";
    star.offsetHeight;
    star.style.animation = "";

    setTimeout(() => {
      animate(star);
    }, 1000 + rand(0, 500)); // Adicione um atraso aleatório entre 0 e 500ms
  }

  for(const star of document.getElementsByClassName("sparkle-effect")) {
    setTimeout(() => {
      animate(star);
    }, index++ * (interval / 4))
  }

  const quotes = [
    { text: "      Sofremos mais na imaginação do que na realidade.", author: "Séneca" }, 
    { text: "Quando você olha muito tempo para um abismo, o abismo olha para você.", author:"Friedrich Nietzsche" },
    { text: "Daria tudo que sei pela metade do que ignoro.", author:"René Descartes" }, 
    { text: "Seja a mudança que você deseja ver no mundo.", author:"Mahatma Gandhi" },
    { text: "Não é o que dizemos ou pensamos que nos define, mas o que fazemos.", author:"Jane Austen" }, 
    { text: "   A felicidade da sua vida depende da qualidade dos seus pensamentos.", author:"Marco Aurélio" },
    { text: "O preço da liberdade é a eterna vigilância.", author:"Thomas Jefferson" }, 
    { text: "     Nada é permanente, exceto a mudança.", author:"Heráclito" }, 
    { text: "Acordar limpo e sóbrio é o primeiro presente de cada dia.", author:"I am Sober" }, 
    { text: "    A arte não é sobre replicar o mundo, mas sobre interpretá-lo e acrescentar a ele como você o enxerga.", author:"Kyomii" }, 
    { text: " Não são as coisas que nos perturbam, mas a nossa interpretação das coisas.", author:"Epicteto" }, 
    { text: "   A beleza das coisas existe na mente que as contempla.", author:"David Hume" }, 
    { text: "  Se você pode sonhar, você pode fazer", author:"Walt Disney" },
    { text: "A arte é para consolar aqueles que estão quebrados pela vida.", author:"Vincent Van Gogh" }, 
    { text: " Seja como a rocha que as ondas não param de bater; ela permanece firme e, ao redor dela, as águas acabam se acalmando.", author:"Marco Aurélio" }, 
  ];

  let availableQuotes = [...quotes]; // Clonar a lista de frases

  function changeQuote() {
    const quoteBox = document.getElementById('quote-box');

    // Reabastecer a lista de frases não exibidas quando estiver vazia
    if (availableQuotes.length === 0) {
      availableQuotes = [...quotes];
    }

    const randomIndex = Math.floor(Math.random() * availableQuotes.length);
    const newQuote = availableQuotes.splice(randomIndex, 1)[0]; // Remover e obter a frase selecionada
    const quoteText = newQuote.text;
  
    // Divida o texto da citação em duas partes
    const effectLength = 23;
    const firstPart = quoteText.slice(0, effectLength);
    const secondPart = quoteText.slice(effectLength);
  
    quoteBox.style.opacity = 0;
  
    setTimeout(() => {
      // Aplique o efeito de brilho apenas na segunda parte do texto
      quoteBox.innerHTML = `<h1 id="quote-box">
      ${firstPart}
        <span class="sparkle">
          <span class="sparkle-effect">
            <img src="svg/shine.svg" onload="SVGInject(this)">
          </span>
          <span class="sparkle-effect">
            <img src="svg/shine.svg" onload="SVGInject(this)">
          </span>
          <span class="sparkle-effect">
            <img src="svg/shine.svg" onload="SVGInject(this)">
          </span>
          <span></span><span class="sparkle-text">${secondPart}</span><br>
          <br>
        </span>
        <br>  – ${newQuote.author}</h1>`;
  
      // Reaplique a animação aos novos elementos sparkle-effect
      for (const star of quoteBox.getElementsByClassName("sparkle-effect")) {
        setTimeout(() => {
          animate(star);
        }, rand(0, 500)); // Adicione um atraso aleatório entre 0 e 500ms
      }
  
      quoteBox.style.opacity = 1;
    }, 500);
  }

  function copyQuote() {
    const quoteBox = document.getElementById('quote-box');
    const textToCopy = quoteBox.innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
      showToast("Frase copiada!");
    }).catch(err => {
      console.error("Erro ao copiar a frase: ", err);
    });
  }

  function showToast(message) {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-check-circle"></i> ${message}`;
    toastContainer.appendChild(toast);

    // Remova o toast após a animação
    setTimeout(() => {
      toast.remove();
    }, 2000);
  }

  document.getElementById('change-quote').addEventListener('click', changeQuote);
  document.getElementById('copy-quote').addEventListener('click', copyQuote);
});
