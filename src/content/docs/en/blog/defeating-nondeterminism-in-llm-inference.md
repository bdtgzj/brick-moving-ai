---
title: Defeating Nondeterminism in LLM Inference
date: 2025-09-10
description: The nondeterminism of LLM inference is a systemic problem. It originates from the conflict between underlying computational libraries—which are designed for maximum performance and are sensitive to batch size—and the dynamic server loads of the real world. A solution exists, which is to enforce the use of batch-invariant computational kernels, but this typically comes at the cost of sacrificing some performance.
authors:
    - name: Horace He and Thinking Machines Lab
      url: https://thinkingmachines.ai/
tags:
    - LLM Inference
---

##### Overview
The nondeterminism of LLM inference is a systemic problem. It originates from the conflict between underlying computational libraries—which are designed for maximum performance and are sensitive to batch size—and the dynamic server loads of the real world. A solution exists, which is to enforce the use of batch-invariant computational kernels, but this typically comes at the cost of sacrificing some performance.

##### Core Argument
The non-reproducibility (nondeterminism) of LLM (Large Language Model) inference results is not, as commonly believed, a simple combination of the randomness of GPU parallel computing and floating-point calculation errors. **The true culprits are: the lack of "Batch Invariance" in core computational operations (kernels), combined with the constantly changing load on the server (i.e., varying batch sizes)**.

##### Main Content Analysis
1.  **Common Misconception vs. The Facts**
    -   **Common Misconception ("Concurrency + Floating Point" Hypothesis)**: It is widely believed that because floating-point addition is non-associative (i.e., `(a+b)+c ≠ a+(b+c)`), and GPUs execute these additions in a non-deterministic parallel order, the results become random.
    -   **The Facts Pointed Out by the Article**: This hypothesis is incomplete. While floating-point non-associativity is the root cause of numerical differences, the vast majority of computational cores used in LLM inference (the forward pass), such as matrix multiplication, are themselves **"run-to-run deterministic."** That is, for a **fixed batch** of input, multiple runs will produce the exact same result.

2.  **The True Source of Nondeterminism**
    -   **Lack of "Batch Invariance"**: Although a single computational kernel is deterministic, its result is affected by the **batch size**. For example, when computing a vector, the numerical result will be slightly different when it is processed alone (batch size=1) versus with thousands of other vectors (batch size=1000). This is because, to optimize performance for different batch sizes, the underlying system uses different computational strategies and instructions, which in turn changes the accumulation order of floating-point numbers.
    -   **Variable Server Load**: From a user's perspective, their requests are dynamically grouped with other users' requests into a batch by the inference server. The server's load changes in real-time, meaning a user's same request might be processed in a batch of size 8 this time, and a batch of size 128 the next time.
    -   **The Result of the Combination**: A computational kernel that lacks "batch invariance" is applied in a system with "non-deterministic batch sizes," ultimately leading to the **nondeterminism** perceived by the user.

##### How to Achieve Deterministic Inference (i.e., Achieve "Batch Invariance")
The article points out that to achieve fully reproducible inference, every computational step in the model must be made batch-invariant, primarily involving these three parts:

-   **RMSNorm**: Relatively easy to implement. It only requires sticking to one parallelization strategy and avoiding switching to strategies that would change the order of operations, even if it means slightly worse performance on small batches.
-   **Matrix Multiplication**: More challenging. High-performance matrix multiplication libraries select different Tensor Core instructions or parallel strategies (like Split-K) based on input dimensions. To achieve determinism, one must enforce the use of a single kernel configuration, which sacrifices peak performance at certain dimensions.
-   **Attention Mechanism**: The most complex. It must be invariant not only to batch size but also to how sequences are processed (e.g., chunked prefill, decoding with a KV Cache). This means that when a token computes its attention, the internal order of operations must be identical regardless of how much context (KV Cache) it has.

<!-- excerpt -->

---

Body
------------------------
Original: [Defeating Nondeterminism in LLM Inference](https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/)