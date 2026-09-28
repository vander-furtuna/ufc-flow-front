import { scrapeRUMenuWeek } from '@/lib/ru-scraper'
import type { CampusId } from '@/types/ru'

export const dynamic = 'force-dynamic'

export async function GET(req: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(req.url)
    const campusParam = searchParams.get('campus') || '4'
    const dateParam = searchParams.get('date') || undefined

    const campusId = (Number(campusParam) || 4) as CampusId

    const weekMenu = await scrapeRUMenuWeek(campusId, dateParam)

    return Response.json(weekMenu, {
      headers: {
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
      },
    })
  } catch (err: unknown) {
    const error = err as Error
    return Response.json(
      {
        error:
          error?.message || 'Erro interno ao consultar cardápio semanal do RU',
      },
      { status: 500 },
    )
  }
}
