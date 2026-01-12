---
layout: blog-post.vto
title: Playing Multi-user Dungeon (MUD) in the Terminal
date: 2022-07-05 14:00:00
description: MUD is a text-based role-playing game (RPG) you can play in the terminal.
  It still exists today!
tags:
- post
- stories
- video-games
- linux
categories: stories
url: /blog/2022/MUD-story/
thumbnail: assets/img/blog/2022/MUD-screenshot.jpg
---
In the early 2000s, while doing my undergrad, I worked full-time as a system administrator, spending most of my time in the server room. We had enough machines but never enough screens and keyboards. So the only screen I could use belonged to an ancient Linux server that we used as a router. I used it to play MUD.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <img src="/assets/img/blog/2022/MUD-screenshot.jpg" alt="Multi-user Dungeon" class="img-fluid rounded z-depth-1" />
    </div>
</div>
<div class="caption">
    MUD in the terminal.
</div>

MUD (Multi-user dungeon) is a text-based game. To join a game, you use telnet (think of SSH with zero encryption). Plain text only (coloured text in some terminals). No graphics, no sounds, no 3D (well, no 2D as well).

Command-line navigation. Moving: s, n, w, and e (south, north, … you got it). Almost any obvious verb is a command: sleep, wake, look, take, drop, give, wear, wield, hold, sacrifice, look, eat, drink, fill, pour, buy, sell, value, kill, flee, kick, backstab, cast, stand, sit, enter… 

The world was HUGE. The game I played had a few dozen areas, each had a map (text-based, obviously). To get to a certain area, you could just walk step by step or use a shortcut (hey, Nielsen’s heuristic #7!). For example, `34en2e3s3w3s3e3u2e3s4dw7s4e2n2e` means 34 steps to the East, one step North, two steps East, three steps South… you got it.

Using text to fight mobs was fun! You can’t “see” what’s happening, so every round is described in detail. There was a special verb for each damage level, from “your stab scratches the monster” to “your kick --===ANNIHILATES===-- the monster” (yes, it looked like that). You need to be a pretty fast typist to fight, defend, change weapons and cast spells!

And on top of all that, MUDs have socials (or social commands). In most MUDs, there are hundreds of commands to communicate with other players. Any emotions, any non-verbal communication, all in plain text. You can sage, salute, scratch, scream, scuff, shake, shiver, shrug, shudder, sigh, sing, slobber, smile, smirk, snap, snarl, sneer, sneeze, snicker, sniff, snore, snort, sob, sprout, squeal, squirm, stagger, stare, stomp, stretch, strum, strut, swoon, sulk, support. And those are just the socials starting with “s”. 

In 2022, MUDs are still alive. I joined Aardwolf to make a screenshot for this post, and there are 237 characters online.