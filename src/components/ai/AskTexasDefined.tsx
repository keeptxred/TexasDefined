import { useState, type FormEvent } from "react";

const aiExamples = [
  "Why does Texas have so many counties?",
  "Where should I go for a Hill Country weekend?",
  "What is the difference between a kolache and a klobasnek?",
  "Help me understand farm-to-market roads.",
] as const;

type AiSource = { title: string; href: string; summary: string; kind: string };
type AiPayload = { answer?: string; sources?: AiSource[]; error?: string };

export function AskTexasDefined({ initialQuestion }: { initialQuestion: string }) {
  const [question, setQuestion] = useState(initialQuestion);
  const [answer, setAnswer] = useState<string | null>(null);
  const [sources, setSources] = useState<AiSource[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedQuestion = question.trim();
    if (!normalizedQuestion || loading) return;

    setLoading(true);
    setError(null);
    setAnswer(null);
    setSources([]);

    try {
      const response = await fetch("/api/texas-defined-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: normalizedQuestion }),
      });
      const payload = await response.json() as AiPayload;
      if (!response.ok || !payload.answer) throw new Error(payload.error || "Texas Defined AI could not answer that right now.");
      setAnswer(payload.answer);
      setSources(Array.isArray(payload.sources) ? payload.sources : []);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Texas Defined AI could not answer that right now.");
    } finally {
      setLoading(false);
    }
  }

  return <section aria-labelledby="ask-texas-defined-heading" className="border-y border-border bg-surface px-5 py-8 sm:px-8 sm:py-10">
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <div>
        <p className="eyebrow text-primary">New · Texas Defined AI</p>
        <h2 id="ask-texas-defined-heading" className="mt-2 font-display text-4xl sm:text-5xl">Ask Texas anything.</h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">Powered by Texas Defined’s guides, data, places and verified sources. Ask a Texas question in plain English and the answer will point you back to the most relevant Texas Defined pages.</p>
        <form className="mt-6" onSubmit={submit}>
          <label htmlFor="texas-defined-ai-question" className="sr-only">Ask Texas Defined AI</label>
          <textarea id="texas-defined-ai-question" value={question} onChange={(event) => setQuestion(event.target.value)} maxLength={900} rows={3} placeholder="Why are Texas roads called FM roads? Where should I spend a weekend near Fredericksburg?" className="w-full resize-y border border-border bg-background px-4 py-3 text-base leading-7 outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary" />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs leading-5 text-muted-foreground">AI answers can make mistakes. Verify official sources for current rules, schedules, prices and deadlines.</p>
            <button type="submit" disabled={loading || !question.trim()} className="eyebrow border-b border-primary pb-1 text-primary disabled:cursor-not-allowed disabled:opacity-50">{loading ? "Thinking…" : "Ask →"}</button>
          </div>
        </form>
      </div>
      <aside aria-label="Example Texas questions" className="border-t border-border pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
        <p className="eyebrow text-primary">Try asking</p>
        <div className="mt-3 divide-y divide-border">{aiExamples.map((example) => <button key={example} type="button" onClick={() => setQuestion(example)} className="block w-full py-3 text-left text-sm leading-6 transition-colors hover:text-primary">{example}</button>)}</div>
      </aside>
    </div>

    <div aria-live="polite">
      {error && <div className="mt-7 border-l-2 border-primary px-4 py-2 text-sm leading-7"><strong>Texas Defined AI is unavailable:</strong> {error}</div>}
      {answer && <article className="mt-8 border-t border-border pt-7">
        <p className="eyebrow text-primary">Texas Defined AI</p>
        <div className="mt-3 max-w-3xl whitespace-pre-wrap text-base leading-8">{answer}</div>
        {sources.length > 0 && <div className="mt-7 max-w-3xl border-t border-border pt-5">
          <p className="eyebrow text-primary">Texas Defined sources</p>
          <ol className="mt-3 divide-y divide-border">{sources.map((source, index) => <li key={`${source.href}-${index}`} className="py-4">
            <div className="flex gap-3"><span className="font-display text-xl text-primary">[{index + 1}]</span><div><a href={source.href} className="font-display text-xl leading-tight transition-colors hover:text-primary">{source.title}</a><p className="mt-1 text-sm leading-6 text-muted-foreground">{source.summary}</p></div></div>
          </li>)}</ol>
        </div>}
      </article>}
    </div>
  </section>;
}
