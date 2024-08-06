const API_TOKEN = "ЗДЕСЬ УКАЖИТЕ ТОКЕН ВАШЕГО ТГ-БОТА"

function sendMessage (message, chatId){ 
    var data = { 
     method: "post", 
     payload: { 
     method: "sendMessage", 
     chat_id: String(chatId), 
     text: message, 
     parse_mode: "HTML",
     disable_web_page_preview: true
     } 
    } 
    UrlFetchApp.fetch('https://api.telegram.org/bot' + API_TOKEN + '/', data); 
}

function sendTextAsFileToTelegram(text, fileName, chatId) {
  let blob = Utilities.newBlob(text, 'text/html', fileName);
  let url = `https://api.telegram.org/bot${API_TOKEN}/sendDocument`;
  let formData = {
    'chat_id': chatId,
    'document': blob
  };
  let options = {
    'method': 'post',
    'payload': formData
  };
  let response = UrlFetchApp.fetch(url, options);
  Logger.log(response.getContentText());
}
