import { faMarkdown, IconDefinition } from '@fortawesome/free-brands-svg-icons'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

type File = {
  icon: IconDefinition
  filename: string
} & (
  | { windowComponent: () => JSX.Element; externalLink?: never }
  | { externalLink: string; windowComponent?: never }
)

const files: File[] = [
  {
    icon: faMarkdown,
    filename: 'README.md',
    windowComponent: () => (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos eaque autem itaque aliquid possimus
        deleniti delectus necessitatibus atque accusantium officiis. Perferendis ab consequuntur quaerat
        aliquid eligendi dolores voluptates id provident! Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Quos eaque autem itaque aliquid possimus deleniti delectus necessitatibus atque accusantium
        officiis. Perferendis ab consequuntur quaerat aliquid eligendi dolores voluptates id provident! Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Quos eaque autem itaque aliquid possimus deleniti
        delectus necessitatibus atque accusantium officiis. Perferendis ab consequuntur quaerat aliquid
        eligendi dolores voluptates id provident! Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Quos eaque autem itaque aliquid possimus deleniti delectus necessitatibus atque accusantium officiis.
        Perferendis ab consequuntur quaerat aliquid eligendi dolores voluptates id provident! Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Quos eaque autem itaque aliquid possimus deleniti
        delectus necessitatibus atque accusantium officiis. Perferendis ab consequuntur quaerat aliquid
        eligendi dolores voluptates id provident! Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Quos eaque autem itaque aliquid possimus deleniti delectus necessitatibus atque accusantium officiis.
        Perferendis ab consequuntur quaerat aliquid eligendi dolores voluptates id provident! Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Quos eaque autem itaque aliquid possimus deleniti
        delectus necessitatibus atque accusantium officiis. Perferendis ab consequuntur quaerat aliquid
        eligendi dolores voluptates id provident!
      </p>
    ),
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
