import Link from "next/link";
import { ExternalLink } from "lucide-react";

const footerLink =
  "inline-block text-sm text-white/50 hover:text-accent transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#010101]" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-4">
            <Link
              href="/"
              aria-label="Petal Technology home"
              className="inline-block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <img src="/images/logo-petal.svg" alt="Petal Technology" width={120} height={40} className="h-8 w-auto" />
            </Link>
            <p className="text-sm text-white/50 max-w-xs">
              The real-time neural data toolkit. Process, stream, and analyze biosensor data for any application.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white">Licenses</h3>
                <ul role="list" className="mt-4 space-y-3">
                  <li>
                    <Link href="/#pricing" className={footerLink}>
                      Pricing
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-white">Resources</h3>
                <ul role="list" className="mt-4 space-y-3">
                  <li>
                    <a
                      href="https://docs.petal.tech"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-white/50 hover:text-accent transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 rounded"
                    >
                      Documentation
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      <span className="sr-only"> (opens in new tab)</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white">Company</h3>
                <ul role="list" className="mt-4 space-y-3">
                  <li>
                    <Link href="/contact" className={footerLink}>
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-white">Legal</h3>
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
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/5 pt-8">
          <p className="text-xs text-white/40 text-center">© 2026 Petal Technology LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
