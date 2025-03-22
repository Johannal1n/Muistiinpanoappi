
Käynnistys:

npm install
npm run dev


Riippuvuudet:

npm install zustand
npm install -D tailwindcss@3 postcss autoprefixer (tailwind.config.js -tiedoston konfaus)
npm install react-icons https://react-icons.github.io/react-icons/


Ohjelman toiminta:

Koodipohjana olen käyttänyt Frontend-luennolla käytyä, sekä Tekstianalysaattoria olen tehnyt luentojen mukana.

Luentomuistiinpanoappi avautuu Etusivulle, jossa kerrotaan appin toiminnasta ja mitä appilla voi tehdä, sekä sen tarkoitus.

Etusivulla on myös otsikko ja linkityksellä toimivat "napit" (ei buttonilla, link+tyylit) appin eri toimintoihin.

Lisää kurssi -näkymässä voit lisätä kurssin, esim Frontend ja "Tallentaa", jolloin tulee info, että ko kurssi on tallennettu ja tämän ID (ottaa järjesteyksessä huomioiden jo aiemmat 4, aloitus on nollasta ja toimii juoksevana, jos kursseja lisätään useampi (CourseForm.jsx)).

Kun kurssi on lisätty, voit valita kurssin ja lisätä juuri tälle identifioidulle kurssille muistiinpanoja ja tallentaa. Voit myös aloittaa uuden session suoraan näkymästä tai lisätä samalla kurssille uuden muistiinpanon. Jos valitsee uuden session, niin tulee valita myös kurssi ali alustus toimii tähän. Muutoin tallentaa jo aiemmin valitulle kurssille (NoteForm.jsx). Eli uusi sessio tulee valita oikealta ylhäältä.

Selaa kurssien muistiinpanoja- kohdassa tulee automaattisesti kaikki kurssit, joissa muistiinpanoja, sorttauksella voit valita identifioidun kurssin ja vain tähän liittyvät muistiinpanot. Aina ovat kurssit ja muistiinpanot stores-kansion alta määritellyistä ja tehtäväohjeessa mainitut linkitykset. Muistiinpanoja voi poistaa roskakori-ikonia painamalla (NoteListView.jsx).

Tiedot tallennetaan sovelluksessa local storageen, erillistä tietokantaa ei ole. Sovellus palauttaa sovellukseen storesissa linkkien takaa määritellyt kurssit ja muistiinpanot.

Tilanhallinnassa käytetään Zustand-tilanhallintakirjastoa (stores-kansio). Eli Zustand käyttää Reactin useState-hookin ominaisuuksia ja mahdollistaa myös tilan jakamisen useiden komponenttien kesken ilman, että komponenttien täytyy propseilla siirtää tilaa.

Tekoälyn käyttö: Ongelmatilanteissa on olen myös kysynyt ehdotusta ongelman ratkaisuun, jotta osaan etsiä oikeaa asiaa, tähän olen käyttänyt joko V0 tai ChatGpt, joiden vastauksista seulottu ja vallittu toimiva ratkaisu. Toiminnallisuuksia ja mallikoodena react.dev-sivultolta. Havaittu, että tekoälyllä oli ratkaisuvaihtoehdoissa oli aika laaja skaala, kaikki eivät todellakaan toimineet koodipohjassani. Asioita, joita jouduin erityisesti tekoälyn avulla selvittämään oli mm. storesista löytyvät tiedot. Näistä jouduin etsimään enemmän ohjausta, että saan näkymän toimimaan tehtävän vaativalla tavalla. Tätä ei käyty suoraan luennoilla, niin vaati selvittelyä. Session Locked vaati myös enemmän selvittelyä ja tekoälyltä kysyin linkkiehdotuksia, joista etsin lisää tietoa.

Tyylitysehdotuksia jonkin verran kysyin myös tekoälyltä, mutta näitä meni aikalailla kokeilemalla ja testaamalla ja vähän muuttelemalla niitä, joista tehtiin jo Tekstianalysaattoriin. Tämä toki myös näkyy Luentomuistiinpanoappissa, jossa paljon samaa tyylittelyä luennoilla tehtyöhin. Pohdin, että tyylit olisi voinut koota yhteenä tiedostoon ja jakaa sieltä, koska pyrin yhteneväisyyden vuoksi käyttämään samankaltaisia tyylejä, mutta en lähtenyt tätä enää viimeistelyvaiheessa muokkaamaan.

-Johanna Lintula-

Käytetyt lähteet:
Juhon Frontend luentomateriaalit
Juhon Versiohallinta luentomateriaalit
https://github.com/pmndrs/zustand
https://react.dev/reference/react-dom/components/form
https://react.dev/reference/react/useCallback#skipping-re-rendering-with-usecallback-and-memo
https://react.dev/reference/react/useEffect
https://react.dev/reference/react/useState
https://www.digitalocean.com/community/tutorials/4-uses-of-javascripts-arraymap-you-should-know
