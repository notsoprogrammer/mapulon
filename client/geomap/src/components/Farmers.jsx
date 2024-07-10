import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';
const { tableau } = window;

const Farmers = () => {
  const tableauVizRef = useRef(null);
  const [links, setLinks] = useState(null);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axios.get('/api/dashboard/links', {
          params: { municipality: 'your-municipality-name' }, // Replace with actual municipality name
          withCredentials: true // Include cookies in the request
        });
        setLinks(response.data);
      } catch (error) {
        console.error('Error fetching dashboard links:', error);
      }
    };

    fetchLinks();
  }, []);

  useEffect(() => {
    if (links) {
      let viz;
      const initViz = () => {
        const vizUrl = links.farmersProfileLink;

        const options = {
          width: '100%',
          height: '100%',
          hideTabs: true,
          hideToolbar: true,
          onFirstInteractive: () => {
            console.log('Tableau dashboard is interactive');
          },
          withCredentials: true // Include credentials in requests
        };

        viz = new tableau.Viz(tableauVizRef.current, vizUrl, options);
      };

      initViz();

      const handleResize = () => {
        if (viz) {
          viz.setFrameSize(undefined, tableauVizRef.current.clientHeight);
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (viz) {
          viz.dispose();
        }
      };
    }
  }, [links]);

  return (
    <Box
      height="100vh"
      width="100%"
      sx={{
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        ref={tableauVizRef}
        style={{
          height: '100vh',
          width: '100%',
          margin: '0 auto',
          backgroundColor: 'transparent',
        }}
      />
    </Box>
  );
};

export default Farmers;
