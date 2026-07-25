import type { Branch, Subject } from '@/types/course'
import type { NodeData } from '@/types/node'
import { Node, Edge } from '@xyflow/react'

export const COLORS = {
  COMPULSORY: '#0f172a', // Slate 900 (mais escuro para contraste no dark mode)
  OPTIONAL: '#94a3b8', // Slate 400
}

export const getGradientColor = (baseColor: string) => {
  return `linear-gradient(135deg, ${baseColor} 0%, ${baseColor}cc 100%)`
}

export const getBranchColor = (
  branchIds: string[],
  branches: Branch[],
): string | undefined => {
  if (branchIds.length === 0) return undefined
  const branch = branches.find((b) => b.id === branchIds[0])
  return branch ? branch.color : undefined
}

export const getBranchName = (
  branchIds: string[],
  branches: Branch[],
): string | undefined => {
  if (branchIds.length === 0) return undefined
  const branch = branches.find((b) => b.id === branchIds[0])
  return branch ? branch.name : undefined
}

interface GraphBuildResult {
  nodes: Node<NodeData>[]
  edges: Edge[]
}

const findAncestors = (
  subject: Subject,
  allSubjects: Subject[],
  visited: Set<string> = new Set(),
  depth: number = 0,
  map: Map<string, { subject: Subject; depth: number }>,
) => {
  if (visited.has(subject.id)) return
  visited.add(subject.id)
  const existing = map.get(subject.id)
  if (!existing || depth < existing.depth) {
    map.set(subject.id, { subject, depth })
  }
  const prereqs = subject.prerequisiteCodes || subject.prerequisites || []
  prereqs.forEach((prereqCode) => {
    const prereq = allSubjects.find(
      (s) => (s.code || s.subject?.code) === prereqCode || s.id === prereqCode,
    )
    if (prereq) findAncestors(prereq, allSubjects, visited, depth - 1, map)
  })
}

const findDescendants = (
  subject: Subject,
  allSubjects: Subject[],
  visited: Set<string> = new Set(),
  depth: number = 0,
  map: Map<string, { subject: Subject; depth: number }>,
) => {
  if (visited.has(subject.id)) return
  visited.add(subject.id)
  const existing = map.get(subject.id)
  if (!existing || depth > existing.depth) {
    map.set(subject.id, { subject, depth })
  }
  const subjCode = subject.code || subject.subject?.code || ''
  const unlocked = allSubjects.filter((s) => {
    const pCodes = s.prerequisiteCodes || s.prerequisites || []
    return pCodes.includes(subjCode) || pCodes.includes(subject.id)
  })
  unlocked.forEach((child) =>
    findDescendants(child, allSubjects, visited, depth + 1, map),
  )
}

export const generateDependencyGraph = (
  centerSubjectId: string,
  allSubjects: Subject[],
): GraphBuildResult => {
  const centerSubject = allSubjects.find((s) => s.id === centerSubjectId)
  if (!centerSubject) return { nodes: [], edges: [] }

  const nodeMap = new Map<string, { subject: Subject; depth: number }>()
  findAncestors(centerSubject, allSubjects, new Set(), 0, nodeMap)
  findDescendants(centerSubject, allSubjects, new Set(), 0, nodeMap)

  const nodes: Node<NodeData>[] = []
  const edges: Edge[] = []
  const depthGroups = new Map<number, Subject[]>()
  nodeMap.forEach(({ subject, depth }) => {
    if (!depthGroups.has(depth)) depthGroups.set(depth, [])
    depthGroups.get(depth)?.push(subject)
  })

  const X_SPACING = 350
  const Y_SPACING = 150

  depthGroups.forEach((groupSubjects, depth) => {
    groupSubjects.sort((a, b) => {
      const codeA = a.code || a.subject?.code || ''
      const codeB = b.code || b.subject?.code || ''
      return codeA.localeCompare(codeB)
    })
    const groupHeight = groupSubjects.length * Y_SPACING
    const startY = -(groupHeight / 2) + Y_SPACING / 2

    groupSubjects.forEach((subj, index) => {
      const isCenter = subj.id === centerSubjectId
      const code = subj.code || subj.subject?.code || ''
      const name = subj.name || subj.subject?.name || ''
      const branchIds = subj.branchIds || subj.branch || []

      nodes.push({
        id: subj.id,
        type: 'customSubject',
        position: { x: depth * X_SPACING, y: startY + index * Y_SPACING },
        data: {
          label: name,
          code: code,
          type: subj.type,
          nature: subj.nature,
          branchIds: branchIds,
          isPrerequisite: depth < 0,
          isUnlocked: depth > 0,
          isSelected: isCenter,
        },
        draggable: false,
      })

      const children = allSubjects.filter((s) => {
        const pCodes = s.prerequisiteCodes || s.prerequisites || []
        return (
          (pCodes.includes(code) || pCodes.includes(subj.id)) &&
          nodeMap.has(s.id)
        )
      })
      children.forEach((child) => {
        edges.push({
          id: `${subj.id}-${child.id}`,
          source: subj.id,
          target: child.id,
          type: 'smoothstep',
          style: { stroke: '#cbd5e1', strokeWidth: 2 },
        })
      })
    })
  })

  return { nodes, edges }
}
