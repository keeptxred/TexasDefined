import { useEffect, useRef, useState } from 'react';

const MAXPREPS_WIDGET_SCRIPT = 'https://www.maxpreps.com/includes/js/widget/widget.compressed.js';

export type MaxPrepsTournamentWidgetConfig = {
  title: string;
  href: string;
  memberId: string;
  width: number;
  height: number;
  allowScrollbar: boolean;
};

/**
 * The actual widget script and anchor were provided by the TexasDefined owner
 * through MaxPreps' "Get Code" flow on 2026-10-20. This is intentionally
 * NOT a guessed iframe: MaxPreps' JS finds and enhances an anchor.
 *
 * Keep the third-party-updated subtree outside React's reconciliation so a
 * provider DOM replacement cannot break the class/division selector.
 */
export function MaxPrepsTournamentWidget({ widget }: { widget: MaxPrepsTournamentWidgetConfig }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [scriptFailed, setScriptFailed] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    setScriptFailed(false);
    const anchor = document.createElement('a');
    anchor.className = 'maxpreps-widget-link';
    anchor.href = widget.href;
    anchor.textContent = widget.title;
    anchor.dataset.width = String(widget.width);
    anchor.dataset.height = String(widget.height);
    anchor.dataset.type = 'tournament';
    anchor.dataset.memberId = widget.memberId;
    anchor.dataset.allowScrollbar = String(widget.allowScrollbar);
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    host.replaceChildren(anchor);

    // The official provider snippet appends this script to <head>. Load it
    // only while this particular, verified widget is selected.
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = MAXPREPS_WIDGET_SCRIPT;
    script.onerror = () => setScriptFailed(true);
    document.head.appendChild(script);

    return () => {
      script.onerror = null;
      script.remove();
      host.replaceChildren();
    };
  }, [widget]);

  return <div className="mt-5">
    <p className="mb-3 text-sm text-muted-foreground">
      Live tournament bracket provided by MaxPreps. On a phone, scroll sideways inside the bracket to see the other rounds.
    </p>
    <div className="w-full overflow-x-auto border border-border bg-background" role="region" aria-label={widget.title} tabIndex={0}>
      <div ref={hostRef} style={{ minWidth: widget.width, minHeight: widget.height }} />
    </div>
    {scriptFailed && <p role="status" className="mt-3 text-sm text-muted-foreground">
      The MaxPreps widget could not load. Use the official tournament link below.
    </p>}
  </div>;
}
