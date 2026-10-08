const { Client, GatewayIntentBits } = require('discord.js');
const mongoose = require('mongoose');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// الاتصال بقاعدة البيانات العالمية MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas (Global Database)'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// نظام الاقتصاد العالمي
const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  wallet: { type: Number, default: 0 },
  bank: { type: Number, default: 0 }
});
const User = mongoose.model('User', UserSchema);

const PREFIX = '!';

client.on('ready', () => {
  console.log(`🚀 ${client.user.tag} is now Online and Global 24/7!`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot || !message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  // أمر الرصيد (!bal)
  if (command === 'bal' || command === 'balance') {
    let target = message.mentions.users.first() || message.author;
    let userData = await User.findOne({ userId: target.id });
    if (!userData) userData = await User.create({ userId: target.id });

    return message.reply({
      content: `💳 **حساب ${target.username} العالمي:**\n👛 **المحفظة:** $${userData.wallet}\n🏦 **البنك:** $${userData.bank}`
    });
  }

  // أمر التحويل (!v)
  if (command === 'v' || command === 'transfer') {
    const target = message.mentions.users.first();
    const amount = parseInt(args[1] || args[0]);

    if (!target || is
        
