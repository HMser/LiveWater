const express = require('express');
const ffmpeg = require('fluent-ffmpeg');
const app = express();
const port = 3000;

app.get('/stream', (req, res) => {
  // Input stream URL
  const inputUrl = 'https://prod-sports-north-gm.jiocinema.com/bpk-tv/Sports18_1_HD_voot_MOB/Fallback/index.m3u8';

  // Command to add watermark
  ffmpeg()
    .input(inputUrl)
    .inputOptions(['-re']) // Real-time mode
    .complexFilter([
      {
        filter: 'drawtext',
        options: {
          text: 'StatusArea.Link',
          x: '10',
          y: '10',
          fontsize: '24',
          fontcolor: 'white',
        },
      },
    ])
    .outputFormat('mpegts')
    .pipe(res, { end: true });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
      
