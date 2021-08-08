import { faMarkdown, IconDefinition } from '@fortawesome/free-brands-svg-icons'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

type File = {
  icon: IconDefinition
  filename: string
} & (
  | { windowComponent: () => React.ReactNode; externalLink?: never }
  | { externalLink: string; windowComponent?: never }
)

const files: File[] = [
  {
    icon: faMarkdown,
    filename: 'README.md',
    windowComponent: () => <p>window here</p>,
  },
  {
    icon: faMarkdown,
    filename: 'stack.md',
    windowComponent: () => <p>window here</p>,
  },
  {
    icon: faExternalLinkAlt,
    filename: 'github',
    externalLink: 'https://github.com/krall12',
  },
  {
    icon: faExternalLinkAlt,
    filename: 'krall-dev-repo',
    externalLink: 'https://github.com/krall12/krall.dev',
  },
  {
    icon: faExternalLinkAlt,
    filename: 'linkedin',
    externalLink: 'https://linkedin.com/in/krall12',
  },
  {
    icon: faExternalLinkAlt,
    filename: 'resume.pdf',
    externalLink: 'https://github.com/krall12',
  },
]

export default files
