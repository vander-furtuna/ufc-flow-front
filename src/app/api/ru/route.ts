import { randomUUID } from 'node:crypto'
import { load } from 'cheerio'
import type {
  CampusId,
  Meal,
  MealCategory,
  MenuItem,
  MealType,
  RUMenuDay,
} from '@/types/ru'

export const dynamic = 'force-dynamic'

const BASE_URL = 'https://ufc2012.ufc.br/restaurante/cardapio'

export async function GET(req: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(req.url)
    const campusParam = searchParams.get('campus') || '4'
    const dateParam = searchParams.get('date') // YYYY-MM-DD (optional)

    const campusId = (Number(campusParam) || 4) as CampusId

    // Monta URL de busca
    const targetUrl = dateParam
      ? `${BASE_URL}/${campusId}/${dateParam}`
      : `${BASE_URL}/${campusId}`

    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml',
      },
      next: { revalidate: 1800 },
    })

    if (!response.ok) {
      return Response.json(
        {
          error: `Falha ao acessar o portal da UFC (Status ${response.status})`,
        },
        { status: response.status },
      )
    }

    const html = await response.text()
    const $ = load(html)

    const container = $('.c-cardapios')
    if (!container.length) {
      return Response.json(
        {
          error:
            'Não foi possível encontrar a área de cardápios no site da UFC.',
        },
        { status: 502 },
      )
    }

    const campusTitle =
      container.find('h2').text().trim() ||
      `Restaurante Universitário (${campusId})`

    // Navegação de datas
    const tableNav = container.find('table[summary*="Cardápio"], table').first()

    const prevA = tableNav.find(
      'thead th.prev-box a, thead th.prev a, thead a.prev',
    )
    const prevHref = prevA.attr('href') || ''
    const prevDateMatch = prevHref.match(/\d{4}-\d{2}-\d{2}/)
    const prevDate = prevDateMatch ? prevDateMatch[0] : null
    const prevLabel = prevA.text().trim() || null

    const currentTh = tableNav.find(
      'thead th.atual, thead th:not(.prev-box):not(.next-box):not(.prev):not(.next)',
    )
    const currentLabel = currentTh.first().text().replace(/\s+/g, ' ').trim()

    const nextA = tableNav.find(
      'thead th.next-box a, thead th.next a, thead a.next',
    )
    const nextHref = nextA.attr('href') || ''
    const nextDateMatch = nextHref.match(/\d{4}-\d{2}-\d{2}/)
    const nextDate = nextDateMatch ? nextDateMatch[0] : null
    const nextLabel = nextA.text().trim() || null

    // Mensagem de restaurante fechado ou sem cardápio
    const emptyCell = container.find(
      'tbody td[colspan="3"], tbody td[style*="padding"]',
    )
    const hasEmptyNotice =
      emptyCell.length > 0 &&
      emptyCell.text().includes('Não há cardápio cadastrado')
    const emptyNoticeMessage = hasEmptyNotice
      ? emptyCell.text().replace(/\s+/g, ' ').trim()
      : null

    // Refeições esperadas
    const mealDefinitions: {
      type: MealType
      title: string
      selector: string
    }[] = [
      {
        type: 'desjejum',
        title: 'Desjejum',
        selector: 'table.refeicao.desjejum',
      },
      { type: 'almoco', title: 'Almoço', selector: 'table.refeicao.almoco' },
      { type: 'jantar', title: 'Jantar', selector: 'table.refeicao.jantar' },
    ]

    const meals: Record<MealType, Meal | null> = {
      desjejum: null,
      almoco: null,
      jantar: null,
    }

    for (const def of mealDefinitions) {
      const table = container.find(def.selector)
      if (!table.length) {
        meals[def.type] = null
        continue
      }

      const categories: MealCategory[] = []
      let hasAnyItem = false

      table.find('tbody.listras tr.item').each((_, tr) => {
        const $tr = $(tr)
        const categoryName = $tr.find('td').first().text().trim()
        const contentTd = $tr.find('td').last()

        if (!contentTd.text().trim()) {
          return
        }

        const rawHtml = contentTd.html() || ''
        const lines = rawHtml.split(/<br\s*\/?>/i)
        const items: MenuItem[] = []

        for (const line of lines) {
          const $line = load(`<div>${line}</div>`)
          const fullText = $line.text().trim()
          if (!fullText) continue

          const hasGluten =
            !!$line('.gluten').length || /gl[úu]ten/i.test(fullText)
          const hasLactose =
            !!$line('.lactose').length || /lactose/i.test(fullText)

          $line('.gluten, .lactose, .opcao').remove()
          let itemName = $line.text().trim()
          itemName = itemName.replace(/\s*\(\s*Contém\s+[^)]+\)/gi, '').trim()

          if (itemName) {
            hasAnyItem = true
            items.push({
              id: randomUUID(),
              name: itemName,
              hasGluten,
              hasLactose,
            })
          }
        }

        if (items.length > 0) {
          categories.push({
            category: categoryName,
            items,
          })
        }
      })

      meals[def.type] = {
        type: def.type,
        title: def.title,
        isEmpty: !hasAnyItem,
        categories,
      }
    }

    const isClosedOrEmpty =
      hasEmptyNotice ||
      (!meals.desjejum?.categories.length &&
        !meals.almoco?.categories.length &&
        !meals.jantar?.categories.length)

    // Data efetiva
    const resolvedDate = dateParam || new Date().toISOString().split('T')[0]

    const result: RUMenuDay = {
      id: `${campusId}-${resolvedDate}`,
      campusId,
      campusName: campusTitle,
      date: resolvedDate,
      currentLabel: currentLabel || 'Cardápio',
      prevDate,
      prevLabel,
      nextDate,
      nextLabel,
      isClosedOrEmpty,
      emptyMessage: emptyNoticeMessage,
      meals,
      updatedAt: new Date().toISOString(),
    }

    return Response.json(result, {
      headers: {
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
      },
    })
  } catch (err: unknown) {
    const error = err as Error
    return Response.json(
      { error: error?.message || 'Erro interno ao consultar cardápio do RU' },
      { status: 500 },
    )
  }
}
