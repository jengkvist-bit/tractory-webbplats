---
titel: "Boka ett samtal"
sidtitel: "Kontakt: boka ett samtal — Tractory"
beskrivning: "Boka ett kostnadsfritt introsamtal på 30 minuter via video, eller skicka ett mejl till jonas@tractory.se. Jag svarar inom en arbetsdag."
delningsbild: "/bilder/Tractory-Some-4.webp"
---

<div class="kontakt-grid">
<div>

<p class="ingress">Berätta kort om din situation så hittar vi en tid. Du får en känsla för om Tractory känns rätt, och jag får en känsla för om jag kan bidra.</p>

<!-- BOKNINGSLÄNK: byt "#" nedan mot adressen till bokningssidan (t.ex. från Cal.com). -->
<a class="knapp" href="#">Boka ett introsamtal, 30 min</a>
<a class="knapp kontur" href="mailto:jonas@tractory.se?subject=F%C3%B6rfr%C3%A5gan%20via%20tractory.se&body=Hej%20Jonas%21%0A%0AOrganisation%3A%0AVad%20vill%20ni%20uppn%C3%A5%3F%0AUngef%C3%A4r%20n%C3%A4r%20vill%20ni%20komma%20ig%C3%A5ng%3F%0ATelefonnummer%2C%20om%20du%20hellre%20vill%20bli%20uppringd%3A%0A%0A">Skicka ett mejl</a>

<p class="liten">Introsamtalet sker via video och kostar ingenting. Du väljer själv en tid som passar i min kalender.</p>

## Så går det till

<ol class="steg">
<li><strong>Du väljer en tid</strong>och svarar på två korta frågor om vad det gäller.</li>
<li><strong>Vi pratar i 30 minuter</strong>om er situation och vad ni vill uppnå.</li>
<li><strong>Du får ett förslag</strong>på upplägg inom några dagar, om det känns rätt för oss båda.</li>
</ol>

<p class="liten">Föredrar du telefon? Skriv ditt nummer i ett mejl till <strong>jonas@tractory.se</strong> så ringer jag upp. <button type="button" class="kopiera" data-kopiera="jonas@tractory.se">Kopiera adressen</button></p>

</div>
<div>

<img src="/bilder/20170831_portratt_ONE_DAY16827.webp" alt="Jonas Engkvist" width="640" height="800">
<p class="bildtext">Jonas Engkvist, tjänstedesigner.<br>Svarar på mejl inom en arbetsdag.</p>

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
