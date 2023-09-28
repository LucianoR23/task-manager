import { EntryList, Layout, NewEntry } from '@/components'
import { Card, CardHeader, Grid } from '@mui/material'


const Home = () => {

  return (
    <Layout title='Home - Task Manager'>

      <Grid container spacing={ 2 }>

        <Grid item xs={ 12 } sm={ 4 } >
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title='Pending' />
            <NewEntry />
            <EntryList status='pending' />
          </Card>
        </Grid>

        <Grid item xs={ 12 } sm={ 4 } >
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title='In progress' />

              <EntryList status='in-progress' />
          </Card>
        </Grid>

        <Grid item xs={ 12 } sm={ 4 } >
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title='Completed' />

              <EntryList status='finished' />
          </Card>
        </Grid>

      </Grid>
      
    </Layout>
  )
}

export default Home
