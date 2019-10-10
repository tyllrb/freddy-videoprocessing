const util = require('util');
const path = require('path');
const find = require('find');
const { spawn } = require('child_process');

const processes = {};

const videoBin = () => path.join(__dirname, '../../', 'videos');

const convertCmd = (file, id) => {
  const fileParse = path.parse(file);
  return [`-i`, file, `-movflags`, `faststart`, `-preset`, `fast`, `${path.join(fileParse.dir, id)}.mp4`];
};

module.exports = {
  convertToMp4: (file, id, _test) => {
    return new Promise((response, reject) => {
      try {
        if (processes[id] && !processes[id].isDone)
          reject('already processing');

        processes[id] = { name: path.basename(file), isDone: false, exitCode: null };
        const process = spawn('ffmpeg', convertCmd(file, id));
        process.on('close', code => processes[id] = { ...processes[id], isDone: true, exitCode: code });
        response(id);
      } catch (error) {
        reject({ error });
      }
    });
  },

  status: () => processes,
  statusOf: id => processes[id],
  remove: id => delete processes[id],
  removeAll: () => Object.keys(processes).filter(process => processes[process].isDone).forEach(i => delete processes[i]),

  discover: name => {
    return new Promise((response, reject) => {
      find.file(
        /^.*\.(mkv|MKV|avi|AVI|mov|MOV|wmv|WMV)$/,
        videoBin(),
        files => response(files.filter(file => file && path.basename(file).split('.')[0] === name))
      ).error(error => reject(error));
    });
  }
};
