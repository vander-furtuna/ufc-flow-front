import { motion } from 'motion/react'
import { useCallback, useMemo } from 'react'

import { useCourse } from '@/contexts/course'
import type { Subject } from '@/types/course'
import { capitalizeWords } from '@/utils/capitalize-words'

import { SubjectBar } from './subject-bar'

type SubjectCardProps = {
  subject: Subject
  childIndex: number
}

export function SubjectCardSmall({
  subject,
  childIndex = 0,
}: SubjectCardProps) {
  const { selectedSubject, setSelectedSubject } = useCourse()
  const subjectName = subject.name || subject.subject?.name || ''
  const subjectCode = subject.code || subject.subject?.code || ''
  const subjectSlug = subject.slug || subject.subject?.slug || ''
  const name = useMemo(() => capitalizeWords(subjectName), [subjectName])

  const subjectElement = useMemo(
    () =>
      subjectSlug
        ? (document.getElementById(subjectSlug) as HTMLButtonElement)
        : null,
    [subjectSlug],
  )

  const handleClickSubject = useCallback(() => {
    if (
      selectedSubject &&
      (selectedSubject.code || selectedSubject.subject?.code) === subjectCode
    ) {
      setSelectedSubject(null)
    } else {
      setSelectedSubject(subject)
    }

    if (subjectElement) {
      const subjectCardRef = subjectElement as HTMLButtonElement
      subjectCardRef.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      })
    }
  }, [
    subjectElement,
    selectedSubject,
    setSelectedSubject,
    subject,
    subjectCode,
  ])

  const selectedStatus = useMemo(
    () =>
      (selectedSubject?.code || selectedSubject?.subject?.code) === subjectCode
        ? 'selected'
        : 'unselected',
    [selectedSubject, subjectCode],
  )

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.2, delay: 0.05 * childIndex }}
      key={subjectCode}
      className="group ring-border center before:bg-background/70 dark:before:bg-accent relative flex h-22 w-full max-w-48 shrink-0 cursor-pointer flex-col gap-1 rounded-lg bg-transparent px-2 text-center text-[0.75rem] ring-1 transition-all duration-300 before:absolute before:-z-20 before:size-full before:rounded-lg before:content-[''] after:absolute after:right-0 after:-z-10 after:size-full after:rounded-lg after:bg-black after:opacity-0 after:content-[''] hover:shadow-lg hover:ring-0 active:scale-95 data-[selected=selected]:shadow-lg data-[selected=selected]:ring-0 dark:ring-slate-700 dark:after:opacity-15"
      onClick={handleClickSubject}
      data-selected={selectedStatus}
    >
      <span className="text-accent-foreground line-clamp-3 text-[0.6875rem] font-medium drop-shadow-sm">
        {name}
      </span>

      <SubjectBar
        nature={subject.nature}
        branchIds={subject.branchIds || subject.branch}
      />
    </motion.button>
  )
}
