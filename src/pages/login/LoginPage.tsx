import React from 'react'
import { Box, TextField, Button, Typography, Alert, CircularProgress } from '@mui/material'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { post } from '../../api'
import { setAuthToken } from '../../api/client'
import { Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'

type Values = {
  email: string
  password: string
}

const schema = Yup.object({
  email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
  password: Yup.string().min(6, 'Mật khẩu ít nhất 6 ký tự').required('Mật khẩu là bắt buộc'),
})

export default function LoginPage() {
  const navigate = useNavigate()
  const initialValues: Values = { email: '', password: '' }
  const [error, setError] = React.useState<string | null>(null)

  async function handleSubmit(values: Values, helpers: FormikHelpers<Values>) {
    setError(null)
    helpers.setSubmitting(true)
    try {
      const res = await post('/auth/login', values)
      if (res.ok) {
        const token = (res.data as any)?.token
        if (token) {
          localStorage.setItem('token', token)
          setAuthToken(token)
        }
        navigate('/')
      } else {
        const msg = (res.error && (res.error.message || res.error)) || 'Đăng nhập thất bại.'
        setError(typeof msg === 'string' ? msg : JSON.stringify(msg))
      }
    } catch (err: any) {
      setError(err?.message || 'Lỗi kết nối')
    } finally {
      helpers.setSubmitting(false)
    }
  }

  return (
    <Box maxWidth={480} mx="auto" mt={6}>
      <Typography variant="h5" mb={2} fontWeight={700}>
        Đăng nhập
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
        {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
          <form onSubmit={e => { e.preventDefault(); /* handled by Formik submit */ }}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email ? errors.email : ''}
                fullWidth
              />

              <TextField
                label="Mật khẩu"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password ? errors.password : ''}
                fullWidth
              />

              <Button
                type="button"
                variant="contained"
                disabled={isSubmitting}
                size="large"
                onClick={() => (document.querySelector('form') as HTMLFormElement)?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}
              >
                {isSubmitting ? <CircularProgress size={20} color="inherit" /> : 'Đăng nhập'}
              </Button>

              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body2">Chưa có tài khoản?</Typography>
                <Button component={RouterLink} to="/register" size="small">
                  Đăng ký
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  )
}
