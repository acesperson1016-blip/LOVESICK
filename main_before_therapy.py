from kivy.app import App
from kivy.uix.screenmanager import ScreenManager, Screen, FadeTransition
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.floatlayout import FloatLayout
from kivy.uix.label import Label
from kivy.uix.button import Button
from kivy.uix.textinput import TextInput
from kivy.uix.image import Image
from kivy.graphics import Color, RoundedRectangle, Rectangle
from kivy.clock import Clock
from kivy.core.window import Window
from kivy.animation import Animation


# ============================================================
# WINDOW
# ============================================================

Window.clearcolor = (0.025, 0.018, 0.032, 1)


# ============================================================
# COLORS
# ============================================================

TEXT = (0.97, 0.94, 0.99, 1)
MUTED = (0.70, 0.65, 0.74, 1)

DARK = (0.025, 0.018, 0.032, 1)

PANEL = (0.055, 0.035, 0.070, 0.95)

PANEL_LIGHT = (0.10, 0.055, 0.12, 0.96)

PURPLE = (0.60, 0.22, 0.73, 1)

PINK = (0.95, 0.22, 0.62, 1)

BLUE = (0.25, 0.56, 0.90, 1)

RED = (0.80, 0.15, 0.24, 1)


# ============================================================
# GAME STATE
# ============================================================

class GameState:

    def __init__(self):
        self.reset()

    def reset(self):

        self.name = "AZZY"

        self.yande_affection = 0

        self.ace_relationship = 0

        self.ending = None


game = GameState()


# ============================================================
# SPRITES
# ============================================================

SPRITES = {

    "Azzy": {

        "neutral":
            "assets/sprites/azzy/azzyneutral.png",

        "happy":
            "assets/sprites/azzy/azzyhappy.png",

        "worried":
            "assets/sprites/azzy/azzyworried.png",

        "annoyed":
            "assets/sprites/azzy/azzyannoyed.png",

        "scared":
            "assets/sprites/azzy/azzyscared.png",

        "tired":
            "assets/sprites/azzy/azzytired.png",
    },

    "Yan'De": {

        "neutral":
            "assets/sprites/yande/yandeneutral.png",

        "soft":
            "assets/sprites/yande/yandesoft.png",

        "playful":
            "assets/sprites/yande/yandeplayful.png",

        "jealous":
            "assets/sprites/yande/yandejealous.png",

        "serious":
            "assets/sprites/yande/yandeserious.png",

        "obsessed":
            "assets/sprites/yande/yandeobsessed.png",
    },

    "Dr. Ace Brighton": {

        "neutral":
            "assets/sprites/ace/aceneutral.png",

        "smiling":
            "assets/sprites/ace/acesmiling.png",

        "stress":
            "assets/sprites/ace/acestress.png",

        "tired":
            "assets/sprites/ace/acetired.png",

        "firm":
            "assets/sprites/ace/acefirm.png",

        "worried":
            "assets/sprites/ace/aceworried.png",
    },
}


# ============================================================
# UI CLASSES
# ============================================================

class Panel(BoxLayout):

    def __init__(
        self,
        bg_color=PANEL,
        radius=18,
        **kwargs
    ):

        super().__init__(**kwargs)

        self.bg_color = bg_color

        with self.canvas.before:

            self.color_instruction = Color(
                *self.bg_color
            )

            self.background_rect = RoundedRectangle(
                pos=self.pos,
                size=self.size,
                radius=[radius]
            )

        self.bind(
            pos=self.update_background,
            size=self.update_background
        )

    def update_background(
        self,
        *args
    ):

        self.background_rect.pos = self.pos

        self.background_rect.size = self.size


class ClickableDialogue(Label):

    def __init__(
        self,
        click_callback=None,
        **kwargs
    ):

        super().__init__(**kwargs)

        self.click_callback = click_callback

    def on_touch_down(
        self,
        touch
    ):

        if self.collide_point(
            *touch.pos
        ):

            if self.click_callback:

                self.click_callback()

                return True

        return super().on_touch_down(
            touch
        )


# ============================================================
# HELPERS
# ============================================================

def make_label(
    text="",
    size=20,
    color=TEXT,
    halign="center",
    valign="middle"
):

    label = Label(

        text=text,

        font_size=size,

        color=color,

        halign=halign,

        valign=valign
    )

    def update_text_size(
        instance,
        value
    ):

        instance.text_size = (

            max(
                10,
                value[0] - 18
            ),

            value[1]
        )

    label.bind(
        size=update_text_size
    )

    return label


# ============================================================
# ACHIEVEMENT BANNER
# ============================================================

class AchievementBanner(Panel):

    def __init__(
        self,
        achievement_title,
        subtitle="",
        **kwargs
    ):

        super().__init__(
            bg_color=(
                0.12,
                0.045,
                0.14,
                0.98
            ),
            radius=20,
            orientation="vertical",
            padding=(16, 10),
            spacing=2,
            size_hint=(None, None),
            **kwargs
        )

        heading = Label(

            text="★ ACHIEVEMENT UNLOCKED ★",

            font_size=15,

            bold=True,

            color=(
                1,
                0.75,
                0.95,
                1
            ),

            halign="left",

            valign="middle"
        )

        title = Label(

            text=achievement_title,

            font_size=18,

            bold=True,

            color=TEXT,

            halign="left",

            valign="middle"
        )

        subtitle_label = Label(

            text=subtitle,

            font_size=13,

            color=MUTED,

            halign="left",

            valign="middle"
        )

        for item in (
            heading,
            title,
            subtitle_label
        ):

            item.bind(

                size=lambda obj, value:
                setattr(
                    obj,
                    "text_size",
                    value
                )
            )

        self.add_widget(
            heading
        )

        self.add_widget(
            title
        )

        self.add_widget(
            subtitle_label
        )


def show_achievement(
    parent,
    title,
    subtitle=""
):

    banner = AchievementBanner(
        title,
        subtitle
    )

    banner.width = max(
        320,
        parent.width * 0.40
    )

    banner.height = max(
        95,
        parent.height * 0.12
    )

    banner.x = (
        parent.width + 20
    )

    banner.y = (
        parent.height
        - banner.height
        - 24
    )

    parent.add_widget(
        banner
    )

    target_x = (
        parent.width
        - banner.width
        - 20
    )

    slide_in = Animation(
        x=target_x,
        duration=0.35,
        t="out_quad"
    )

    hold = Animation(
        duration=2.8
    )

    slide_out = Animation(
        x=parent.width + 30,
        duration=0.35,
        t="in_quad"
    )

    animation = (
        slide_in
        + hold
        + slide_out
    )

    def remove_banner(
        animation,
        widget
    ):

        if widget.parent:

            widget.parent.remove_widget(
                widget
            )

    animation.bind(
        on_complete=remove_banner
    )

    animation.start(
        banner
    )


# ============================================================
# MENU
# ============================================================

class MenuScreen(Screen):

    def on_enter(
        self
    ):

        self.clear_widgets()

        root = FloatLayout()

        # ----------------------------------------------------
        # LARGE BACKGROUND YAN'DE
        # ----------------------------------------------------

        background_sprite = Image(

            source=SPRITES[
                "Yan'De"
            ][
                "soft"
            ],

            fit_mode="contain",

            size_hint=(
                0.72,
                0.90
            ),

            pos_hint={
                "right": 1.07,
                "center_y": 0.49
            },

            opacity=0.52
        )

        root.add_widget(
            background_sprite
        )

        # ----------------------------------------------------
        # DARK OVERLAY
        # ----------------------------------------------------

        overlay = BoxLayout(
            size_hint=(1, 1)
        )

        with overlay.canvas.before:

            Color(
                0.02,
                0.01,
                0.03,
                0.42
            )

            overlay_rect = Rectangle(
                pos=overlay.pos,
                size=overlay.size
            )

        def update_overlay(
            instance,
            value
        ):

            overlay_rect.pos = (
                instance.pos
            )

            overlay_rect.size = (
                instance.size
            )

        overlay.bind(
            pos=update_overlay,
            size=update_overlay
        )

        root.add_widget(
            overlay
        )

        # ----------------------------------------------------
        # TITLE
        # ----------------------------------------------------

        title = Label(

            text="LOVESICK",

            font_size=62,

            bold=True,

            color=(
                1,
                0.88,
                0.98,
                1
            ),

            size_hint=(
                0.54,
                0.18
            ),

            pos_hint={
                "x": 0.055,
                "top": 0.91
            },

            halign="left",

            valign="middle"
        )

        title.bind(
            size=lambda obj, value:
            setattr(
                obj,
                "text_size",
                value
            )
        )

        root.add_widget(
            title
        )

        subtitle = Label(

            text=
                "love isn't supposed to hurt.",

            font_size=19,

            italic=True,

            color=(
                0.86,
                0.61,
                0.83,
                1
            ),

            size_hint=(
                0.50,
                0.08
            ),

            pos_hint={
                "x": 0.065,
                "top": 0.72
            },

            halign="left",

            valign="middle"
        )

        subtitle.bind(

            size=lambda obj, value:
            setattr(
                obj,
                "text_size",
                value
            )
        )

        root.add_widget(
            subtitle
        )

        # ----------------------------------------------------
        # BUTTON PANEL
        # ----------------------------------------------------

        menu_box = BoxLayout(

            orientation="vertical",

            spacing=12,

            size_hint=(
                0.36,
                0.32
            ),

            pos_hint={
                "x": 0.065,
                "y": 0.13
            }
        )

        new_game = Button(

            text="NEW GAME",

            font_size=20
        )

        quit_button = Button(

            text="QUIT",

            font_size=20
        )

        menu_box.add_widget(
            new_game
        )

        menu_box.add_widget(
            quit_button
        )

        root.add_widget(
            menu_box
        )

        version = Label(

            text="LOVESICK  •  prototype",

            font_size=12,

            color=MUTED,

            size_hint=(
                0.38,
                0.05
            ),

            pos_hint={
                "x": 0.06,
                "y": 0.035
            },

            halign="left"
        )

        version.bind(

            size=lambda obj, value:
            setattr(
                obj,
                "text_size",
                value
            )
        )

        root.add_widget(
            version
        )

        self.add_widget(
            root
        )

        new_game.bind(
            on_release=self.start_game
        )

        quit_button.bind(

            on_release=lambda x:
            App.get_running_app().stop()
        )

    def start_game(
        self,
        instance
    ):

        game.reset()

        self.manager.current = (
            "name"
        )


# ============================================================
# NAME SCREEN
# ============================================================

class NameScreen(Screen):

    def on_enter(
        self
    ):

        self.clear_widgets()

        self.changing_name = False

        root = FloatLayout()

        center_panel = Panel(

            bg_color=(
                0.06,
                0.035,
                0.075,
                0.97
            ),

            radius=22,

            orientation="vertical",

            padding=28,

            spacing=14,

            size_hint=(
                0.62,
                0.52
            ),

            pos_hint={
                "center_x": 0.5,
                "center_y": 0.52
            }
        )

        title = make_label(
            "Before we begin...",
            31
        )

        prompt = make_label(
            "What should we call you?",
            20,
            MUTED
        )

        self.name_input = TextInput(

            text="",

            hint_text=
                "Enter your name...",

            multiline=False,

            font_size=22,

            size_hint_y=None,

            height=60
        )

        self.enter_button = Button(

            text="ENTER",

            font_size=20,

            size_hint_y=None,

            height=58
        )

        center_panel.add_widget(
            title
        )

        center_panel.add_widget(
            prompt
        )

        center_panel.add_widget(
            self.name_input
        )

        center_panel.add_widget(
            self.enter_button
        )

        root.add_widget(
            center_panel
        )

        self.add_widget(
            root
        )

        self.name_input.bind(

            on_text_validate=
                self.force_azzy
        )

        self.enter_button.bind(

            on_release=
                self.force_azzy
        )

        Clock.schedule_once(

            lambda dt:
            setattr(
                self.name_input,
                "focus",
                True
            ),

            0.15
        )

    def force_azzy(
        self,
        instance
    ):

        if self.changing_name:

            return

        self.changing_name = True

        self.name_input.text = (
            "AZZY"
        )

        game.name = "AZZY"

        self.name_input.readonly = (
            True
        )

        self.enter_button.disabled = (
            True
        )

        Clock.schedule_once(
            self.begin_story,
            0.85
        )

    def begin_story(
        self,
        dt
    ):

        self.manager.current = (
            "game"
        )


# ============================================================
# STORY
# ============================================================

STORY = {

    "intro": {

        "speaker": "Azzy",

        "expression": "tired",

        "text":
            "The rain has been falling for three days.\n\n"
            "You keep telling yourself that you're imagining "
            "the footsteps outside your window.",

        "choices": [

            (
                "Look outside.",
                "outside",
                0,
                0
            ),

            (
                "Stay in bed.",
                "stay",
                1,
                0
            )
        ]
    },

    "outside": {

        "speaker": "Azzy",

        "expression": "worried",

        "text":
            "Nobody is there.\n\n"
            "Except for a small envelope sitting beneath "
            "your window.",

        "choices": [

            (
                "Pick up the envelope.",
                "note",
                1,
                0
            ),

            (
                "Leave it alone.",
                "note",
                0,
                1
            )
        ]
    },

    "stay": {

        "speaker": "Azzy",

        "expression": "scared",

        "text":
            "You pull the blanket over your head.\n\n"
            "Three quiet knocks come from the window.",

        "choices": [

            (
                "Open the curtains.",
                "note",
                1,
                0
            ),

            (
                "Ignore the knocking.",
                "note",
                0,
                1
            )
        ]
    },

    "note": {

        "speaker": "Yan'De",

        "expression": "neutral",

        "text":
            "\"I know you're awake.\"\n\n"
            "There is no signature.\n\n"
            "You already know who wrote it.",

        "choices": [

            (
                "Write back: \"Hi.\"",
                "yande",
                2,
                0
            ),

            (
                "Tear it up.",
                "yande",
                -1,
                0
            )
        ]
    },

    "yande": {

        "speaker": "Yan'De",

        "expression": "soft",

        "text":
            "A message appears almost immediately.\n\n"
            "\"You remembered me.\"\n\n"
            "You don't remember telling him where you live.",

        "choices": [

            (
                "\"Of course I did.\"",
                "date",
                3,
                0
            ),

            (
                "\"This is getting creepy.\"",
                "date",
                -1,
                0
            )
        ]
    },

    "date": {

        "speaker": "Yan'De",

        "expression": "playful",

        "text":
            "\"Come meet me tomorrow.\"\n\n"
            "\"Just us. No doctors. No friends.\"\n\n"
            "The last sentence makes your stomach tighten.",

        "choices": [

            (
                "Agree to meet.",
                "doctor",
                3,
                0
            ),

            (
                "Refuse.",
                "doctor",
                -3,
                0
            )
        ]
    },

    "doctor": {

        "speaker":
            "Dr. Ace Brighton",

        "expression":
            "neutral",

        "text":
            "The next morning, you find yourself sitting "
            "across from Dr. Ace Brighton.\n\n"
            "\"Tell me about Yan'De,\" Ace says.",

        "choices": [

            (
                "Tell Ace everything.",
                "ace_good",
                0,
                3
            ),

            (
                "Defend Yan'De.",
                "ace_bad",
                2,
                0
            )
        ]
    },

    "ace_good": {

        "speaker":
            "Dr. Ace Brighton",

        "expression":
            "smiling",

        "text":
            "\"I'm glad you told me.\"\n\n"
            "Ace lowers his voice.\n\n"
            "\"If you ever feel unsafe, you can come here.\"",

        "choices": [

            (
                "Thank Ace.",
                "confront",
                0,
                3
            ),

            (
                "Say nothing.",
                "confront",
                0,
                1
            )
        ]
    },

    "ace_bad": {

        "speaker":
            "Dr. Ace Brighton",

        "expression":
            "firm",

        "text":
            "Ace studies you carefully.\n\n"
            "\"You don't have to protect someone from "
            "the consequences of their own behavior.\"",

        "choices": [

            (
                "Change the subject.",
                "confront",
                0,
                1
            ),

            (
                "Defend Yan'De again.",
                "confront",
                2,
                -1
            )
        ]
    },

    "confront": {

        "speaker": "Yan'De",

        "expression": "jealous",

        "text":
            "That evening, Yan'De is waiting outside.\n\n"
            "\"You talked to Ace.\"\n\n"
            "His smile doesn't reach his eyes.",

        "choices": [

            (
                "\"Yes.\"",
                "final_choice",
                -2,
                2
            ),

            (
                "\"No.\"",
                "final_choice",
                2,
                -1
            )
        ]
    },

    "final_choice": {

        "speaker": "Yan'De",

        "expression": "obsessed",

        "text":
            "\"Then tell me.\"\n\n"
            "\"Do you love me?\"",

        "choices": [

            (
                "\"Yes.\"",
                "ending_check",
                5,
                0
            ),

            (
                "\"No.\"",
                "ending_check",
                -5,
                0
            ),

            (
                "\"I don't know.\"",
                "ending_check",
                0,
                1
            )
        ]
    }
}


# ============================================================
# GAME SCREEN
# ============================================================

class GameScreen(Screen):

    def on_enter(
        self
    ):

        self.current_node = (
            "intro"
        )

        self.typing_event = (
            None
        )

        self.clear_widgets()

        self.build_ui()

        self.load_node()

    # ========================================================
    # BUILD UI
    # ========================================================

    def build_ui(
        self
    ):

        self.root = FloatLayout()

        # ----------------------------------------------------
        # SPRITE - BACK LAYER
        # ----------------------------------------------------

        self.character_sprite = Image(

            source=SPRITES[
                "Azzy"
            ][
                "neutral"
            ],

            fit_mode="contain",

            size_hint=(
                0.80,
                0.80
            ),

            pos_hint={
                "center_x": 0.50,
                "center_y": 0.59
            }
        )

        self.root.add_widget(
            self.character_sprite
        )

        # ----------------------------------------------------
        # RELATIONSHIP HUD
        # ----------------------------------------------------

        self.hud = Panel(

            bg_color=(
                0.04,
                0.025,
                0.055,
                0.90
            ),

            radius=16,

            orientation="vertical",

            padding=(12, 7),

            spacing=0,

            size_hint=(
                0.25,
                0.115
            ),

            pos_hint={
                "right": 0.985,
                "top": 0.985
            }
        )

        self.yande_stat = Label(

            text="",

            font_size=14,

            color=(
                1,
                0.55,
                0.78,
                1
            ),

            halign="left",

            valign="middle"
        )

        self.ace_stat = Label(

            text="",

            font_size=14,

            color=(
                0.50,
                0.76,
                1,
                1
            ),

            halign="left",

            valign="middle"
        )

        self.yande_stat.bind(

            size=lambda obj, value:
            setattr(
                obj,
                "text_size",
                value
            )
        )

        self.ace_stat.bind(

            size=lambda obj, value:
            setattr(
                obj,
                "text_size",
                value
            )
        )

        self.hud.add_widget(
            self.yande_stat
        )

        self.hud.add_widget(
            self.ace_stat
        )

        self.root.add_widget(
            self.hud
        )

        # ----------------------------------------------------
        # DIALOGUE BOX
        # ----------------------------------------------------

        self.dialogue_panel = Panel(

            bg_color=PANEL,

            radius=22,

            orientation="vertical",

            padding=(
                18,
                13
            ),

            spacing=6,

            size_hint=(
                0.94,
                0.41
            ),

            pos_hint={
                "center_x": 0.5,
                "y": 0.025
            }
        )

        # ----------------------------------------------------
        # SPEAKER BAR
        # ----------------------------------------------------

        self.name_bar = Panel(

            bg_color=(
                0.19,
                0.065,
                0.20,
                0.98
            ),

            radius=14,

            orientation="horizontal",

            padding=(
                14,
                0
            ),

            size_hint_y=None,

            height=43
        )

        self.speaker = Label(

            text="",

            font_size=21,

            bold=True,

            color=TEXT,

            halign="left",

            valign="middle"
        )

        self.speaker.bind(

            size=lambda obj, value:
            setattr(
                obj,
                "text_size",
                value
            )
        )

        self.name_bar.add_widget(
            self.speaker
        )

        self.dialogue_panel.add_widget(
            self.name_bar
        )

        # ----------------------------------------------------
        # DIALOGUE TEXT
        # ----------------------------------------------------

        self.dialogue = ClickableDialogue(

            text="",

            font_size=18,

            color=TEXT,

            halign="left",

            valign="top",

            click_callback=
                self.finish_text
        )

        self.dialogue.bind(

            size=lambda obj, value:
            setattr(
                obj,
                "text_size",
                (
                    value[0] - 8,
                    value[1]
                )
            )
        )

        self.dialogue_panel.add_widget(
            self.dialogue
        )

        # ----------------------------------------------------
        # CHOICES
        # ----------------------------------------------------

        self.choice_box = BoxLayout(

            orientation="vertical",

            spacing=5,

            size_hint_y=None
        )

        self.dialogue_panel.add_widget(
            self.choice_box
        )

        # ----------------------------------------------------
        # HINT
        # ----------------------------------------------------

        self.tap_hint = Label(

            text=
                "tap text to reveal",

            font_size=11,

            color=(
                0.64,
                0.58,
                0.68,
                1
            ),

            size_hint_y=None,

            height=15,

            halign="right"
        )

        self.dialogue_panel.add_widget(
            self.tap_hint
        )

        self.root.add_widget(
            self.dialogue_panel
        )

        self.add_widget(
            self.root
        )

    # ========================================================
    # SPRITES
    # ========================================================

    def update_character(
        self,
        speaker,
        expression="neutral"
    ):

        character_data = (
            SPRITES.get(
                speaker
            )
        )

        if not character_data:

            self.character_sprite.opacity = 0

            return

        sprite_path = (
            character_data.get(
                expression,
                character_data.get(
                    "neutral"
                )
            )
        )

        self.character_sprite.source = (
            sprite_path
        )

        self.character_sprite.reload()

        self.character_sprite.opacity = 1

        # --------------------------------
        # AZZY
        # --------------------------------

        if speaker == "Azzy":

            self.character_sprite.size_hint = (
                0.76,
                0.80
            )

            self.character_sprite.pos_hint = {
                "center_x": 0.49,
                "center_y": 0.59
            }

        # --------------------------------
        # YAN'DE
        # --------------------------------

        elif speaker == "Yan'De":

            self.character_sprite.size_hint = (
                0.79,
                0.81
            )

            self.character_sprite.pos_hint = {
                "center_x": 0.51,
                "center_y": 0.59
            }

        # --------------------------------
        # ACE
        # --------------------------------

        elif speaker == (
            "Dr. Ace Brighton"
        ):

            self.character_sprite.size_hint = (
                0.78,
                0.80
            )

            self.character_sprite.pos_hint = {
                "center_x": 0.50,
                "center_y": 0.59
            }

    # ========================================================
    # HUD
    # ========================================================

    def update_stats(
        self
    ):

        self.yande_stat.text = (
            "♥ Yan'De     "
            f"{game.yande_affection}"
        )

        self.ace_stat.text = (
            "✦ Ace         "
            f"{game.ace_relationship}"
        )

    # ========================================================
    # STORY
    # ========================================================

    def load_node(
        self
    ):

        node = STORY[
            self.current_node
        ]

        speaker = node[
            "speaker"
        ]

        if speaker == "Azzy":

            self.speaker.text = (
                game.name
            )

        else:

            self.speaker.text = (
                speaker
            )

        self.update_character(

            speaker,

            node.get(
                "expression",
                "neutral"
            )
        )

        self.full_text = (
            node["text"]
        )

        self.char_index = 0

        self.dialogue.text = ""

        if self.typing_event:

            self.typing_event.cancel()

        # FAST TYPEWRITER
        self.typing_event = (
            Clock.schedule_interval(
                self.type_text,
                0.006
            )
        )

        self.choice_box.clear_widgets()

        choices = node[
            "choices"
        ]

        button_height = 44

        button_spacing = 5

        self.choice_box.height = (

            len(
                choices
            )

            * button_height

            +

            max(
                0,
                len(choices) - 1
            )

            * button_spacing
        )

        for (

            choice_text,

            next_node,

            yande_change,

            ace_change

        ) in choices:

            button = Button(

                text=choice_text,

                font_size=16,

                size_hint_y=None,

                height=button_height
            )

            button.bind(

                on_release=lambda
                btn,
                n=next_node,
                y=yande_change,
                a=ace_change:

                self.choose(
                    n,
                    y,
                    a
                )
            )

            self.choice_box.add_widget(
                button
            )

        self.update_stats()

    # ========================================================
    # TYPEWRITER
    # ========================================================

    def type_text(
        self,
        dt
    ):

        if self.char_index >= len(
            self.full_text
        ):

            self.typing_event = None

            return False

        # TWO CHARACTERS PER TICK
        self.char_index += 2

        self.dialogue.text = (
            self.full_text[
                :self.char_index
            ]
        )

        return True

    def finish_text(
        self
    ):

        if self.dialogue.text != (
            self.full_text
        ):

            if self.typing_event:

                self.typing_event.cancel()

                self.typing_event = None

            self.char_index = len(
                self.full_text
            )

            self.dialogue.text = (
                self.full_text
            )

    # ========================================================
    # CHOICES
    # ========================================================

    def choose(
        self,
        next_node,
        yande_change,
        ace_change
    ):

        if self.typing_event:

            self.typing_event.cancel()

            self.typing_event = None

        game.yande_affection += (
            yande_change
        )

        game.ace_relationship += (
            ace_change
        )

        game.yande_affection = max(

            0,

            min(
                100,
                game.yande_affection
            )
        )

        game.ace_relationship = max(

            0,

            min(
                100,
                game.ace_relationship
            )
        )

        if next_node == (
            "ending_check"
        ):

            self.check_ending()

            return

        self.current_node = (
            next_node
        )

        self.load_node()

    # ========================================================
    # ENDING LOGIC
    # ========================================================

    def check_ending(
        self
    ):

        # --------------------------------
        # TRUE ENDING
        # --------------------------------

        if game.ace_relationship == 0:

            game.ending = "true"

            self.manager.current = (
                "ending"
            )

            return

        # --------------------------------
        # REJECTION
        # --------------------------------

        if game.yande_affection <= 2:

            game.ending = (
                "rejection"
            )

            self.manager.current = (
                "ending"
            )

            return

        # --------------------------------
        # NORMAL
        # --------------------------------

        if (

            game.yande_affection >= 8

            and

            game.ace_relationship >= 4

        ):

            game.ending = (
                "normal"
            )

            self.manager.current = (
                "ending"
            )

            return

        # --------------------------------
        # INSTITUTION
        # --------------------------------

        if game.ace_relationship >= 3:

            game.ending = (
                "institution"
            )

            self.manager.current = (
                "ending"
            )

            return

        game.ending = (
            "rejection"
        )

        self.manager.current = (
            "ending"
        )


# ============================================================
# ENDING SCREEN
# ============================================================

class EndingScreen(Screen):

    def on_enter(
        self
    ):

        self.clear_widgets()

        self.root = FloatLayout()

        self.add_widget(
            self.root
        )

        ending = game.ending

        if ending == "rejection":

            self.build_ending(

                number="ENDING ONE",

                title=
                    "REJECTION & OBSESSION",

                quote=
                    "\"But we were having such a nice date...\"",

                body=
                    "You rejected Yan'De.\n\n"
                    "For a moment, he says nothing.\n\n"
                    "The rain keeps falling.\n\n"
                    "You never make it home.",

                sprite=
                    SPRITES[
                        "Yan'De"
                    ][
                        "obsessed"
                    ],

                achievement=
                    "I THOUGHT WE WERE HAVING A NICE DATEEEEE",

                achievement_subtitle=
                    "Rejection & Obsession"
            )

        elif ending == "institution":

            self.build_ending(

                number="ENDING TWO",

                title=
                    "ACE'S PROBLEM NOW...",

                quote=
                    "\"You did the right thing by asking for help.\"",

                body=
                    "With Ace's help, Yan'De is committed.\n\n"
                    "The silence afterward feels strange.\n\n"
                    "For the first time in months, "
                    "you can breathe without looking behind you.",

                sprite=
                    SPRITES[
                        "Dr. Ace Brighton"
                    ][
                        "smiling"
                    ],

                achievement=
                    "Crazy? I was crazy once..",

                achievement_subtitle=
                    "Ace's Problem Now..."
            )

        elif ending == "normal":

            self.build_ending(

                number="ENDING THREE",

                title=
                    "YAN'DE REALLY LOVES YOU",

                quote=
                    "\"I'm trying. For you... and for me.\"",

                body=
                    "Nothing changes overnight.\n\n"
                    "There are boundaries. Therapy. Arguments. "
                    "Awkward apologies.\n\n"
                    "But somehow, against every reasonable expectation, "
                    "you make it work.",

                sprite=
                    SPRITES[
                        "Yan'De"
                    ][
                        "soft"
                    ],

                achievement=
                    "You... Did it?!",

                achievement_subtitle=
                    "Yan'De REALLY loves you"
            )

        elif ending == "true":

            self.build_ending(

                number="TRUE ENDING",

                title=
                    "KILLING ME SOFTLY WITH HIS SONG...",

                quote=
                    "\"You could leave whenever you wanted.\"",

                body=
                    "Days became weeks.\n\n"
                    "Weeks became months.\n\n"
                    "The outside world became something "
                    "you remembered instead of something you knew.\n\n"
                    "One morning, the door is unlocked.\n\n"
                    "You stare at it for a long time.\n\n"
                    "Then you close it.",

                sprite=
                    SPRITES[
                        "Yan'De"
                    ][
                        "obsessed"
                    ],

                achievement=
                    "Killing Me Softly With His Song...",

                achievement_subtitle=
                    "TRUE ENDING"
            )

    # ========================================================
    # BUILD ENDING
    # ========================================================

    def build_ending(
        self,
        number,
        title,
        quote,
        body,
        sprite,
        achievement,
        achievement_subtitle
    ):

        # ----------------------------------------------------
        # CHARACTER
        # ----------------------------------------------------

        character = Image(

            source=sprite,

            fit_mode="contain",

            opacity=0.34,

            size_hint=(
                0.68,
                0.90
            ),

            pos_hint={
                "right": 1.04,
                "center_y": 0.48
            }
        )

        self.root.add_widget(
            character
        )

        # ----------------------------------------------------
        # DARK FADE PANEL
        # ----------------------------------------------------

        info = Panel(

            bg_color=(
                0.04,
                0.025,
                0.05,
                0.94
            ),

            radius=22,

            orientation="vertical",

            padding=(
                25,
                22
            ),

            spacing=10,

            size_hint=(
                0.62,
                0.72
            ),

            pos_hint={
                "x": 0.045,
                "center_y": 0.52
            }
        )

        ending_number = make_label(

            number,

            16,

            color=(
                0.90,
                0.38,
                0.73,
                1
            ),

            halign="left"
        )

        ending_number.size_hint_y = (
            0.10
        )

        ending_title = make_label(

            title,

            31,

            halign="left"
        )

        ending_title.size_hint_y = (
            0.18
        )

        quote_label = make_label(

            quote,

            18,

            color=(
                0.88,
                0.66,
                0.86,
                1
            ),

            halign="left"
        )

        quote_label.size_hint_y = (
            0.16
        )

        body_label = make_label(

            body,

            17,

            color=(
                0.86,
                0.82,
                0.88,
                1
            ),

            halign="left",

            valign="top"
        )

        return_button = Button(

            text="RETURN TO MENU",

            font_size=17,

            size_hint_y=None,

            height=54
        )

        info.add_widget(
            ending_number
        )

        info.add_widget(
            ending_title
        )

        info.add_widget(
            quote_label
        )

        info.add_widget(
            body_label
        )

        info.add_widget(
            return_button
        )

        self.root.add_widget(
            info
        )

        return_button.bind(

            on_release=lambda x:
            self.return_menu()
        )

        # ----------------------------------------------------
        # ACHIEVEMENT
        # ----------------------------------------------------

        Clock.schedule_once(

            lambda dt:
            show_achievement(

                self.root,

                achievement,

                achievement_subtitle
            ),

            0.9
        )

    def return_menu(
        self
    ):

        game.reset()

        self.manager.current = (
            "menu"
        )


# ============================================================
# APP
# ============================================================

class LovesickApp(App):

    def build(
        self
    ):

        self.title = (
            "LOVESICK"
        )

        manager = ScreenManager(

            transition=
                FadeTransition(
                    duration=0.28
                )
        )

        manager.add_widget(

            MenuScreen(
                name="menu"
            )
        )

        manager.add_widget(

            NameScreen(
                name="name"
            )
        )

        manager.add_widget(

            GameScreen(
                name="game"
            )
        )

        manager.add_widget(

            EndingScreen(
                name="ending"
            )
        )

        return manager


if __name__ == "__main__":

    LovesickApp().run()
