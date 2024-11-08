import { Github } from 'lucide-react';

export function PageFooter() {
  return (
    <footer className="w-full bg-gradient-to-b from-white to-blue-50/50 border-t border-blue-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-600">
            {new Date().getFullYear()} © Image Watermark.
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/hkint/image-watermark"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              <Github className="w-5 h-5" />
              <span>View on GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}