import Link from "next/link";
import { InPageAnchor } from "@/components/mv/InPageAnchor";

const footerLink =
  "inline-block rounded-md text-[13px] text-white/45 transition-colors duration-150 hover:text-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25";

const footerHeading = "text-[13px] font-medium text-white";

function ExternalMark() {
  return (
    <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
      <path
        fill="currentColor"
        d="M3.5 3h5.09L3.2 8.39l.71.71L9.3 3.71V9h1V2H3.5v1z"
      />
    </svg>
  );
}

function CompactColumns() {
  return (
    <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
      <div>
        <h3 className={footerHeading}>Legal</h3>
        <ul role="list" className="mt-4 space-y-3">
          <li>
            <Link href="/legal/privacy" className={footerLink}>
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="/legal/terms" className={footerLink}>
              Terms of Service
            </Link>
          </li>
          <li>
            <Link href="/legal/refunds" className={footerLink}>
              Refund Policy
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h3 className={footerHeading}>Company</h3>
        <ul role="list" className="mt-4 space-y-3">
          <li>
            <button type="button" className={footerLink}>
              Contact
            </button>
          </li>
        </ul>
      </div>
      <div>
        <h3 className={footerHeading}>Licenses</h3>
        <ul role="list" className="mt-4 space-y-3">
          <li>
            <InPageAnchor targetId="pricing" href="/v5#pricing" className={footerLink}>
              Pricing
            </InPageAnchor>
          </li>
        </ul>
      </div>
      <div>
        <h3 className={footerHeading}>Resources</h3>
        <ul role="list" className="mt-4 space-y-3">
          <li>
            <button type="button" className={`${footerLink} inline-flex items-center gap-1`}>
              Documentation
              <ExternalMark />
              <span className="sr-only"> (opens in new tab)</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export function MvFooter({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <footer className="relative overflow-hidden border-t border-white/5 bg-background" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute bottom-[-22%] left-1/2 w-[150vw] max-w-none -translate-x-1/2">
            <img
              src="/images/logo-mindvault.svg"
              alt=""
              width={2869}
              height={622}
              data-mv-mark
              className="h-auto w-full [mask-image:linear-gradient(to_top,black_8%,transparent_72%)]"
            />
          </div>
        </div>
        <div className="relative z-10 mx-auto flex min-h-[20rem] max-w-7xl flex-col justify-between gap-12 px-4 pt-10 pb-4 sm:min-h-[22rem] sm:px-6 lg:px-8">
          <CompactColumns />
          <p className="text-center text-[13px] text-white/30">© 2026 MindVault. All rights reserved.</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-white/5 bg-background pb-20" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-4">
            <Link href="/" className="inline-block" aria-label="MindVault home">
              <img src="/images/logo-mindvault.svg" alt="MindVault" width={160} height={36} className="h-7 w-auto" />
            </Link>
            <p className="text-sm text-white/50 max-w-xs">
              The real-time neural data toolkit. Process, stream, and analyze biosensor data for any application.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div>
              <h3 className="text-sm font-semibold text-white">Product</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link href="#pricing" className={footerLink}>
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Company</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link href="/contact" className={footerLink}>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
