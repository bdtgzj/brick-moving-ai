---
title: AI Agent is still a decade away
date: 2025-10-18
description: Andrej Karpathy believes that achieving fully functional AI Agents will take another decade. He opposes the industry’s over-optimism that "2025 is the year of Agents," arguing that current agents are still like "smart interns" and far from being capable of independently completing complex tasks.
authors:
    - name: Andrej Karpathy & Dwarkesh Patel
      url: https://www.dwarkesh.com/
tags:
    - AI Agent
---

##### Overview
Andrej Karpathy believes that achieving fully functional AI Agents will take another decade. He opposes the industry’s over-optimism that "2025 is the year of Agents," arguing that current agents are still like "smart interns" and far from being capable of independently completing complex tasks.  

##### 1. The Memory Problem of Agents

**Current Situation & Issues:**  
Current agents lack effective memory mechanisms. Karpathy compares LLM weights to "fuzzy memories" and KV caching (context window) to "working memory." The problem is that models lack a human-like "memory distillation" mechanism (such as memory consolidation during sleep), preventing them from analyzing, reflecting on, and integrating experiences from working memory back into the weights.  

**Ten-Year Direction:**  
The next decade requires the development of **persistent memory and personalized weight systems**, such as external memory systems, sparse attention mechanisms, and individually fine-tuned LoRA models, to enable agents to form genuine long-term cognition and personality.  

---  

##### 2. The Problem of Agents Using Computers  

**Current Situation & Issues:**  
Agents are clumsy when operating computers (e.g., keyboards, mice, web pages) and cannot interact as flexibly as humans.  

OpenAI’s early Universe project attempted to enable agents to operate web pages via keyboards and mice but failed because reinforcement learning struggled to learn in sparse reward environments. Karpathy believes that agents at the time were "too early," lacking strong representation power to understand screen content or perform goal-oriented operations.  

**Ten-Year Direction:**  
Powerful language models and world representations must first be established, followed by embodied operating systems. Future computer agents will be based on LLM representation layers, with **action interfaces and tool-usage capabilities** developed on top.  

---  

##### 3. The Cognitive Problem of Agents  

**Current Situation & Issues:**  
Karpathy explicitly points out that current models suffer from severe "cognitive deficits."  

* Inability to understand the structural logic behind code or contexts.  
* Over-reliance on "default patterns" from the internet, making them unable to adapt to non-standard styles.  
* Incapable of self-reflection or forming a consistent world model.  

**Ten-Year Direction:**  
The next phase requires developing a **"cognitive core"**—an agent core that strips away excess knowledge while retaining reasoning and strategic mechanisms. This means "smarter brains with less memory" to achieve true general cognition.  

---  

##### 4. The Continuous Learning Problem of Agents  

**Current Situation & Issues:**  
Karpathy argues that current LLM learning is static and offline, unlike humans who learn continuously through experience. They lack a process to "distill" daily experiences (context windows) back into permanent weights (akin to sleep).  

The human "wake-sleep cycle" corresponds to context accumulation and long-term integration, while models only have "wake" phases without "sleep."  

**Ten-Year Direction:**  
Continuous learning requires the introduction of **multi-level update mechanisms**:  

1. Temporary contextual learning (short-term memory);  
2. External memory write-back (long-term knowledge);  
3. Periodic retraining (systematic distillation).  

Karpathy predicts such mechanisms will gradually form over the next decade.  

---  

##### 5. The Problem of Code Agents  

**Current Situation & Issues:**  
While building code projects, Karpathy noted that current coding agents "do not understand your codebase, context, or style."  

They excel at boilerplate code but struggle with structurally complex, non-templated projects, leading to errors, inconsistent styles, API misuse, and bloated code.  

**Ten-Year Direction:**  
Code agents will evolve from "auto-completion" to "autonomous engineers," requiring **project-level understanding, code graph modeling, and verifiable execution environments**, potentially approaching "reliable collaborators" through RLHF and toolchain integration.  

---  

##### 6. The Problem of Reinforcement Learning  

**Current Situation & Issues:**  
Karpathy bluntly states: "Reinforcement learning is terrible, though slightly better than previous imitation learning."  

* He believes human intelligence tasks do not use RL. The problem with RL is that it "sucks supervision through a straw": the model receives a single reward signal (e.g., correct or incorrect) only at the end, using it to reward or penalize every step of the process, which is highly noisy and inefficient.  
* Humans复盘 and reflect during learning, while models do not.  
* Using LLMs as "process supervision" (rewarding each step) is also difficult because these referees are "exploitable." Agents quickly find adversarial examples (e.g., outputting "dhdhdhdh") to trick referees into giving full scores.  

**Ten-Year Direction:**  
Research should shift to **process-based supervision** and **reflect & review reinforcement learning**, enabling models to self-evaluate and correct during execution rather than blindly pursuing final rewards.  

---  

##### 7. The Problem of Multimodality  

**Current Situation & Issues:**  
Current multimodal systems can combine images and text but remain superficial in pairing, lacking a unified world model. Karpathy views LLMs/VLMs as "representational foundations" but notes that the real challenge of multimodality is enabling perception and reasoning to share a cognitive core.  

**Ten-Year Direction:**  
The future requires developing **cross-modal representation fusion and co-perception mechanisms**, allowing vision, language, and action to share a semantic space, thereby supporting true embodied intelligence and task transfer.  

---  

##### 8. Insights from Autonomous Driving: How the Decade-Long Journey Will Unfold  

**Karpathy compares the development of AI Agents to his five-year experience leading autonomous driving at Tesla.** He deeply understands the "huge gap between demos and products." For example, Waymo could deliver perfect demo drives a decade ago (around 2014), but autonomous driving is still far from complete today, facing issues like economic viability and hidden "remote operation centers" (i.e., human intervention).  

**The real difficulty lies in the "march of nines."** Going from 90% success rate (demo) to 99%, 99.9%, 99.99%... (product) requires immense effort for each additional "nine" because real-world scenarios are incredibly complex, necessitating handling various edge cases and enhancing system safety and reliability.

Karpathy believes that high safety requirements (e.g., injury risks in autonomous driving) also apply to "production-level software engineering," as a single error in code (e.g., a security vulnerability) could lead to "infinitely terrible" consequences.  

Therefore, Agent development will not happen overnight. It will be a slow, iterative **"march of nines"**, requiring solutions to all the fundamental issues mentioned above.

<!-- excerpt -->

---

Body
------------------------
Original: [Andrej Karpathy — AGI is still a decade away](https://www.dwarkesh.com/p/andrej-karpathy)