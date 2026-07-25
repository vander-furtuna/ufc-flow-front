import type { Subject } from '@/types/course'

export const checkPrerequisites = (
  subject: Subject,
  completedSubjectCodes: string[],
  allSubjects: Subject[] = [],
): string[] => {
  const missing: string[] = []
  const prereqs = subject.prerequisiteCodes || subject.prerequisites || []
  if (!prereqs.length) return missing

  for (const preReqCode of prereqs) {
    if (completedSubjectCodes.includes(preReqCode)) {
      continue
    }

    // Check if there is a completed subject that lists preReqCode in its equivalences
    const hasEquivalentCompleted = allSubjects.some((s) => {
      const sCode = s.code || s.subject?.code || ''
      const equivs = s.equivalenceCodes || s.equivalences || []
      return (
        completedSubjectCodes.includes(sCode) && equivs.includes(preReqCode)
      )
    })

    if (hasEquivalentCompleted) {
      continue
    }

    // Check if the prerequisite subject itself lists a completed subject in its equivalences
    const prereqSubject = allSubjects.find(
      (s) => (s.code || s.subject?.code) === preReqCode,
    )
    const prereqEquivs = prereqSubject
      ? prereqSubject.equivalenceCodes || prereqSubject.equivalences || []
      : []
    const hasCompletedEquivalent = prereqEquivs.some((eqCode) =>
      completedSubjectCodes.includes(eqCode),
    )

    if (hasCompletedEquivalent) {
      continue
    }

    missing.push(preReqCode)
  }
  return missing
}
