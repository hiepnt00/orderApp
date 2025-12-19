import { Box, Button, CircularProgress, Paper, Typography } from '@mui/material'
import AppBreadcrumbs from '../components/AppBreadcrumbs'
import React from 'react'
import apiClient from '../api'

export default function TestApiPage() {
  const [data, setData] = React.useState<any | null>(null)
  const [error, setError] = React.useState<any | null>(null)
  const [loading, setLoading] = React.useState(false)

  const fetchPost = () => {
    setLoading(true)
    setError(null)
    setData(null) 
    apiClient
      .get('/posts/1')
      .then(d => setData(d))
      .catch(e => setError(e))
      .finally(() => setLoading(false))
  }

  const fetchList = () => {
    setLoading(true)
    setError(null)
    setData(null)
    // example using .then()/catch()
    apiClient
      .get('/posts')
      .then(d => setData(d))
      .catch(e => setError(e))
      .finally(() => setLoading(false))
  }

  const createPost = async () => {
    setLoading(true)
    setError(null)
    setData(null)
    // use default post (returns data) and handle with then/catch
    apiClient
      .post('/posts', { title: 'Hello from test page', body: 'body', userId: 1 })
      .then(d => setData(d))
      .catch(e => setError(e))
      .finally(() => setLoading(false))
  }

  return (
    <Box>
      <AppBreadcrumbs items={[{ label: 'Trang chủ', to: '/' }, { label: 'Test API' }]} />
      <Typography variant="h5" gutterBottom>
        Test API (axios helpers)
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <Button variant="contained" onClick={fetchPost} disabled={loading}>
          Fetch Post 1
        </Button>
        <Button variant="outlined" onClick={fetchList} disabled={loading}>
          Fetch Posts List
        </Button>
        <Button variant="outlined" onClick={createPost} disabled={loading}>
          Create Post
        </Button>
      </Box>

      {loading && <CircularProgress />}

      {error && (
        <Paper sx={{ p: 2, mt: 2, backgroundColor: '#fff4f4' }}>
          <Typography color="error">Error: {String(error?.status || error?.message || error)}</Typography>
        </Paper>
      )}

      {data && (
        <Paper sx={{ p: 2, mt: 2, whiteSpace: 'pre-wrap' }}>
          <Typography component="pre">{JSON.stringify(data, null, 2)}</Typography>
        </Paper>
      )}
    </Box>
  )
}
