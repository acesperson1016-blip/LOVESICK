from kivy.app import App
from kivy.uix.screenmanager import ScreenManager, Screen
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.button import Button
from kivy.uix.label import Label
from kivy.uix.textinput import TextInput
from kivy.clock import Clock
from kivy.core.window import Window

Window.size = (1000, 650)

STORY = {
    "intro": {
        "scene": "CITY — 11:47 PM\nRain glosses the pavement. A train screams somewhere beyond the buildings.",
        "speaker": "???",
        "text": "Someone is standing beneath a broken streetlamp. They are watching you like they have been waiting all night.",
        "choices": [
            ("Keep walking.", "meet", -1, 0),
            ("Ask if they're okay.", "meet", 1, 1),
            ("Stare back.", "meet", 1, 0),
        ],
    },

    "meet": {
        "scene": "SIDE STREET",
        "speaker": "Yan'De",
        "text": "\"Azzy.\" Your name sounds wrong in their mouth — too familiar.",
        "choices": [
            ("Ask how they know your name.", "note", 1, 1),
            ("Tell them to leave you alone.", "doctor", -1, 0),
            ("Ask who they are.", "note", 1, 0),
        ],
    },

    "note": {
        "scene": "THE NEXT DAY",
        "speaker": "Azzy",
        "text": "A note is tucked into your bag. It says: \"I hope today hurts less.\" You have no idea how it got there.",
        "choices": [
            ("Keep the note.", "shrine", 2, 0),
            ("Throw it away.", "doctor", -1, 2),
            ("Show it to someone.", "doctor", 0, 3),
        ],
    },

    "doctor": {
        "scene": "DR. ACE BRIGHTON'S OFFICE",
        "speaker": "Dr. Ace Brighton",
        "text": "Dr. Brighton studies the note. \"Yan'De has a problem with obsession. Please don't confuse obsession with love.\"",
        "choices": [
            ("Listen to Ace.", "shrine", 0, 2),
            ("Defend Yan'De.", "shrine", 2, -1),
            ("Ask what Ace knows.", "shrine", 0, 3),
        ],
    },

    "shrine": {
        "scene": "YAN'DE'S APARTMENT",
        "speaker": "Azzy",
        "text": "You find it. A shrine. Photographs. Receipts. Little objects from places you've visited. The newest addition is from yesterday.",
        "choices": [
            ("Confront Yan'De.", "confront", 2, 0),
            ("Leave quietly.", "confront", 0, 2),
            ("Call Ace.", "confront", 0, 4),
        ],
    },

    "confront": {
        "scene": "CITY ROOFTOP — STORM",
        "speaker": "Yan'De",
        "text": "\"I never wanted to hurt you,\" Yan'De says. \"I wanted a world where you could never disappear.\"",
        "choices": [
            ("Tell them obsession isn't love.", "final", -2, 2),
            ("Tell them you understand.", "final", 3, 0),
            ("Ask Ace to intervene.", "final", 0, 4),
        ],
    },

    "final": {
        "scene": "THE LAST NIGHT",
        "speaker": "Yan'De",
        "text": "Yan'De looks at you. Behind them, the shrine waits in the darkness. \"Tell me what I am to you, Azzy.\"",
        "choices": [
            ("Choose Yan'De.", "ending", 4, 0),
            ("Choose yourself.", "ending", 0, 3),
            ("Choose Ace's help.", "ending", 0, 5),
        ],
    },
}


class GameState:
    def __init__(self):
        self.reset()

    def reset(self):
        self.name = "Azzy"
        self.node = "intro"
        self.affection = 0
        self.trust = 0
        self.ace = 0


class MenuScreen(Screen):
    def __init__(self, app, **kwargs):
        super().__init__(**kwargs)
        self.app = app

        layout = BoxLayout(
            orientation="vertical",
            padding=100,
            spacing=20
        )

        layout.add_widget(Label(
            text="[b]LOVESICK[/b]",
            markup=True,
            font_size=55
        ))

        layout.add_widget(Label(
            text="ROMANCE  •  HORROR",
            font_size=20
        ))

        layout.add_widget(Label(
            text="Everyone loves differently.\nYan'De just loves too much.",
            font_size=20
        ))

        new = Button(
            text="NEW GAME",
            size_hint_y=None,
            height=60
        )
        new.bind(on_release=self.new_game)
        layout.add_widget(new)

        quit_button = Button(
            text="QUIT",
            size_hint_y=None,
            height=60
        )
        quit_button.bind(on_release=lambda *_: App.get_running_app().stop())
        layout.add_widget(quit_button)

        self.add_widget(layout)

    def new_game(self, *_):
        self.app.state.reset()
        self.manager.current = "name"


class NameScreen(Screen):
    def __init__(self, app, **kwargs):
        super().__init__(**kwargs)
        self.app = app

        layout = BoxLayout(
            orientation="vertical",
            padding=100,
            spacing=20
        )

        layout.add_widget(Label(
            text="[b]BEFORE WE BEGIN...[/b]",
            markup=True,
            font_size=35
        ))

        layout.add_widget(Label(
            text="What should we call you?",
            font_size=22
        ))

        self.name_input = TextInput(
            hint_text="Type your name...",
            multiline=False,
            size_hint_y=None,
            height=55
        )

        layout.add_widget(self.name_input)

        layout.add_widget(Label(
            text="(Something tells you the name won't matter.)",
            italic=True
        ))

        start = Button(
            text="START",
            size_hint_y=None,
            height=60
        )
        start.bind(on_release=self.start)
        layout.add_widget(start)

        self.add_widget(layout)

    def start(self, *_):
        # The player's entered name is intentionally overwritten.
        self.app.state.name = "Azzy"
        self.app.state.node = "intro"
        self.app.state.affection = 0
        self.app.state.trust = 0
        self.app.state.ace = 0
        self.manager.current = "game"


class GameScreen(Screen):
    def __init__(self, app, **kwargs):
        super().__init__(**kwargs)
        self.app = app
        self.typing = None
        self.full_text = ""
        self.index = 0

        layout = BoxLayout(
            orientation="vertical",
            padding=20,
            spacing=10
        )

        self.stats = Label(
            text="",
            size_hint_y=None,
            height=40
        )
        layout.add_widget(self.stats)

        self.scene = Label(
            text="",
            font_size=19,
            halign="center",
            valign="middle"
        )
        layout.add_widget(self.scene)

        self.speaker = Label(
            text="",
            font_size=25,
            bold=True,
            size_hint_y=None,
            height=45
        )
        layout.add_widget(self.speaker)

        self.dialogue = Label(
            text="",
            font_size=22,
            halign="left",
            valign="top"
        )
        self.dialogue.bind(
            size=lambda *_: setattr(
                self.dialogue,
                "text_size",
                self.dialogue.size
            )
        )
        layout.add_widget(self.dialogue)

        self.choices = BoxLayout(
            orientation="vertical",
            spacing=8,
            size_hint_y=None
        )
        layout.add_widget(self.choices)

        self.next_button = Button(
            text="NEXT",
            size_hint_y=None,
            height=55
        )
        self.next_button.bind(on_release=self.next)
        layout.add_widget(self.next_button)

        self.add_widget(layout)

    def on_pre_enter(self):
        self.show_node()

    def show_node(self):
        if self.typing:
            self.typing.cancel()

        node = STORY[self.app.state.node]

        self.stats.text = (
            f"❤ Yan'De: {self.app.state.affection}    "
            f"TRUST: {self.app.state.trust}    "
            f"ACE: {self.app.state.ace}"
        )

        self.scene.text = node["scene"]
        self.speaker.text = node["speaker"]

        self.full_text = node["text"]
        self.index = 0
        self.dialogue.text = ""

        self.choices.clear_widgets()

        if node.get("choices"):
            self.next_button.disabled = True
            self.next_button.opacity = 0
            self.choices.height = len(node["choices"]) * 55 + 10

            for text, destination, affection, ace in node["choices"]:
                button = Button(
                    text=text,
                    size_hint_y=None,
                    height=48
                )

                def choose(
                    instance,
                    destination=destination,
                    affection=affection,
                    ace=ace
                ):
                    self.app.state.affection += affection
                    self.app.state.ace += ace
                    self.app.state.node = destination

                    if destination == "ending":
                        self.show_ending()
                    else:
                        self.show_node()

                button.bind(on_release=choose)
                self.choices.add_widget(button)

        self.typing = Clock.schedule_interval(
            self.type_character,
            0.018
        )

    def type_character(self, dt):
        if self.index >= len(self.full_text):
            self.typing.cancel()
            self.typing = None
            return False

        self.index += 1
        self.dialogue.text = self.full_text[:self.index]
        return True

    def next(self, *_):
        if self.typing:
            self.dialogue.text = self.full_text
            self.typing.cancel()
            self.typing = None

    def show_ending(self):
        state = self.app.state

        if state.ace >= 6:
            ending = "INTERVENTION"
        elif state.affection >= 8:
            ending = "SICKNESS"
        elif state.trust >= 3:
            ending = "ESCAPE"
        else:
            ending = "DEVOTION"

        self.app.ending = ending
        self.manager.current = "ending"


class EndingScreen(Screen):
    def __init__(self, app, **kwargs):
        super().__init__(**kwargs)
        self.app = app

        layout = BoxLayout(
            orientation="vertical",
            padding=100,
            spacing=25
        )

        self.title = Label(
            text="",
            font_size=40,
            bold=True
        )
        layout.add_widget(self.title)

        self.body = Label(
            text="",
            font_size=22,
            halign="center",
            valign="middle"
        )
        self.body.bind(
            size=lambda *_: setattr(
                self.body,
                "text_size",
                self.body.size
            )
        )
        layout.add_widget(self.body)

        again = Button(
            text="PLAY AGAIN",
            size_hint_y=None,
            height=60
        )
        again.bind(on_release=self.play_again)
        layout.add_widget(again)

        self.add_widget(layout)

    def on_pre_enter(self):
        endings = {
            "DEVOTION":
                "Yan'De's shrine becomes a shared secret.\n\n"
                "They promise to learn the difference between "
                "loving you and possessing you.\n\n"
                "The promise sounds sincere.\n"
                "The locked door behind you is less reassuring.\n\n"
                "ENDING 1 — DEVOTION",

            "ESCAPE":
                "You leave the city before sunrise.\n\n"
                "Yan'De doesn't follow.\n\n"
                "For the first time, silence feels like freedom.\n\n"
                "Months later, a package arrives with no return address.\n"
                "Inside is one photograph of an empty street.\n\n"
                "ENDING 2 — ESCAPE",

            "INTERVENTION":
                "Ace gets Yan'De the help they need.\n\n"
                "The shrine is dismantled piece by piece.\n\n"
                "It isn't a happy ending exactly.\n"
                "But everyone is alive.\n\n"
                "And alive is enough.\n\n"
                "ENDING 3 — INTERVENTION",

            "SICKNESS":
                "You tell Yan'De that if loving you is a sickness, "
                "then you're willing to get sick too.\n\n"
                "The shrine gains a new centerpiece:\n"
                "a photograph of the two of you together.\n\n"
                "Behind it, the lock clicks.\n\n"
                "ENDING 4 — SICKNESS"
        }

        self.title.text = self.app.ending
        self.body.text = endings[self.app.ending]

    def play_again(self, *_):
        self.app.state.reset()
        self.manager.current = "name"


class LovesickApp(App):
    def build(self):
        self.state = GameState()
        self.ending = "DEVOTION"

        manager = ScreenManager()

        manager.add_widget(
            MenuScreen(self, name="menu")
        )

        manager.add_widget(
            NameScreen(self, name="name")
        )

        manager.add_widget(
            GameScreen(self, name="game")
        )

        manager.add_widget(
            EndingScreen(self, name="ending")
        )

        return manager


if __name__ == "__main__":
    LovesickApp().run()
