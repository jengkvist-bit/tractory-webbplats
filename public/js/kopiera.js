// Knappen "Kopiera adressen" på kontaktsidan: lägger mejladressen i urklipp och visar en kort bekräftelse.
// Om kopieringen inte går visas adressen i stället, så att man kan skriva av den.
// Ligger i en egen fil (inte direkt i sidan) så att säkerhetsregeln i Bas.astro kan förbjuda all inbäddad kod.
document.querySelectorAll('.kopiera').forEach((knapp) => {
  const adress = knapp.dataset.kopiera;
  const status = document.querySelector('.kopiera-status');
  knapp.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(adress);
      knapp.textContent = 'Kopierad!';
      if (status) status.textContent = adress + ' är kopierad.';
    } catch {
      knapp.textContent = adress;
      if (status) status.textContent = 'Adressen är ' + adress;
      return;
    }
    setTimeout(() => (knapp.textContent = 'Kopiera adressen'), 2500);
  });
});
