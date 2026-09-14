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
