---
title: Continuous Learning for Agents
date: 2025-10-24
description: A true Agent must possess efficient continual learning capabilities, meaning it must go beyond the current "Reasoner" model that relies solely on sparse rewards and context retrieval. Instead, it should efficiently learn World Models from rich environmental feedback (Observation) and continuously evolve.
authors:
    - name: Bojie Li
      url: https://01.me/
tags:
    - Agent Learning
---

##### Overview
A true Agent must possess efficient **continual learning** capabilities, meaning it must go beyond the current "Reasoner" model that relies solely on **sparse rewards** and **context retrieval**. Instead, it should efficiently learn **World Models** from rich **environmental feedback (Observation)** and continuously evolve.

##### 1. What is Continual Learning in Agents?
**Continual learning ability** is the core differentiator between a "true Agent" and a "Reasoner." It is not just about larger models, but refers to the capability of an Agent, as a system, to interact, adapt, and evolve over the long term in the real world.

##### 2. Why Do Agents Need Continual Learning?
*   **The Large World Hypothesis**: The article agrees with Richard Sutton's view that the real world is a "large world." No matter how extensive a model's pre-trained knowledge base is, it must continually learn when facing specific, non-public scenarios (such as company-specific norms, industry tacit knowledge, or individual work habits).
*   **Fatal Flaws in Current Methods**: Sutton points out that current Reinforcement Learning (RL) methods (like PPO) have extremely low sample efficiency and are fatally limited to learning only from **sparse rewards**, unable to learn from the environment's direct feedback (**observation**).

##### 3. How Do Current Agents Achieve Continual Learning?
*   **In-Context Learning**: This is currently one of the primary methods, but the article considers this a "misconception." The essence of Context is more like "retrieval" (RAG) rather than "summarization" or "reasoning." Knowledge is not distilled; the Agent merely inefficiently scans and retrieves raw information repeatedly within a massive context, leading to inefficiency and a high error rate.
*   **Model-Free Reinforcement Learning**: As mentioned above, this method cannot utilize explicit feedback from the environment (e.g., a customer service agent saying, "I need the last four digits of your credit card"). The Agent doesn't know *"what the correct action is"* and can only succeed accidentally through massive trial-and-error, which is unacceptable for real-world tasks.

##### 4. How Can Future Agents Achieve Better Continual Learning?
*   **Technical Level: Transition from Model-Free to Model-Based**
    *   Future Agents need **dual learning**: simultaneously learning "Policy Learning" (selecting actions) and "World Model Learning" (predicting outcomes).
    *   This enables the Agent to learn directly from environmental feedback (Observation), not just rely on sparse rewards, forming an efficient learning loop of "prediction-action-evaluation."
*   **Three Synergistic Mechanisms**:
    1.  **Parametric Learning**: Learning directly from environmental feedback by updating the Policy and World Model, improving sample efficiency.
    2.  **In-Context Learning (Improved Version)**: Moving beyond simply stacking information to **enforcing compression** (e.g., using linear attention or cross-modal encoding), forcing the model to distill actionable knowledge.
    3.  **Externalized Memory**: Using additional computational resources to summarize and compress knowledge, storing it in a knowledge base, and encapsulating repetitive processes into reusable tools.
*   **Architectural Level**: Transitioning from the ReAct loop to an **Event-Driven** architecture, enabling real-time interaction—listening, thinking, and responding simultaneously.
*   **Model Level**: Adopting Karpathy's concept of a **"Cognitive Core"**—using smaller models (e.g., 1B-3B parameters) as the core. The "poor memory" characteristic of small models forces them to learn general patterns rather than rote memorization, leading to better generalization.

##### 5. How Does Agent Continual Learning Differ from Human Continual Learning?
*   **Utilization of Environmental Feedback**:
    *   **Humans**: When told "credit card information is needed," they immediately remember this rule and apply it next time.
    *   **Current Agents**: Can only perceive "task failure" (reward=0) but cannot understand that the reason for failure came from the customer service feedback, thus failing to learn from the environment.
*   **Memory and Summarization**:
    *   **Humans**: Have poor precise memory, but this forces humans to "extract key knowledge and summarize/memorize it in a structured way." (Karpathy's view: poor memory is a Feature, not a Bug).
    *   **Current Agents**: Rely on Long Context, tending to "recite" all raw data rather than automatically distilling and summarizing patterns.
*   **Source of Diversity**:
    *   **Humans**: Naturally gain diversity from "Noise" and "Entropy" in the external environment.
    *   **Current Agents**: Currently require artificially added Entropy (e.g., providing different reference examples each time) to increase output diversity.

<!-- excerpt -->

---

Body
------------------------
Original: [Continuous Learning for Agents: Why a Reasoner Is Not a Real Agent?](https://01.me/2025/10/agent-continual-learning/)