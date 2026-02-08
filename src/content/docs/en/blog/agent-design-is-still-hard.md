---
title: Agent Design is Still Hard
date: 2025-11-21
description: The essence of Agent design is not a simple loop, but the ultimate balance between model differences, explicit cache control, and reinforcement information. In this field, overly generic SDKs often become shackles to flexibility.
authors:
  - name: Armin Ronacher (alias mitsuhiko)
    url: https://lucumr.pocoo.org/about/
tags:
    - AI Agent
---

#### Author
Armin Ronacher is a renowned open-source software engineer, the creator of the Flask web framework, Jinja2 templating engine, and Click CLI tool. His works define the paradigm of simplicity in modern Python development and have had a profound impact on the global open-source ecosystem.

#### Overview
The essence of Agent design is not a simple loop, but the ultimate balance between model differences, explicit cache control, and reinforcement information. In this field, overly generic SDKs often become shackles to flexibility.

![Agent design is still hard](../../../../assets/img/agent-design-is-still-hard.png)

<!-- excerpt -->
---

## I. Summary

This article provides an in-depth summary of the author's engineering practices and lessons learned while building autonomous Agents. The author points out that although the core logic of an Agent seems like a simple loop, in practice, generic SDK abstractions often struggle to handle the subtle differences between various models. By emphasizing explicit cache management, injecting reinforcement information into the loop, implementing state sharing via a virtual file system, and fine-grained control over output tools, the author reveals the engineering complexities that must be overcome to build high-performance Agents. The author candidly states that testing and evaluation remain the industry's greatest pain point.

---

## II. Detailed Explanation

1.  **Rethinking SDK Choices:**
    The author abandoned high-level abstraction SDKs like Vercel AI and reverted to using raw vendor SDKs (e.g., from Anthropic/OpenAI). The reason is that significant differences exist between models regarding cache control, reinforcement needs, and tool prompting. Generic messaging formats (like those attempted by Vercel) can corrupt history or cause errors when handling specific model features (e.g., Anthropic's search tools).

2.  **Shifting to Explicit Cache Management:**
    The author transitioned from distaste to advocacy for Anthropic's "manual cache checkpoint" model. Explicit caching makes cost and utilization predictable and enables techniques like "Conversation Splitting" and "Context Editing." By setting static cache points after the system prompt and in the early conversation stages, and placing dynamic information (like the current time) in later messages, cache invalidation can be effectively avoided.

3.  **Injecting "Reinforcement Information" into the Loop:**
    After an Agent runs a tool, it should not only receive the tool's data but also real-time "reinforcement information" (e.g., task objective reminders, error correction hints, or backend state changes). One can even introduce an "Echo Tool," allowing the Agent to organize its own to-do list and feed it back to itself, ensuring long-chain tasks stay on track.

4.  **Failure Isolation and Context Editing:**
    To prevent execution failures from polluting the global context, it's recommended to delegate complex tasks to sub-agents for iteration, reporting only successful results or concise failure summaries back to the main Agent. While "Context Editing" can save tokens and clear useless attempts, its cost is cache destruction, requiring a trade-off analysis.

5.  **State Sharing Centered on a File System:**
    Agents should not have "dead-end tools." By constructing a virtual file system as a shared layer, different tools (e.g., code execution, reasoning, image generation) can read from and write to the same paths. This solves the collaboration problem where a sub-task's output cannot be utilized by subsequent tools.

6.  **The Special Dilemma of Output Tools:**
    The author uses specialized "output tools" (e.g., sending emails) rather than simple text replies for human communication. However, practice shows that models struggle to control tone and quality when calling tools, and sometimes skip tool calls altogether. The current countermeasure is monitoring the call state and injecting reinforcement messages just before the loop ends to force output.

7.  **Pragmatic Model Selection Strategy:**
    Anthropic's Haiku and Sonnet remain the strongest tool-calling models currently, offering better cost efficiency compared to models with lower per-token costs but weaker logic. Gemini 2.5 excels at processing long documents, PDFs, and image extraction (bypassing security filters).

8.  **Engineering Pain Point: Testing and Evaluation (Evals):**
    The autonomy of Agents makes them impossible to test within external systems like simple prompts. Currently, there is a lack of satisfactory evaluation solutions based on observable data or automated runs, which has become a major obstacle to Agent engineering.

---

## III. Questions

1.  **Regarding Abstraction Layers:** As Agent technology matures, is it possible that a future "standard abstraction" will emerge—one that preserves model-specific features while providing sufficient engineering convenience—or is Agent development destined to be highly customized?

2.  **Regarding Caching and Cost:** In the pursuit of efficiency through "Context Editing" (reducing token buildup) while maintaining "Explicit Caching" (lowering compute overhead), does an automated optimal balance point exist?

3.  **Regarding Human-Agent Interaction:** If an Agent's internal thought process is decoupled from its final output tools, how can we establish a mechanism that allows users to trust the Agent's decision path without being overwhelmed by the vast number of intermediate steps?

Original:[Agent Design Is Still Hard](https://lucumr.pocoo.org/2025/11/21/agents-are-hard/)