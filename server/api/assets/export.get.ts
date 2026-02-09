import { defineEventHandler, getQuery, getHeader, setResponseHeader, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const format = query.export_format as string || 'csv'
  const authToken = getHeader(event, 'authorization')
  
  try {
    const backendUrl = process.env.API_URL || 'http://localhost:8000/api'
    
    const params = new URLSearchParams()
    if (query.search) params.append('search', String(query.search))
    if (query.status) params.append('status', String(query.status))
    if (query.category) params.append('category', String(query.category))
    if (query.condition) params.append('condition', String(query.condition))
    params.append('limit', '100')

    const response = await fetch(`${backendUrl}/assets/assets/?${params.toString()}`, {
      headers: {
        'Authorization': authToken || '',
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`)
    }

    const assets = await response.json()
    
    if (format === 'csv') {
      return generateCSV(assets, event)
    } else {
      return generateCSV(assets, event)
    }
  } catch (error: any) {
    console.error('Export error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to export assets',
      data: { detail: error.message }
    })
  }
})

function generateCSV(assets: any[], event: any) {
  const headers = ['Asset Code', 'Name', 'Category', 'Status', 'Condition', 'Property', 'Space', 'Purchase Price', 'Purchase Date', 'Assigned To']
  
  const rows = assets.map((asset: any) => [
    asset.asset_code || '',
    asset.name || '',
    asset.category_details?.name || '',
    asset.status || '',
    asset.condition || '',
    asset.property_details?.name || '',
    asset.space_details?.code || '',
    asset.purchase_price || 0,
    asset.purchase_date || '',
    asset.assigned_to_details ? `${asset.assigned_to_details.first_name} ${asset.assigned_to_details.last_name}` : ''
  ])

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map((cell: string) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
  ].join('\n')

  setResponseHeader(event, 'Content-Type', 'text/csv')
  setResponseHeader(event, 'Content-Disposition', `attachment; filename="assets_export_${new Date().toISOString().split('T')[0]}.csv"`)
  
  return csvContent
}
