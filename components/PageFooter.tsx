import Image from "next/image";
import Link from "next/link";
import { Trans } from '@lingui/macro';

export function PageFooter() {
  return (
    <footer className="w-full bg-gradient-to-b from-white to-blue-50/50 border-t border-blue-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link
            href="https://okhk.net"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-400 transition-colors duration-200"
          >
            <span>OKHK</span>
          </Link>
          <div className="text-gray-600">
            <Link
              href="#"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              {new Date().getFullYear()} ♥️  <Trans>Image + Watermark</Trans>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/hkint/next-image-watermark"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-400 transition-colors duration-200"
            >
              <Image
                src="/svg/github.svg"
                alt="GitHub"
                width={16}
                height={16}
              />
              <span><Trans>View on GitHub</Trans></span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
