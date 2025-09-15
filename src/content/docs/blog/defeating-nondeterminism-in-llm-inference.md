---
title: 攻克 LLM 推理中的非确定性
date: 2025-09-10
description: LLM 推理的非确定性是一个系统性问题。它源于为追求极致性能而设计的、对批次大小敏感的底层计算库，与现实世界中动态变化的服务器负载之间的矛盾。解决方案是存在的，即强制使用批次不变的计算内核，但这通常需要以牺牲部分性能为代价。
authors:
    - name: Horace He and Thinking Machines Lab
      url: https://thinkingmachines.ai/
tags:
    - LLM Inference
---

##### 概览
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

LLM 推理的非确定性是一个系统性问题。它源于为追求极致性能而设计的、对批次大小敏感的底层计算库，与现实世界中动态变化的服务器负载之间的矛盾。解决方案是存在的，即强制使用批次不变的计算内核，但这通常需要以牺牲部分性能为代价。

##### 核心论点
LLM（大语言模型）推理结果的不可复现性（非确定性），并非像通常认为的那样，是由于 GPU 并行计算的随机性与浮点数计算误差的简单结合。**真正的罪魁祸首是：核心计算操作（Kernel）缺乏“批次不变性”（Batch Invariance），再结合服务器上不断变化的负载（即变化的批处理大小 Batch Size）**。

##### 主要内容解析
1. **普遍的误解 vs. 事实**
    - **普遍误解（“并发+浮点数”假说）**：人们普遍认为，由于浮点数加法不满足结合律（即 `(a+b)+c ≠ a+(b+c)`），而 GPU 又以不确定的顺序并行执行这些加法，导致了结果的随机性。
    - **文章指出的事实**：这个假说并不完全。虽然浮点数非结合律是产生数值差异的根源，但 LLM 推理（前向传播）中使用的绝大多数计算核心（如矩阵乘法）本身是 **“运行确定”** 的。即对于一个**固定批次**的输入，多次运行会得到完全相同的结果。

2. **真正的非确定性来源**
    - **缺乏“批次不变性”**：尽管单个计算核心是确定性的，但其计算结果会受到 **批处理大小（Batch Size）** 的影响。例如，对一个向量进行计算，当它被单独处理（batch size=1）与和其他上千个向量一起处理（batch size=1000）时，得到的数值结果会有微小的差异。这是因为为了优化不同批次大小下的性能，底层会采用不同的计算策略和指令，从而改变了浮点数的累加顺序。
    - **可变的服务器负载**：从用户的角度来看，他们发送的请求会被推理服务器与其他用户的请求动态地组合成一个批次进行处理。服务器的负载是实时变化的，这意味着用户的同一个请求，这次可能在一个大小为 8 的批次中处理，下次可能在一个大小为 128 的批次中处理。
    - **两者结合的结果**：一个缺乏“批次不变性”的计算核心，被应用在一个“批次大小不确定”的系统中，最终导致了用户感知的 **非确定性**。

##### 如何实现确定性推理（即实现“批次不变性”）
文章指出，要实现完全可复现的推理，必须让模型中的每一个计算环节都做到批次不变，主要涉及以下三个部分：

- **RMSNorm**：相对容易实现。只需固定使用一种并行化策略，即使在小批量时性能稍差，也要避免切换到会改变计算顺序的策略。
- **矩阵乘法（Matrix Multiplication）**：挑战更大。高性能的矩阵乘法库会根据输入尺寸选择不同的 Tensor Core 指令或并行策略（如 Split-K）。要实现确定性，必须强制使用同一种内核配置，这会牺牲在某些尺寸下的极致性能。
- **注意力机制（Attention）**：最复杂。不仅要对批次大小保持不变，还要对序列的处理方式（如分块处理 Prefill、使用 KV Cache 解码）保持不变。这意味着一个 token 在计算注意力时，无论其上下文（KV Cache）有多少，其内部的计算顺序都必须完全一致。

<!-- excerpt -->

---

正文
------------------------
原文: [Defeating Nondeterminism in LLM Inference](https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/)

评论
----------------------------------------------------------------
有点不同意见 模型能做到一个token都不偏差的重复。那就是走错路了 真正被固化的知识在重复输出时一定是会有细微差异的 这不是背诵滕王阁序，也不是进行函数展开 一个人的生平显然必须不可能用一个标准答案进行规范 这条路仅工程上有意义 对模型本身是极其有害的 这不是优化，是迫害 @Chinese_XU

如果批处理数量影响结果，那本地部署的模型可以通过设置同时处理数量来约束这种不确定性吗？就像说每次都只提一个问题。同样的问题提十次？有人验证过么？还是我压根理解错了。@galtzhu