import React from 'react';
import MiniPalette from './MiniPalette';
import Grid from '@material-ui/core/Grid';

function App() {
  return (
    <Grid container>
      <Grid item xs={12} sm={4}>
          <MiniPalette/>
      </Grid>
    </Grid>
  );
}

export default App;
