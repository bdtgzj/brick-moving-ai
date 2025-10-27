---
title: Model behavior is determined by the dataset
date: 2023-06-10
description: The final behavior of a model is entirely determined by its training dataset, not by the model architecture, hyperparameters, or optimizer.
authors:
    - name: jbetker
      url: https://nonint.com/author/jbetker/
tags:
    - AI Data
---

##### Overview
The final behavior of a model is entirely determined by its training dataset, not by the model architecture, hyperparameters, or optimizer.

1.  **Models are "high-precision replicas" of the dataset**: During training, models not only learn the explicit knowledge within the dataset (like what a cat is) but also grasp the extremely subtle, often imperceptible, underlying statistical patterns in the data distribution (such as human photo-taking preferences and word usage habits).

2.  **Different architectures converge to the same point**: Given the same dataset and sufficient training, different model architectures (like diffusion models, ViTs, etc.) ultimately converge to the same point, producing nearly identical results.

3.  **Architecture and techniques are merely "means"**: All technical choices—model architecture, hyperparameters, optimizers—essentially serve as tools or methods to utilize computational power more efficiently, helping the model "approximate" and "fit" that one and only dataset.

When we refer to famous AI models like ChatGPT, Bard, or Claude, what we are essentially pointing to is **not their model weights or technical architecture, but the unique dataset behind them**. The name of a model is, in fact, a proxy for its dataset.

<!-- excerpt -->
---

Body
------------------------
I’ve been at OpenAI for almost a year now. In that time, I’ve trained a **lot** of generative models. More than anyone really has any right to train. As I’ve spent these hours observing the effects of tweaking various model configurations and hyperparameters, one thing that has struck me is the similarities in between all the training runs.

It’s becoming awfully clear to me that these models are truly approximating their datasets to an incredible degree. What that means is not only that they learn what it means to be a dog or a cat, but the interstitial frequencies between distributions that don’t matter, like what photos humans are likely to take or words humans commonly write down.

What this manifests as is – trained on the same dataset for long enough, pretty much every model with enough weights and training time converges to the same point. Sufficiently large diffusion conv-unets produce the same images as ViT generators. AR sampling produces the same images as diffusion.

This is a surprising observation! It implies that model behavior is not determined by architecture, hyperparameters, or optimizer choices. It’s determined by your dataset, nothing else. Everything else is a means to an end in efficiently delivery compute to approximating that dataset.

Then, when you refer to “Lambda”, “ChatGPT”, “Bard”, or “Claude” then, it’s not the model weights that you are referring to. It’s the dataset.

Original: [The “it” in AI models is the dataset](https://nonint.com/2023/06/10/the-it-in-ai-models-is-the-dataset/)