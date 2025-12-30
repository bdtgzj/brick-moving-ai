---
title: "Reflections on AI at the end of 2025"
date: 2025-12-20
description: By the end of 2025, Large Language Models have demonstrated reasoning and evolutionary capabilities surpassing the "stochastic parrot" through reinforcement learning and chain of thought; while proving that the current architecture is sufficient to lead to AGI, they have also shifted the core challenge of AI toward human existential safety.
authors:
    - name: antirez
      url: https://antirez.com/
tags:
    - AI 2025
---

##### Overview
Salvatore Sanfilippo, the creator of Redis, provides a profound analysis of the state of AI at the end of 2025. His core viewpoints can be summarized into the following five aspects:

##### 1. The "Verification and Dismissal" of Cognitive Capabilities
* **Shedding the "Stochastic Parrot" Label**: By 2025, the academic community finally reached a consensus, acknowledging that LLMs are not merely probabilistic prediction machines, but systems possessing internal representations of the meaning of prompts and their output content.
* **The Essence of Chain of Thought (CoT)**: CoT is viewed as a form of "internal search." By sampling within the representation space combined with Reinforcement Learning (RL), models can purposefully converge to useful answers by altering their own states.
##### 2. Evolutionary Drivers: From "Scale" to "Reinforcement Learning"
* **Breaking the Data Bottleneck**: Relying on Reinforcement Learning with "verifiable rewards," improvements in AI are no longer strictly limited by the quantity of human corpus data.
* **The Next Big Thing**: By continuously evolving in domains with clear reward signals, such as programming optimization, LLMs combined with RL will become the core driving force of AI development.
##### 3. The Reshaping of Programming Paradigms
* **Conversion of Skeptics**: Due to a significant increase in Return on Investment (ROI), even the most conservative programmers have begun to accept AI assistance.
* **Divergence in Collaboration Models**: The programming world has split into two camps: those who view AI as a "conversational colleague" and those who view it as an "independent coding agent."
##### 4. The Debate on the Path to AGI
* **Architectural Pluralism**: While some are searching for alternatives to Transformers (such as world models), the author believes that existing LLMs, acting as "differentiable reasoning machines," could potentially achieve AGI even without a paradigm revolution.
* **The Reversal of the ARC Test**: The ARC reasoning test, once thought to be insurmountable for LLMs, has now been conquered by optimized large models, validating the potential of existing architectures.
##### 5. Conclusion and the Ultimate Challenge
* **Architecture Unchanged, Perception Shifted**: The author emphasizes that the underlying architecture of LLMs has not changed because of CoT; what has changed is our perception of their capabilities.
* **Existential Crisis**: For the next 20 years, the most fundamental challenge in the field of AI is not technological breakthrough, but **how to avoid human extinction**.

<!-- excerpt -->

---

Body
------------------------
* For years, despite functional evidence and scientific hints accumulating, certain AI researchers continued to claim LLMs were stochastic parrots: probabilistic machines that would: 1. NOT have any representation about the meaning of the prompt. 2. NOT have any representation about what they were going to say. In 2025 finally almost everybody stopped saying so.

* Chain of thought is now a fundamental way to improve LLM output. But, what is CoT? Why it improves output? I believe it is two things: 1. Sampling in the model representations (that is, a form of internal search). After information and concepts relevant to the prompt topic is in the context window, the model can better reply. 2. But if you mix this to reinforcement learning, the model also learns to put one token after the other (each token will change the model state) in order to converge to some useful reply.

* The idea that scaling is limited to the number of tokens we have, is no longer true, because of reinforcement learning with verifiable rewards. We are still not at AlphaGo move 37 moment, but is this really impossible in the future? There are certain tasks, like improving a given program for speed, for instance, where in theory the model can continue to make progress with a very clear reward signal for a very long time. I believe improvements to RL applied to LLMs will be the next big thing in AI.

* Programmers resistance to AI assisted programming has lowered considerably. Even if LLMs make mistakes, the ability of LLMs to deliver useful code and hints improved to the point most skeptics started to use LLMs anyway: now the return on the investment is acceptable for many more folks. The programming world is still split among who uses LLMs as colleagues (for instance, all my interaction is via the web interface of Gemini, Claude, …), and who uses LLMs as independent coding agents.

* A few well known AI scientists believe that what happened with Transformers can happen again, and better, following different paths, and started to create teams, companies to investigate alternatives to Transformers and models with explicit symbolic representations or world models. I believe that LLMs are differentiable machine trained on a space able to approximate discrete reasoning steps, and it is not impossible they get us to AGI even without fundamentally new paradigms appearing. It is likely that AGI can be reached independently with many radically different architectures.

* There is who says chain of thought changed LLMs nature fundamentally, and this is why they, in the past, claimed LLMs were very limited, and now are changing their mind. They say, because of CoT, LLMs are now a different thing. They are lying. It is still the same architecture with the same next token target, and the CoT is created exactly like that, token after token.

* The ARC test today looks a lot less insurmountable than initially thought: there are small models optimized for the task at hand that perform decently well on ARC-AGI-1, and very large LLMs with extensive CoT achieving impressive results on ARC-AGI-2 with an architecture that, according to many folks, would not deliver such results. ARC, in some way, transitioned from being the anti-LLM test to a validation of LLMs.

* The fundamental challenge in AI for the next 20 years is avoiding extinction.

Original: [Reflections on AI at the end of 2025](https://antirez.com/news/157)