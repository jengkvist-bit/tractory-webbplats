---
titel: "Boka ett samtal"
sidtitel: "Kontakt: boka ett samtal — Tractory"
beskrivning: "Berätta kort om din situation i ett mejl till jonas@tractory.se, så hittar vi en tid för ett samtal. Jag svarar inom en arbetsdag."
delningsbild: "/bilder/Tractory-Some-4.webp"
---

<div class="kontakt-grid">
<div>

<p class="ingress">Berätta kort om din situation så hittar vi en tid för ett samtal. Du får en känsla för om Tractory känns rätt, och jag får en känsla för om jag kan bidra.</p>

<p class="adress">jonas@tractory.se</p>

<a class="knapp" href="mailto:jonas@tractory.se?subject=F%C3%B6rfr%C3%A5gan%20via%20tractory.se&body=Hej%20Jonas%21%0A%0AOrganisation%3A%0AVad%20vill%20ni%20uppn%C3%A5%3F%0AUngef%C3%A4r%20n%C3%A4r%20vill%20ni%20komma%20ig%C3%A5ng%3F%0ATelefonnummer%2C%20om%20du%20hellre%20vill%20bli%20uppringd%3A%0A%0A">Skicka ett mejl</a>
<button type="button" class="knapp kontur kopiera" data-kopiera="jonas@tractory.se">Kopiera adressen</button>

<p class="liten">Jag svarar inom en arbetsdag. Samtalet kostar ingenting.</p>

## Så går det till

<ol class="steg">
<li><strong>Du skickar några rader</strong>om vilken organisation du kommer från och vad ni vill uppnå.</li>
<li><strong>Jag svarar inom en arbetsdag</strong>och föreslår några tider för ett samtal på 30 minuter.</li>
<li><strong>Vi pratar</strong>via video eller telefon. Skriv ditt nummer i mejlet om du hellre vill att jag ringer upp.</li>
</ol>

</div>
<div>

<img src="/bilder/20170831_portratt_ONE_DAY16827.webp" alt="Jonas Engkvist" width="640" height="800">
<p class="bildtext">Jonas Engkvist, tjänstedesigner.<br>Svarar inom en arbetsdag.</p>

</div>
</div>

<script>
  // Knappen "Kopiera adressen": lägger mejladressen i urklipp och visar en kort bekräftelse.
  document.querySelectorAll('.kopiera').forEach((knapp) => {
    knapp.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(knapp.dataset.kopiera);
        knapp.textContent = 'Kopierad!';
        setTimeout(() => (knapp.textContent = 'Kopiera adressen'), 2000);
      } catch {}
    });
  });
</script>
