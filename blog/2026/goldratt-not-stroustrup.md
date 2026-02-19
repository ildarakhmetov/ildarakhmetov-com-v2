---
layout: blog-post.vto
title: Goldratt, not Stroustrup
date: 2026-02-19 14:00:00
description: What I do at 5am is not coding -- it's management. Why Toyota Way principles
  from the 1970s map almost perfectly to managing AI agents in 2026.
tags:
- post
- management
- ai-agents
- leadership
categories: management
url: /blog/2026/goldratt-not-stroustrup/
thumbnail: assets/img/blog/2026/toyota-book.png
---

> This post is an experiment. I want to see, what happens if I write the whole thing myself. No AI. 
> 
> Both my parents wrote fiction and have published books. They did not need ChatGPT to write for them. 
> 
> I used to write, and I know the struggle, and the fear of an empty page, and the state of flow... I realized that I don't want to lose that.
> 
> So, this is me writing.

## I am not coding anymore

My coding time normally starts at 5am. I open my Framework laptop that runs Fedora Linux. I start Cursor. I code.

But well. Am I actually **coding**? 

I am building MyNextProject.dev from scratch for a few months now, it now has 7 services, a few kilolines of code each. All but one are TypeScript codebases. And (I even gave a talk about it recently), I don't really know TypeScript. Yes, I know enough of programming to understand what the agents give me; I can detect bullshit and push back. But no, I don't read every single line of code. And, with very few very rare exceptions, I don't write code anymore.

So, my precious early morning "coding hours." What are they, actually, if I don't code? 

Let's see what I actually do:

1. I write specs
2. I review what agents write
3. I guide agents
4. I unblock them
5. I help them coordinate and share context

I realized that what I do in the mornings, is not coding. It's **management.**

## Why do I need Linear as a solo builder?

Early on, I migrated a bunch of disjointed Markdown files (did you know that Claude *loves* writing Markdown files?) to Linear. I've been tracking my progress in Linear for the last few months, and sometimes, I wonder if it's redundant. I am the only developer -- why do I even need a project management tool? *Who* do I manage?

*I manage agents. And I need a project management tool for that.*

I need to implement a feature that spans across 2 services. What is my process?

There are three Cursor sessions that coordinate via Linear.

- **`systems-docs`:** I am planning this feature. <...>. Create two Linear ticket, one for first-service, another for second-service`.
- **`first-service`:** Consider Linear ticket #123. Let's plan work here. See a related ticket for second-service. Update it with the specific API contracts.
- **`second-service`:** Consider Linear ticket #124. Make sure you understand the context. If you need to know anything from the developers of first-service, let me know, comment on the ticket, and they'll respond.

You see?

My agents communicate via Linear tickets, and I'm there to help them establish these lines of communication. 

I am sure my way of managing agents is not the best one. Please share any better ways you know, I'm eager to learn. But my point is clear: 

*If I were to manage human junior developers, I would do pretty much the same thing.*

## Do agents need a leader, or a manager?

A few weeks ago, a [blog post by Addy Osmani](https://addyosmani.com/blog/coding-agents-manager/) landed in my inbox. Addy's message was that "your agents need a manager."

We also know that the line between *management* and *leadership* is blurry. Let me explain how I understand the difference.

Imagine you run a burger joint. 

*Management* is making sure your burger joint works just fine while you're trekking in Nepal. It's about *processes*.

*Leadership* is helping folks who flip burgers become their better selves. It's about *people*.

In business literature, leadership is increasingly seen as superior. So, my initial, intuitive reaction to Addy's post was that what your agents need is a *leader,* not just a manager. 

I wanted to find an existing leadership theory that would prove that. I looked at a few, including Maxwell's leadership laws -- and I realized that none of the laws actually fit. Agents are inherently not humans, and applying principles of leadership actually shows it very clearly.

So, I pivoted to management theory, and very quickly landed on **Toyota Way**, a book that I actually used to recommend to my University of Alberta capstone students. I opened the book, and started looking at the 14 principles one by one. Surprise:

*Principles from the 1970s map almost perfectly to managing AI agents in 2026.*

## Toyota principles, applied

Here are the 14 principles: [https://en.wikipedia.org/wiki/The_Toyota_Way](https://en.wikipedia.org/wiki/The_Toyota_Way)

They're about managing a factory. But take some time to look at the principles, and you will see that almost every one of them apply directly to managing AI agents.

We are not reinventing the wheel. Management theory solved this all for us 50 years ago.

### Toyota Principle #5

> Build a culture of stopping to fix problems, to get quality right the first time. Quality takes precedence. Any employee can stop the process to signal a quality issue.

At Toyota factories, there is a cord, called *Andon,* lined all the way along the conveyor belt. It looks pretty much like a cord you use in a North American bus to request a stop.

Any worker can pull the cord at any moment, and stop the whole Toyota conveyor belt. If a worker sees that something is wrong, they pull the cord to fix the problem immediately.

When you manage AI agents, you are the Andon cord. If the agent hallucinates, you pull the cord and stop the belt. Code review is your quality gate.

### Toyota Principle #6

> Standardized tasks and processes are the foundation for continuous improvement and employee empowerment.

Your prompt is the SOP ("standard operating procedure"). If your prompt is vague, the output will be unpredictable. Quoting Addy Osmani, "write a brief, not a vibe."

### Toyota Principle #7

> Use visual control so no problems are hidden.

This is your Kanban board (invented by guess who?) that applies so beautifully to software engineering. We've been happily using Kanban for years, and the only difference is that now, our Trello / Linear / GitHub Projects team includes not only humans, but agents.

### Toyota Principle #14

> Become a learning organization through relentless reflection and continuous improvement.

We are embracing this principle, as new tools and techniques are being invented every day. 

We know that agents "forget" anything that is not currently in the context window. That's nothing new for a Toyota conveyor belt. An efficient factory would never rely on a specific worker's unique knowledge.

A factory has documented processes, quality standards, onboarding instructions. 

Your agents have CLAUDE.md, Cursor rules, skills, hooks and Context7.

## But here's what Toyota can't solve

A few weeks ago, I worked with a team of student interns. 

We had our first meeting, and we needed to whiteboard a new module design and how it would fit the overall system architecture. To be honest, I had the architecture pretty much designed in my head, and I was driving the whiteboard session. 

But at some point, a student said "no, this is wrong." And he was right. A sycophantic AI agent would likely say: "Great idea! Let's implement it immediately!" A human junior developer noticed the bullshit and pushed back. 

So, here is the trillion dollar question.

*When do you hire a junior human developer, if agents are "free"?*

My three hiring criteria:

1. To be managers themselves. I can manage a bunch of agents, but I can not manage 100 of them. Jeff Bezos's "two pizza rule" applies perfectly here. I need junior devs to be good managers.
2. To bring what AI can't. Just like in the whiteboarding story above. Models are great in thinking, but they converge on median, safe, standard solutions. Humans can be unique outliers -- and we can't really move forward without their weird ideas.
3. To understand the humans we serve. We create software for humans, and we need to "go and see" (Genchi Genbutsu, as Toyota puts it).

## What does this mean for junior devs?

In the good old days, a junior dev would be "just coding" for maybe 5 years, and then, would be offered a promotion to become a manager. There are some great books (like *The Manager's Path* by Camille Fournier) that reflect well on this decision point between two paths: individual contributor or manager.

It's all different in 2026.

*You are a manager today.*

This adds a new, very important layer, to what junior devs should learn.

Your new textbooks are not about programming language syntax. They're about management theory: "The Goal," "Toyota Way." 

Goldratt, not Stroustrup.

<div class="flex flex-wrap gap-4">
  <a href="/assets/img/blog/2026/thegoal.png" target="_blank" rel="noopener noreferrer" class="block">
    <img
      src="/assets/img/blog/2026/thegoal.png"
      alt="The Goal by Eliyahu M. Goldratt and Jeff Cox"
      loading="lazy"
      decoding="async"
      transform-images="avif webp jpg 220 440"
      sizes="220px"
      class="w-[220px] max-w-full h-auto border-2 border-black shadow-neo hover:shadow-none transition-all"
    />
  </a>
  <a href="/assets/img/blog/2026/toyota-book.png" target="_blank" rel="noopener noreferrer" class="block">
    <img
      src="/assets/img/blog/2026/toyota-book.png"
      alt="The Toyota Way by Jeffrey K. Liker"
      loading="lazy"
      decoding="async"
      transform-images="avif webp jpg 220 440"
      sizes="220px"
      class="w-[220px] max-w-full h-auto border-2 border-black shadow-neo hover:shadow-none transition-all"
    />
  </a>
</div>
