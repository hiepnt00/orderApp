import React from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import MuiLink from '@mui/material/Link'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Link as RouterLink, useLocation } from 'react-router-dom'

type Crumb = { label: string; to?: string }

export default function AppBreadcrumbs({
  items,
  mapping,
}: {
  items?: Crumb[]
  mapping?: Record<string, string>
}) {
  const location = useLocation()

  const computed: Crumb[] = React.useMemo(() => {
    if (items && items.length) return items

    const parts = location.pathname.split('/')
      .filter(Boolean)

    const crumbs: Crumb[] = [{ label: 'Trang chủ', to: '/' }]

    let acc = ''
    parts.forEach((p, i) => {
      acc += '/' + p
      const label = mapping?.[p] || decodeURIComponent(p).replace(/-/g, ' ')
      // Only last segment has no link
      crumbs.push({ label: label.charAt(0).toUpperCase() + label.slice(1), to: i < parts.length - 1 ? acc : undefined })
    })

    return crumbs
  }, [items, location.pathname, mapping])

  return (
    <div className="breadcrumb-wrap">
      <Breadcrumbs className="app-breadcrumbs" aria-label="breadcrumb" separator={<ChevronRightIcon fontSize="small" />}>
      {computed.map((c, idx) => {
        const isLast = idx === computed.length - 1
        if (isLast || !c.to) {
          return (
            <Typography key={idx} color="text.primary">
              {c.label}
            </Typography>
          )
        }
        return (
          <MuiLink
            key={idx}
            component={RouterLink}
            to={c.to}
            underline="hover"
            color="inherit"
          >
            {c.label}
          </MuiLink>
        )
      })}
      </Breadcrumbs>
    </div>
  )
}
