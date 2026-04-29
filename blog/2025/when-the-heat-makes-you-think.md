---
layout: blog-post.vto
title: When the Heat Makes You Think
date: 2025-08-03 19:27:00
description: "A coffee, a card game, and an AI discovery: how an hour with Cursor turned a children's card game into a crash course in game design, ML, and the new paradigm for learning."
tags:
- post
- AI
- cursor
- education
- learning
- games
thumbnail: assets/img/blog/2025/magdalena-river.png
url: /blog/2025/when-the-heat-makes-you-think/
kind: post
---

![View of the Magdalena River from our cabin in La Dorada, Colombia](/assets/img/blog/2025/magdalena-river.png)

La Dorada sits in the middle of nowhere Colombia, and our Airbnb cabin perched right on the Magdalena River feels like stepping into my grandfather's greenhouse — blazing hot and humid, perfect for tomatoes but brutal for humans.

Google says 37°C. Our thermometer reads 42.5°C with humidity that makes breathing feel like work. We're doing nothing, because doing anything else seems impossible.

My son and I decide to play cards. There's this simple Russian game called пьяница (Drunkard) — perfect when your brain can't quite function.

The rules are dead simple: Split the deck, each player flips their top card, highest card wins both cards. Winner puts the cards at the bottom of their deck. First to run out loses. There's one twist: the 6 beats the Ace (lowest beats highest). That's it.

My wife brings me strong Colombian coffee in this heat (porque no?), and mid-sip, a thought hits me.

Wait. Is there actually strategy in this "mindless" game?

After we finished playing, I grabbed my laptop, opened Cursor, and started exploring. An hour later, I'm writing this post to reflect on my learning journey.

## The Question That Became an Expedition

*"Can you model this Russian card game?"*

Simple question. But here's what happened:

The game seemed pure chance at first — each player flips a card, highest wins both cards, rinse and repeat. But there's a twist: when you win cards, you can choose what order to put them at the bottom of your deck.

That choice? It completely changes the game.

I asked Cursor to build a quick simulation to test different strategies:

- **AsPlayed**: Put cards back in the order they were played (my cards first)
- **WinnerFirst**: Put MY cards at the bottom first when I win
- **OpponentFirst**: Put the opponent's cards first
- **RandomHalf**: Randomly pick which pile goes first

None of the strategies guaranteed an easy win. But still, early results were wild. Some strategy combinations averaged 32 rounds. Others hit the 10,000 round timeout limit I'd set.

The same game. Different strategies. **15.5x difference in game length.**

## Going Deep: 100,000 Games Later

I asked for a scale-up. Cursor ran 100,000 total games — 10,000 for each strategy combination.

More robust results:

**WinnerFirst vs WinnerFirst**: 85 rounds average, perfectly balanced

**AsPlayed vs AsPlayed**: 1,900+ rounds average, 16% timeout rate

The **22x difference** between fastest and slowest strategies wasn't a fluke — it was reproducible at scale.

**WinnerFirst** emerged as superior as a strategy for faster games (the 51% win rate was still not better than others), and balanced even against itself.

## The AI Gets Involved

Next question: Could machine learning find even better strategies?

My (very honest) prompt: *"I'm not a ML guy but I heard ML can work with problems like this, is that right?"*

That's it. That wonderfully naive question led to Cursor building a Deep Q-Network that observed 20 different game state features and learned through 500 episodes of play.

The AI's performance after training was interesting: it demolished predictable strategies (75% win rate vs OpponentFirst) but couldn't beat WinnerFirst (21% win rate) and struggled against randomness.

This validated our analysis: **WinnerFirst is genuinely robust**. The AI independently learned to exploit patterns but confirmed our human-discovered strategy was near-optimal.

## The Learning Framework That Emerged

Without realizing it, we'd stumbled into what might be the new paradigm for CS education:

> **Traditional**: Read → Study → Practice → Apply
>
> **AI-Amplified**: Wonder → Prompt → Iterate → Discover

This isn't just faster — it's fundamentally different. Students become researchers on day one. They don't wait until senior year to do "real" work.

## The 24-Card Mystery

Then I got curious about deck size. Asked Cursor to test 12, 24, and 36 card variants.

Something weird happened with 24 cards — and I was genuinely surprised:

| Deck Size | Avg Rounds | Timeout Rate |
|-----------|-----------|--------------|
| 12 cards  | 376.8     | 3.5%         |
| 24 cards  | 1,690.5   | 15.1% ← Problem! |
| 36 cards  | 636.5     | 4.7%         |

This made no sense. Why would 24 cards be the worst performer?

Here's the thing about humans and AI working together: *I could see something was wrong, but I needed help figuring out why.*

So naturally, next step: *"Why is this happening?"*

Turns out, the problem was simpler than I thought. The 24-card deck (8,9,10,J,Q,K) was missing the special rule that makes Drunkard work: "6 beats Ace."

But there's no 6 in that deck! The upset mechanic was gone entirely.

So I generalized it: **lowest card beats highest card**, whatever they are.

24-card deck with "8 beats King" rule:

- **Before**: 1,660 rounds, 15% timeouts
- **After**: 218 rounds, 0.1% timeouts

This became the optimal configuration: fastest games, most reliable, highest strategic depth.

## The Upset Mechanic Principle

While exploring this simple card game, I stumbled onto what Claude called **The Upset Mechanic Principle**: competitive systems need built-in upset mechanics to prevent equilibrium traps.

Sounds academic, but it's everywhere once you see it. Chess has pawn promotion. Poker has blinds. Drunkard has "lowest beats highest."

The simulation proved it: without upset mechanics, games get stuck. With them? Fast, balanced, fun.

This generalizes way beyond card games. Pretty cool to discover a design principle by accident!

## What This Actually Means

For my son's gameplay: Use **WinnerFirst strategy** with the **24-card "8 beats K" variant**. 4–5 minute games with real strategic depth.

For understanding learning:

> When you can test ideas immediately, curiosity becomes exponentially more powerful.

I went from wondering about strategy to discovering fundamental game design principles in just one hour (and with a brain functioning at 10%).

The tools didn't do the thinking — they amplified the iteration cycle. I'd wonder, Cursor would build, we'd test together, I'd discover patterns.

**Wonder → Build → Test → Discover → Repeat**, but compressed from weeks to minutes.

## What This Means for CS Education

This one-hour exploration accidentally covered:

- **Data Structures**: Card deck management
- **Algorithms**: Strategy optimization
- **Statistics**: Large-scale simulation analysis
- **Machine Learning**: Neural network implementation
- **Game Theory**: Equilibrium and mechanism design
- **Software Engineering**: Iterative development

That's basically a semester's worth of CS curriculum, triggered by curiosity about a children's card game.

The question isn't whether students can handle this complexity — it's whether our curricula can keep up with what's now possible.

When students can go from *"I wonder..."* to publishing-quality research in an afternoon, what should we be teaching? Problem identification? Question formulation? How to guide AI collaborators?

The bottleneck isn't access to tools anymore. It's knowing what problems are worth solving.
