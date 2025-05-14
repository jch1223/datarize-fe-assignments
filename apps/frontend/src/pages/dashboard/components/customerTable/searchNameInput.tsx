import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { useState } from 'react'
interface SearchNameInputProps {
  name?: string
  onSubmit: (name?: string) => void
  onReset: () => void
}

export const SearchNameInput = ({ name, onSubmit, onReset }: SearchNameInputProps) => {
  const [searchName, setSearchName] = useState(name || '')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit(searchName)
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center py-4 gap-2">
      <Input
        placeholder="이름 검색"
        value={searchName}
        onChange={(event) => setSearchName(event.target.value)}
        className="max-w-sm"
      />
      <Button variant="outline" onClick={onReset}>
        초기화
      </Button>
    </form>
  )
}
