let handler = async m => {
  let decoded = Buffer.from("KkDihpHiiJ7YpTiiyJ4qCj0KzogIMq2INin2YTZh9in2Kkg2KfZhNiy2YbYp9iqINin2YTYp9ix2YrYqSDYp9mE2LPZhCDYp9mE2KfZhgog4oCmX0dST1VQOjoK4oCmINin2YTZitmGINmF2KfYqSDYqNmK2KfZhNioINio2YbYqNmKINmF2YjZg9iqICBodHRwczovL3doYXRzYXBwLmNvbS9jaGFubmVsLzAwMjlWYWsWc3MlMkZhbjJKbDhmZmVpYktSMGUK4oCmU1VQUE9SVF9HUk9VUDoK4oCmINin2YTYs9mE2KjZitmG2YrYqSDYp9mE2KfZhgogIGh0dHBzOi8vY2hhdC53aGF0c2FwcC5jb20vRTRNSmpqUVI0czI1MEJyZVh1N0cwNwoK4oCmWW91VHViZToK4oCmIOKcqSB3d3cueW91dHViZS5jb20vQHRodW5kZXJib3RtZAoqQOKGkeKInsO0wqKInsKjCg==", "base64").toString("utf-8");
  m.reply(decoded);
};

handler.help = ['gpflash'];
handler.tags = ['main'];
handler.command = ['group', 'support','سورس','دعم'];

export default handler;
