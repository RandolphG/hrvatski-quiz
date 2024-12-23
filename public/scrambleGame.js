let words = [
  {
    word: "obitelj",
    hint: "Skupina ljudi povezana rodbinskim odnosima (npr. roditelji i djeca).",
  },
  {
    word: "prijatelj",
    hint: "Osoba s kojom imate blizak i povjerljiv odnos.",
  },
  {
    word: "škola",
    hint: "Mjesto gdje se uči i stječe znanje.",
  },
  {
    word: "kuća",
    hint: "Mjesto gdje ljudi žive; dom.",
  },
  {
    word: "stol",
    hint: "Komad namještaja na kojem se jede ili radi.",
  },
  {
    word: "prozor",
    hint: "Otvori na zidu kroz koje ulazi svjetlo i zrak.",
  },
  {
    word: "pas",
    hint: "Životinja koja je često čovjekov kućni ljubimac.",
  },
  {
    word: "knjiga",
    hint: "Skup tiskanih ili pisanih stranica povezanih u koricama.",
  },
  {
    word: "vlak",
    hint: "Vozilo koje se kreće po tračnicama i prevozi ljude ili teret.",
  },
  {
    word: "voda",
    hint: "Prozirna tekućina koja je neophodna za život.",
  },
  {
    word: "jabuka",
    hint: "Vrsta voća koje je okruglo i često crveno ili zeleno.",
  },
  {
    word: "mlijeko",
    hint: "Bijela tekućina koju daju krave i koristi se za piće.",
  },
  {
    word: "more",
    hint: "Velika količina slane vode koja prekriva dio Zemljine površine.",
  },
  {
    word: "ljubav",
    hint: "Snažan osjećaj privrženosti ili naklonosti prema nekome.",
  },
  {
    word: "sunce",
    hint: "Zvijezda koja daje svjetlost i toplinu Zemlji.",
  },
  {
    word: "auto",
    hint: "Vozilo s motorom koje se koristi za prijevoz.",
  },
  {
    word: "vrijeme",
    hint: "Stanje atmosfere u određenom trenutku (npr. sunčano, kišno).",
  },
  {
    word: "cvijet",
    hint: "Dio biljke koji je često šaren i lijep.",
  },
  {
    word: "zrak",
    hint: "Smjesa plinova koja okružuje Zemlju i koju udišemo.",
  },
  {
    word: "večera",
    hint: "Obrok koji se obično jede navečer.",
  },
  {
    word: "ručak",
    hint: "Glavni obrok koji se obično jede oko podneva.",
  },
  {
    word: "grad",
    hint: "Veće naselje gdje živi mnogo ljudi.",
  },
  {
    word: "oblak",
    hint: "Bijela ili siva masa na nebu napravljena od kapljica vode.",
  },
  {
    word: "stan",
    hint: "Prostor u zgradi gdje ljudi žive.",
  },
  {
    word: "novac",
    hint: "Sredstvo koje se koristi za kupnju stvari.",
  },
  {
    word: "kruh",
    hint: "Osnovna hrana napravljena od brašna, vode i kvasca.",
  },
  {
    word: "sir",
    hint: "Mliječni proizvod koji se jede kao hrana.",
  },
  {
    word: "tjedan",
    hint: "Razdoblje od sedam dana.",
  },
  {
    word: "dan",
    hint: "Razdoblje od 24 sata; vrijeme od jutra do večeri.",
  },
];

const infoSection = document.querySelector(".info_box");
const startButton = document.querySelector(".start-btn");
const wordText = document.querySelector(".word");
const hintText = document.querySelector(".hint span");
const textTimer = document.querySelector(".time b");
const inputField = document.querySelector("input");
const refreshBtn = document.querySelector(".refresh-word");
const checkBtn = document.querySelector(".check-word");
const quitBtn = document.querySelector(".quitScramble");

// if exitQuiz button clicked
quitBtn.onclick = () => {
  console.log("quit scramble game");
  // startButton.style.display = "block"; // Enable interaction
  scramble_box.classList.remove("activeGame"); //hide scramble game box
  infoSection.classList.add("activeInfo"); //show info box
};
let correctWord, timer;

const initTimer = (maxTime) => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (maxTime > 0) {
      maxTime--;
      return (textTimer.innerText = maxTime);
    }
    //alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
    initGame();
  }, 1000);
};

const initGame = () => {
  initTimer(30);
  let randomObj = words[Math.floor(Math.random() * words.length)];
  let wordArray = randomObj.word.split("");
  for (let i = wordArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }
  wordText.innerText = wordArray.join("");
  hintText.innerText = randomObj.hint;
  correctWord = randomObj.word.toLowerCase();
  inputField.value = "";
  inputField.setAttribute("maxlength", correctWord.length);
};

initGame();

const checkWord = () => {
  let userWord = inputField.value.toLowerCase();
  if (!userWord) return alert("Please enter the word to check!");
  if (userWord !== correctWord) {
    alert(`Oops! ${userWord} is not a correct word`);
    return initGame();
  }
  alert(`Congrats! ${correctWord.toUpperCase()} is the correct word`);
  initGame();
};

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
