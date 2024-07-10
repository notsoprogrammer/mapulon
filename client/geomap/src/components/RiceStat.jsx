// import React, { useEffect, useRef } from 'react';
// import { Box, Button, Typography } from '@mui/material';


// const { tableau } = window;

// const RiceStat = () => {
//   const tableauVizRef = useRef(null);

//   useEffect(() => {
//     const initViz = () => {
//       const vizUrl = 'https://prod-apsoutheast-a.online.tableau.com/t/geomapsamar/views/Agri-RiceProgram/CatbRiceProg_Adjusted';
      
//       const options = {
//         hideTabs: true,
//         hideToolbar: true,
//         onFirstInteractive: () => {
//           console.log('Tableau dashboard is interactive');
//         },
//       };
      
//       new tableau.Viz(tableauVizRef.current, vizUrl, options);
//     };
    
//     initViz();
    

//     return () => {
//       if (tableauVizRef.current) {
//         tableauVizRef.current.dispose();
//       }
//     };
//   }, []);
  
//   return (

//     <Box
//   height="100vh"
//   width="100%"
//   sx={{
//     backgroundColor: 'transparent',
//     display: 'flex', 
//     justifyContent: 'center', 
//     alignItems: 'center', 
//   }}
// >
//   <div 
//     ref={tableauVizRef}
//     style={{
//       height: '100vh', 
//       width: '100%',
//       margin: '0 auto',
//       backgroundColor: 'transparent', 
//     }}
//   />
// </Box>

//   );
// };

// export default RiceStat;

import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';

const { tableau } = window;

const RiceStat = () => {
  const tableauVizRef = useRef(null);
  const [riceDashboardLink, setRiceDashboardLink] = useState('');

  // Set up axios to use cookies
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchDashboardLink = async () => {
      try {
        const { data } = await axios.get('/api/dashboard/links');
        setRiceDashboardLink(data.riceDashboardLink);
      } catch (error) {
        console.error('Error fetching dashboard link:', error);
      }
    };

    fetchDashboardLink();
  }, []);

  useEffect(() => {
    if (riceDashboardLink) {
      const initViz = () => {
        const vizUrl = riceDashboardLink;
        const options = {
          hideTabs: true,
          hideToolbar: true,
          onFirstInteractive: () => {
            console.log('Tableau dashboard is interactive');
          }
        };

        new tableau.Viz(tableauVizRef.current, vizUrl, options);
      };

      initViz();

      return () => {
        if (tableauVizRef.current) {
          tableauVizRef.current.dispose();
        }
      };
    }
  }, [riceDashboardLink]);

  return (
    <Box
      height="100vh"
      width="100%"
      sx={{
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div
        ref={tableauVizRef}
        style={{
          height: '100vh',
          width: '100%',
          margin: '0 auto',
          backgroundColor: 'transparent'
        }}
      />
    </Box>
  );
};

export default RiceStat;
