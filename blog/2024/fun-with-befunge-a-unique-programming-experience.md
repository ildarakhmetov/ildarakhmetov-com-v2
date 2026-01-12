---
layout: blog-post.vto
title: Fun with Befunge
date: 2024-07-03 10:00:00
description: Exploring the fun and complexity of Befunge, a two-dimensional programming
  language.
tags:
- post
- programming
- befunge
- esolang
- coding-fun
categories: coding-fun
url: /blog/2024/fun-with-befunge-a-unique-programming-experience/
thumbnail: assets/img/blog/2024/2024-07-03-fun-with-befunge-a-unique-programming-experience.png
---
What a fun Friday night I had.

Do you recognize the language in the screenshot below?

The file extension may give you a clue.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <img src="/assets/img/blog/2024/2024-07-03-fun-with-befunge-a-unique-programming-experience.png" alt="Screenshot of Befunge code converting input string to uppercase." class="img-fluid rounded z-depth-1" />
    </div>
</div>
<div class="caption">
    Befunge code example.
</div>

Befunge! I have never used it before and what a fun language it is. It is a two-dimensional language, so the program is laid out on a 2D playfield of fixed size. The code can go in four directions, and you can change the direction using the >, <, v, and ^ operators.

For example, this is an infinite loop:

```befunge
>v
^<
```

Each character in the field is an instruction.

The program on the screenshot is my quick exercise (yes, I wrote it, and I'm proud of it). It converts an input string to uppercase.

The first thing that might confuse you are the digits. What do they mean? They're just ASCII characters. `55+` means `5+5`, or 10 (this is postfix notation, similar to Forth). So `55+` pushes 10 (ASCII code for a newline character `\n`) to the stack, and we use it to check if we have reached the end of the input string. Same with the digits on line 2: `99*35*+` in postfix notation means `(9*9)+(3*5)`, or 96, and we need it to compare a given character with `'a'` (code 97).

The `|` instruction is Befunge's conditional statement. It moves the instruction pointer up or down depending on the current top stack value.

If you want to spend an evening with Befunge, I'd like to refer you again to the book "Strange Code". The chapter on Befunge is short and very easy to follow.

Have fun!
