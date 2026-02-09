"use client";
import Link from "next/link";

export function SplitBanner({ isExtendedPage = false }: { isExtendedPage?: boolean }) {
  return (
    <div className="split-banner">
      <div className="split-line">
        <span className="split-scissors">{"\u2702"}</span>
        <div className="split-dash" />
      </div>
      <div className="split-content">
        <p className="split-title">Group splits here</p>
        <div className="split-routes">
          <div className="split-route">
            <span className="split-route-label">Jacek &amp; Ola</span>
            <span className="split-route-desc">Tokyo &rarr; Warsaw</span>
          </div>
          <div className="split-divider">|</div>
          <div className="split-route">
            <span className="split-route-label">Jędrzej &amp; Iza</span>
            <span className="split-route-desc">Nara &rarr; Kyoto &rarr; Hakone &rarr; Matsumoto &rarr; Tokyo</span>
          </div>
        </div>
        {!isExtendedPage && (
          <Link href="/extended" className="split-cta">
            Continue to Extended Trip &rarr;
          </Link>
        )}
      </div>
    </div>
  );
}
