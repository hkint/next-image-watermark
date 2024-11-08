import { ImageIcon, Shield, Globe, Zap } from 'lucide-react';

export function PageHeader() {
  return (
    <header className="w-full bg-gradient-to-b from-blue-50 via-blue-50/2 to-blue-50/5 py-8 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 -top-4 w-24 h-24 bg-blue-200/30 rounded-full blur-2xl" />
        <div className="absolute right-1/4 top-1/4 w-32 h-32 bg-blue-300/20 rounded-full blur-3xl" />
        <div className="absolute left-1/3 bottom-1/4 w-28 h-28 bg-blue-100/40 rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Icon Container */}
          <div className="p-6 bg-gradient-to-br from-blue-100/80 to-white rounded-3xl shadow-xl shadow-blue-100/50 backdrop-blur-sm">
            <ImageIcon className="w-20 h-20 text-blue-600" strokeWidth={1.5} />
          </div>

          {/* Main Content */}
          <div className="space-y-6 max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Offline Image Watermark
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-2xl mx-auto">
              Add custom watermarks to your image with complete privacy - all
              processing happens offline in your browser
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-8 text-gray-600">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <span>100% Private & Offline</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-blue-600" />
              <span>Custom Watermarks</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-blue-600" />
              <span>Multiple Image Formats</span>
            </div>
          </div>

          {/* SEO-friendly hidden content */}
          <div className="sr-only">
            <h2>Online Image Watermarking Tool</h2>
            <p>
              Add professional watermarks to your photos and images. Perfect for
              photographers, digital artists, and content creators. Supports
              JPG, PNG, and WebP formats. Protect your intellectual property
              with customizable text and logo watermarks.
            </p>
            <ul>
              <li>Fast and easy watermark application</li>
              <li>Customizable opacity and positioning</li>
              <li>Batch processing available</li>
              <li>No registration required</li>
              <li>Free online watermarking tool</li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
