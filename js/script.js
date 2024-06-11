document.addEventListener('DOMContentLoaded', function() {
  let index = 0,
      interval = 1000;

  const rand = (min, max) => 
    Math.floor(Math.random() * (max - min + 1)) + min;

  const animate = star => {
    star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
    star.style.setProperty("--star-top", `${rand(-40, 80)}%`);

    star.style.animation = "none";
    star.offsetHeight;
    star.style.animation = "";

    setTimeout(() => {
      animate(star);
    }, 1000);
  }

  for(const star of document.getElementsByClassName("sparkle-effect")) {
    setTimeout(() => {
      animate(star);
    }, index++ * (interval / 3))
  }

  const quotes = [
    { text: "A única coisa que sei é que nada sei.", author: "Sócrates" },
    { text: "Quando você olha muito tempo para um abismo, o abismo olha para você.", author:"Friedrich Nietzsche" },
    { text: "Daria tudo que sei pela metade do que ignoro.", author:"René Descartes" },
    { text: "Dedica-se a esperar o futuro apenas quem não sabe viver o presente.", author:"Sêneca" },
  ];

  function changeQuote() {
    const quoteBox = document.getElementById('quote-box');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const newQuote = quotes[randomIndex];
    const quoteText = newQuote.text;
  
    // Divida o texto da citação em duas partes aleatórias
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
        animate(star);
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
    }, 3000);
  }

  document.getElementById('change-quote').addEventListener('click', changeQuote);
  document.getElementById('copy-quote').addEventListener('click', copyQuote);
});
