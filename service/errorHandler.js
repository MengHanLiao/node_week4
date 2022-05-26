const handleError = ({res, error, errCode}) => {
  let errMsg = '';
  const errCenter = {
    40001: 'id 不存在',
    40002: '貼文內容為必填',
    40003: '確認更新內容，內容或圖片請擇一更改',
    40004: '請確認 email、password、photo 欄位是否有正確填寫'
  }
  errMsg = error ? error : errCenter[errCode];
  res.status(400).send({
    status: "error",
    message: errMsg
  });
};

module.exports = handleError;