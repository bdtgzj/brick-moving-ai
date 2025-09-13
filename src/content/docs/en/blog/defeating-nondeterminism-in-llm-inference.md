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
<svg width="" height="" viewBox="0 0 600 250" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    text { font-family: &apos;GT America&apos;; }
  </style>
  <rect width="600" height="250" fill="#F5F5F5"/>
  <g clip-path="url(#nd_clip0_249_8276-nondeterministic-svg)">
    <rect width="600" height="250" fill="white"/>
    <g filter="url(#nd_filter0_f_249_8276-nondeterministic-svg)">
      <rect x="252" y="6" width="222" height="238" rx="4" fill="#FAF9D3"/>
    </g>
    <g filter="url(#nd_filter1_f_249_8276-nondeterministic-svg)">
      <rect x="9" y="153" width="247" height="91" rx="4" fill="#FAF9D3"/>
    </g>
    <g filter="url(#nd_filter2_f_249_8276-nondeterministic-svg)">
      <rect x="280" y="53" width="166" height="163" rx="4" fill="#E3EEB0"/>
    </g>
    <g filter="url(#nd_filter3_d_249_8276-nondeterministic-svg)">
      <rect x="322" y="95" width="82" height="82" rx="4" fill="white" shape-rendering="crispEdges"/>
      <rect x="321.5" y="94.5" width="83" height="83" rx="4.5" stroke="black" stroke-opacity="0.2" shape-rendering="crispEdges"/>
      <text fill="#393939" xml:space="preserve" style="white-space: pre" font-family="GT America" font-size="15" letter-spacing="0em"><tspan x="342" y="141.565">Model</tspan></text>
    </g>
    <text fill="#5A850C" xml:space="preserve" style="white-space: pre" font-family="GT America" font-size="15" letter-spacing="0em"><tspan x="290" y="74.065">Deterministic</tspan></text>
    <text fill="#9C960A" xml:space="preserve" style="white-space: pre" font-family="GT America" font-size="15" letter-spacing="0em"><tspan x="262" y="27.065">Nondeterministic</tspan></text>
    <g filter="url(#nd_filter4_d_249_8276-nondeterministic-svg)">
      <rect x="78" y="56" width="115" height="35" rx="4" fill="white" shape-rendering="crispEdges"/>
      <rect x="77.5" y="55.5" width="116" height="36" rx="4.5" stroke="black" stroke-opacity="0.2" shape-rendering="crispEdges"/>
      <text fill="#393939" xml:space="preserve" style="white-space: pre" font-family="GT America" font-size="15" letter-spacing="0em"><tspan x="88" y="79.065">User requests</tspan></text>
    </g>
    <g filter="url(#nd_filter5_d_249_8276-nondeterministic-svg)">
      <rect x="37" y="181" width="156" height="35" rx="4" fill="white" shape-rendering="crispEdges"/>
      <rect x="36.5" y="180.5" width="157" height="36" rx="4.5" stroke="black" stroke-opacity="0.2" shape-rendering="crispEdges"/>
      <text fill="#393939" xml:space="preserve" style="white-space: pre" font-family="GT America" font-size="15" letter-spacing="0em"><tspan x="47" y="204.065">Other user requests</tspan></text>
    </g>
    <g filter="url(#nd_filter6_d_249_8276-nondeterministic-svg)">
      <rect x="517" y="119" width="69" height="35" rx="4" fill="white" shape-rendering="crispEdges"/>
      <rect x="516.5" y="118.5" width="70" height="36" rx="4.5" stroke="black" stroke-opacity="0.2" shape-rendering="crispEdges"/>
      <text fill="#393939" xml:space="preserve" style="white-space: pre" font-family="GT America" font-size="15" letter-spacing="0em"><tspan x="527" y="142.065">Output</tspan></text>
    </g>
    <path d="M507.354 136.354C507.549 136.158 507.549 135.842 507.354 135.646L504.172 132.464C503.976 132.269 503.66 132.269 503.464 132.464C503.269 132.66 503.269 132.976 503.464 133.172L506.293 136L503.464 138.828C503.269 139.024 503.269 139.34 503.464 139.536C503.66 139.731 503.976 139.731 504.172 139.536L507.354 136.354ZM413 136V136.5H507V136V135.5H413V136Z" fill="black" fill-opacity="0.5"/>
    <path d="M218.54 73.5137C224.088 73.7948 228.5 78.3821 228.5 84V126C228.5 131.247 232.753 135.5 238 135.5H310.793L308.465 133.172C308.27 132.977 308.27 132.66 308.465 132.465C308.66 132.27 308.977 132.27 309.172 132.465L312.354 135.646C312.549 135.842 312.549 136.158 312.354 136.354L309.172 139.535C308.977 139.73 308.66 139.73 308.465 139.535C308.27 139.34 308.27 139.023 308.465 138.828L310.793 136.5H238C232.753 136.5 228.5 140.753 228.5 146V189.5C228.5 195.299 223.799 200 218 200H203.5V199H218C223.247 199 227.5 194.747 227.5 189.5V146C227.5 141.319 230.563 137.355 234.794 136C230.563 134.645 227.5 130.681 227.5 126V84C227.5 78.9174 223.509 74.7673 218.489 74.5127L218 74.5H203V73.5H218L218.54 73.5137Z" fill="black" fill-opacity="0.5"/>
  </g>
  <defs>
    <filter id="nd_filter0_f_249_8276-nondeterministic-svg" x="244" y="-2" width="238" height="254" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feGaussianBlur stdDeviation="4" result="nd_effect1_foregroundBlur_249_8276"/>
    </filter>
    <filter id="nd_filter1_f_249_8276-nondeterministic-svg" x="1" y="145" width="263" height="107" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feGaussianBlur stdDeviation="4" result="nd_effect2_foregroundBlur_249_8276"/>
    </filter>
    <filter id="nd_filter2_f_249_8276-nondeterministic-svg" x="272" y="45" width="182" height="179" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feGaussianBlur stdDeviation="4" result="nd_effect3_foregroundBlur_249_8276"/>
    </filter>
    <filter id="nd_filter3_d_249_8276-nondeterministic-svg" x="317" y="92" width="92" height="92" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="2"/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="nd_effect1_dropShadow_249_8276"/>
      <feBlend mode="normal" in="SourceGraphic" in2="nd_effect1_dropShadow_249_8276" result="shape"/>
    </filter>
    <filter id="nd_filter4_d_249_8276-nondeterministic-svg" x="73" y="53" width="125" height="45" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="2"/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="nd_effect2_dropShadow_249_8276"/>
      <feBlend mode="normal" in="SourceGraphic" in2="nd_effect2_dropShadow_249_8276" result="shape"/>
    </filter>
    <filter id="nd_filter5_d_249_8276-nondeterministic-svg" x="32" y="178" width="166" height="45" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="2"/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="nd_effect3_dropShadow_249_8276"/>
      <feBlend mode="normal" in="SourceGraphic" in2="nd_effect3_dropShadow_249_8276" result="shape"/>
    </filter>
    <filter id="nd_filter6_d_249_8276-nondeterministic-svg" x="512" y="116" width="79" height="45" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="2"/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="nd_effect4_dropShadow_249_8276"/>
      <feBlend mode="normal" in="SourceGraphic" in2="nd_effect4_dropShadow_249_8276" result="shape"/>
    </filter>
    <clipPath id="nd_clip0_249_8276-nondeterministic-svg">
      <rect width="600" height="250" fill="white"/>
    </clipPath>
  </defs>
</svg>

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