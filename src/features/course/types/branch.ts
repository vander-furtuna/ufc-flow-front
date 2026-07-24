import { BranchType } from './branch-type'

export interface Branch {
  id: string
  name: string
  color: string
  type: BranchType
  parentBranchId?: string | null
  structureId: string
}
