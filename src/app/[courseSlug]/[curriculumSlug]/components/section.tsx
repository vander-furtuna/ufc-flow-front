'use client'

import { useCallback, useEffect } from 'react'

import { CurriculumHeader } from '@/components/curriculum-header'
import { Header } from '@/components/header'
import { useCourse } from '@/contexts/course'
import { useFilter } from '@/contexts/filter'
import { useTools } from '@/contexts/tools'

import { Footer } from './footer'
import { Sidebar } from './sidebar/sidebax'
import { SubjectDiagram } from './subject-diagram'
import { SubjectDiagramSkeleton } from './subject-diagram-skeleton'

type CurriculumProps = {
  params: {
    courseSlug: string
    curriculumSlug: string
  }
}

export function CurriculumSection({ params }: CurriculumProps) {
  const { courseSlug, curriculumSlug } = params

  const {
    selectedCourse,
    selectedCurriculum,
    selectCourseBySlug,
    selectCurriculumBySlug,
    isCourseLoading,
  } = useCourse()

  const { isFiltersLoaded } = useFilter()
  const { isToolsLoaded } = useTools()

  const handleGetSelectedCurriculumBySlug = useCallback(() => {
    if (
      !selectedCourse ||
      selectedCourse.slug !== courseSlug ||
      !selectedCurriculum ||
      selectedCurriculum.slug !== curriculumSlug
    ) {
      selectCourseBySlug(courseSlug, curriculumSlug)
    }
  }, [
    courseSlug,
    curriculumSlug,
    selectedCourse,
    selectedCurriculum,
    selectCourseBySlug,
  ])

  useEffect(() => {
    handleGetSelectedCurriculumBySlug()
  }, [handleGetSelectedCurriculumBySlug])

  return (
    <>
      <section className="@container flex h-full min-h-dvh w-full max-w-5xl flex-col items-center justify-start gap-8 pt-12 pb-24">
        <Header />
        <CurriculumHeader />
        {isCourseLoading || !isFiltersLoaded || !isToolsLoaded ? (
          <SubjectDiagramSkeleton />
        ) : (
          <SubjectDiagram />
        )}
        <Footer />
      </section>
      <Sidebar />
    </>
  )
}
