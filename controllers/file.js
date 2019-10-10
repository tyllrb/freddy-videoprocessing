// const File = require('../models/file');
const VideoProcess = require('../engines/video-process');

exports.process = (req, res) => {
  try {
    const file = req.body.name;
    const id = req.body.id;

    if (!id) return res.json({ error: 'Missing id parameter!' });
    if (!file) return res.json({ error: 'Missing file parameter!' });

    VideoProcess.discover(file)
      .then(results => {
        VideoProcess.convertToMp4(results[0], id)
          .then(id => res.json({ id }))
          .catch(error => res.json({ error }));
      })
      .catch(error => res.json({ error }));
  } catch (error) {
    res.json({ error });
  }
};

exports.status = (req, res) => {
  res.json({ processes: VideoProcess.status() });
};

exports.statusById = (req, res) => {
  const processes = VideoProcess.statusOf(req.params.id);
  if (processes.isDone)
    VideoProcess.remove(req.params.id);

  res.json({ processes: VideoProcess.statusOf(req.params.id) });
};
