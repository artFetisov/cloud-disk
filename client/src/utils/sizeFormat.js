export default (size) => {
  if (size > 1024 * 1024 * 1024) {
    return (size / (1024 * 1024 * 1024)).toFixed(1) + 'Gb'
  }
  if (size > 1024 * 1024) {
    return (size / (1024 * 1024)).toFixed(1) + 'Mb'
  }
  if (size > 1024) {
    return (size / 1024).toFixed(1) + 'Kb'
  }
  if (size < 1024 && size > 8) {
    return size + 'B'
  }
  if (size <= 8 && size >= 0) {
    return size + 'b'
  }
}
