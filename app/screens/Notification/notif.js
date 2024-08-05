export function sendNotification(data, id) {
  let headers = {
    'Content-Type': 'application/json; charset=utf-8',
    Authorization: "Basic 'YTc0Y2Q3ZDgtYTU4Yy00ZmJhLTkwMTItNzE1ZTQ1NmY4NDA0'",
  };
  let endpoint = 'https://onesignal.com/api/v1/notifications';
  let params = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      app_id: '<<Your one signal app id>>',
      filters: [
        // Will send notification only to specific device
        {
          // Optional
          field: 'tag',
          key: 'Id',
          relation: '=',
          value: id,
        },
      ],
      headings: {en: 'Your Heading'},
      contents: {en: data},
      url: 'https://something.any', // optional
    }),
  };
  fetch(endpoint, params).then(res => console.log(res));
}
