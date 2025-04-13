// import db from '../lib/database.js'
import { canLevelUp } from '../lib/levelling.js'

export async function before(m, { conn }) {
  let who = m.mentionedJid && m.mentionedJid[0]
    ? m.mentionedJid[0]
    : m.fromMe
    ? conn.user.jid
    : m.sender;

  let ppch = await conn.profilePictureUrl(who, 'image').catch(_ => img.getRandom());
  let user = global.db.data.users[m.sender];
  let chat = global.db.data.chats[m.chat];

  if (!chat.autolevelup) return;

  let before = user.level;
  while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++;

  if (before !== user.level) {
    user.role = global.rpg.role(user.level).name;

    conn.reply(
      m.chat,
      [
        `*「 🎉 𝗟𝗘𝗩𝗘𝗟 𝗨𝗣 🎉 」*\n\nتهانينا! لقد ارتقيت إلى مستوى جديد 👏\n*• المستوى:* ${before} ⟿ ${user.level}\n*• الرتبة:* ${user.role}`,
        `@${m.sender.split`@`[0]}, لقد وصلت إلى مستوى جديد! 🔥\n*المستوى:* ${before} ⟿ ${user.level}\n\nاكتب *#level* لعرض نقاط الخبرة الخاصة بك.`,
        `🥳 @${m.sender.split`@`[0]} أصبح أقوى الآن!\n\n*المستوى السابق:* ${before}\n*المستوى الحالي:* ${user.level}`
      ].getRandom(),
      m,
      {
        contextInfo: {
          mentionedJid: [m.sender],
          externalAdReply: {
            mediaUrl: null,
            mediaType: 1,
            description: null,
            title: wm,
            body: 'SASUKE BOT',
            previewType: 0,
            thumbnail: img.getRandom(),
            sourceUrl: redes.getRandom()
          }
        }
      }
    );

    let notiText = `🎉 *${m.pushName || 'مستخدم'}* ارتقى إلى مستوى جديد 🆙

*• المستوى السابق:* ${before}
*• المستوى الحالي:* ${user.level}
*• الرتبة:* ${user.role}
*• البوت:* ${wm}`;

    await conn.sendMessage(global.ch.ch1, {
      text: notiText,
      contextInfo: {
        externalAdReply: {
          title: "【 🔔 إشعار عام 🔔 】",
          body: "لقد ارتقيت إلى مستوى جديد 🥳!",
          thumbnailUrl: ppch,
          sourceUrl: redes.getRandom(),
          mediaType: 1,
          showAdAttribution: false,
          renderLargerThumbnail: false
        }
      }
    }, { quoted: null });
  }
}

global.rpg = {
  emoticon(text) {
    text = text.toLowerCase();
    const mapping = {
      role: '🏅',
      level: '⬆️'
    };
    for (const key in mapping) {
      if (text.includes(key)) return mapping[key];
    }
    return '';
  },

  _roles: null,

  generateRoles() {
    if (this._roles) return this._roles;
    const ranks = ['مبتدئ', 'متدرب', 'مستكشف', 'معلم', 'حديد', 'فضة', 'ذهب', 'بارد', 'مستحضر أرواح', 'ساحر مظلم', 'ساحر', 'حكيم', 'قسيس', 'لص', 'مصارع', 'رامي سهام', 'قناص', 'نينجا', 'ساموراي', 'محارب', 'أسطورة', 'بطل', 'الماستر الأعظم', 'الشيخ', 'خالد', 'نيفيليم', 'أبدي', 'نبتون', 'بلوتو', 'إيريس', 'الصعود', 'الجنة', 'الأثير', 'غايا', 'هاديس', 'الماس', 'محترف في ساسكي بوت', 'سوبر محترف', 'أسطوري', 'نوفا', 'أسطورة', 'نجمي', 'أفضل لاعب كوني', 'نخبة العالم'];

    const subLevels = ['V', 'IV', 'III', 'II', 'I'];
    let roles = [];
    let currentLevel = 0;

    ranks.forEach(rank => {
      subLevels.forEach(numeral => {
        roles.push({
          name: `${rank} ${numeral}`,
          level: currentLevel++
        });
      });
    });

    roles.sort((a, b) => b.level - a.level);
    this._roles = roles;
    return roles;
  },

  role(level) {
    level = parseInt(level, 10);
    if (isNaN(level)) return { name: '', level: '' };
    const roles = this.generateRoles();
    const foundRole = roles.find(r => level >= r.level);
    return foundRole || roles[roles.length - 1];
  }
};
