import FileGithub from 'components/FileGithub'

const files = [
  { filename: 'README.md', windowComponent: '' },
  { filename: 'stack.md', windowComponent: '' },
  { filename: 'github', windowComponent: () => <FileGithub /> },
  { filename: 'repository', windowComponent: '' },
  { filename: 'linkedin', windowComponent: '' },
  { filename: 'resume.pdf', windowComponent: '' },
]

export default files
