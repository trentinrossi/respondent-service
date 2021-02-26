const handleError = (err, res) => {
  const { code, message, moreInfo, status } = err;
  res.status(status).json({
    code,
    message,
    moreInfo,
    status
  });
};

module.exports = {
  handleError,
};
