import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function FooterContent() {
  return (
    <section className="space-y-8 px-6 py-12 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Protect Your Images with Secure Offline Watermarking
      </h2>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="benefits">
          <AccordionTrigger className="text-xl font-semibold">
            Why Should You Care About Image Watermarking?
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            <p className="text-gray-600">
              As a content creator, your images are valuable assets that
              require protection. Watermarking provides a robust defense against
              image theft and misuse.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                <strong>Protect Your Intellectual Property:</strong> Safeguard
                your original work from unauthorized use.
              </li>
              <li>
                <strong>Build Your Brand:</strong> Consistently display your
                logo or name to establish a strong brand identity.
              </li>
              <li>
                <strong>Deter Image Theft:</strong> Make it less appealing for
                others to steal and misuse your images.
              </li>
              <li>
                <strong>Add Professionalism:</strong> Enhance your work with a
                professional touch, especially for client proofs or portfolio
                displays.
              </li>
              <li>
                <strong>Track Image Origin:</strong> Easily identify the source
                of your images if they are shared online.
              </li>
            </ul>
            <p className="text-gray-600">
              Offline watermarking offers enhanced privacy and security,
              ensuring your original images never leave your device. This
              eliminates the risk of uploads to external servers and gives you
              complete control over your valuable content.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="usage">
          <AccordionTrigger className="text-xl font-semibold">
            How Can You Use Watermarking?
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            <p className="text-gray-600">
              Watermarking is valuable across various industries and
              applications:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                <strong>Photography:</strong> Client proofs, online portfolios,
                wedding photos, stock photography.
              </li>
              <li>
                <strong>E-commerce:</strong> Product images, online catalogs,
                design mockups.
              </li>
              <li>
                <strong>Real Estate:</strong> Property listings, virtual tours,
                architectural renderings.
              </li>
              <li>
                <strong>Social Media:</strong> Protect your original content
                shared on platforms like Instagram, Facebook, etc.
              </li>
              <li>
                <strong>Digital Marketing:</strong> Email campaigns, blog post
                images, online course materials.
              </li>
              <li>
                <strong>Legal & Confidential Documents:</strong> Add watermarks
                like "Confidential," "Draft," or "Not for Distribution."{' '}
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="features">
          <AccordionTrigger className="text-xl font-semibold">
            What Custom Watermark Features Do You Need?
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            <p className="text-gray-600">
              Personalize your watermarks with a range of design options:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                <strong>Custom Text & Logo:</strong> Add your name, company
                logo, or copyright information.
              </li>
              <li>
                <strong>Placement & Rotation:</strong> Precisely control the
                position and angle of your watermark.
              </li>
              <li>
                <strong>Opacity & Size:</strong> Adjust the visibility and scale
                to seamlessly integrate with your image.
              </li>
              <li>
                <strong>Multiple Watermark Styles:</strong> Choose from
                text-based, logo-based, or combined watermarks.
              </li>
              <li>
                <strong>Real-time Preview:</strong> See your changes instantly
                before applying the watermark.
              </li>
              <li>
                <strong>Batch Processing:</strong> Watermark multiple images at
                once, saving valuable time.
              </li>
            </ul>

            <p className="text-gray-600">
              Enjoy the peace of mind that comes with offline processing:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                <strong>No Uploads:</strong> Your images stay on your device,
                ensuring complete privacy.
              </li>
              <li>
                <strong>Fast Processing:</strong> No waiting for uploads or
                server-side processing.
              </li>
              <li>
                <strong>Offline Functionality:</strong> Watermark images even
                without an internet connection.
              </li>
              <li>
                <strong>Maximum Security:</strong> Maintain full control and
                safeguard your sensitive visual assets.{' '}
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
