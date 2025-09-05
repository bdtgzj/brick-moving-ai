---
title: AI 网络爬虫正在摧毁网站，因为它们对所有内容有着无休止的贪婪
date: 2025-08-29
excerpt: AI 爬虫因对内容的渴求而正在摧毁网站
description: AI 爬虫因对内容的渴求而正在摧毁网站
authors:
  - name: 史蒂文·J·沃恩-尼科尔斯 Steven J. Vaughan-Nichols
    url: https://www.theregister.com/Author/Steven-J-Vaughan-Nichols
tags:
  - AI Crawler
---

AI 爬虫因对内容的渴求而正在摧毁网站

但“解药”可能会毁掉整个网络……
---------------------------------

随着 AI 的兴起，AI 网络爬虫正在像采矿一样无休止地掠夺网络内容，用来喂养它们的大语言模型（LLM）工厂。它们占了多少流量？根据主要的内容分发网络（CDN）巨头 [Cloudflare](https://www.cloudflare.com/) 的统计，[如今全球 30% 的网络流量来自机器人。](https://blog.cloudflare.com/from-googlebot-to-gptbot-whos-crawling-your-site-in-2025/) 领跑并快速增长的？正是 AI 机器人。  

云服务公司 [Fastly](https://www.fastly.com/) 也持相同观点。它报告称，[所有 AI 机器人流量的 80% 来自 AI 数据抓取机器人](https://www.theregister.com/2025/08/21/ai_crawler_traffic/)。那么你可能会问：“这有什么问题？自从 1993 年 [World Wide Web Wanderer](https://en.wikipedia.org/wiki/World_Wide_Web_Wanderer) 出现以来，网络爬虫不就一直存在吗？”是的，确实如此。但任何运营过网站的人都清楚，旧式爬虫和今天的 AI 爬虫之间有着巨大的差异。新型 AI 爬虫是网站杀手。  

Fastly 警告称，它们正在导致“性能下降、服务中断以及运营成本上升”。为什么？因为它们会在几分钟内对网站造成高达正常水平十倍甚至二十倍的流量冲击。  

此外，AI 爬虫比标准爬虫要激进得多。正如网站托管公司 [InMotionhosting](https://www.inmotionhosting.com/) 所指出的，它们往往会[无视抓取延迟或带宽节省规则](https://www.inmotionhosting.com/blog/ai-crawlers-slowing-down-your-website/)，提取整页文本，有时甚至尝试跟随动态链接或脚本。  

结果是什么？如果你的网站使用的是共享服务器（许多小企业都是如此），即使你的站点没有被直接抓取，其他同一硬件、同一网络管道上的网站可能正遭受打击。这意味着，即使 AI 爬虫没有袭击你的网站，你的网站性能也会严重下降。  

像我自己运营的小站 [Practical Tech](https://practical-tech.com/)，经常会被冲击到直接宕机。感谢 [Cloudflare 的分布式拒绝服务（DDoS）防护](https://www.cloudflare.com/ddos/)，我的微型网站能抵挡住 DDoS 攻击。但 AI 机器人的攻击——没错，它们就是攻击——却难以抵御。  

即便是大型网站也感受到了压力。为了应对流量负载，它们必须增加处理器、内存和网络资源。否则会怎样？根据大多数网站托管公司的数据，如果一个网站加载时间超过三秒，超过一半的访问者会直接离开。超过这一门槛，每增加一秒，跳出率就会大幅上升。  

因此，当 AI 搜索机器人（Meta 占 52% 的 AI 搜索流量，Google 占 23%，OpenAI 占 20%）一次性向网站倾泻高达 30 Tb 的流量时，即便是最大型的公司网站性能也会受到损害。  

如果这些流量能让我变现，那还好说。但事实并非如此。过去，当搜索引擎索引爬虫 Googlebot 来访时，我还能期待我的文章能登上某个搜索结果的第一页，让人们访问我的网站，阅读文章，而在每一百次访问中，总有两三次会有人点击广告，从而让我获得一点收入。或者如果是一个商业网站，我可能会卖出一些产品或达成一笔生意。  

AI 搜索机器人呢？完全不是这样。AI 爬虫不会把用户引导回原始来源。它们只是蹂躏我们的网站，却什么也不回馈。我们只能思考在 AI 驱动的网络世界里，该如何谋生。  

当然，我们可以尝试用登录、付费墙、验证码挑战以及复杂的反机器人技术来抵挡它们。你知道 AI 擅长什么吗？那就是绕过这些防护墙。  

至于 robots.txt 文件，这种传统的阻止爬虫的方式？许多——甚至大多数？——AI 爬虫直接无视它们。  

例如，[Cloudflare 指控 Perplexity 无视 robots.txt 文件](https://www.theregister.com/2025/08/04/perplexity_ai_crawlers_accused_data_raids/)。而 [Perplexity 则强烈否认这一指控](https://www.zdnet.com/article/perplexity-says-cloudflares-accusations-of-stealth-ai-scraping-are-based-on-embarrassing-errors/)。至于我？我只知道我看到各家公司 AI 机器人一波接一波地来掠夺我的网站。  

目前有人正尝试用 [llms.txt](https://llmstxt.org/) 文件来补充 robots.txt。这是一种拟议中的标准，用来为 LLM 提供友好的内容访问方式，同时不影响网站性能。但并不是所有人都对此方法感到满意，它最终可能也无疾而终。  

与此同时，为了对抗过度爬取，一些基础设施服务商（如 [Cloudflare，现已提供默认的机器人拦截服务](https://www.theregister.com/2025/07/01/cloudflare_creates_ai_crawler_toll/)）来阻止 AI 爬虫，并提供机制来阻止 AI 公司访问他们的数据。其他程序，比如流行的开源免费工具 [Anubis AI 爬虫拦截器](https://anubis.techaro.lol/)，只是尝试将它们的访问速度降到“爬行”的程度。  

在企业与网站和 AI 公司之间的这场军备竞赛中，最终可能会达成某种平衡。但遗憾的是，网络将比以往更加分裂。网站会进一步限制或商业化访问。重要而准确的信息将被隔离在墙后，甚至彻底消失。  

还记得那个开放的网络吗？我记得。我可以想象我们的孩子们使用的互联网，几乎所有内容都必须付费才能访问。我想没有人希望看到一个“巴尔干化”的互联网，但我担心，这正是我们正在走的方向。  

原文:
[AI web crawlers are destroying websites in their never-ending hunger for any and all content](https://www.theregister.com/2025/08/29/ai_web_crawlers_are_destroying/)