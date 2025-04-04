import fs from 'fs';
import axios from 'axios';
import fetch from 'node-fetch';
import FormData from 'form-data';
import { fileTypeFromBuffer } from 'file-type';

const handler = async (m, { conn, usedPrefix, command }) => {

const q = m.quoted ? m.quoted : m;
  const mime = (q.msg || q).mimetype || '';

  if (!mime) throw '*`❲ 💡 ❳ يرجى تحديد الملف الذي تود تحويله لرابط .`*\n> مثال: ' + usedPrefix + command + ' ريبلي الملف';
  
  const media = await q.download();
  
  const { ext, mime: fileMime } = await fileTypeFromBuffer(media);
  const fileType = fileMime.split('/')[0];
  
  const link = await uploadToCatbox(media);
  
  let cap = '*`⎆─〔 معلومات الملف 〕⌲`*\n\n';
  cap += '*`⎆ الاسم:`* ' + (q.filename || `file.${ext}`) + '\n';
  cap += '*`⎆ النوع:`* ' + fileType + '\n'; // عرض نوع الملف
  cap += '*`⎆ الصيغة:`* ' + ext + '\n'; // عرض صيغة الملف
  cap += '*`⎆ الامتداد الكامل:`* ' + mime + '\n';
  cap += '*`⎆ الرابط:`* ' + link + '\n';
  
  await conn.sendButton(m.chat, cap, wm, link, [['','']], `${link}`, null, m);
  
  };

handler.help = ['لرابط <رد على ملف>'];
handler.tags = ['ملف'];
handler.command = ['لرابط'];

export default handler;
  
  const uploadToCatbox = async (buffer) => {
  
  const { ext, mime: fileMime } = await fileTypeFromBuffer(buffer);
  const fileType = fileMime.split('/')[0];
  
  const form = new FormData();
  form.append('fileToUpload', buffer, `file.${ext}`);
  form.append('reqtype', 'fileupload'); 
  try {
    const response = await fetch('https://catbox.moe/user/api.php', {
      method: 'POST',
      body: form,
    });

    const text = await response.text(); 
    console.log('Response Text:', text); 

    if (text.startsWith('https://')) {
      return text; 
    } else {
      throw new Error('فشل في رفع الملف إلى Catbox: ' + text);
    }
  } catch (error) {
    throw new Error(`فشل في رفع الملف: ${error.message}`);
  }
};