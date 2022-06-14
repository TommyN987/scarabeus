import { useContext, useState, useEffect } from 'react';

import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from '@mui/material/Typography';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { AuthContext } from '../../contexts/AuthContext';
import { Project, ChartOneData } from '../../types/types';
import { fetchAllProjects } from '../../dbOperations/projectOperations'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Charts = () => {

  const userContext = useContext(AuthContext);

  const [projects, setProjects] = useState<Project[]>([]);
  const [chartOneData, setChartOneData] = useState<ChartOneData>()


  useEffect(() => {
    fetchAllProjects()
      .then(projects => setProjects(projects))
  }, [])

  useEffect(() => {
    const projectsToAdd: string[] = [];
    const labelsToAdd: string[] = ['Low', 'Medium', "High"];
    const lows: number[] = [];
    const mediums: number[] = [];
    const highs: number[] = [];
    projects.forEach(project => {
      projectsToAdd.push(project.title);
      let low: number = 0;
      let medium: number = 0;
      let high: number = 0;
      project.tickets.forEach(ticket => {
        if (ticket.priority === 'Low') {
          low++
        } else if (ticket.priority === 'Medium') {
          medium++
        } else if (ticket.priority === 'High') {
          high++
        }
      })
      lows.push(low);
      mediums.push(medium);
      highs.push(high);
    })
    setChartOneData({
      projects: projectsToAdd,
      labels: labelsToAdd,
      tickets: {
        lows: [...lows],
        mediums: [...mediums],
        highs: [...highs]
      }
    })
  }, [projects]);

  return (
    <div className='inner-content'>
      <Grid container>
        <Grid item xs={12} lg={6}>
          <Container
            sx={{
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}
            >
            <Paper elevation={10} sx={{ padding: 2 }}>
              <Typography
                variant='h5'
                fontWeight={600}
                textAlign="center"
                sx={{ marginBottom: 2 }}
                >
                Tickets by Project and Priority
              </Typography>
              {chartOneData && 
              <Bar 
                options={{
                  responsive: true,
                  scales: {
                    x: { stacked: true },
                    y: { stacked: true },
                  },
                }} 
                data={{
                  labels: chartOneData?.projects,
                  datasets: [
                    {
                      label: chartOneData?.labels[0],
                      data: [...chartOneData!.tickets!.lows],
                      backgroundColor: 'rgb(255, 99, 132)'
                    },
                    {
                      label: chartOneData?.labels[1],
                      data: [...chartOneData!.tickets!.mediums],
                      backgroundColor: 'rgb(75, 192, 192)'
                    },
                    {
                      label: chartOneData?.labels[2],
                      data: [...chartOneData!.tickets!.highs],
                      backgroundColor: 'rgb(53, 162, 235)'
                    },
                  ]
                }} />}
            </Paper>
          </Container>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Container
            sx={{
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}
            >
            <Paper elevation={10} sx={{ padding: 2 }}>
              
            </Paper>
          </Container>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Container
            sx={{
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}
            >
            <Paper elevation={10} sx={{ padding: 2 }}>
              
            </Paper>
          </Container>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Container
            sx={{
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}
            >
            <Paper elevation={10} sx={{ padding: 2 }}>
              
            </Paper>
          </Container>
        </Grid>
      </Grid>

      
    </div>
  );
}

export default Charts;