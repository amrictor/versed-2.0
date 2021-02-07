module.exports = {
  formatSongTitle: (title) => {
    return title.replace(/[- \(]+Remastered[0-9a-z\s]*/, '');
  }
}