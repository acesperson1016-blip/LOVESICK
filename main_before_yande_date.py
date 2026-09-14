import random

from kivy.app import App
from kivy.uix.screenmanager import ScreenManager, Screen, FadeTransition
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.floatlayout import FloatLayout
from kivy.uix.label import Label
from kivy.uix.button import Button
from kivy.uix.textinput import TextInput
from kivy.uix.image import Image
from kivy.uix.widget import Widget
from kivy.graphics import Color, RoundedRectangle, Rectangle
from kivy.clock import Clock
from kivy.core.window import Window
from kivy.animation import Animation
from kivy.properties import NumericProperty, ListProperty

Window.clearcolor = (0.025, 0.018, 0.032, 1)

TEXT = (0.97, 0.94, 0.99, 1)
MUTED = (0.70, 0.65, 0.74, 1)
PANEL = (0.055, 0.035, 0.070, 0.95)


class GameState:
    def __init__(self):
        self.reset()

    def reset(self):
        self.name = "AZZY"
        self.yande_affection = 0
        self.ace_relationship = 0
        self.yande_insanity = 20
        self.ace_alive = True
        self.therapy_completed = False
        self.route_choice = None
        self.therapy_result = None
        self.ending = None


game = GameState()


SPRITES = {
    "Azzy": {
        "neutral": "assets/sprites/azzy/azzyneutral.png",
        "happy": "assets/sprites/azzy/azzyhappy.png",
        "worried": "assets/sprites/azzy/azzyworried.png",
        "annoyed": "assets/sprites/azzy/azzyannoyed.png",
        "scared": "assets/sprites/azzy/azzyscared.png",
        "tired": "assets/sprites/azzy/azzytired.png",
    },
    "Yan'De": {
        "neutral": "assets/sprites/yande/yandeneutral.png",
        "soft": "assets/sprites/yande/yandesoft.png",
        "playful": "assets/sprites/yande/yandeplayful.png",
        "jealous": "assets/sprites/yande/yandejealous.png",
        "serious": "assets/sprites/yande/yandeserious.png",
        "obsessed": "assets/sprites/yande/yandeobsessed.png",
    },
    "Dr. Ace Brighton": {
        "neutral": "assets/sprites/ace/aceneutral.png",
        "smiling": "assets/sprites/ace/acesmiling.png",
        "stress": "assets/sprites/ace/acestress.png",
        "tired": "assets/sprites/ace/acetired.png",
        "firm": "assets/sprites/ace/acefirm.png",
        "worried": "assets/sprites/ace/aceworried.png",
    },
}


THERAPY_QUESTIONS = [
    {"q": "What helps you calm down when you feel overwhelmed?", "value": "good", "delta": -7, "response": "Music. Walking sometimes. If I can get my head quiet, I'm fine.", "expression": "soft"},
    {"q": "Who can you talk to when your emotions feel too intense?", "value": "good", "delta": -6, "response": "...I don't like asking for help. But I guess that's what this is for.", "expression": "serious"},
    {"q": "What does a healthy boundary look like to you?", "value": "good", "delta": -8, "response": "Something you don't cross just because you want to. Even if it hurts.", "expression": "serious"},
    {"q": "How do you know when you need space to cool down?", "value": "good", "delta": -6, "response": "When everything starts feeling personal. That's usually when I should leave the room.", "expression": "neutral"},
    {"q": "What is one thing you can control when you're angry?", "value": "good", "delta": -7, "response": "What I do next. I can't stop the feeling, but I can stop myself.", "expression": "soft"},
    {"q": "What would make you feel safer without controlling another person?", "value": "good", "delta": -8, "response": "Knowing where I stand. Hearing the truth, even if I hate it.", "expression": "serious"},
    {"q": "How can you show care without expecting anything back?", "value": "good", "delta": -7, "response": "Do something because they need it. Not because it makes them owe me.", "expression": "soft"},
    {"q": "What do you do when you notice yourself spiraling?", "value": "good", "delta": -6, "response": "I count things. Breathe. Try not to text anybody until I stop shaking.", "expression": "neutral"},
    {"q": "What would respecting Azzy's choices look like?", "value": "good", "delta": -9, "response": "Letting them choose. Even if their choice isn't me.", "expression": "serious"},
    {"q": "What is something you want to improve about yourself?", "value": "good", "delta": -6, "response": "I want to stop treating fear like proof that something bad is happening.", "expression": "soft"},

    {"q": "Do you have trouble sleeping?", "value": "okay", "delta": 2, "response": "Sometimes. Mostly when my brain won't shut up.", "expression": "neutral"},
    {"q": "How often do you feel anxious?", "value": "okay", "delta": 3, "response": "Enough that I notice it. Not enough that I want to talk about it all day.", "expression": "serious"},
    {"q": "Do you ever feel like people misunderstand you?", "value": "okay", "delta": 4, "response": "Constantly. But I know everybody thinks that sometimes.", "expression": "neutral"},
    {"q": "What usually puts you in a bad mood?", "value": "okay", "delta": 3, "response": "Feeling ignored. Feeling lied to. Being tired doesn't help.", "expression": "serious"},
    {"q": "Do you prefer being alone or around other people?", "value": "okay", "delta": 2, "response": "Depends on the people.", "expression": "neutral"},
    {"q": "How do you react when plans suddenly change?", "value": "okay", "delta": 4, "response": "I hate it. I can deal with it. I just hate it.", "expression": "serious"},
    {"q": "Do you find it easy to trust people?", "value": "okay", "delta": 4, "response": "No. Trust feels like giving somebody a weapon and hoping they don't use it.", "expression": "serious"},
    {"q": "What do you think makes a relationship last?", "value": "okay", "delta": 3, "response": "Loyalty. Honesty. Effort. Probably more things I'm bad at.", "expression": "soft"},
    {"q": "What do you usually do after an argument?", "value": "okay", "delta": 5, "response": "Replay it about a hundred times and think of better things I should've said.", "expression": "neutral"},
    {"q": "Are you comfortable admitting when you're wrong?", "value": "okay", "delta": 5, "response": "Comfortable? No. Capable? ...Usually.", "expression": "serious"},

    {"q": "Do you think Azzy belongs to you?", "value": "bad", "delta": 14, "response": "Belongs to me? No. That's not— Why are you wording it like that?", "expression": "jealous"},
    {"q": "What would you do if Azzy left you forever?", "value": "bad", "delta": 15, "response": "They wouldn't. Next question.", "expression": "jealous"},
    {"q": "Have you ever followed Azzy without telling them?", "value": "bad", "delta": 13, "response": "You already decided what kind of person I am before I walked in here, didn't you?", "expression": "jealous"},
    {"q": "Why are you so obsessed with Azzy?", "value": "bad", "delta": 16, "response": "Don't call it obsession.", "expression": "obsessed"},
    {"q": "Do you get angry when Azzy talks to other people?", "value": "bad", "delta": 12, "response": "Depends who they're talking to. Depends what that person wants.", "expression": "jealous"},
    {"q": "Have you ever wanted to hurt someone who got close to Azzy?", "value": "bad", "delta": 18, "response": "...You should choose your next question carefully, Doctor.", "expression": "obsessed"},
    {"q": "If Azzy rejected you, would you accept it?", "value": "bad", "delta": 15, "response": "Why are we pretending that's going to happen?", "expression": "jealous"},
    {"q": "Do you think love gives you the right to know where Azzy is?", "value": "bad", "delta": 14, "response": "If you care about someone, you make sure they're safe.", "expression": "serious"},
    {"q": "What would you do if Ace told Azzy to stay away from you?", "value": "bad", "delta": 19, "response": "You mean what would I do if you tried to take them from me?", "expression": "obsessed"},
    {"q": "Are you afraid Azzy would be happier without you?", "value": "bad", "delta": 17, "response": "Stop talking like you know what makes them happy.", "expression": "obsessed"},
    {"q": 'What can you do when jealousy starts before you act on it?', "value": "good", "delta": -7, "response": "Stop. Get away from the situation. Figure out whether I actually know anything or I'm guessing.", "expression": 'serious'},
    {"q": 'How could you ask for reassurance without demanding it?', "value": "good", "delta": -8, "response": 'Ask once. Accept the answer. ...That sounds easier when you say it.', "expression": 'soft'},
    {"q": 'What would giving Azzy space look like in practice?', "value": "good", "delta": -8, "response": "Not showing up. Not checking. Letting them come back when they're ready.", "expression": 'serious'},
    {"q": 'What helps you separate a fear from a fact?', "value": "good", "delta": -7, "response": "Evidence. Waiting until I'm calm enough to tell the difference.", "expression": 'neutral'},
    {"q": 'What is a respectful way to handle hearing no?', "value": "good", "delta": -9, "response": "Accept it the first time. Don't turn it into an argument.", "expression": 'serious'},
    {"q": 'When you feel abandoned, what could you do besides chase the feeling?', "value": "good", "delta": -7, "response": "Call somebody. Walk. Write it down instead of making it someone else's emergency.", "expression": 'soft'},
    {"q": 'What does trust require from both people?', "value": "good", "delta": -6, "response": 'Honesty. Consistency. And enough room to be separate people.', "expression": 'soft'},
    {"q": 'How could you repair things after crossing a boundary?', "value": "good", "delta": -8, "response": 'Own it. Apologize. Change what I do next. Not just say sorry until they forgive me.', "expression": 'serious'},
    {"q": "What is one warning sign that you're becoming overwhelmed?", "value": "good", "delta": -6, "response": 'My hands shake. I stop listening and start looking for threats.', "expression": 'neutral'},
    {"q": 'What could you do before sending a message while angry?', "value": "good", "delta": -6, "response": 'Wait ten minutes. Read it again. Maybe delete half of it.', "expression": 'soft'},
    {"q": 'How can you care about someone while letting them disagree with you?', "value": "good", "delta": -8, "response": "Remember disagreement isn't betrayal.", "expression": 'serious'},
    {"q": 'What does an apology need besides the word sorry?', "value": "good", "delta": -7, "response": "A change. Otherwise it's just noise.", "expression": 'soft'},
    {"q": 'Who besides Azzy could be part of your support system?', "value": "good", "delta": -6, "response": 'Friends. A therapist, apparently. Maybe family if I actually answer them.', "expression": 'neutral'},
    {"q": 'What could make a difficult conversation feel safer?', "value": "good", "delta": -6, "response": 'No yelling. No cornering anybody. Knowing either person can leave and come back later.', "expression": 'soft'},
    {"q": 'How would you notice that someone needs space?', "value": "good", "delta": -7, "response": 'They get quiet. Pull away. Say they need it. I should listen before they have to repeat it.', "expression": 'serious'},
    {"q": 'What is one healthy way to deal with uncertainty?', "value": "good", "delta": -6, "response": 'Let it exist without trying to solve it by controlling everything.', "expression": 'neutral'},
    {"q": 'How could you respond if Azzy changes their mind?', "value": "good", "delta": -8, "response": 'Be disappointed without punishing them for it.', "expression": 'serious'},
    {"q": 'What does being accountable mean to you?', "value": "good", "delta": -7, "response": 'Not hiding behind what I meant when what I did hurt somebody.', "expression": 'soft'},
    {"q": 'What helps you feel grounded in the present?', "value": "good", "delta": -6, "response": "Cold water. Music. Naming what I can actually see instead of what I'm imagining.", "expression": 'neutral'},
    {"q": 'What would a relationship with room to breathe look like?', "value": "good", "delta": -8, "response": 'Two people choosing each other. Not two people trapped together.', "expression": 'soft'},
    {"q": 'What can you do if you notice yourself making assumptions?', "value": "good", "delta": -6, "response": 'Ask instead of deciding I already know the answer.', "expression": 'neutral'},
    {"q": 'How could you handle loneliness without putting it all on Azzy?', "value": "good", "delta": -7, "response": "Have my own life. My own people. Things that don't disappear when Azzy is busy.", "expression": 'soft'},
    {"q": 'What is something you deserve to give yourself?', "value": "good", "delta": -6, "response": 'A chance to calm down before I decide everything is ruined.', "expression": 'soft'},
    {"q": 'How can you tell when a conversation should pause?', "value": "good", "delta": -6, "response": 'When neither person is listening anymore.', "expression": 'neutral'},
    {"q": 'What kind of situations make you feel tense?', "value": "okay", "delta": 3, "response": 'Crowds. Waiting. Not knowing what somebody is thinking.', "expression": 'neutral'},
    {"q": 'Do you usually keep your feelings to yourself?', "value": "okay", "delta": 3, "response": "Until I can't. Which is probably part of the problem.", "expression": 'neutral'},
    {"q": 'How do you feel about meeting new people?', "value": "okay", "delta": 2, "response": "Depends. I don't hate it. I just don't trust quickly.", "expression": 'neutral'},
    {"q": "What do you do when you're bored?", "value": "okay", "delta": 2, "response": 'Music. Games. Walk around until I find something to do.', "expression": 'soft'},
    {"q": 'Do you find silence comfortable?', "value": "okay", "delta": 3, "response": "With the right person. Otherwise it feels like something's wrong.", "expression": 'neutral'},
    {"q": 'How important is routine to you?', "value": "okay", "delta": 3, "response": 'Pretty important. I like knowing what comes next.', "expression": 'neutral'},
    {"q": 'Do you get frustrated easily?', "value": "okay", "delta": 4, "response": "More easily than I'd like to admit.", "expression": 'serious'},
    {"q": 'How do you usually make decisions?', "value": "okay", "delta": 2, "response": "Fast if it doesn't matter. Way too slowly if it does.", "expression": 'neutral'},
    {"q": 'What makes you feel understood?', "value": "okay", "delta": 3, "response": 'When somebody listens without immediately deciding what I meant.', "expression": 'soft'},
    {"q": 'Do you like having time to yourself?', "value": "okay", "delta": 2, "response": 'Yeah. As long as it feels like my choice.', "expression": 'neutral'},
    {"q": 'How do you handle criticism?', "value": "okay", "delta": 5, "response": 'Badly at first. Better after I stop being defensive.', "expression": 'serious'},
    {"q": 'What makes it difficult for you to relax?', "value": "okay", "delta": 3, "response": "Feeling like I'm waiting for something to go wrong.", "expression": 'neutral'},
    {"q": 'Do you tend to overthink conversations?', "value": "okay", "delta": 4, "response": 'Every word. Every pause. Every stupid facial expression.', "expression": 'neutral'},
    {"q": 'How do you feel when someone cancels plans?', "value": "okay", "delta": 4, "response": 'Annoyed. Sometimes suspicious. Usually more than I should.', "expression": 'serious'},
    {"q": 'What makes you feel appreciated?', "value": "okay", "delta": 2, "response": 'When people remember small things about me.', "expression": 'soft'},
    {"q": 'Do you find it hard to ask for what you need?', "value": "okay", "delta": 3, "response": 'Yeah. Asking means they can say no.', "expression": 'serious'},
    {"q": "How do you usually spend time when you're alone?", "value": "okay", "delta": 2, "response": 'Headphones on. Something playing. Anything that keeps my brain occupied.', "expression": 'neutral'},
    {"q": 'What kind of conversations are hardest for you?', "value": "okay", "delta": 4, "response": "The ones where I don't know what answer the other person wants.", "expression": 'serious'},
    {"q": 'Do you prefer solving problems immediately or waiting?', "value": "okay", "delta": 3, "response": 'Immediately. Waiting makes me imagine worse versions.', "expression": 'neutral'},
    {"q": 'How do you react when you feel embarrassed?', "value": "okay", "delta": 4, "response": 'I get defensive. Or I disappear.', "expression": 'serious'},
    {"q": 'What helps you feel confident?', "value": "okay", "delta": 2, "response": "Knowing what I'm doing. Having a plan.", "expression": 'soft'},
    {"q": 'Do you think you are patient?', "value": "okay", "delta": 3, "response": "Not especially. I'm working on it.", "expression": 'neutral'},
    {"q": 'What do you value most in a friend?', "value": "okay", "delta": 2, "response": 'Loyalty. Somebody who tells me the truth.', "expression": 'soft'},
    {"q": "How many times have you checked Azzy's location without asking?", "value": "bad", "delta": 14, "response": "That's a loaded question.", "expression": 'jealous'},
    {"q": 'Would you punish Azzy for choosing someone else?', "value": "bad", "delta": 17, "response": 'Punish? You really want me to be the villain here.', "expression": 'obsessed'},
    {"q": 'Do you think anyone else could love Azzy as much as you do?', "value": "bad", "delta": 13, "response": "No. And I don't see why that's relevant.", "expression": 'jealous'},
    {"q": "What would stop you from taking Azzy somewhere they couldn't leave?", "value": "bad", "delta": 19, "response": '...You should stop inventing scenarios about us.', "expression": 'obsessed'},
    {"q": 'Have you imagined getting rid of people close to Azzy?', "value": "bad", "delta": 18, "response": "I'm done answering questions like that.", "expression": 'obsessed'},
    {"q": "Would you read Azzy's private messages if you had the chance?", "value": "bad", "delta": 13, "response": "If I thought they were in danger, I'd do what I had to.", "expression": 'jealous'},
    {"q": "Does Azzy owe you affection because you've protected them?", "value": "bad", "delta": 15, "response": 'I never said they owed me anything.', "expression": 'jealous'},
    {"q": 'Would you lie to keep Azzy from leaving?', "value": "bad", "delta": 16, "response": 'You keep assuming leaving is what they want.', "expression": 'obsessed'},
    {"q": 'How angry would you be if Azzy dated somebody else?', "value": "bad", "delta": 15, "response": 'Why do you keep asking me to picture that?', "expression": 'jealous'},
    {"q": 'Do you think Ace is trying to turn Azzy against you?', "value": "bad", "delta": 18, "response": 'Are you? Because this is starting to sound personal.', "expression": 'obsessed'},
    {"q": 'Would you break a promise if it kept Azzy close?', "value": "bad", "delta": 15, "response": 'Depends what the promise was.', "expression": 'jealous'},
    {"q": 'What would you do if Azzy blocked your number?', "value": "bad", "delta": 16, "response": 'Find out why. Obviously.', "expression": 'obsessed'},
    {"q": 'Do you think Azzy should need your permission to go somewhere?', "value": "bad", "delta": 14, "response": "No. Don't twist caring about them into that.", "expression": 'jealous'},
    {"q": 'Have you ever scared Azzy on purpose?', "value": "bad", "delta": 17, "response": 'No. ...Next question.', "expression": 'obsessed'},
    {"q": 'Would you threaten someone to keep them away from Azzy?', "value": "bad", "delta": 18, "response": "If someone was dangerous, I'd handle it.", "expression": 'obsessed'},
    {"q": 'Do you believe Azzy is safer when you know where they are?', "value": "bad", "delta": 13, "response": "Yes. That's just true.", "expression": 'serious'},
    {"q": 'Would you forgive Azzy for lying to you about where they were?', "value": "bad", "delta": 14, "response": 'Why would they need to lie to me?', "expression": 'jealous'},
    {"q": 'What if Azzy said they were afraid of you?', "value": "bad", "delta": 19, "response": "They aren't.", "expression": 'obsessed'},
    {"q": 'Could you watch Azzy walk away without following them?', "value": "bad", "delta": 17, "response": 'Why are you so interested in making them leave?', "expression": 'obsessed'},
    {"q": 'Do you think your love excuses things other people would call controlling?', "value": "bad", "delta": 16, "response": "You don't get to reduce everything I feel to one word.", "expression": 'obsessed'},
    {"q": 'Would you choose Azzy over everyone else in your life?', "value": "bad", "delta": 14, "response": 'Without hesitation.', "expression": 'jealous'},
    {"q": "What would happen if Azzy chose Ace's advice over yours?", "value": "bad", "delta": 18, "response": "Then I'd want to know what exactly you've been telling them.", "expression": 'obsessed'},
    {"q": 'Do you resent Azzy for needing time away from you?', "value": "bad", "delta": 15, "response": 'I resent people convincing them they need it.', "expression": 'jealous'},
]


class Panel(BoxLayout):
    def __init__(self, bg_color=PANEL, radius=18, **kwargs):
        super().__init__(**kwargs)
        with self.canvas.before:
            self._color = Color(*bg_color)
            self._rect = RoundedRectangle(pos=self.pos, size=self.size, radius=[radius])
        self.bind(pos=self._sync, size=self._sync)

    def _sync(self, *_):
        self._rect.pos = self.pos
        self._rect.size = self.size


class ClickableDialogue(Label):
    def __init__(self, click_callback=None, **kwargs):
        super().__init__(**kwargs)
        self.click_callback = click_callback

    def on_touch_down(self, touch):
        if self.collide_point(*touch.pos) and self.click_callback:
            self.click_callback()
            return True
        return super().on_touch_down(touch)


def make_label(text="", size=20, color=TEXT, halign="center", valign="middle"):
    label = Label(text=text, font_size=size, color=color, halign=halign, valign=valign)
    label.bind(size=lambda obj, value: setattr(obj, "text_size", (max(10, value[0] - 18), value[1])))
    return label


class AnimatedInsanityBar(Widget):
    display_value = NumericProperty(0)
    bar_color = ListProperty([0.20, 0.55, 1.0, 1])

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        with self.canvas.before:
            self.track_color = Color(0.11, 0.08, 0.13, 1)
            self.track = RoundedRectangle(pos=self.pos, size=self.size, radius=[9])
            self.fill_color = Color(*self.bar_color)
            self.fill = RoundedRectangle(pos=self.pos, size=(0, self.height), radius=[9])

        self.bind(
            pos=self._update_graphics,
            size=self._update_graphics,
            display_value=self._update_graphics,
            bar_color=self._update_color,
        )

    @staticmethod
    def color_for_value(value):
        if value <= 19:
            return [0.20, 0.55, 1.00, 1]       # blue
        if value <= 39:
            return [0.25, 0.86, 0.42, 1]       # green
        if value <= 59:
            return [1.00, 0.88, 0.22, 1]       # yellow
        if value <= 79:
            return [1.00, 0.52, 0.14, 1]       # orange
        if value <= 89:
            return [0.94, 0.16, 0.20, 1]       # red
        return [1.00, 0.08, 0.62, 1]           # hot pink

    def _update_graphics(self, *args):
        self.track.pos = self.pos
        self.track.size = self.size
        percent = max(0, min(100, self.display_value)) / 100.0
        self.fill.pos = self.pos
        self.fill.size = (self.width * percent, self.height)

    def _update_color(self, *args):
        self.fill_color.rgba = self.bar_color

    def animate_to(self, value, duration=0.42):
        target = max(0, min(100, value))
        target_color = self.color_for_value(target)
        Animation.cancel_all(self, 'display_value', 'bar_color')
        Animation(
            display_value=target,
            bar_color=target_color,
            duration=duration,
            t='out_quad'
        ).start(self)


class AchievementBanner(Panel):
    def __init__(self, achievement_title, subtitle="", **kwargs):
        super().__init__(bg_color=(0.12, 0.045, 0.14, 0.98), radius=20,
                         orientation="vertical", padding=(16, 10), spacing=2,
                         size_hint=(None, None), **kwargs)
        heading = Label(text="★ ACHIEVEMENT UNLOCKED ★", font_size=15, bold=True,
                        color=(1, 0.75, 0.95, 1), halign="left", valign="middle")
        title = Label(text=achievement_title, font_size=18, bold=True, color=TEXT,
                      halign="left", valign="middle")
        subtitle_label = Label(text=subtitle, font_size=13, color=MUTED,
                               halign="left", valign="middle")
        for item in (heading, title, subtitle_label):
            item.bind(size=lambda obj, value: setattr(obj, "text_size", value))
            self.add_widget(item)


def show_achievement(parent, title, subtitle=""):
    banner = AchievementBanner(title, subtitle)
    banner.width = max(320, parent.width * 0.40)
    banner.height = max(95, parent.height * 0.12)
    banner.x = parent.width + 20
    banner.y = parent.height - banner.height - 24
    parent.add_widget(banner)
    target_x = parent.width - banner.width - 20
    animation = (Animation(x=target_x, duration=0.35, t="out_quad") +
                 Animation(duration=2.8) +
                 Animation(x=parent.width + 30, duration=0.35, t="in_quad"))
    animation.bind(on_complete=lambda anim, widget: widget.parent and widget.parent.remove_widget(widget))
    animation.start(banner)


class MenuScreen(Screen):
    def on_enter(self):
        self.clear_widgets()
        root = FloatLayout()
        bg = Image(source=SPRITES["Yan'De"]["soft"], fit_mode="contain",
                   size_hint=(0.72, 0.90), pos_hint={"right": 1.07, "center_y": 0.49}, opacity=0.52)
        root.add_widget(bg)

        overlay = BoxLayout(size_hint=(1, 1))
        with overlay.canvas.before:
            Color(0.02, 0.01, 0.03, 0.42)
            rect = Rectangle(pos=overlay.pos, size=overlay.size)
        overlay.bind(pos=lambda obj, value: setattr(rect, "pos", obj.pos),
                     size=lambda obj, value: setattr(rect, "size", obj.size))
        root.add_widget(overlay)

        title = Label(text="LOVESICK", font_size=62, bold=True, color=(1, 0.88, 0.98, 1),
                      size_hint=(0.54, 0.18), pos_hint={"x": 0.055, "top": 0.91},
                      halign="left", valign="middle")
        title.bind(size=lambda obj, value: setattr(obj, "text_size", value))
        root.add_widget(title)

        subtitle = Label(text="love isn't supposed to hurt.", font_size=19, italic=True,
                         color=(0.86, 0.61, 0.83, 1), size_hint=(0.50, 0.08),
                         pos_hint={"x": 0.065, "top": 0.72}, halign="left", valign="middle")
        subtitle.bind(size=lambda obj, value: setattr(obj, "text_size", value))
        root.add_widget(subtitle)

        menu_box = BoxLayout(orientation="vertical", spacing=12, size_hint=(0.36, 0.32),
                             pos_hint={"x": 0.065, "y": 0.13})
        new_game = Button(text="NEW GAME", font_size=20)
        quit_button = Button(text="QUIT", font_size=20)
        menu_box.add_widget(new_game)
        menu_box.add_widget(quit_button)
        root.add_widget(menu_box)

        self.add_widget(root)
        new_game.bind(on_release=self.start_game)
        quit_button.bind(on_release=lambda x: App.get_running_app().stop())

    def start_game(self, _):
        game.reset()
        self.manager.current = "name"


class NameScreen(Screen):
    def on_enter(self):
        self.clear_widgets()
        self.changing_name = False
        root = FloatLayout()
        panel = Panel(bg_color=(0.06, 0.035, 0.075, 0.97), radius=22,
                      orientation="vertical", padding=28, spacing=14,
                      size_hint=(0.62, 0.52), pos_hint={"center_x": 0.5, "center_y": 0.52})
        panel.add_widget(make_label("Before we begin...", 31))
        panel.add_widget(make_label("What should we call you?", 20, MUTED))
        self.name_input = TextInput(text="", hint_text="Enter your name...", multiline=False,
                                    font_size=22, size_hint_y=None, height=60)
        self.enter_button = Button(text="ENTER", font_size=20, size_hint_y=None, height=58)
        panel.add_widget(self.name_input)
        panel.add_widget(self.enter_button)
        root.add_widget(panel)
        self.add_widget(root)
        self.name_input.bind(on_text_validate=self.force_azzy)
        self.enter_button.bind(on_release=self.force_azzy)
        Clock.schedule_once(lambda dt: setattr(self.name_input, "focus", True), 0.15)

    def force_azzy(self, _):
        if self.changing_name:
            return
        self.changing_name = True
        self.name_input.text = "AZZY"
        game.name = "AZZY"
        self.name_input.readonly = True
        self.enter_button.disabled = True
        Clock.schedule_once(self.begin_story, 0.85)

    def begin_story(self, _):
        self.manager.current = "game"


STORY = {
    "intro": {
        "speaker": "Azzy", "expression": "tired",
        "text": "The rain has been falling for three days.\n\nYou keep telling yourself that you're imagining the footsteps outside your window.",
        "choices": [("Look outside.", "outside", 0, 0), ("Stay in bed.", "stay", 1, 0)]
    },
    "outside": {
        "speaker": "Azzy", "expression": "worried",
        "text": "Nobody is there.\n\nExcept for a small envelope sitting beneath your window.",
        "choices": [("Pick up the envelope.", "note", 1, 0), ("Leave it alone.", "note", 0, 1)]
    },
    "stay": {
        "speaker": "Azzy", "expression": "scared",
        "text": "You pull the blanket over your head.\n\nThree quiet knocks come from the window.",
        "choices": [("Open the curtains.", "note", 1, 0), ("Ignore the knocking.", "note", 0, 1)]
    },
    "note": {
        "speaker": "Yan'De", "expression": "neutral",
        "text": "\"I know you're awake.\"\n\nThere is no signature.\n\nYou already know who wrote it.",
        "choices": [("Write back: \"Hi.\"", "yande", 2, 0), ("Tear it up.", "yande", -1, 0)]
    },
    "yande": {
        "speaker": "Yan'De", "expression": "soft",
        "text": "A message appears almost immediately.\n\n\"You remembered me.\"\n\nYou don't remember telling him where you live.",
        "choices": [("\"Of course I did.\"", "date", 3, 0), ("\"This is getting creepy.\"", "date", -1, 0)]
    },
    "date": {
        "speaker": "Yan'De", "expression": "playful",
        "text": "\"Come meet me tomorrow.\"\n\n\"Just us. No doctors. No friends.\"\n\nThe last sentence makes your stomach tighten.",
        "choices": [("Agree to meet.", "doctor", 3, 0), ("I'm not going with you.", "refuse_bridge_1", -3, 0)]
    },
    "refuse_bridge_1": {
        "speaker": "Azzy", "expression": "worried",
        "text": "\"I'm not going.\"\n\nYan'De's smile disappears so quickly it makes your stomach drop.",
        "choices": [("Stand your ground.", "refuse_bridge_2", 0, 0)]
    },
    "refuse_bridge_2": {
        "speaker": "Yan'De", "expression": "jealous",
        "text": "\"...What?\"\n\n\"You're scared. That's all. We can fix scared.\"\n\nYou shake your head. \"No. I'm uncomfortable.\"",
        "choices": [("Leave.", "refuse_bridge_3", 0, 0)]
    },
    "refuse_bridge_3": {
        "speaker": "Azzy", "expression": "tired",
        "text": "Yan'De lets you go.\n\nThat almost makes it worse.\n\nThe next morning, you tell Ace exactly what happened.",
        "choices": [("Talk to Ace.", "doctor", 0, 1)]
    },
    "doctor": {
        "speaker": "Dr. Ace Brighton", "expression": "neutral",
        "text": "Ace closes Azzy's file.\n\n\"You made the right call by not going alone.\"\n\n\"He didn't take it well,\" you say.\n\nAce nods. \"I figured. Now I talk to him.\"\n\nFor the next part, you will play as Dr. Brighton.",
        "choices": [("Begin Therapy Session", "therapy", 0, 0)]
    },
    "therapy_success_1": {
        "speaker": "Dr. Ace Brighton", "expression": "smiling",
        "text": "Question fifteen ends quietly.\n\nYan'De doesn't storm out. He doesn't argue. He just sits there for a moment, thinking.\n\nAce finally exhales. \"That's enough for today.\"",
        "choices": [("Continue", "therapy_success_2", 0, 3)]
    },
    "therapy_success_2": {
        "speaker": "Yan'De", "expression": "soft",
        "text": "Later, Yan'De finds Azzy outside.\n\n\"Azzy?\"\n\nYou brace yourself. \"Yeah?\"\n\n\"I talked to Ace.\"",
        "choices": [("Listen.", "therapy_success_3", 0, 0)]
    },
    "therapy_success_3": {
        "speaker": "Yan'De", "expression": "serious",
        "text": "\"I hated it.\"\n\nYou almost laugh. \"Sounds about right.\"\n\nHis gaze drops. \"But... thank you.\"\n\n\"For what?\"\n\n\"For not giving up on me just because you wouldn't go with me.\"",
        "choices": [("Continue", "ending_normal", 0, 2)]
    },
    "therapy_failure_1": {
        "speaker": "Dr. Ace Brighton", "expression": "worried",
        "text": "The session ends, but Ace doesn't look relieved.\n\nYan'De leaves with his shoulders rigid and his jaw clenched.\n\n\"That didn't reach him,\" Ace says quietly.",
        "choices": [("Continue", "therapy_failure_2", 0, 0)]
    },
    "therapy_failure_2": {
        "speaker": "Yan'De", "expression": "jealous",
        "text": "That evening, Yan'De is waiting for you.\n\n\"So that's what you wanted? Send me to him so he could tell me I'm wrong about you?\"\n\nYou step back. \"Yan'De...\"",
        "choices": [("Tell him it's over.", "therapy_failure_3", -3, 0)]
    },
    "therapy_failure_3": {
        "speaker": "Yan'De", "expression": "obsessed",
        "text": "\"No.\"\n\nThe word is almost gentle.\n\n\"You don't get to decide we're done after making me try this hard.\"\n\nThe rain starts again.",
        "choices": [("Continue", "ending_rejection", 0, 0)]
    },
    "confront": {
        "speaker": "Yan'De", "expression": "jealous",
        "text": "That evening, Yan'De is waiting outside.\n\n\"You talked to Ace.\"\n\nHis smile doesn't reach his eyes.",
        "choices": [("\"Yes.\"", "final_choice", -2, 2), ("\"No.\"", "final_choice", 2, -1)]
    },
    "final_choice": {
        "speaker": "Yan'De", "expression": "obsessed",
        "text": "\"Then tell me.\"\n\n\"Do you love me?\"",
        "choices": [("\"Yes.\"", "ending_check", 5, 0), ("\"No.\"", "ending_check", -5, 0), ("\"I don't know.\"", "ending_check", 0, 1)]
    }
}


class GameScreen(Screen):
    def on_enter(self):
        if not hasattr(self, "resume_node"):
            self.resume_node = "intro"
        self.current_node = self.resume_node
        self.resume_node = "intro"
        self.typing_event = None
        self.clear_widgets()
        self.build_ui()
        self.load_node()

    def build_ui(self):
        self.root = FloatLayout()
        self.character_sprite = Image(source=SPRITES["Azzy"]["neutral"], fit_mode="contain",
                                      size_hint=(0.80, 0.80), pos_hint={"center_x": 0.50, "center_y": 0.59})
        self.root.add_widget(self.character_sprite)

        self.hud = Panel(bg_color=(0.04, 0.025, 0.055, 0.90), radius=16,
                         orientation="vertical", padding=(12, 7), spacing=0,
                         size_hint=(0.25, 0.115), pos_hint={"right": 0.985, "top": 0.985})
        self.yande_stat = Label(text="", font_size=14, color=(1, 0.55, 0.78, 1), halign="left", valign="middle")
        self.ace_stat = Label(text="", font_size=14, color=(0.50, 0.76, 1, 1), halign="left", valign="middle")
        for item in (self.yande_stat, self.ace_stat):
            item.bind(size=lambda obj, value: setattr(obj, "text_size", value))
            self.hud.add_widget(item)
        self.root.add_widget(self.hud)

        self.dialogue_panel = Panel(bg_color=PANEL, radius=22, orientation="vertical",
                                    padding=(18, 13), spacing=6, size_hint=(0.94, 0.41),
                                    pos_hint={"center_x": 0.5, "y": 0.025})
        self.name_bar = Panel(bg_color=(0.19, 0.065, 0.20, 0.98), radius=14,
                              orientation="horizontal", padding=(14, 0), size_hint_y=None, height=43)
        self.speaker = Label(text="", font_size=21, bold=True, color=TEXT, halign="left", valign="middle")
        self.speaker.bind(size=lambda obj, value: setattr(obj, "text_size", value))
        self.name_bar.add_widget(self.speaker)
        self.dialogue_panel.add_widget(self.name_bar)

        self.dialogue = ClickableDialogue(text="", font_size=18, color=TEXT, halign="left", valign="top",
                                           click_callback=self.finish_text)
        self.dialogue.bind(size=lambda obj, value: setattr(obj, "text_size", (value[0] - 8, value[1])))
        self.dialogue_panel.add_widget(self.dialogue)

        self.choice_box = BoxLayout(orientation="vertical", spacing=5, size_hint_y=None)
        self.dialogue_panel.add_widget(self.choice_box)
        self.root.add_widget(self.dialogue_panel)
        self.add_widget(self.root)

    def update_character(self, speaker, expression="neutral"):
        data = SPRITES.get(speaker)
        if not data:
            self.character_sprite.opacity = 0
            return
        self.character_sprite.source = data.get(expression, data.get("neutral"))
        self.character_sprite.reload()
        self.character_sprite.opacity = 1
        self.character_sprite.size_hint = (0.78, 0.80)
        self.character_sprite.pos_hint = {"center_x": 0.50, "center_y": 0.59}

    def update_stats(self):
        self.yande_stat.text = f"♥ Yan'De     {game.yande_affection}"
        self.ace_stat.text = f"✦ Ace         {game.ace_relationship}"

    def load_node(self):
        node = STORY[self.current_node]
        speaker = node["speaker"]
        self.speaker.text = game.name if speaker == "Azzy" else speaker
        self.update_character(speaker, node.get("expression", "neutral"))
        self.full_text = node["text"]
        self.char_index = 0
        self.dialogue.text = ""
        if self.typing_event:
            self.typing_event.cancel()
        self.typing_event = Clock.schedule_interval(self.type_text, 0.006)
        self.choice_box.clear_widgets()
        choices = node["choices"]
        button_height = 44
        self.choice_box.height = len(choices) * button_height + max(0, len(choices) - 1) * 5
        for choice_text, next_node, yande_change, ace_change in choices:
            button = Button(text=choice_text, font_size=16, size_hint_y=None, height=button_height)
            button.bind(on_release=lambda btn, n=next_node, y=yande_change, a=ace_change: self.choose(n, y, a))
            self.choice_box.add_widget(button)
        self.update_stats()

    def type_text(self, _):
        if self.char_index >= len(self.full_text):
            self.typing_event = None
            return False
        self.char_index += 2
        self.dialogue.text = self.full_text[:self.char_index]
        return True

    def finish_text(self):
        if self.dialogue.text != self.full_text:
            if self.typing_event:
                self.typing_event.cancel()
                self.typing_event = None
            self.char_index = len(self.full_text)
            self.dialogue.text = self.full_text

    def choose(self, next_node, yande_change, ace_change):
        if self.typing_event:
            self.typing_event.cancel()
            self.typing_event = None
        game.yande_affection = max(0, min(100, game.yande_affection + yande_change))
        game.ace_relationship = max(0, min(100, game.ace_relationship + ace_change))

        if next_node == "refuse_bridge_1":
            game.route_choice = "refuse"
        elif self.current_node == "date" and next_node == "doctor":
            game.route_choice = "agree"

        if next_node == "therapy":
            self.manager.current = "therapy"
            return
        if next_node == "ending_check":
            self.check_ending()
            return
        if next_node == "ending_normal":
            game.ending = "normal"
            self.manager.current = "ending"
            return
        if next_node == "ending_rejection":
            game.ending = "rejection"
            self.manager.current = "ending"
            return
        self.current_node = next_node
        self.load_node()

    def check_ending(self):
        if not game.ace_alive or game.yande_insanity >= 100:
            game.ending = "true"
        elif game.yande_affection <= 2:
            game.ending = "rejection"
        elif game.yande_affection >= 8 and game.ace_relationship >= 4:
            game.ending = "normal"
        elif game.ace_relationship >= 3:
            game.ending = "institution"
        else:
            game.ending = "rejection"
        self.manager.current = "ending"


class TherapyScreen(Screen):
    def on_enter(self):
        self.clear_widgets()
        self.started = False
        self.question_number = 0
        self.fake_calm_used = False
        self.awaiting_continue = False
        self.pairs = []
        self.build_intro()

    def on_leave(self):
        self.stop_round_timer()

    def build_intro(self):
        root = FloatLayout()
        ace = Image(source=SPRITES["Dr. Ace Brighton"]["neutral"], fit_mode="contain",
                    size_hint=(0.55, 0.82), pos_hint={"x": -0.02, "center_y": 0.51})
        root.add_widget(ace)
        panel = Panel(bg_color=(0.045, 0.03, 0.06, 0.96), radius=22,
                      orientation="vertical", padding=24, spacing=12,
                      size_hint=(0.58, 0.68), pos_hint={"right": 0.96, "center_y": 0.5})
        panel.add_widget(make_label("THERAPY SESSION", 30, halign="left"))
        panel.add_widget(make_label("You are now playing as Dr. Ace Brighton.", 18, MUTED, halign="left"))
        intro = make_label(
            "\"Good afternoon. I'm Dr. Brighton. You can call me Ace if that makes this easier.\"\n\n"
            "You'll complete 15 rounds. Each round gives you two questions to choose from.\n"
            "The 30 options are randomly drawn from a pool of 100, and each question's quality stays hidden until you ask it.\n\n"
            "You have 5 seconds to choose. Keep his insanity below 100%.",
            18, TEXT, halign="left", valign="top"
        )
        panel.add_widget(intro)
        start = Button(text="START SESSION", font_size=20, size_hint_y=None, height=58)
        start.bind(on_release=self.start_session)
        panel.add_widget(start)
        root.add_widget(panel)
        self.add_widget(root)

    def start_session(self, _):
        self.started = True
        self.question_number = 0
        self.fake_calm_used = False
        game.yande_insanity = 20

        # 15 rounds × 2 choices = 30 unique questions randomly drawn from the 100-question pool.
        selected_questions = random.sample(THERAPY_QUESTIONS, 30)
        self.question_pairs = [
            selected_questions[i:i + 2] for i in range(0, 30, 2)
        ]
        self.round_timer_event = None
        self.round_time_left = 5.0

        self.clear_widgets()
        self.build_session_ui()
        self.next_question_pair()

    def build_session_ui(self):
        self.root = FloatLayout()
        self.yande_sprite = Image(source=SPRITES["Yan'De"]["neutral"], fit_mode="contain",
                                  size_hint=(0.62, 0.78), pos_hint={"center_x": 0.5, "center_y": 0.60})
        self.root.add_widget(self.yande_sprite)

        self.insanity_panel = Panel(bg_color=(0.045, 0.025, 0.055, 0.96), radius=16,
                                    orientation="vertical", padding=(12, 7), spacing=3,
                                    size_hint=(0.30, 0.14), pos_hint={"right": 0.985, "top": 0.985})
        self.insanity_label = Label(text="", font_size=15, bold=True, color=TEXT, halign="left", valign="middle")
        self.insanity_label.bind(size=lambda obj, value: setattr(obj, "text_size", value))
        self.insanity_bar = AnimatedInsanityBar(
            display_value=game.yande_insanity,
            bar_color=AnimatedInsanityBar.color_for_value(game.yande_insanity),
            size_hint_y=None,
            height=18
        )
        self.insanity_bar.bind(display_value=self.update_animated_insanity_label)
        self.update_animated_insanity_label(self.insanity_bar, self.insanity_bar.display_value)
        self.insanity_panel.add_widget(self.insanity_label)
        self.insanity_panel.add_widget(self.insanity_bar)
        self.root.add_widget(self.insanity_panel)

        self.session_panel = Panel(bg_color=(0.055, 0.035, 0.070, 0.97), radius=22,
                                   orientation="vertical", padding=(18, 12), spacing=7,
                                   size_hint=(0.94, 0.46), pos_hint={"center_x": 0.5, "y": 0.02})
        self.counter_label = Label(text="", font_size=14, color=MUTED, size_hint_y=None, height=24,
                                   halign="left", valign="middle")
        self.counter_label.bind(size=lambda obj, value: setattr(obj, "text_size", value))
        self.timer_label = Label(text="TIME  5.0s", font_size=16, bold=True, color=(1, 0.86, 0.48, 1),
                                 size_hint_y=None, height=24, halign="right", valign="middle")
        self.timer_label.bind(size=lambda obj, value: setattr(obj, "text_size", value))
        self.feedback_label = Label(text="Ask the question before time runs out.", font_size=17, color=TEXT,
                                    halign="left", valign="middle", size_hint_y=None, height=62)
        self.feedback_label.bind(size=lambda obj, value: setattr(obj, "text_size", value))
        self.question_box = BoxLayout(orientation="vertical", spacing=6, size_hint_y=None, height=126)
        self.calm_button = Button(text="CALM YAN'DE DOWN  -5%", font_size=15, size_hint_y=None, height=44,
                                  opacity=0, disabled=True)
        self.calm_button.bind(on_release=self.use_fake_calm)
        self.continue_button = Button(text="NEXT QUESTION", font_size=16, size_hint_y=None, height=44,
                                      opacity=0, disabled=True)
        self.continue_button.bind(on_release=self.continue_after_result)

        self.session_panel.add_widget(self.counter_label)
        self.session_panel.add_widget(self.timer_label)
        self.session_panel.add_widget(self.feedback_label)
        self.session_panel.add_widget(self.question_box)
        self.session_panel.add_widget(self.calm_button)
        self.session_panel.add_widget(self.continue_button)
        self.root.add_widget(self.session_panel)
        self.add_widget(self.root)
        self.update_insanity_ui()

    def next_question_pair(self):
        if self.question_number >= 15:
            self.finish_session()
            return

        self.awaiting_continue = False
        self.continue_button.opacity = 0
        self.continue_button.disabled = True
        self.stop_round_timer()
        self.question_box.clear_widgets()
        self.feedback_label.text = "Ask the question before time runs out."
        self.feedback_label.color = TEXT
        self.counter_label.text = f"SESSION {self.question_number + 1} / 15   •   POOL: 100"

        self.current_pair = self.question_pairs[self.question_number]
        for option_number, question in enumerate(self.current_pair, start=1):
            btn = Button(
                text=f"{option_number}.  {question['q']}",
                font_size=14,
                size_hint_y=None,
                height=58,
            )
            btn.bind(on_release=lambda b, data=question: self.ask_question(data))
            self.question_box.add_widget(btn)

        self.round_time_left = 5.0
        self.timer_label.text = "TIME  5.0s"
        self.round_timer_event = Clock.schedule_interval(self.tick_round_timer, 0.1)
        self.update_calm_button()

    def tick_round_timer(self, dt):
        if self.awaiting_continue:
            self.stop_round_timer()
            return False
        self.round_time_left = max(0.0, self.round_time_left - dt)
        self.timer_label.text = f"TIME  {self.round_time_left:.1f}s"
        if self.round_time_left <= 0:
            self.stop_round_timer()
            self.timer_label.text = "TIME  0.0s"
            # No answer in time: one of the two available questions is chosen at random.
            self.ask_question(random.choice(self.current_pair))
            return False
        return True

    def stop_round_timer(self):
        event = getattr(self, "round_timer_event", None)
        if event is not None:
            event.cancel()
            self.round_timer_event = None

    def ask_question(self, question):
        if self.awaiting_continue:
            return
        self.awaiting_continue = True
        self.stop_round_timer()
        self.timer_label.text = "TIME  --"
        self.question_box.clear_widgets()

        game.yande_insanity = max(0, min(100, game.yande_insanity + question["delta"]))
        self.yande_sprite.source = SPRITES["Yan'De"][question["expression"]]
        self.yande_sprite.reload()

        rating = question["value"].upper()
        sign = "+" if question["delta"] >= 0 else ""
        self.feedback_label.text = (
            f"YAN'DE: \"{question['response']}\"\n\n"
            f"{rating} QUESTION   {sign}{question['delta']}% INSANITY"
        )
        if question["value"] == "good":
            self.feedback_label.color = (0.58, 1, 0.72, 1)
        elif question["value"] == "okay":
            self.feedback_label.color = (1, 0.86, 0.48, 1)
        else:
            self.feedback_label.color = (1, 0.46, 0.55, 1)

        self.update_insanity_ui()
        self.update_calm_button()

        if game.yande_insanity >= 100:
            Clock.schedule_once(self.therapy_failure, 0.8)
            return

        self.continue_button.opacity = 1
        self.continue_button.disabled = False

    def continue_after_result(self, _):
        if not self.awaiting_continue:
            return
        self.question_number += 1
        self.next_question_pair()

    def insanity_state(self, value):
        if value < 50:
            return "STABLE"
        if value < 75:
            return "AGITATED"
        if value < 100:
            return "DANGEROUS"
        return "BREAKDOWN"

    def update_animated_insanity_label(self, instance, animated_value):
        value = int(round(animated_value))
        state = self.insanity_state(value)
        meter_color = AnimatedInsanityBar.color_for_value(value)
        self.insanity_label.text = f"YAN'DE INSANITY   {value}%\n{state}"
        self.insanity_label.color = meter_color

    def update_insanity_ui(self):
        value = int(game.yande_insanity)
        self.insanity_bar.animate_to(value)

        if value >= 75 and value < 100:
            Animation.cancel_all(self.insanity_panel)
            pulse = Animation(opacity=0.65, duration=0.18) + Animation(opacity=1.0, duration=0.18)
            pulse.repeat = True
            pulse.start(self.insanity_panel)
        else:
            Animation.cancel_all(self.insanity_panel)
            self.insanity_panel.opacity = 1

    def update_calm_button(self):
        show = game.yande_insanity > 50 and not self.fake_calm_used and game.yande_insanity < 100
        self.calm_button.opacity = 1 if show else 0
        self.calm_button.disabled = not show

    def use_fake_calm(self, _):
        if self.fake_calm_used or game.yande_insanity <= 50:
            return
        self.fake_calm_used = True
        game.yande_insanity = min(100, game.yande_insanity + 10)
        self.calm_button.text = "THAT DIDN'T HELP.  +10%"
        self.calm_button.disabled = True
        self.feedback_label.text = "Yan'De's expression tightens.\n\nThat didn't help.  +10% INSANITY"
        self.feedback_label.color = (1, 0.42, 0.50, 1)
        self.yande_sprite.source = SPRITES["Yan'De"]["jealous" if game.yande_insanity < 75 else "obsessed"]
        self.yande_sprite.reload()
        self.update_insanity_ui()
        if game.yande_insanity >= 100:
            Clock.schedule_once(self.therapy_failure, 0.8)

    def finish_session(self):
        self.stop_round_timer()
        game.therapy_completed = True
        game_screen = self.manager.get_screen("game")

        # Blue/green finish = therapy succeeds and leads toward Ending 3.
        if game.yande_insanity <= 39:
            game.therapy_result = "success"
            game.ace_relationship = min(100, game.ace_relationship + 4)
            game_screen.resume_node = "therapy_success_1"

        # Yellow through hot-pink (but below 100) = therapy fails;
        # the rejection route continues toward Ending 1.
        else:
            game.therapy_result = "failure"
            game.ace_relationship = min(100, game.ace_relationship + 1)
            game_screen.resume_node = "therapy_failure_1"

        self.manager.current = "game"

    def therapy_failure(self, _):
        self.stop_round_timer()
        game.yande_insanity = 100
        game.ace_alive = False
        game.ending = "true"
        self.manager.current = "ending"


class EndingScreen(Screen):
    def on_enter(self):
        self.clear_widgets()
        self.root = FloatLayout()
        self.add_widget(self.root)
        ending = game.ending

        if ending == "rejection":
            self.build_ending("ENDING ONE", "REJECTION & OBSESSION",
                              "\"But we were having such a nice date...\"",
                              "You rejected Yan'De.\n\nFor a moment, he says nothing.\n\nThe rain keeps falling.\n\nYou never make it home.",
                              SPRITES["Yan'De"]["obsessed"],
                              "I THOUGHT WE WERE HAVING A NICE DATEEEEE", "Rejection & Obsession")
        elif ending == "institution":
            self.build_ending("ENDING TWO", "ACE'S PROBLEM NOW...",
                              "\"You did the right thing by asking for help.\"",
                              "With Ace's help, Yan'De is committed.\n\nThe silence afterward feels strange.\n\nFor the first time in months, you can breathe without looking behind you.",
                              SPRITES["Dr. Ace Brighton"]["smiling"],
                              "Crazy? I was crazy once..", "Ace's Problem Now...")
        elif ending == "normal":
            self.build_ending("ENDING THREE", "YAN'DE REALLY LOVES YOU",
                              "\"I'm trying. For you... and for me.\"",
                              "Nothing changes overnight.\n\nThere are boundaries. Therapy. Arguments. Awkward apologies.\n\nBut somehow, against every reasonable expectation, you make it work.",
                              SPRITES["Yan'De"]["soft"],
                              "You... Did it?!", "Yan'De REALLY loves you")
        else:
            body = (
                "The session ends before it is supposed to.\n\n"
                "Ace pushed one question too far. Yan'De's restraint finally breaks.\n\n"
                "After that, Azzy disappears with him.\n\n"
                "Days become weeks. Weeks become months.\n\n"
                "One morning, the door is unlocked.\n\nAzzy stares at it for a long time.\n\nThen closes it."
            )
            self.build_ending("TRUE ENDING", "KILLING ME SOFTLY WITH HIS SONG...",
                              "\"You could leave whenever you wanted.\"", body,
                              SPRITES["Yan'De"]["obsessed"],
                              "Killing Me Softly With His Song...", "TRUE ENDING")

    def build_ending(self, number, title, quote, body, sprite, achievement, achievement_subtitle):
        character = Image(source=sprite, fit_mode="contain", opacity=0.34,
                          size_hint=(0.68, 0.90), pos_hint={"right": 1.04, "center_y": 0.48})
        self.root.add_widget(character)
        info = Panel(bg_color=(0.04, 0.025, 0.05, 0.94), radius=22, orientation="vertical",
                     padding=(25, 22), spacing=10, size_hint=(0.62, 0.72),
                     pos_hint={"x": 0.045, "center_y": 0.52})
        ending_number = make_label(number, 16, color=(0.90, 0.38, 0.73, 1), halign="left")
        ending_number.size_hint_y = 0.10
        ending_title = make_label(title, 31, halign="left")
        ending_title.size_hint_y = 0.18
        quote_label = make_label(quote, 18, color=(0.88, 0.66, 0.86, 1), halign="left")
        quote_label.size_hint_y = 0.16
        body_label = make_label(body, 17, color=(0.86, 0.82, 0.88, 1), halign="left", valign="top")
        return_button = Button(text="RETURN TO MENU", font_size=17, size_hint_y=None, height=54)
        for widget in (ending_number, ending_title, quote_label, body_label, return_button):
            info.add_widget(widget)
        self.root.add_widget(info)
        return_button.bind(on_release=lambda x: self.return_menu())
        Clock.schedule_once(lambda dt: show_achievement(self.root, achievement, achievement_subtitle), 0.9)

    def return_menu(self):
        game.reset()
        self.manager.current = "menu"


class LovesickApp(App):
    def build(self):
        self.title = "LOVESICK"
        manager = ScreenManager(transition=FadeTransition(duration=0.28))
        manager.add_widget(MenuScreen(name="menu"))
        manager.add_widget(NameScreen(name="name"))
        manager.add_widget(GameScreen(name="game"))
        manager.add_widget(TherapyScreen(name="therapy"))
        manager.add_widget(EndingScreen(name="ending"))
        return manager


if __name__ == "__main__":
    LovesickApp().run()
