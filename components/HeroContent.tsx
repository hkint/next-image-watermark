import { Upload, Palette, Download, ChevronRight } from 'lucide-react';
import { Trans } from '@lingui/macro';

export function HeroContent() {
  return (
    <section className="max-w-5xl mx-auto p-6">
      {/* Main heading with SEO optimization */}
      <div className="text-center mb-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          <Trans>Add Watermarks in Three Simple Steps</Trans>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          <Trans>Protect your images with watermarks in under a minute</Trans>
        </p>
      </div>

      {/* Steps grid */}
      <div className="grid gap-8 md:grid-cols-3 mb-4">
        {/* Step 1 */}
        <div className="relative p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full">
              <Upload className="w-5 h-5" />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <Trans>Select Image</Trans>
                <ChevronRight className="w-4 h-4 ml-1 text-gray-400" />
              </h3>
            </div>
          </div>
          <p className="text-gray-600">
            <Trans>
              Local offline processing: Drag & drop files, browse local images or
              paste image URL. Supports JPG, PNG and WebP formats. Your privacy is
              guaranteed.
            </Trans>
          </p>
        </div>

        {/* Step 2 */}
        <div className="relative p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full">
              <Palette className="w-5 h-5" />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <Trans>Customize Watermark</Trans>
                <ChevronRight className="w-4 h-4 ml-1 text-gray-400" />
              </h3>
            </div>
          </div>
          <p className="text-gray-600">
            <Trans>
              Personalize your watermark with text, adjust opacity, size, and
              position. Preview changes in real-time for the perfect result.
            </Trans>
          </p>
        </div>

        {/* Step 3 */}
        <div className="relative p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full">
              <Download className="w-5 h-5" />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <Trans>Download Result</Trans>
                <ChevronRight className="w-4 h-4 ml-1 text-gray-400" />
              </h3>
            </div>
          </div>
          <p className="text-gray-600">
            <Trans>
              Download or Copy your watermarked image instantly. No data is sent to any
              server - everything happens right in your browser.
            </Trans>
          </p>
        </div>
      </div>

      {/* Call to action */}
      {/* <div className="text-center">
        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8"
        >
          Start Watermarking
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div> */}

      {/* Hidden SEO content */}
      <div className="sr-only">
        <h2>Easy Image Watermarking Process</h2>
        <p>
          Create professional watermarks for your images in three easy steps.
          Perfect for photographers, designers, and content creators who want to
          protect their work. Free online tool with instant processing and
          high-quality output.
        </p>
        <ul>
          <li>Simple drag and drop image upload</li>
          <li>Customizable watermark settings</li>
          <li>Instant high-quality download</li>
          <li>Multiple format support</li>
          <li>No signup required</li>
        </ul>
      </div>
    </section>
  );
}
