---
layout: blog-post.vto
title: Rockstar
date: 2022-11-09 14:00:00
description: Meet Rockstar, my latest find.
tags:
- post
- programming
- esoteric languages
categories: programming
url: /blog/2022/rockstar/
---
I love esoteric programming languages.

Meet Rockstar, my latest find.

The program below finds an area of a circle given a radius.

```
Your dreams were ice. A life unfulfilled; wakin' everybody up, taking booze and pills
Listen to your spell
Cast your spell
Let your spell be of your spell
Put your spell of your dreams into your song
Scream your song!
```

How does it work?

The first line assigns a numerical value of pi (`3.141592654`) into a variable `your_dreams`. I'm not a poet, so this comes directly from the language documentation 😎 Look closer at how we get pi using a poetic number literal:

`ice` means `3` (three letters)
`.` is `.`
`A` is `1`
`life` is `4`
`unfulfilled` has 11 letters, so it's `1`
`wakin'` is `5` (`'` is ignored)

I hope you got it 😉

`Listen to your spell` reads the input into the `your_spell` variable (circle radius), and `Cast your spell` casts (surprise!) a string into a float.

`Let your spell be of your spell` squares the radius (multiplies it by itself) -- `of` is the multiplication operator.

Finally, `Put your spell of your dreams into your song` multiplies the squared radius (`your_spell`) by pi (`your_dreams`), and the last line prints the result.

And here is the binary search in Rockstar:

```
My soul is cold love
Burn my soul
Listen to your heart
Split your heart into pieces with my soul
Listen to the destiny
Cast the destiny

The agony was I
The lovers were us
Let my dreams be pieces over the lovers
Turn up my dreams

Let the world be pieces without the agony

The nature was hipnotized
The fortune was everything

While the nature is as weak as the world,
Put the nature with the world into my dreams
Let my dreams be over the lovers
Turn up my dreams
Let the end be pieces at my dreams
If the end is the destiny,
Shout my dreams
Knock the fortune down
Break it down

If the end is smaller than the destiny,
Let the nature be my dreams with the agony
Else,
Knock the world down

Knock the agony down 
If the fortune is the agony,
Knock the fortune down
Whisper the fortune
```

I'll let you figure it out 🤘

[Try the code here](https://codewithrockstar.com/online)

[Rockstar docs](https://codewithrockstar.com/docs)

