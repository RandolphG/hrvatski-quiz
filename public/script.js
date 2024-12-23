let questions = [
  {
    numb: 1,
    question: "Nositelj zakonodavne vlasti u Republici Hrvatskoj je:",
    answer: "Hrvatski sabor",
    options: [
      "Hrvatski sabor",
      "Predsjednik Republike Hrvatske",
      "Vlada Republike Hrvatske",
      "Ustavni sud Republike Hrvatske",
    ],
  },
  {
    numb: 2,
    question: "Granice Republike Hrvatske mogu se mijenjati samo odlukom:",
    answer: "Hrvatskoga sabora",
    options: [
      "Vlade Republike Hrvatske",
      "Predsjednika Republike Hrvatske",
      "Hrvatskoga sabora",
      "Ustavnog suda Republike Hrvatske",
    ],
  },
  {
    numb: 3,
    question: "Dana 5. kolovoza u Republici Hrvatskoj je blagdan:",
    answer: "Dan pobjede i domovinske zahvalnosti i Dan hrvatskih branitelja",
    options: [
      "Praznik rada",
      "Dan pobjede i domovinske zahvalnosti i Dan hrvatskih branitelja",
      "Svi Sveti",
      "Dan antifašističke borbe",
    ],
  },
  {
    numb: 4,
    question: "Himna Republike Hrvatske je:",
    answer: "Lijepa naša domovino",
    options: [
      "Lijepa naša domovino",
      "Himna slobode",
      "Oj Hrvatska mati",
      "U boj, u boj",
    ],
  },
  {
    numb: 5,
    question:
      "Institucija neovisna o svim tijelima državne vlasti, ustanovljena Ustavom Republike Hrvatske, a koja jamči njegovo poštivanje i primjenu, zaštitu ljudskih prava i temeljnih sloboda građana u Republici Hrvatskoj je:",
    answer: "Ustavni sud Republike Hrvatske",
    options: [
      "Ustavni sud Republike Hrvatske",
      "Hrvatski sabor",
      "Pučki pravobranitelj",
      "Vrhovni sud Republike Hrvatske",
    ],
  },
  {
    numb: 6,
    question:
      "Grad na istoku Hrvatske koji je tijekom Domovinskog rata pretrpio velika razaranja i progon hrvatskog stanovništva, a čiji je vodotoranj simbol stradanja i otpora grada:",
    answer: "Vukovar",
    options: ["Vukovar", "Osijek", "Slavonski Brod", "Đakovo"],
  },
  {
    numb: 7,
    question:
      "Povijesna građevina, najveći rimski amfiteatar na području današnje Hrvatske nalazi se u:",
    answer: "Puli",
    options: ["Puli", "Zagrebu", "Osijeku", "Zadru"],
  },
  {
    numb: 8,
    question:
      "Druga najduža europska rijeka koja protječe kroz istočni dio Republike Hrvatske zove se:",
    answer: "Dunav",
    options: ["Dunav", "Sava", "Drava", "Kupa"],
  },
  {
    numb: 9,
    question:
      "Najstariji i najveći nacionalni park Republike Hrvatske kojeg čine 16 međusobno povezanih jezera, 1979. godine upisan na UNESCO-ov Popis svjetske baštine je:",
    answer: "Plitvička jezera",
    options: ["Plitvička jezera", "Kornati", "Krka", "Risnjak"],
  },
  {
    numb: 10,
    question:
      "Brončanu skulpturu »Zdenac života« koja se nalazi u Zagrebu, ispred Hrvatskog narodnog kazališta, izradio je poznati hrvatski kipar:",
    answer: "Ivan Meštrović",
    options: [
      "Antun Augustinčić",
      "Frano Kršinić",
      "Ivan Meštrović",
      "Robert Frangeš",
    ],
  },
  {
    numb: 11,
    question:
      "Jedna od znamenitosti Zagreba, poznata po krovu s motivima hrvatskog povijesnog grba, je:",
    answer: "Crkva sv. Marka",
    options: [
      "Crkva sv. Marka",
      "Stari grad Zrinskih",
      "Velika Onofrijeva česma",
      "Tvrđava Nehaj",
    ],
  },
  {
    numb: 12,
    question:
      "Osnivač Hrvatske akademije znanosti i umjetnosti i inicijator podizanja đakovačke katedrale bio je đakovačko-srijemski biskup:",
    answer: "Josip Juraj Strossmayer",
    options: [
      "Juraj Dobrila",
      "Josip Jelačić",
      "Josip Juraj Strossmayer",
      "Juraj Jezerinac",
    ],
  },
  {
    numb: 13,
    question:
      "Hrvatski grad kroz koji prolaze četiri rijeke (Korana, Kupa, Mrežnica i Dobra) zove se:",
    answer: "Karlovac",
    options: ["Karlovac", "Sisak", "Varaždin", "Požega"],
  },
  {
    numb: 14,
    question:
      "Poznati hrvatski matematičar, astronom, geodet i fizičar po kome je nazvan Institut koji predstavlja stožernu znanstvenu ustanovu u Republici Hrvatskoj u području prirodnih i biomedicinskih znanosti te istraživanju mora i okoliša je:",
    answer: "Ruđer Bošković",
    options: [
      "Juraj Haulik",
      "Ruđer Bošković",
      "Lavoslav Ružička",
      "Ivan Vučetić",
    ],
  },
  {
    numb: 15,
    question:
      "Na svjetskom prvenstvu u nogometu održanom u Rusiji 2018. godine reprezentacija Republike Hrvatske je osvojila:",
    answer: "Drugo mjesto",
    options: ["Prvo mjesto", "Drugo mjesto", "Treće mjesto", "Četvrto mjesto"],
  },
  {
    numb: 16,
    question: "Nositelj izvršne vlasti u Republici Hrvatskoj je:",
    answer: "Vlada Republike Hrvatske",
    options: [
      "Vlada Republike Hrvatske",
      "Vrhovni sud Republike Hrvatske",
      "Hrvatski sabor",
      "Pučki pravobranitelj",
    ],
  },
  {
    numb: 17,
    question: "Datum pristupanja Republike Hrvatske Europskoj uniji je:",
    answer: "1. srpnja 2013.",
    options: [
      "1. srpnja 2013.",
      "1. svibnja 2004.",
      "25. lipnja 1991.",
      "9. svibnja 1950.",
    ],
  },
  {
    numb: 18,
    question:
      "Izumitelj daktiloskopije, sustava identifikacije pomoću otisaka prstiju, rođen na otoku Hvaru, a umro u Argentini, je:",
    answer: "Ivan Vučetić",
    options: [
      "Andrija Mohorovičić",
      "Ivan Vučetić",
      "Ruđer Bošković",
      "Đuro Deželić",
    ],
  },
  {
    numb: 19,
    question:
      "U Republici Hrvatskoj državna je vlast ustrojena na načelu diobe vlasti na:",
    answer: "zakonodavnu, izvršnu i sudbenu",
    options: [
      "zakonodavnu, izvršnu i sudbenu",
      "izvršnu i sudbenu",
      "zakonodavnu i sudbenu",
      "zakonodavnu i izvršnu",
    ],
  },
  {
    numb: 20,
    question:
      "Osim Grada Zagreba, kao posebne i jedinstvene, teritorijalne i upravne cjeline, Republika Hrvatska ima 20 jedinica područne (regionalne) samouprave, koje se zovu:",
    answer: "županije",
    options: ["regije", "kotarevi", "županije", "provincije"],
  },
  {
    numb: 21,
    question:
      "Najpoznatija vrsta ugroženih ptica, koja se hrani strvinama, a obitava na sjevernojadranskim otocima (pretežno na Cresu) je:",
    answer: "bjeloglavi sup",
    options: ["galeb", "orao štekavac", "roda", "bjeloglavi sup"],
  },
  {
    numb: 22,
    question:
      "Jedan od najpoznatijih dvoraca u sjevernom dijelu Republike Hrvatske je:",
    answer: "Trakošćan",
    options: ["Eltz", "Trakošćan", "Trsat", "Kamerlengo"],
  },
  {
    numb: 23,
    question:
      "Kako se zove rijeka koja je, prema ukupnoj duljini vodotoka, najdulja rijeka u Republici Hrvatskoj (562 km)?",
    answer: "Sava",
    options: ["Sava", "Drava", "Kupa", "Dunav"],
  },
  {
    numb: 24,
    question:
      "Kako se zove najgušći jadranski arhipelag, čiji je jedan dio proglašen nacionalnim parkom 1980. godine?",
    answer: "Kornati",
    options: ["Kornati", "Brijuni", "Mljet", "Krka"],
  },
  {
    numb: 25,
    question:
      "Kojeg se književnika, autora epa »Judita«, naziva ocem hrvatske književnosti?",
    answer: "Marko Marulić",
    options: [
      "Marko Marulić",
      "Ivan Gundulić",
      "Petar Zoranić",
      "Antun Gustav Matoš",
    ],
  },
  {
    numb: 26,
    question:
      "Vođa hrvatskog narodnog preporoda pokrenuo je na hrvatskom jeziku 1835. godine »Novine horvatzke«. Njegovo ime je:",
    answer: "Ljudevit Gaj",
    options: [
      "August Šenoa",
      "Dimitrije Demeter",
      "Ljudevit Gaj",
      "Stanko Vraz",
    ],
  },
  {
    numb: 27,
    question:
      "»Notturno« i »Utjeha kose« pjesme su najpoznatijeg književnika hrvatske moderne:",
    answer: "Antuna Gustava Matoša",
    options: [
      "Petra Preradovića",
      "Hanibala Lucića",
      "Antuna Gustava Matoša",
      "Dobriše Cesarića",
    ],
  },
  {
    numb: 28,
    question:
      "Katedrala sv. Jakova, 2000. godine upisana na UNESCO-ov Popis svjetske baštine, nalazi se u:",
    answer: "Šibeniku",
    options: ["Splitu", "Zagrebu", "Puli", "Šibeniku"],
  },
  {
    numb: 29,
    question: "Središnja banka Republike Hrvatske je:",
    answer: "Hrvatska narodna banka",
    options: [
      "Hrvatska banka za obnovu i razvoj",
      "Hrvatska gospodarska banka",
      "Hrvatska narodna banka",
      "Hrvatska poštanska banka",
    ],
  },
  {
    numb: 30,
    question:
      "Znamenito turističko odredište na jugu Hrvatske, okruženo gradskim zidinama, 1979. godine upisano na UNESCO-ov Popis svjetske baštine je:",
    answer: "Dubrovnik",
    options: ["Dubrovnik", "Split", "Šibenik", "Pula"],
  },
  {
    numb: 31,
    question:
      "Jedan od najznačajnijih Hrvata svih vremena, rođen u Šibeniku, leksikograf i izumitelj (padobran, mostovi, mlinovi) je:",
    answer: "Faust Vrančić",
    options: [
      "Faust Vrančić",
      "Ruđer Bošković",
      "Ivan Vučetić",
      "Nikola Tesla",
    ],
  },
  {
    numb: 32,
    question: "Hrvatski državljani stječu opće i jednako biračko pravo:",
    answer: "s navršenih 18 godina života",
    options: [
      "s navršenih 16 godina života",
      "muškarci s navršenih 16, a žene s navršenih 18 godina života",
      "s navršenih 18 godina života",
      "s navršenom 21 godinom života",
    ],
  },
  {
    numb: 33,
    question: "Vrhovni zapovjednik oružanih snaga Republike Hrvatske je:",
    answer: "Predsjednik Republike",
    options: [
      "Predsjednik Sabora",
      "Predsjednik Vlade",
      "Predsjednik Republike",
      "Predsjednik Ustavnog suda",
    ],
  },
  {
    numb: 34,
    question:
      "Hrvatski velikaši pogubljeni u Bečkom Novom Mjestu 1671. godine, nakon sloma neuspjele urote usmjerene protiv habsburškog apsolutizma:",
    answer: "Petar IV. Zrinski i Fran Krsto Frankopan",
    options: [
      "Antun i Stjepan Radić",
      "Petar Berislavić i Petar Keglević",
      "Matija Gubec i Ilija Gregorić",
      "Petar IV. Zrinski i Fran Krsto Frankopan",
    ],
  },
  {
    numb: 35,
    question:
      "Papa koji je tijekom svog pontifikata tri puta posjetio Republiku Hrvatsku bio je:",
    answer: "Ivan Pavao II.",
    options: ["Ivan Pavao II.", "Benedikt XVI.", "Franjo", "Pio XII."],
  },
  {
    numb: 36,
    question: "Slava Raškaj bila je poznata hrvatska:",
    answer: "slikarica",
    options: ["književnica", "balerina", "slikarica", "liječnica"],
  },
  {
    numb: 37,
    question:
      "Poznati hrvatski političar i vođa hrvatskog seljaštva, umro od posljedica atentata 1928. godine u beogradskoj skupštini, bio je:",
    answer: "Stjepan Radić",
    options: [
      "Stjepan Radić",
      "Ivan Mažuranić",
      "Frano Supilo",
      "Milan Šufflay",
    ],
  },
  {
    numb: 38,
    question: "»Morske orgulje« jedna su od znamenitosti grada:",
    answer: "Zadra",
    options: ["Senja", "Makarske", "Zadra", "Trogira"],
  },
  {
    numb: 39,
    question: "Marija Jurić Zagorka bila je:",
    answer: "prva profesionalna novinarka i poznata hrvatska književnica",
    options: [
      "prva profesionalna novinarka i poznata hrvatska književnica",
      "operna pjevačica",
      "glumica",
      "skladateljica",
    ],
  },
  {
    numb: 40,
    question:
      "Jedan od najznačajnijih hrvatskih izumitelja s početka 20. stoljeća, tvorac mehaničke olovke i nalivpera s krutom tintom je:",
    answer: "Eduard Slavoljub Penkala",
    options: [
      "Ferdinand Budicki",
      "Dragutin Novak",
      "Vladimir Prelog",
      "Eduard Slavoljub Penkala",
    ],
  },
  {
    numb: 41,
    question: "Poznati park prirode u Baranji je:",
    answer: "Kopački rit",
    options: ["Vransko jezero", "Kopački rit", "Paklenica", "Risnjak"],
  },
  {
    numb: 42,
    question:
      "Književnost baroka u Republici Hrvatskoj obilježio je svojim epovima Ivan Gundulić. Njegova poznata djela su:",
    answer: "»Osman« i »Dubravka«",
    options: [
      "»Kiklop« i »Mirisi, zlato i tamjan«",
      "»Zlatarevo zlato« i »Posljednji Stipančići«",
      "»Smrt Smail-age Čengića« i »Ribanje i ribarsko prigovaranje«",
      "»Osman« i »Dubravka«",
    ],
  },
  {
    numb: 43,
    question:
      "Jedan od najstarijih spomenika hrvatske pismenosti iz razdoblja oko 1100. godine, Baščanska ploča, sačuvana u Baškoj na otoku Krku pisana je:",
    answer: "glagoljicom",
    options: ["ćirilicom", "glagoljicom", "latinicom", "goticom"],
  },
  {
    numb: 44,
    question:
      "Na Olimpijskim igrama 1996. i 2004. godine Republika Hrvatska osvojila je zlatnu medalju i bila svjetski prvak 2003. godine u:",
    answer: "rukometu",
    options: ["nogometu", "vaterpolu", "rukometu", "odbojci"],
  },
  {
    numb: 45,
    question: "S kojom državom Republika Hrvatska ima najdužu kopnenu granicu?",
    answer: "Bosna i Hercegovina",
    options: ["Bosna i Hercegovina", "Slovenija", "Srbija", "Mađarska"],
  },
  {
    numb: 46,
    question: "Zastupnici u Hrvatskom saboru biraju se na vrijeme od:",
    answer: "4 godine",
    options: ["2 godine", "3 godine", "4 godine", "5 godina"],
  },
  {
    numb: 47,
    question: "U Republici Hrvatskoj smrtna kazna:",
    answer: "ne postoji",
    options: [
      "ne postoji",
      "postoji, ali se ne primjenjuje",
      "postoji samo za ratni zločin i zločin protiv čovječnosti",
      "postoji samo za djelo veleizdaje, u situaciji neposredne ratne opasnosti",
    ],
  },
  {
    numb: 48,
    question:
      "Opunomoćenik Hrvatskog sabora koji štiti ustavna i zakonska prava građana u postupku pred državnom upravom i tijelima – Ombudsman, na hrvatskom jeziku naziva se:",
    answer: "Pučki pravobranitelj",
    options: [
      "Pučki pravobranitelj",
      "Zastupnik građana",
      "Narodni zastupnik",
      "Građanski odvjetnik",
    ],
  },
  {
    numb: 49,
    question: "Dan antifašističke borbe u Republici Hrvatskoj je dan:",
    answer: "22. lipnja",
    options: ["8. ožujka", "9. svibnja", "22. lipnja", "4. srpnja"],
  },
  {
    numb: 50,
    question:
      "Početkom 4. stoljeća rimski car Dioklecijan izgradio je svoju palaču na području Dalmacije. Kako se danas zove grad čija je povijesna jezgra Dioklecijanova palača?",
    answer: "Split",
    options: ["Split", "Dubrovnik", "Zadar", "Trogir"],
  },
  {
    numb: 51,
    question:
      "Zagrebački nadbiskup i kardinal koji je bio proganjan i osuđen u političkom procesu nakon Drugog svjetskog rata, zvao se:",
    answer: "Alojzije Stepinac",
    options: [
      "Franjo Rački",
      "Alojzije Stepinac",
      "Maksimilijan Vrhovac",
      "Franjo Kuharić",
    ],
  },
  {
    numb: 52,
    question:
      "Godine 1993. Hrvatska vojska izvela je munjevitu vojnu akciju kojom je, kopnenim putem, povezala sjever i jug Hrvatske, koji je agresor okupacijom prostora razdvojio. To je bila akcija:",
    answer: "Maslenica",
    options: ["Oluja", "Bljesak", "Maslenica", "Maestral"],
  },
  {
    numb: 53,
    question:
      "Nacionalni park nedaleko Šibenika, poznat po prekrasnim sedrenim slapovima (Roški slap, Skradinski buk) je:",
    answer: "Krka",
    options: ["Cetina", "Krka", "Rastoke", "Lonjsko polje"],
  },
  {
    numb: 54,
    question: "Ivana Brlić Mažuranić bila je poznata hrvatska:",
    answer: "književnica",
    options: ["liječnica", "glumica", "slikarica", "književnica"],
  },
  {
    numb: 55,
    question: "Skladatelj prve hrvatske opere »Ljubav i zloba« je:",
    answer: "Vatroslav Lisinski",
    options: [
      "Ivan Zajc",
      "Vatroslav Lisinski",
      "Jakov Gotovac",
      "Josip Runjanin",
    ],
  },
  {
    numb: 56,
    question: "Prvi predsjednik Republike Hrvatske bio je:",
    answer: "Franjo Tuđman",
    options: [
      "Stjepan Radić",
      "Franjo Tuđman",
      "Ante Pavelić",
      "Ivo Josipović",
    ],
  },
  {
    numb: 57,
    question:
      "Renesansni dubrovački dramski pisac i komediograf, autor poznatih djela: »Dundo Maroje«, »Skup« i »Novela od Stanca«, zvao se:",
    answer: "Marin Držić",
    options: ["Marin Držić", "Ivan Gundulić", "Marko Marulić", "Petar Zoranić"],
  },
  {
    numb: 58,
    question:
      "Koji je hrvatski otok poznat po čipki, siru, soli i najstarijim stablima maslina?",
    answer: "Pag",
    options: ["Krk", "Pag", "Hvar", "Brač"],
  },
  {
    numb: 59,
    question:
      "Navedite ime jednog od najpoznatijih i najboljih hrvatskih košarkaša, koji je igrao i u NBA ligi, rođenog u Šibeniku, čija je skulptura postavljena u parku Olimpijskog muzeja u Lausanni:",
    answer: "Dražen Petrović",
    options: ["Toni Kukoč", "Dino Rađa", "Dražen Petrović", "Stojko Vranković"],
  },
  {
    numb: 60,
    question:
      "Zbog datuma proglašenja, Ustav Republike Hrvatske ima i popularni naziv:",
    answer: "božićni",
    options: ["proljetni", "ljetni", "božićni", "jesenski"],
  },
  {
    numb: 61,
    question:
      "Bojni ples s mačevima koji se od 15. stoljeća tradicionalno održava na Korčuli zove se:",
    answer: "Moreska",
    options: ["Kolo", "Moreska", "Tanac", "Dubrovnik Waltz"],
  },
  {
    numb: 62,
    question:
      "Opišite zastavu Republike Hrvatske: Sastoji se od tri boje koje su položene vodoravno i to ovim redom (odozgo prema dolje):",
    answer: "CRVENA, BIJELA i PLAVA a u sredini zastave nalazi se GRB.",
    options: [
      "CRVENA, BIJELA i PLAVA a u sredini zastave nalazi se GRB.",
      "BIJELA, CRVENA i PLAVA a u sredini zastave nalazi se GRB.",
      "PLAVA, BIJELA i CRVENA a u sredini zastave nalazi se GRB.",
      "CRVENA, PLAVA i BIJELA a u sredini zastave nalazi se GRB.",
    ],
  },
  {
    numb: 63,
    question: "Koji hrvatski znanstvenik je izumio izmjeničnu struju?",
    answer: "Nikola Tesla",
    options: [
      "Ruđer Bošković",
      "Nikola Tesla",
      "Ivan Meštrović",
      "Andrija Mohorovičić",
    ],
  },
  {
    numb: 64,
    question:
      "Kako se zove najpoznatiji nacionalni park u Hrvatskoj poznat po slapovima?",
    answer: "Plitvička jezera",
    options: ["Krka", "Plitvička jezera", "Paklenica", "Kornati"],
  },
  {
    numb: 65,
    question: "Koji grad u Hrvatskoj nazivaju 'Biserom Jadrana'?",
    answer: "Dubrovnik",
    options: ["Split", "Dubrovnik", "Zadar", "Rijeka"],
  },
  {
    numb: 66,
    question:
      "Grad u sjeverozapadnoj Hrvatskoj, poznat kao barokna prijestolnica Hrvatske, čije je groblje dragulj parkovne arhitekture je:",
    answer: "Varaždin",
    options: ["Varaždin", "Čakovec", "Krapina", "Zagreb"],
  },
  {
    numb: 67,
    question: "Predsjednik Republike Hrvatske bira se na vrijeme od:",
    answer: "5 godina",
    options: ["5 godina", "4 godine", "6 godina", "7 godina"],
  },
  {
    numb: 68,
    question: "Najviša planina u Hrvatskoj, s najvišim vrhom od 1.831 m, je:",
    answer: "Dinara",
    options: ["Dinara", "Biokovo", "Velebit", "Papuk"],
  },
  {
    numb: 69,
    question:
      "Svjetski afirmirani slikar, koji je studirao u Parizu, a slikao je alegorijske i povijesne kompozicije i portrete te je izradio svečani zastor Hrvatskog narodnog kazališta u Zagrebu »Hrvatski narodni preporod«, zvao se:",
    answer: "Vlaho Bukovac",
    options: [
      "Vlaho Bukovac",
      "Ivan Meštrović",
      "Oton Iveković",
      "Josip Račić",
    ],
  },
  {
    numb: 70,
    question:
      "»Tko pjeva zlo ne misli«, antologijsku »ljubavnu komediju s pjevanjem«, na temelju »Dnevnika malog Perice« Vjekoslava Majera, režirao je:",
    answer: "Krešo Golik",
    options: ["Krešo Golik", "Branko Bauer", "Zoran Tadić", "Antun Vrdoljak"],
  },
  {
    numb: 71,
    question:
      "Vođa seljačke bune 1573. godine na području današnje sjeverozapadne Hrvatske bio je:",
    answer: "Matija Gubec",
    options: ["Matija Gubec", "Ivan Gundulić", "Franjo Tahi", "Marko Marulić"],
  },
  {
    numb: 72,
    question: "U Republici Hrvatskoj u uporabi je __________ i __________.",
    answer: "HRVATSKI jezik i LATINIČNO pismo",
    options: [
      "HRVATSKI jezik i LATINIČNO pismo",
      "SRPSKI jezik i ĆIRILICA",
      "ENGLESKI jezik i LATINIČNO pismo",
      "HRVATSKI jezik i GLAGOLJICA",
    ],
  },
  {
    numb: 73,
    question:
      "Novčana jedinica u uporabi u Republici Hrvatskoj je EURO , čiji stoti dio je CENT.",
    answer: "EURO , čiji stoti dio je CENT",
    options: [
      "EURO , čiji stoti dio je CENT",
      "KUNA , čiji stoti dio je LIPA",
      "DINAR , čiji stoti dio je PARA",
      "DOLAR , čiji stoti dio je CENT",
    ],
  },
  {
    numb: 74,
    question:
      "Najpoznatija hrvatska skijašica, osvajačica 4 zlatne i 2 srebrne olimpijske medalje u alpskom skijanju, zove se:",
    answer: "Janica Kostelić",
    options: [
      "Janica Kostelić",
      "Ivica Kostelić",
      "Ana Jelušić",
      "Nika Fleiss",
    ],
  },
  {
    numb: 75,
    question:
      "Ukupno 14 otoka i otočića čine nacionalni park u Jadranskom moru, zapadno od istarske obale, bogat po raznovrsnoj flori i fauni:",
    answer: "NP Brijuni",
    options: ["NP Brijuni", "NP Kornati", "NP Mljet", "NP Krka"],
  },
  {
    numb: 76,
    question: "Hrvatski tenisač, pobjednik Wimbledona 2001. godine je:",
    answer: "Goran Ivanišević",
    options: [
      "Goran Ivanišević",
      "Marin Čilić",
      "Ivan Ljubičić",
      "Borna Ćorić",
    ],
  },
  {
    numb: 77,
    question:
      "Najznačajnija endemična biljka hrvatske flore, zakonom zaštićena, zove se velebitska:",
    answer: "Degenija",
    options: ["Degenija", "Orhideja", "Runolist", "Planinska ruža"],
  },
  {
    numb: 78,
    question:
      "Tko je izvršio oružanu agresiju na Republiku Hrvatsku 1990. godine, sukladno Deklaraciji o Domovinskom ratu?",
    answer: "Srbi, Crna Gora i JNA",
    options: [
      "Srbi, Crna Gora i JNA",
      "Italija i Austrija",
      "Mađarska i Slovenija",
      "Nijedna od navedenih",
    ],
  },
  {
    numb: 79,
    question:
      "Svjetski poznat izumitelj, fizičar i elektrotehničar rođen 1856. godine u Smiljanu kod Gospića, a umro 1943. godine u New Yorku, po kome je nazvana mjerna jedinica magnetskog polja je:",
    answer: "Nikola Tesla",
    options: [
      "Nikola Tesla",
      "Ivan Vučetić",
      "Ruđer Bošković",
      "Franjo Hanaman",
    ],
  },
  {
    numb: 80,
    question:
      "Prva hrvatska žrtva u Domovinskom ratu, hrvatski redarstvenik poginuo 1991. godine na Plitvicama zvao se:",
    answer: "Josip Jović",
    options: [
      "Josip Jović",
      "Marko Perković",
      "Ante Gotovina",
      "Mladen Markač",
    ],
  },
  {
    numb: 81,
    question:
      "Godine 1999., zbog izrazite raznolikosti krških fenomena, živog svijeta i iznimnih prirodnih ljepota na relativno malom prostoru, nacionalnim parkom proglašen je dio jedne planine. To je:",
    answer: "Sjeverni Velebit",
    options: ["Sjeverni Velebit", "Dinara", "Biokovo", "Risnjak"],
  },
  {
    numb: 82,
    question:
      "Jedan od najznačajnijih hrvatskih književnika, autor brojnih romana, ciklusa drama o Glembajevima i Balada Petrice Kerempuha, je:",
    answer: "Miroslav Krleža",
    options: ["Miroslav Krleža", "August Šenoa", "Marin Držić", "Ivo Andrić"],
  },
  {
    numb: 83,
    question:
      "Hrvatski ban, po čijem je imenu nazvan glavni trg u Gradu Zagrebu, zvao se:",
    answer: "Josip Jelačić",
    options: [
      "Josip Jelačić",
      "Petar Zrinski",
      "Ivan Mažuranić",
      "Ante Starčević",
    ],
  },
  {
    numb: 84,
    question:
      "Republika Hrvatska je članica zajednice europskih država koja se naziva:",
    answer: "Europska unija",
    options: ["Europska unija", "Schengenska zona", "Vijeće Europe", "NATO"],
  },
  {
    numb: 85,
    question:
      "Ukrasni odjevni predmet, nosi se oko vrata, koji su nosili hrvatski vojnici u Tridesetogodišnjem ratu, nakon čega se njegovo korištenje proširilo većim dijelom Europe, je:",
    answer: "Kravata",
    options: ["Kravata", "Šal", "Marama", "Ovratnik"],
  },
  {
    numb: 86,
    question: "Eufrazijeva bazilika poznata je znamenitost grada u Istri:",
    answer: "Poreč",
    options: ["Poreč", "Rovinj", "Pula", "Umag"],
  },
  {
    numb: 87,
    question: "Vjekoslav Šutej bio je poznati hrvatski:",
    answer: "Dirigent",
    options: ["Dirigent", "Skladatelj", "Glazbenik", "Kantautor"],
  },
  {
    numb: 88,
    question:
      "Tekst himne Republike Hrvatske »Lijepa naša domovino« napisao je ANTUN, a uglazbio JOSIP RUNJANIN.",
    answer: "Antun Mihanović, Josip Runjanin",
    options: [
      "Antun Mihanović, Josip Runjanin",
      "Ivan Zajc, Vatroslav Lisinski",
      "Petar Preradović, Ivan Gundulić",
      "Stanko Vraz, Franjo Kuhač",
    ],
  },
  {
    numb: 89,
    question:
      "Za predsjednika Republike Hrvatske ne može se biti biran više od:",
    answer: "2 puta",
    options: ["2 puta", "3 puta", "4 puta", "Ne postoji ograničenje"],
  },
  {
    numb: 90,
    question: "Koliko zastupnika može imati Hrvatski sabor?",
    answer: "Najmanje 100, najviše 160",
    options: [
      "Najmanje 100, najviše 160",
      "Najmanje 80, najviše 200",
      "Najmanje 120, najviše 140",
      "Najmanje 90, najviše 170",
    ],
  },
  {
    numb: 91,
    question:
      "Koja je tvrđava simbol hrvatske državnosti i pobjede u Domovinskom ratu?",
    answer: "Kninska",
    options: ["Kninska", "Medvedgrad", "Dubovačka", "Trakošćan"],
  },
  {
    numb: 92,
    question:
      "Bitka protiv Osmanlija, u kojoj su poginuli mnogi pripadnici hrvatskog plemstva, zbila se 1493. godine u Lici, na:",
    answer: "Krbavskom polju",
    options: [
      "Krbavskom polju",
      "Vukovarskom polju",
      "Cetinskom polju",
      "Koranskom polju",
    ],
  },
  {
    numb: 93,
    question:
      "Zagrebački muzej, čiji se fundus temelji na donaciji privatne zbirke umjetnina poznatog kolekcionara, zove se:",
    answer: "Muzej Mimara",
    options: [
      "Muzej Mimara",
      "Arheološki muzej",
      "Moderna galerija",
      "Etnografski muzej",
    ],
  },
  {
    numb: 94,
    question:
      "Fabijan Šovagović, Boris Dvornik i Ivo Gregurević bili su poznati hrvatski:",
    answer: "Glumci",
    options: ["Glumci", "Skladatelji", "Redatelji", "Pisci"],
  },
  {
    numb: 95,
    question:
      "Svjetski poznati izvozni proizvod hrvatske prehrambene industrije je začin:",
    answer: "Vegeta",
    options: ["Vegeta", "Paprika", "Origano", "Ružmarin"],
  },
  {
    numb: 96,
    question:
      "Kako se zove najveći grad u Slavoniji na rijeci Dravi, čija je povijesna jezgra Tvrđa?",
    answer: "Osijek",
    options: ["Osijek", "Slavonski Brod", "Vinkovci", "Vukovar"],
  },
  {
    numb: 97,
    question:
      "Hrvatska viteška igra koja se održava svake godine u prvoj nedjelji mjeseca kolovoza u Sinju, na godišnjicu pobjede nad turskim osvajačima 14. kolovoza 1715. godine, zove se:",
    answer: "Sinjska alka",
    options: [
      "Sinjska alka",
      "Velika alka",
      "Sinjski vitezi",
      "Turčinova pobjeda",
    ],
  },
  {
    numb: 98,
    question:
      "Najbolji igrač svijeta za 2018. godinu u izboru Međunarodne nogometne federacije (FIFA) i France Footballa je hrvatski nogometaš:",
    answer: "Luka Modrić",
    options: ["Luka Modrić", "Ivan Rakitić", "Mario Mandžukić", "Ante Rebić"],
  },
  {
    numb: 99,
    question:
      "Poznatu slikarsku školu hrvatske naive osnovao je, u podravskom selu Hlebine, slikar:",
    answer: "Krsto Hegedušić",
    options: ["Josip Račić", "Ivan Rabuzin", "Krsto Hegedušić", "Ljubo Babić"],
  },
  {
    numb: 100,
    question:
      "Hrvatski redatelj, scenarist, animator, crtač i karikaturist, koji je 1962. godine dobio Oscara za crtani film »Surogat« zvao se:",
    answer: "Dušan Vukotić",
    options: [
      "Dušan Vukotić",
      "Vladimir Tadej",
      "Nikola Tanhofer",
      "Branko Bauer",
    ],
  },
  {
    numb: 101,
    question:
      "»Tigrovi«, »Gromovi«, »Kune«, »Pauci«, »Pume«, »Sokolovi«, »Orlovi« i »Vukovi« nazivi su hrvatskih vojnih postrojbi iz Domovinskog rata:",
    answer: "gardijskih brigada",
    options: [
      "mornaričke pješadije",
      "vojne policije",
      "zrakoplovnih eskadrila",
      "gardijskih brigada",
    ],
  },
  {
    numb: 102,
    question: "Datum međunarodnog priznanja Republike Hrvatske je:",
    answer: "15. siječnja 1992. godine",
    options: [
      "30. svibnja 1990. godine",
      "25. lipnja 1991. godine",
      "8. listopada 1991. godine",
      "15. siječnja 1992. godine",
    ],
  },
  {
    numb: 103,
    question:
      "Koje su se godine održali prvi demokratski izbori u Republici Hrvatskoj?",
    answer: "1990. godine",
    options: ["1990. godine", "1991. godine", "1989. godine", "1992. godine"],
  },
  {
    numb: 104,
    question:
      "Prvo kazalište na području Hrvatske otvoreno je početkom 17. stoljeća u:",
    answer: "Hvaru",
    options: ["Zagrebu", "Hvaru", "Dubrovniku", "Varaždinu"],
  },
  {
    numb: 105,
    question:
      "Poznata hrvatska skladateljica plemićkog podrijetla, čiji je otac bio hrvatski ban te čiji se obiteljski dvorac nalazi u Našicama je:",
    answer: "Dora Pejačević",
    options: [
      "Dora Pejačević",
      "Ivana Lang",
      "Milka Trnina",
      "Zinka Kunc-Milanov",
    ],
  },
  {
    numb: 106,
    question:
      "Najviša kulturna i znanstvena institucija u Republici Hrvatskoj je:",
    answer: "Hrvatska akademija znanosti i umjetnosti",
    options: [
      "Hrvatska akademija znanosti i umjetnosti",
      "Hrvatski sabor",
      "Ministarstvo kulture",
      "Sveučilište u Zagrebu",
    ],
  },
  {
    numb: 107,
    question:
      "Kojeg je sveca Hrvatski državni sabor svojom odlukom iz 1687. godine proglasio zaštitnikom Hrvatske, a čije je nacionalno svetište u Karlovcu?",
    answer: "sv. Josipa",
    options: ["sv. Antuna", "sv. Josipa", "sv. Nikolu", "sv. Franju"],
  },
  {
    numb: 108,
    question:
      "Tradicionalne hrvatske smotre folklora i običaja koje se održavaju u Slavoniji su đakovački ___________________ i vinkovačke ____________.",
    answer: "đakovački vezovi i vinkovačke jeseni",
    options: [
      "đakovački vezovi i vinkovačke jeseni",
      "đakovačke ljetne igre i vinkovački običaji",
      "đakovačke noći i vinkovački dani",
      "đakovačke priredbe i vinkovačke svečanosti",
    ],
  },
  {
    numb: 109,
    question:
      "Poznate hrvatske umjetnice, Milka Trnina i Zinka Kunc-Milanov, bile su:",
    answer: "operne pjevačice",
    options: ["glumice", "skladateljice", "operne pjevačice", "književnice"],
  },
  {
    numb: 110,
    question:
      "Viktor Kovačić, Stjepan Planić i Drago Ibler bili su poznati hrvatski:",
    answer: "arhitekti",
    options: ["arhitekti", "književnici", "slikari", "glazbenici"],
  },
];
//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const scramble_btn = document.querySelector(".buttons .scramble");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const scramble_box = document.querySelector(".game-body");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// if startQuiz button clicked
start_btn.onclick = () => {
  info_box.classList.add("activeInfo"); //show info box
};

// if exitQuiz button clicked
exit_btn.onclick = () => {
  console.log("exit");
  info_box.classList.remove("activeInfo"); //hide info box
};

// if exitQuiz button clicked
scramble_btn.onclick = () => {
  console.log("scramble game");
  info_box.classList.remove("activeInfo"); //hide info box
  scramble_box.classList.add("activeGame"); //hide info box
  //start_btn.style.opacity = "0"; // Make fully visible
  //start_btn.style.pointerEvents = "none"; // Enable interaction
  document.body.classList.remove(".start_btn");
  start_btn.style.display = "none";
};

// if continueQuiz button clicked
continue_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); //hide info box
  quiz_box.classList.add("activeQuiz"); //show quiz box
  showQuetions(0); //calling showQuestions function
  queCounter(1); //passing 1 parameter to queCounter
  startTimer(30); //calling startTimer function
  startTimerLine(0); //calling startTimerLine function
};

let timeValue = 30;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = () => {
  quiz_box.classList.add("activeQuiz"); //show quiz box
  result_box.classList.remove("activeResult"); //hide result box
  timeValue = 30;
  que_count = 0;
  que_numb = 1;
  userScore = 0;
  widthValue = 0;
  showQuetions(que_count); //calling showQestions function
  queCounter(que_numb); //passing que_numb value to queCounter
  clearInterval(counter); //clear counter
  clearInterval(counterLine); //clear counterLine
  startTimer(timeValue); //calling startTimer function
  startTimerLine(widthValue); //calling startTimerLine function
  timeText.textContent = "Time Left"; //change the text of timeText to Time Left
  next_btn.classList.remove("show"); //hide the next button
};

// if quitQuiz button clicked
quit_quiz.onclick = () => {
  window.location.reload(); //reload the current window
};

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
next_btn.onclick = () => {
  console.log("next button clicked");
  if (que_count < questions.length - 1) {
    //if question count is less than total question length
    que_count++; //increment the que_count value
    que_numb++; //increment the que_numb value
    showQuetions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    timeText.textContent = "Time Left"; //change the timeText to Time Left
    next_btn.classList.remove("show"); //hide the next button
  } else {
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    showResult(); //calling showResult function
  }
};

// getting questions and options from array
function showQuetions(index) {
  console.log(`show question method //${questions[index].question}`);
  const que_text = document.querySelector(".que_text");

  //creating a new span and div tag for question and option and passing the value using array index
  let que_tag = `<span> ${questions[index].numb} ${questions[index].question} </span>`;
  let option_tag = `    
    <div class="option">
        <span>${questions[index].options[0]}</span>
    </div>
    <div class="option">
        <span>${questions[index].options[1]}</span>
    </div>
    <div class="option">
        <span>${questions[index].options[2]}</span>
    </div>
    <div class="option">
        <span>${questions[index].options[3]}</span>
    </div>"`;

  que_text.innerHTML = que_tag; //adding new span tag inside que_tag
  option_list.innerHTML = option_tag; //adding new div tag inside option_tag

  const option = option_list.querySelectorAll(".option");

  // set onclick attribute to all available options
  for (i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer) {
  clearInterval(counter); //clear counter
  clearInterval(counterLine); //clear counterLine
  let userAns = answer.textContent; //getting user selected option
  let correcAns = questions[que_count].answer; //getting correct answer from array
  const allOptions = option_list.children.length; //getting all option items

  console.log(`optionSelected: ${userAns}`);
  console.log(`userAns === correcAns -> ${userAns === correcAns}`);
  console.log(`userAns: ${userAns} \ncorrectAns: ${correcAns}`);
  console.log(
    `userAns is type of ${typeof userAns} \n correctAns is type ${typeof correcAns}`,
  );

  if (userAns.trim().toLowerCase() === correcAns.trim().toLowerCase()) {
    //if user selected option is equal to array's correct answer
    userScore += 1; //upgrading score value with 1
    answer.classList.add("correct"); //adding green color to correct selected option
    answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
    console.log("Correct Answer");
    console.log("Your correct answers = " + userScore);
  } else {
    answer.classList.add("incorrect"); //adding red color to correct selected option
    answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option

    console.log("Wrong Answer");
    for (i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent === correcAns) {
        //if there is an option which is matched to an array answer
        option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
        option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
        console.log("Auto selected correct answer.");
      }
    }
  }
  for (i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
  }
  next_btn.classList.add("show"); //show the next button if user selected any option
}

function showResult() {
  info_box.classList.remove("activeInfo"); //hide info box
  quiz_box.classList.remove("activeQuiz"); //hide quiz box
  result_box.classList.add("activeResult"); //show result box
  const scoreText = result_box.querySelector(".score_text");
  if (userScore > 3) {
    // if user scored more than 3
    //creating a new span tag and passing the user score number and total question number
    let scoreTag =
      "<span>and congrats! 🎉, You got <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag; //adding new span tag inside score_Text
  } else if (userScore > 1) {
    // if user scored more than 1
    let scoreTag =
      "<span>and nice 😎, You got <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else {
    // if user scored less than 1
    let scoreTag =
      "<span>and sorry 😐, You got only <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  }
}

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time; //changing the value of timeCount with time value
    time--; //decrement the time value
    if (time < 9) {
      //if timer is less than 9
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero; //add a 0 before time value
    }
    if (time < 0) {
      //if timer is less than 0
      clearInterval(counter); //clear counter
      timeText.textContent = "Time Off"; //change the time text to time off
      const allOptions = option_list.children.length; //getting all option items
      let correcAns = questions[que_count].answer; //getting correct answer from array
      for (i = 0; i < allOptions; i++) {
        if (option_list.children[i].textContent == correcAns) {
          //if there is an option which is matched to an array answer
          option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
          option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
          console.log("Time Off: Auto selected correct answer.");
        }
      }
      for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
      }
      next_btn.classList.add("show"); //show the next button if user selected any option
    }
  }
}

function startTimerLine(time) {
  counterLine = setInterval(timer, 57);
  function timer() {
    time += 1; //upgrading time value with 1
    time_line.style.width = time + "px"; //increasing width of time_line with px by time value
    if (time > 549) {
      //if time value is greater than 549
      clearInterval(counterLine); //clear counterLine
    }
  }
}

function queCounter(index) {
  let totalQueCounTag = `<span><p> ${index} </p> of <p> ${questions.length} </p> Questions </span>`;
  bottom_ques_counter.innerHTML = totalQueCounTag;
}
