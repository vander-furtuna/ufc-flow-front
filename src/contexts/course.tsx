'use client'

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import { getCourseByIdentifierAction } from '@/features/course/services/actions'
import type { Course, CurriculumStructure, Subject } from '@/types/course'
import { normalizeWords } from '@/utils/normalize-words'

import { useFilter } from './filter'
import { useRouter } from 'next/navigation'

type CourseContextType = {
  courses: Course[]
  selectedCourse: Course | null
  selectedCurriculum: CurriculumStructure | null
  selectedSubjects: Subject[]
  filteredSubjects: Subject[]
  selectedSubject: Subject | null
  isCourseLoading: boolean
  selectCourseBySlug: (
    courseSlug: string,
    curriculumSlug?: string,
  ) => Promise<void>
  selectCurriculumBySlug: (curriculumSlug: string) => void
  setSelectedSubject: (subject: Subject | null) => void
  handleSelect: (props: HandleSelectProps) => Promise<void>
  handleSelectCurriculum: (props: {
    curriculumSlug: string
    courseSlug: string
  }) => Promise<void>
}

type HandleSelectProps = {
  courseSlug: string
  curriculumSlug: string
  subjectCode: string
}

function normalizeCurriculum(
  curriculum: CurriculumStructure,
): CurriculumStructure {
  const branches = curriculum.branches || curriculum.branchs || []
  const subjects = (curriculum.subjects || []).map((s) => {
    const code = s.code || s.subject?.code || ''
    const name = s.name || s.subject?.name || ''
    const slug = s.slug || s.subject?.slug || ''
    const branchIds = s.branchIds || s.branch || []
    const prerequisiteCodes = s.prerequisiteCodes || s.prerequisites || []
    const equivalenceCodes = s.equivalenceCodes || s.equivalences || []
    const corequisiteCodes = s.corequisiteCodes || s.corequisites || []

    return {
      ...s,
      code,
      name,
      slug,
      branchIds,
      prerequisiteCodes,
      equivalenceCodes,
      corequisiteCodes,
      branch: branchIds,
      prerequisites: prerequisiteCodes,
      equivalences: equivalenceCodes,
      corequisites: corequisiteCodes,
    }
  })

  return {
    ...curriculum,
    branches,
    branchs: branches,
    subjects,
  }
}

const courseContext = createContext<CourseContextType>({} as CourseContextType)

export function CourseProvider({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const {
    branchFilter,
    natureFilter,
    normalizedQueryFilter,
    semesterFilter,
    durationFilter,
  } = useFilter()

  const [courses] = useState<Course[]>([])
  const [isCourseLoading, setIsCourseLoading] = useState(true)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [selectedCurriculum, setSelectedCurriculum] =
    useState<CurriculumStructure | null>(null)
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([])
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)

  const router = useRouter()

  const fetchCourse = useCallback(
    async (courseSlug: string, curriculumSlug?: string) => {
      setIsCourseLoading(true)
      try {
        const res = await getCourseByIdentifierAction(courseSlug)
        if (res.data) {
          const rawCourse = res.data as unknown as Course
          const normalizedStructures = (
            rawCourse.curriculumStructures || []
          ).map(normalizeCurriculum)
          const course: Course = {
            ...rawCourse,
            curriculumStructures: normalizedStructures,
          }
          setSelectedCourse(course)

          const targetSlug = curriculumSlug
          const curriculum =
            (targetSlug
              ? course.curriculumStructures.find((c) => c.slug === targetSlug)
              : null) ||
            course.curriculumStructures.find((c) => c.isCurrent) ||
            course.curriculumStructures[0] ||
            null

          setSelectedCurriculum(curriculum)
          setSelectedSubjects(curriculum ? curriculum.subjects : [])
        } else {
          setSelectedCourse(null)
          setSelectedCurriculum(null)
          setSelectedSubjects([])
        }
      } catch (error) {
        console.error('Error fetching course:', error)
        setSelectedCourse(null)
        setSelectedCurriculum(null)
        setSelectedSubjects([])
      } finally {
        setIsCourseLoading(false)
      }
    },
    [],
  )

  const selectCourseBySlug = useCallback(
    async (courseSlug: string, curriculumSlug?: string) => {
      if (selectedCourse?.slug === courseSlug) {
        if (curriculumSlug && selectedCurriculum?.slug !== curriculumSlug) {
          const curriculum = selectedCourse.curriculumStructures.find(
            (c) => c.slug === curriculumSlug,
          )
          if (curriculum) {
            setSelectedCurriculum(curriculum)
            setSelectedSubjects(curriculum.subjects)
          }
        }
        setIsCourseLoading(false)
        return
      }

      await fetchCourse(courseSlug, curriculumSlug)
    },
    [selectedCourse, selectedCurriculum, fetchCourse],
  )

  const selectCurriculumBySlug = useCallback(
    (slug: string) => {
      if (selectedCourse) {
        const curriculum = selectedCourse.curriculumStructures.find(
          (c) => c.slug === slug,
        )
        if (curriculum) {
          setSelectedCurriculum(curriculum)
          setSelectedSubjects(curriculum.subjects)
        }
        setIsCourseLoading(false)
      }
    },
    [selectedCourse],
  )

  const handleSelect = useCallback(
    async ({ courseSlug, curriculumSlug, subjectCode }: HandleSelectProps) => {
      let currentCourse = selectedCourse
      let currentCurriculum = selectedCurriculum

      if (currentCourse?.slug !== courseSlug) {
        setIsCourseLoading(true)
        const res = await getCourseByIdentifierAction(courseSlug)
        if (res.data) {
          const rawCourse = res.data as unknown as Course
          currentCourse = {
            ...rawCourse,
            curriculumStructures: (rawCourse.curriculumStructures || []).map(
              normalizeCurriculum,
            ),
          }
          setSelectedCourse(currentCourse)
        }
      }

      if (currentCourse) {
        currentCurriculum =
          currentCourse.curriculumStructures.find(
            (c) => c.slug === curriculumSlug,
          ) || null
        setSelectedCurriculum(currentCurriculum)
        setSelectedSubjects(currentCurriculum ? currentCurriculum.subjects : [])

        if (currentCurriculum) {
          const subject = currentCurriculum.subjects.find(
            (s) => (s.code || s.subject?.code) === subjectCode,
          )
          if (subject) {
            setSelectedSubject(subject)
          } else {
            router.push('/')
          }
        }
      }
      setIsCourseLoading(false)
    },
    [selectedCourse, selectedCurriculum, router],
  )

  const handleSelectCurriculum = useCallback(
    async ({
      curriculumSlug,
      courseSlug,
    }: {
      curriculumSlug: string
      courseSlug: string
    }) => {
      await fetchCourse(courseSlug, curriculumSlug)
    },
    [fetchCourse],
  )

  const filteredSubjects = useMemo(() => {
    if (!selectedCurriculum) return []

    const hasQuery = normalizedQueryFilter.length > 0
    const normalizedQueryLower = normalizedQueryFilter.toLowerCase()

    const hasDurationFilter = durationFilter.length > 0
    const hasBranchFilter = branchFilter.length > 0
    const hasSemesterFilter = semesterFilter.length > 0
    const hasNatureFilter = natureFilter.length > 0

    const matchesFilters = (subject: Subject) => {
      const name = subject.name || subject.subject?.name || ''
      const code = subject.code || subject.subject?.code || ''
      const branchIds = subject.branchIds || subject.branch || []

      if (hasQuery) {
        const normalizedName = normalizeWords(name)
        const codeLower = code.toLowerCase()

        if (
          !normalizedName.includes(normalizedQueryFilter) &&
          !codeLower.includes(normalizedQueryLower)
        ) {
          return false
        }
      }

      if (hasDurationFilter && !durationFilter.includes(subject.duration)) {
        return false
      }

      if (
        hasBranchFilter &&
        !branchFilter.some((branchId) => branchIds.includes(branchId))
      ) {
        return false
      }

      if (hasSemesterFilter && !semesterFilter.includes(subject.semester)) {
        return false
      }

      if (hasNatureFilter && !natureFilter.includes(subject.nature)) {
        return false
      }

      return true
    }

    return selectedCurriculum.subjects.filter(matchesFilters)
  }, [
    selectedCurriculum,
    normalizedQueryFilter,
    durationFilter,
    branchFilter,
    semesterFilter,
    natureFilter,
  ])

  const value = useMemo(
    () => ({
      courses,
      selectedCourse,
      selectedCurriculum,
      selectedSubjects,
      selectedSubject,
      filteredSubjects,
      isCourseLoading,
      selectCourseBySlug,
      selectCurriculumBySlug,
      setSelectedSubject,
      handleSelect,
      handleSelectCurriculum,
    }),
    [
      courses,
      selectedCourse,
      selectedCurriculum,
      selectedSubjects,
      selectedSubject,
      filteredSubjects,
      isCourseLoading,
      selectCourseBySlug,
      selectCurriculumBySlug,
      setSelectedSubject,
      handleSelect,
      handleSelectCurriculum,
    ],
  )

  return (
    <courseContext.Provider value={value}>{children}</courseContext.Provider>
  )
}

export function useCourse() {
  const context = useContext(courseContext)

  if (!context) {
    throw new Error('useCourse must be used within a CourseProvider')
  }

  return context
}
