import moment from 'moment';
export function fadeOut(elementId) {
  let fadeTarget = document.getElementById(elementId);
  var fadeEffect = setInterval(function () {
    if (!fadeTarget.style.opacity) {
      fadeTarget.style.opacity = 1;
    }
    if (fadeTarget.style.opacity > 0) {
      fadeTarget.style.opacity -= 0.1;
    } else {
      clearInterval(fadeEffect);
      fadeTarget.remove();
    }
  }, 50);
}
export function getErrorFields(responseData) {
  let data = {};
  responseData.forEach((element) => {
    data[element.field] = element.message;
  });
  return data;
}
export function getErrorMessages(responseData) {
  let errors = false;
  let message = false;
  if (
    typeof responseData.errors != 'undefined' &&
    Object.keys(responseData.errors).length > 0
  ) {
    errors = responseData.errors;
  } else if (typeof responseData.message == 'string') {
    message = responseData.message;
  } else if (typeof responseData == 'object') {
    errors = responseData;
  }
  if (errors) {
    let errorMessages = Object.values(errors);
    return errorMessages.join('\n');
  }
  if (message) {
    return message;
  }
  return '';
}

export function getBase64Image(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export function strip_tags(html, allowed_tags) {
  allowed_tags = allowed_tags.trim();

  if (allowed_tags) {
    allowed_tags = allowed_tags.split(/\s+/).map(function (tag) {
      return '/?' + tag;
    });
    allowed_tags = '(?!' + allowed_tags.join('|') + ')';
  }

  return html.replace(new RegExp('(<' + allowed_tags + '.*?>)', 'gi'), '');
}

export function getTimeDifferences(date1, date2) {
  let d = new Date(date2).getTime() - new Date(date1).getTime();
  let weekdays = Math.floor(d / 1000 / 60 / 60 / 24 / 7);
  let days = Math.floor(d / 1000 / 60 / 60 / 24 - weekdays * 7);
  let hours = Math.floor(d / 1000 / 60 / 60 - weekdays * 7 * 24 - days * 24);
  let minutes = Math.floor(
    d / 1000 / 60 - weekdays * 7 * 24 * 60 - days * 24 * 60 - hours * 60,
  );
  let seconds = Math.floor(
    d / 1000 -
      weekdays * 7 * 24 * 60 * 60 -
      days * 24 * 60 * 60 -
      hours * 60 * 60 -
      minutes * 60,
  );
  let res =
    (hours > 9 ? hours : '0' + hours) +
    ':' +
    (minutes > 9 ? minutes : '0' + minutes) +
    ':' +
    (seconds > 9 ? seconds : '0' + seconds);
  res = days > 0 ? days + ' ng??y ' + res : res;
  return res;
}

export function formatReportNumber(point) {
  return Number.isNaN(parseInt(point)) ? '-' : point;
}
export function formatReportSeconds(seconds) {
  if (!seconds) {
    return '';
  }
  let days = ~~(seconds / (3600 * 24));
  let hrs = ~~(seconds / 3600);
  let mins = ~~((seconds % 3600) / 60);
  let secs = ~~seconds % 60;

  if (seconds < 60) {
    return seconds + ' gi??y';
  } else if (seconds < 60 * 60) {
    secs = secs < 10 ? '0' + secs : secs;
    return mins + ' ph??t ' + secs + ' gi??y';
  } else if (seconds < 60 * 60 * 24) {
    mins = mins < 10 ? '0' + mins : mins;
    return hrs + ' gi??? ' + mins + ' ph??t';
  } else {
    return '~' + days + 'ng??y';
  }
}

export function colorChart(type) {
  if (type == 'hover') {
    return [
      'rgba(254,93,85,0.75)',
      'rgba(253,191,108,0.75)',
      'rgba(231,217,84,0.75)',
      'rgba(106,221,105,0.75)',
      'rgba(55,166,72,0.75)',
    ];
  }
  return [
    'rgb(254,93,85)',
    'rgb(253,191,108)',
    'rgb(231,217,84)',
    'rgb(106,221,105)',
    'rgb(55,166,72)',
  ];
}

export function stringToSlug(title) {
  let slug;
  //?????i ch??? hoa th??nh ch??? th?????ng
  slug = title.toLowerCase();

  //?????i k?? t??? c?? d???u th??nh kh??ng d???u
  slug = slug.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/gi, 'a');
  slug = slug.replace(/??|??|???|???|???|??|???|???|???|???|???/gi, 'e');
  slug = slug.replace(/i|??|??|???|??|???/gi, 'i');
  slug = slug.replace(/??|??|???|??|???|??|???|???|???|???|???|??|???|???|???|???|???/gi, 'o');
  slug = slug.replace(/??|??|???|??|???|??|???|???|???|???|???/gi, 'u');
  slug = slug.replace(/??|???|???|???|???/gi, 'y');
  slug = slug.replace(/??/gi, 'd');
  //X??a c??c k?? t??? ?????t bi???t
  slug = slug.replace(
    // eslint-disable-next-line no-useless-escape
    /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
    '',
  );
  //?????i kho???ng tr???ng th??nh k?? t??? g???ch ngang
  slug = slug.replace(/\s\s+/g, ' ');
  slug = slug.replace(/ /gi, '-');

  //X??a c??c k?? t??? g???ch ngang ??? ?????u v?? cu???i
  slug = '@' + slug + '@';
  // eslint-disable-next-line no-useless-escape
  slug = slug.replace(/\@\-|\-\@|\@/gi, '');
  return slug;
}

export function stringToFilterString(title) {
  let slug;
  //?????i ch??? hoa th??nh ch??? th?????ng
  slug = title.toLowerCase().trim();

  //?????i k?? t??? c?? d???u th??nh kh??ng d???u
  slug = slug.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/gi, 'a');
  slug = slug.replace(/??|??|???|???|???|??|???|???|???|???|???/gi, 'e');
  slug = slug.replace(/i|??|??|???|??|???/gi, 'i');
  slug = slug.replace(/??|??|???|??|???|??|???|???|???|???|???|??|???|???|???|???|???/gi, 'o');
  slug = slug.replace(/??|??|???|??|???|??|???|???|???|???|???/gi, 'u');
  slug = slug.replace(/??|???|???|???|???/gi, 'y');
  slug = slug.replace(/??/gi, 'd');

  //?????i kho???ng tr???ng th??nh k?? t??? g???ch ngang
  slug = slug.replace(/\s\s+/g, ' ');

  return slug;
}

export const clozeTextPreviewRegex = /\(\d+\) ________/gi;

export function repairClozeTextBody(str) {
  if (typeof str !== 'string') {
    return str;
  }

  var s = str.trim();
  var rep = function (re, str) {
    s = s.replace(re, str);
  };

  // Re index
  var index = 1;

  s.replace(/{ANSWER_(\d+)}/gi, function (match) {
    s = s.replace(match, '{ANSWER_' + index++ + '}');
  });

  const match = str.match(/{ANSWER_(\d+)}/gi);

  if (match && match.length > 1) {
    rep(/{ANSWER_(\d+)}/gi, '($1) ________');
  } else {
    rep(/{ANSWER_(\d+)}/gi, '________');
  }

  return s;
}

export function filterSelectOptions(input, option) {
  return (
    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
    stringToFilterString(option.label.toLowerCase()).indexOf(
      stringToFilterString(input).toLowerCase(),
    ) >= 0
  );
}

export function removeEmailFromString(str = '') {
  return str.replace(/([^.@\s]+)(\.[^.@\s]+)*@([^.@\s]+\.)+([^.@\s]+)/, '');
}

export function removeEmptyValuesObject(input) {
  const objInput = { ...(input || {}) };

  return Object.keys(objInput).reduce((previousValue, key) => {
    if (objInput[key] != null) {
      previousValue[key] = objInput[key];
    }

    return previousValue;
  }, {});
}

export function haveLaText(content) {
  return (
    content &&
    (content.match(/\$(.*?)\$/gi) ||
      content.match(/<math(.*?)>(.*?)<\/math>/gi))
  );
}

export function escapeRegExp(string) {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
}

export function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

export function disabledDate(current) {
  return current && current > moment().endOf('day');
}

export function disabledDateSmall(current) {
  return current && current < moment().endOf('day');
}
