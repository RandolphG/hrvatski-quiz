class TextObject extends createjs.Container {
  constructor(txt, id) {
    super();

    if (!txt || typeof id === "undefined") {
      throw new Error("Invalid parameters provided to TextObject.");
    }

    this.cID = id;
    this.word = txt;
    this.mouseDown = false;

    this.text = this.createText(txt);
    this.width = this.text.getMeasuredWidth() + 50;
    this.height = this.text.getMeasuredHeight() + 20;
    this.background = this.createBackground();

    this.text.x = this.width / 2;
    this.text.y = 10;

    this.addChild(this.background, this.text);
    this.addEventListener("mousedown", this.handleMouseDown.bind(this));
  }

  createText(txt) {
    const text = new createjs.Text(txt, "16px Quicksand", "#000");
    text.textBaseline = "top";
    text.textAlign = "center";
    return text;
  }

  createBackground() {
    const background = new createjs.Shape();
    background.graphics
      .beginFill("white")
      .drawRoundRect(0, 0, this.width, this.height, 10);
    return background;
  }

  handleMouseDown(event) {
    this.mouseDown = true;
    clickedID = this.cID;
    color = createjs.Graphics.getHSL(Math.random() * 360, 300, 40);
    isDown = true;
    startX = event.stageX;
    startY = event.stageY;
  }
}

window.TextObject = TextObject;

const stage = new createjs.Stage("puzzle");
const tempG = new createjs.Graphics();
const tempLine = new createjs.Shape(tempG);

let startX, startY, endX, endY;
let isDown = false;
let clickedID = -1;
let correctLines = [];
let correctID = [];
let wrongCount = 0;

const input = {
  words: [
    "Hello",
    "Ambisinister",
    "Fortuitous",
    "Noctambulism",
    "Remontant",
    "Hierocracy",
    "Rugose",
    "Rondure",
    "Cacology",
    "Ochlophobia",
  ],
  definitions: [
    "Bonjour",
    "Inept with both hands.",
    "Happening by accident or chance.",
    "Sleepwalking.",
    "Blooming more often than once in a season.",
    "Government by the clergy; ecclesiastical rule.",
    "Having many wrinkles or creases; ridged or wrinkled.",
    "A circular or gracefully rounded object.",
    "Bad choice of words; poor pronunciation.",
    "Abnormal fear of crowds.",
  ],
};

const output = { words: [], definitions: [] };

window.onload = () => {
  createjs.Touch.enable(stage);
  initializeGame();
};

function initializeGame() {
  setupTextObjects(); // Ensure text objects are created first
  console.log("Words:", output.words); // Debug
  console.log("Definitions:", output.definitions); // Debug

  if (output.words.length === 0 || output.definitions.length === 0) {
    console.error("Error: Text objects were not initialized correctly.");
    return;
  }

  shuffleTextObjects();
  positionTextObjects();
  setupEventListeners();
  stage.update();
}

function setupTextObjects() {
  input.words.forEach((word, index) => {
    const wordObj = new TextObject(word, index);
    if (!wordObj) {
      console.error(`Error creating TextObject for word: ${word}`);
    }
    output.words.push(wordObj);
  });

  input.definitions.forEach((definition, index) => {
    const defObj = new TextObject(definition, index);
    if (!defObj) {
      console.error(`Error creating TextObject for definition: ${definition}`);
    }
    output.definitions.push(defObj);
  });
}

function shuffleTextObjects() {
  output.words = seedShuffle(output.words, Math.random() * 100);
  output.definitions = seedShuffle(output.definitions, Math.random() * 100);
}

function positionTextObjects(offsetX = 50, offsetY = 50) {
  output.words.forEach((word, i) => {
    word.x = offsetX;
    word.y = offsetY * i;
    stage.addChild(word);
  });

  output.definitions.forEach((definition, i) => {
    definition.x = 400;
    definition.y = offsetY * i;
    stage.addChild(definition);
  });
}

function setupEventListeners() {
  stage.addEventListener("stagemouseup", handleMouseUp);
  stage.addEventListener("stagemousemove", handleMouseMove);
  stage.addEventListener("tick", checkPuzzleCompletion);
}

function handleMouseUp(event) {
  if (!isDown) return;

  isDown = false;
  ({ stageX: endX, stageY: endY } = event);
  stage.removeChild(tempLine);
  stage.update();

  const clickedWord = findById(output.words, clickedID);
  const clickedDefinition = findById(output.definitions, clickedID);

  if (clickedWord && processMatch(clickedWord, event, output.words)) return;
  if (
    clickedDefinition &&
    processMatch(clickedDefinition, event, output.definitions)
  )
    return;

  resetInteractionState();
}

function processMatch(item, event, list) {
  if (isWithinBounds(item, event.stageX, event.stageY)) {
    handleCorrectMatch(item);
    return true;
  } else {
    handleIncorrectMatch(list, event);
    return false;
  }
}

function handleMouseMove(event) {
  if (!isDown) return;

  tempG
    .clear()
    .setStrokeStyle(8)
    .beginStroke(color)
    .moveTo(startX, startY)
    .lineTo(event.stageX, event.stageY)
    .endStroke();

  stage.addChild(tempLine);
  stage.update();
}

function checkPuzzleCompletion() {
  if (correctID.length !== output.words.length) return;

  stage.removeAllChildren();
  stage.removeAllEventListeners();
  displayCompletionMessage();
}

function handleCorrectMatch(item) {
  const counterpart = findById(output.definitions, clickedID);

  item.mouseEnabled = counterpart.mouseEnabled = false;

  [item, counterpart].forEach((obj) => {
    obj.background.graphics
      .beginFill(color)
      .drawRoundRect(0, 0, obj.width, obj.height, 10);
    obj.text.color = "#FFFFFF";
    obj.text.font = "bold 16px Arial";
  });

  drawLine(startX, startY, endX, endY);

  correctLines.push(tempLine);
  correctID.push(clickedID);

  stage.update();
}

function handleIncorrectMatch(list, event) {
  if (list.some((item) => isWithinBounds(item, event.stageX, event.stageY))) {
    wrongCount++;
    alert("Error!");
    document.getElementById("erreur").innerText = `${wrongCount} error(s)`;
  }
}

function drawLine(x1, y1, x2, y2) {
  tempG
    .clear()
    .setStrokeStyle(8)
    .beginStroke(color)
    .moveTo(x1, y1)
    .lineTo(x2, y2)
    .endStroke();

  const line = new createjs.Shape(tempG);
  stage.addChildAt(line, 0);
}

function displayCompletionMessage() {
  const message = "You have completed the puzzle!";
  const attempts = `You had ${wrongCount} failed attempts.`;

  const t2 = new createjs.Text(message, "20px Arial", "#000");
  const t3 = new createjs.Text(attempts, "20px Arial", "#000");

  t2.x = t3.x = 25;
  t2.y = 25;
  t3.y = t2.y + 25;

  const width = Math.max(t2.getMeasuredWidth(), t3.getMeasuredWidth()) + 50;
  const height = t2.getMeasuredHeight() + t3.getMeasuredHeight() + 50;

  const background = new createjs.Shape();
  background.graphics.beginFill("#00FF00").drawRect(0, 0, width, height);

  stage.addChild(background, t2, t3);
}

function isWithinBounds(obj, x, y) {
  return (
    x > obj.x && y > obj.y && x < obj.x + obj.width && y < obj.y + obj.height
  );
}

function findById(list, id) {
  return list.find((item) => item.cID === id);
}

function resetInteractionState() {
  if (clickedID !== -1) {
    const clickedWord = findById(output.words, clickedID);
    const clickedDefinition = findById(output.definitions, clickedID);

    if (clickedWord) clickedWord.mouseDown = false;
    if (clickedDefinition) clickedDefinition.mouseDown = false;

    clickedID = -1;
  }
}

function seedShuffle(array, seed) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = ((seed % (i + 1)) + i) % array.length;
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
