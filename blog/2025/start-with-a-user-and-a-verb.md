---
layout: blog-post.vto
title: Start with a User and a Verb
date: 2025-06-09 23:18:00
description: "Reflections on scoping 60+ capstone projects at the University of Alberta: why the strongest projects begin with a clear actor, a concrete action, and a workflow to match."
tags:
- post
- teaching
- capstone
- project-management
- scoping
thumbnail: assets/img/blog/2025/ta-management-system.png
url: /blog/2025/start-with-a-user-and-a-verb/
---

When I joined the University of Alberta, I inherited a course called CMPUT 401 — Software Process and Product Management. Designed by Dr. Eleni Stroulia and now taught by Mark Polak, the course pairs students with real clients to build real software. During my time with 401, I ran over 60 projects with more than 40 unique community partners. All of them were completed. That sounds like a brag, but it's not — because not all of them were always smooth, and not all of them were truly *used*.

This is a reflection on what I learned about project scoping. It's also a thank-you note to the people who made these projects meaningful: our partners from the Community Service-Learning team (David Peacock, Erin Kelly, Mishma Mukith), our clients, my TAs, and of course, the students.

## What Makes a Scope Work

**Start with a user and a verb.** The strongest projects begin with a clear actor and a concrete action. "A community league member wants to book a skating rink" led to a successful booking app. "A student wants to generate a resume" led to a simple, well-built resume generator. If you can't explain the app with a "who and a what", the scope probably needs work. And this pairing often points toward an entire **workflow** — not just isolated features.

**Scope the workflow, not just the features.** One of my favorite projects — a TA Management System — worked because it mapped out a full workflow: students apply, instructors browse, coordinators assign. Features are just fragments. "Workflows are what people actually do." When in doubt, walk through the user's day.

![TA Management System: a clean workflow with distinct user roles — students, instructors, coordinators](/assets/img/blog/2025/ta-management-system.png)

**Decide early: MVP, PoC, or Final Product.** We always needed clarity on the product's ambition. Is it a one-off proof of concept? An MVP we hope to test and iterate? Or a final product meant to be deployed? Projects like the Immigrant Sexual Health Knowledge Portal and the Tradeslink Classifieds Module succeeded because that clarity was in place from the start.

**Modern scoping means knowing your building blocks.** Some of the best projects didn't build from scratch — they stitched together existing libraries, APIs, and services. Whether integrating Google Maps, using Firebase Auth, or extending open-source tools, these choices narrowed the scope and sharpened the focus. Part of scoping is scanning the ecosystem: what can we reuse?

## When It's Hard (But Worth It)

**Brownfield projects are hard.** The itwêwina team wrestled with legacy code and linguistics. The Knead Chat team had to find their way through inherited architecture. These projects succeeded — but at a cost. My takeaway: scope them with margin. That means budgeting extra time for onboarding, cleanup, and surprises.

**Ambiguity is risky — but not always bad.** One project began with a client saying, "We'll take whatever you give us." Normally a red flag. But in this case (the LaTandao project), the team delivered everything. And then some. It worked because the team was unusually strong and entrepreneurial. In hindsight, I wouldn't take that risk again — but I'm glad it worked once.

![LaTandao: built by a self-directed team with a broad scope and no guarantees — proof that team dynamics can sometimes beat ambiguity](/assets/img/blog/2025/latandao.png)

**Learning curves are not blockers.** Many students started from zero with stacks like Flutter, Ionic, Django, or PHP. The best teams didn't just build — they learned. Scope should respect this but not fear it. In fact, learning is often part of the value proposition.

## How I Scoped Projects

I had no formal checklist, but I did have a strong internal compass. When I could *imagine* the app while talking to the client — see the screens in my head, understand the data model, the key interaction — that was a green light. If I was still trying to decode the idea after 15 minutes of discussion, that was a red flag.

We scoped in layers: first between me and the client, then between students and the client using MoSCoW prioritization, then again mid-project during our scope check sessions. Scope was never final — it was alive.

Sometimes the problem was *too* narrow: we'd deliver exactly what was asked, but the app didn't do much. And sometimes, even when the client loved the product, they didn't have the capacity to use it. That's not failure — but it's worth scoping for adoption, too.

## Lessons I Keep Returning To

- Scope around users, verbs, and workflows.
- Define whether it's a PoC, MVP, or finished product.
- Modern software is built on blocks — find the right ones early.
- Don't fear legacy code — but plan for it.
- Learning is part of the project, not a delay.
- A clear mental model trumps a polished requirements doc.

## Gratitude

The real heroes were my TAs — mentors, tech leads, guides. This post wouldn't be complete without naming them: Aaron Skiba, Anders Johnson, Brij Patel, Dalton Ronan, Daniel Chui, Jacques Leong-Sit, Jashwanth Reddy Sarikonda, Joshua Billson, Kalvin Eng, Mohayeminul Islam, Pranjal Naringrekar, Shraddha Makwana, Spencer Killen, Victor Silva, and Yazeed Mahmoud. Without them, this course wouldn't have worked.

Our clients were more than clients — they were co-educators. And our students? They turned vague ideas into working systems, week after week. They also had fun, which, in the end, might be the best scope of all.

---

*This reflection draws on my experience teaching CMPUT 401 at the University of Alberta. I now lead the computing programs at Northeastern Vancouver, where we continue to explore how experiential learning shapes education. These lessons continue to shape how I approach project scoping today — whether I'm mentoring students, collaborating with colleagues, or advising on new initiatives.*
