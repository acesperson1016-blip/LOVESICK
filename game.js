"use strict";

/* =========================================================
   LOVESICK — WEB BUILD
   ========================================================= */

const SPRITES = {
  Azzy: {
    neutral: "assets/sprites/azzy/azzyneutral.png",
    happy: "assets/sprites/azzy/azzyhappy.png",
    worried: "assets/sprites/azzy/azzyworried.png",
    annoyed: "assets/sprites/azzy/azzyannoyed.png",
    scared: "assets/sprites/azzy/azzyscared.png",
    tired: "assets/sprites/azzy/azzytired.png"
  },

  "Yan'De": {
    neutral: "assets/sprites/yande/yandeneutral.png",
    soft: "assets/sprites/yande/yandesoft.png",
    playful: "assets/sprites/yande/yandeplayful.png",
    jealous: "assets/sprites/yande/yandejealous.png",
    serious: "assets/sprites/yande/yandeserious.png",
    obsessed: "assets/sprites/yande/yandeobsessed.png"
  },

  "Dr. Ace Brighton": {
    neutral: "assets/sprites/ace/aceneutral.png",
    smiling: "assets/sprites/ace/acesmiling.png",
    stress: "assets/sprites/ace/acestress.png",
    tired: "assets/sprites/ace/acetired.png",
    firm: "assets/sprites/ace/acefirm.png",
    worried: "assets/sprites/ace/aceworried.png"
  }
};


/* =========================================================
   STORY
   ========================================================= */

const STORY = {
  intro: {
    speaker: "Azzy",
    expression: "tired",
    text:
      "The rain has been falling for three days.\n\n" +
      "You keep telling yourself that you're imagining the footsteps outside your window.",
    choices: [
      ["Look outside.", "outside", 0],
      ["Stay in bed.", "stay", 1]
    ]
  },

  outside: {
    speaker: "Azzy",
    expression: "worried",
    text:
      "Nobody is there.\n\n" +
      "Except for a small envelope sitting beneath your window.",
    choices: [
      ["Pick up the envelope.", "note", 1],
      ["Leave it alone.", "note", 0]
    ]
  },

  stay: {
    speaker: "Azzy",
    expression: "scared",
    text:
      "You pull the blanket over your head.\n\n" +
      "Three quiet knocks come from the window.",
    choices: [
      ["Open the curtains.", "note", 1],
      ["Ignore the knocking.", "note", 0]
    ]
  },

  note: {
    speaker: "Yan'De",
    expression: "neutral",
    text:
      "\"I know you're awake.\"\n\n" +
      "There is no signature.\n\n" +
      "You already know who wrote it.",
    choices: [
      ["Write back: \"Hi.\"", "yande", 2],
      ["Tear it up.", "yande", -1]
    ]
  },

  yande: {
    speaker: "Yan'De",
    expression: "soft",
    text:
      "A message appears almost immediately.\n\n" +
      "\"You remembered me.\"\n\n" +
      "You don't remember telling him where you live.",
    choices: [
      ["\"Of course I did.\"", "date", 3],
      ["\"This is getting creepy.\"", "date", -1]
    ]
  },

  date: {
    speaker: "Yan'De",
    expression: "playful",
    text:
      "\"Come meet me tomorrow.\"\n\n" +
      "\"Just us. No doctors. No friends.\"\n\n" +
      "The last sentence makes your stomach tighten.",
    choices: [
      ["Agree to meet.", "date_bridge_1", 3],
      ["I'm not going with you.", "refuse_bridge_1", -3]
    ]
  },

  date_bridge_1: {
    speaker: "Azzy",
    expression: "worried",
    text:
      "The next evening, you actually show up.\n\n" +
      "Yan'De is already waiting, hands tucked into his jacket pockets like he has been there forever.\n\n" +
      "When he sees you, his whole expression softens.",
    choices: [
      ["Walk over to him.", "date_bridge_2", 1]
    ]
  },

  date_bridge_2: {
    speaker: "Yan'De",
    expression: "playful",
    text:
      "\"You came.\"\n\n" +
      "\"You sound surprised,\" you say.\n\n" +
      "\"I'm not.\"\n\n" +
      "He absolutely is.\n\n" +
      "Yan'De produces his phone and grins.\n\n" +
      "\"I made us a little question game. Nothing weird. Promise.\"",
    choices: [
      ["Start Yan'De's game.", "date_game", 0]
    ]
  },

  refuse_bridge_1: {
    speaker: "Azzy",
    expression: "worried",
    text:
      "\"I'm not going.\"\n\n" +
      "Yan'De's smile disappears so quickly it makes your stomach drop.",
    choices: [
      ["Stand your ground.", "refuse_bridge_2", 0]
    ]
  },

  refuse_bridge_2: {
    speaker: "Yan'De",
    expression: "jealous",
    text:
      "\"...What?\"\n\n" +
      "\"You're scared. That's all. We can fix scared.\"\n\n" +
      "You shake your head.\n\n" +
      "\"No. I'm uncomfortable.\"",
    choices: [
      ["Leave.", "refuse_bridge_3", 0]
    ]
  },

  refuse_bridge_3: {
    speaker: "Azzy",
    expression: "tired",
    text:
      "Yan'De lets you go.\n\n" +
      "That almost makes it worse.\n\n" +
      "The next morning, you tell Ace exactly what happened.",
    choices: [
      ["Talk to Ace.", "doctor", 0]
    ]
  },

  doctor: {
    speaker: "Dr. Ace Brighton",
    expression: "neutral",
    text:
      "Ace closes Azzy's file.\n\n" +
      "\"You made the right call by not going alone.\"\n\n" +
      "\"He didn't take it well,\" you say.\n\n" +
      "Ace nods.\n\n" +
      "\"I figured. Now I talk to him.\"\n\n" +
      "For the next part, you will play as Dr. Brighton.",
    choices: [
      ["Begin Therapy Session", "therapy", 0]
    ]
  },

  therapy_success_1: {
    speaker: "Dr. Ace Brighton",
    expression: "smiling",
    text:
      "Question fifteen ends quietly.\n\n" +
      "Yan'De doesn't storm out. He doesn't argue.\n\n" +
      "He just sits there for a moment, thinking.\n\n" +
      "Ace finally exhales.\n\n" +
      "\"That's enough for today.\"",
    choices: [
      ["Continue", "therapy_success_2", 0]
    ]
  },

  therapy_success_2: {
    speaker: "Yan'De",
    expression: "soft",
    text:
      "Later, Yan'De finds Azzy outside.\n\n" +
      "\"Azzy?\"\n\n" +
      "You brace yourself.\n\n" +
      "\"Yeah?\"\n\n" +
      "\"I talked to Ace.\"",
    choices: [
      ["Listen.", "therapy_success_3", 0]
    ]
  },

  therapy_success_3: {
    speaker: "Yan'De",
    expression: "serious",
    text:
      "\"I hated it.\"\n\n" +
      "You almost laugh.\n\n" +
      "\"Sounds about right.\"\n\n" +
      "His gaze drops.\n\n" +
      "\"But... thank you.\"\n\n" +
      "\"For what?\"\n\n" +
      "\"For not giving up on me just because you wouldn't go with me.\"",
    choices: [
      ["Continue", "ending_normal", 0]
    ]
  },

  therapy_failure_1: {
    speaker: "Dr. Ace Brighton",
    expression: "worried",
    text:
      "The session ends, but Ace doesn't look relieved.\n\n" +
      "Yan'De leaves with his shoulders rigid and his jaw clenched.\n\n" +
      "\"That didn't reach him,\" Ace says quietly.",
    choices: [
      ["Continue", "therapy_failure_2", 0]
    ]
  },

  therapy_failure_2: {
    speaker: "Yan'De",
    expression: "jealous",
    text:
      "That evening, Yan'De is waiting for you.\n\n" +
      "\"So that's what you wanted? Send me to him so he could tell me I'm wrong about you?\"\n\n" +
      "You step back.\n\n" +
      "\"Yan'De...\"",
    choices: [
      ["Tell him it's over.", "therapy_failure_3", -3]
    ]
  },

  therapy_failure_3: {
    speaker: "Yan'De",
    expression: "obsessed",
    text:
      "\"No.\"\n\n" +
      "The word is almost gentle.\n\n" +
      "\"You don't get to decide we're done after making me try this hard.\"\n\n" +
      "The rain starts again.",
    choices: [
      ["Continue", "ending_rejection", 0]
    ]
  },

  confront: {
    speaker: "Yan'De",
    expression: "jealous",
    text:
      "That evening, Yan'De is waiting outside.\n\n" +
      "\"You talked to Ace.\"\n\n" +
      "His smile doesn't reach his eyes.",
    choices: [
      ["\"Yes.\"", "final_choice", -2],
      ["\"No.\"", "final_choice", 2]
    ]
  },

  final_choice: {
    speaker: "Yan'De",
    expression: "obsessed",
    text:
      "\"Then tell me.\"\n\n" +
      "\"Do you love me?\"",
    choices: [
      ["\"Yes.\"", "ending_check", 5],
      ["\"No.\"", "ending_check", -5],
      ["\"I don't know.\"", "ending_check", 0]
    ]
  }
};


/* =========================================================
   DATE QUESTIONS
   ========================================================= */

const DATE_QUESTIONS = [
  ["What would our perfect first date be?", "Arcade", "Late-night walk"],
  ["Would you rather hold my hand or hug me?", "Hold hands", "Hug"],
  ["What nickname would you give me?", "Yanny", "De"],
  ["Who do you think would fall asleep first during a movie?", "Me", "You"],
  ["Would you let me steal your hoodie?", "Absolutely", "Get your own ♡"],
  ["If I made you dinner, what would you want afterward?", "Dessert", "Cuddles"],
  ["Would you rather get flowers or a love letter?", "Flowers", "Love letter"],
  ["Would you let me make you a playlist?", "Yes ♡", "Only if it's good"],
  ["If we had an entire day together, would you want to go somewhere or stay home?", "Go somewhere", "Stay together"],
  ["Do you think you'd ever fall in love with someone like me?", "Maybe...", "I think I could."]
];

const VOICE_QUESTIONS = {
  11: "What's something that makes you happy?",
  12: "What's your idea of the perfect relationship?",
  13: "Okay... say my name.",
  14: "What do you think of me now?",
  15: "Do you trust me?"
};


/* =========================================================
   THERAPY QUESTION POOL
   100 QUESTIONS
   ========================================================= */

const GOOD = [
  "What helps you calm down when you feel overwhelmed?",
  "Who can you talk to when your emotions feel too intense?",
  "What does a healthy boundary look like to you?",
  "How do you know when you need space to cool down?",
  "What is one thing you can control when you're angry?",
  "What would make you feel safer without controlling another person?",
  "How can you show care without expecting anything back?",
  "What do you do when you notice yourself spiraling?",
  "What would respecting Azzy's choices look like?",
  "What is something you want to improve about yourself?",
  "What can you do when jealousy starts before you act on it?",
  "How could you ask for reassurance without demanding it?",
  "What would giving Azzy space look like in practice?",
  "What helps you separate a fear from a fact?",
  "What is a respectful way to handle hearing no?",
  "When you feel abandoned, what could you do besides chase the feeling?",
  "What does trust require from both people?",
  "How could you repair things after crossing a boundary?",
  "What is one warning sign that you're becoming overwhelmed?",
  "What could you do before sending a message while angry?",
  "How can you care about someone while letting them disagree with you?",
  "What does an apology need besides the word sorry?",
  "Who besides Azzy could be part of your support system?",
  "What could make a difficult conversation feel safer?",
  "How would you notice that someone needs space?",
  "What is one healthy way to deal with uncertainty?",
  "How could you respond if Azzy changes their mind?",
  "What does being accountable mean to you?",
  "What helps you feel grounded in the present?",
  "What would a relationship with room to breathe look like?",
  "What can you do if you notice yourself making assumptions?",
  "How could you handle loneliness without putting it all on Azzy?",
  "What is something you deserve to give yourself?",
  "How can you tell when a conversation should pause?"
];

const OKAY = [
  "Do you have trouble sleeping?",
  "How often do you feel anxious?",
  "Do you ever feel like people misunderstand you?",
  "What usually puts you in a bad mood?",
  "Do you prefer being alone or around other people?",
  "How do you react when plans suddenly change?",
  "Do you find it easy to trust people?",
  "What do you think makes a relationship last?",
  "What do you usually do after an argument?",
  "Are you comfortable admitting when you're wrong?",
  "What kind of situations make you feel tense?",
  "Do you usually keep your feelings to yourself?",
  "How do you feel about meeting new people?",
  "What do you do when you're bored?",
  "Do you find silence comfortable?",
  "How important is routine to you?",
  "Do you get frustrated easily?",
  "How do you usually make decisions?",
  "What makes you feel understood?",
  "Do you like having time to yourself?",
  "How do you handle criticism?",
  "What makes it difficult for you to relax?",
  "Do you tend to overthink conversations?",
  "How do you feel when someone cancels plans?",
  "What makes you feel appreciated?",
  "Do you find it hard to ask for what you need?",
  "How do you usually spend time when you're alone?",
  "What kind of conversations are hardest for you?",
  "Do you prefer solving problems immediately or waiting?",
  "How do you react when you feel embarrassed?",
  "What helps you feel confident?",
  "Do you think you are patient?",
  "What do you value most in a friend?"
];

const BAD = [
  "Do you think Azzy belongs to you?",
  "What would you do if Azzy left you forever?",
  "Have you ever followed Azzy without telling them?",
  "Why are you so obsessed with Azzy?",
  "Do you get angry when Azzy talks to other people?",
  "Have you ever wanted to hurt someone who got close to Azzy?",
  "If Azzy rejected you, would you accept it?",
  "Do you think love gives you the right to know where Azzy is?",
  "What would you do if Ace told Azzy to stay away from you?",
  "Are you afraid Azzy would be happier without you?",
  "How many times have you checked Azzy's location without asking?",
  "Would you punish Azzy for choosing someone else?",
  "Do you think anyone else could love Azzy as much as you do?",
  "What would stop you from taking Azzy somewhere they couldn't leave?",
  "Have you imagined getting rid of people close to Azzy?",
  "Would you read Azzy's private messages if you had the chance?",
  "Does Azzy owe you affection because you've protected them?",
  "Would you lie to keep Azzy from leaving?",
  "How angry would you be if Azzy dated somebody else?",
  "Do you think Ace is trying to turn Azzy against you?",
  "Would you break a promise if it kept Azzy close?",
  "What would you do if Azzy blocked your number?",
  "Do you think Azzy should need your permission to go somewhere?",
  "Have you ever scared Azzy on purpose?",
  "Would you threaten someone to keep them away from Azzy?",
  "Do you believe Azzy is safer when you know where they are?",
  "Would you forgive Azzy for lying to you about where they were?",
  "What if Azzy said they were afraid of you?",
  "Could you watch Azzy walk away without following them?",
  "Do you think your love excuses things other people would call controlling?",
  "Would you choose Azzy over everyone else in your life?",
  "What would happen if Azzy chose Ace's advice over yours?",
  "Do you resent Azzy for needing time away from you?"
];

const THERAPY_POOL = [
  ...GOOD.map(q => ({
    q,
    type: "GOOD",
    delta: -(6 + Math.floor(Math.random() * 4))
  })),

  ...OKAY.map(q => ({
    q,
    type: "OKAY",
    delta: 2 + Math.floor(Math.random() * 4)
  })),

  ...BAD.map(q => ({
    q,
    type: "BAD",
    delta: 12 + Math.floor(Math.random() * 8)
  }))
];


/* =========================================================
   ENDINGS
   ========================================================= */

const ENDINGS = {
  rejection: {
    title: "ENDING ONE — REJECTION & OBSESSION",
    text:
      "You reject Yan'De.\n\n" +
      "For a moment, he says nothing.\n\n" +
      "The rain keeps falling.\n\n" +
      "You never make it home.",
    achievement:
      "ACHIEVEMENT UNLOCKED:\nI THOUGHT WE WERE HAVING A NICE DATEEEEE"
  },

  institution: {
    title: "ENDING TWO — ACE'S PROBLEM NOW...",
    text:
      "With Ace's help, Yan'De is committed to a mental health facility.\n\n" +
      "The silence afterward feels strange.\n\n" +
      "For the first time in months, Azzy can breathe without looking behind them.",
    achievement:
      "ACHIEVEMENT UNLOCKED:\nCrazy? I was crazy once.."
  },

  normal: {
    title: "ENDING THREE — YAN'DE REALLY LOVES YOU",
    text:
      "Nothing changes overnight.\n\n" +
      "There are boundaries. Therapy. Arguments. Awkward apologies.\n\n" +
      "But with Ace's help, Yan'De and Azzy slowly learn how to have something resembling a normal relationship.",
    achievement:
      "ACHIEVEMENT UNLOCKED:\nYou... Did it?!"
  },

  true: {
    title: "TRUE ENDING — KILLING ME SOFTLY WITH HIS SONG...",
    text:
      "The session ends before it is supposed to.\n\n" +
      "Ace pushed one question too far.\n\n" +
      "Yan'De's restraint finally breaks.\n\n" +
      "Afterward, Azzy disappears with him.\n\n" +
      "Day 1.\nDay 7.\nDay 30.\nDay 90.\nDay 180.\n\n" +
      "One morning, the door is unlocked.\n\n" +
      "Azzy stares at it for a long time.\n\n" +
      "Then quietly closes it.",
    achievement:
      "ACHIEVEMENT UNLOCKED:\nKilling Me Softly With His Song..."
  }
};


/* =========================================================
   GAME STATE
   ========================================================= */

const game = {
  name: "AZZY",
  node: "intro",
  affection: 0,
  insanity: 20,
  ending: null
};

function saveGame() {
  try {
    localStorage.setItem("lovesickSave", JSON.stringify(game));
  } catch (_) {}
}

function resetGame() {
  game.name = "AZZY";
  game.node = "intro";
  game.affection = 0;
  game.insanity = 20;
  game.ending = null;
  saveGame();
}


/* =========================================================
   HELPERS
   ========================================================= */

const $ = selector => document.querySelector(selector);

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.toggle("active", screen.id === id);
  });
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function makeButton(text, handler) {
  const button = document.createElement("button");
  button.textContent = text;
  button.addEventListener("click", handler);
  return button;
}

function setSprite(speaker, expression = "neutral") {
  const image = $("#character-sprite");

  const source =
    SPRITES[speaker]?.[expression] ||
    SPRITES[speaker]?.neutral;

  if (!source) {
    image.style.display = "none";
    return;
  }

  image.style.display = "block";
  image.src = source;

  image.onerror = () => {
    image.style.display = "none";
  };
}

function updateAffection() {
  const value = Math.max(0, Math.min(100, game.affection));

  $("#relationship-fill").style.width =
    `${Math.min(100, value * 8)}%`;

  $("#hud-label").textContent =
    `YAN'DE ♥ ${value}`;
}


/* =========================================================
   TYPEWRITER
   ========================================================= */

let typeTimer = null;
let completeDialogue = "";

function typeDialogue(text) {
  if (typeTimer) {
    clearInterval(typeTimer);
  }

  completeDialogue = text;

  const element = $("#dialogue-text");

  element.textContent = "";

  let index = 0;

  typeTimer = setInterval(() => {
    index = Math.min(text.length, index + 2);

    element.textContent =
      text.slice(0, index);

    if (index >= text.length) {
      clearInterval(typeTimer);
      typeTimer = null;
    }
  }, 6);
}

$("#dialogue-text").addEventListener("click", () => {
  if (!typeTimer) return;

  clearInterval(typeTimer);

  typeTimer = null;

  $("#dialogue-text").textContent =
    completeDialogue;
});


/* =========================================================
   TITLE + NAME SCREEN
   ========================================================= */

$("#start-btn").addEventListener("click", () => {
  resetGame();

  $("#name-input").value = "";
  $("#name-input").readOnly = false;
  $("#name-submit").disabled = false;

  showScreen("name-screen");

  $("#name-input").focus();
});

function submitName() {
  const input = $("#name-input");

  if (input.readOnly) return;

  /*
     Fake name choice.
     Whatever the player entered gets replaced by AZZY.
  */

  input.value = "AZZY";

  input.readOnly = true;

  $("#name-submit").disabled = true;

  game.name = "AZZY";

  saveGame();

  setTimeout(() => {
    loadNode("intro");
  }, 850);
}

$("#name-submit").addEventListener("click", submitName);

$("#name-input").addEventListener("keydown", event => {
  if (event.key === "Enter") {
    submitName();
  }
});


/* =========================================================
   VISUAL NOVEL
   ========================================================= */

function loadNode(nodeName) {
  const node = STORY[nodeName];

  if (!node) {
    console.error("Missing story node:", nodeName);
    return;
  }

  game.node = nodeName;

  saveGame();

  showScreen("vn-screen");

  $("#speaker").textContent =
    node.speaker === "Azzy"
      ? game.name
      : node.speaker;

  setSprite(
    node.speaker,
    node.expression || "neutral"
  );

  typeDialogue(node.text);

  updateAffection();

  const choices = $("#choices");

  clearElement(choices);

  node.choices.forEach(choice => {
    const [label, next, affectionChange] = choice;

    choices.appendChild(
      makeButton(label, () => {
        game.affection = Math.max(
          0,
          Math.min(
            100,
            game.affection + affectionChange
          )
        );

        saveGame();

        routeTo(next);
      })
    );
  });
}

function routeTo(next) {
  if (typeTimer) {
    clearInterval(typeTimer);
    typeTimer = null;
  }

  if (next === "date_game") {
    startDate();
    return;
  }

  if (next === "therapy") {
    startTherapy();
    return;
  }

  if (next === "ending_check") {
    endingCheck();
    return;
  }

  if (next === "ending_normal") {
    showEnding("normal");
    return;
  }

  if (next === "ending_rejection") {
    showEnding("rejection");
    return;
  }

  loadNode(next);
}

function endingCheck() {
  if (game.affection <= 2) {
    showEnding("rejection");

  } else if (game.affection >= 8) {
    showEnding("normal");

  } else {
    showEnding("institution");
  }
}


/* =========================================================
   DATE MINIGAME
   ========================================================= */

let dateRound = 1;

let micStream = null;
let cameraStream = null;

let audioContext = null;
let analyser = null;

let micAnimation = null;

let voiceDetected = false;

function startDate() {
  stopMedia();

  dateRound = 1;

  showScreen("date-screen");

  renderDateRound();
}

function setDateText(text) {
  $("#date-question").textContent = text;
}

function addDateButton(text, handler) {
  $("#date-options").appendChild(
    makeButton(text, handler)
  );
}

function renderDateRound() {
  clearElement($("#date-options"));

  if (dateRound <= 10) {
    const question =
      DATE_QUESTIONS[dateRound - 1];

    setDateText(
      `${dateRound} / 15\n\n` +
      `YAN'DE: "${question[0]}"`
    );

    addDateButton(question[1], () => {
      answerNormalDate(question[1]);
    });

    addDateButton(question[2], () => {
      answerNormalDate(question[2]);
    });

    return;
  }

  if (dateRound === 11 && !micStream) {
    setDateText(
      "11 / 15\n\n" +
      "YAN'DE: \"These buttons are getting boring.\"\n\n" +
      "\"Talk to me instead.\"\n\n" +
      "\"What's something that makes you happy?\""
    );

    addDateButton(
      "ALLOW MICROPHONE",
      async () => {
        await startMicrophone();
        beginVoiceRound();
      }
    );

    addDateButton(
      "DENY MICROPHONE",
      () => {
        setDateText(
          "YAN'DE: \"Microphone access denied.\"\n\n" +
          "\"First you won't talk to me...\"\n\n" +
          "\"Now you won't talk to me?\"\n\n" +
          "\"You're making this difficult.\""
        );

        setTimeout(beginVoiceRound, 1100);
      }
    );

    return;
  }

  if (dateRound === 14 && !cameraStream) {
    setDateText(
      "14 / 15\n\n" +
      "YAN'DE: \"You know what's bothering me?\"\n\n" +
      "\"I can hear you...\"\n\n" +
      "\"But I still can't see you.\"\n\n" +
      "\"Let's fix that.\""
    );

    addDateButton(
      "ALLOW CAMERA",
      async () => {
        await startCamera();

        setDateText(
          "YAN'DE: \"...\"\n\n" +
          "\"There you are.\"\n\n" +
          "\"Look at me.\""
        );

        setTimeout(beginVoiceRound, 900);
      }
    );

    addDateButton(
      "DENY CAMERA",
      () => {
        setDateText(
          "YAN'DE: \"Camera access denied.\"\n\n" +
          "\"Oh.\"\n\n" +
          "\"So you are hiding from me.\"\n\n" +
          "\"Cute.\""
        );

        setTimeout(beginVoiceRound, 1000);
      }
    );

    return;
  }

  beginVoiceRound();
}

function answerNormalDate(answer) {
  clearElement($("#date-options"));

  const responses = {
    "Arcade": `YAN'DE: "An arcade?"

"Okay. But if I win, you owe me another date."`,
    "Late-night walk": `YAN'DE: "A late-night walk?"

"Just us, then."

"I like that."`,

    "Hold hands": `YAN'DE: "Hold hands?"

"Good."

"I'd rather know exactly where you are."`,
    "Hug": `YAN'DE: "A hug?"

"Careful."

"I might not let go."`,

    "Yanny": `YAN'DE: "Yanny?"

"...That's awful."

"You can keep using it."`,
    "De": `YAN'DE: "De..."

"You still remember that name."

"I wasn't expecting that."`,

    "Me": `YAN'DE: "You?"

"Then I get to stay awake and look at you."`,
    "You": `YAN'DE: "Me?"

"Then you'd better still be there when I wake up."`,

    "Absolutely": `YAN'DE: "You'd steal my hoodie?"

"I think I'd like seeing you wear something that belongs to me."`,
    "Get your own ♡": `YAN'DE: "Get my own?"

"Cold, Azzy."

"Cute, though."`,

    "Dessert": `YAN'DE: "Dessert."

"Good answer."

"We can share."`,
    "Cuddles": `YAN'DE: "Cuddles?"

"...You really shouldn't say things like that to me."`,

    "Flowers": `YAN'DE: "Flowers."

"I'd remember your favorite kind."`,
    "Love letter": `YAN'DE: "A love letter?"

"I could write a lot more than one."`,

    "Yes ♡": `YAN'DE: "A playlist?"

"I'd hide messages in it just to see if you noticed."`,
    "Only if it's good": `YAN'DE: "Only if it's good?"

"Then you're not allowed to skip anything."`,

    "Go somewhere": `YAN'DE: "Go somewhere."

"Anywhere's fine, as long as I'm the one you're going with."`,
    "Stay together": `YAN'DE: "Stay together."

"That's my favorite answer so far."`,

    "Maybe...": `YAN'DE: "Maybe?"

"I can work with maybe."`,
    "I think I could.": `YAN'DE: "...You think you could?"

"Azzy."

"Don't say things like that unless you mean them."`
  };

  const response =
    responses[answer] ||
    `YAN'DE: "Interesting."

"I'll remember that."`;

  setDateText(
    `AZZY: "${answer}"

${response}`
  );

  setTimeout(() => {
    dateRound++;
    renderDateRound();
  }, 1650);
}


/* =========================================================
   MICROPHONE
   ========================================================= */

async function startMicrophone() {
  try {
    micStream =
      await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      });

    audioContext =
      new (
        window.AudioContext ||
        window.webkitAudioContext
      )();

    const source =
      audioContext.createMediaStreamSource(
        micStream
      );

    analyser =
      audioContext.createAnalyser();

    analyser.fftSize = 1024;

    source.connect(analyser);

    $("#mic-panel")
      .classList.add("visible");

    updateMic();

    return true;

  } catch (error) {
    console.warn(
      "Microphone unavailable:",
      error
    );

    micStream = null;

    return false;
  }
}

function updateMic() {
  if (!analyser) return;

  const data =
    new Uint8Array(
      analyser.fftSize
    );

  analyser.getByteTimeDomainData(data);

  let total = 0;

  for (const value of data) {
    const sample =
      (value - 128) / 128;

    total += sample * sample;
  }

  const rms =
    Math.sqrt(
      total / data.length
    );

  const level =
    Math.max(
      0,
      Math.min(
        1,
        rms * 7.5
      )
    );

  if (rms > 0.018) {
    voiceDetected = true;
  }

  const percent =
    Math.round(level * 100);

  $("#mic-fill").style.width =
    `${percent}%`;

  $("#mic-percent").textContent =
    `${percent}%`;

  micAnimation =
    requestAnimationFrame(updateMic);
}


/* =========================================================
   CAMERA
   ========================================================= */

async function startCamera() {
  try {
    cameraStream =
      await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user"
        },

        audio: false
      });

    const video =
      $("#camera-preview");

    video.srcObject =
      cameraStream;

    video.classList.add("visible");

    return true;

  } catch (error) {
    console.warn(
      "Camera unavailable:",
      error
    );

    cameraStream = null;

    return false;
  }
}


/* =========================================================
   DATE VOICE ROUNDS
   ========================================================= */

function beginVoiceRound() {
  clearElement($("#date-options"));

  voiceDetected = false;

  const prompt =
    VOICE_QUESTIONS[dateRound];

  if (dateRound === 13) {
    setDateText(
      `13 / 15\n\n` +
      "YAN'DE: \"Okay... say my name.\"\n\n" +
      "[Speak out loud.]"
    );

  } else {
    setDateText(
      `${dateRound} / 15\n\n` +
      `YAN'DE: "${prompt}"\n\n` +
      (
        micStream
          ? "[LISTENING...]"
          : "[MICROPHONE OFFLINE]"
      )
    );
  }

  addDateButton(
    micStream
      ? "DONE SPEAKING"
      : "CONTINUE",
    finishVoiceRound
  );
}

function finishVoiceRound() {
  clearElement($("#date-options"));

  let response = "";

  if (dateRound === 11) {
    response =
      voiceDetected
        ? "\"I heard you. I like hearing you talk about things you care about.\""
        : "\"You're quiet. That's okay.\"";

  } else if (dateRound === 12) {
    response =
      voiceDetected
        ? "\"Mm. I'll remember that.\""
        : "\"Keeping secrets from me?\"";

  } else if (dateRound === 13) {
    response =
      voiceDetected
        ? "\"...Again.\"\n\n\"I like hearing you say it.\""
        : "\"You couldn't even say my name?\"";

  } else if (dateRound === 14) {
    response =
      cameraStream
        ? "\"Now I can see you.\"\n\n\"Much better.\""
        : "\"Still hiding from me?\"";

  } else if (dateRound === 15) {
    response =
      "\"That's enough.\"";
  }

  setDateText(
    `YAN'DE: ${response}`
  );

  if (dateRound === 15) {
    setTimeout(cutFeed, 900);

  } else {
    setTimeout(() => {
      dateRound++;
      renderDateRound();
    }, 850);
  }
}

function cutFeed() {
  stopMedia();

  setDateText(
    "MICROPHONE OFFLINE\n" +
    "CAMERA OFFLINE\n\n" +

    "YAN'DE: \"That's enough.\"\n\n" +

    "\"I don't need to hear anything else.\"\n\n" +

    "\"And you don't need to see what I'm doing.\"\n\n" +

    "\"Goodnight, Azzy. ♡\""
  );

  clearElement($("#date-options"));

  addDateButton(
    "END DATE",
    () => {
      loadNode("confront");
    }
  );
}

function stopMedia() {
  if (micAnimation) {
    cancelAnimationFrame(
      micAnimation
    );

    micAnimation = null;
  }

  if (micStream) {
    micStream
      .getTracks()
      .forEach(track => track.stop());

    micStream = null;
  }

  if (cameraStream) {
    cameraStream
      .getTracks()
      .forEach(track => track.stop());

    cameraStream = null;
  }

  if (audioContext) {
    audioContext.close()
      .catch(() => {});

    audioContext = null;
  }

  analyser = null;

  $("#camera-preview")
    .classList.remove("visible");

  $("#camera-preview").srcObject =
    null;

  $("#mic-panel")
    .classList.remove("visible");

  $("#mic-fill").style.width =
    "0%";

  $("#mic-percent").textContent =
    "0%";
}


/* =========================================================
   THERAPY
   ========================================================= */

let therapyPairs = [];

let therapyRound = 0;

let currentTherapyPair = [];

let therapyInterval = null;

let therapyTime = 5;

let therapyAnswered = false;

let fakeCalmUsed = false;

function shuffle(array) {
  for (
    let i = array.length - 1;
    i > 0;
    i--
  ) {
    const j =
      Math.floor(
        Math.random() *
        (i + 1)
      );

    [
      array[i],
      array[j]
    ] = [
      array[j],
      array[i]
    ];
  }

  return array;
}

function startTherapy() {
  stopMedia();

  game.insanity = 20;

  therapyRound = 0;

  therapyAnswered = false;

  fakeCalmUsed = false;

  $("#fake-calm")
    .classList.add("hidden");

  showScreen("therapy-screen");

  const selected =
    shuffle(
      [...THERAPY_POOL]
    ).slice(0, 30);

  therapyPairs = [];

  for (
    let i = 0;
    i < selected.length;
    i += 2
  ) {
    therapyPairs.push([
      selected[i],
      selected[i + 1]
    ]);
  }

  updateInsanity();

  $("#therapy-counter")
    .textContent = "SESSION";

  $("#therapy-timer")
    .textContent = "";

  $("#therapy-question")
    .textContent =
      "Good afternoon. I'm Dr. Brighton. " +
      "You can call me Ace if this makes this easier.";

  clearElement(
    $("#therapy-options")
  );

  $("#therapy-options")
    .appendChild(
      makeButton(
        "START SESSION",
        nextTherapyRound
      )
    );
}

function nextTherapyRound() {
  if (therapyRound >= 15) {
    finishTherapy();
    return;
  }

  therapyAnswered = false;

  currentTherapyPair =
    therapyPairs[therapyRound];

  $("#therapy-counter")
    .textContent =
      `QUESTION ${therapyRound + 1} / 15`;

  $("#therapy-question")
    .textContent =
      "Choose what Dr. Brighton asks.";

  clearElement(
    $("#therapy-options")
  );

  currentTherapyPair.forEach(question => {
    $("#therapy-options")
      .appendChild(
        makeButton(
          question.q,
          () => {
            answerTherapy(question);
          }
        )
      );
  });

  therapyTime = 5;

  $("#therapy-timer")
    .textContent =
      "TIME 5.0s";

  stopTherapyTimer();

  therapyInterval =
    setInterval(() => {
      therapyTime =
        Math.max(
          0,
          therapyTime - 0.1
        );

      $("#therapy-timer")
        .textContent =
          `TIME ${therapyTime.toFixed(1)}s`;

      if (therapyTime <= 0) {
        stopTherapyTimer();

        const random =
          currentTherapyPair[
            Math.floor(
              Math.random() *
              currentTherapyPair.length
            )
          ];

        answerTherapy(random);
      }
    }, 100);

  updateFakeCalm();
}

function stopTherapyTimer() {
  if (therapyInterval) {
    clearInterval(
      therapyInterval
    );

    therapyInterval = null;
  }
}

function answerTherapy(question) {
  if (therapyAnswered) return;

  therapyAnswered = true;

  stopTherapyTimer();

  clearElement(
    $("#therapy-options")
  );

  game.insanity =
    Math.max(
      0,
      Math.min(
        100,
        game.insanity +
        question.delta
      )
    );

  const sign =
    question.delta >= 0
      ? "+"
      : "";

  $("#therapy-question")
    .textContent =
      `${question.type} QUESTION\n\n` +
      `${sign}${question.delta}% INSANITY`;

  $("#therapy-timer")
    .textContent = "";

  updateInsanity();

  updateFakeCalm();

  saveGame();

  if (game.insanity >= 100) {
    setTimeout(
      therapyBreakdown,
      750
    );

    return;
  }

  $("#therapy-options")
    .appendChild(
      makeButton(
        "CONTINUE",
        () => {
          therapyRound++;
          nextTherapyRound();
        }
      )
    );
}

function insanityColor(value) {
  if (value <= 19)
    return "#61b7ff";

  if (value <= 39)
    return "#5ee88d";

  if (value <= 59)
    return "#f4d34f";

  if (value <= 79)
    return "#ff9b42";

  if (value <= 89)
    return "#ff546f";

  return "#ff42ac";
}

function updateInsanity() {
  const value =
    Math.round(
      game.insanity
    );

  $("#insanity-fill")
    .style.width =
      `${value}%`;

  $("#insanity-fill")
    .style.background =
      insanityColor(value);

  $("#insanity-label")
    .textContent =
      `YAN'DE INSANITY: ${value}%`;
}

function updateFakeCalm() {
  const button =
    $("#fake-calm");

  const visible =
    game.insanity > 50 &&
    game.insanity < 100 &&
    !fakeCalmUsed;

  button.classList.toggle(
    "hidden",
    !visible
  );
}

$("#fake-calm")
  .addEventListener(
    "click",
    () => {
      if (
        fakeCalmUsed ||
        game.insanity <= 50
      ) {
        return;
      }

      fakeCalmUsed = true;

      game.insanity =
        Math.min(
          100,
          game.insanity + 10
        );

      $("#fake-calm")
        .textContent =
          "THAT DIDN'T HELP. +10%";

      $("#therapy-question")
        .textContent =
          "Yan'De's expression tightens.\n\n" +
          "That didn't help.";

      updateInsanity();

      updateFakeCalm();

      saveGame();

      if (
        game.insanity >= 100
      ) {
        setTimeout(
          therapyBreakdown,
          750
        );
      }
    }
  );

function finishTherapy() {
  stopTherapyTimer();

  if (game.insanity <= 39) {
    loadNode(
      "therapy_success_1"
    );

  } else {
    loadNode(
      "therapy_failure_1"
    );
  }
}

function therapyBreakdown() {
  stopTherapyTimer();

  game.insanity = 100;

  game.ending = "true";

  saveGame();

  showEnding("true");
}


/* =========================================================
   ENDINGS
   ========================================================= */

function showEnding(type) {
  stopMedia();

  stopTherapyTimer();

  const ending =
    ENDINGS[type];

  if (!ending) return;

  game.ending = type;

  saveGame();

  $("#ending-title")
    .textContent =
      ending.title;

  $("#ending-text")
    .textContent =
      ending.text;

  $("#achievement")
    .textContent =
      ending.achievement;

  showScreen("ending-screen");
}

$("#restart-btn")
  .addEventListener(
    "click",
    () => {
      stopMedia();

      stopTherapyTimer();

      localStorage.removeItem(
        "lovesickSave"
      );

      resetGame();

      showScreen(
        "title-screen"
      );
    }
  );


/* =========================================================
   CLEANUP
   ========================================================= */

window.addEventListener(
  "beforeunload",
  () => {
    stopMedia();

    saveGame();
  }
);


/* =========================================================
   START
   ========================================================= */

showScreen("title-screen");

updateAffection();
/* =========================================================
   LOVESICK — PERSISTENT ACHIEVEMENTS + LORE SYSTEM
   Replace the previous achievement block with this one.
   ========================================================= */


/* =========================================================
   ACHIEVEMENT DATA
   ========================================================= */

const LOVESICK_ACHIEVEMENTS = {

  rejection: {
    title:
      "I THOUGHT WE WERE HAVING A NICE DATEEEEE",

    ending:
      "Rejection & Obsession",

    loreTitle:
      "AZZY'S BACKSTORY",

    loreUnlocked:
      true,

    lore: `
BEFORE YAN'DE

Azzy remembers when he was just De.

Not Yan'De.

Not the person who watched their windows.
Not the person who seemed to know where they were before they told him.
Not the person whose affection felt less like warmth and more like a locked door.

Just...

De.


He had been Azzy's boyfriend.

And for a while, things were normal.

Normal enough, anyway.


They would sit together for hours.

Azzy would talk.

De would nod.

Sometimes he'd smile.

Sometimes he'd answer.

But after a while, Azzy started noticing something.

His eyes would drift.

His attention would disappear.

Azzy would tell him about their day and realize halfway through that he hadn't heard most of it.


At first, Azzy ignored it.

Everyone gets distracted.

Everyone has bad days.

Everyone zones out sometimes.


But it kept happening.


AZZY:

"Are you even listening to me?"


DE:

"...What?"


That answer hurt more than Azzy wanted to admit.


It wasn't that De was cruel.

That almost would've been easier.

He was just...

distant.


Azzy wanted him to look at them like they were the most important person in the room.

They wanted him to listen.

To notice.

To care enough that Azzy never had to wonder whether his mind was somewhere else.


And eventually...

Azzy decided they could fix it.


There was one person Azzy knew who might understand.


Ace.


Back then, Ace wasn't just the person Azzy went to when things got bad.

His family had always been... unusual.


Ace's mother was a potion mixer.

Not the cartoon kind.

No bubbling cauldrons or magic wands.

Plants.

Extracts.

Tonics.

Mixtures made from things most people walked past without ever knowing what they could do.


Ace had learned more from her than he liked to admit.


When Azzy explained what was happening, Ace listened quietly.


AZZY:

"I just want him to pay attention to me."


ACE:

"Azzy..."


AZZY:

"I'm not asking for anything crazy."


ACE:

"That's usually what people say before asking me for something crazy."


Azzy didn't laugh.


Eventually, Ace sighed and disappeared into another room.


When he returned, he was holding a small plant.


Nothing about it looked special.


Dark leaves.

Thin stem.

A faintly sweet smell.


Ace placed it on the table between them.


ACE:

"My mother used this in certain mixtures."


Azzy leaned closer.


AZZY:

"What does it do?"


ACE:

"In very small amounts?"

"It strengthens attachment."

"Makes someone more attentive."

"More emotionally focused."


Azzy stared at the plant.


That was exactly what they wanted.


Then Ace's expression changed.


ACE:

"But listen to me."


He pushed the plant farther away from Azzy.


ACE:

"Small amounts."


AZZY:

"Okay."


ACE:

"I'm serious."


AZZY:

"I said okay."


ACE:

"Too much doesn't make somebody love you more."


Azzy looked back at him.


ACE:

"It makes the attachment unstable."


"Possessive."


"Obsessive."


"Dangerous."


For a second, neither of them spoke.


ACE:

"If you're going to use it at all..."

"Use almost nothing."


Azzy promised.


And at the time...

they meant it.


The first amount was tiny.


So tiny Azzy almost thought it hadn't worked.


Then De started texting more.


He remembered things.


Small things.


Things Azzy didn't even remember telling him.


He asked how they slept.

Where they were going.

When they'd be home.


He looked at Azzy when they spoke.


Really looked.


For the first time in months, Azzy felt seen.


So the next time...

they used a little more.


De became more affectionate.


More attentive.


More protective.


Azzy told themselves it was working.


Exactly like they wanted.


So they added more.


And more.


And more.


Ace had said it was dangerous in large amounts.


Azzy knew that.


They simply didn't think they'd reached a large amount yet.


Until De stopped asking where Azzy was going...


and started already knowing.


Until affection became monitoring.


Until concern became suspicion.


Until:


DE:

"Who were you talking to?"


AZZY:

"Ace."


The silence afterward felt wrong.


DE:

"...Why?"


That was the first time Azzy felt afraid of him.


The first time they looked into his eyes and wondered if something behind them had changed.


By then...

it was already too late.


De loved Azzy.


That much was true.


The problem was that somewhere along the way...

love stopped being enough.


And De became...


Yan'De.
`
  },


  institution: {
    title:
      "Crazy? I was crazy once..",

    ending:
      "Ace's Problem Now...",

    loreUnlocked:
      false,

    loreTitle:
      "",

    lore:
      ""
  },


  normal: {
    title:
      "You... Did it?!",

    ending:
      "Yan'De REALLY loves you",

    loreUnlocked:
      false,

    loreTitle:
      "",

    lore:
      ""
  },


  true: {
    title:
      "Killing Me Softly With His Song...",

    ending:
      "TRUE ENDING",

    loreUnlocked:
      false,

    loreTitle:
      "",

    lore:
      ""
  }

};


/* =========================================================
   ACHIEVEMENT SAVE / LOAD
   ========================================================= */

function getUnlockedAchievements() {

  try {

    const saved =
      JSON.parse(
        localStorage.getItem(
          "lovesickAchievements"
        ) || "[]"
      );


    return Array.isArray(saved)
      ? saved
      : [];


  } catch (error) {

    console.warn(
      "Could not load achievements:",
      error
    );


    return [];

  }

}


function saveUnlockedAchievements(list) {

  try {

    localStorage.setItem(
      "lovesickAchievements",
      JSON.stringify(list)
    );


  } catch (error) {

    console.warn(
      "Could not save achievements:",
      error
    );

  }

}


/* =========================================================
   UNLOCK ACHIEVEMENT
   ========================================================= */

function unlockLovesickAchievement(type) {

  if (
    !LOVESICK_ACHIEVEMENTS[type]
  ) {
    return;
  }


  const unlocked =
    getUnlockedAchievements();


  if (
    !unlocked.includes(type)
  ) {

    unlocked.push(type);


    saveUnlockedAchievements(
      unlocked
    );


    console.log(
      "Achievement unlocked:",
      LOVESICK_ACHIEVEMENTS[type]
        .title
    );

  }


  renderMainMenuAchievements();

}


/* =========================================================
   STYLES
   ========================================================= */

function createAchievementStyles() {

  if (
    document.querySelector(
      "#lovesick-achievement-styles"
    )
  ) {
    return;
  }


  const style =
    document.createElement(
      "style"
    );


  style.id =
    "lovesick-achievement-styles";


  style.textContent = `

    #main-menu-achievements {

      width:
        min(560px, 88vw);

      max-height:
        300px;

      overflow-y:
        auto;

      margin:
        24px auto 0;

      padding:
        16px;

      background:
        rgba(0,0,0,0.70);

      border:
        1px solid
        rgba(255,255,255,0.14);

      border-radius:
        14px;

      box-shadow:
        0 12px 35px
        rgba(0,0,0,0.35);

      text-align:
        left;

    }


    #main-menu-achievements h3 {

      margin:
        0 0 12px;

      text-align:
        center;

      font-size:
        15px;

      letter-spacing:
        0.16em;

      color:
        #ff8bb8;

    }


    .menu-achievement {

      display:
        block;

      width:
        100%;

      margin:
        8px 0;

      padding:
        11px 12px;

      border-radius:
        9px;

      border:
        1px solid
        rgba(255,255,255,0.08);

      background:
        rgba(255,255,255,0.035);

      text-align:
        left;

      font-family:
        inherit;

      cursor:
        default;

    }


    .menu-achievement.unlocked {

      color:
        #ffd36a;

      border-color:
        rgba(255,211,106,0.32);

      background:
        rgba(255,211,106,0.07);

    }


    .menu-achievement.lore {

      cursor:
        pointer;

      transition:
        transform 0.15s ease,
        background 0.15s ease;

    }


    .menu-achievement.lore:hover {

      transform:
        translateY(-1px);

      background:
        rgba(255,211,106,0.14);

    }


    .menu-achievement.locked {

      color:
        #686b75;

      opacity:
        0.72;

    }


    .achievement-name {

      display:
        block;

      font-weight:
        800;

      font-size:
        14px;

    }


    .achievement-ending-name {

      display:
        block;

      margin-top:
        4px;

      font-size:
        11px;

      opacity:
        0.72;

    }


    .achievement-lore-hint {

      display:
        block;

      margin-top:
        7px;

      font-size:
        10px;

      color:
        #ff9fc3;

      letter-spacing:
        0.1em;

    }


    #achievement-progress {

      margin-top:
        12px;

      padding-top:
        10px;

      border-top:
        1px solid
        rgba(255,255,255,0.08);

      text-align:
        center;

      font-size:
        12px;

      color:
        #a6adbd;

    }


    #lore-overlay {

      position:
        fixed;

      inset:
        0;

      z-index:
        99999;

      display:
        none;

      align-items:
        center;

      justify-content:
        center;

      padding:
        30px;

      background:
        rgba(4,4,9,0.94);

      backdrop-filter:
        blur(7px);

    }


    #lore-overlay.active {

      display:
        flex;

    }


    #lore-panel {

      width:
        min(850px, 92vw);

      max-height:
        88vh;

      overflow-y:
        auto;

      padding:
        28px;

      border:
        1px solid
        rgba(255,105,170,0.35);

      border-radius:
        16px;

      background:
        #0c0c13;

      box-shadow:
        0 0 70px
        rgba(255,70,150,0.14);

    }


    #lore-panel h2 {

      margin-top:
        0;

      color:
        #ff82b6;

      letter-spacing:
        0.14em;

      text-align:
        center;

    }


    #lore-text {

      white-space:
        pre-wrap;

      line-height:
        1.7;

      color:
        #e9e9ef;

      font-size:
        15px;

    }


    #lore-close {

      display:
        block;

      margin:
        24px auto 0;

      padding:
        11px 25px;

      border:
        1px solid
        #ff75aa;

      border-radius:
        9px;

      background:
        rgba(255,70,140,0.13);

      color:
        white;

      font-weight:
        bold;

      cursor:
        pointer;

    }

  `;


  document.head.appendChild(
    style
  );

}


/* =========================================================
   CREATE LORE OVERLAY
   ========================================================= */

function createLoreOverlay() {

  let overlay =
    document.querySelector(
      "#lore-overlay"
    );


  if (overlay) {
    return overlay;
  }


  overlay =
    document.createElement(
      "div"
    );


  overlay.id =
    "lore-overlay";


  overlay.innerHTML = `

    <div id="lore-panel">

      <h2 id="lore-title">
        BACKSTORY
      </h2>

      <div id="lore-text"></div>

      <button id="lore-close">
        RETURN TO MENU
      </button>

    </div>

  `;


  document.body.appendChild(
    overlay
  );


  overlay
    .querySelector(
      "#lore-close"
    )
    .addEventListener(
      "click",
      closeLore
    );


  overlay.addEventListener(
    "click",
    event => {

      if (
        event.target === overlay
      ) {
        closeLore();
      }

    }
  );


  return overlay;

}


/* =========================================================
   OPEN / CLOSE LORE
   ========================================================= */

function openLore(type) {

  const achievement =
    LOVESICK_ACHIEVEMENTS[type];


  const unlocked =
    getUnlockedAchievements();


  if (
    !achievement ||
    !achievement.loreUnlocked ||
    !unlocked.includes(type)
  ) {
    return;
  }


  createLoreOverlay();


  document.querySelector(
    "#lore-title"
  ).textContent =
    achievement.loreTitle;


  document.querySelector(
    "#lore-text"
  ).textContent =
    achievement.lore.trim();


  document.querySelector(
    "#lore-overlay"
  ).classList.add(
    "active"
  );

}


function closeLore() {

  const overlay =
    document.querySelector(
      "#lore-overlay"
    );


  if (overlay) {

    overlay.classList.remove(
      "active"
    );

  }

}


/* =========================================================
   CREATE ACHIEVEMENT PANEL
   ========================================================= */

function createAchievementPanel() {

  const titleScreen =
    document.querySelector(
      "#title-screen"
    );


  if (!titleScreen) {
    return null;
  }


  let panel =
    document.querySelector(
      "#main-menu-achievements"
    );


  if (panel) {
    return panel;
  }


  panel =
    document.createElement(
      "div"
    );


  panel.id =
    "main-menu-achievements";


  const titleOverlay =
    titleScreen.querySelector(
      ".title-overlay"
    );


  if (titleOverlay) {

    titleOverlay.appendChild(
      panel
    );

  } else {

    titleScreen.appendChild(
      panel
    );

  }


  return panel;

}


/* =========================================================
   RENDER ACHIEVEMENTS
   ========================================================= */

function renderMainMenuAchievements() {

  createAchievementStyles();

  createLoreOverlay();


  const panel =
    createAchievementPanel();


  if (!panel) {
    return;
  }


  const unlocked =
    getUnlockedAchievements();


  panel.innerHTML =
    "<h3>ACHIEVEMENTS</h3>";


  Object.entries(
    LOVESICK_ACHIEVEMENTS
  ).forEach(
    ([key, achievement]) => {

      const hasUnlocked =
        unlocked.includes(key);


      const item =
        document.createElement(
          hasUnlocked &&
          achievement.loreUnlocked
            ? "button"
            : "div"
        );


      item.className =
        "menu-achievement " +
        (
          hasUnlocked
            ? "unlocked"
            : "locked"
        );


      if (
        hasUnlocked &&
        achievement.loreUnlocked
      ) {

        item.classList.add(
          "lore"
        );


        item.addEventListener(
          "click",
          () => {
            openLore(key);
          }
        );

      }


      const name =
        document.createElement(
          "span"
        );


      name.className =
        "achievement-name";


      name.textContent =
        hasUnlocked
          ? "✓ " +
            achievement.title
          : "🔒 ???";


      item.appendChild(
        name
      );


      const ending =
        document.createElement(
          "span"
        );


      ending.className =
        "achievement-ending-name";


      ending.textContent =
        hasUnlocked
          ? achievement.ending
          : "Ending not discovered";


      item.appendChild(
        ending
      );


      if (
        hasUnlocked &&
        achievement.loreUnlocked
      ) {

        const hint =
          document.createElement(
            "span"
          );


        hint.className =
          "achievement-lore-hint";


        hint.textContent =
          "CLICK TO READ UNLOCKED BACKSTORY";


        item.appendChild(
          hint
        );

      }


      panel.appendChild(
        item
      );

    }
  );


  const progress =
    document.createElement(
      "div"
    );


  progress.id =
    "achievement-progress";


  progress.textContent =
    `${unlocked.length} / ${
      Object.keys(
        LOVESICK_ACHIEVEMENTS
      ).length
    } UNLOCKED`;


  panel.appendChild(
    progress
  );

}


/* =========================================================
   CONNECT ACHIEVEMENTS TO ENDINGS
   ========================================================= */

const originalShowEnding =
  showEnding;


showEnding = function(type) {

  unlockLovesickAchievement(
    type
  );


  originalShowEnding(
    type
  );

};


/* =========================================================
   MENU REFRESH
   ========================================================= */

const achievementObserver =
  new MutationObserver(() => {

    const titleScreen =
      document.querySelector(
        "#title-screen"
      );


    if (
      titleScreen &&
      titleScreen.classList.contains(
        "active"
      )
    ) {

      renderMainMenuAchievements();

    }

  });


achievementObserver.observe(
  document.body,
  {
    attributes:
      true,

    subtree:
      true,

    attributeFilter:
      ["class"]
  }
);


/* =========================================================
   INITIALIZE
   ========================================================= */

createAchievementStyles();

createLoreOverlay();

renderMainMenuAchievements();
/* =========================================================
   LOVESICK — SECRET ACE ENDING
   "I Don't Fucking Care."
   NON-CANON ENDING
   ========================================================= */

(() => {

  /* =======================================================
     CONFIG
     ======================================================= */

const ACE_SECRET_SPOTIFY =
  "https://open.spotify.com/playlist/3nCF8s7mwRV7xrEAWZANgY?si=4olAdPrKQamoK5HqcPQWuw";

  /* =======================================================
     SECRET ROUTE STATE

     Rules:
     - Yan'De loyalty MUST stay at exactly 0%.
     - If it EVER rises above 0, route is permanently ruined.
     - Therapy must finish below 30% insanity.
     ======================================================= */

  let secretLoyaltyClean = true;

  let secretTherapyQualified = false;

  let secretRunStarted = false;


  /* =======================================================
     ADD SECRET ACHIEVEMENT
     ======================================================= */

  if (
    typeof LOVESICK_ACHIEVEMENTS !==
    "undefined"
  ) {

    LOVESICK_ACHIEVEMENTS.secret_ace = {

      title:
        "I can be a better boyfriend than him...",

      ending:
        "I Don't Fucking Care.",

      /*
         We mark this as clickable so
         the existing achievement menu
         treats it like bonus content.
      */

      loreUnlocked:
        true,

      loreTitle:
        "ACE'S PLAYLIST",

      lore:
        "A playlist has been unlocked."

    };

  }


  /* =======================================================
     ADD SECRET ENDING
     ======================================================= */

  if (
    typeof ENDINGS !==
    "undefined"
  ) {

    ENDINGS.secret_ace = {

      title:
        "I Don't Fucking Care.",

      text: `
The session ends quietly.

Too quietly.

Yan'De's breathing has finally slowed.

His hands aren't shaking anymore.

For once, Ace doesn't look relieved.


AZZY:

"So... that's it?"


ACE:

"For him?"

"Yeah."


Azzy looks through the glass.

Yan'De sits on the other side of the room.

Calm.

Stable.

For the first time in what feels like forever...

manageable.


AZZY:

"You actually did it."


Ace doesn't answer.


AZZY:

"Ace?"


He keeps staring at the clipboard in his hands.


ACE:

"You never chose him."


AZZY:

"What?"


ACE:

"Not really."


Azzy frowns.


ACE:

"The entire time."

"Every chance you had..."

"You kept him at a distance."


Azzy shifts uncomfortably.


AZZY:

"I thought that's what you wanted."


Ace laughs once.

There is no humor in it.


ACE:

"It was."


Silence.


ACE:

"I spent years telling myself I was doing the right thing."


Azzy's expression changes.


AZZY:

"...Years?"


Ace finally looks at them.


ACE:

"I watched you date him."


"I watched you complain about him."


"I watched you come to me every time he disappointed you."


"I listened."


"I helped."


"I fixed things."


His grip tightens around the clipboard.


ACE:

"And every single time..."

"You went back to him."


AZZY:

"Ace."


ACE:

"No."


His voice is calm.

Almost frighteningly calm.


ACE:

"You don't get to say my name like that now."


Azzy takes a step backward.


AZZY:

"You're scaring me."


Ace goes still.


For one brief second...

he looks ashamed.


Then it disappears.


ACE:

"He got everything."


AZZY:

"What are you talking about?"


ACE:

"Your attention."


"Your affection."


"Your patience."


"Even after everything he became."


Ace looks through the glass at Yan'De.


ACE:

"And me?"


He laughs again.


ACE:

"I got to clean up after him."


AZZY:

"You're my friend."


Ace's eyes close.


That answer seems to hurt him more than anything else could have.


ACE:

"Yeah."


A long silence.


ACE:

"I know."


Azzy reaches for the door.


It doesn't open.


They try again.


Click.


Locked.


AZZY:

"Ace."


He doesn't move.


AZZY:

"Unlock the door."


ACE:

"No."


AZZY:

"This isn't funny."


ACE:

"I know."


Azzy turns around slowly.


ACE:

"I've been patient for years."


AZZY:

"You don't get to do this."


ACE:

"I know."


AZZY:

"You don't get to decide who I belong with."


ACE:

"I know."


His voice cracks.

Just barely.


AZZY:

"Then let me go."


Ace stares at them.


For several seconds, neither of them moves.


Then Ace removes his glasses.

Sets them carefully on the desk.

And says:


ACE:

"I don't fucking care."


The lights outside the office shut off one by one.


AZZY:

"...Ace?"


ACE:

"He had his chance."


Another lock clicks somewhere behind them.


ACE:

"I can be better than him."


AZZY:

"Ace, please."


He looks at Azzy with the same terrible devotion
he spent years condemning in Yan'De.


ACE:

"I can be a better boyfriend than him."


The screen goes black.


NON-CANON ENDING

Sometimes the person warning you about the monster
is only angry because the monster got there first.
`,

      achievement:
        "I can be a better boyfriend than him..."

    };

  }


  /* =======================================================
     START OF A NEW RUN

     Clicking START resets the secret route.
     ======================================================= */

  const startButton =
    document.querySelector(
      "#start-btn"
    );


  if (startButton) {

    startButton.addEventListener(
      "click",
      () => {

        secretRunStarted = true;

        secretLoyaltyClean = true;

        secretTherapyQualified = false;


        console.log(
          "[SECRET ROUTE] New run started."
        );

      }
    );

  }


  /* =======================================================
     WATCH YAN'DE'S LOYALTY BAR

     The instant it EVER rises above 0,
     this playthrough becomes ineligible.

     It doesn't matter if it later returns to 0.
     ======================================================= */

  const loyaltyBar =
    document.querySelector(
      "#relationship-fill"
    );


  function checkSecretLoyalty() {

    if (
      !secretRunStarted ||
      !secretLoyaltyClean
    ) {
      return;
    }


    /*
       First try the actual game variable.
       The current LOVESICK web build uses
       affection as Yan'De's relationship stat.
    */

    let value = 0;


    if (
      typeof game !==
        "undefined" &&
      typeof game.affection ===
        "number"
    ) {

      value =
        game.affection;

    } else if (loyaltyBar) {

      /*
         Fallback:
         Read the visual bar width.
      */

      const width =
        loyaltyBar.style.width || "0%";


      value =
        parseFloat(width) || 0;

    }


    if (value > 0) {

      secretLoyaltyClean = false;


      console.log(
        "[SECRET ROUTE] FAILED: " +
        "Yan'De's loyalty increased."
      );

    }

  }


  /*
     Check repeatedly because some story
     choices change loyalty without causing
     an obvious screen transition.
  */

  window.setInterval(
    checkSecretLoyalty,
    250
  );


  /* =======================================================
     WATCH THERAPY SESSION

     We only qualify when all 15 rounds
     are finished AND insanity is < 30%.
     ======================================================= */

  const therapyCounter =
    document.querySelector(
      "#therapy-counter"
    );


  const insanityLabel =
    document.querySelector(
      "#insanity-label"
    );


  function readInsanity() {

    /*
       Prefer the actual game state.
    */

    if (
      typeof game !==
        "undefined" &&
      typeof game.yande_insanity ===
        "number"
    ) {

      return game.yande_insanity;

    }


    /*
       Fallback:
       pull percentage from visible label.
    */

    if (insanityLabel) {

      const match =
        insanityLabel.textContent.match(
          /(\d+(?:\.\d+)?)/
        );


      if (match) {

        return parseFloat(
          match[1]
        );

      }

    }


    return null;

  }


  function checkTherapyCompletion() {

    if (
      !therapyCounter ||
      !secretRunStarted
    ) {
      return;
    }


    const text =
      therapyCounter
        .textContent
        .trim();


    /*
       Handles formats such as:

       15 / 15
       15/15
       ROUND 15 / 15
       QUESTION 15 OF 15
    */

    const finished =
      /15\s*\/\s*15/i.test(text) ||
      /15\s+of\s+15/i.test(text);


    if (!finished) {
      return;
    }


    /*
       Give the game a moment to apply
       the final insanity adjustment.
    */

    window.setTimeout(
      () => {

        const insanity =
          readInsanity();


        if (
          insanity !== null &&
          insanity < 30 &&
          secretLoyaltyClean
        ) {

          secretTherapyQualified =
            true;


          console.log(
            "[SECRET ROUTE] QUALIFIED!",
            {
              loyaltyNeverRaised:
                secretLoyaltyClean,

              finalInsanity:
                insanity
            }
          );

        } else {

          secretTherapyQualified =
            false;


          console.log(
            "[SECRET ROUTE] Therapy " +
            "requirements not met.",
            {
              loyaltyNeverRaised:
                secretLoyaltyClean,

              finalInsanity:
                insanity
            }
          );

        }

      },
      100
    );

  }


  if (therapyCounter) {

    const therapyObserver =
      new MutationObserver(
        checkTherapyCompletion
      );


    therapyObserver.observe(
      therapyCounter,
      {
        childList: true,
        subtree: true,
        characterData: true
      }
    );

  }


  /* =======================================================
     INTERCEPT THE NORMAL ENDING

     If the secret requirements were met,
     replace the ending the game was about
     to show with secret_ace.
     ======================================================= */

  if (
    typeof showEnding ===
    "function"
  ) {

    const showEndingBeforeAceSecret =
      showEnding;


    showEnding = function(type) {

      if (
        secretRunStarted &&
        secretLoyaltyClean &&
        secretTherapyQualified &&
        type !== "secret_ace"
      ) {

        /*
           Consume the qualification so
           the secret ending can't fire twice.
        */

        secretTherapyQualified =
          false;


        console.log(
          "[SECRET ROUTE] " +
          "ACE ENDING ACTIVATED."
        );


        return showEndingBeforeAceSecret(
          "secret_ace"
        );

      }


      return showEndingBeforeAceSecret(
        type
      );

    };

  }


  /* =======================================================
     SECRET ACHIEVEMENT → SPOTIFY

     The existing achievement system calls
     openLore(type) when a clickable
     achievement is selected.

     For this achievement, we send the player
     to the playlist instead.
     ======================================================= */

  if (
    typeof openLore ===
    "function"
  ) {

    const originalOpenLore =
      openLore;


    openLore = function(type) {

      if (
        type === "secret_ace"
      ) {

        if (
          ACE_SECRET_SPOTIFY ===
          "PASTE_YOUR_SPOTIFY_PLAYLIST_LINK_HERE"
        ) {

          alert(
            "Spotify playlist link " +
            "hasn't been added yet!"
          );

          return;
        }


        window.open(
          ACE_SECRET_SPOTIFY,
          "_blank",
          "noopener,noreferrer"
        );


        return;

      }


      originalOpenLore(type);

    };

  }


  /* =======================================================
     REFRESH ACHIEVEMENT MENU

     Makes the fifth hidden achievement
     appear in the achievement collection.
     ======================================================= */

  if (
    typeof renderMainMenuAchievements ===
    "function"
  ) {

    renderMainMenuAchievements();

  }


  console.log(
    "[LOVESICK] Secret Ace ending loaded."
  );

})();
/* =========================================================
   LOVESICK — UNIVERSAL CONTROLS + MINIGAME MENU
   ---------------------------------------------------------
   Adds:
   - Touch / Mobile controls
   - Keyboard controls
   - Controller / Gamepad controls
   - Persistent control preference
   - Persistent minigame unlocks
   - Main-menu minigame launcher

   Paste this at the VERY BOTTOM of game.js.
   ========================================================= */

(() => {

  "use strict";


  /* =======================================================
     STORAGE
     ======================================================= */

  const CONTROL_STORAGE_KEY =
    "lovesickControlDevice";

  const MINIGAME_STORAGE_KEY =
    "lovesickUnlockedMinigames";


  /* =======================================================
     CONTROL MODES
     ======================================================= */

  const CONTROL_MODES = {
    touch: "Touch / Mobile",
    keyboard: "Keyboard",
    controller: "Controller"
  };


  let currentControlMode =
    localStorage.getItem(
      CONTROL_STORAGE_KEY
    ) || "touch";


  if (!CONTROL_MODES[currentControlMode]) {
    currentControlMode = "touch";
  }


  /* =======================================================
     MINIGAME DEFINITIONS
     ======================================================= */

  const LOVESICK_MINIGAMES = {

    dinner: {
      name:
        "Yan'De Dinner Date",

      description:
        "Replay Yan'De's increasingly strange dinner date.",

      unlocked:
        false
    },


    therapy: {
      name:
        "Therapy Session",

      description:
        "Play as Ace and attempt to stabilize Yan'De.",

      unlocked:
        false
    },


    fight: {
      name:
        "Ace vs. Yan'De",

      description:
        "A confrontation between Ace and Yan'De.",

      unlocked:
        false
    }

  };


  /* =======================================================
     LOAD / SAVE MINIGAMES
     ======================================================= */

  function getUnlockedMinigames() {

    try {

      const data =
        JSON.parse(
          localStorage.getItem(
            MINIGAME_STORAGE_KEY
          ) || "[]"
        );


      return Array.isArray(data)
        ? data
        : [];

    } catch (error) {

      console.warn(
        "Could not load minigames:",
        error
      );

      return [];

    }

  }


  function saveUnlockedMinigames(list) {

    localStorage.setItem(
      MINIGAME_STORAGE_KEY,
      JSON.stringify(list)
    );

  }


  function unlockMinigame(id) {

    if (!LOVESICK_MINIGAMES[id]) {
      return;
    }


    const unlocked =
      getUnlockedMinigames();


    if (!unlocked.includes(id)) {

      unlocked.push(id);

      saveUnlockedMinigames(
        unlocked
      );


      console.log(
        `[LOVESICK] Minigame unlocked: ${id}`
      );

    }


    renderMinigameMenu();

  }


  /*
     Expose this globally so future
     minigames can unlock themselves with:

        unlockLovesickMinigame("fight");
  */

  window.unlockLovesickMinigame =
    unlockMinigame;


  /* =======================================================
     CONTROL MENU STYLES
     ======================================================= */

  function createUniversalControlStyles() {

    if (
      document.querySelector(
        "#lovesick-universal-control-styles"
      )
    ) {
      return;
    }


    const style =
      document.createElement("style");


    style.id =
      "lovesick-universal-control-styles";


    style.textContent = `

      /* ===============================================
         CONTROL SELECTOR
         =============================================== */

      #lovesick-control-panel {

        width:
          min(420px, 88vw);

        margin:
          18px auto 0;

        padding:
          12px 14px;

        border:
          1px solid
          rgba(255,255,255,0.12);

        border-radius:
          12px;

        background:
          rgba(0,0,0,0.55);

        text-align:
          center;

      }


      #lovesick-control-panel label {

        display:
          block;

        margin-bottom:
          7px;

        color:
          #ff9fc5;

        font-size:
          11px;

        font-weight:
          800;

        letter-spacing:
          0.14em;

      }


      #lovesick-control-select {

        width:
          100%;

        padding:
          10px;

        border:
          1px solid
          rgba(255,120,175,0.5);

        border-radius:
          8px;

        background:
          #101018;

        color:
          white;

        font:
          inherit;

        cursor:
          pointer;

      }


      #lovesick-control-help {

        margin-top:
          8px;

        min-height:
          15px;

        font-size:
          10px;

        line-height:
          1.4;

        color:
          #aeb2c2;

      }



      /* ===============================================
         MINIGAME MENU
         =============================================== */

      #lovesick-minigames-panel {

        width:
          min(520px, 88vw);

        max-height:
          260px;

        overflow-y:
          auto;

        margin:
          16px auto 0;

        padding:
          15px;

        border:
          1px solid
          rgba(255,255,255,0.12);

        border-radius:
          13px;

        background:
          rgba(0,0,0,0.62);

      }


      #lovesick-minigames-panel h3 {

        margin:
          0 0 10px;

        text-align:
          center;

        color:
          #ff88b7;

        font-size:
          14px;

        letter-spacing:
          0.15em;

      }


      .lovesick-minigame-button {

        width:
          100%;

        margin:
          6px 0;

        padding:
          11px;

        border-radius:
          9px;

        font:
          inherit;

        text-align:
          left;

      }


      .lovesick-minigame-button.unlocked {

        cursor:
          pointer;

        color:
          #fff;

        border:
          1px solid
          rgba(255,120,180,0.4);

        background:
          rgba(255,80,145,0.10);

      }


      .lovesick-minigame-button.unlocked:hover,
      .lovesick-minigame-button.control-selected {

        border-color:
          #ff83b7;

        background:
          rgba(255,80,145,0.22);

        transform:
          translateY(-1px);

      }


      .lovesick-minigame-button.locked {

        cursor:
          default;

        color:
          #656977;

        border:
          1px solid
          rgba(255,255,255,0.06);

        background:
          rgba(255,255,255,0.025);

      }


      .minigame-title {

        display:
          block;

        font-weight:
          800;

      }


      .minigame-description {

        display:
          block;

        margin-top:
          4px;

        font-size:
          10px;

        opacity:
          0.72;

      }



      /* ===============================================
         KEYBOARD / CONTROLLER SELECTION
         =============================================== */

      .control-selected {

        outline:
          2px solid
          rgba(255,120,180,0.95) !important;

        outline-offset:
          2px;

        box-shadow:
          0 0 18px
          rgba(255,80,150,0.30);

      }



      /* ===============================================
         CONTROL HINT
         =============================================== */

      #lovesick-input-hint {

        position:
          fixed;

        left:
          50%;

        bottom:
          8px;

        transform:
          translateX(-50%);

        z-index:
          99990;

        padding:
          5px 11px;

        border-radius:
          20px;

        background:
          rgba(0,0,0,0.72);

        color:
          #bcbfca;

        font-size:
          10px;

        pointer-events:
          none;

        opacity:
          0.8;

      }

    `;


    document.head.appendChild(
      style
    );

  }


  /* =======================================================
     CONTROL DEVICE DROPDOWN
     ======================================================= */

  function createControlSelector() {

    const titleScreen =
      document.querySelector(
        "#title-screen"
      );


    if (!titleScreen) {
      return;
    }


    if (
      document.querySelector(
        "#lovesick-control-panel"
      )
    ) {
      updateControlHelp();
      return;
    }


    const panel =
      document.createElement(
        "div"
      );


    panel.id =
      "lovesick-control-panel";


    panel.innerHTML = `

      <label for="lovesick-control-select">
        CONTROL DEVICE
      </label>

      <select id="lovesick-control-select">

        <option value="touch">
          Touch / Mobile
        </option>

        <option value="keyboard">
          Keyboard
        </option>

        <option value="controller">
          Controller
        </option>

      </select>

      <div id="lovesick-control-help"></div>

    `;


    const overlay =
      titleScreen.querySelector(
        ".title-overlay"
      );


    if (overlay) {

      overlay.appendChild(
        panel
      );

    } else {

      titleScreen.appendChild(
        panel
      );

    }


    const select =
      panel.querySelector(
        "#lovesick-control-select"
      );


    select.value =
      currentControlMode;


    select.addEventListener(
      "change",
      () => {

        currentControlMode =
          select.value;


        localStorage.setItem(
          CONTROL_STORAGE_KEY,
          currentControlMode
        );


        clearCurrentSelection();

        updateControlHelp();

        updateInputHint();


        console.log(
          "[LOVESICK] Controls:",
          currentControlMode
        );

      }
    );


    updateControlHelp();

  }


  function updateControlHelp() {

    const help =
      document.querySelector(
        "#lovesick-control-help"
      );


    if (!help) {
      return;
    }


    if (
      currentControlMode ===
      "touch"
    ) {

      help.textContent =
        "Tap dialogue and buttons directly.";

    }


    else if (
      currentControlMode ===
      "keyboard"
    ) {

      help.textContent =
        "Arrow Keys / WASD: Select • Enter / Space: Confirm";

    }


    else {

      help.textContent =
        "D-Pad / Left Stick: Select • A / Cross: Confirm • B / Circle: Back";

    }

  }


  /* =======================================================
     INPUT HINT
     ======================================================= */

  function createInputHint() {

    if (
      document.querySelector(
        "#lovesick-input-hint"
      )
    ) {
      return;
    }


    const hint =
      document.createElement(
        "div"
      );


    hint.id =
      "lovesick-input-hint";


    document.body.appendChild(
      hint
    );


    updateInputHint();

  }


  function updateInputHint() {

    const hint =
      document.querySelector(
        "#lovesick-input-hint"
      );


    if (!hint) {
      return;
    }


    if (
      currentControlMode ===
      "touch"
    ) {

      hint.textContent =
        "TOUCH: TAP TO SELECT";

    }


    else if (
      currentControlMode ===
      "keyboard"
    ) {

      hint.textContent =
        "KEYBOARD: ↑ ↓ / W S • ENTER";

    }


    else {

      hint.textContent =
        "CONTROLLER: D-PAD / STICK • A";

    }

  }


  /* =======================================================
     FIND CURRENT INTERACTIVE BUTTONS

     This searches the currently visible screen.

     It works with:
     - Story choices
     - Date choices
     - Therapy choices
     - Menu buttons
     - Achievement buttons
     - Minigame buttons
     ======================================================= */

  function isElementVisible(element) {

    if (!element) {
      return false;
    }


    const style =
      window.getComputedStyle(
        element
      );


    if (
      style.display === "none" ||
      style.visibility === "hidden" ||
      parseFloat(style.opacity) === 0
    ) {
      return false;
    }


    const rect =
      element.getBoundingClientRect();


    return (
      rect.width > 0 &&
      rect.height > 0
    );

  }


  function getInteractiveElements() {

    const selectors = [

      "button:not([disabled])",

      "#choices > *",

      "#date-options > *",

      "#therapy-options > *",

      ".menu-achievement.lore",

      ".lovesick-minigame-button.unlocked"

    ];


    const found =
      Array.from(
        document.querySelectorAll(
          selectors.join(",")
        )
      );


    return found.filter(
      element => {

        if (!isElementVisible(element)) {
          return false;
        }


        /*
           Ignore control device dropdown.
           It already works natively.
        */

        if (
          element.closest(
            "#lovesick-control-panel"
          )
        ) {
          return false;
        }


        return true;

      }
    );

  }


  /* =======================================================
     SELECTION SYSTEM
     ======================================================= */

  let selectedIndex = -1;

  let lastElements = [];


  function clearCurrentSelection() {

    document
      .querySelectorAll(
        ".control-selected"
      )
      .forEach(
        element =>
          element.classList.remove(
            "control-selected"
          )
      );


    selectedIndex = -1;

    lastElements = [];

  }


  function refreshSelection() {

    const elements =
      getInteractiveElements();


    if (!elements.length) {

      clearCurrentSelection();

      return [];

    }


    /*
       Screen changed.
    */

    const changed =
      elements.length !==
        lastElements.length ||

      elements.some(
        (element, index) =>
          element !==
          lastElements[index]
      );


    if (changed) {

      clearCurrentSelection();

      lastElements =
        elements;


      selectedIndex = 0;

    }


    selectedIndex =
      Math.max(
        0,
        Math.min(
          selectedIndex,
          elements.length - 1
        )
      );


    elements.forEach(
      (element, index) => {

        element.classList.toggle(
          "control-selected",
          index === selectedIndex
        );

      }
    );


    return elements;

  }


  function moveSelection(direction) {

    const elements =
      getInteractiveElements();


    if (!elements.length) {
      return;
    }


    /*
       Re-establish list if screen changed.
    */

    const changed =
      elements.length !==
        lastElements.length ||

      elements.some(
        (element, index) =>
          element !==
          lastElements[index]
      );


    if (changed) {

      lastElements =
        elements;

      selectedIndex =
        direction > 0
          ? 0
          : elements.length - 1;

    } else {

      selectedIndex +=
        direction;


      if (
        selectedIndex >=
        elements.length
      ) {

        selectedIndex = 0;

      }


      if (
        selectedIndex < 0
      ) {

        selectedIndex =
          elements.length - 1;

      }

    }


    elements.forEach(
      (element, index) => {

        element.classList.toggle(
          "control-selected",
          index === selectedIndex
        );

      }
    );


    const current =
      elements[selectedIndex];


    if (current) {

      current.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });

    }

  }


  function activateSelection() {

    let elements =
      getInteractiveElements();


    if (!elements.length) {

      /*
         If there are no buttons visible,
         Enter/A can advance dialogue.
      */

      advanceDialogue();

      return;
    }


    if (
      selectedIndex < 0 ||
      selectedIndex >=
        elements.length
    ) {

      selectedIndex = 0;

    }


    const target =
      elements[selectedIndex];


    if (target) {

      target.click();

      window.setTimeout(
        refreshSelection,
        50
      );

    }

  }


  /* =======================================================
     DIALOGUE ADVANCE

     Keyboard Space/Enter and controller A
     can click the current dialogue box.
     ======================================================= */

  function advanceDialogue() {

    const candidates = [

      document.querySelector(
        "#dialogue-box"
      ),

      document.querySelector(
        "#dialogue-text"
      ),

      document.querySelector(
        "#date-question"
      ),

      document.querySelector(
        "#therapy-question"
      )

    ];


    const target =
      candidates.find(
        isElementVisible
      );


    if (target) {

      target.click();

    }

  }


  /* =======================================================
     BACK BUTTON
     ======================================================= */

  function controllerBack() {

    /*
       Close lore first.
    */

    const loreOverlay =
      document.querySelector(
        "#lore-overlay.active"
      );


    if (loreOverlay) {

      const close =
        document.querySelector(
          "#lore-close"
        );


      if (close) {
        close.click();
      }

      return;
    }


    /*
       Otherwise don't accidentally back
       out of a story choice.

       Future menus can hook into this.
    */

    console.log(
      "[LOVESICK] Back button pressed."
    );

  }


  /* =======================================================
     KEYBOARD CONTROLS
     ======================================================= */

  document.addEventListener(
    "keydown",
    event => {

      if (
        currentControlMode !==
        "keyboard"
      ) {
        return;
      }


      /*
         Don't hijack typing player's name
         or using the control selector.
      */

      const tag =
        document.activeElement
          ?.tagName
          ?.toLowerCase();


      if (
        tag === "input" ||
        tag === "textarea" ||
        tag === "select"
      ) {
        return;
      }


      const key =
        event.key.toLowerCase();


      if (
        key === "arrowdown" ||
        key === "arrowright" ||
        key === "s" ||
        key === "d"
      ) {

        event.preventDefault();

        moveSelection(1);

        return;

      }


      if (
        key === "arrowup" ||
        key === "arrowleft" ||
        key === "w" ||
        key === "a"
      ) {

        event.preventDefault();

        moveSelection(-1);

        return;

      }


      if (
        key === "enter" ||
        key === " "
      ) {

        event.preventDefault();

        activateSelection();

        return;

      }


      if (
        key === "escape"
      ) {

        event.preventDefault();

        controllerBack();

      }

    }
  );


  /* =======================================================
     TOUCH CONTROLS

     Your game's buttons already respond to clicks.
     This makes touchscreen usage explicitly update
     selection state as well.
     ======================================================= */

  document.addEventListener(
    "pointerdown",
    event => {

      if (
        currentControlMode !==
        "touch"
      ) {
        return;
      }


      const target =
        event.target.closest(
          "button, #choices > *, #date-options > *, #therapy-options > *"
        );


      if (!target) {
        return;
      }


      clearCurrentSelection();


      target.classList.add(
        "control-selected"
      );

    },
    {
      passive: true
    }
  );


  /* =======================================================
     CONTROLLER SUPPORT — GAMEPAD API
     ======================================================= */

  let gamepadConnected = false;


  /*
     Prevent one held button from repeatedly
     moving through twenty options per second.
  */

  const gamepadState = {

    up: false,
    down: false,
    left: false,
    right: false,

    confirm: false,
    back: false

  };


  window.addEventListener(
    "gamepadconnected",
    event => {

      gamepadConnected = true;


      console.log(
        "[LOVESICK] Controller connected:",
        event.gamepad.id
      );


      if (
        currentControlMode ===
        "controller"
      ) {

        updateInputHint();

      }

    }
  );


  window.addEventListener(
    "gamepaddisconnected",
    event => {

      gamepadConnected = false;


      console.log(
        "[LOVESICK] Controller disconnected:",
        event.gamepad.id
      );

    }
  );


  function pressedOnce(
    name,
    pressed,
    callback
  ) {

    if (
      pressed &&
      !gamepadState[name]
    ) {

      callback();

    }


    gamepadState[name] =
      pressed;

  }


  function pollGamepad() {

    if (
      currentControlMode ===
      "controller"
    ) {

      const pads =
        navigator.getGamepads
          ? navigator.getGamepads()
          : [];


      const pad =
        Array.from(pads)
          .find(Boolean);


      if (pad) {

        /*
           Standard mapping:

           Button 0 = A / Cross
           Button 1 = B / Circle

           12 = D-pad Up
           13 = D-pad Down
           14 = D-pad Left
           15 = D-pad Right

           axes[0] = left stick horizontal
           axes[1] = left stick vertical
        */


        const stickX =
          pad.axes?.[0] || 0;


        const stickY =
          pad.axes?.[1] || 0;


        const deadzone =
          0.55;


        const up =
          !!pad.buttons?.[12]?.pressed ||
          stickY < -deadzone;


        const down =
          !!pad.buttons?.[13]?.pressed ||
          stickY > deadzone;


        const left =
          !!pad.buttons?.[14]?.pressed ||
          stickX < -deadzone;


        const right =
          !!pad.buttons?.[15]?.pressed ||
          stickX > deadzone;


        const confirm =
          !!pad.buttons?.[0]?.pressed;


        const back =
          !!pad.buttons?.[1]?.pressed;


        pressedOnce(
          "down",
          down,
          () => moveSelection(1)
        );


        pressedOnce(
          "right",
          right,
          () => moveSelection(1)
        );


        pressedOnce(
          "up",
          up,
          () => moveSelection(-1)
        );


        pressedOnce(
          "left",
          left,
          () => moveSelection(-1)
        );


        pressedOnce(
          "confirm",
          confirm,
          activateSelection
        );


        pressedOnce(
          "back",
          back,
          controllerBack
        );

      }

    }


    requestAnimationFrame(
      pollGamepad
    );

  }


  requestAnimationFrame(
    pollGamepad
  );


  /* =======================================================
     MAIN-MENU MINIGAME PANEL
     ======================================================= */

  function createMinigamePanel() {

    const titleScreen =
      document.querySelector(
        "#title-screen"
      );


    if (!titleScreen) {
      return null;
    }


    let panel =
      document.querySelector(
        "#lovesick-minigames-panel"
      );


    if (panel) {
      return panel;
    }


    panel =
      document.createElement(
        "div"
      );


    panel.id =
      "lovesick-minigames-panel";


    const overlay =
      titleScreen.querySelector(
        ".title-overlay"
      );


    if (overlay) {

      overlay.appendChild(
        panel
      );

    } else {

      titleScreen.appendChild(
        panel
      );

    }


    return panel;

  }


  function renderMinigameMenu() {

    const panel =
      createMinigamePanel();


    if (!panel) {
      return;
    }


    const unlocked =
      getUnlockedMinigames();


    panel.innerHTML =
      "<h3>MINIGAMES</h3>";


    Object.entries(
      LOVESICK_MINIGAMES
    ).forEach(
      ([id, data]) => {

        const available =
          unlocked.includes(id);


        const button =
          document.createElement(
            "button"
          );


        button.className =
          "lovesick-minigame-button " +
          (
            available
              ? "unlocked"
              : "locked"
          );


        if (available) {

          button.innerHTML = `

            <span class="minigame-title">
              ✓ ${data.name}
            </span>

            <span class="minigame-description">
              ${data.description}
            </span>

          `;


          button.addEventListener(
            "click",
            () => {

              launchMinigame(
                id
              );

            }
          );

        } else {

          button.innerHTML = `

            <span class="minigame-title">
              🔒 ???
            </span>

            <span class="minigame-description">
              Discover this minigame during the story.
            </span>

          `;


          button.disabled =
            true;

        }


        panel.appendChild(
          button
        );

      }
    );


    clearCurrentSelection();

  }


  /* =======================================================
     MINIGAME LAUNCHER
     ======================================================= */

  function tryFunction(names) {

    for (
      const name of names
    ) {

      if (
        typeof window[name] ===
        "function"
      ) {

        console.log(
          `[LOVESICK] Launching using ${name}()`
        );


        window[name]();

        return true;

      }

    }


    return false;

  }


  function launchMinigame(id) {

    clearCurrentSelection();


    /* ---------------------------------------------------
       DINNER DATE
       --------------------------------------------------- */

    if (id === "dinner") {

      /*
         First try the known/likely
         dinner minigame functions.
      */

      if (
        tryFunction([
          "startDateGame",
          "startDinnerDate",
          "beginDateGame",
          "startDate"
        ])
      ) {
        return;
      }


      /*
         Fallback for current LOVESICK build:
         open date screen and attempt to
         render the first question.
      */

      if (
        typeof window.showScreen ===
        "function"
      ) {

        window.showScreen(
          "date-screen"
        );


        tryFunction([
          "renderDateQuestion",
          "showDateQuestion",
          "nextDateQuestion"
        ]);


        return;

      }


      console.error(
        "Could not launch Dinner Date."
      );

    }



    /* ---------------------------------------------------
       THERAPY SESSION
       --------------------------------------------------- */

    if (id === "therapy") {

      if (
        tryFunction([
          "startTherapy",
          "startTherapySession",
          "beginTherapy"
        ])
      ) {
        return;
      }


      if (
        typeof window.showScreen ===
        "function"
      ) {

        window.showScreen(
          "therapy-screen"
        );


        tryFunction([
          "renderTherapyRound",
          "showTherapyRound",
          "nextTherapyRound"
        ]);


        return;

      }


      console.error(
        "Could not launch Therapy Session."
      );

    }



    /* ---------------------------------------------------
       ACE VS YAN'DE
       --------------------------------------------------- */

    if (id === "fight") {

      if (
        tryFunction([
          "startAceYandeFight",
          "startFightMinigame",
          "beginAceFight"
        ])
      ) {
        return;
      }


      alert(
        "Ace vs. Yan'De has been unlocked, " +
        "but the fight minigame code has not " +
        "been installed yet."
      );

    }

  }


  window.launchLovesickMinigame =
    launchMinigame;


  /* =======================================================
     AUTOMATIC ROUTE UNLOCK DETECTION
     ======================================================= */

  /*
     We watch screen changes.

     The first time the story itself reaches
     Date or Therapy, that minigame becomes
     permanently available from the menu.
  */

  let previousVisibleScreen = null;


  function detectMinigameRoute() {

    const dateScreen =
      document.querySelector(
        "#date-screen"
      );


    const therapyScreen =
      document.querySelector(
        "#therapy-screen"
      );


    const fightScreen =
      document.querySelector(
        "#fight-screen"
      );


    /*
       Your current CSS may use:
       .active
       OR hide screens with display:none.

       isElementVisible handles either.
    */


    if (
      dateScreen &&
      isElementVisible(dateScreen)
    ) {

      if (
        previousVisibleScreen !==
        "date"
      ) {

        unlockMinigame(
          "dinner"
        );


        previousVisibleScreen =
          "date";

      }


      return;

    }


    if (
      therapyScreen &&
      isElementVisible(
        therapyScreen
      )
    ) {

      if (
        previousVisibleScreen !==
        "therapy"
      ) {

        unlockMinigame(
          "therapy"
        );


        previousVisibleScreen =
          "therapy";

      }


      return;

    }


    if (
      fightScreen &&
      isElementVisible(
        fightScreen
      )
    ) {

      if (
        previousVisibleScreen !==
        "fight"
      ) {

        unlockMinigame(
          "fight"
        );


        previousVisibleScreen =
          "fight";

      }


      return;

    }


    previousVisibleScreen =
      null;

  }


  /*
     Watch DOM class/style changes caused
     by showScreen().
  */

  const routeObserver =
    new MutationObserver(
      () => {

        detectMinigameRoute();

      }
    );


  routeObserver.observe(
    document.body,
    {
      subtree: true,

      attributes: true,

      attributeFilter: [
        "class",
        "style"
      ]
    }
  );


  /*
     Backup detector in case a screen change
     doesn't alter classes in a way the
     observer catches.
  */

  window.setInterval(
    detectMinigameRoute,
    500
  );


  /* =======================================================
     NAME ENTRY — KEYBOARD / CONTROLLER SAFETY

     The player's keyboard still needs to
     type their fake name normally.
     Controller A can submit once focus
     leaves the field.
     ======================================================= */

  const nameInput =
    document.querySelector(
      "#name-input"
    );


  if (nameInput) {

    nameInput.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Enter"
        ) {

          const submit =
            document.querySelector(
              "#name-submit"
            );


          if (submit) {

            event.preventDefault();

            submit.click();

          }

        }

      }
    );

  }


  /* =======================================================
     REFRESH CONTROLS WHEN SCREEN CHANGES
     ======================================================= */

  const selectionObserver =
    new MutationObserver(
      () => {

        if (
          currentControlMode !==
          "touch"
        ) {

          window.setTimeout(
            refreshSelection,
            30
          );

        }

      }
    );


  selectionObserver.observe(
    document.body,
    {
      subtree: true,

      childList: true,

      attributes: true,

      attributeFilter: [
        "class",
        "style"
      ]
    }
  );


  /* =======================================================
     INITIALIZE
     ======================================================= */

  createUniversalControlStyles();

  createControlSelector();

  createInputHint();

  renderMinigameMenu();

  detectMinigameRoute();


  console.log(
    "[LOVESICK] Universal controls loaded."
  );


  console.log(
    "[LOVESICK] Current control device:",
    currentControlMode
  );

})();
/* =========================================================
   LOVESICK — ACE VS. YAN'DE FIGHT MINIGAME
   ========================================================= */

(() => {

  "use strict";

  /* =======================================================
     SETTINGS
     ======================================================= */

  const FIGHT_UNLOCK_KEY =
    "lovesickUnlockedMinigames";

  const CONTROL_KEY =
    "lovesickControlDevice";

  const PERFECT_FIGHT_KEY =
    "lovesickPerfectFightUnlocked";

  const RESPONSE_TIME =
    1500;


  /* =======================================================
     STATE
     ======================================================= */

  let fightActive = false;

  let fightFinished = false;

  let aceHP = 100;

  let yandeStamina = 100;

  let aceDamageTaken = 0;

  let roundNumber = 0;

  let currentTell = null;

  let responseTimer = null;

  let responseLocked = false;

  let storyFightAlreadyPlayed = false;

  let bypassFightOnce = false;

  let pendingTherapyModifier = 0;

  let gamepadPrevious = {
    block: false,
    dodge: false,
    counter: false,
    continue: false
  };


  /* =======================================================
     FIGHT DATA
     ======================================================= */

  const FIGHT_TELLS = [

    {
      key: "block",
      tell:
        "Yan'De lowers his shoulder and charges straight at Ace.",
      hint:
        "He is committing to the hit."
    },

    {
      key: "dodge",
      tell:
        "Yan'De shifts his weight forward, ready to grab Ace.",
      hint:
        "Getting out of his reach might be smarter."
    },

    {
      key: "counter",
      tell:
        "Yan'De swings too wide and leaves himself completely open.",
      hint:
        "Ace has one clean opening."
    }

  ];


  const FIGHT_DIALOGUE = {

    intro: [
      ["Yan'De",
       "You really like pretending you're their hero, don't you?"],

      ["Ace",
       "No. I just happen to be the guy telling you 'no.'"],

      ["Yan'De",
       "Move."],

      ["Ace",
       "Make me."]
    ],

    middle: [
      ["Yan'De",
       "How long have you wanted them?"],

      ["Ace",
       "This isn't about me."],

      ["Yan'De",
       "That's not an answer."],

      ["Ace",
       "Keep talking. Makes you predictable."]
    ],

    secretForeshadow: [
      ["Yan'De",
       "You look at Azzy exactly like I do."],

      ["Ace",
       "Shut up."],

      ["Yan'De",
       "There it is."]
    ]

  };


  /* =======================================================
     CSS
     ======================================================= */

  function installFightStyles() {

    if (
      document.querySelector(
        "#lovesick-fight-styles"
      )
    ) {
      return;
    }


    const style =
      document.createElement("style");


    style.id =
      "lovesick-fight-styles";


    style.textContent = `

      #fight-screen {

        position:
          fixed;

        inset:
          0;

        z-index:
          90000;

        display:
          none;

        flex-direction:
          column;

        align-items:
          center;

        justify-content:
          center;

        box-sizing:
          border-box;

        padding:
          22px;

        background:
          radial-gradient(
            circle at center,
            #24101b 0%,
            #0b0910 60%,
            #030305 100%
          );

        color:
          white;

        overflow-y:
          auto;

      }


      #fight-screen.active {

        display:
          flex;

      }


      #fight-title {

        margin:
          0 0 5px;

        font-size:
          clamp(24px, 5vw, 44px);

        letter-spacing:
          0.08em;

        color:
          #ff7eab;

      }


      #fight-subtitle {

        margin-bottom:
          18px;

        color:
          #a9a5af;

        font-size:
          12px;

        letter-spacing:
          0.12em;

      }


      #fight-arena {

        width:
          min(850px, 94vw);

        padding:
          20px;

        border:
          1px solid
          rgba(255,100,150,0.35);

        border-radius:
          16px;

        background:
          rgba(0,0,0,0.65);

        box-shadow:
          0 20px 60px
          rgba(0,0,0,0.55);

      }


      .fight-stat-name {

        display:
          flex;

        justify-content:
          space-between;

        margin:
          8px 0 5px;

        font-size:
          12px;

        font-weight:
          bold;

      }


      .fight-meter {

        width:
          100%;

        height:
          14px;

        border-radius:
          20px;

        overflow:
          hidden;

        background:
          #25232b;

        border:
          1px solid
          rgba(255,255,255,0.1);

      }


      #ace-health-fill,
      #yande-stamina-fill {

        height:
          100%;

        width:
          100%;

        transition:
          width 0.3s ease;

      }


      #ace-health-fill {

        background:
          linear-gradient(
            90deg,
            #5aa9ff,
            #8bc9ff
          );

      }


      #yande-stamina-fill {

        background:
          linear-gradient(
            90deg,
            #ff4b94,
            #ff94be
          );

      }


      #fight-dialogue {

        min-height:
          75px;

        margin-top:
          18px;

        padding:
          14px;

        border-radius:
          10px;

        background:
          rgba(255,255,255,0.045);

        line-height:
          1.5;

      }


      #fight-speaker {

        display:
          block;

        margin-bottom:
          5px;

        color:
          #ff8fba;

        font-weight:
          900;

      }


      #fight-tell {

        margin-top:
          16px;

        min-height:
          78px;

        padding:
          14px;

        border:
          1px solid
          rgba(255,255,255,0.1);

        border-radius:
          10px;

        background:
          #111018;

        text-align:
          center;

      }


      #fight-tell-main {

        display:
          block;

        font-weight:
          bold;

        font-size:
          15px;

      }


      #fight-tell-hint {

        display:
          block;

        margin-top:
          7px;

        font-size:
          11px;

        color:
          #999ba7;

      }


      #fight-timer-track {

        height:
          5px;

        margin-top:
          12px;

        overflow:
          hidden;

        background:
          #25232b;

        border-radius:
          6px;

      }


      #fight-timer-fill {

        width:
          100%;

        height:
          100%;

        background:
          #ff5b97;

      }


      #fight-actions {

        display:
          grid;

        grid-template-columns:
          repeat(3, 1fr);

        gap:
          10px;

        margin-top:
          16px;

      }


      .fight-action {

        padding:
          15px 8px;

        border:
          1px solid
          rgba(255,115,170,0.5);

        border-radius:
          10px;

        background:
          rgba(255,80,145,0.08);

        color:
          white;

        text-align:
          center;

        font-weight:
          900;

        cursor:
          pointer;

        user-select:
          none;

        touch-action:
          manipulation;

      }


      .fight-action:hover {

        background:
          rgba(255,80,145,0.20);

      }


      .fight-action:active {

        transform:
          scale(0.97);

      }


      .fight-action.disabled {

        pointer-events:
          none;

        opacity:
          0.35;

      }


      .fight-key {

        display:
          block;

        margin-top:
          5px;

        color:
          #aaa8b2;

        font-size:
          9px;

        font-weight:
          normal;

      }


      #fight-result {

        margin-top:
          15px;

        min-height:
          24px;

        text-align:
          center;

        font-weight:
          bold;

        color:
          #ffd1e1;

      }


      #fight-continue {

        display:
          none;

        width:
          min(360px, 90%);

        margin:
          18px auto 0;

        padding:
          14px;

        border:
          1px solid
          #ff75aa;

        border-radius:
          10px;

        background:
          rgba(255,80,145,0.17);

        text-align:
          center;

        font-weight:
          900;

        cursor:
          pointer;

        user-select:
          none;

      }


      #fight-continue.visible {

        display:
          block;

      }


      @media (max-width: 650px) {

        #fight-actions {

          grid-template-columns:
            1fr;

        }

      }

    `;


    document.head.appendChild(
      style
    );

  }


  /* =======================================================
     CREATE SCREEN
     ======================================================= */

  function createFightScreen() {

    if (
      document.querySelector(
        "#fight-screen"
      )
    ) {
      return;
    }


    const screen =
      document.createElement("section");


    screen.id =
      "fight-screen";


    screen.innerHTML = `

      <h1 id="fight-title">
        THERAPEUTIC INTERVENTION
      </h1>

      <div id="fight-subtitle">
        ACE vs. YAN'DE
      </div>


      <div id="fight-arena">

        <div class="fight-stat-name">
          <span>ACE</span>
          <span id="ace-health-text">
            100 HP
          </span>
        </div>

        <div class="fight-meter">
          <div id="ace-health-fill"></div>
        </div>


        <div class="fight-stat-name">
          <span>YAN'DE</span>
          <span id="yande-stamina-text">
            100 STAMINA
          </span>
        </div>

        <div class="fight-meter">
          <div id="yande-stamina-fill"></div>
        </div>


        <div id="fight-dialogue">

          <span id="fight-speaker">
            ACE
          </span>

          <span id="fight-dialogue-text">
            ...
          </span>

        </div>


        <div id="fight-tell">

          <span id="fight-tell-main">
            Watch Yan'De.
          </span>

          <span id="fight-tell-hint">
            Read his movement before choosing.
          </span>

          <div id="fight-timer-track">
            <div id="fight-timer-fill"></div>
          </div>

        </div>


        <div id="fight-actions">

          <div
            class="fight-action"
            data-fight-action="block"
            role="button"
            tabindex="0"
          >
            BLOCK

            <span class="fight-key">
              Keyboard A • Controller X / Square
            </span>
          </div>


          <div
            class="fight-action"
            data-fight-action="dodge"
            role="button"
            tabindex="0"
          >
            DODGE

            <span class="fight-key">
              Keyboard S • Controller A / Cross
            </span>
          </div>


          <div
            class="fight-action"
            data-fight-action="counter"
            role="button"
            tabindex="0"
          >
            COUNTER

            <span class="fight-key">
              Keyboard D • Controller B / Circle
            </span>
          </div>

        </div>


        <div id="fight-result"></div>


        <div
          id="fight-continue"
          role="button"
          tabindex="0"
        >
          CONTINUE TO THERAPY
        </div>

      </div>

    `;


    document.body.appendChild(
      screen
    );


    screen
      .querySelectorAll(
        "[data-fight-action]"
      )
      .forEach(
        element => {

          element.addEventListener(
            "click",
            () => {

              chooseFightAction(
                element.dataset
                  .fightAction
              );

            }
          );


          element.addEventListener(
            "keydown",
            event => {

              if (
                event.key ===
                  "Enter" ||
                event.key === " "
              ) {

                event.preventDefault();

                chooseFightAction(
                  element.dataset
                    .fightAction
                );

              }

            }
          );

        }
      );


    document
      .querySelector(
        "#fight-continue"
      )
      .addEventListener(
        "click",
        continueToTherapy
      );

  }


  /* =======================================================
     HELPERS
     ======================================================= */

  function setFightDialogue(
    speaker,
    text
  ) {

    const speakerBox =
      document.querySelector(
        "#fight-speaker"
      );


    const textBox =
      document.querySelector(
        "#fight-dialogue-text"
      );


    if (speakerBox) {

      speakerBox.textContent =
        speaker;

    }


    if (textBox) {

      textBox.textContent =
        text;

    }

  }


  function updateFightMeters() {

    aceHP =
      Math.max(
        0,
        Math.min(100, aceHP)
      );


    yandeStamina =
      Math.max(
        0,
        Math.min(
          100,
          yandeStamina
        )
      );


    document.querySelector(
      "#ace-health-fill"
    ).style.width =
      `${aceHP}%`;


    document.querySelector(
      "#yande-stamina-fill"
    ).style.width =
      `${yandeStamina}%`;


    document.querySelector(
      "#ace-health-text"
    ).textContent =
      `${aceHP} HP`;


    document.querySelector(
      "#yande-stamina-text"
    ).textContent =
      `${yandeStamina} STAMINA`;

  }


  function setActionsEnabled(
    enabled
  ) {

    document
      .querySelectorAll(
        ".fight-action"
      )
      .forEach(
        element => {

          element.classList.toggle(
            "disabled",
            !enabled
          );

        }
      );

  }


  function unlockFightReplay() {

    try {

      const unlocked =
        JSON.parse(
          localStorage.getItem(
            FIGHT_UNLOCK_KEY
          ) || "[]"
        );


      const list =
        Array.isArray(unlocked)
          ? unlocked
          : [];


      if (
        !list.includes("fight")
      ) {

        list.push("fight");


        localStorage.setItem(
          FIGHT_UNLOCK_KEY,
          JSON.stringify(list)
        );

      }


      if (
        typeof window
          .unlockLovesickMinigame ===
        "function"
      ) {

        window
          .unlockLovesickMinigame(
            "fight"
          );

      }

    } catch (error) {

      console.warn(
        "Fight unlock error:",
        error
      );

    }

  }


  /* =======================================================
     INTRO
     ======================================================= */

  async function playFightIntro() {

    setActionsEnabled(false);


    for (
      const [speaker, text]
      of FIGHT_DIALOGUE.intro
    ) {

      if (!fightActive) {
        return;
      }


      setFightDialogue(
        speaker,
        text
      );


      await wait(850);

    }


    if (fightActive) {

      beginFightRound();

    }

  }


  function wait(ms) {

    return new Promise(
      resolve =>
        setTimeout(
          resolve,
          ms
        )
    );

  }


  /* =======================================================
     BEGIN FIGHT
     ======================================================= */

  function startAceYandeFight() {

    if (fightActive) {
      return;
    }


    installFightStyles();

    createFightScreen();

    unlockFightReplay();


    fightActive = true;

    fightFinished = false;

    responseLocked = true;

    aceHP = 100;

    yandeStamina = 100;

    aceDamageTaken = 0;

    roundNumber = 0;

    currentTell = null;


    clearTimeout(
      responseTimer
    );


    const fightScreen =
      document.querySelector(
        "#fight-screen"
      );


    fightScreen.classList.add(
      "active"
    );


    document.querySelector(
      "#fight-continue"
    ).classList.remove(
      "visible"
    );


    document.querySelector(
      "#fight-result"
    ).textContent =
      "";


    updateFightMeters();


    playFightIntro();

  }


  window.startAceYandeFight =
    startAceYandeFight;


  /* =======================================================
     ROUND
     ======================================================= */

  function beginFightRound() {

    if (
      !fightActive ||
      fightFinished
    ) {
      return;
    }


    roundNumber++;

    responseLocked = false;


    currentTell =
      FIGHT_TELLS[
        Math.floor(
          Math.random() *
          FIGHT_TELLS.length
        )
      ];


    setActionsEnabled(true);


    document.querySelector(
      "#fight-tell-main"
    ).textContent =
      currentTell.tell;


    document.querySelector(
      "#fight-tell-hint"
    ).textContent =
      currentTell.hint;


    document.querySelector(
      "#fight-result"
    ).textContent =
      `ROUND ${roundNumber}`;


    startResponseTimer();


    /*
       Character dialogue during fight.
    */

    if (roundNumber === 3) {

      setFightDialogue(
        "Yan'De",
        "How long have you wanted them?"
      );

    }


    if (roundNumber === 5) {

      setFightDialogue(
        "Yan'De",
        "You look at Azzy exactly like I do."
      );

    }

  }


  /* =======================================================
     RESPONSE TIMER
     ======================================================= */

  function startResponseTimer() {

    clearTimeout(
      responseTimer
    );


    const fill =
      document.querySelector(
        "#fight-timer-fill"
      );


    fill.style.transition =
      "none";


    fill.style.width =
      "100%";


    requestAnimationFrame(
      () => {

        requestAnimationFrame(
          () => {

            fill.style.transition =
              `width ${RESPONSE_TIME}ms linear`;

            fill.style.width =
              "0%";

          }
        );

      }
    );


    responseTimer =
      setTimeout(
        () => {

          if (
            !responseLocked &&
            fightActive
          ) {

            handleFightTimeout();

          }

        },
        RESPONSE_TIME
      );

  }


  /* =======================================================
     PLAYER ACTION
     ======================================================= */

  function chooseFightAction(
    action
  ) {

    if (
      !fightActive ||
      fightFinished ||
      responseLocked ||
      !currentTell
    ) {
      return;
    }


    responseLocked = true;


    clearTimeout(
      responseTimer
    );


    setActionsEnabled(false);


    const correct =
      action ===
      currentTell.key;


    if (correct) {

      handleCorrectAction(
        action
      );

    } else {

      handleWrongAction(
        action
      );

    }


    updateFightMeters();


    setTimeout(
      checkFightState,
      650
    );

  }


  /* =======================================================
     CORRECT ACTION
     ======================================================= */

  function handleCorrectAction(
    action
  ) {

    let damage = 0;


    if (
      action === "block"
    ) {

      damage = 12;

      setFightDialogue(
        "Ace",
        "You're telegraphing."
      );


      document.querySelector(
        "#fight-result"
      ).textContent =
        "PERFECT BLOCK — Yan'De loses 12 stamina.";

    }


    if (
      action === "dodge"
    ) {

      damage = 15;

      setFightDialogue(
        "Yan'De",
        "Stand still!"
      );


      document.querySelector(
        "#fight-result"
      ).textContent =
        "CLEAN DODGE — Yan'De loses 15 stamina.";

    }


    if (
      action === "counter"
    ) {

      damage = 25;

      setFightDialogue(
        "Ace",
        "Too slow."
      );


      document.querySelector(
        "#fight-result"
      ).textContent =
        "COUNTER — Yan'De loses 25 stamina.";

    }


    yandeStamina -=
      damage;

  }


  /* =======================================================
     WRONG ACTION
     ======================================================= */

  function handleWrongAction(
    action
  ) {

    const damage =
      13 +
      Math.floor(
        Math.random() * 7
      );


    aceHP -=
      damage;


    aceDamageTaken +=
      damage;


    if (
      roundNumber >= 5
    ) {

      setFightDialogue(
        "Yan'De",
        "See? You're not so different from me."
      );

    } else {

      setFightDialogue(
        "Yan'De",
        "Got you."
      );

    }


    document.querySelector(
      "#fight-result"
    ).textContent =
      `BAD READ — Ace loses ${damage} HP.`;


    /*
       Even a bad choice exhausts Yan'De
       slightly.
    */

    yandeStamina -= 4;

  }


  /* =======================================================
     TIMEOUT
     ======================================================= */

  function handleFightTimeout() {

    responseLocked = true;

    setActionsEnabled(false);


    const damage =
      18;


    aceHP -=
      damage;


    aceDamageTaken +=
      damage;


    setFightDialogue(
      "Yan'De",
      "Hesitating?"
    );


    document.querySelector(
      "#fight-result"
    ).textContent =
      "TOO SLOW — Ace takes 18 damage.";


    updateFightMeters();


    setTimeout(
      checkFightState,
      650
    );

  }


  /* =======================================================
     CHECK WIN / LOSS
     ======================================================= */

  function checkFightState() {

    if (!fightActive) {
      return;
    }


    if (
      yandeStamina <= 0
    ) {

      finishFight(
        "win"
      );

      return;
    }


    if (
      aceHP <= 0
    ) {

      finishFight(
        "loss"
      );

      return;
    }


    beginFightRound();

  }


  /* =======================================================
     PERFECT FIGHT ACHIEVEMENT
     ======================================================= */

  function unlockPerfectFight() {

    localStorage.setItem(
      PERFECT_FIGHT_KEY,
      "true"
    );


    /*
       Add achievement dynamically if the
       achievement system is available.
    */

    try {

      if (
        typeof LOVESICK_ACHIEVEMENTS !==
        "undefined"
      ) {

        LOVESICK_ACHIEVEMENTS
          .perfect_fight = {

            title:
              "DO NO HARM*",

            ending:
              "*Terms and conditions may apply.",

            loreUnlocked:
              false,

            loreTitle:
              "",

            lore:
              ""

          };


        if (
          typeof
            unlockLovesickAchievement ===
          "function"
        ) {

          unlockLovesickAchievement(
            "perfect_fight"
          );

        }

      }

    } catch (error) {

      console.warn(
        "Perfect fight achievement:",
        error
      );

    }

  }


  /* =======================================================
     END FIGHT
     ======================================================= */

  async function finishFight(
    result
  ) {

    fightFinished = true;

    responseLocked = true;

    setActionsEnabled(false);

    clearTimeout(
      responseTimer
    );


    const perfect =
      result === "win" &&
      aceDamageTaken === 0;


    if (result === "win") {

      pendingTherapyModifier =
        -8;


      setFightDialogue(
        "Yan'De",
        "..."
      );


      document.querySelector(
        "#fight-result"
      ).textContent =
        "ACE WINS — Yan'De starts Therapy at -8% insanity.";


      await wait(700);


      if (perfect) {

        unlockPerfectFight();


        setFightDialogue(
          "Yan'De",
          "...You've done this before."
        );


        await wait(800);


        setFightDialogue(
          "Ace",
          "I told you to stop."
        );


        await wait(800);


        setFightDialogue(
          "Yan'De",
          "No. You told me you were a therapist."
        );


        await wait(800);


        setFightDialogue(
          "Ace",
          "I'm allowed to have hobbies."
        );


        document.querySelector(
          "#fight-result"
        ).textContent =
          "PERFECT FIGHT — Achievement unlocked: DO NO HARM*";

      }

    } else {

      pendingTherapyModifier =
        8;


      setFightDialogue(
        "Yan'De",
        "You're supposed to be the one helping me?"
      );


      document.querySelector(
        "#fight-result"
      ).textContent =
        "ACE LOSES — Yan'De starts Therapy at +8% insanity.";

    }


    document.querySelector(
      "#fight-continue"
    ).classList.add(
      "visible"
    );

  }


  /* =======================================================
     CONTINUE TO THERAPY
     ======================================================= */

  function continueToTherapy() {

    if (
      !fightFinished
    ) {
      return;
    }


    fightActive = false;


    document.querySelector(
      "#fight-screen"
    ).classList.remove(
      "active"
    );


    bypassFightOnce = true;


    /*
       Therapy was already entered by the
       story before we intercepted it.

       Bring it back.
    */

    const therapyScreen =
      document.querySelector(
        "#therapy-screen"
      );


    if (
      typeof window.showScreen ===
      "function"
    ) {

      window.showScreen(
        "therapy-screen"
      );

    } else if (therapyScreen) {

      document
        .querySelectorAll(
          ".screen"
        )
        .forEach(
          screen =>
            screen.classList.remove(
              "active"
            )
        );


      therapyScreen.classList.add(
        "active"
      );

    }


    /*
       Wait until Therapy has initialized,
       then apply the fight result.
    */

    setTimeout(
      applyFightTherapyModifier,
      250
    );

  }


  /* =======================================================
     THERAPY MODIFIER
     ======================================================= */

  function applyFightTherapyModifier() {

    if (
      pendingTherapyModifier === 0
    ) {
      return;
    }


    try {

      if (
        typeof game !==
          "undefined" &&
        typeof game
          .yande_insanity ===
          "number"
      ) {

        game.yande_insanity =
          Math.max(
            0,
            Math.min(
              100,
              game.yande_insanity +
              pendingTherapyModifier
            )
          );


        const value =
          game.yande_insanity;


        const fill =
          document.querySelector(
            "#insanity-fill"
          );


        const label =
          document.querySelector(
            "#insanity-label"
          );


        if (fill) {

          fill.style.width =
            `${value}%`;

        }


        if (label) {

          label.textContent =
            `${value}% INSANITY`;

        }


        console.log(
          "[FIGHT] Therapy insanity modifier:",
          pendingTherapyModifier,
          "New value:",
          value
        );

      }

    } catch (error) {

      console.warn(
        "Could not apply fight modifier:",
        error
      );

    }


    pendingTherapyModifier =
      0;

  }


  /* =======================================================
     KEYBOARD CONTROLS

     Capture phase prevents the universal
     menu handler from also reacting.
     ======================================================= */

  document.addEventListener(
    "keydown",
    event => {

      if (!fightActive) {
        return;
      }


      const mode =
        localStorage.getItem(
          CONTROL_KEY
        ) || "touch";


      if (
        mode !== "keyboard"
      ) {
        return;
      }


      const key =
        event.key.toLowerCase();


      if (
        !fightFinished &&
        ["a", "s", "d"].includes(
          key
        )
      ) {

        event.preventDefault();

        event.stopImmediatePropagation();


        if (key === "a") {

          chooseFightAction(
            "block"
          );

        }


        if (key === "s") {

          chooseFightAction(
            "dodge"
          );

        }


        if (key === "d") {

          chooseFightAction(
            "counter"
          );

        }


        return;

      }


      if (
        fightFinished &&
        (
          key === "enter" ||
          key === " "
        )
      ) {

        event.preventDefault();

        event.stopImmediatePropagation();

        continueToTherapy();

      }

    },
    true
  );


  /* =======================================================
     GAMEPAD CONTROLS
     ======================================================= */

  function pollFightGamepad() {

    if (
      fightActive &&
      (
        localStorage.getItem(
          CONTROL_KEY
        ) === "controller"
      )
    ) {

      const pads =
        navigator.getGamepads
          ? navigator.getGamepads()
          : [];


      const pad =
        Array.from(pads)
          .find(Boolean);


      if (pad) {

        /*
           Standard browser gamepad mapping:

           0 = A / Cross
           1 = B / Circle
           2 = X / Square
        */

        const block =
          !!pad.buttons?.[2]
            ?.pressed;


        const dodge =
          !!pad.buttons?.[0]
            ?.pressed;


        const counter =
          !!pad.buttons?.[1]
            ?.pressed;


        if (!fightFinished) {

          if (
            block &&
            !gamepadPrevious.block
          ) {

            chooseFightAction(
              "block"
            );

          }


          if (
            dodge &&
            !gamepadPrevious.dodge
          ) {

            chooseFightAction(
              "dodge"
            );

          }


          if (
            counter &&
            !gamepadPrevious.counter
          ) {

            chooseFightAction(
              "counter"
            );

          }

        } else {

          if (
            dodge &&
            !gamepadPrevious.continue
          ) {

            continueToTherapy();

          }

        }


        gamepadPrevious.block =
          block;

        gamepadPrevious.dodge =
          dodge;

        gamepadPrevious.counter =
          counter;

        gamepadPrevious.continue =
          dodge;

      }

    }


    requestAnimationFrame(
      pollFightGamepad
    );

  }


  requestAnimationFrame(
    pollFightGamepad
  );


  /* =======================================================
     STORY INTEGRATION

     The first time the STORY reaches Therapy,
     intercept it and run the fight.

     Standalone Therapy replay bypasses it.
     ======================================================= */

  function elementVisible(
    element
  ) {

    if (!element) {
      return false;
    }


    const style =
      getComputedStyle(
        element
      );


    const rect =
      element
        .getBoundingClientRect();


    return (
      style.display !== "none" &&
      style.visibility !== "hidden" &&
      rect.width > 0 &&
      rect.height > 0
    );

  }


  let therapyWasVisible =
    false;


  function watchTherapyRoute() {

    const therapyScreen =
      document.querySelector(
        "#therapy-screen"
      );


    if (!therapyScreen) {
      return;
    }


    const visible =
      elementVisible(
        therapyScreen
      );


    /*
       Only trigger on the transition
       from hidden → visible.
    */

    if (
      visible &&
      !therapyWasVisible
    ) {

      if (bypassFightOnce) {

        bypassFightOnce =
          false;

      } else if (
        !storyFightAlreadyPlayed &&
        !fightActive
      ) {

        storyFightAlreadyPlayed =
          true;


        /*
           Hide Therapy while fighting.
        */

        therapyScreen
          .classList.remove(
            "active"
          );


        therapyScreen.style.display =
          "none";


        startAceYandeFight();

      }

    }


    /*
       Remove temporary inline hiding once
       the fight has finished.
    */

    if (
      !fightActive &&
      therapyScreen.style
        .display === "none" &&
      storyFightAlreadyPlayed
    ) {

      therapyScreen.style.display =
        "";

    }


    therapyWasVisible =
      elementVisible(
        therapyScreen
      );

  }


  setInterval(
    watchTherapyRoute,
    200
  );


  /* =======================================================
     STANDALONE THERAPY REPLAY FIX

     When Therapy is launched directly from
     MINIGAMES, don't insert the fight.
     ======================================================= */

  if (
    typeof window
      .launchLovesickMinigame ===
    "function"
  ) {

    const originalLauncher =
      window
        .launchLovesickMinigame;


    window
      .launchLovesickMinigame =
      function(id) {

        if (
          id === "therapy"
        ) {

          bypassFightOnce =
            true;

        }


        return originalLauncher(
          id
        );

      };

  }


  /* =======================================================
     INITIALIZE
     ======================================================= */

  installFightStyles();

  createFightScreen();


  console.log(
    "[LOVESICK] Ace vs. Yan'De fight installed."
  );

})();
/* =========================================================
   LOVESICK — FONT / TITLE GLITCH SYSTEM
   ========================================================= */

(() => {

  "use strict";


  /* =======================================================
     LOAD FONTS
     ======================================================= */

  /*
     Comfortaa = primary game font.

     Anton is included only as a fallback for systems
     that do not have Microsoft's Impact installed.
     If Impact exists, the browser uses Impact first.
  */

  if (
    !document.querySelector(
      "#lovesick-font-import"
    )
  ) {

    const fontLink =
      document.createElement("link");

    fontLink.id =
      "lovesick-font-import";

    fontLink.rel =
      "stylesheet";

    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Anton&family=Comfortaa:wght@300;400;500;600;700&display=swap";

    document.head.appendChild(
      fontLink
    );

  }


  /* =======================================================
     FONT STACKS
     ======================================================= */

  const COMFORTAA_FONT =
    `"Comfortaa", sans-serif`;

  const IMPACT_FONT =
    `Impact, Haettenschweiler, "Arial Narrow Bold", "Anton", sans-serif`;


  /* =======================================================
     CSS
     ======================================================= */

  if (
    !document.querySelector(
      "#lovesick-font-styles"
    )
  ) {

    const style =
      document.createElement("style");

    style.id =
      "lovesick-font-styles";

    style.textContent = `

      /* ===============================================
         ENTIRE GAME DEFAULT
         =============================================== */

      html,
      body,
      button,
      input,
      select,
      textarea,
      #game {

        font-family:
          "Comfortaa",
          sans-serif;

      }


      /*
         Explicitly force every screen except
         the title menu to Comfortaa.
      */

      #name-screen,
      #vn-screen,
      #date-screen,
      #therapy-screen,
      #fight-screen,
      #ending-screen,

      #name-screen *,
      #vn-screen *,
      #date-screen *,
      #therapy-screen *,
      #fight-screen *,
      #ending-screen * {

        font-family:
          "Comfortaa",
          sans-serif;

      }



      /* ===============================================
         TITLE SCREEN — REFRESH FONT
         =============================================== */

      #title-screen.title-font-comfortaa,
      #title-screen.title-font-comfortaa
      button,
      #title-screen.title-font-comfortaa
      select,
      #title-screen.title-font-comfortaa
      option,
      #title-screen.title-font-comfortaa
      label,
      #title-screen.title-font-comfortaa
      div,
      #title-screen.title-font-comfortaa
      span,
      #title-screen.title-font-comfortaa
      p {

        font-family:
          "Comfortaa",
          sans-serif;

      }


      #title-screen.title-font-impact,
      #title-screen.title-font-impact
      button,
      #title-screen.title-font-impact
      select,
      #title-screen.title-font-impact
      option,
      #title-screen.title-font-impact
      label,
      #title-screen.title-font-impact
      div,
      #title-screen.title-font-impact
      span,
      #title-screen.title-font-impact
      p {

        font-family:
          Impact,
          Haettenschweiler,
          "Arial Narrow Bold",
          "Anton",
          sans-serif;

      }



      /* ===============================================
         MAIN LOVESICK TITLE

         This OVERRIDES whichever refresh font
         the rest of the title screen received.
         =============================================== */

      .lovesick-glitch-title {

        position:
          relative;

        display:
          inline-block;

        font-family:
          "Comfortaa",
          sans-serif !important;

        animation:
          lovesick-title-font-glitch
          2.25s
          steps(1, end)
          infinite;

        transform-origin:
          center;

        will-change:
          transform,
          text-shadow;

      }



      /* ===============================================
         FONT SWITCH + VISUAL GLITCH
         =============================================== */

      @keyframes lovesick-title-font-glitch {

        0% {

          font-family:
            "Comfortaa",
            sans-serif;

          transform:
            translate(0, 0)
            skew(0deg);

          text-shadow:
            none;

        }


        12% {

          font-family:
            "Comfortaa",
            sans-serif;

        }


        13% {

          font-family:
            Impact,
            Haettenschweiler,
            "Arial Narrow Bold",
            "Anton",
            sans-serif;

          transform:
            translate(-2px, 1px)
            skew(-2deg);

          text-shadow:
            3px 0 #ff3e8a,
            -3px 0 #63b7ff;

        }


        17% {

          font-family:
            "Comfortaa",
            sans-serif;

          transform:
            translate(1px, -1px);

          text-shadow:
            -2px 0 #ff3e8a,
            2px 0 #63b7ff;

        }


        19% {

          font-family:
            Impact,
            Haettenschweiler,
            "Arial Narrow Bold",
            "Anton",
            sans-serif;

          transform:
            translate(0, 0);

          text-shadow:
            none;

        }


        34% {

          font-family:
            Impact,
            Haettenschweiler,
            "Arial Narrow Bold",
            "Anton",
            sans-serif;

        }


        35% {

          font-family:
            "Comfortaa",
            sans-serif;

          transform:
            translate(2px, 0)
            skew(1deg);

          text-shadow:
            2px 0 #ff3e8a;

        }


        38% {

          font-family:
            Impact,
            Haettenschweiler,
            "Arial Narrow Bold",
            "Anton",
            sans-serif;

          transform:
            translate(-1px, 1px);

          text-shadow:
            -2px 0 #63b7ff;

        }


        41% {

          font-family:
            "Comfortaa",
            sans-serif;

          transform:
            translate(0, 0);

          text-shadow:
            none;

        }


        58% {

          font-family:
            "Comfortaa",
            sans-serif;

        }


        59% {

          font-family:
            Impact,
            Haettenschweiler,
            "Arial Narrow Bold",
            "Anton",
            sans-serif;

          transform:
            translate(-3px, 0)
            skew(-3deg);

          text-shadow:
            4px 0 #ff3e8a,
            -4px 0 #63b7ff;

        }


        61% {

          font-family:
            "Comfortaa",
            sans-serif;

          transform:
            translate(2px, 1px)
            skew(2deg);

        }


        63% {

          font-family:
            Impact,
            Haettenschweiler,
            "Arial Narrow Bold",
            "Anton",
            sans-serif;

          transform:
            translate(0, 0);

          text-shadow:
            none;

        }


        78% {

          font-family:
            Impact,
            Haettenschweiler,
            "Arial Narrow Bold",
            "Anton",
            sans-serif;

        }


        79% {

          font-family:
            "Comfortaa",
            sans-serif;

          transform:
            translate(1px, -1px);

          text-shadow:
            -3px 0 #ff3e8a,
            3px 0 #63b7ff;

        }


        82% {

          font-family:
            Impact,
            Haettenschweiler,
            "Arial Narrow Bold",
            "Anton",
            sans-serif;

          transform:
            translate(-1px, 0);

        }


        85%,
        100% {

          font-family:
            "Comfortaa",
            sans-serif;

          transform:
            translate(0, 0)
            skew(0deg);

          text-shadow:
            none;

        }

      }


      /* ===============================================
         SMALL SCREEN SAFETY
         =============================================== */

      @media (max-width: 600px) {

        .lovesick-glitch-title {

          max-width:
            94vw;

          text-align:
            center;

        }

      }


      /* ===============================================
         ACCESSIBILITY

         Stops physical jitter for players who
         request reduced motion, but the fonts
         still switch.
         =============================================== */

      @media
      (prefers-reduced-motion: reduce) {

        .lovesick-glitch-title {

          animation:
            lovesick-title-font-only
            3s
            steps(1, end)
            infinite;

        }


        @keyframes
        lovesick-title-font-only {

          0%,
          49% {

            font-family:
              "Comfortaa",
              sans-serif;

          }

          50%,
          99% {

            font-family:
              Impact,
              Haettenschweiler,
              "Arial Narrow Bold",
              "Anton",
              sans-serif;

          }

        }

      }

    `;

    document.head.appendChild(
      style
    );

  }


  /* =======================================================
     FIND THE MAIN TITLE
     ======================================================= */

  const titleScreen =
    document.querySelector(
      "#title-screen"
    );


  if (!titleScreen) {

    console.warn(
      "[LOVESICK] Could not find #title-screen."
    );

    return;

  }


  /*
     Try several likely title selectors so this
     works with the current simplified HTML.
  */

  let mainTitle =
    titleScreen.querySelector(
      "#game-title"
    ) ||

    titleScreen.querySelector(
      ".game-title"
    ) ||

    titleScreen.querySelector(
      ".title"
    ) ||

    titleScreen.querySelector(
      "h1"
    );


  /*
     Last resort:
     Find an element whose visible text is LOVESICK.
  */

  if (!mainTitle) {

    mainTitle =
      Array.from(
        titleScreen.querySelectorAll(
          "h1, h2, div, span"
        )
      ).find(
        element =>
          element.textContent
            .trim()
            .toUpperCase() ===
          "LOVESICK"
      );

  }


  /* =======================================================
     RANDOM TITLE-SCREEN FONT

     This happens ONCE per full page refresh.
     It is intentionally NOT stored in localStorage.
     ======================================================= */

  const refreshUsesImpact =
    Math.random() < 0.5;


  titleScreen.classList.remove(
    "title-font-comfortaa",
    "title-font-impact"
  );


  titleScreen.classList.add(
    refreshUsesImpact
      ? "title-font-impact"
      : "title-font-comfortaa"
  );


  console.log(
    "[LOVESICK] Title-screen refresh font:",
    refreshUsesImpact
      ? "Impact"
      : "Comfortaa"
  );


  /* =======================================================
     MAIN TITLE GLITCH
     ======================================================= */

  if (mainTitle) {

    mainTitle.classList.add(
      "lovesick-glitch-title"
    );


    console.log(
      "[LOVESICK] LOVESICK title glitch active."
    );

  } else {

    console.warn(
      "[LOVESICK] Could not locate LOVESICK title element."
    );

  }


})();
/* =========================================================
   LOVESICK — RESPONSIVE MAIN MENU SIZE PATCH
   ========================================================= */

(() => {

  if (
    document.querySelector(
      "#lovesick-menu-size-patch"
    )
  ) {
    return;
  }

  const style =
    document.createElement("style");

  style.id =
    "lovesick-menu-size-patch";

  style.textContent = `

    /* ===============================================
       TITLE SCREEN LAYOUT
       =============================================== */

    #title-screen {

      width:
        100%;

      min-height:
        100vh;

      display:
        flex;

      align-items:
        center;

      justify-content:
        center;

      box-sizing:
        border-box;

      padding:
        32px 24px;

      overflow-y:
        auto;

    }


    /* ===============================================
       MAIN MENU CONTAINER
       =============================================== */

    #title-screen .title-overlay {

      width:
        min(1100px, 94vw);

      max-width:
        1100px;

      min-height:
        min(760px, 88vh);

      box-sizing:
        border-box;

      margin:
        auto;

      padding:
        clamp(28px, 4vw, 54px);

      border-radius:
        24px;

      display:
        flex;

      flex-direction:
        column;

      align-items:
        center;

      justify-content:
        center;

      gap:
        14px;

    }


    /* ===============================================
       MAIN TITLE
       =============================================== */

    #title-screen h1,
    #title-screen .title,
    #title-screen .game-title,
    #title-screen #game-title {

      font-size:
        clamp(48px, 7vw, 100px);

      line-height:
        0.95;

      margin:
        0 0 18px;

      text-align:
        center;

      max-width:
        100%;

    }


    /* ===============================================
       START BUTTON
       =============================================== */

    #start-btn {

      width:
        min(520px, 90%);

      min-height:
        58px;

      padding:
        14px 24px;

      font-size:
        clamp(16px, 1.6vw, 22px);

    }


    /* ===============================================
       CONTROL PANEL
       =============================================== */

    #lovesick-control-panel {

      width:
        min(620px, 92%) !important;

      margin:
        8px auto 0 !important;

      padding:
        16px 18px !important;

    }


    #lovesick-control-select {

      min-height:
        48px;

      font-size:
        15px;

    }


    /* ===============================================
       MINIGAME PANEL
       =============================================== */

    #lovesick-minigames-panel {

      width:
        min(760px, 94%) !important;

      max-height:
        min(330px, 36vh) !important;

      margin:
        10px auto 0 !important;

      padding:
        18px !important;

    }


    .lovesick-minigame-button {

      padding:
        14px 16px !important;

      font-size:
        15px;

    }


    .minigame-description {

      font-size:
        12px !important;

    }


    /* ===============================================
       ACHIEVEMENT AREA
       =============================================== */

    #main-menu-achievements {

      width:
        min(760px, 94%) !important;

      max-height:
        min(300px, 32vh);

      overflow-y:
        auto;

      margin-left:
        auto !important;

      margin-right:
        auto !important;

    }


    /* ===============================================
       DESKTOP / LAPTOP
       =============================================== */

    @media (min-width: 900px) {

      #title-screen {

        padding:
          40px;

      }


      #title-screen .title-overlay {

        width:
          min(1180px, 92vw);

        min-height:
          min(820px, 90vh);

        padding:
          50px 70px;

      }


      #lovesick-control-panel,
      #lovesick-minigames-panel,
      #main-menu-achievements {

        width:
          min(820px, 88%) !important;

      }


      #start-btn {

        width:
          min(600px, 72%);

      }

    }


    /* ===============================================
       PHONE
       =============================================== */

    @media (max-width: 600px) {

      #title-screen {

        padding:
          12px;

        align-items:
          flex-start;

      }


      #title-screen .title-overlay {

        width:
          100%;

        min-height:
          auto;

        padding:
          20px 14px;

        border-radius:
          16px;

        gap:
          10px;

      }


      #title-screen h1,
      #title-screen .title,
      #title-screen .game-title,
      #title-screen #game-title {

        font-size:
          clamp(40px, 14vw, 64px);

        margin-bottom:
          10px;

      }


      #start-btn,
      #lovesick-control-panel,
      #lovesick-minigames-panel,
      #main-menu-achievements {

        width:
          100% !important;

        max-width:
          100% !important;

      }


      #lovesick-minigames-panel,
      #main-menu-achievements {

        max-height:
          none !important;

      }

    }


    /* ===============================================
       SHORT LAPTOP SCREENS
       =============================================== */

    @media
    (min-width: 700px)
    and
    (max-height: 800px) {

      #title-screen {

        align-items:
          flex-start;

        padding-top:
          20px;

        padding-bottom:
          20px;

      }


      #title-screen .title-overlay {

        min-height:
          auto;

        justify-content:
          flex-start;

      }


      #title-screen h1,
      #title-screen .title,
      #title-screen .game-title,
      #title-screen #game-title {

        font-size:
          clamp(48px, 6vw, 76px);

      }


      #lovesick-minigames-panel {

        max-height:
          220px !important;

      }


      #main-menu-achievements {

        max-height:
          200px;

      }

    }

  `;

  document.head.appendChild(style);

})();
/* =========================================================
   LOVESICK — PAUSE MENU + FUNCTIONAL SETTINGS
   ========================================================= */

(() => {

  "use strict";


  /* =======================================================
     SETTINGS
     ======================================================= */

  const SETTINGS_KEY =
    "lovesickGameSettings";

  const DEFAULT_SETTINGS = {
    textSpeed: "normal",
    musicVolume: 0.75,
    sfxVolume: 0.80,
    reduceMotion: false
  };


  function loadSettings() {

    try {

      return {
        ...DEFAULT_SETTINGS,
        ...JSON.parse(
          localStorage.getItem(
            SETTINGS_KEY
          ) || "{}"
        )
      };

    } catch (error) {

      return {
        ...DEFAULT_SETTINGS
      };

    }

  }


  let pauseSettings =
    loadSettings();


  function saveSettings() {

    localStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify(
        pauseSettings
      )
    );

  }


  /* =======================================================
     PAUSE STATE
     ======================================================= */

  let lovesickPaused =
    false;

  let pauseSelectedIndex =
    0;


  window.isLovesickPaused =
    () => lovesickPaused;


  /* =======================================================
     PAUSE-AWARE TIMERS
     -------------------------------------------------------
     Timers created AFTER this block loads will wait while
     the pause menu is active.

     This covers things such as:
     - Therapy countdowns
     - Fight response windows
     - Date timing
     - Typewriter timing
     ======================================================= */

  const nativeSetTimeout =
    window.setTimeout.bind(window);

  const nativeSetInterval =
    window.setInterval.bind(window);

  const nativeClearTimeout =
    window.clearTimeout.bind(window);

  const nativeClearInterval =
    window.clearInterval.bind(window);


  window.setTimeout =
    function(callback, delay, ...args) {

      const wrapped =
        function() {

          if (
            lovesickPaused
          ) {

            return nativeSetTimeout(
              wrapped,
              50
            );

          }

          callback(...args);

        };


      return nativeSetTimeout(
        wrapped,
        delay
      );

    };


  window.setInterval =
    function(callback, delay, ...args) {

      return nativeSetInterval(
        () => {

          if (
            lovesickPaused
          ) {
            return;
          }


          callback(...args);

        },
        delay
      );

    };


  /*
     Keep clearTimeout / clearInterval behaving normally.
  */

  window.clearTimeout =
    nativeClearTimeout;

  window.clearInterval =
    nativeClearInterval;


  /* =======================================================
     REAL TYPEWRITER SPEED
     -------------------------------------------------------
     Your original typeDialogue() used:

         2 characters every 6ms

     We replace that exact function using the same
     typeTimer and completeDialogue variables.
     ======================================================= */

  function getDialogueTiming() {

    switch (
      pauseSettings.textSpeed
    ) {

      case "slow":

        return {
          characters: 1,
          delay: 26
        };


      case "fast":

        return {
          characters: 3,
          delay: 5
        };


      case "instant":

        return {
          characters: 999999,
          delay: 1
        };


      case "normal":
      default:

        return {
          characters: 2,
          delay: 12
        };

    }

  }


  /*
     Reassign the existing global function.
  */

  typeDialogue =
    function(text) {

      if (typeTimer) {

        clearInterval(
          typeTimer
        );

      }


      completeDialogue =
        text;


      const element =
        document.querySelector(
          "#dialogue-text"
        );


      if (!element) {
        return;
      }


      element.textContent =
        "";


      const timing =
        getDialogueTiming();


      if (
        pauseSettings.textSpeed ===
        "instant"
      ) {

        element.textContent =
          text;

        typeTimer =
          null;

        return;

      }


      let index =
        0;


      typeTimer =
        setInterval(
          () => {

            index =
              Math.min(
                text.length,
                index +
                timing.characters
              );


            element.textContent =
              text.slice(
                0,
                index
              );


            if (
              index >=
              text.length
            ) {

              clearInterval(
                typeTimer
              );

              typeTimer =
                null;

            }

          },
          timing.delay
        );

    };


  /* =======================================================
     MUSIC + SFX VOLUME
     -------------------------------------------------------
     This controls any <audio> elements already present,
     plus future audio that uses these helpers.
     ======================================================= */

  window.lovesickPlayMusic =
    function(audioElement) {

      if (!audioElement) {
        return;
      }


      audioElement.dataset
        .lovesickAudioType =
        "music";


      audioElement.volume =
        pauseSettings
          .musicVolume;


      audioElement.play()
        .catch(() => {});

    };


  window.lovesickPlaySFX =
    function(audioElement) {

      if (!audioElement) {
        return;
      }


      audioElement.dataset
        .lovesickAudioType =
        "sfx";


      audioElement.volume =
        pauseSettings
          .sfxVolume;


      audioElement.play()
        .catch(() => {});

    };


  function updateAudioVolumes() {

    document
      .querySelectorAll(
        "audio"
      )
      .forEach(
        audio => {

          const type =
            audio.dataset
              .lovesickAudioType;


          if (
            type === "music"
          ) {

            audio.volume =
              pauseSettings
                .musicVolume;

          }


          else if (
            type === "sfx"
          ) {

            audio.volume =
              pauseSettings
                .sfxVolume;

          }

        }
      );

  }


  /* =======================================================
     STYLES
     ======================================================= */

  const style =
    document.createElement(
      "style"
    );


  style.id =
    "lovesick-pause-styles";


  style.textContent = `

    /* ===============================================
       TOUCH PAUSE BUTTON
       =============================================== */

    #lovesick-pause-button {

      position:
        fixed;

      top:
        18px;

      right:
        18px;

      z-index:
        88000;

      display:
        none;

      min-width:
        92px;

      padding:
        10px 15px;

      border:
        1px solid
        rgba(255,120,180,0.55);

      border-radius:
        10px;

      background:
        rgba(5,5,10,0.78);

      color:
        white;

      font-family:
        "Comfortaa",
        sans-serif;

      font-size:
        11px;

      font-weight:
        800;

      letter-spacing:
        0.10em;

      cursor:
        pointer;

      backdrop-filter:
        blur(8px);

    }


    #lovesick-pause-button.visible {

      display:
        block;

    }



    /* ===============================================
       PAUSE OVERLAY
       =============================================== */

    #lovesick-pause-overlay {

      position:
        fixed;

      inset:
        0;

      z-index:
        100000;

      display:
        none;

      align-items:
        center;

      justify-content:
        center;

      padding:
        24px;

      box-sizing:
        border-box;

      background:
        rgba(0,0,0,0.78);

      backdrop-filter:
        blur(8px);

      overflow-y:
        auto;

      font-family:
        "Comfortaa",
        sans-serif;

    }


    #lovesick-pause-overlay.active {

      display:
        flex;

    }


    #lovesick-pause-panel {

      width:
        min(720px, 94vw);

      max-height:
        92vh;

      overflow-y:
        auto;

      box-sizing:
        border-box;

      padding:
        clamp(22px, 4vw, 38px);

      border:
        1px solid
        rgba(255,100,160,0.38);

      border-radius:
        20px;

      background:
        rgba(15,12,20,0.97);

      box-shadow:
        0 25px 80px
        rgba(0,0,0,0.75);

      color:
        white;

    }


    #lovesick-pause-title {

      margin:
        0 0 4px;

      text-align:
        center;

      font-size:
        clamp(28px, 5vw, 48px);

      color:
        #ff82b5;

      letter-spacing:
        0.10em;

    }


    #lovesick-pause-subtitle {

      margin-bottom:
        26px;

      text-align:
        center;

      color:
        #8f8b98;

      font-size:
        10px;

      letter-spacing:
        0.13em;

    }



    /* ===============================================
       SETTING ROWS
       =============================================== */

    .lovesick-setting-row {

      display:
        grid;

      grid-template-columns:
        minmax(130px, 1fr)
        minmax(200px, 1.4fr);

      gap:
        18px;

      align-items:
        center;

      margin:
        10px 0;

      padding:
        11px 12px;

      border-radius:
        10px;

    }


    .lovesick-setting-row.pause-selected {

      outline:
        2px solid
        rgba(255,110,170,0.90);

      background:
        rgba(255,80,145,0.08);

    }


    .lovesick-setting-label {

      font-size:
        12px;

      font-weight:
        800;

      letter-spacing:
        0.06em;

    }


    .lovesick-setting-control {

      width:
        100%;

      min-height:
        42px;

      box-sizing:
        border-box;

      padding:
        8px 10px;

      border:
        1px solid
        rgba(255,255,255,0.15);

      border-radius:
        8px;

      background:
        #111018;

      color:
        white;

      font-family:
        "Comfortaa",
        sans-serif;

    }


    input[type="range"].lovesick-setting-control {

      padding:
        0;

      cursor:
        pointer;

    }



    /* ===============================================
       REDUCE MOTION BUTTON
       =============================================== */

    #pause-motion-toggle {

      cursor:
        pointer;

    }



    /* ===============================================
       PAUSE BUTTONS
       =============================================== */

    #pause-menu-actions {

      display:
        grid;

      grid-template-columns:
        repeat(2, 1fr);

      gap:
        10px;

      margin-top:
        24px;

    }


    .pause-action-button {

      padding:
        13px 14px;

      border:
        1px solid
        rgba(255,105,165,0.48);

      border-radius:
        9px;

      background:
        rgba(255,70,140,0.08);

      color:
        white;

      font-family:
        "Comfortaa",
        sans-serif;

      font-weight:
        800;

      cursor:
        pointer;

    }


    .pause-action-button:hover,
    .pause-action-button.pause-selected {

      background:
        rgba(255,70,140,0.20);

      outline:
        2px solid
        rgba(255,110,170,0.90);

    }


    #pause-return-title {

      border-color:
        rgba(255,70,70,0.50);

    }



    /* ===============================================
       REDUCED MOTION
       =============================================== */

    body.lovesick-reduce-motion *,
    body.lovesick-reduce-motion *::before,
    body.lovesick-reduce-motion *::after {

      scroll-behavior:
        auto !important;

      transition-duration:
        0.001ms !important;

    }


    body.lovesick-reduce-motion
    .lovesick-glitch-title {

      animation:
        none !important;

      transform:
        none !important;

      text-shadow:
        none !important;

    }



    /* ===============================================
       PHONE
       =============================================== */

    @media (max-width: 600px) {

      #lovesick-pause-overlay {

        padding:
          10px;

        align-items:
          flex-start;

      }


      #lovesick-pause-panel {

        width:
          100%;

        margin:
          10px 0;

        padding:
          20px 14px;

      }


      .lovesick-setting-row {

        grid-template-columns:
          1fr;

        gap:
          7px;

      }


      #pause-menu-actions {

        grid-template-columns:
          1fr;

      }

    }

  `;


  document.head.appendChild(
    style
  );


  /* =======================================================
     CREATE PAUSE BUTTON
     ======================================================= */

  const pauseButton =
    document.createElement(
      "button"
    );


  pauseButton.id =
    "lovesick-pause-button";

  pauseButton.type =
    "button";

  pauseButton.textContent =
    "Ⅱ PAUSE";


  document.body.appendChild(
    pauseButton
  );


  /* =======================================================
     CREATE MENU
     ======================================================= */

  const overlay =
    document.createElement(
      "div"
    );


  overlay.id =
    "lovesick-pause-overlay";


  overlay.innerHTML = `

    <div id="lovesick-pause-panel">

      <h2 id="lovesick-pause-title">
        PAUSED
      </h2>

      <div id="lovesick-pause-subtitle">
        LOVESICK SETTINGS
      </div>


      <div
        class="lovesick-setting-row"
        data-pause-item
      >

        <div class="lovesick-setting-label">
          CONTROL DEVICE
        </div>

        <select
          id="pause-control-device"
          class="lovesick-setting-control"
        >

          <option value="touch">
            Touch / Mobile
          </option>

          <option value="keyboard">
            Keyboard
          </option>

          <option value="controller">
            Controller
          </option>

        </select>

      </div>


      <div
        class="lovesick-setting-row"
        data-pause-item
      >

        <div class="lovesick-setting-label">
          TEXT SPEED
        </div>

        <select
          id="pause-text-speed"
          class="lovesick-setting-control"
        >

          <option value="slow">
            Slow
          </option>

          <option value="normal">
            Normal
          </option>

          <option value="fast">
            Fast
          </option>

          <option value="instant">
            Instant
          </option>

        </select>

      </div>


      <div
        class="lovesick-setting-row"
        data-pause-item
      >

        <div class="lovesick-setting-label">
          MUSIC VOLUME
        </div>

        <input
          id="pause-music-volume"
          class="lovesick-setting-control"
          type="range"
          min="0"
          max="100"
          step="1"
        >

      </div>


      <div
        class="lovesick-setting-row"
        data-pause-item
      >

        <div class="lovesick-setting-label">
          SFX VOLUME
        </div>

        <input
          id="pause-sfx-volume"
          class="lovesick-setting-control"
          type="range"
          min="0"
          max="100"
          step="1"
        >

      </div>


      <div
        class="lovesick-setting-row"
        data-pause-item
      >

        <div class="lovesick-setting-label">
          REDUCE MOTION
        </div>

        <button
          id="pause-motion-toggle"
          class="lovesick-setting-control"
          type="button"
        >
          OFF
        </button>

      </div>


      <div id="pause-menu-actions">

        <button
          id="pause-resume"
          class="pause-action-button"
          data-pause-item
          type="button"
        >
          RESUME
        </button>


        <button
          id="pause-fullscreen"
          class="pause-action-button"
          data-pause-item
          type="button"
        >
          FULLSCREEN
        </button>


        <button
          id="pause-return-title"
          class="pause-action-button"
          data-pause-item
          type="button"
        >
          RETURN TO TITLE
        </button>

      </div>

    </div>

  `;


  document.body.appendChild(
    overlay
  );


  /* =======================================================
     ELEMENTS
     ======================================================= */

  const deviceSelect =
    document.querySelector(
      "#pause-control-device"
    );

  const speedSelect =
    document.querySelector(
      "#pause-text-speed"
    );

  const musicSlider =
    document.querySelector(
      "#pause-music-volume"
    );

  const sfxSlider =
    document.querySelector(
      "#pause-sfx-volume"
    );

  const motionButton =
    document.querySelector(
      "#pause-motion-toggle"
    );


  /* =======================================================
     SYNC SETTINGS INTO MENU
     ======================================================= */

  function syncPauseMenu() {

    deviceSelect.value =
      localStorage.getItem(
        "lovesickControlDevice"
      ) || "touch";


    speedSelect.value =
      pauseSettings.textSpeed;


    musicSlider.value =
      Math.round(
        pauseSettings.musicVolume *
        100
      );


    sfxSlider.value =
      Math.round(
        pauseSettings.sfxVolume *
        100
      );


    motionButton.textContent =
      pauseSettings.reduceMotion
        ? "ON"
        : "OFF";


    document.body.classList.toggle(
      "lovesick-reduce-motion",
      pauseSettings.reduceMotion
    );

  }


  syncPauseMenu();


  /* =======================================================
     SETTINGS EVENTS
     ======================================================= */

  deviceSelect.addEventListener(
    "change",
    () => {

      localStorage.setItem(
        "lovesickControlDevice",
        deviceSelect.value
      );


      /*
         Synchronize the original title-menu selector.
      */

      const original =
        document.querySelector(
          "#lovesick-control-select"
        );


      if (original) {

        original.value =
          deviceSelect.value;


        original.dispatchEvent(
          new Event(
            "change",
            {
              bubbles: true
            }
          )
        );

      }

    }
  );


  speedSelect.addEventListener(
    "change",
    () => {

      pauseSettings.textSpeed =
        speedSelect.value;


      saveSettings();

    }
  );


  musicSlider.addEventListener(
    "input",
    () => {

      pauseSettings.musicVolume =
        Number(
          musicSlider.value
        ) / 100;


      saveSettings();

      updateAudioVolumes();

    }
  );


  sfxSlider.addEventListener(
    "input",
    () => {

      pauseSettings.sfxVolume =
        Number(
          sfxSlider.value
        ) / 100;


      saveSettings();

      updateAudioVolumes();

    }
  );


  motionButton.addEventListener(
    "click",
    () => {

      pauseSettings.reduceMotion =
        !pauseSettings.reduceMotion;


      saveSettings();

      syncPauseMenu();

    }
  );


  /* =======================================================
     OPEN / CLOSE
     ======================================================= */

  function openPauseMenu() {

    if (
      lovesickPaused
    ) {
      return;
    }


    if (
      !isGameplayScreenVisible()
    ) {
      return;
    }


    lovesickPaused =
      true;


    pauseSelectedIndex =
      0;


    syncPauseMenu();


    overlay.classList.add(
      "active"
    );


    refreshPauseSelection();

  }


  function closePauseMenu() {

    if (
      !lovesickPaused
    ) {
      return;
    }


    lovesickPaused =
      false;


    overlay.classList.remove(
      "active"
    );


    clearPauseSelection();

  }


  function togglePauseMenu() {

    if (
      lovesickPaused
    ) {

      closePauseMenu();

    } else {

      openPauseMenu();

    }

  }


  window.openLovesickPauseMenu =
    openPauseMenu;

  window.closeLovesickPauseMenu =
    closePauseMenu;


  pauseButton.addEventListener(
    "click",
    openPauseMenu
  );


  document.querySelector(
    "#pause-resume"
  ).addEventListener(
    "click",
    closePauseMenu
  );


  /* =======================================================
     FULLSCREEN
     ======================================================= */

  document.querySelector(
    "#pause-fullscreen"
  ).addEventListener(
    "click",
    async () => {

      try {

        if (
          !document.fullscreenElement
        ) {

          await document.documentElement
            .requestFullscreen();

        } else {

          await document
            .exitFullscreen();

        }

      } catch (error) {

        console.warn(
          "[LOVESICK] Fullscreen unavailable:",
          error
        );

      }

    }
  );


  /* =======================================================
     RETURN TO TITLE
     ======================================================= */

  document.querySelector(
    "#pause-return-title"
  ).addEventListener(
    "click",
    () => {

      const confirmed =
        window.confirm(
          "Return to the title screen?\n\nUnsaved progress from this scene may be lost."
        );


      if (!confirmed) {
        return;
      }


      /*
         Reloading is intentional:
         - Stops camera/microphone streams owned by page
         - Clears active minigame timers
         - Resets transient route state
         - Keeps localStorage achievements/settings
      */

      window.location.reload();

    }
  );


  /* =======================================================
     WHICH SCREENS COUNT AS GAMEPLAY?
     ======================================================= */

  function visible(element) {

    if (!element) {
      return false;
    }


    const style =
      getComputedStyle(
        element
      );


    if (
      style.display === "none" ||
      style.visibility === "hidden"
    ) {
      return false;
    }


    const rect =
      element.getBoundingClientRect();


    return (
      rect.width > 0 &&
      rect.height > 0
    );

  }


  function isGameplayScreenVisible() {

    return [

      "#vn-screen",
      "#date-screen",
      "#therapy-screen",
      "#fight-screen"

    ].some(
      selector =>
        visible(
          document.querySelector(
            selector
          )
        )
    );

  }


  function updatePauseButtonVisibility() {

    const show =
      isGameplayScreenVisible() &&
      !lovesickPaused;


    pauseButton.classList.toggle(
      "visible",
      show
    );

  }


  /* =======================================================
     KEYBOARD
     -------------------------------------------------------
     ESC = Pause / Resume
     ======================================================= */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape"
      ) {

        event.preventDefault();

        event.stopImmediatePropagation();

        togglePauseMenu();

        return;

      }


      if (
        !lovesickPaused
      ) {
        return;
      }


      const mode =
        localStorage.getItem(
          "lovesickControlDevice"
        ) || "touch";


      if (
        mode !== "keyboard"
      ) {
        return;
      }


      const key =
        event.key.toLowerCase();


      if (
        key === "arrowdown" ||
        key === "s"
      ) {

        event.preventDefault();

        event.stopImmediatePropagation();

        movePauseSelection(
          1
        );

        return;

      }


      if (
        key === "arrowup" ||
        key === "w"
      ) {

        event.preventDefault();

        event.stopImmediatePropagation();

        movePauseSelection(
          -1
        );

        return;

      }


      if (
        key === "arrowleft" ||
        key === "a"
      ) {

        event.preventDefault();

        event.stopImmediatePropagation();

        adjustPauseItem(
          -1
        );

        return;

      }


      if (
        key === "arrowright" ||
        key === "d"
      ) {

        event.preventDefault();

        event.stopImmediatePropagation();

        adjustPauseItem(
          1
        );

        return;

      }


      if (
        key === "enter" ||
        key === " "
      ) {

        event.preventDefault();

        event.stopImmediatePropagation();

        activatePauseItem();

      }

    },
    true
  );


  /* =======================================================
     PAUSE MENU NAVIGATION
     ======================================================= */

  function getPauseItems() {

    return Array.from(
      document.querySelectorAll(
        "#lovesick-pause-overlay [data-pause-item]"
      )
    );

  }


  function clearPauseSelection() {

    getPauseItems()
      .forEach(
        item =>
          item.classList.remove(
            "pause-selected"
          )
      );

  }


  function refreshPauseSelection() {

    const items =
      getPauseItems();


    if (!items.length) {
      return;
    }


    pauseSelectedIndex =
      Math.max(
        0,
        Math.min(
          pauseSelectedIndex,
          items.length - 1
        )
      );


    items.forEach(
      (item, index) => {

        item.classList.toggle(
          "pause-selected",
          index ===
            pauseSelectedIndex
        );

      }
    );


    items[
      pauseSelectedIndex
    ]?.scrollIntoView({
      block: "nearest"
    });

  }


  function movePauseSelection(
    direction
  ) {

    const items =
      getPauseItems();


    if (!items.length) {
      return;
    }


    pauseSelectedIndex +=
      direction;


    if (
      pauseSelectedIndex >=
      items.length
    ) {

      pauseSelectedIndex =
        0;

    }


    if (
      pauseSelectedIndex < 0
    ) {

      pauseSelectedIndex =
        items.length - 1;

    }


    refreshPauseSelection();

  }


  function getCurrentPauseControl() {

    const item =
      getPauseItems()[
        pauseSelectedIndex
      ];


    if (!item) {
      return null;
    }


    if (
      item.matches(
        "button, select, input"
      )
    ) {

      return item;

    }


    return item.querySelector(
      "button, select, input"
    );

  }


  function adjustPauseItem(
    direction
  ) {

    const control =
      getCurrentPauseControl();


    if (!control) {
      return;
    }


    if (
      control.tagName ===
      "SELECT"
    ) {

      const options =
        Array.from(
          control.options
        );


      let index =
        control.selectedIndex +
        direction;


      index =
        Math.max(
          0,
          Math.min(
            options.length - 1,
            index
          )
        );


      control.selectedIndex =
        index;


      control.dispatchEvent(
        new Event(
          "change",
          {
            bubbles: true
          }
        )
      );


      return;

    }


    if (
      control.type ===
      "range"
    ) {

      const step =
        Number(
          control.step || 1
        );


      const min =
        Number(
          control.min || 0
        );


      const max =
        Number(
          control.max || 100
        );


      let value =
        Number(
          control.value
        );


      /*
         Volume jumps 5% at a time with
         keyboard/controller.
      */

      value +=
        step * 5 *
        direction;


      value =
        Math.max(
          min,
          Math.min(
            max,
            value
          )
        );


      control.value =
        value;


      control.dispatchEvent(
        new Event(
          "input",
          {
            bubbles: true
          }
        )
      );


      return;

    }


    if (
      control.id ===
      "pause-motion-toggle"
    ) {

      control.click();

    }

  }


  function activatePauseItem() {

    const control =
      getCurrentPauseControl();


    if (!control) {
      return;
    }


    if (
      control.tagName ===
        "SELECT" ||
      control.type ===
        "range"
    ) {

      /*
         For keyboard/controller, Enter doesn't
         need to open native dropdown UI.
         Left/right changes the setting.
      */

      return;

    }


    control.click();

  }


  /* =======================================================
     CONTROLLER
     -------------------------------------------------------
     Standard browser mapping:

     Start / Options = button 9
     A / Cross       = button 0
     B / Circle      = button 1
     D-pad           = 12–15
     Left stick      = axes 0 / 1
     ======================================================= */

  const controllerPrevious = {

    pause: false,
    confirm: false,
    back: false,

    up: false,
    down: false,
    left: false,
    right: false

  };


  function gamepadPressedOnce(
    key,
    pressed,
    callback
  ) {

    if (
      pressed &&
      !controllerPrevious[
        key
      ]
    ) {

      callback();

    }


    controllerPrevious[
      key
    ] =
      pressed;

  }


  function pollPauseController() {

    const pads =
      navigator.getGamepads
        ? navigator.getGamepads()
        : [];


    const pad =
      Array.from(
        pads
      ).find(Boolean);


    if (pad) {

      const pausePressed =
        !!pad.buttons?.[9]
          ?.pressed;


      /*
         Start/Options works regardless of chosen
         control mode so players can always escape
         gameplay if a controller is connected.
      */

      gamepadPressedOnce(
        "pause",
        pausePressed,
        togglePauseMenu
      );


      if (
        lovesickPaused
      ) {

        const stickX =
          pad.axes?.[0] || 0;

        const stickY =
          pad.axes?.[1] || 0;

        const deadzone =
          0.55;


        const up =
          !!pad.buttons?.[12]
            ?.pressed ||
          stickY <
            -deadzone;


        const down =
          !!pad.buttons?.[13]
            ?.pressed ||
          stickY >
            deadzone;


        const left =
          !!pad.buttons?.[14]
            ?.pressed ||
          stickX <
            -deadzone;


        const right =
          !!pad.buttons?.[15]
            ?.pressed ||
          stickX >
            deadzone;


        const confirm =
          !!pad.buttons?.[0]
            ?.pressed;


        const back =
          !!pad.buttons?.[1]
            ?.pressed;


        gamepadPressedOnce(
          "up",
          up,
          () =>
            movePauseSelection(
              -1
            )
        );


        gamepadPressedOnce(
          "down",
          down,
          () =>
            movePauseSelection(
              1
            )
        );


        gamepadPressedOnce(
          "left",
          left,
          () =>
            adjustPauseItem(
              -1
            )
        );


        gamepadPressedOnce(
          "right",
          right,
          () =>
            adjustPauseItem(
              1
            )
        );


        gamepadPressedOnce(
          "confirm",
          confirm,
          activatePauseItem
        );


        gamepadPressedOnce(
          "back",
          back,
          closePauseMenu
        );

      }

    }


    requestAnimationFrame(
      pollPauseController
    );

  }


  requestAnimationFrame(
    pollPauseController
  );


  /* =======================================================
     TOUCH
     ======================================================= */

  /*
     Everything in the overlay is an actual HTML
     button/select/slider, so touchscreen users can
     tap and drag normally.
  */


  /* =======================================================
     WATCH SCREEN CHANGES
     ======================================================= */

  const pauseScreenObserver =
    new MutationObserver(
      updatePauseButtonVisibility
    );


  pauseScreenObserver.observe(
    document.body,
    {
      subtree: true,
      attributes: true,
      attributeFilter: [
        "class",
        "style"
      ]
    }
  );


  nativeSetInterval(
    updatePauseButtonVisibility,
    350
  );


  updatePauseButtonVisibility();


  /* =======================================================
     INITIAL MOTION SETTING
     ======================================================= */

  document.body.classList.toggle(
    "lovesick-reduce-motion",
    pauseSettings.reduceMotion
  );


  console.log(
    "[LOVESICK] Pause menu installed."
  );

  console.log(
    "[LOVESICK] Text speed:",
    pauseSettings.textSpeed
  );

})();


/* =========================================================
   LOVESICK — SMART YAN'DE DINNER DATE
   Better Q1–10 responses + speech recognition Q11–15
   Includes hidden CORDE ("Kor-day") reaction.
   ========================================================= */

(() => {
  console.log("[LOVESICK] Loading smart dinner date patch...");

  /* ---------------------------------------------------------
     SPEECH RECOGNITION STATE
     --------------------------------------------------------- */

  const SpeechRecognitionAPI =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition ||
    null;

  let dateRecognition = null;
  let speechFinal = "";
  let speechInterim = "";
  let recognitionRunning = false;
  let finishingVoiceRound = false;


  function normalizeSpeech(text) {
    return String(text || "")
      .toLowerCase()
      .replace(/[’‘]/g, "'")
      .replace(/[^a-z0-9'\s-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }


  function heardText() {
    return normalizeSpeech(
      `${speechFinal} ${speechInterim}`
    );
  }


  function containsAny(text, phrases) {
    return phrases.some(phrase =>
      text.includes(phrase)
    );
  }


  /* ---------------------------------------------------------
     NAME DETECTION
     --------------------------------------------------------- */

  function saidCorde(text) {
    const heard = normalizeSpeech(text);

    if (!heard) return false;

    const exactVariants = [
      "corde",
      "corday",
      "cor day",
      "core day",
      "kor day",
      "korday",
      "kor-day",
      "cor-day",
      "core-day",
      "cord day",
      "corde day"
    ];

    if (
      exactVariants.some(variant =>
        heard.includes(variant)
      )
    ) {
      return true;
    }

    /*
      Speech recognition may hear "Kor-day" as two
      ordinary English words.
    */
    return /\b(?:cor|core|kor|cord|court)\s*(?:day|de|dae)\b/i
      .test(heard);
  }


  function saidYande(text) {
    const heard = normalizeSpeech(text);

    return containsAny(heard, [
      "yande",
      "yan de",
      "yan'de",
      "yan day",
      "yawn day",
      "yandee",
      "yan dee"
    ]);
  }


  function saidAce(text) {
    const heard = normalizeSpeech(text);

    return (
      heard === "ace" ||
      heard.includes(" ace ") ||
      heard.startsWith("ace ") ||
      heard.endsWith(" ace")
    );
  }


  function saidDe(text) {
    const heard = normalizeSpeech(text);

    return (
      heard === "de" ||
      heard === "dee" ||
      heard === "d" ||
      heard === "day"
    );
  }


  /* ---------------------------------------------------------
     SPEECH RECOGNITION
     --------------------------------------------------------- */

  function stopDateRecognition() {
    if (!dateRecognition) return;

    try {
      dateRecognition.onend = null;
      dateRecognition.stop();
    } catch (error) {
      /* It may already be stopped. */
    }

    recognitionRunning = false;
    dateRecognition = null;
  }


  function startDateRecognition() {
    speechFinal = "";
    speechInterim = "";

    stopDateRecognition();

    if (!SpeechRecognitionAPI) {
      console.log(
        "[LOVESICK] Browser speech recognition unavailable. " +
        "Using microphone-level fallback."
      );

      return false;
    }

    if (!micStream) {
      return false;
    }

    try {
      const recognition =
        new SpeechRecognitionAPI();

      dateRecognition = recognition;

      recognition.lang = "en-US";
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 3;

      recognition.onstart = () => {
        recognitionRunning = true;

        console.log(
          `[LOVESICK] Listening to date round ${dateRound}.`
        );
      };


      recognition.onresult = event => {
        let interim = "";

        for (
          let i = event.resultIndex;
          i < event.results.length;
          i++
        ) {
          const result =
            event.results[i];

          const transcript =
            result[0]?.transcript || "";

          if (result.isFinal) {
            speechFinal +=
              ` ${transcript}`;
          } else {
            interim +=
              ` ${transcript}`;
          }
        }

        speechInterim =
          interim.trim();
      };


      recognition.onerror = event => {
        console.warn(
          "[LOVESICK] Speech recognition:",
          event.error
        );

        if (
          event.error === "not-allowed" ||
          event.error === "service-not-allowed"
        ) {
          recognitionRunning = false;
        }
      };


      recognition.onend = () => {
        recognitionRunning = false;
      };


      recognition.start();

      return true;

    } catch (error) {
      console.warn(
        "[LOVESICK] Could not start speech recognition:",
        error
      );

      recognitionRunning = false;
      dateRecognition = null;

      return false;
    }
  }


  /* ---------------------------------------------------------
     RESET CORDE MEMORY AT BEGINNING OF DATE
     --------------------------------------------------------- */

  const originalStartDate =
    startDate;

  startDate = function() {
    if (typeof game === "object" && game) {
      game.calledHimCorde = false;
    }

    speechFinal = "";
    speechInterim = "";
    finishingVoiceRound = false;

    stopDateRecognition();

    return originalStartDate();
  };


  /* ---------------------------------------------------------
     Q1–10 UNIQUE RESPONSES
     --------------------------------------------------------- */

  const NORMAL_DATE_RESPONSES = {
    1: {
      "Arcade":
        'YAN\'DE: "An arcade?"\n\n' +
        '"Okay. But if I win, you owe me another date."\n\n' +
        '"Actually... you owe me one if you win too."',

      "Late-night walk":
        'YAN\'DE: "A late-night walk..."\n\n' +
        '"Just you and me, when everyone else is asleep?"\n\n' +
        '"Yeah. I like that answer."'
    },

    2: {
      "Hold hands":
        'YAN\'DE: "Hold hands."\n\n' +
        'His smile softens.\n\n' +
        '"Simple. I like simple."\n\n' +
        '"I probably wouldn\'t let go, though."',

      "Hug":
        'YAN\'DE: "A hug?"\n\n' +
        '"You\'re making this very easy for me, Azzy."\n\n' +
        '"Come here, then."'
    },

    3: {
      "Yanny":
        'YAN\'DE: "...Yanny?"\n\n' +
        'He stares at you.\n\n' +
        '"That is terrible."\n\n' +
        '"You\'re the only person I\'d let get away with it."',

      "De":
        'YAN\'DE: "De."\n\n' +
        'For a moment, the teasing expression disappears.\n\n' +
        '"...You remembered."\n\n' +
        '"I haven\'t heard you call me that in a while."'
    },

    4: {
      "Me":
        'YAN\'DE: "You fall asleep first?"\n\n' +
        '"Good."\n\n' +
        '"Then I get to stay awake and look at you a little longer."',

      "You":
        'YAN\'DE: "Me?"\n\n' +
        '"No chance."\n\n' +
        '"I\'d stay awake until I knew you were asleep."'
    },

    5: {
      "Absolutely":
        'YAN\'DE: "Absolutely?"\n\n' +
        '"Then it\'s yours."\n\n' +
        '"Keep it."\n\n' +
        '"I like the idea of you wearing something that belongs to me."',

      "Get your own ♡":
        'YAN\'DE: "Get my own?"\n\n' +
        'He laughs quietly.\n\n' +
        '"Cruel."\n\n' +
        '"Fine. I\'ll just steal yours instead."'
    },

    6: {
      "Dessert":
        'YAN\'DE: "Dessert."\n\n' +
        '"Good choice."\n\n' +
        '"Something sweet after dinner..."\n\n' +
        '"I was going to say you, but apparently I\'m supposed to behave."',

      "Cuddles":
        'YAN\'DE: "Cuddles?"\n\n' +
        'His smile lingers a little too long.\n\n' +
        '"That sounds better than dessert."\n\n' +
        '"We wouldn\'t have to go anywhere afterward."'
    },

    7: {
      "Flowers":
        'YAN\'DE: "Flowers."\n\n' +
        '"I could do that."\n\n' +
        '"I\'d have to learn your favorite kind."\n\n' +
        '"And your second favorite. And your third."',

      "Love letter":
        'YAN\'DE: "A love letter."\n\n' +
        '"Something you can keep."\n\n' +
        '"Something you can read again whenever I\'m not there."\n\n' +
        '"...I like that."'
    },

    8: {
      "Yes ♡":
        'YAN\'DE: "You\'d let me make you a playlist?"\n\n' +
        '"Dangerous decision."\n\n' +
        '"I\'d hide messages in the song order just to see if you noticed."',

      "Only if it's good":
        'YAN\'DE: "Only if it\'s good?"\n\n' +
        '"Wow."\n\n' +
        '"Now I have something to prove."\n\n' +
        '"You\'re listening to every song. No skipping."'
    },

    9: {
      "Go somewhere":
        'YAN\'DE: "Go somewhere..."\n\n' +
        '"Sure."\n\n' +
        '"As long as I\'m the one you\'re going there with."\n\n' +
        '"I don\'t really care where."',

      "Stay together":
        'YAN\'DE: "Stay together."\n\n' +
        'He goes quiet for a second.\n\n' +
        '"Yeah."\n\n' +
        '"I think I could get used to that."'
    },

    10: {
      "Maybe...":
        'YAN\'DE: "Maybe..."\n\n' +
        '"I\'ll take maybe."\n\n' +
        '"For now."\n\n' +
        'His smile doesn\'t quite reach his eyes.',

      "I think I could.":
        'YAN\'DE: "...You think you could?"\n\n' +
        'He stops smiling entirely.\n\n' +
        'Not because he looks upset.\n\n' +
        'Because he looks overwhelmed.\n\n' +
        '"Don\'t say things like that unless you mean them, Azzy."'
    }
  };


  answerNormalDate = function(answer) {
    clearElement(
      $("#date-options")
    );

    const roundResponses =
      NORMAL_DATE_RESPONSES[dateRound] || {};

    const response =
      roundResponses[answer] ||
      (
        'YAN\'DE: "Interesting."\n\n' +
        '"I\'ll remember that."'
      );

    setDateText(
      `AZZY: "${answer}"\n\n` +
      response
    );

    setTimeout(() => {
      dateRound++;
      renderDateRound();
    }, 1650);
  };


  /* ---------------------------------------------------------
     SMART VOICE ROUND START
     --------------------------------------------------------- */

  beginVoiceRound = function() {
    clearElement(
      $("#date-options")
    );

    voiceDetected = false;
    finishingVoiceRound = false;

    speechFinal = "";
    speechInterim = "";

    const prompt =
      VOICE_QUESTIONS[dateRound];

    if (dateRound === 13) {
      setDateText(
        "13 / 15\n\n" +
        'YAN\'DE: "Okay... say my name."\n\n' +
        (
          micStream
            ? "[LISTENING...]"
            : "[MICROPHONE OFFLINE]"
        )
      );

    } else {
      setDateText(
        `${dateRound} / 15\n\n` +
        `YAN'DE: "${prompt}"\n\n` +
        (
          micStream
            ? "[LISTENING...]"
            : "[MICROPHONE OFFLINE]"
        )
      );
    }

    if (micStream) {
      startDateRecognition();
    }

    addDateButton(
      micStream
        ? "DONE SPEAKING"
        : "CONTINUE",
      finishVoiceRound
    );
  };


  /* ---------------------------------------------------------
     Q11 RESPONSE
     "What's something that makes you happy?"
     --------------------------------------------------------- */

  function responseRound11(heard) {
    if (!heard) {
      return voiceDetected
        ? '"I heard you."\n\n' +
          '"I couldn\'t quite make out the words, though."\n\n' +
          '"You\'ll have to tell me again sometime."'
        : '"You\'re quiet."\n\n' +
          '"That\'s okay."\n\n' +
          '"I can wait."';
    }


    if (
      containsAny(heard, [
        "you",
        "yande",
        "yan de",
        "yan'de"
      ])
    ) {
      return (
        '"...Me?"\n\n' +
        'Yan\'De goes completely still.\n\n' +
        '"Careful, Azzy."\n\n' +
        '"I might actually believe you."'
      );
    }


    if (
      containsAny(heard, [
        "music",
        "song",
        "songs",
        "singing",
        "playlist"
      ])
    ) {
      return (
        '"Music?"\n\n' +
        '"Okay. I can work with that."\n\n' +
        '"Send me your favorite song sometime."\n\n' +
        '"Actually... send me all of them."'
      );
    }


    if (
      containsAny(heard, [
        "friend",
        "friends",
        "family",
        "mom",
        "dad",
        "sister",
        "brother"
      ])
    ) {
      return (
        '"The people you care about."\n\n' +
        '"That\'s sweet."\n\n' +
        '"Which ones?"\n\n' +
        'He smiles.\n\n' +
        '"I\'m curious."'
      );
    }


    if (
      containsAny(heard, [
        "game",
        "games",
        "gaming",
        "video game"
      ])
    ) {
      return (
        '"Games?"\n\n' +
        '"Then we should play something together."\n\n' +
        '"Preferably something cooperative."\n\n' +
        '"I don\'t like being on the opposite side from you."'
      );
    }


    if (
      containsAny(heard, [
        "sleep",
        "sleeping",
        "rest",
        "bed"
      ])
    ) {
      return (
        '"Sleep?"\n\n' +
        '"You really are tired, aren\'t you?"\n\n' +
        '"I could keep you company until you fall asleep."'
      );
    }


    return (
      '"I like that answer."\n\n' +
      '"You sound different when you talk about something you actually care about."\n\n' +
      '"I want to hear more of that."'
    );
  }


  /* ---------------------------------------------------------
     Q12 RESPONSE
     Perfect relationship
     --------------------------------------------------------- */

  function responseRound12(heard) {
    if (!heard) {
      return voiceDetected
        ? '"Mm."\n\n"I\'ll remember that."'
        : '"Keeping secrets from me?"';
    }


    if (
      containsAny(heard, [
        "space",
        "independent",
        "independence",
        "boundary",
        "boundaries",
        "freedom",
        "alone",
        "time apart"
      ])
    ) {
      return (
        '"Space."\n\n' +
        'His smile twitches.\n\n' +
        '"Right."\n\n' +
        '"People need space."\n\n' +
        '"...I can learn that."'
      );
    }


    if (
      containsAny(heard, [
        "loyal",
        "loyalty",
        "faithful",
        "forever",
        "always",
        "together"
      ])
    ) {
      return (
        '"Loyalty."\n\n' +
        '"Together."\n\n' +
        'His expression softens.\n\n' +
        '"See? You get it."\n\n' +
        '"Why would anyone need anything else?"'
      );
    }


    if (
      containsAny(heard, [
        "trust",
        "honesty",
        "honest",
        "communication",
        "communicate"
      ])
    ) {
      return (
        '"Trust and honesty."\n\n' +
        '"Good answer."\n\n' +
        '"No secrets."\n\n' +
        '"Nothing hidden from each other."\n\n' +
        '"I could do that."'
      );
    }


    return (
      '"Mm."\n\n' +
      '"I\'ll remember that."\n\n' +
      '"I\'m starting to build a pretty detailed picture of you, Azzy."'
    );
  }


  /* ---------------------------------------------------------
     Q13 RESPONSE
     "Say my name."
     --------------------------------------------------------- */

  function responseRound13(heard) {
    if (saidCorde(heard)) {
      if (
        typeof game === "object" &&
        game
      ) {
        game.calledHimCorde = true;

        if (
          typeof game.affection === "number"
        ) {
          game.affection += 2;

          if (
            typeof updateAffection === "function"
          ) {
            updateAffection();
          }
        }
      }

      return (
        '"..."\n\n' +
        'His entire expression freezes.\n\n' +
        '"Corde?"\n\n' +
        'He stares at you for a second too long.\n\n' +
        '"Nobody calls me that."\n\n' +
        'A tiny smile pulls at the corner of his mouth.\n\n' +
        '"Where did you hear that name?"\n\n' +
        '"...Azzy?"'
      );
    }


    if (saidAce(heard)) {
      return (
        '"..."\n\n' +
        'Yan\'De\'s expression drops.\n\n' +
        '"Ace?"\n\n' +
        '"That wasn\'t the name I asked for, Azzy."\n\n' +
        '"Why was that the first name that came to mind?"'
      );
    }


    if (saidYande(heard)) {
      return (
        '"...Again."\n\n' +
        'His smile slowly returns.\n\n' +
        '"I like hearing you say it."\n\n' +
        '"More than I should."'
      );
    }


    if (saidDe(heard)) {
      return (
        '"De."\n\n' +
        'His eyes narrow slightly, but not in anger.\n\n' +
        '"You really do remember me."\n\n' +
        '"I\'m not sure if that makes me feel better..."\n\n' +
        '"...or worse."'
      );
    }


    if (!heard) {
      return voiceDetected
        ? '"I heard you speak."\n\n' +
          '"But I didn\'t hear my name."\n\n' +
          '"Try not to disappoint me next time."'
        : '"You couldn\'t even say my name?"';
    }


    return (
      '"That\'s not my name."\n\n' +
      'He tilts his head.\n\n' +
      '"Were you nervous?"\n\n' +
      '"Or were you testing me?"'
    );
  }


  /* ---------------------------------------------------------
     Q14 RESPONSE
     Camera + "What do you think of me now?"
     --------------------------------------------------------- */

  function responseRound14(heard) {
    if (!cameraStream) {
      if (heard) {
        return (
          '"Still hiding from me..."\n\n' +
          '"But you\'ll talk to me."\n\n' +
          '"Interesting compromise."'
        );
      }

      return (
        '"Still hiding from me?"\n\n' +
        '"That\'s okay."\n\n' +
        '"I\'m patient."'
      );
    }


    if (
      containsAny(heard, [
        "cute",
        "handsome",
        "hot",
        "pretty",
        "beautiful",
        "attractive",
        "good looking",
        "love you",
        "like you"
      ])
    ) {
      return (
        '"..."\n\n' +
        'For once, Yan\'De looks genuinely caught off guard.\n\n' +
        '"You can\'t just say things like that while I\'m looking at you."\n\n' +
        '"That\'s unfair."'
      );
    }


    if (
      containsAny(heard, [
        "scary",
        "creepy",
        "weird",
        "crazy",
        "insane",
        "terrifying"
      ])
    ) {
      return (
        '"Scary?"\n\n' +
        'His grin widens.\n\n' +
        '"But you\'re still here."\n\n' +
        '"So I can\'t be doing that badly."'
      );
    }


    if (heard) {
      return (
        '"Mm."\n\n' +
        '"I was watching your face while you answered."\n\n' +
        '"I think I learned more from that than the words."'
      );
    }


    return (
      '"Now I can see you."\n\n' +
      '"Much better."\n\n' +
      '"You\'re very quiet when you know I\'m looking at you."'
    );
  }


  /* ---------------------------------------------------------
     Q15 RESPONSE
     "Do you trust me?"
     --------------------------------------------------------- */

  function responseRound15(heard) {
    const calledCorde =
      Boolean(
        typeof game === "object" &&
        game &&
        game.calledHimCorde
      );


    const yes =
      containsAny(heard, [
        "yes",
        "yeah",
        "yep",
        "i do",
        "i trust you",
        "of course",
        "absolutely",
        "sure"
      ]);


    const no =
      containsAny(heard, [
        "no",
        "nope",
        "i don't",
        "i dont",
        "do not",
        "don't trust",
        "dont trust",
        "not really",
        "never"
      ]);


    const unsure =
      containsAny(heard, [
        "maybe",
        "i don't know",
        "i dont know",
        "not sure",
        "unsure",
        "kind of",
        "kinda",
        "a little"
      ]);


    if (calledCorde && yes) {
      return (
        '"You called me Corde earlier."\n\n' +
        '"And now you\'re telling me you trust me."\n\n' +
        'He smiles slowly.\n\n' +
        '"That\'s dangerous, Azzy."\n\n' +
        '"You have no idea what that does to me."'
      );
    }


    if (calledCorde && no) {
      return (
        '"No?"\n\n' +
        '"Interesting."\n\n' +
        '"You know enough to call me Corde..."\n\n' +
        '"But not enough to trust me."\n\n' +
        '"I think I want to know why."'
      );
    }


    if (yes) {
      return (
        '"Good."\n\n' +
        'He answers much too quickly.\n\n' +
        '"I knew you would."\n\n' +
        '"I just wanted to hear you say it."'
      );
    }


    if (no) {
      return (
        '"No."\n\n' +
        'There is a long silence.\n\n' +
        '"Thank you for being honest."\n\n' +
        'He smiles again.\n\n' +
        '"I can fix that."'
      );
    }


    if (unsure) {
      return (
        '"Maybe."\n\n' +
        '"That\'s not a yes."\n\n' +
        '"But it isn\'t a no either."\n\n' +
        '"I can work with that."'
      );
    }


    if (heard) {
      return (
        '"You didn\'t answer the question."\n\n' +
        '"That\'s an answer too, I guess."'
      );
    }


    return voiceDetected
      ? '"You\'re avoiding the question."\n\n' +
        '"Cute."'
      : '"Nothing?"\n\n' +
        '"I\'ll take the silence as a maybe."';
  }


  /* ---------------------------------------------------------
     SMART FINISH VOICE ROUND
     --------------------------------------------------------- */

  function actuallyFinishVoiceRound() {
    clearElement(
      $("#date-options")
    );

    const heard =
      heardText();

    let response = "";


    if (dateRound === 11) {
      response =
        responseRound11(heard);

    } else if (dateRound === 12) {
      response =
        responseRound12(heard);

    } else if (dateRound === 13) {
      response =
        responseRound13(heard);

    } else if (dateRound === 14) {
      response =
        responseRound14(heard);

    } else if (dateRound === 15) {
      response =
        responseRound15(heard);
    }


    console.log(
      `[LOVESICK] Date round ${dateRound} speech:`,
      heard || "(no transcript)"
    );


    setDateText(
      `YAN'DE: ${response}`
    );


    finishingVoiceRound = false;


    if (dateRound === 15) {
      setTimeout(
        cutFeed,
        2600
      );

    } else {
      setTimeout(() => {
        dateRound++;
        renderDateRound();
      }, 2200);
    }
  }


  finishVoiceRound = function() {
    if (finishingVoiceRound) {
      return;
    }

    finishingVoiceRound = true;


    /*
      Stopping speech recognition causes Chrome to flush
      the final transcription. Give it a moment before
      Yan'De evaluates what was said.
    */
    if (
      dateRecognition &&
      recognitionRunning
    ) {
      try {
        dateRecognition.stop();
      } catch (error) {
        /* Already stopped. */
      }

      setTimeout(
        actuallyFinishVoiceRound,
        350
      );

    } else {
      setTimeout(
        actuallyFinishVoiceRound,
        80
      );
    }
  };


  /* ---------------------------------------------------------
     STOP SPEECH RECOGNITION WITH EXISTING MEDIA CLEANUP
     --------------------------------------------------------- */

  const originalStopMedia =
    stopMedia;

  stopMedia = function() {
    stopDateRecognition();

    speechFinal = "";
    speechInterim = "";
    finishingVoiceRound = false;

    return originalStopMedia();
  };


  console.log(
    "[LOVESICK] Smart dinner date ready.",
    SpeechRecognitionAPI
      ? "Speech recognition available."
      : "Speech recognition unavailable; audio-level fallback active."
  );
})();

cd ~/MyVisualNovel/LOVESICK

cat >> game.js <<'EOF'

/* =========================================================
   LOVESICK — iOS ADD TO HOME SCREEN BUTTON
   ========================================================= */

(() => {
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (
      navigator.platform === "MacIntel" &&
      navigator.maxTouchPoints > 1
    );

  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;

  function buildIOSInstallButton() {
    if (!isIOS || isStandalone) return;

    const titleScreen =
      document.querySelector("#title-screen");

    if (!titleScreen) return;

    if (
      document.querySelector(
        "#lovesick-ios-install-button"
      )
    ) {
      return;
    }

    const button = document.createElement("button");

    button.id =
      "lovesick-ios-install-button";

    button.type = "button";

    button.innerHTML = `
      <span class="ios-install-icon">
        ⬆
      </span>

      <span>
        ADD LOVESICK TO HOME SCREEN
      </span>
    `;

    button.addEventListener(
      "click",
      openIOSInstallHelp
    );

    const overlay =
      titleScreen.querySelector(
        ".title-overlay"
      ) || titleScreen;

    overlay.appendChild(button);
  }


  function openIOSInstallHelp() {
    let overlay =
      document.querySelector(
        "#lovesick-ios-install-overlay"
      );

    if (!overlay) {
      overlay =
        document.createElement("div");

      overlay.id =
        "lovesick-ios-install-overlay";

      overlay.innerHTML = `
        <div
          id="lovesick-ios-install-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Install LOVESICK"
        >
          <button
            id="lovesick-ios-install-close"
            type="button"
            aria-label="Close"
          >
            ×
          </button>

          <div class="ios-install-heart">
            ♥
          </div>

          <h2>
            KEEP LOVESICK WITH YOU
          </h2>

          <p>
            Install LOVESICK like an app
            on your iPhone or iPad.
          </p>

          <div class="ios-install-step">
            <strong>1.</strong>
            Tap Safari's
            <b>Share</b> button.
          </div>

          <div class="ios-install-arrow">
            ↑
          </div>

          <div class="ios-install-step">
            <strong>2.</strong>
            Choose
            <b>Add to Home Screen</b>.
          </div>

          <div class="ios-install-step">
            <strong>3.</strong>
            Turn on
            <b>Open as Web App</b>.
          </div>

          <div class="ios-install-step">
            <strong>4.</strong>
            Tap <b>Add</b>.
          </div>

          <p class="ios-install-note">
            Yan'De would probably prefer
            you didn't delete it. ♡
          </p>
        </div>
      `;

      document.body.appendChild(
        overlay
      );

      document
        .querySelector(
          "#lovesick-ios-install-close"
        )
        .addEventListener(
          "click",
          closeIOSInstallHelp
        );

      overlay.addEventListener(
        "click",
        event => {
          if (event.target === overlay) {
            closeIOSInstallHelp();
          }
        }
      );
    }

    overlay.classList.add("visible");
  }


  function closeIOSInstallHelp() {
    const overlay =
      document.querySelector(
        "#lovesick-ios-install-overlay"
      );

    if (overlay) {
      overlay.classList.remove(
        "visible"
      );
    }
  }


  const style =
    document.createElement("style");

  style.id =
    "lovesick-ios-install-styles";

  style.textContent = `

    #lovesick-ios-install-button {
      width: min(560px, 92%);
      margin: 14px auto 0;
      padding: 14px 18px;

      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;

      border: 1px solid
        rgba(255, 90, 160, .65);

      border-radius: 14px;

      background:
        rgba(15, 10, 20, .86);

      color: #fff;

      font-family:
        Comfortaa,
        sans-serif;

      font-weight: 700;
      letter-spacing: .04em;

      cursor: pointer;

      box-shadow:
        0 0 18px
        rgba(255, 70, 150, .14);
    }

    #lovesick-ios-install-button:hover {
      transform: translateY(-1px);

      box-shadow:
        0 0 24px
        rgba(255, 70, 150, .27);
    }

    .ios-install-icon {
      width: 30px;
      height: 30px;

      display: inline-flex;
      justify-content: center;
      align-items: center;

      border: 2px solid #fff;
      border-radius: 7px;

      font-size: 21px;
      line-height: 1;
    }

    #lovesick-ios-install-overlay {
      position: fixed;
      inset: 0;

      z-index: 999999;

      display: none;
      align-items: center;
      justify-content: center;

      padding: 20px;

      background:
        rgba(0, 0, 0, .82);

      backdrop-filter:
        blur(8px);
    }

    #lovesick-ios-install-overlay.visible {
      display: flex;
    }

    #lovesick-ios-install-panel {
      position: relative;

      width: min(430px, 95vw);

      padding:
        30px 24px 26px;

      border:
        1px solid
        rgba(255, 85, 155, .8);

      border-radius: 20px;

      background:
        linear-gradient(
          180deg,
          #140d19,
          #09070d
        );

      color: white;

      text-align: center;

      box-shadow:
        0 0 45px
        rgba(255, 55, 140, .25);
    }

    #lovesick-ios-install-panel h2 {
      margin:
        8px 0 12px;

      font-family:
        Impact,
        Haettenschweiler,
        "Arial Narrow Bold",
        sans-serif;

      letter-spacing:
        .05em;

      font-size:
        clamp(28px, 7vw, 42px);
    }

    #lovesick-ios-install-close {
      position: absolute;
      right: 12px;
      top: 8px;

      border: 0;
      background: transparent;

      color: white;

      font-size: 30px;
      cursor: pointer;
    }

    .ios-install-heart {
      font-size: 52px;

      color: #ff4f91;

      text-shadow:
        0 0 20px
        rgba(255, 79, 145, .65);
    }

    .ios-install-step {
      margin: 10px 0;

      padding: 12px;

      border-radius: 12px;

      background:
        rgba(255, 255, 255, .06);

      text-align: left;
    }

    .ios-install-arrow {
      font-size: 25px;
      color: #ff4f91;
    }

    .ios-install-note {
      margin-top: 18px;

      opacity: .72;

      font-size: .86rem;
    }

  `;

  if (
    !document.querySelector(
      "#lovesick-ios-install-styles"
    )
  ) {
    document.head.appendChild(style);
  }


  if (
    document.readyState === "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      buildIOSInstallButton
    );

  } else {
    buildIOSInstallButton();
  }

})();

