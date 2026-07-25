import type { Subject } from '@/types/course'

export const getEquivalentCodes = (
  code: string,
  allSubjects: Subject[] = [],
): Set<string> => {
  const result = new Set<string>([code])
  const sub = allSubjects.find((s) => s.code === code)

  if (sub?.equivalences) {
    for (const eq of sub.equivalences) {
      result.add(eq)
    }
  }

  for (const s of allSubjects) {
    if (s.equivalences?.includes(code)) {
      result.add(s.code)
      if (s.equivalences) {
        for (const eq of s.equivalences) {
          result.add(eq)
        }
      }
    }
  }

  return result
}

export const isPreReqCompleted = (
  preReqCode: string,
  completedSubjectCodes: string[],
  allSubjects: Subject[] = [],
): boolean => {
  const equivs = getEquivalentCodes(preReqCode, allSubjects)
  return completedSubjectCodes.some((completed) => equivs.has(completed))
}

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

  const unmetPrereqs = subject.prerequisites.filter(
    (code) => !isPreReqCompleted(code, completedSubjectCodes, allSubjects),
  )

  if (unmetPrereqs.length === 0) {
    return []
  }

  const groups: string[][] = []

  for (const code of unmetPrereqs) {
    const codeEquivs = getEquivalentCodes(code, allSubjects)
    const existingGroup = groups.find((group) =>
      group.some((gCode) => codeEquivs.has(gCode)),
    )

    if (existingGroup) {
      if (!existingGroup.includes(code)) {
        existingGroup.push(code)
      }
    } else {
      groups.push([code])
    }
  }

  return groups.map((group) => group.join(' ou '))
}
