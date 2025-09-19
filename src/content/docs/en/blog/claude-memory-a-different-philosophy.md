---
title: "Claude Memory: A Different Philosophy"
date: 2025-09-11
description: The two leading AI assistants, Claude and ChatGPT, have adopted completely opposite strategies in implementing their "memory" functions. This difference profoundly reflects their respective product positioning, target user bases, and design philosophies.
authors:
    - name: Shlok Khemani
      url: https://www.shloked.com/
tags:
    - LLM Memory
---

##### Overview
The two leading AI assistants, Claude and ChatGPT, have adopted completely opposite strategies in implementing their "memory" functions. This difference profoundly reflects their respective product positioning, target user bases, and design philosophies.

##### Claude's Memory System: An Explicit, Controllable Tool
Claude's memory function is designed as a tool that users actively invoke, rather than a continuously running background service. Its main characteristics are:

1.  **Blank Slate**: Each conversation starts from a clean state without preloading any user profiles or history.
2.  **Explicit Invocation**: The memory function only activates when users use explicit commands like "What did we discuss last time?"
3.  **Raw History Search**: It doesn't create AI-generated user summaries or compressed profiles, but instead recalls information by performing real-time searches through users' **raw chat history**.
4.  **Two Main Search Tools**:
    *   `conversation_search`: Searches through all historical records based on keywords or topics.
    *   `recent_chats`: Retrieves conversations based on time ranges (e.g., "the last 10 conversations" or "the last week of November last year").

##### ChatGPT's Memory System: An Implicit, Automatic Experience
In contrast to Claude, ChatGPT's memory function is designed for the mass consumer market, characterized by:

1.  **Always-On**: The memory function loads automatically without user intervention, providing instant personalized experiences.
2.  **User Profiling**: The system continuously learns user preferences and patterns to build detailed user profiles.
3.  **Pursuit of a "Magical" Experience**: The goal is to make the product feel intelligent, thoughtful, and seamless, so users don't need to think about how it works.

##### Philosophical and User Differences
This design divergence stems from the two companies' different market strategies:

*   **Claude Targets Professional Users**: Its user base consists mainly of technical professionals like developers and researchers. These users understand how LLMs work, **prefer precise control**, and accept the additional latency that comes with invoking memory. For them, memory is a powerful, predictable professional tool where privacy and controllability are crucial.

*   **ChatGPT Targets the Mass Market**: Its user base includes various ordinary consumers like students and parents. They want a product that works **out-of-the-box and is easy to use**, automatically remembering their information. This is a typical consumer tech strategy: first attract and retain massive users through a "magical" experience, then explore monetization models later.

##### Conclusion and Outlook
The author believes that the two giants taking completely opposite paths indicates that the design space for AI memory functions is extremely vast, with no single correct answer. The optimal solution depends on the product's target users and specific needs. Currently, this field is still in its early exploratory stages ("Cambrian explosion"), with major companies trying different approaches, far from establishing industry standards.

**Latest Update**: Shortly after the article was published, Anthropic (Claude's parent company) announced a **new memory feature** for its Team and Enterprise accounts that appears closer to ChatGPT's automatic profiling model. This indicates that the development and evolution of AI memory is progressing at an extremely rapid pace.

<!-- excerpt -->

---

Body
------------------------
Earlier this week, I dissected [ChatGPT's memory system](https://www.shloked.com/writing/chatgpt-memory-bitter-lesson). Since then, I've been doing the same for Claude and realized something remarkable: these two leading AI assistants have built completely opposite memory systems.

In this post, I'll start by breaking down exactly how Claude's memory works—what it stores and how it retrieves information. Then we'll get to the interesting stuff. Why these architectures diverge so dramatically, what that tells us about who uses each assistant and the philosophies driving each product's development, and just how vast the AI memory design space really is.

## How it works
Claude's memory system has two fundamental characteristics. First, it starts every conversation with a blank slate, without any preloaded user profiles or conversation history. Memory only activates when you explicitly invoke it. Second, Claude recalls by only referring to your raw conversation history. There are no AI-generated summaries or compressed profiles—just real-time searches through your actual past chats.

When Claude detects memory invocation through phrases like "what did we discuss about," "continue where we left off," or "remember when we talked about," it deploys two retrieval tools that work like web search or code execution—you see them activate in real-time and wait while Claude searches through your history. Once the search completes, Claude synthesizes the retrieved conversations to answer your question or continue the discussion.

### Conversation Search
The `conversation_search` tool helps with keyword and topic-based searches across your entire conversation history. When I asked "Hey, can you recall our past conversations about Chandni Chowk?" (a historic neighborhood in Delhi), Claude found 9 relevant conversations—from when I explored its founding by Princess Jahanara Begum in 1650 to my queries about the best galouti kebabs at Karim's and stuffed parathas at Paranthe Wali Gali. Claude synthesized these scattered discussions into a coherent summary of my Chandni Chowk explorations.

![Claude searching for Chandni Chowk conversations](https://www.shloked.com/images/blog/claude-memory/chandni-chowk.png)

When you ask about multiple topics, Claude runs separate searches sequentially. In my past job as a crypto researcher, I used Claude extensively as an editor. When I asked "Tell me all the conversations we've had about either Michelangelo or Chainflip or Solana," Claude ran three separate searches—one for my Michelangelo analogies for neural networks, another for Chainflip's cross-chain protocol work, and a third for Solana's technical architecture. It found 22 conversations across these searches and delivered a unified response with direct links to each chat.

![Claude running multiple searches for different topics](https://www.shloked.com/images/blog/claude-memory/multiple-searches.png)

conversation_search tool definition

```
{
  "description": "Search through past user conversations to find relevant context and information",
  "name": "conversation_search",
  "parameters": {
    "properties": {
      "max_results": {
        "default": 5,
        "description": "The number of results to return, between 1-10",
        "exclusiveMinimum": 0,
        "maximum": 10,
        "title": "Max Results",
        "type": "integer"
      },
      "query": {
        "description": "The keywords to search with",
        "title": "Query",
        "type": "string"
      }
    },
    "required": ["query"],
    "title": "ConversationSearchInput",
    "type": "object"
  }
}
```

### Temporal Chat Retrieval
The `recent_chats` tool provides time-based access to your conversation history. When I asked "Can you tell me what we spoke about in the last 10 conversations?" Claude retrieved my most recent chats chronologically and gave me a summary of my recent usage.

![Claude retrieving last 10 conversations](https://www.shloked.com/images/blog/claude-memory/last-10-conversations.png)

The tool also handles specific timeframes. When I asked "What did we discuss in the last week of November 2024?" Claude retrieved 16 conversations from that exact period.

![Claude retrieving conversations from November 2024](https://www.shloked.com/images/blog/claude-memory/november-2024.png)

recent_chats tool definition

```
{
  "description": "Retrieve recent chat conversations with customizable sort order (chronological or reverse chronological), optional pagination using 'before' and 'after' datetime filters, and project filtering",
  "name": "recent_chats",
  "parameters": {
    "properties": {
      "after": {
        "anyOf": [{"format": "date-time", "type": "string"}, {"type": "null"}],
        "default": null,
        "description": "Return chats updated after this datetime (ISO format, for cursor-based pagination)",
        "title": "After"
      },
      "before": {
        "anyOf": [{"format": "date-time", "type": "string"}, {"type": "null"}],
        "default": null,
        "description": "Return chats updated before this datetime (ISO format, for cursor-based pagination)",
        "title": "Before"
      },
      "n": {
        "default": 3,
        "description": "The number of recent chats to return, between 1-20",
        "exclusiveMinimum": 0,
        "maximum": 20,
        "title": "N",
        "type": "integer"
      },
      "sort_order": {
        "default": "desc",
        "description": "Sort order for results: 'asc' for chronological, 'desc' for reverse chronological (default)",
        "pattern": "^(asc|desc)$",
        "title": "Sort Order",
        "type": "string"
      }
    },
    "title": "GetRecentChatsInput",
    "type": "object"
  }
}
```

## ChatGPT vs Claude
A year ago, ChatGPT and Claude's assistant apps matched each other feature for feature—multiple models, file attachments, projects. Since then, their paths have diverged dramatically. ChatGPT has evolved into a mass-market consumer product, while Claude has deliberately chosen a different trajectory. Anthropic CPO Mike Krieger has [acknowledged](https://lennysvault.com/episodes/8d70693c-41e7-4c00-8c14-6ba8955a2547) that OpenAI had "caught lightning in a bottle" with consumer adoption. Instead of chasing that market, Anthropic is focusing on what Claude does best: developer tools, coding, and professional workflows.

Memory implementation perfectly reflects this divergence.

ChatGPT's hundreds of millions of weekly active users come from all backgrounds—students, parents, hobbyists—who just want a product that works and remembers them without thinking about the mechanics. Every memory component loads automatically, creating instant personalization with zero wait time. The system builds detailed user profiles, learning preferences and patterns that could eventually power targeted features or monetization. It's the classic consumer tech playbook: make it magical, make it sticky, figure out different ways to monetize later.

Claude's users represent a different demographic entirely. Anthropic's more technical users inherently understand how LLMs work. They're comfortable with explicit control at every level. Just as they choose when to trigger web search or enable extended thinking, they decide when memory is worth invoking. They understand that memory calls add latency, but they make that tradeoff deliberately. Memory becomes just another tool in their arsenal, not an always-on feature. This audience doesn't need or want extensive profiling—they need a powerful, predictable tool for professional work. Not to mention, they're also more privacy-conscious.

## The Memory Design Space
It still amazes me that ChatGPT and Claude—the two top AI assistants—have built completely opposite memory systems. This only goes to show that memory in AI has a massive design space with no right answer or one-size-fits-all technique. You have to work backwards from who your users are and what they need, then build from first principles accordingly.

We're in uncharted territory. These tools are less than three years old, and nobody knows what happens when someone uses the same AI assistant for a decade. How much should it remember? How should it handle years of accumulated context? Meanwhile, we're seeing a Cambrian explosion of AI apps, each experimenting with their own memory approach, while the underlying models get more powerful every week. There's no playbook, no settled best practices—just everyone trying different things and seeing what sticks.

The more I dive into memory, the more fascinated I get. Over the coming weeks, I'll be dissecting different architectures, analyzing new approaches, and following the latest research. Subscribe below if you want updates as this space unfolds.

**Update:** Hours after publishing this, Anthropic announced [a new memory feature](https://www.anthropic.com/news/memory) for Team and Enterprise accounts that looks much closer to ChatGPT's approach. Haven't tried it yet (not available on Max plan), but will share an update once I do.
Like what you read? Subscribe to get new posts.

Original: [Claude Memory: A Different Philosophy](https://www.shloked.com/writing/claude-memory)