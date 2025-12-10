import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2'
    }
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg'
      }
    }
  }
})

export default theme
