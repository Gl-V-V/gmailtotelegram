const chatId = "ЗДЕСЬ УКАЖИТЕ КОД ВАШЕГО ТГ-ЧАТА"

function getUnreadMessagessss() {
  let unreadCount = GmailApp.getInboxUnreadCount();
    if (unreadCount > 0) {
        let threads = GmailApp.getInboxThreads(0, 100);
          for (let i = 0; i < threads.length; i++) {
            for (msg of threads[i].getMessages()){
              if(msg.isUnread()) {
                let msgId = msg.getId()
                console.log(msgId)
                let msg_subject = msg.getSubject()
                let msg_body = msg.getBody()
                let gmail_quote = msg_body.indexOf('<div class="gmail_quote">')
                if (gmail_quote != -1){
                  msg_body = sanitizeMessage(msg_body.substring(0,gmail_quote))
                } else {
                  msg_body = sanitizeMessage(msg.getPlainBody())
                }
                let msg_from = msg.getFrom()
let notification_msg = `На рабочую почту пришло письмо:
<strong>от:</strong> ${extractEmail(msg_from)}
<strong>тема:</strong> ${sanitizeMessage(msg_subject)}
<strong>Содержание:</strong> ${msg_body}`.slice(0, 4096)
                console.log(notification_msg)
                sendMessage(notification_msg, chatId)
                msg.markRead()
                sendTextAsFileToTelegram(`<!DOCTYPE html><html><head><meta charset="UTF-8">${msg.getBody()}`, 'text.html', chatId)
              }
            }       
          }
    }
}
function sanitizeMessage(message) {
    let sanitizedMessage = message.replace(/(?!<br\s*\/?>)<[^>]+>/gi, "");
    sanitizedMessage = sanitizedMessage.replace(/<br\s*\/?>/gi, '\n');
    sanitizedMessage = sanitizedMessage.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    sanitizedMessage = sanitizedMessage.replace(/\s+/g, ' ').trim();
    return sanitizedMessage;
}
function extractEmail(str) {
    const emailRegex = /<([^>]+)>/;
    const match = str.match(emailRegex);
    return match ? match[1] : str;
}
