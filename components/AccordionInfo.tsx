import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Trans } from '@lingui/macro'

export function AccordionInfo() {
  return (
    <section className="space-y-8 px-6 py-12 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        <Trans>Protect Your Images with Secure Offline Watermarking</Trans>
      </h2>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="benefits">
          <AccordionTrigger className="text-xl font-semibold">
            <Trans>
              Why Watermarking is Essential for Protecting Your Images
            </Trans>
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            <p className="text-gray-600">
              <Trans>
                In today's digital world, sharing images has become a common
                part of our daily lives. Whether it's personal photos, family
                pictures, or photos you want to share with friends or clients,
                watermarking is a simple yet effective way to protect your
                images from unauthorized use. By applying watermarks directly on
                your device, you can ensure that your images stay private and
                secure, without the need to upload them to external servers.
              </Trans>
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                <strong>
                  <Trans>Protect Your Privacy:</Trans>
                </strong>
                <Trans>
                  Watermarking your images directly on your device ensures they
                  stay private and secure, preventing unauthorized access or
                  sharing without your consent.
                </Trans>
              </li>
              <li>
                <strong>
                  <Trans>Prevent Unauthorized Use:</Trans>
                </strong>
                <Trans>
                  Adding a watermark to your images helps protect your work from
                  being stolen or misused. It makes it clear that the image
                  belongs to you, discouraging others from copying or
                  distributing it without your permission.
                </Trans>
              </li>
              <li>
                <strong>
                  <Trans>Maintain Full Control:</Trans>
                </strong>
                <Trans>
                  Offline watermarking gives you full control over your
                  images—everything stays on your device, and you can manage
                  your photos privately and securely.
                </Trans>
              </li>
              <li>
                <strong>
                  <Trans>Strengthen Your Personal Brand:</Trans>
                </strong>
                <Trans>
                  By adding your name, logo, or contact information to your
                  images, you create a visible mark of ownership, helping you
                  establish and protect your personal or business brand.
                </Trans>
              </li>
              <li>
                <strong>
                  <Trans>Easily Track Image Origins:</Trans>
                </strong>
                <Trans>
                  Watermarks make it easy to trace the source of your images if
                  they are shared or reposted online, helping you keep track of
                  your original content.
                </Trans>
              </li>
              <li>
                <strong>
                  <Trans>Deter Image Theft:</Trans>
                </strong>
                <Trans>
                  Visible watermarks make your images less appealing to thieves
                  or unauthorized users, significantly reducing the likelihood
                  of theft or misuse.
                </Trans>
              </li>
            </ul>
            <p className="text-gray-600">
              <Trans>
                With offline watermarking, you can protect your personal or
                professional images with ease and peace of mind, knowing that
                your content stays safe on your device at all times. No uploads,
                no risks—just full control and security over your images.
              </Trans>
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="usage">
          <AccordionTrigger className="text-xl font-semibold">
            <Trans>How Watermarking Can Benefit Real-Life Scenarios</Trans>
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            <p className="text-gray-600">
              <Trans>
                Watermarking is not just for photographers and businesses. It
                can be a valuable tool in many everyday situations:
              </Trans>
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                <strong>
                  <Trans>Rental Property Listings:</Trans>
                </strong>
                <Trans>
                  Landlords can protect images of their properties when posting
                  online, preventing unauthorized use in other listings.
                </Trans>
              </li>
              <li>
                <strong>
                  <Trans>Submitting Documents to HR:</Trans>
                </strong>
                <Trans>
                  Protect personal documents (e.g., resumes, ID scans) when
                  submitting them to employers or HR departments, ensuring
                  confidentiality and security.
                </Trans>
              </li>
              <li>
                <strong>
                  <Trans>Online Job Applications:</Trans>
                </strong>
                <Trans>
                  Watermark sensitive information such as cover letters,
                  resumes, or portfolio samples to ensure they cannot be misused
                  or repurposed.
                </Trans>
              </li>
              <li>
                <strong>
                  <Trans>Community Access or Gate Passes:</Trans>
                </strong>
                <Trans>
                  Residents can watermark personal identification or entry forms
                  when submitting them for community access or gate passes,
                  protecting sensitive information.
                </Trans>
              </li>
              <li>
                <strong>
                  <Trans>Real Estate Transactions:</Trans>
                </strong>
                <Trans>
                  Watermark images of properties during transactions, ensuring
                  they are not copied or redistributed without permission.
                </Trans>
              </li>
              <li>
                <strong>
                  <Trans>Health & Medical Records:</Trans>
                </strong>
                <Trans>
                  Healthcare providers can watermark patient documents to
                  maintain privacy and prevent unauthorized access to medical
                  information.
                </Trans>
              </li>
              <li>
                <strong>
                  <Trans>Legal Documents:</Trans>
                </strong>
                <Trans>
                  For confidential legal files, watermarks can signify
                  "Confidential," "Draft," or "For Review Only," ensuring
                  information is handled securely.
                </Trans>
              </li>
              <li>
                <strong>
                  <Trans>University Submissions:</Trans>
                </strong>
                <Trans>
                  Students can watermark their assignments or projects to
                  protect against unauthorized sharing or plagiarism.
                </Trans>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="features">
          <AccordionTrigger className="text-xl font-semibold">
            <Trans>Powerful Customization Options for Your Watermarks</Trans>
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            <p className="text-gray-600">
              <Trans>
                Customize your watermarks with a range of design features to
                suit your branding and security needs:
              </Trans>
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                <strong>
                  <Trans>Custom Watermark Text:</Trans>
                </strong>
                <Trans>
                  Add your name or copyright information for clear attribution.
                </Trans>
              </li>
              <li>
                <strong>
                  <Trans>Precise Placement & Rotation:</Trans>
                </strong>
                <Trans>
                  Control the exact position and angle of your watermark for
                  optimal visibility.
                </Trans>
              </li>
              <li>
                <strong>
                  <Trans>Adjustable Opacity & Size:</Trans>
                </strong>
                <Trans>
                  Fine-tune the watermark’s transparency and scale for seamless
                  integration with your images.
                </Trans>
              </li>
              <li>
                <strong>
                  <Trans>Instant Preview:</Trans>
                </strong>
                <Trans>
                  Preview your watermark in real-time before applying it to your
                  images.
                </Trans>
              </li>
              {/* <li>
                <strong><Trans>Multiple Watermark Styles:</Trans></strong>
                <Trans>Choose from text-only, logo-only, or a combination of both for a personalized touch.</Trans>
              </li> */}
              {/* <li>
                <strong><Trans>Batch Watermarking:</Trans></strong>
                <Trans>Save time by applying watermarks to multiple images at once, ideal for bulk content protection.</Trans>
              </li> */}
            </ul>

            <p className="text-gray-600">
              <Trans>
                Enjoy the added security and efficiency of offline watermarking:
              </Trans>
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                <strong>
                  <Trans>Complete Privacy:</Trans>
                </strong>
                <Trans>
                  Your images stay local, with no need to upload them to
                  external servers.
                </Trans>
              </li>
              <li>
                <strong>
                  <Trans>Lightning-Fast Processing:</Trans>
                </strong>
                <Trans>
                  Apply watermarks instantly without waiting for uploads or
                  server-side processing.
                </Trans>
              </li>
              <li>
                <strong>
                  <Trans>Offline Capability:</Trans>
                </strong>
                <Trans>
                  Watermark your images even without an internet connection,
                  ensuring flexibility and control.
                </Trans>
              </li>
              <li>
                <strong>
                  <Trans>Maximum Security:</Trans>
                </strong>
                <Trans>
                  Maintain complete control over your visual assets with offline
                  processing that prevents data breaches.
                </Trans>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  )
}
