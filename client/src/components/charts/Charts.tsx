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
  ArcElement
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

import { AuthContext } from '../../contexts/AuthContext';
import { Project, ChartOneData, ChartTwoData, ChartThreeData } from '../../types/types';
import { fetchAllProjects } from '../../dbOperations/projectOperations'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Charts = () => {

  const userContext = useContext(AuthContext);

  const [projects, setProjects] = useState<Project[]>([]);
  const [chartOneData, setChartOneData] = useState<ChartOneData>();
  const [chartTwoData, setChartTwoData] = useState<ChartTwoData>();
  const [chartThreeData, setChartThreeData] = useState<ChartThreeData>();

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
        switch (ticket.priority) {
          case 'Low':
            low++;
            break;
          case 'Medium':
            medium++;
            break;
          case 'High':
            high++;
            break;
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

  useEffect(() => {
    let open: number = 0;
    let inProcess: number = 0;
    let closed: number = 0;
    projects.forEach(project => {
      project.tickets.forEach(ticket => {
        switch (ticket.status) {
          case 'Open':
            open++;
            break;
          case 'In Process':
            inProcess++;
            break;
          case 'Closed':
            closed++;
            break;
        }
      })
    })
    setChartTwoData({
      open: open,
      inProcess: inProcess,
      closed: closed
    })
  }, [projects]);

  useEffect(() => {
    let lows: number = 0;
    let mediums: number = 0;
    let highs: number = 0;
    projects.forEach(project => {
      project.tickets.forEach(ticket => {
        if (ticket.solver === userContext?.activeUser?.name) {
          switch (ticket.priority) {
            case 'Low':
              lows++;
              break;
            case 'Medium':
              mediums++;
              break;
            case 'High':
              highs++;
              break;
          }
        }
      })
    })
    setChartThreeData({
      lows: lows,
      mediums: mediums,
      highs: highs
    })
  }, [projects, userContext])

  return (
    <div className='inner-content'>
      <Grid 
        container
        sx={{ height: 100}}
        >
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
                      backgroundColor: 'rgb(0, 255, 0)'
                    },
                    {
                      label: chartOneData?.labels[1],
                      data: [...chartOneData!.tickets!.mediums],
                      backgroundColor: 'rgb(0, 0, 255)'
                    },
                    {
                      label: chartOneData?.labels[2],
                      data: [...chartOneData!.tickets!.highs],
                      backgroundColor: 'rgb(255, 0, 0)'
                    },
                  ]
                }} />}
            </Paper>
            {userContext?.activeUser?.role !== 'Admin' &&
            <Paper elevation={10} sx={{ padding: 2 }}>
              <Typography
                variant='h5'
                fontWeight={600}
                textAlign="center"
                sx={{ marginBottom: 2 }}
                >
                My Tickets by Priority
              </Typography>
              <Pie 
                data={{
                  labels: [
                    'Low',
                    'Medium',
                    'High'
                  ],
                  datasets: [{
                    data: [chartThreeData?.lows, chartThreeData?.mediums, chartThreeData?.highs],
                    backgroundColor: [
                      'rgb(255, 0, 0)',
                      'rgb(0, 0, 255)',
                      'rgb(0, 255, 0)'
                    ],
                    hoverOffset: 4
                  }]
                }}
              />
            </Paper>}
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
              <Typography
                variant='h5'
                fontWeight={600}
                textAlign="center"
                sx={{ marginBottom: 2 }}
                >
                Tickets by Status
              </Typography>
              <Pie 
                data={{
                  labels: [
                    'Open',
                    'In Process',
                    'Closed'
                  ],
                  datasets: [{
                    data: [chartTwoData?.open, chartTwoData?.inProcess, chartTwoData?.closed],
                    backgroundColor: [
                      'rgb(255, 0, 0)',
                      'rgb(0, 0, 255)',
                      'rgb(0, 255, 0)'
                    ],
                    hoverOffset: 4
                  }]
                }}
              />
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
            
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}

export default Charts;