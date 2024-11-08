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
            Why Watermark Your Images?
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            <p className="text-gray-600">
              Adding watermarks to your images is a crucial step in protecting
              your visual content online. Watermarking provides several key
              benefits:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                <strong>Copyright Protection:</strong> Deters unauthorized use
                and clearly identifies you as the owner.
              </li>
              <li>
                <strong>Brand Building:</strong> Promotes your brand by
                consistently displaying your logo or name across your images.
              </li>
              <li>
                <strong>Deterrent to Theft:</strong> Makes it less appealing for
                others to steal and misuse your images.
              </li>
              <li>
                <strong>Professionalism:</strong> Adds a professional touch to
                your work, especially for client proofs or portfolio displays.
              </li>
              <li>
                <strong>Source Tracking:</strong> Helps track the origin of your
                images if they are shared online.
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
            Watermark Use Cases & Examples
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
            <p className="text-gray-600">
              <strong>Common Watermark Text Examples:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>"For Rental Use Only"</li>
              <li>"For Employment Application Only"</li>
              <li>"Copyright [Your Name/Company] - All Rights Reserved"</li>
              <li>"Sample - Do Not Copy"</li>
              <li>"Proof - Not Final Version"</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="features">
          <AccordionTrigger className="text-xl font-semibold">
            Custom Watermark Features & Offline Benefits
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
