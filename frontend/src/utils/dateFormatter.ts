const dateFormatter = (originalDatetime: number): string => {
  let str = '';
  const date = new Date(originalDatetime);

  str += date.getUTCFullYear();
  str += '년 ';
  str += date.getUTCMonth() + 1;
  str += '월 ';
  str += date.getUTCDate();
  str += '일 ';
  str += date.getUTCHours().toString().padStart(2, '0');
  str += ':';
  str += date.getUTCMinutes().toString().padStart(2, '0');
  str += ':';
  str += date.getUTCSeconds().toString().padStart(2, '0');
  str += ' KST';

  return str;
};

export default dateFormatter;
