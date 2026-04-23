---
layout: blog-post.vto
title: From writeln() to Cursor
date: 2025-07-05 19:52:00
description: "That same electric joy I felt typing my first Turbo Pascal program in 1997 — I'm feeling it again with Cursor. Programming is fun again."
tags:
- post
- AI
- cursor
- programming
- teaching
- education
thumbnail: assets/img/blog/2025/turbo-pascal.png
url: /blog/2025/from-writeln-to-cursor/
---

![Turbo Pascal 7.0 IDE showing a writeln('Hello World!') program](/assets/img/blog/2025/turbo-pascal.png)

Picture this: 1997. A blue screen. Not the bad kind — the beautiful, empty Turbo Pascal 7.0 IDE kind. I type my first program:

Ctrl+F9.

And then — magic. Those words appear on the screen. My words. My creation.

I was hooked. That moment when code becomes *real*, when keystrokes become something that *works* — it's intoxicating. It's Wingardium Leviosa for nerds, and I'd just made my first feather float.

Fast forward to last Friday. I'm staring at another empty screen. Black this time — Cursor's interface. But instead of Pascal, I'm typing... English:

> "Create a full-stack app that replaces this nightmare spreadsheet I use for organizing something that had outgrown Excel. Include role-based access, audit logs, and please make the UI not look like it's from 2003."

Enter.

Twenty minutes later, I have a skeleton. Forms, buttons, a database schema that actually makes sense. The buttons don't work yet, but they're *there*.

I type: *"Make all the buttons functional. Connect them to the backend."*

Win+L. Head to a meeting.

When I return, Cursor has written 1,000+ lines of boilerplate. The buttons work. What would have taken me weeks of tedious coding — configuring routes, wiring up endpoints, handling edge cases — is done.

And I realize: I'm feeling it again. That same electric joy from 1997. That *"I just made something from nothing"* rush.

Programming is fun again.

## The Spreadsheet Story

Let me back up. That spreadsheet? It had started innocently enough. A few columns, some formulas, maybe a pivot table. But spreadsheets are like kudzu — they grow until they consume everything.

You know what the fix would have been two years ago? Database schema. Models. Backend routes. Forms. Validation. CSS that never quite works right. Days of setup. Weeks of boilerplate. By the time you get to the interesting part, the creative energy is gone. The spreadsheet limps along for another year.

But last Friday, I explained the problem to Cursor. Not the technical implementation — the actual problem.

The boring parts? Cursor handled them. Authentication, database migrations, CRUD endpoints — a thousand tiny decisions that don't require creativity, just consistency.

What was I doing while Cursor wrote boilerplate? Thinking about the cool features the old spreadsheet could never handle.

*"How cool would it be if..."*

That's where my brain was. In the fun space. The "what's possible" space.

## What Changed?

It's not that I forgot how to code. Two years ago, I could have built that same app. I know JavaScript (well, sort of — who really knows JavaScript?). I can wrangle CSS. I've deployed to production.

But knowing how and *wanting* to are different things.

The old way: **Learn the syntax → Remember the patterns → Debug the configs → Google the errors → Finally solve the problem**

The new way: **Describe the problem → Guide the solution → Focus on what matters**

When I was learning in 1997, every `writeln()` was magic because I didn't know what was possible. The syntax itself was the adventure. But after decades of coding, syntax isn't the adventure anymore. It's the traffic jam on the way to the adventure.

What Cursor gives me — what AI gives all of us — is a teleporter past the traffic.

I don't need to remember whether it's `addEventListener` or `attachEvent`. I don't need to look up the React Hook rules for the thousandth time. I don't need to write another user authentication system from scratch.

I need to think. To design. To imagine.

The magic isn't in the syntax anymore. It's in the ideas.

## The Workshop Moment

Two weeks ago, my colleague Juancho and I ran a Cursor workshop. Thirty students, some of whom had never built a full-stack application.

We gave them one thing: a URL to a deployed REST API (a fake banking system) and one word: "curl."

"Build a frontend for this," we said. "Make it do something cool."

I watched a student stare at the screen. Then type:

> "I have this API endpoint that returns bank account data. Use curl to understand how it works. Then, help me create a React frontend that displays accounts and lets users transfer money between them."

Twenty minutes later — twenty minutes! — she was demoing a working banking interface. Not perfect. Not production-ready. But working. Real data flowing from our API to her frontend.

"I don't even know React," she said, clicking through her creation. "Is this... is this cheating?"

No. This is the opposite of cheating.

She built something real. She connected frontend to backend. She saw data flow through the system she created. Sure, she might not be able to explain every line of code yet. But she experienced what it *feels* like when the pieces connect.

She didn't waste three weeks fighting with webpack configs and CORS errors before getting to experience that "it works!" moment.

That's when it clicked for me: **We're not just making coding fun again for ourselves. We're completely changing what it means to learn to code.**

## The Resistance Is Real

Not everyone's celebrating, though. And honestly? They have a point.

"My coding assignment was perfect," a colleague told me at a conference the other day. "Challenging, well-designed, taught exactly what students needed to know. Now they solve it in five minutes with AI. They need to code it manually, with no AI help, or they won't learn."

I get it. I really do.

Because here's the thing: I actually agree that fundamentals matter more than ever. When AI generates a solution, students need to understand *why* it works. When the AI suggests an O(n²) algorithm, they need to recognize why that's a problem. When it creates a race condition, they need the foundations to spot it.

But we're also watching students use AI tools and ask questions we never heard before: "Why did Cursor suggest this architecture?" "What are the trade-offs here?" "How would this scale?"

They're thinking at a higher level. But are they missing something crucial at the lower level?

I don't have the answer. None of us do. We're all exploring this together.

What I do know is that our profession is changing. The curriculum we perfected, the assignments we crafted, the entire way we measure understanding — it all needs rethinking. Not throwing away, but rethinking.

We've been here before, sort of. When IDEs added autocomplete. When Stack Overflow launched. When Google made documentation instantly searchable. Each time, we adapted. We found new ways to teach the fundamentals while embracing the tools.

This time feels bigger, though. And we're all still figuring it out.

## Why This Joy Matters

I spent Canada Day building something I've been dreaming about for years.

Not with my family at the festivities. Not at a barbecue. In my home office, blinds closed, coffee cold, completely lost in the flow of creation.

My wife poked her head in around dinner time: "You okay in there?"

"I'm building something," I said, probably grinning like an idiot.

She knows that look. It's the same one she's seen countless times over the years — when I discovered a new framework, solved a particularly nasty bug, or got something working that shouldn't work. The "I just made magic happen" look.

Here's the thing: I've had ideas for years. We all have. That app that would make life easier. That tool that would help students learn better. That system that would finally organize the chaos.

But the gap between idea and implementation was too wide. Too many boring parts. Too much boilerplate. Too much... traffic.

Not anymore.

When programming becomes fun again — when we can teleport past the boring parts — we build things. Real things. Useful things. Things that were always possible but never practical.

My Canada Day project? It's working now. Not polished, not perfect, but *working*, end to end. The core idea that seemed too complex to tackle is actually running, actually solving the problem I'd been thinking about for years.

Three months ago, it was just another idea in my "someday maybe" folder.

That's the real magic. Not the syntax. Not the tools. The joy that makes us want to build again.

## What Now?

I'm still figuring this out. We all are.

Maybe introduce Cursor in week one? Maybe not. Maybe some hybrid approach we haven't thought of yet.

What I do know is that I'm building again. That app I've been thinking about for years? I'm actually working on it. Not just planning. Not just dreaming. **Building**.

And my students? They're experiencing what programming can be when the syntax gets out of the way. Some will go deeper into the fundamentals. Some won't. But they're all getting a taste of why we fell in love with this field in the first place.

Still buzzing from that Canada Day coding session. Still discovering what's possible.

If you're feeling that itch to build something — that idea that's been sitting in your mental backlog — maybe it's time?

What could you create if the boring parts weren't so boring anymore?

---

**P.S.** That Canada Day project? It's about helping students build portfolios that actually land jobs. If you're curious: [mynextproject.dev](https://mynextproject.dev).
