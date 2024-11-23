import React, { useState, useRef, ChangeEvent, use } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { BookOpen, ChevronDown } from 'lucide-react'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'

interface WatermarkControlsProps {
  watermark: string
  onWatermarkChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function WatermarkText({
  watermark,
  onWatermarkChange
}: WatermarkControlsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Handle click outside to close dropdown
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle preset selection
  const handlePresetSelect = (text: string) => {
    // Create a synthetic event to match the onChange type
    const syntheticEvent = {
      target: { value: text }
    } as ChangeEvent<HTMLInputElement>

    onWatermarkChange(syntheticEvent)
    setIsOpen(false)
    inputRef.current?.focus()
  }

  const { i18n } = useLingui()

  // Watermark preset options
  const WATERMARK_PRESETS = [
    {
      value: 'id-copy',
      label: <Trans>ID Copy Only</Trans>,
      text: t(i18n)`For Identity Verification Only`
    },
    {
      value: 'confidential',
      label: <Trans>Confidential</Trans>,
      text: t(i18n)`Internal Document - Do Not Share`
    },
    {
      value: 'draft',
      label: <Trans>Draft Version</Trans>,
      text: t(i18n)`Draft Version`
    },
    {
      value: 'review',
      label: <Trans>Under Review</Trans>,
      text: t(i18n)`Under Review`
    },
    {
      value: 'personal',
      label: <Trans>Personal Use</Trans>,
      text: t(i18n)`For Personal Use Only`
    },
    {
      value: 'expired',
      label: <Trans>Expired</Trans>,
      text: t(i18n)`Expired Document`
    },
    {
      value: 'sample',
      label: <Trans>Sample</Trans>,
      text: t(i18n)`Sample Document`
    },
    {
      value: 'copy',
      label: <Trans>Copyright</Trans>,
      text: t(i18n)`All Rights Reserved`
    }
  ] as const

  return (
    <div className="space-y-3" ref={containerRef}>
      <div className="relative">
        <div className="relative flex items-center">
          <Input
            ref={inputRef}
            id="watermark"
            value={watermark}
            onChange={onWatermarkChange}
            placeholder="Enter watermark text, e.g., Confidential"
            className="pr-10 h-12 text-base"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 h-full hover:bg-transparent"
            onClick={() => setIsOpen(!isOpen)}
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </Button>
        </div>

        {isOpen && (
          <div className="absolute w-full mt-1 bg-popover border rounded-md shadow-md z-50">
            <div className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground border-b">
              <BookOpen size={14} />
              <span>
                <Trans>Quick preset examples</Trans>
              </span>
            </div>
            <div className="py-1 max-h-64 overflow-y-auto">
              {WATERMARK_PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  className="w-full px-3 py-2 text-sm text-left hover:bg-accent focus:bg-accent focus:outline-none transition-colors"
                  onClick={() => handlePresetSelect(preset.text)}
                >
                  <div className="font-medium">{preset.label}</div>
                  <div className="text-muted-foreground text-xs mt-0.5">
                    {preset.text}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
