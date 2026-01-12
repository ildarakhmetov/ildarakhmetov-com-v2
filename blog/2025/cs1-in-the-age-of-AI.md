---
layout: blog-post.vto
title: CS1 in the Age of AI
date: 2025-06-07 14:00:00
description: "Here’s the question that’s been bouncing around my head while I go on my long runs or wait in line for coffee: Should students actually use Cursor from Week One?"
tags:
- post
- AI
- education
- teaching
thumbnail: assets/img/blog/2025/cursor.png
url: /blog/2025/cs1-in-the-age-of-ai/
---



> You don’t need to out-code everyone. You need to out-think the problem.
> — Satya Nadella

I've been prepping my CS1 course for Fall. The version that I teach is called CS 5001 here at Northeastern, and it’s our introduction to computing. But this time, I'm looking at the syllabus through a different lens. I can’t pretend we’re still in 2018. Students today are writing code with Copilot, debugging with ChatGPT, and quietly using tools like Cursor that make our old assignments laughably easy.

So here’s the question that’s been bouncing around my head while I go on my long runs or wait in line for coffee: Should students actually use Cursor from Week One?

That is, should I tell them on day one: Here’s Cursor. Use it. Treat it as your co-pilot. Learn with it, build with it, and reflect on what it gets right and where it falls short. Or should I hold off, try to preserve the struggle, and pretend—just for a few weeks—that the world hasn’t changed?

## Why This Is a Real Debate

Cursor is no toy. It’s a version of VS Code with an LLM built in, and when I gave it my beloved (and hard!) Pokémon Battle lab, it didn’t just solve the problem. It ran the code with all expected input/output examples, iterated a few times and handed off a perfect solution in less time than it took to steep my tea.

![Cursor IDE interface showing AI assistance](/assets/img/blog/2025/cursor.png)

Great for productivity. Catastrophic for pedagogy.

The old assignments no longer do what they were meant to do. They no longer produce the kind of struggle that leads to learning. We need to stop pretending they do.

## But I Can't Rewrite Everything

This is where constraints come in.

I can’t change the catalog description. I can’t change the learning outcomes. I have to hand off students who are ready for the next courses in the pipeline: Algorithms and Data Structures (CS2-ish) and Object-Oriented Design. And I still believe that foundational skills matter. Recursion. Problem decomposition. Reasoning about data. Thinking in systems.

I’m a fan of this model.

Leo Porter and Dan Zingaro wrote a fantastic book called [Learn AI-Assisted Python Programming with GitHub Copilot and ChatGPT](https://www.manning.com/books/learn-ai-assisted-python-programming). I was one of the reviewers, and the book lays out a full curriculum that embraces AI as a learning partner from the start. It’s thoughtful, well-scaffolded, and speaks to the same vision I’ve been exploring—though with Copilot and ChatGPT rather than Cursor. Still, Cursor feels like a bold step further in the same direction.

So the real challenge is this:

**Can we make an AI-first CS1 that still honors the foundations?**

## What We Can’t Afford to Lose

The learning outcomes in the course catalog say things like:

* Write code that is readable and modifiable.
* Represent information as data.
* Use testing as a habit.
* Document contracts and assumptions.
* Generalize to avoid duplication.
* Use common recursive structures.
* Informally argue termination.

None of these say "write every line yourself"! But they do require understanding. AI use is okay. Blind copy-paste is not.

This is not about banning AI. It’s about ensuring that learning still happens. If we make Cursor central to CS1, then we must make code comprehension, reasoning, and reflection central too.

## The Blueprint I'm Sketching (And Tinkering With Early in the Mornings)

### Week 1: Cursor Demo + Paper Tracing

Let Cursor generate a full solution to a well-known problem. Then: laptops closed. Students work in pairs with markers and big paper to trace the AI's code. They explain it. Find edge cases. Map state transitions. Learn to read before they learn to write.

![Students in classroom discussing a paper exercise](/assets/img/blog/2025/students.png)

### Dual Track: Reading Code with and without AI

Reading code is everything now.

1. **With AI:** Prompt Cursor to explain a function. Then present the explanation in class. Does it make sense? Does it create an intuition that sticks?
2. **Without AI:** Classic paper-based exercises. Parsons problems. Code tracing. "What does this program print?" No autocomplete. Just thinking.

![Parsons problem example](/assets/img/blog/2025/parsons-problem.png)

*Sample Parsons Problem (img source: [https://www2.eecs.berkeley.edu/Pubs/TechRpts/2020/EECS-2020-88.pdf](https://www2.eecs.berkeley.edu/Pubs/TechRpts/2020/EECS-2020-88.pdf))*

### Writing Code: Notebooks, Not Just Keyboards

We'll still practice writing, but not always with laptops.

* Every few weeks: closed-laptop checkpoints. Write pseudocode on paper. No formalized syntax expected—students can mix Python-style ideas with plain English, diagrams, or whatever helps them think clearly.
* End of term: whiteboard a solution. Any format is allowed—pseudocode, diagrams, arrows, plain English. The point is clarity, not syntax. Maybe, even let them do it in pairs, to move focus even more towards technical communication.

Let’s prepare students for technical interviews and real-world collaboration.

### Projects That Demand AI and Human Judgment

If the old homework is dead, let’s bury it and move on.

Here are some new ideas:

* **Campus Coffee Tracker:** Backend in Python, front-end in Retool or Streamlit. Students design endpoints, define data schema, and build dashboards. Cursor scaffolds; students think.
* **Branching Story Engine:** Recursive structures, cycle detection, and termination proofs (following the learning outcomes!). Hard to build, even with AI.
* **Algorithms-in-Action Lab:** Implement and visualize classic algorithms. Use the freed-up time to drill intuition about sorting, searching, recursion vs. iteration.

![Blueprint on paper](/assets/img/blog/2025/blueprint.png)

Deliverables? Code, of course. But also:

* A reflection log. Where did AI help? Mislead? What did you learn?
* A peer code-walk. Can you explain the code your peer wrote?

And the rubric? It will reward:

* Clear articulation of the problem
* Evidence of testing and iteration
* Communication of design decisions
* Demonstration of understanding—especially in how students critique and explain AI-generated output

### Bonus: More Time for Algorithms

Because AI lifts the boilerplate, we can drill algorithmic thinking earlier. Sorting. Searching. Divide-and-conquer. Let’s help students build that toolbox before CS2 even starts.

![Bubble sort video screenshot](/assets/img/blog/2025/bubble-sort.png)

*img source: [https://www.youtube.com/watch?v=44ZCu3VESbQ](https://www.youtube.com/watch?v=44ZCu3VESbQ)*

I’m not going full CLRS-on-week-one, but Mihail Eric’s [vision of more algorithms](https://www.linkedin.com/posts/mihaileric_the-computer-science-major-is-going-through-activity-7336421728987873281-ZSFP), resonates. Maybe we can get closer.

## What About Equity?

Cursor now gives students a [free 1-year license](https://www.cursor.com/students). Copilot is [free for students](https://docs.github.com/en/copilot/managing-copilot/managing-copilot-as-an-individual-subscriber/getting-started-with-copilot-on-your-personal-account/getting-free-access-to-copilot-pro-as-a-student-teacher-or-maintainer). These tools are becoming ubiquitous, and we now expect access to them as a default part of the setup. Still, we’ll be mindful of different levels of familiarity—and we’ll provide plenty of onboarding and support.

## So... Cursor from Week One?

**I think yes.**

But only if we keep our analog tools close. Only if we double down on reading, reasoning, and reflection. Only if we help students become AI-assisted problem solvers, not prompt-engineers who don’t understand their own code.

The world has changed. But our job—to challenge, to guide, to mentor—hasn’t.
