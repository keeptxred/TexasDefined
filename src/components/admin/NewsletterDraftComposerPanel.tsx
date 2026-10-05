import { type FormEvent, useState } from 'react';

import {
  previewNewsletterAdminDraft,
  saveNewsletterAdminDraft,
} from '@/data/newsletter/newsletter-admin.functions';

type StoryDraft = {
  title: string;
  summary: string;
  url: string;
  kicker: string;
  imageUrl: string;
};

type ComposerPreview = Awaited<ReturnType<typeof previewNewsletterAdminDraft>>;

type Props = {
  authorized: boolean;
  onSaved?: () => void | Promise<void>;
};

const emptyStory = (): StoryDraft => ({
  title: '',
  summary: '',
  url: '',
  kicker: '',
  imageUrl: '',
});

export function NewsletterDraftComposerPanel({ authorized, onSaved }: Props) {
  const [slug, setSlug] = useState('');
  const [subject, setSubject] = useState('');
  const [preheader, setPreheader] = useState('');
  const [issueLabel, setIssueLabel] = useState('TexasDefined');
  const [headline, setHeadline] = useState('');
  const [intro, setIntro] = useState('');
  const [closing, setClosing] = useState('');
  const [fromName, setFromName] = useState('TexasDefined');
  const [replyTo, setReplyTo] = useState('');
  const [stories, setStories] = useState<StoryDraft[]>([emptyStory()]);
  const [preview, setPreview] = useState<ComposerPreview | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function updateStory(index: number, field: keyof StoryDraft, value: string) {
    setStories((current) => current.map((story, storyIndex) => storyIndex === index ? { ...story, [field]: value } : story));
  }

  function addStory() {
    setStories((current) => current.length >= 12 ? current : [...current, emptyStory()]);
  }

  function removeStory(index: number) {
    setStories((current) => current.length <= 1 ? current : current.filter((_, storyIndex) => storyIndex !== index));
  }

  function draftInput() {
    return {
      slug: slug.trim(),
      subject: subject.trim(),
      preheader: preheader.trim() || null,
      issueLabel: issueLabel.trim(),
      headline: headline.trim(),
      intro: intro.trim(),
      closing: closing.trim() || undefined,
      fromName: fromName.trim() || undefined,
      replyTo: replyTo.trim() || null,
      stories: stories.map((story) => ({
        title: story.title.trim(),
        summary: story.summary.trim(),
        url: story.url.trim(),
        kicker: story.kicker.trim() || undefined,
        imageUrl: story.imageUrl.trim() || undefined,
      })),
    };
  }

  async function runPreview() {
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const rendered = await previewNewsletterAdminDraft({ data: draftInput() });
      setPreview(rendered);
      setMessage(`Preview rendered with ${rendered.storyCount} ${rendered.storyCount === 1 ? 'story' : 'stories'}. Nothing was saved or sent.`);
    } catch (cause) {
      console.error('Newsletter draft preview failed', cause);
      setError(cause instanceof Error ? cause.message : 'Newsletter draft preview failed.');
    } finally {
      setBusy(false);
    }
  }

  async function saveDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const saved = await saveNewsletterAdminDraft({ data: draftInput() });
      setPreview(saved.preview);
      setMessage(`Draft saved with ${saved.storyCount} ${saved.storyCount === 1 ? 'story' : 'stories'}. Nothing was sent.`);
      await onSaved?.();
    } catch (cause) {
      console.error('Newsletter draft save failed', cause);
      setError(cause instanceof Error ? cause.message : 'Newsletter draft could not be saved.');
    } finally {
      setBusy(false);
    }
  }

  if (!authorized) return null;

  return <section id="newsletter-composer" className="mt-10 border-t border-border pt-8" aria-labelledby="newsletter-composer-heading">
    <div className="max-w-4xl">
      <p className="eyebrow text-primary">Server-only composer</p>
      <h3 id="newsletter-composer-heading" className="mt-2 font-display text-3xl">Build a Newsletter Draft</h3>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">Compose and preview the branded email before it enters the issue lifecycle. Preview has no database or provider side effects; saving creates a draft only and cannot send email.</p>
    </div>

    <form onSubmit={saveDraft} className="mt-7 grid gap-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Issue slug"><input required value={slug} onChange={(event) => setSlug(event.target.value)} placeholder="weekend-guide-october-9" pattern="[a-z0-9]+(?:-[a-z0-9]+)*" maxLength={120} className="field" /></Field>
        <Field label="Issue label"><input required value={issueLabel} onChange={(event) => setIssueLabel(event.target.value)} maxLength={120} className="field" /></Field>
        <Field label="Email subject"><input required value={subject} onChange={(event) => setSubject(event.target.value)} maxLength={180} className="field" /></Field>
        <Field label="Preheader"><input value={preheader} onChange={(event) => setPreheader(event.target.value)} maxLength={240} className="field" /></Field>
      </div>

      <Field label="Headline"><input required value={headline} onChange={(event) => setHeadline(event.target.value)} maxLength={180} className="field" /></Field>
      <Field label="Introduction"><textarea required value={intro} onChange={(event) => setIntro(event.target.value)} maxLength={1000} rows={4} className="field" /></Field>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="From name"><input value={fromName} onChange={(event) => setFromName(event.target.value)} maxLength={120} className="field" /></Field>
        <Field label="Reply-to email"><input type="email" value={replyTo} onChange={(event) => setReplyTo(event.target.value)} className="field" /></Field>
      </div>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div><h4 className="font-display text-2xl">Stories</h4><p className="mt-1 text-xs text-muted-foreground">1–12 cards. Duplicate URLs are removed by the server composer.</p></div>
          <button type="button" onClick={addStory} disabled={busy || stories.length >= 12} className="min-h-10 border border-border px-3 py-2 text-sm font-semibold disabled:opacity-50">Add story</button>
        </div>
        <div className="mt-4 grid gap-5">
          {stories.map((story, index) => <article key={index} className="border border-border p-5">
            <div className="flex items-center justify-between gap-3"><strong>Story {index + 1}</strong><button type="button" onClick={() => removeStory(index)} disabled={busy || stories.length <= 1} className="text-sm font-semibold text-destructive disabled:opacity-40">Remove</button></div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Field label="Kicker"><input value={story.kicker} onChange={(event) => updateStory(index, 'kicker', event.target.value)} maxLength={80} className="field" /></Field>
              <Field label="Story URL"><input required type="url" value={story.url} onChange={(event) => updateStory(index, 'url', event.target.value)} maxLength={2000} className="field" /></Field>
            </div>
            <div className="mt-4"><Field label="Title"><input required value={story.title} onChange={(event) => updateStory(index, 'title', event.target.value)} maxLength={180} className="field" /></Field></div>
            <div className="mt-4"><Field label="Summary"><textarea required value={story.summary} onChange={(event) => updateStory(index, 'summary', event.target.value)} maxLength={600} rows={3} className="field" /></Field></div>
            <div className="mt-4"><Field label="Image URL"><input type="url" value={story.imageUrl} onChange={(event) => updateStory(index, 'imageUrl', event.target.value)} maxLength={2000} className="field" /></Field></div>
          </article>)}
        </div>
      </div>

      <Field label="Closing"><textarea value={closing} onChange={(event) => setClosing(event.target.value)} maxLength={600} rows={3} className="field" /></Field>

      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={() => void runPreview()} disabled={busy} className="min-h-11 border border-border px-5 py-3 text-sm font-semibold disabled:opacity-50">Preview without saving</button>
        <button type="submit" disabled={busy} className="min-h-11 bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50">Save draft</button>
      </div>
    </form>

    {error ? <p className="mt-5 text-sm font-semibold text-destructive" role="alert">{error}</p> : null}
    {message ? <p className="mt-5 border-l-2 border-primary pl-4 text-sm font-semibold" role="status">{message}</p> : null}

    {preview ? <div className="mt-8 border-t border-border pt-6">
      <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="eyebrow text-primary">Draft preview</p><h4 className="mt-2 font-display text-2xl">{preview.subject}</h4></div><span className="text-xs text-muted-foreground">{preview.storyCount} {preview.storyCount === 1 ? 'story' : 'stories'}</span></div>
      {preview.preheader ? <p className="mt-2 text-sm text-muted-foreground">{preview.preheader}</p> : null}
      <iframe title="Newsletter draft preview" sandbox="" srcDoc={preview.html} style={{ minHeight: 720, backgroundColor: '#fff' }} className="mt-5 w-full border border-border" />
    </div> : null}
  </section>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="grid gap-2 text-sm font-semibold">{label}{children}</label>;
}
